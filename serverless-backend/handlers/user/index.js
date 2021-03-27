const api = require("lambda-api")();
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jwt-simple");
const db = require("monk")(
    "mongodb+srv://user:user@projeto-9.9l4fn.mongodb.net/Project?retryWrites=true&w=majority"
);
db.then(() => {
    console.log("Connected to server");
});
const users = db.get("login");
users.createIndex("email", { unique: true });

const SECRET = "user-password";

const requireAuth = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization
        if (authorizationHeader.startsWith("Bearer ")) {
            let token = authorizationHeader.substring(7, authorizationHeader.length)
            const payload = jwt.decode(token, SECRET);
            req.authorized = true;
            req.userId = payload.sub;
            next(); // continue execution
        } else {
            return res.status(402).json({ msg: "Not Authorized" });
        }
    } catch (err) {
        return res.status(401).json({ msg: "Not Authorized" });
    }
}

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
            throw new Error(bodyValidation.error.message)
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
                res.status(400).json({ msg: "Invalid user data" });
            } else {
                res.status(500).json({ msg: err.message });
            }
        });
    } catch (err) {
        console.log("Error", err.message);
        res.status(400).json({ msg: err.message });
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
            throw new Error(bodyValidation.error.message)
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
                    res.status(400).json({ msg: "email or password incorrect" })
                }
            } else {
                res.status(400).json({ msg: "email or password incorrect" })
            }
        }).catch((err) => {
            console.log("Error", err.message);
            res.status(500).json({ msg: err.message });    
        })
    } catch (err) {
        console.log("Error", err.message);
        res.status(400).json({ msg: err.message });   
    }
});

api.get("/user", requireAuth, async (req, res) => {
    try {
        await users.findOne({ _id: req.userId }).then((result) => {
            if (result) {
                result.token = generateToken(result._id);
                delete result["pass"];
                res.json({ msg: "success", data: result });
            } else {
                res.status(404).json({ msg: "post not found" });
            }
        }).catch((err) => {
            console.log("Error", err.message);
            res.status(500).json({ msg: err.message });
        })
    } catch (err) {
        console.log("Error", err.message);
        res.status(500).json({ msg: err.message });
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
