const http = require('http');
const WebSocket = require('ws');
const url = require('url');
var fs = require('fs');
var serverConfig = JSON.parse(fs.readFileSync('../../arcade_config.json', 'utf8'));
var rUtils = require('./arcade_server/Utils.js');
var rSystem = require('./arcade_server/System.js');
var rQueue = require('./arcade_server/Queue.js');
var EventEmitter = require('events');


var sessionStorage=[];
var serverStorage=[];

////////////////////////////
////////////////////////////

var Queue= new rQueue.Queue();		

var isDebug=process.argv[2];

if(isDebug!=1){
//console.log=function(){};	
}




///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////KAPLAYER/////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function CreatePlayerKA(ws,connections,playerId){
	
var _self=this;	

_self.emitter = new EventEmitter();	
_self.modUtils =new rUtils.Utils(_self.emitter);
_self.modSystem = new rSystem.System(_self.emitter,sessionStorage,serverStorage,_self.modUtils,Queue.emitter,serverConfig.timezone);		
_self.ws=ws;	
_self.gameName=null;
_self.session=null;
_self.MessageId=0;

var firstRequest=[];	
	
 _self.ws.on('close', function cls() {
	 
	 var userIdPos=connections.indexOf(_self.modSystem.userId);

if(userIdPos!=-1){
connections.splice(userIdPos,1);	
}
	 
	try{

_self.emitter.removeAllListeners('IncomingMessage');
_self.emitter.removeAllListeners('outcomingMessage');

_self.modSystem.EndConnection();
_self.gameController.ClearGameData();
_self.modSystem.ClearTicker();
delete _self.emitter;	
delete _self.modSystem;
delete _self.modUtils;
delete _self.gameController;

}catch(e){
	
} 

	 
console.log('close');

//////
for(let i=0; i<players.length; i++){
	
if(players[i].modSystem==undefined || players[i].modSystem.userId==-1){
players.splice(i,1);	
}	
	
}


console.log(connections);

 });	 
	
	
	
_self.ResponseHandler=function(msg){
var cMsg='';	
var wf=msg.indexOf('{"');
if(wf!==-1){
cMsg = msg.substring(wf, msg.length);
	
}	
var msgJson=JSON.parse(cMsg);	
return msgJson;
	
}	
	
	
 _self.ws.on('message', function  incoming(message) {
	  
/*----parse incoming message----*/

var msgStr=_self.modUtils.DecodeMessage(message);
var messageView = new Int8Array(message);	

if(msgStr.length==4 &&  messageView[1]==0 && messageView[2]==0 && messageView[3]==0){
	
  var response = new ArrayBuffer(4);
  var bufView = new Int8Array(response);	
  
  
	bufView[0]=3;
	bufView[1]=0;
	bufView[2]=0;
	bufView[3]=0;
	ws.send(response);
	return;
	
}else{
	
if(_self.MessageId==0){
	
var msgStr=_self.modUtils.DecodeMessage(message);
var jsnMsg=_self.ResponseHandler(msgStr); 
var response=_self.modUtils.EncodeMessage('...#{"code":200,"sys":{"heartbeat":30}}');	
var responseView = new Int8Array(response);
responseView[0]=1;
responseView[1]=0;
responseView[2]=0;
ws.send(response);

_self.MessageId++;	
return;	
}
	
	
}
	
try{
var msg=_self.modUtils.DecodeMessage(message);	
var incomingMess=_self.ResponseHandler(msg);	
var incomingCookie=_self.modUtils.CookieParse(incomingMess.cookie);	
incomingMess.fullRequest=message;
_self.gameName=incomingMess.gameName;
_self.session=incomingCookie['laravel_session'];

}catch(er){

_self.emitter.emit('Error','MessageParseError');		

}


/*-----------------------*/

if(_self.modSystem.userId==-1 && firstRequest.length>0){
firstRequest.push(incomingMess);
return;
}

/*-----------------------*/
//_self.gameController.IncomingDataHandler(firstRequest.shift());	

if(_self.modSystem.userId==-1){

if(incomingCookie['laravel_session']==undefined || incomingCookie['laravel_session']==""){
_self.emitter.emit('Error','InvalidSession');		
}else{



if(incomingMess.gameName==undefined){
incomingMess.gameName='FishHunterKA';
}

firstRequest.push(incomingMess);

let gameUrl =  serverConfig.prefix+serverConfig.host+'/game/'+incomingMess.gameName+'/server?sessionId='+incomingMess.sessionId;
_self.modSystem.gameName=incomingMess.gameName;
_self.emitter.emit('GetAuth',incomingMess.cookie,gameUrl,incomingMess.sessionId);	
}	
	
	
}else if(_self.modSystem.gameName==undefined || _self.modSystem.gameName==''){

_self.emitter.emit('Error','InvalidGame');		
	
}else{
	
incomingMess.messageView=messageView;
	
_self.emitter.emit('IncomingMessage',incomingMess);	
	
}


  });	


