import logo from "./logo.svg";
import "./App.css";

import Button from "react-bootstrap/Button";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

const axios = require("axios");

//const React = require('react');

function App() {
  const [responseFromAPI, setResponseFromAPI] = useState("");
  const makeAPIRequest = e => {
    e.preventDefault();
    const requestParameters = {
      headers: {
        Authorization: "Basic {YourBase64[APIKey:APISecret]}",
        SubscriptionId: "test",
        RequestId: "4a0eaa11-6bee-4da9-8b76-12daf5e7d82e",
      },
    };
    axios
      .get("test", requestParameters)
      .then(response => {
        console.log(response.data);
        setResponseFromAPI(response.data.vehicleSpecification);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button variant="primary" onClick={makeAPIRequest}>
          Call this for the button that you want to see in action.
        </Button>
        <p>{JSON.stringify(responseFromAPI)}</p>
        <p>{responseFromAPI.countryCode}</p>
        <p>{responseFromAPI.vehicleSpecId}</p>

      </header>
    </div>
  );
}

export default App;
