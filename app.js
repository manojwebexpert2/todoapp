const mongo = require("mongodb");
const mongoClient = mongo.MongoClient;
const url = "mongodb://localhost/todoapp";

//mongodb ObjectId
const objectId=require('mongodb').ObjectID;


const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//RestFul APIs
//test.com/tasks/update/1
//test.com/tasks/delete/1
//test.com/tasks/index

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//this route will create new row for tasks table
app.post("/tasks/new", (req, res) => {
  mongoClient.connect(url, { useNewUrlParser: true }, (error, database) => {
    if (error) {
      console.log("db connect error");
    } else {
      console.log("db connected");

      var db = database.db("tasks");
      var collections = db.collection("tasks");

      //insert query
      collections.insertOne({
        timestamp: new Date(),
        taskname: req.body.taskname
      });
    }
  });
 // res.send("new record inserted");
  res.redirect("/");
});

//this route will get all rows of tasks table in string format
app.get("/tasks", (req, res) => {
  mongoClient.connect(url, { useNewUrlParser: true }, (error, database) => {
    if (error) {
      console.log("db connect error");
    } else {
      console.log("db connected");

      var db = database.db("tasks");
      var collections = db.collection("tasks");

      //insert query
      collections.find({}).toArray((error, result) => {
        res.send(JSON.stringify(result));
      });
    }
  });
});

//this route will update row for tasks table
app.put("/tasks/update/:id", (req, res) => {
    mongoClient.connect(url, { useNewUrlParser: true }, (error, database) => {
      if (error) {
        console.log("db connect error");
      } else {
        console.log("db connected");
  
        var db = database.db("tasks");
        var collections = db.collection("tasks");

        console.log(req.body.taskname)
  
        //update query
        collections.update({_id:new objectId(req.params.id)},{$set:{taskname:req.body.taskname}});
      }
    });
   // res.send("new record inserted");
    res.redirect("/");
  });

app.listen(3000, err => {});