/*main events*/
/*------------------*/


_self.emitter.on('IncomingMessage',  function(data){

//try{
	
_self.gameController.IncomingDataHandler(data);
//}catch(e){
//_self.modSystem.Rollback();
//}

});  
/*------------------*/


_self.emitter.on('outcomingMessage',function(dataStr,isBArr=false){


ws.send(dataStr);	




});  
/*------------------*/


_self.emitter.on('GetAuth',function(ck,gameUrl,sessionId){

_self.modSystem.Auth(ck,gameUrl,sessionId);

});  
/*------------------*/
/*------------------*/


_self.emitter.on('Log',function(advr=''){


console.log('Log',advr);	


});  
/*------------------*/
/*------------------*/


_self.emitter.on('AuthAccept',  async function(){
	
console.log('AuthAccept',_self.modSystem.userId);	
/*	
if(connections.indexOf(_self.modSystem.userId)!=-1){

_self.modSystem.userId=-1;
	
	_self.emitter.emit('Error','Too many login');		
	_self.emitter.emit('CloseSocket');
*/
//}else{


var gct=require('./arcade_server/games/'+_self.modSystem.gameName+'.js');	
_self.gameController=new gct.Game(_self.emitter,_self.modSystem,_self.modUtils);	


/*stack requests*/
var frcCount=firstRequest.length;

for(var frc=0; frc<frcCount; frc++){
	var sM=firstRequest.shift();
   _self.gameController.IncomingDataHandler(sM);		
}


var userIdPos=connections.indexOf(_self.modSystem.userId);

if(userIdPos!=-1){
connections.splice(userIdPos,1);	
}

//connections.push(_self.modSystem.userId);	
	
//}	
	
	

	


});  
/*------------------*/


_self.emitter.on('Error',function(eMsg){
	
console.log('Error',eMsg);	
_self.emitter.emit('outcomingMessage','{"responseEvent":"error","responseType":"","serverResponse":"'+eMsg+'"}');	
});  
/*------------------*/	


