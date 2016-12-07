import * as React from "react";
import * as ReactDOM from "react-dom";
import "./styles.scss";
import App from "./app";

require('./../../bootstrap/css/bootstrap.css');
require('./../../bootstrap/css/bootstrap-theme.css');

chrome.tabs.query({active: true, currentWindow: true}, tab => {
  ReactDOM.render(
    <App url={tab[0].url}/>,
    document.getElementById('root')
  );
});