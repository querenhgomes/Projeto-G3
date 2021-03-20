const api = require("lambda-api")();
const jwt = require("jwt-simple");
const db = require("monk")(
    process.env.MONGODB_URI
);
db.then(() => {
    console.log("Connected to server");
});
const forums = db.get("forum");

const SECRET = process.env.JWT_SECRET;

api.post("/post", async (req, res) => {
    try {
        return res.json(req.body);
    } catch (err) {
        console.log(err.message);
        return res.error(500, err.message);
    }
});

api.get("/posts", async (req, res) => {
    try {
        return res.json(req.body);
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
