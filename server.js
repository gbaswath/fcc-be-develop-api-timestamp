// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

//Load Environment Variables
require('dotenv').config();
console.log("Environment Variables " + JSON.stringify(process.env));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

//Return Unix Time & UTC String Date
app.get("/api/:date", function (req, res) {
  //Get Date from URL
  let reqDate = req.params['date'];
  console.log("Requested Date " + reqDate + " from URL");
  //Parse Create Date
  let date = new Date(reqDate);
  //If Date is unix Time format it needs to handled separately
  if(isNaN(date)) {
    console.log("Date is not in String Format");
    date = new Date(parseInt(reqDate));
    console.log("Date is in Unix Time Format " + date);
  }
  //Parsed Date Result
  console.log("Parsed Date " + date);
  //Convert Date to Unix Time
  let unixTime = date.getTime();
  console.log("Unix Time " + unixTime);
  //Convert Date to UTC String Format
  let utcDate = date.toUTCString();
  console.log("UTC String " + utcDate);
  //Prepare JSON Result
  let result = {"unix": unixTime, "utc" : utcDate};
  res.json(result);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
