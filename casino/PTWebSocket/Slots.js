
const http = require('http');
const WebSocket = require('ws');
const url = require('url');


var fs = require('fs');
var serverConfig;
var Redis = require('ioredis');
var redis = new Redis();

serverConfig = JSON.parse(fs.readFileSync('../../socket_config.json', 'utf8'));
	

/*----------------------------*/
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function RandomInt(min, max)
{

  return Math.floor(Math.random() * (max - min + 1)) + min;

};

function RandomFloat()
{

  return Math.random()*(RandomInt(-1,1)+Math.random());

};


/*-----------------------------------*/

function DecodeMessage(arrayBuffer) {
  var result = "";
  var i = 0;
  var c = 0;
  var c1 = 0;
  var c2 = 0;

  var data = new Uint8Array(arrayBuffer);

  // If we have a BOM skip it
  if (data.length >= 3 && data[0] === 0xef && data[1] === 0xbb && data[2] === 0xbf) {
    i = 3;
  }

  while (i < data.length) {
    c = data[i];

    if (c < 128) {
      result += String.fromCharCode(c);
      i++;
    } else if (c > 191 && c < 224) {
      if( i+1 >= data.length ) {
      //throw "UTF-8 Decode failed. Two byte character was truncated.";
      }
      c2 = data[i+1];
      result += String.fromCharCode( ((c&31)<<6) | (c2&63) );
      i += 2;
    } else {
      if (i+2 >= data.length) {
      //  throw "UTF-8 Decode failed. Multi byte character was truncated.";
      }
      c2 = data[i+1];
      c3 = data[i+2];
      result += String.fromCharCode( ((c&15)<<12) | ((c2&63)<<6) | (c3&63) );
      i += 3;
    }
  }
  return result;
}

//////////////////////////

function EncodeMessage(str) {
  var buf = new ArrayBuffer(str.length * 1); // 2 bytes for each char
  var bufView = new Uint8Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}


/*----------------------------*/
/*----------------------------*/
/*----------------------------*/
/*                            */
/*----------------------------*/
/*----------------------------*/
/*----------------------------*/




if(serverConfig.ssl){
	
var privateKey = fs.readFileSync('./ssl/key.key', 'utf8');
var certificate = fs.readFileSync('./ssl/crt.crt', 'utf8');
var ca = fs.readFileSync('./ssl/intermediate.pem', 'utf8');
var credentials = { key: privateKey, cert: certificate, ca: ca };
var https = require('https');


var server  = https.createServer(credentials);


}else{

var  server = http.createServer();


}



const wss1 = new WebSocket.Server({ noServer: true });
const wss3 = new WebSocket.Server({ noServer: true });



var  wsClients=[];
var  wsClientsId=0;




////////////////////////////////////////////



////////////////////////////////

wss1.on('connection', function connection(ws) {


 ws.on('message', function incoming(message) {
	  

    
    /*------------------------*/
    
  
    
  
var request = require('request');

var gameName='';

if(message.toString().split(":::")[1]!=undefined){
try{	
var param=JSON.parse(message.toString().split(":::")[1]);
}catch(e){
return;
}


/*---------CQ---------*/

if(param.vals!=undefined){

	
if(param.irq!=undefined){
ws.send('~m~67~m~~j~{"err":0,"irs":1,"vals":[1,-2147483648,2,-503893983],"msg":null}');	

return;	
}	


param=param.vals[0];

	
}

/*-----------------------*/



var ck=param.cookie;
var sessionId=param.sessionId;
param.cookie='';

gameName=param.gameName;
}else{
var param={};	
var ck='';	
}

var gameURL= serverConfig.prefix+serverConfig.host+'/game/'+gameName+'/server?&sessionId='+sessionId;


if(gameName==undefined){
	console.log(param);
	return;
}


var paramStr=JSON.stringify(param);

var options = {
  method: 'post',
  body: param, 
  json: true, 
  rejectUnauthorized: false,
  requestCert: false,
  agent: false,
  url: gameURL,
  headers: {
	'Connection': 'keep-alive',
	"Content-Type": "application/json",
	'Content-Length': paramStr.length,
    'Cookie': ck
  }
}

request(options, function (err, res, body) {
  if (err) {
    console.log('Error :', err)
    return
  }

  if(body!=undefined){
	  
	try{  
	  
  var allReq=body.toString().split("------");
  
}catch(e){
	
   console.log('Error :', e)
return;	
}

  for(var i=0;i<allReq.length;i++){
	  

	  
	ws.send(allReq[i]);  
	  
  }
  
}

});
    
    /*-------------------------*/
   
    
  });

  ws.send('1::');




});


wss3.on('connection', function connection(ws) {
	
	
redis.subscribe('Lives', function(err, count) {
    console.log('subscribe on Lives');
});

redis.on('message', function(channel, message) {

    message = JSON.parse(message);



    ws.send(JSON.stringify(message.data));
});	
	
	
});	

server.on('upgrade', function upgrade(request, socket, head) {
  const pathname = url.parse(request.url).pathname;

  if (pathname === '/slots') {
    wss1.handleUpgrade(request, socket, head, function done(ws) {
      wss1.emit('connection', ws, request);
    });
  } else if (pathname === '/live') {
    wss3.handleUpgrade(request, socket, head, function done(ws) {
      wss3.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

server.listen(serverConfig.port.split("/")[0]);


