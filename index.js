var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');

});

app.get('/healthygoodfood_payments', function(req, res){
  var request = require('request');
  
  var request = require('request');
  var options = {
    'method': 'GET',
    'url': 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    'headers': {
      'Authorization': 'Basic QXpzMktlalUxQVJ2SUw1SmRKc0FSYlYyZ0RyV21wT0I6aGlwR3ZGSmJPeHJpMzMwYw=='
    }
  };
  request(options, function (error, response) { 
    if (error) throw new Error(error);
    
    var token = JSON.parse(response.body)
    
    stk_push_to_customer(token.access_token)
    
  });


function stk_push_to_customer(token){

  var options = {
    'method': 'POST',
    'url': 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
    'headers': {
      'Authorization': 'Bearer '+ token +'',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"BusinessShortCode":"174379","Password":"MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjAwMTI3MTE1NDEx","Timestamp":"20200127115411","TransactionType":"CustomerPayBillOnline","Amount":"1","PartyA":"254728563683","PartyB":"174379","PhoneNumber":"254728563683","CallBackURL":"http://213.136.79.62:5984/_utils/","AccountReference":"Healthy Good Food ","TransactionDesc":"Healthy Good Food"})
  
  };
  request(options, function (error, response) { 
    if (error) throw new Error(error);
    console.log(response.body);
  });

}

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});