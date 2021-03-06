const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const URI = "mongodb+srv://User01:User01@codecenter01010-zzf41.mongodb.net/test";
var app = express();

var collection;
var fetchedData;

var port = process.env.PORT || 1337;
var client = new MongoClient(URI, {useNewUrlParser:true , useUnifiedTopology:true});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set("view engine", "ejs"); 
app.set("views", __dirname + "/public/views")


app.get('/notes' , function(req, res){
    
    collection.find({}).toArray((err, result) => {
        //fetchedData = result;
        res.send(result);
        });
   // res.sendFile(__dirname +'/public/notes.html');
    });
app.get('/notes/:id', function(req,res){
    collection.findOne({"_id": new ObjectId(req.params.id)} , (err, result) => {
        result;
    });
});

app.get('/', function(req , res){
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/add', function(req, res){
    res.redirect('/')
    var item = {
        headline: req.body.headline,
        content: req.body.content
    };   
    collection.insertOne(item, function(err, result){
        console.log("Added new items to DB");
    });     
});

app.listen(port , function(){
    console.log('Server is running at port: ' + port );
    client.connect(err => {
        collection = client.db("MongoDumboDB").collection("DumboCollection");
        console.log("DB has been connected");
    });     
});
//module.exports= fetchedData;
