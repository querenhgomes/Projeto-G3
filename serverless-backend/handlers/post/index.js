const api = require("lambda-api")();
const jwt = require("jwt-simple");
const db = require("monk")(
    "mongodb+srv://user:user@projeto-9.9l4fn.mongodb.net/Project?retryWrites=true&w=majority"
);
db.then(() => {
    console.log("Connected to server");
});
const forums = db.get("forum");

const SECRET = process.env.JWT_SECRET;

api.post("/post", async (req, res) => {
    try {
        const body = req.body;
        // Nos cards de postagem será utilizado apenas o 
        // nome do autor, título, data de postagem e os likes. 
        const post = {
            authorId: body.authorId,
            title: body.title,
            content: body.content,
            likes: [],
            createdAt: Date.now()
        }
        // save to DB
        await forums.insert(post).then((result) => {
            // console.log(result);
            res.status(201).json({ msg: "success", data: result });
        }).catch((err) => {
            console.log("Error", err.message);
            res.status(400).json({ msg: err.message });
        });

    } catch (err) {
        console.log("Error", err.message);
        res.status(400).json({ msg: err.message });
    }
});

api.get("/posts", async (req, res) => {
    try {
        // Database lookup
        await forums.find().then((result) => {
            if (result) {
                res.json({ msg: "success", data: result });
            } else {
                res.error(404, "post not found")
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

api.get("/posts/:id", async (req, res) => {
    try {
        // Database lookup
        await forums.findOne({ _id: req.params.id }).then((result) => {
            if (result) {
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
        res.status(400).json({ msg: err.message });
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
