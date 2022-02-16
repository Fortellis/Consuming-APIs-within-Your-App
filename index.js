const express = require("express");
const path = require("path");

const app = express();

const bodyParser = require('body-parser');

const axios = require('axios');


app.use(bodyParser());

// Serve the static files from the React app
//You are only going to use this line after creating the production build of the react app.
//For development, simply use the version of the react app that hotloads on port 3000
app.use(express.static(path.join(__dirname, "client/build")));

// Handles any requests that don't match the ones above
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.get("/test", (req, res) => {
  console.log("You have received a request: " + JSON.stringify(req.headers));
  console.log(req.headers.authorization);
  console.log(req.headers.subscriptionid);
  console.log(req.headers.requestid);

  const headersForAPI = {
      headers:
        {
            Authorization: req.headers.authorization, 
            "Subscription-Id": req.headers.subscriptionid,
            "Request-Id": req.headers.requestid
        }
  };

  axios
    .get("https://api.fortellis.io/vehicles/reference/v4/vehicle-specifications/vins/{vin}", headersForAPI)
    .then((response) => {
        console.log(response.data);
        res.send(response.data);
    })
    .catch((err) => {
        console.log(err)
    })
  //res.send("We have received your request.");
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
