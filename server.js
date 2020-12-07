const express = require('express');
const bodyparser = require('body-parser');
const https = require('https');
const path = require('path');
const http = require('http');
var jsonParser = bodyparser.json()
var xlsx = require('xlsx');
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyparser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies
const app=express();
var wb = xlsx.readFile("Book2.xlsx");
var ws = wb.Sheets["new data"];
var data = xlsx.utils.sheet_to_json(ws);


 var newWb = xlsx.utils.book_new();
 var newWs = xlsx.utils.json_to_sheet(data);
xlsx.utils.book_append_sheet(newWb,newWs,"new data");



console.log(data);

app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.get("/",function(request,response){

    response.sendFile(__dirname+"/index.html");
});
app.get("/login",function(request,response){

    response.sendFile(__dirname+"/login.html");
});
app.get("/home",function(request,response){

    response.sendFile(__dirname+"/index.html");
});
app.get("/aboutme",function(request,response){

    response.sendFile(__dirname+"/aboutme.html");
});

app.get('/api',jsonParser, function (req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.json(data);
})

const port = process.env.port || 8080;
app.listen(port,function(){
  console.log("server started on 9000");
});
