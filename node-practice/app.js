var http = require('http');

http.createServer(function(request,response){
  response.writeHead(200);
  response.write("I can respond with strings.... ONLY strings");
  response.end();
  console.log("Psst... hey... only you and I can see this console" +
    "log on the server side. AND it only happens when someone asks for a response");
}).listen(8000);

console.log("I'm listening on your behalf");
