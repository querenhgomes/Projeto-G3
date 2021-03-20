const api = require("lambda-api")();
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jwt-simple");
const db = require("monk")(
    process.env.MONGODB_URI
);
db.then(() => {
    console.log("Connected to server");
});
const users = db.get("login");
users.createIndex("email", { unique: true });

const SECRET = process.env.JWT_SECRET;


function generateToken(userId) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: userId, iat: timestamp }, SECRET);
}

api.post("/signup", async (req, res) => {
    try {
        // Body validation
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
        const bodyValidation = schema.validate(req.body);
        if (bodyValidation.error) {
            return res.error(400, bodyValidation.error.message);
        }

        // Password hashing
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        delete req.body.password;
        req.body.hashedPassword = hash;

        // Saving user
        const newUser = {
            user: req.body.name,
            email: req.body.email,
            pass: req.body.hashedPassword,
        };
        await users.insert(newUser).then((result) => {
            console.log(result);
            // db.close()
            result.token = generateToken(result._id);
            delete result["pass"];
            res.status(201).json({ msg: "success", data: result });
        }).catch((err) => {
            console.log(err.message);
            if (err.message.startsWith("E11000")) {
                res.error(400, "Invalid user data");    
            } else {
                res.error(400, err.message);    
            }
        });
    } catch (err) {
        console.log(err.message);
        return res.error(500, err.message);
    }
});

api.post("/login", async (req, res) => {
    try {
        // Body validation
        const schema = Joi.object().keys({
            email: Joi.string()
                .email({ tlds: { allow: false } })
                .required(),
            password: Joi.string().trim().min(6).required(),
        });
        const bodyValidation = schema.validate(req.body);
        if (bodyValidation.error) {
            return res.error(400, bodyValidation.error.message);
        }

        // Database lookup
        await users.findOne({ email: req.body.email }).then((user) => {
            if (user) {
                // Password checking
                const passwordIsCorrect = bcrypt.compareSync(req.body.password, user.pass)
                if (passwordIsCorrect) {
                    // Token generation
                    const token = generateToken(user._id)
                    const authenticatedUser = {
                        name: user.user,
                        email: user.email,
                        _id: user._id,
                        token: token
                    }
                    res.json({ msg: "success", data: authenticatedUser });
                } else {
                    res.error(400, "email or password incorrect")
                }
            } else {
                res.error(400, "email or password incorrect")
            }
        }).catch((err) => {
            console.log("error", err.message);
            return res.error(500, err.message);        
        })
    } catch (err) {
        console.log(err.message);
        return res.error(500, err.message);        
    }
});

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
    return await api.run(event, context);
};
