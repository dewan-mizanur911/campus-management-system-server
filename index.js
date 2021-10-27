const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const cors = require('cors');
const port = process.env.PORT || 5000;
require("dotenv").config();

//Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jycgq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        
    const database = client.db("campusManagementSystem");
    const serviceCollection = database.collection("services");
        
        app.get('/services', async (req, res) => {
            const cursor = serviceCollection.find({});
            const result = await cursor.toArray();
            res.json(result);
    })
        
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Campus Management Server Running at http://localhost:${port}`);
});