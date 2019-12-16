const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const URI = "mongodb+srv://User01:User01@codecenter01010-zzf41.mongodb.net/test";

var collection;
var app = express();
var port = process.env.PORT || 1337;
var client = new MongoClient(URI, {useNewUrlParser:true , useUnifiedTopology:true});

app.get('/notes' , function(req, res){
    collection.find({}).toArray((err, result) => {
        res.send(result);
    })
})

app.get('/', function(req , res){
    res.send('I am alive');
})
app.listen(port , function(){
    console.log('Server is running at port: ' + port )
    client.connect(err => {
        collection = client.db("MongoDumboDB").collection("DumboCollection");
        console.log("DB has been connected")
    });     
});