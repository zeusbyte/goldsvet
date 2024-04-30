



var fs = require('fs');
var serverConfig;

serverConfig = JSON.parse(fs.readFileSync('../../socket_config2.json', 'utf8'));
	

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

function EncodeMessage(str) {
  var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}


function hexToArrayBuffer (hex) {
  if (typeof hex !== 'string') {
    throw new TypeError('Expected input to be a string')
  }

  if ((hex.length % 2) !== 0) {
    throw new RangeError('Expected string to be an even number of characters')
  }

  var view = new Uint8Array(Math.round(hex.length / 2))

  for (var i = 0; i < hex.length; i += 2) {
    view[i / 2] = parseInt(hex.substring(i, i + 2), 16)
  }

  return view.buffer
}

/*-----------------------------------*/


function SendMessageToPHP(ws,params,ab){
	
 
 /*------------------------*/
var request = require('request');
var gameName='';
var ck=ws.cookie;
var sessionId=ws.sessionId;

gameName=ws.gameName;



var gameURL= serverConfig.prefix+serverConfig.host+'/game/'+gameName+'/server?&sessionId='+sessionId;

console.log(gameURL);
console.log(params);
console.log(ck);

var options = {
  method: 'post',
  body: params, 
  json: true, 
  rejectUnauthorized: false,
  requestCert: false,
  agent: false,
  url: gameURL,
  headers: {
	 
    'Cookie': ck
  }
}

request(options, function (err, res, body) {
  if (err) {
    console.log('Error :', err)
    return
  }
  console.log('answer');
  console.log(body);
  
  
 try{
	 
var sAnswer=JSON.parse(body.split(":::")[1]);
  
  }catch(e){
	
return;	
	  
  }
  
var packet = require('./mod/packet.js');		
var responsePacket=new packet.OutcomingPacket;
responsePacket.writeBuffer(ab);

if(sAnswer.action=="getBalance"){

responsePacket.offset=10;
responsePacket.writeString(sAnswer.currency);

responsePacket.offset=6;
responsePacket.writeUint32(sAnswer.Credit);

}

if(sAnswer.action=="Init2" || sAnswer.action=="Act58"){

responsePacket.offset=10;
responsePacket.writeString(sAnswer.currency);


}



if(sAnswer.action=="Act61"){

responsePacket.offset=26;
responsePacket.writeString(sAnswer.currency);

responsePacket.offset=6;
responsePacket.writeUint32(sAnswer.Denom);

responsePacket.offset=10;
responsePacket.writeUint32(sAnswer.Credit);

}

if(sAnswer.action=="Act41"){

responsePacket.offset=6;
responsePacket.writeUint32(sAnswer.Credit);

}

if(sAnswer.action=="Act18"){


responsePacket.offset=52;
responsePacket.writeUint32(sAnswer.Credit);

responsePacket.offset=104;
responsePacket.writeUint32(sAnswer.Credit);



if(sAnswer.serverResponse.payload!=undefined){


var payload=sAnswer.serverResponse.payload;

responsePacket.offset=76;
responsePacket.writeUint32(payload.serverResponse.totalFreeGames)

responsePacket.offset=84;
responsePacket.writeUint32(payload.serverResponse.fscount);




//responsePacket.offset=56;
//responsePacket.writeUint8(1);

responsePacket.offset=40;
responsePacket.writeUint32(payload.serverResponse.slotBet);



responsePacket.offset=88;
responsePacket.writeUint32(payload.serverResponse.bonusWin);

responsePacket.offset=100;
responsePacket.writeUint8(sAnswer.Denom);

var reels=payload.serverResponse.reelsSymbols;
var cOffset=56;

/*sym arr*/
for(var i=0; i<3; i++){
	
	for(var j=1; j<=5; j++){
		
var curSym=reels['reel'+j][i];	
	
responsePacket.offset=cOffset;
responsePacket.writeUint8(curSym);	

cOffset++;

	}
	
}



}


}


/*leo*/
if(sAnswer.action=="Act27"){

var abc=hexToArrayBuffer('01001200000009027f000a0003040b000b04090503050501040000000000000000000000000000000000000000140000001c000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000131c0000000000000000000000000000000000000f0f000000000000bfc9c993010000131c000000000000ffffffffb4f926ad00000000');	




responsePacket=new packet.OutcomingPacket;
responsePacket.writeBuffer(abc);


console.log('ACT27');
console.log(sAnswer);


var payload=JSON.parse(sAnswer.serverResponse.payload);
var reels=payload.serverResponse.reelsSymbols;


}
/*emeralnd city*/
if(sAnswer.action=="Act25"){

var abc=hexToArrayBuffer('0100120000004002940103060803060306080306030608030002060803000206080300020608030002040803000204090400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009a9999999999693f9a9999999999793f9a9999999999893f9a9999999999993f00000000000000000000000000000000000000000000000000000000000000000000000000000000aa1b0000000000000000000000000000000000000e0f000000000000e2f313f9010000aa1b000000000000ffffffff5c4f567000000000');	
//var abc=hexToArrayBuffer('010012000000400294010700060902070006090207000600020700000002070a000003070a000003070a000003070a0000030000000000000000000000000000000a0000001e000000000000000000000000000000000000000000000000000f0000001e0f0000001e00000000000000000000000000000000000000000000000000000000000000000000000f0000001e0f0000001e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f0000001e0f0000001e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000295c8fc2f5287c3f295c8fc2f5288c3f295c8fc2f5289c3f295c8fc2f528ac3f00000000000000000000000000000000000000000000000000000000000000000000000000000000e71a0000000000000000000000000000000000000f0f00000000000065f41eba010000e71a000000000000ffffffff8226141f00000000');	



responsePacket=new packet.OutcomingPacket;
responsePacket.writeBuffer(abc);


console.log(sAnswer);


var payload=JSON.parse(sAnswer.serverResponse.payload);
var reels=payload.serverResponse.reelsSymbols;
/*sym arr*/
var cOffset=10;



for(var i=0; i<8; i++){
	
	for(var j=1; j<=5; j++){
		
var curSym=reels['reel'+j][i];	
	
responsePacket.offset=cOffset;
responsePacket.writeUint8(curSym);	

cOffset++;

	}
	
}


//////////////////////////////////////////////////////////
//cOffset=25;

for(var i=0; i<50; i++){

var curWin=payload.serverResponse.spinWinsPrize[i];
var curWinMask=payload.serverResponse.spinWinsMask[i];



if(curWin>0){
responsePacket.offset=cOffset;
responsePacket.writeUint32(curWin);

responsePacket.offset=cOffset+4;
responsePacket.writeUint8(curWinMask);
}

cOffset+=5;	
	
}

//300-308 jacks
////////////////

cOffset=356

responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.scattersWin);
cOffset+=4;

responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.swm);
cOffset+=4;

responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.fsnew);
cOffset+=4;

responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.fscount);
cOffset+=4;


}