_self.emitter.on('CloseSocket',function(){
	
ws.close();

});  
/*------------------*/	
	
	
}
////////////////////////////


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////DEFAULT PLAYER//////////////
function CreatePlayer(ws,connections,playerId){
	
var _self=this;	

_self.emitter = new EventEmitter();	
_self.modUtils =new rUtils.Utils(_self.emitter);
_self.modSystem = new rSystem.System(_self.emitter,sessionStorage,serverStorage,_self.modUtils,Queue.emitter,serverConfig.timezone);	
_self.ws=ws;	
_self.gameName=null;
_self.session=null;



var firstRequest=[];	
	
 _self.ws.on('close', function cls() {
	 
	 var userIdPos=connections.indexOf(_self.modSystem.userId);

if(userIdPos!=-1){
connections.splice(userIdPos,1);	
}
	 
	try{



_self.modSystem.EndConnection();
_self.gameController.ClearGameData();
_self.emitter.removeAllListeners('IncomingMessage');
_self.emitter.removeAllListeners('outcomingMessage');
 _self.modSystem.ClearTicker();
delete _self.emitter;
delete _self.modSystem;
delete _self.modUtils;
delete _self.gameController;

}catch(e){
	
} 

	 
console.log('close');

//////
for(let i=0; i<players.length; i++){
	
if(players[i].modSystem==undefined || players[i].modSystem.userId==-1){
players.splice(i,1);	
}	
	
}


console.log(connections);

 });	 
	
	
 _self.ws.on('message', async function  incoming(message) {
	
//
//console.log(_self.modUtils.DecodeMessage(message));
	
/*----parse incoming message----*/

try{

var tmp_r=_self.modUtils.DecodeMessage(message).split(': ::');

if(tmp_r[1]!=undefined){
message=	tmp_r[1];
}

}catch(er){
	
	
}






try{
var incomingMess=JSON.parse(message.split(":::")[1]);	
var incomingCookie=_self.modUtils.CookieParse(incomingMess.cookie);	
}catch(er){
	
	
try{
	
	
var incomingMess=JSON.parse(message);	
var incomingCookie=_self.modUtils.CookieParse(incomingMess.cookie);	

}catch(er){

	
	
try{
var msg=_self.modUtils.DecodeMessage(message);	
var incomingMess=JSON.parse(msg);	
var incomingCookie=_self.modUtils.CookieParse(incomingMess.cookie);	
}catch(er){
	
	
	
try{
var msg=_self.modUtils.DecodeMessage(message);	
var incomingMess=JSON.parse(msg.split(":::")[1]);	
var incomingCookie=_self.modUtils.CookieParse(incomingMess.cookie);	
incomingMess.fullRequest=message;
_self.gameName=incomingMess.gameName;
_self.session=incomingCookie['laravel_session'];

}catch(er){
	
	//console.log(_self.gameName);
	
	//if(_self.gameName=='OceanKing2MN' || _self.gameName=='LuckyFishingCQ9'){
		
	var incomingMess={fullRequest:message};	
//	_self.emitter.emit('IncomingMessage',incomingMess);		
	//}else{
	
//_self.emitter.emit('Error','MessageParseError');		


	//}
	

}


}

}	

}


/*-----------------------*/

if(_self.modSystem.userId==-1 && firstRequest.length>0){
firstRequest.push(incomingMess);
return;
}

/*-----------------------*/
//_self.gameController.IncomingDataHandler(firstRequest.shift());	

if(_self.modSystem.userId==-1){

if(incomingCookie['laravel_session']==undefined || incomingCookie['laravel_session']==""){
_self.emitter.emit('Error','InvalidSession');		
}else{


firstRequest.push(incomingMess);

let gameUrl =  serverConfig.prefix+serverConfig.host+'/game/'+incomingMess.gameName+'/server?sessionId='+incomingMess.sessionId;
_self.modSystem.gameName=incomingMess.gameName;
_self.emitter.emit('GetAuth',incomingMess.cookie,gameUrl,incomingMess.sessionId);	
}	
	
	
}else if(_self.modSystem.gameName==undefined || _self.modSystem.gameName==''){

_self.emitter.emit('Error','InvalidGame');		
	
}else{
	

	
//_self.emitter.emit('IncomingMessage',incomingMess);	
//try{
	
await _self.gameController.IncomingDataHandler(incomingMess);	
//}catch(e){
//_self.modSystem.Rollback();	
//}


}


  });	


/*main events*/
/*------------------*/


_self.emitter.on('IncomingMessage',  function(data){

//try{

_self.gameController.IncomingDataHandler(data);

//}catch(e){

//}

});  
/*------------------*/


_self.emitter.on('outcomingMessage',function(dataStr,isBArr=false){

if(isBArr){

ws.send(_self.modUtils.EncodeMessage(dataStr));	
}else{
ws.send(dataStr);	
}



});  
/*------------------*/


_self.emitter.on('GetAuth',function(ck,gameUrl,sessionId){

_self.modSystem.Auth(ck,gameUrl,sessionId);

});  
/*------------------*/
/*------------------*/


_self.emitter.on('Log',function(advr=''){


console.log('Log',advr);	


});  
/*------------------*/
/*------------------*/


_self.emitter.on('AuthAccept',  async function(){
	
console.log('AuthAccept',_self.modSystem.userId);	
/*	
if(connections.indexOf(_self.modSystem.userId)!=-1){

_self.modSystem.userId=-1;
	
	_self.emitter.emit('Error','Too many login');		
	_self.emitter.emit('CloseSocket');

}else{
*/

var gct=require('./arcade_server/games/'+_self.modSystem.gameName+'.js');	
_self.gameController=new gct.Game(_self.emitter,_self.modSystem,_self.modUtils);	


/*stack requests*/
var frcCount=firstRequest.length;

for(var frc=0; frc<frcCount; frc++){
	var sM=firstRequest.shift();
   _self.gameController.IncomingDataHandler(sM);		
}


var userIdPos=connections.indexOf(_self.modSystem.userId);

if(userIdPos!=-1){
connections.splice(userIdPos,1);	
}

//connections.push(_self.modSystem.userId);	
	
//}	
	
	

	


});  
/*------------------*/


_self.emitter.on('Error',function(eMsg){
	
console.log('Error',eMsg);	
_self.emitter.emit('outcomingMessage','{"responseEvent":"error","responseType":"","serverResponse":"'+eMsg+'"}');	
});  
/*------------------*/	


_self.emitter.on('CloseSocket',function(){
	
ws.close();

});  
/*------------------*/	
	
	
}
////////////////////////////
/*----------------------------*/
var wss1 = new WebSocket.Server({ noServer: true });
var wss2 = new WebSocket.Server({ noServer: true });
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

////////////////////////////
var connections=[];
var players=[];
////////////////////////////


wss1.on('connection', function connection(ws) {
	

players.push(new CreatePlayer(ws,connections));	
	
});	

wss2.on('connection', function connection(ws) {
	

players.push(new CreatePlayerKA(ws,connections));	
	
});	


/////////////////////////////
server.on('upgrade', function upgrade(request, socket, head) {
   var  pathname = url.parse(request.url).pathname;

  if (pathname === '/ka_fish') {

	    wss2.handleUpgrade(request, socket, head, function done(ws) {
      wss2.emit('connection', ws, request);
		});
	  
  }else{
	  
	  
	    wss1.handleUpgrade(request, socket, head, function done(ws) {
      wss1.emit('connection', ws, request);
    });

	
  }

 
});

server.listen(serverConfig.port.split("/")[0]);
