const express = require("express");

const hiscores = require("osrs-json-hiscores");

const serverless = require('serverless-http');

const app = express();

const router = express.Router();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

router.get('/stats/:rsn', (req ,res) => {

    hiscores.getStats(req.params.rsn)
    .then(response => res.send(response))
    .catch(err => {
        res.status(404).send({ status: 404, error: err})
    });

});


app.use('/.netlify/functions/api', router);


module.exports.handler = serverless(app);

