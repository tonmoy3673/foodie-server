const express = require('express')
const app = express()
require("dotenv").config();
const port = 5000
const cors =require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
app.use(express.json());
app.use(cors());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@foodie.wcw1hm1.mongodb.net/?retryWrites=true&w=majority&appName=foodie`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const allFoods = client.db("allFoods");
    const foodCollection = allFoods.collection("foodCollection");
    app.post('/foods',async(req,res)=>{
        const foodData=req.body;
        const result=await foodCollection.insertOne(foodData)
        res.send(result);
    })

    app.get('/foods',async(req,res)=>{
        
        const result=await foodCollection.find();
        res.send(result);
        console.log('MongoDB is Connected');
    })
    
  } finally {
  
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})