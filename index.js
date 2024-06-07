const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const port = 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@foodie.v0mnxbq.mongodb.net/?retryWrites=true&w=majority&appName=foodie`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    await client.connect();
    const foodDB = client.db("foodDB");
    const foodCollection = foodDB.collection("foodCollection");
    
    app.get('/foods',async(req,res)=>{
      const foods=await foodCollection.find({}).toArray();
      res.send(foods);
    })

    app.post('/foods',async(req,res)=>{
      const foods=req.body
      const result= await foodCollection.insertOne(foods);
      res.send(result)
    })

    app.get('/foods/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id: new ObjectId(id)};
      const food= await foodCollection.findOne(query);
      res.send(food);
    })

    console.log("MongoDB Connected!!");
  } finally {
    
    
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Server Connected')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})