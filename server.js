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

//Return Current Unix Time & UTC String Date
app.get("/api/", function (req, res) {
  console.log("Empty Params so Current Date is used");
  return getDateResponse(new Date(), res);
});

//Return Unix Time & UTC String Date
app.get("/api/:date", function (req, res) {
  let reqDate = req.params['date'];
  //Get Date from URL
  console.log("Requested Date " + reqDate + " from URL");
  //Create & Check Date
  let date = new Date(reqDate);
  if (isNaN(date)) {
    console.log("Date is not in String Format.. Hence Checking it is Integer");
    if (isNaN(reqDate)) {
      console.log("Not an Integer " + reqDate + " to Parse");
      res.json({ error: "Invalid Date" });
      return;
    }
    //If Date is unix Time format it needs to handled separately
    date = new Date(parseInt(reqDate));
    console.log("Date is Integer and in Unix Time Format " + date);
  }
  //Valid Date
  console.log("Parsed Date " + date);
  return getDateResponse(date, res);
});

function getDateResponse(date, res) {
  //Convert Date to Unix Time
  let unixTime = date.getTime();
  //Convert Date to UTC String Format
  let utcDate = date.toUTCString();
  //Prepare JSON Result
  let result = { "unix": unixTime, "utc": utcDate };
  console.log("Prepared Current Date " + JSON.stringify(result));
  res.json(result);
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});