// Require Express.js
const http = require("http");
const express = require('express')
const app = express()

const args = require('minimist')(process.argv.slice(2))
args['port']
const call = args.call
const port = args.port || process.env.PORT || 5000

// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

app.get('/app/', (req,res) => {
    // Respond with status 200
    res.statusCode = 200;
    // Respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead(res.statusCode, {'Content-Type' : 'text/plain'});
    res.end(res.statusCode + ' ' + res.statusMessage)
  });

  app.get('/app/flip', (req,res) => {
    res.send({flip: coinFlip()})
  });

  app.get('/app/flips/:number', (req,res) => {
    var flips=coinFlips(req.params.number)
    res.send({raw: flips, summary:countFlips(flips)})
  });

  app.get('/app/flip/call/heads', (req,res) => {
    res.status(200).json(flipACoin('heads'))
  });

  app.get('/app/flip/call/tails', (req,res) => {
    res.status(200).json(flipACoin('tails'))
  });

function coinFlip() {
    if(Math.random() > .5) {
      return "heads";
    }
    else{
      return "tails";
    }
  }
  function coinFlips(flips) {
    const flipsA = [];
    for (var i = 0; i < flips; i++) {
      flipsA.push(coinFlip());
    }
    return flipsA;
  }
  
  function countFlips(array) {
    const countA = {heads: 0, tails: 0};
    for (var i = 0; i < array.length; i++) {
      if (array[i] == "heads") {
        countA.heads++;
      }
      else {
        countA.tails++;
      }
    }
    return countA;
  }

  function flipACoin(call) {
    const FlipA = {call: call, flip: "", result: ""}
    FlipA.flip = coinFlip();
    if (FlipA.flip == call) {
      FlipA.result = "win";
    }
    else {
      FlipA.result = "lose";
    }
    return FlipA;
  }