/*wizard OZ*/
if(sAnswer.action=="Act26"){

var abc=hexToArrayBuffer('01001200000041027f01040b050607040805060a040805060a040805060a040805060a060a090708060a090408060a090408060b090408060b090408060b0904080607090408080709040a08070b040a08070b040a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a4308000000000000000000271c0000000000000000000000000000000000000f0f0000000000007c257fd6010000271c000000000000ffffffffc6a5007900000000');	




responsePacket=new packet.OutcomingPacket;
responsePacket.writeBuffer(abc);


console.log(sAnswer);


var payload=JSON.parse(sAnswer.serverResponse.payload);
var reels=payload.serverResponse.reelsSymbols;
/*sym arr*/
var cOffset=10;



for(var i=0; i<15; i++){
	
	for(var j=1; j<=5; j++){
		
var curSym=reels['reel'+j][i];	
	
responsePacket.offset=cOffset;
responsePacket.writeUint8(curSym);	

cOffset++;

	}
	
}


//////////////////////////////////////////////////////////
//cOffset=25;

for(var i=0; i<50; i++){

var curWin=payload.serverResponse.spinWinsPrize[i];
var curWinMask=payload.serverResponse.spinWinsMask[i];



if(curWin>0){
responsePacket.offset=cOffset;
responsePacket.writeUint32(curWin);

responsePacket.offset=cOffset+4;
responsePacket.writeUint8(curWinMask);
}

cOffset+=5;	
	
}

//300-308 jacks
////////////////

cOffset=335

responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.scattersWin);
cOffset+=4;

responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.swm);
cOffset+=4;

responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.fsnew);
cOffset+=4;

responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.fscount);
cOffset+=4;


}

/*gamble*/
if(sAnswer.action=="Act21"){

var abc=hexToArrayBuffer('0100120000004b000800280000002c1d00000100002c1d000000000000ffffffff2a51fd3c00000000');	

responsePacket=new packet.OutcomingPacket;
responsePacket.writeBuffer(abc);


console.log(sAnswer);


var payload=JSON.parse(sAnswer.serverResponse.payload);

var gambleWin=payload.serverResponse.totalWin;

responsePacket.offset=10;
responsePacket.writeUint32(gambleWin);

}

if(sAnswer.action=="Act19"){


console.log(sAnswer);


var payload=JSON.parse(sAnswer.serverResponse.payload);
var reels=payload.serverResponse.reelsSymbols;
var wins=payload.serverResponse.spinWins;

var insertBytes='';

for(var i=0; i<wins.length; i++){
	
insertBytes+='00000000000000000000000000';	
	
}

//insertBytes+='00000000000000000000000000';


var abc=hexToArrayBuffer('010012000000ff014d00080304020b0908020b0a0a0703030500'+insertBytes+'000000000000000000000000000000000000002e0f000000000000000000000000000000000000cf0e000000000000e583a25c0100002e0f000000000000ffffffffb37d203300000000');	

//var abc=hexToArrayBuffer('010012000000ff01740008080c090b0907090c0a0c000807050300000008050000000310000001000000080a00000001180000020000000914000000a808000002000000c8000000040500000a0000000a0000005309000000000000000000000000000000000000d30e0000000000005fcc0dde0100005309000000000000ffffffff605bf8f400000000');	

//00000000000000000000000000

responsePacket=new packet.OutcomingPacket;
responsePacket.writeBuffer(abc);
responsePacket.offset=100;
responsePacket.writeUint32(sAnswer.Credit);
var cOffset=10;

/*sym arr*/
for(var i=0; i<3; i++){
	
	for(var j=1; j<=5; j++){
		
var curSym=reels['reel'+j][i];	
	
responsePacket.offset=cOffset;
responsePacket.writeUint8(curSym);	

cOffset++;

	}
	
}

/*wins*/

responsePacket.offset=8;
responsePacket.writeUint16((77+(wins.length*13)));
//responsePacket.writeUint16((77+(1*13)));


if(sAnswer.gameid!=undefined){
responsePacket.offset=6;
responsePacket.writeUint16(sAnswer.gameid);	
}



/*
responsePacket.offset=cOffset;
responsePacket.writeUint8(4);

responsePacket.offset=cOffset+1;
responsePacket.writeUint32(5);

responsePacket.offset=cOffset+5;
responsePacket.writeUint32(3);

responsePacket.offset=cOffset+9;
responsePacket.writeUint32(1);
*/

responsePacket.offset=25;
responsePacket.writeUint32(wins.length);

var cOffset=29;

for(var i=0; i<wins.length; i++){

var curWin=wins[i];


responsePacket.offset=cOffset;
responsePacket.writeUint8(curWin[0]);

responsePacket.offset=cOffset+1;
responsePacket.writeUint32(curWin[1]);

responsePacket.offset=cOffset+5;
responsePacket.writeUint32(curWin[2]);

responsePacket.offset=cOffset+9;
responsePacket.writeUint32(curWin[3]);

cOffset+=13;	
	
}


/*-------scatterwins--------*/


responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.scattersWin);
cOffset+=4;

responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.swm);
cOffset+=4;

responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.fsnew);
cOffset+=4;

responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.fscount);
cOffset+=4;





}

//////////////////////////////


if(sAnswer.action=="Act20"){


console.log('Act20');
console.log(sAnswer);


/////////////////////////////
////////////////////////////



var payload=JSON.parse(sAnswer.serverResponse.payload);
var reels=payload.serverResponse.reelsSymbols;


//if(lnGamesArr.indexOf(ws.gameName)!=-1){
	
var abc=hexToArrayBuffer('01001200000008027b00040306070004030606000403060600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000181e000000000000000000000000000000000000060f000000000000641485ae010000181e000000000000ffffffff2082367700000000');		


	
//}
responsePacket=new packet.OutcomingPacket;
responsePacket.writeBuffer(abc);
//responsePacket.offset=100;
//responsePacket.writeUint32(sAnswer.Credit);



	
var cOffset=10;

/*sym arr*/
for(var i=0; i<3; i++){
	
	for(var j=1; j<=5; j++){
		
var curSym=reels['reel'+j][i];	
	
responsePacket.offset=cOffset;
responsePacket.writeUint8(curSym);	

cOffset++;

	}
	
}	
	
	


/*wins*/

if(sAnswer.gameid!=undefined){
responsePacket.offset=6;
responsePacket.writeUint16(sAnswer.gameid);	
}




var cOffset=25;

for(var i=0; i<10; i++){

var curWin=payload.serverResponse.spinWinsPrize[i];
var curWinMask=payload.serverResponse.spinWinsMask[i];



if(curWin>0){
responsePacket.offset=cOffset;
responsePacket.writeUint32(curWin);

responsePacket.offset=cOffset+4;
responsePacket.writeUint8(curWinMask);
}

cOffset+=5;	
	
}


/*-------scatterwins--------*/
if(ws.gameName=='LeosTreasureMN'){
	

cOffset=79

responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.scattersWin);
cOffset+=4;

responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.swm);
cOffset+=4;

responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.fsnew);
cOffset+=4;

responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.fscount);
cOffset+=4;	
	
	
}else if(ws.gameName=='MayaTreasureMN'){
	

cOffset=75

responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.bonusWin0);
cOffset+=4;

responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.scattersWin);
cOffset+=4;

responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.swm);
cOffset+=4;

responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.fsnew);
cOffset+=4;

responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.fscount);
cOffset+=4;	
	
	
}else if(ws.gameName=='VikingAxeMN'){
	

cOffset=75

responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.scattersWin);
cOffset+=4;

responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.swm);
cOffset+=4;

responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.fsnew);
cOffset+=4;

responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.fscount);
cOffset+=4;	
	
	
}else{

cOffset=75

responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.scattersWin);
cOffset+=4;

responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.swm);
cOffset+=4;

responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.fsnew);
cOffset+=4;

responsePacket.offset=cOffset;
responsePacket.writeUint32(payload.serverResponse.fscount);
cOffset+=4;


}




////////////////////////////

//31- 5 oak
//30- 4 oak
//28- 3 oak
//24- 5 oak

//offset 8 - len =123	 uint16
//
//scaterWin  75
//scaterCells  79
//freegamesNew  83
//freegamesCount  87
//balance  91
//jackpotWin  95
//sgJackpot  99
//hallJackpot  103
//
//
//
//
//

//0000000000


}


ws.send(responsePacket.buffer);	

});
    
    /*-------------------------*/	
	
}



