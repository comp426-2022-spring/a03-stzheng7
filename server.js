// Require Express.js
const express = require('express')
const app = express()

const args = require('minimist')(process.argv.slice(2))
args['port']
const port = args.port || process.env.PORT || 5000

// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

app.get('/app/', (req,res) => {
    // Respond with status 200
    res.statusCode = 200;
    // Respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead(res.statusCode, {'Content-Type' : 'text/plain'});
    res.end(res.statusCode + ' ' + res.statusMessage)
  });

  app.get('/app/flip', (req, res) => {
    res.status(200).json({
        "flip": coinFlip()
    });
});

app.get('/app/flips/:number', (req, res) => {
    const raw = coinFlips(req.params.number);
    const summary = countFlips(raw);
    res.status(200).json({
        "raw": raw,
        "summary": summary
    });
});

app.get('/app/flip/call/:call', (req, res) => {
    res.status(200).json(flipACoin(req.params.call))
});

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
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