import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";

const loadUntoBrowser = document.getElementById("root");
const entryApp = <React.StrictMode> <App /> </React.StrictMode>

ReactDOM.render(entryApp, loadUntoBrowser);