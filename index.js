const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const request = require("request");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){
  var chosenCrypto = req.body.crypto;
  var chosenFiat = req.body.fiat;
  var amount = req.body.amount;

  var options = {
    url:"https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs:{
      from: chosenCrypto,
      to: chosenFiat,
      amount: amount
    }
  };

  request(options ,function(error, response, body){
    var data = JSON.parse(body);
    var price = data.price;

    var time = data.time;

    res.write("<p> The current time is "+ time +"</p>");

    res.write("<h1> The "+amount +" of " +chosenCrypto+ " is $" + price + chosenFiat +".</h1>");

    res.send();
  });
  // console.log(req.body.crypto);
});

app.listen(3000, function(){

  console.log("server is running on port 3000");
});
