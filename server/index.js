const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const uri =
  "mongodb+srv://sahilimrosezahin:1598753@cluster0.pvlfj2a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    await client.connect();
    const userCollection = client.db("dribble-mern").collection("users");
    console.log("connected");
    app.get("/api/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.findOne(query);
      res.send(result);
    });
    app.post("/api/createUser", async (req, res) => {
      const usrNameUnique = await userCollection
        .find({ usrName: req.body.usrName })
        .toArray();
      const emailUnique = await userCollection
        .find({ email: req.body.email })
        .toArray();

      if (usrNameUnique.length === 0) {
        if (emailUnique.length === 0) {
          const result = await userCollection.insertOne(req.body);
          res.send({
            message: "User created successfully.",
            id: result.insertedId,
          });
        } else {
          res.send({ message: "* Email is already in use." });
        }
      } else {
        res.send({ message: "* Username is already in use." });
      }
    });
    app.put("/api/updateProfile/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedData = req.body;
      const data = {
        $set: {
          profilePic: updatedData.profilePic,
          location: updatedData.location,
        },
      };
      await userCollection.updateOne(filter, data, options);
      res.send({ status: "updated" });
    });
    app.post("/api/verifyEmail", async (req, res) => {
      
      function stringGen(len) {
        var text = "";

        var charset = "abcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < len; i++)
          text += charset.charAt(Math.floor(Math.random() * charset.length));

        return text;
      }

      console.log(stringGen(64));
      res.send(stringGen(64));
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
