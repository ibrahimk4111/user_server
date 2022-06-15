const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;
const port = process.env.PORT || 8080;

//middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.r7fyrdp.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri);

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    console.log("DB_connected");
    const database = client.db("test").collection("devices");

    app.get("/", (req, res) => {
      res.send("Hello User Server go for /users");
    });
    // Here soldslafjalsdjfl asdf
    //Getting data from MongoDB
    app.get("/users", async (req, res) => {
      const dataList = database.find({});
      const datas = await dataList.toArray();
      res.send(datas);
    });

    // inserting data to MongoDB
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const addedUser = await database.insertOne(newUser);
      res.send(addedUser);
    });

    //deleting the API or document from MongoDB
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const deletedOne = await database.deleteOne(query);
      res.send(deletedOne);
    });
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`node port ${port}`);
});
