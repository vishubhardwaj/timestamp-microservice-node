// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date_string', function(req,res){
  let d = req.params.date_string;

  var date = new Date(d)
  if(isNaN(d)){
    if(isNaN(date.getTime())){
      res.json({error : 'invalid date'});
    } else {
      res.json({unix : date.getTime(), utc : date.toUTCString()});
    }
  }

  var date = new Date(d * 1000);
  if (date.toUTCString()==='invalid Date'){
    res.json({error : 'invalid date'})
  } else {
    res.json({unix: d, utc: date.toUTCString()})
  }
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
