const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jwt-simple");

const { JWT_SECRET, MONGODB_URI } = process.env;

const SECRET = JWT_SECRET;

let response;
function generateToken(userId) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: userId, iat: timestamp }, SECRET);
}

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async (event, context) => {
    let user;
    let db;
    let User;
    let body;
    const schema = Joi.object().keys({
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required(),
        password: Joi.string().trim().min(6).required(),
    });

    try {
        // validate body
        body = JSON.parse(event.body);
        const result = schema.validate(body);
        if (result.error) {
            const { message } = result.error;
            response = {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    message: message,
                }),
            };
            return response;
        }
    } catch (error) {
        console.log(err);
        return err;
    }

    try {
        // create user model
        await mongoose.connect(
            MONGODB_URI,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        db = mongoose.connection;
        console.log("Mongo connected!");
        const userSchema = new mongoose.Schema({
            user: String,
            email: String,
            pass: String,
        });
        User = mongoose.model("login", userSchema);
        const result = await User.find({ email: body.email }).exec();
        // console.log("Result: ", result);
        db.close();
        await mongoose.disconnect();
        if (result.length === 0) {
            response = {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    message: "Invalid user data",
                }),
            };
            return response;
        } else {
            let user = result[0]
            const passwordIsCorrect = bcrypt.compareSync(body.password, user.pass)
            if (passwordIsCorrect) {
                // generate token
                const token = generateToken(user._id)
                const authenticatedUser = {
                    name: user.user,
                    email: user.email,
                    _id: user._id,
                    token: token
                }
                // return token
                response = {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({
                        message: "success",
                        data: authenticatedUser,
                    }),
                };
                console.log(authenticatedUser.token);
                return response;
            } else {
                response = {
                    statusCode: 400,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({
                        message: "Invalid user data",
                    }),
                };
                return response;
            }
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};
