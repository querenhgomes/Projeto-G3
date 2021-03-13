const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Joi = require("joi");
let response;
const { MONGODB_URI } = process.env;
// mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
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
    let body;
    const schema = Joi.object().keys({
        name: Joi.string()
            .regex(/^([a-zA-Z0-9-_\.]+$)/)
            .min(3)
            .max(30)
            .required(),
        password: Joi.string().trim().min(6).required(),
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required(),
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
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(body.password, salt);
        delete body.password;
        body.hashedPassword = hash;
    } catch (error) {
        console.log(err);
        return err;
    }

    let user;
    let db;
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
        const User = mongoose.model("login", userSchema);
        let result = await User.find({ email: body.email}).exec()
        if (result.length > 0) {
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
        user = new User({
            user: body.name,
            email: body.email,
            pass: body.hashedPassword
        });
        result = await user.save()
        response = {
            statusCode: 201,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                message: "success",
                data: result,
            }),
        };
        db.close();
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};