if(serverConfig.ssl){
	
var privateKey = fs.readFileSync('./ssl/key.key', 'utf8');
var certificate = fs.readFileSync('./ssl/crt.crt', 'utf8');
var ca = fs.readFileSync('./ssl/intermediate.pem', 'utf8');
var credentials = { key: privateKey, cert: certificate, ca: ca };
var https = require('https');


var httpsServer = https.createServer(credentials);
httpsServer.listen(serverConfig.port);

var WebSocket = require('ws').Server;
var wss = new WebSocket({
    server: httpsServer
});

}else{

var WebSocket = require('ws');
var wss = new WebSocket.Server({port: serverConfig.port });


}


//
function ResponseHandler(msg){
	
var msgJson=JSON.parse(msg);	
	
console.log(msgJson);	
	
	
}

///////
var  wsClients=[];
var  wsClientsId=0;

 wss.binaryType='arraybuffer';
wss.on('connection', function connection(ws) {
	
ws.msgId=0;
	
	
  ws.on('message', function incoming(message) {
	  

var messageView8= new Int8Array(message);

if(ws.msgId==0){
	
var msgString=DecodeMessage(message);	
var msgJson=JSON.parse(msgString.split(":::")[1]);	
	

	
ws.cookie=msgJson.cookie;	
ws.sessionId=msgJson.sessionId;	
ws.gameName=msgJson.gameName;	


	
ws.send(hexToArrayBuffer('010010000000eb297b05000000001ed9000081300100010000001900000faffff100204e00000a000000204e0000840a00005d0000003c0000000f00000000000000010000000100000001000000010000001027000077943febd0974dbcae489bf1f311b770ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff32be050005004d61727932010000006a1fd7dd00000000'));	


	
	
}else if(ws.msgId==1){
	
var ab=hexToArrayBuffer('010014000000840a00000000000000000000e3c82a5c00000000');	
var params={};
params.msgId=ws.msgId;
params.action='Init1';
SendMessageToPHP(ws,params,ab);


}else if(ws.msgId==2){
	
var ab=hexToArrayBuffer('01003a0000004803000003005553440100000001000000605e9f0500000000');	
var params={};
params.msgId=ws.msgId;
params.action='Init2';
SendMessageToPHP(ws,params,ab);
//ws.send(hexToArrayBuffer('1f000000478616d56ed874666d6384da29a0df033b97f3656f024cc65e9f0500000000'));	
	
//	
	
	
}else if(ws.msgId==3){
	
	
	

var ab=hexToArrayBuffer('010029000000000000000000000032be05000000000014f4c4fd00000000');

var params={};
params.msgId=ws.msgId;
params.action='getBalance';
SendMessageToPHP(ws,params,ab);


//ws.send(hexToArrayBuffer('1e0000001e46dc3360cadbf97d360e41d96383457b39ef9ea522dc5cc4fd00000000'));	
	
//	
	
	
}else if(ws.msgId==4){
	
var ab=hexToArrayBuffer('01003d00000064000000840a000000000000000000004803000003005553440100000001000000651404db00000000');	

var params={};
params.msgId=ws.msgId;
params.action='Act61';
SendMessageToPHP(ws,params,ab);

//ws.send(hexToArrayBuffer('2f0000004b46593ce5e0fb1493c17fdfa6785949040c93ebe58e96516d6384da29a0df03a54c01777e78a8221404db00000000'));	
	
//	
	
	
}else{
	
if(messageView8[6]==54){	
	
	
var ab=hexToArrayBuffer('01003600000002a40e0000000000008813000000000000071800000000000010270000000000008b2a000000000000204e000000000000bb5d00000000000050c30000000000000f004a41434b504f5420252e326c662020019cbbb21700000000');	
var params={};
params.msgId=ws.msgId;
params.action='Ping';
SendMessageToPHP(ws,params,ab);
//ws.send(hexToArrayBuffer('610000001f1c1aa13f8bbb33718008a836c804703c694ed05d5307cd5dd7b89af5b6b1e4b1b7a443a7ad486629890fabd11ce31b5874c55d4d79cd775e00bcb30d2da138916d1bf423775615197c93af085426693ddfd1e92c22dadb502537ecb161647f00'));	
	
//	
	
	
}else if(messageView8[6]==58){	
	
	
	
var ab=hexToArrayBuffer('01003a0000004803000003005553440100000001000000605e9f0500000000');	
var params={};
params.msgId=ws.msgId;
params.action='Act58';
SendMessageToPHP(ws,params,ab);
//ws.send(hexToArrayBuffer('1f000000478616d56ed874666d6384da29a0df033b97f3656f024cc65e9f0500000000'));	

//
	
}


/*start game  mess*/

 if(messageView8[6]==41){	
	
var ab=hexToArrayBuffer('010029000000840a00000000000032be05000000000014f4c4fd00000000');	

var params={};
params.msgId=ws.msgId;
params.action='Act41';
SendMessageToPHP(ws,params,ab);

//ws.send(hexToArrayBuffer('1e0000001e46dc3360cadbf97d360e41d96383457b39ef9ea522dc5cc4fd00000000'));	
	
//	
	
	
}

 if(messageView8[6]==61){	
	
var ab=hexToArrayBuffer('01003d00000001000000560f0000000000000000000048030000030055534401000000010000003861720700000000');	

var params={};
params.msgId=ws.msgId;
params.action='Act61';
SendMessageToPHP(ws,params,ab);

//ws.send(hexToArrayBuffer('1e0000001e46dc3360cadbf97d360e41d96383457b39ef9ea522dc5cc4fd00000000'));	
	
//	
	
	
}

 if(messageView8[6]==18){	
	
if(messageView8.length>=64){

var ab=hexToArrayBuffer('010012000000ff014d00080304020b0908020b0a0a0703030500000000000000000000000000000000000000002e0f000000000000000000000000000000000000cf0e000000000000e583a25c0100002e0f000000000000ffffffffb37d203300000000');	



var msgString=DecodeMessage(message);	


var msgJson=JSON.parse(msgString.split("::")[1].split("###")[0]);	



var params={};
params.msgId=ws.msgId;
params.action='Act18';

params.reqDat=msgJson;
SendMessageToPHP(ws,params,ab);

//ws.send(hexToArrayBuffer('2e000000b894691aea98b1eac68fd0e5661b1c63615abedc3702bbe3854db76a9b476eb4c59f0c0b662334a476ec00000000'));	

//


}else{	
	

var ab=hexToArrayBuffer('010012000000ff015e00000000000000000032be0500ff0100000000000048003008d1a12800000001000000be00000000000000560f0000060200080b050509090a0a06080005000000000000000000000000000000000000000000000000000000000001000000560f000000000000ffffffff23f747b200000000');	


if(ws.gameName=='HaresRevengeMN'){
var ab=hexToArrayBuffer('01001200000007025e00000000000000000032be0500070200000000000048003008d1a10a0000000100000000000000000000005a1d00000306080900090607090009060603070000000000000000000000000000000000000000000000000000000000010000005a1d000000000000ffffffff4139a60200000000');	
	
}


if(ws.gameName=='EmeraldCityMN'){
var ab=hexToArrayBuffer('0100120000004002ae00000000000000000032be0500400200000000000098003008d1a132000000010000006900000000000000af1a00000700060902070006090207000600020700000002070a000003070a000003070a000003070a000003000000000000e63f000000000000f63f000000000000064000000000000016400000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000001000000af1a000000000000ffffffff9c515b0f00000000');	
	
}



//var ab=hexToArrayBuffer('010012000000ff015e00000000000000000032be0500ff0100000000000048003008d1a128000000010000000a00000000000000ab1f0000050507060a0608060509070703080000000000001e000000000000000500000043170000000000000000000064000000ab1f000000000000ffffffffbf83414f00000000');	

var params={};
params.msgId=ws.msgId;
params.action='Act18';
SendMessageToPHP(ws,params,ab);
//ws.send(hexToArrayBuffer('240000003441f33d9aeaf43296ff17907959f378ebc51d295fa85a38e51ac9ea3afe8f8e00000000'));	
	
//	
	
	
}
	
}










	
}

ws.msgId++;

    
  });


});


