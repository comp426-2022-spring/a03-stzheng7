// Require Express.js
const express = require('express')
const app = express()


const args = require('minimist')(process.argv.slice(2));
args['HTTP_PORT'];
const HTTP_PORT = args.HTTP_PORT || process.env.PORT || 5000;

// Start an app server
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

app.get('/app/', (req, res) => {
    res.status(200).end("OK");
    res.type("text/plain");
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