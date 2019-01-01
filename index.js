// initial return hello
/*
var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

app.get("/", function(req, res){
    res.send("welcome to NodeJs");
});
*/

const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.post('/webhook', (req, res) {
     res.sendStatus(200);
});

app.listen(port);