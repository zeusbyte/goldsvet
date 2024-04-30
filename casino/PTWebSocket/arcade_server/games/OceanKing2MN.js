
function Game(emitter,sys,utils) {

var _self = this;   

_self.gameCommand=null;
_self.gameCode=null;
_self.gameSettings=null;
_self.gameBalanceInCents=null;

///////////////////////////
_self.messageId=0;
_self.sceneBullets=[];
_self.sceneFishes=[];
_self.fishesUpdateInterval=0;

_self.gameData={};

/*---------- fishes paytable ------------*/

var fishPay=[];




fishPay['Fish_1'] = [2,2];
fishPay['Fish_2'] = [2,2];
fishPay['Fish_3'] = [3,3];
fishPay['Fish_4'] = [4,4];
fishPay['Fish_5'] = [5,5];
fishPay['Fish_6'] = [6,6];
fishPay['Fish_7'] = [7,7];
fishPay['Fish_8'] = [8,8];
fishPay['Fish_9'] = [9,9];
fishPay['Fish_10'] = [10,10];
fishPay['Fish_11'] = [12,12];
fishPay['Fish_12'] = [15,15];
fishPay['Fish_13'] = [18,18];
fishPay['Fish_14'] = [20,20];
fishPay['Fish_15'] = [25,25];
fishPay['Fish_16'] = [30,30];
fishPay['Fish_17'] = [40,40];
fishPay['Fish_18'] = [100,100];
fishPay['Fish_19'] = [120,120];
fishPay['Fish_20'] = [120,600];
fishPay['Fish_21'] = [174,174];
fishPay['Fish_22'] = [100,100];
fishPay['Fish_23'] = [60,60];
fishPay['Fish_24'] = [0,0];
fishPay['Fish_25'] = [0,0];
fishPay['Fish_26'] = [0,0];
fishPay['Fish_27'] = [0,0];
fishPay['Fish_28'] = [0,0];
fishPay['Fish_29'] = [0,0];
fishPay['Fish_30'] = [0,0];

var fishDamage=[];

fishDamage['Fish_0']=[1,3];
fishDamage['Fish_1']=[1,5];
fishDamage['Fish_2']=[1,5];
fishDamage['Fish_3']=[1,5];
fishDamage['Fish_4']=[1,5];
fishDamage['Fish_5']=[1,5];
fishDamage['Fish_6']=[1,5];
fishDamage['Fish_7']=[1,5];
fishDamage['Fish_8']=[2,10];
fishDamage['Fish_9']=[2,10];
fishDamage['Fish_10']=[2,20];
fishDamage['Fish_11']=[2,20];
fishDamage['Fish_12']=[5,20];
fishDamage['Fish_13']=[5,30];
fishDamage['Fish_14']=[5,30];
fishDamage['Fish_15']=[5,50];
fishDamage['Fish_16']=[10,60];
fishDamage['Fish_17']=[10,70];
fishDamage['Fish_18']=[10,80];
fishDamage['Fish_19']=[10,60];
fishDamage['Fish_20']=[10,60];
fishDamage['Fish_21']=[10,60];
fishDamage['Fish_22']=[10,50];
fishDamage['Fish_23']=[20,200];
fishDamage['Fish_24']=[20,200];
fishDamage['Fish_25']=[20,200];
fishDamage['Fish_26']=[20,200];
fishDamage['Fish_27']=[20,200];
fishDamage['Fish_28']=[20,200];
fishDamage['Fish_29']=[20,200];
fishDamage['Fish_30']=[20,200];



/*----------control fishes on scene------------*/

_self.fishesId=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,12,12,12,12,12,12,13,13,13,13,13,13,13,13,13,13,13,13,13,13,14,14,14,14,14,14,14,14,14,15,15,15,15,15,15,15,15,16,16,16,16,16,16,17,17,17,17,17,17,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,21,21,21,21,22,22,23,24,24,25,26];



_self.fishesId=utils.ShuffleArray(_self.fishesId);

_self.fishesId_=0;

this.FishesUpdate=function(){
	
var curFishOX=-10;	
var curFishOY=-20;	

var curFishId=_self.fishesId[utils.RandomInt(0,_self.fishesId.length-1)];
var curFishUID=utils.RandomInt(1,1000000);	
var curTime  = new Date();

/*
if(_self.fishesId_==20){
	curFishId=104;
}
*/
var routes=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27];
var route=routes[utils.RandomInt(0,routes.length-1)];	

	

	
var cFishHealth=utils.RandomInt(fishDamage['Fish_'+curFishId][0],fishDamage['Fish_'+curFishId][1]);	
//var cFishHealth=1;	
var cFishPay=utils.RandomInt(fishPay['Fish_'+curFishId][0],fishPay['Fish_'+curFishId][1]);	





	

_self.sceneFishes['fish_'+curFishUID]={curFishUID:curFishUID,fishId:curFishId,fishHealth:cFishHealth,fishPay:cFishPay,fishTime:curTime.getTime()};	

var  fishPreset='{"message":[{"uid":'+curFishUID+',"type":1,"classid":'+curFishId+',"fishid":'+curFishId+',"born_time":'+(curTime.getTime())+',"routeid":'+route+',"offsettype":0,"offsetx":'+curFishOX+',"offsety":'+curFishOY+',"offsetr":0,"dead_time":'+(curTime.getTime()+30000)+',"angel":0,"pos":0,"rate":'+cFishPay+',"gun_rate":1,"extra":0}],"succ":true,"errinfo":"ok","type":"increasesprites"}';		
	
	
	
emitter.emit('outcomingMessage',fishPreset,true);		
	
_self.fishesId_++;	
	
};

this.StartFishesUpdate=function(){
_self.StopFishesUpdate();	
_self.fishesUpdateInterval=setInterval(_self.FishesUpdate,500);	
	
};

this.StopFishesUpdate=function(){
	

clearInterval(_self.fishesUpdateInterval);
	
};
this.ClearGameData=function(){
	

clearInterval(_self.msgHandlerTicker);
clearInterval(_self.fishesUpdateInterval);
	
};




/*----------control fishes on scene------------*/
                 /*-----------------------*/
                 /*-----------------------*/
                 /*-----------------------*/





 this.Ping = async function(dat)
{

var curTime  = new Date();
	
var response='{"type":"heart","message":{"time":'+curTime.getTime()+'}}';
emitter.emit('outcomingMessage',response,true);		
	
}



 this.MessageHandler_ = async function(action,ab,dat={})
{

var curTime  = new Date();
	
/*----------------------------------*/
/*----------------------------------*/
/*----------------------------------*/




  
var packet = require('../mod/packet.js');		
var responsePacket=new packet.OutcomingPacket;
responsePacket.writeBuffer(ab);


if(action=='Init1'){

await sys.CreateConnection();


/*-------gameSettings-------*/		
	
	
var gameSettings=await sys.GetSettings();
_self.gameSettings={};
_self.gameSettings.bets=gameSettings.bet.split(',');



_self.gameSettings.limits=[];
_self.gameSettings.limits['time1']=gameSettings.time1*60;
_self.gameSettings.limits['time2']=gameSettings.time2*60;
_self.gameSettings.limits['time3']=gameSettings.time3*60;
_self.gameSettings.limits['sum_win1']=gameSettings.sum_win1;
_self.gameSettings.limits['sum_win2']=gameSettings.sum_win2;
_self.gameSettings.limits['sum_win3']=gameSettings.sum_win3;
_self.gameSettings.limits['one_win1']=gameSettings.one_win1;
_self.gameSettings.limits['one_win2']=gameSettings.one_win2;
_self.gameSettings.limits['one_win3']=gameSettings.one_win3;

///////////////////////////////
sys.bankType=gameSettings.gamebank;	
	
/*-------init game data-------*/	

_self.gameData.slotState='';	
_self.gameData.freeInfo={count:-1,index:0};	
	
/*----------------*/

	


		
}



switch(action){


case 'Init1':
case 'Init2':
case 'Act61':
case 'Ping':
case 'Act58':
case 'getBalance':

var balanceInCents=Math.round(await sys.GetBalance()*100);


responsePacket.offset=6;
responsePacket.writeUint32(balanceInCents);


break;

case 'Act41':
var balanceInCents=Math.round(await sys.GetBalance()*100);

responsePacket.offset=6;
responsePacket.writeUint32(balanceInCents);
responsePacket.offset=29;
responsePacket.writeUint32(sys.userName);

break;

case 'Act18':

responsePacket.offset=35;
responsePacket.writeUint32(sys.userName);

break;

case 'Act19':


/*-------------------------------*/
/*--------------HIT-----------------*/
/*-------------------------------*/
/*-------------------------------*/



var fishPays=[];
fishPays[1]=2;
fishPays[2]=2;
fishPays[3]=3;
fishPays[4]=4;
fishPays[5]=5;
fishPays[6]=6;
fishPays[7]=7;
fishPays[8]=8;
fishPays[9]=9;
fishPays[10]=10;//octopus
fishPays[11]=15;//fishfisher
fishPays[12]=18;//tutle
fishPays[13]=20;//saw fish
fishPays[14]=[22,22];//mentaray
fishPays[15]=[30,80];// giant nemo
fishPays[16]=[30,80];//giantButterfly16
fishPays[17]=[30,80];// big puffer
fishPays[18]=[40,100];//shark
fishPays[19]=[100,180];// whale
fishPays[28]=[50,120];//goldenGiantNemo28
fishPays[29]=[100,160];//golden shark
fishPays[32]=12;//jellyfish
fishPays[33]=12;//small jellyfish
fishPays[39]=[150,250];//golden whale
fishPays[40]=[50,120];//golden puffer
fishPays[51]=[50,120];//goldenGiantButterfly51



var fishDamage=[];
fishDamage[1]=2;
fishDamage[2]=2;
fishDamage[3]=3;
fishDamage[4]=4;
fishDamage[5]=5;
fishDamage[6]=6;
fishDamage[7]=7;
fishDamage[8]=8;
fishDamage[9]=9;
fishDamage[10]=10;//octopus
fishDamage[11]=15;//fishfisher
fishDamage[12]=18;//tutle
fishDamage[13]=20;//saw fish
fishDamage[14]=22;//mentaray
fishDamage[15]=70;// giant nemo
fishDamage[16]=70;//giantButterfly16
fishDamage[17]=70;// big puffer
fishDamage[18]=100;//shark
fishDamage[19]=150;// whale
fishDamage[28]=120;//goldenGiantNemo28
fishDamage[29]=160;//golden shark
fishDamage[32]=12;//jellyfish
fishDamage[33]=12;//small jellyfish
fishDamage[39]=180;//golden whale
fishDamage[40]=100;//golden puffer
fishDamage[51]=100;//goldenGiantButterfly51


/*-------------------------------------*/
var curTime  = new Date();	
/*--------------*/
if(sys.conn.connection._closing){
await sys.CreateConnection();	
}
/*-------------*/
await sys.StartTransaction();	



var allbet =0;
var targetFishes=dat.hits;
for(var fi=0; fi<targetFishes.length; fi++){

var cfish=targetFishes[fi];

allbet+=cfish.bet/100;

}
/*----------------------------------------*/
var bank = await sys.GetBank();
/*----------------------------------------*/
var startBalance=await sys.GetBalanceB();	
allbet=parseFloat(allbet);
if(startBalance<allbet || allbet<0.0001 || !Number.isFinite(allbet) ){
emitter.emit('Error','Invalid balance or bet');	
sys.Rollback();   	
return;	
}	
/*bank/balance/jacks*/
await sys.UpdateJackpots(allbet);

if(sys.address>0 && sys.count_balance<=0){
sys.shopPercent=100;	
}else if(sys.count_balance<=0){
sys.shopPercent=100;	
}

if(sys.shopPercent>0){
var sumToBank=(allbet/100)*sys.shopPercent;		
}else{
var sumToBank=allbet;		
}
	
await sys.SetBalance(-allbet);	
await sys.SetBank(sumToBank,'bet');	
/*--------------------------------------------*/
/*--------------------------------------------*/



/*---------------fishes damage----------------------*/

var responseHits=[];

var totalWin=0;
for(var fi=0; fi<targetFishes.length; fi++){

var cfish=targetFishes[fi];
var curPay=0;



if(fishPays[cfish.fishType]!=undefined){
fishPays[cfish.fishType]=[];	
}

if(fishPays[cfish.fishType][1]!=undefined){
curPay=utils.RandomInt(fishPays[cfish.fishType][0],fishPays[cfish.fishType][1]);
}else{
curPay=fishPays[cfish.fishType];	
}

var tmpWin=(cfish.bet/100)*curPay;
var isWin=utils.RandomInt(1,fishDamage[cfish.fishType]);




//limit control




if(isWin==1 && (totalWin+tmpWin)<=bank){
	
totalWin+=tmpWin;	
targetFishes[fi].win=Math.round(tmpWin/cfish.bet*100);


}else{
targetFishes[fi].win=0;	
}
	
/*stepBalance=startBalance-allbet+totalWin;	
targetFishes[fi].balance=Math.round(stepBalance*100);
*/

}

/*-------------------------------------*/
/*-------------------------------------*/


var fishLenOffset=10+(targetFishes.length*8);

responsePacket.offset=8;
responsePacket.writeUint16(fishLenOffset);


var cOffset=14;

for(var fi=0; fi<targetFishes.length; fi++){
	
var cfish=targetFishes[fi];

responsePacket.offset=cOffset;
responsePacket.writeUint32(cfish['fishId']);
cOffset+=4;
responsePacket.offset=cOffset;
responsePacket.writeUint32(Math.round(cfish['win']));
cOffset+=4;


var stepBalance=Math.round((startBalance-allbet+totalWin)*100);	



}



var endBalance=startBalance-allbet+totalWin;



responsePacket.offset=cOffset;
responsePacket.writeUint32(endBalance*100);

/*-------------------------------------*/
/*-------------------------------------*/





if(totalWin>0){
	
await sys.SetBalance(totalWin);	
await sys.SetBank(-totalWin,'');	
}



 await sys.Commit();
sys.SaveLogReport({balance:endBalance,bet:allbet,win:totalWin});		


/*------------------------------*/






/*------------------------------*/
/*------------------------------*/
/*------------------------------*/
/*------------------------------*/


break;

}

emitter.emit('outcomingMessage',responsePacket.buffer,false);	


/*---------------------------------*/
/*---------------------------------*/
/*---------------------------------*/

	
	
}

 this.IncomingDataHandler = async function(data)
{

_self.msgHandlerStack.push(data);

};


 this.MessageCheck = async function(data)
{



if(_self.msgHandler==1 && _self.msgHandlerStack.length>0){
	
////console.log('_self.msgHandler=0');	
_self.msgHandler=0;		
	
var dt=_self.msgHandlerStack.shift();
	
try{	
await _self.MessageHandler(dt);	
}catch(e){
	
var detailError={
	
msg:e.message,	
stack:e.stack,	
desc:'Game error. Check code.',	
	
};	

sys.Rollback();
sys.InternalErrorLog(JSON.stringify(detailError));	
_self.msgHandler=1;	
}	

	

////console.log('_self.msgHandler=1');				
}



};

 this.MessageHandler = async function(data)
{
	
	
	
var messageView8= new Int8Array(data.fullRequest);	
	
	
if(_self.messageId==0){
	
var response=utils.hexToArrayBuffer('010010000000eb297b05000000001ed90000813001000100000019000000a0860100204e00000a000000204e0000840a00005d0000003c0000000f00000000000000010000000100000001000000010000001027000077943febd0974dbcae489bf1f311b770ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff32be050005004d61727932010000006a1fd7dd00000000');

emitter.emit('outcomingMessage',response,false);	

_self.messageId++;
_self.msgHandler=1;
return;
	
}else if(_self.messageId==1){

var ab=utils.hexToArrayBuffer('010014000000840a00000000000000000000e3c82a5c00000000');	
var action='Init1';
await _self.MessageHandler_(action,ab);
_self.messageId++;
_self.msgHandler=1;
return;
	
}else if(_self.messageId==2){
	
var ab=utils.hexToArrayBuffer('01003a0000004803000003005553440100000001000000605e9f0500000000');	
var action='Init2';
await _self.MessageHandler_(action,ab);
_self.messageId++;
_self.msgHandler=1;
return;
	
}else if(_self.messageId==3){
	
var ab=utils.hexToArrayBuffer('010029000000000000000000000032be05000000000014f4c4fd00000000');
var action='getBalance';
await _self.MessageHandler_(action,ab);
_self.messageId++;
_self.msgHandler=1;
return;
	
}else if(_self.messageId==4){
	
var ab=utils.hexToArrayBuffer('01003d00000064000000840a000000000000000000004803000003005553440100000001000000651404db00000000');	
var action='Act61';
await _self.MessageHandler_(action,ab);
_self.messageId++;
_self.msgHandler=1;
return;
	
}else {



if(messageView8[6]==54){	
	
	
var ab=utils.hexToArrayBuffer('01003600000002a40e0000000000008813000000000000071800000000000010270000000000008b2a000000000000204e000000000000bb5d00000000000050c30000000000000f004a41434b504f5420252e326c662020019cbbb21700000000');	
var action='Ping';
await _self.MessageHandler_(action,ab);
_self.msgHandler=1;
return;
	
}else if(messageView8[6]==58){	
	
	
	
var ab=utils.hexToArrayBuffer('01003a0000004803000003005553440100000001000000605e9f0500000000');	
var action='Act58';
await _self.MessageHandler_(action,ab);
_self.msgHandler=1;
return;	
}


/*start game  mess*/

 if(messageView8[6]==41){	
	
var ab=utils.hexToArrayBuffer('010029000000840a00000000000032be05000000000014f4c4fd00000000');	
var action='Act41';
await _self.MessageHandler_(action,ab);
_self.msgHandler=1;
return;

	
	
}

 if(messageView8[6]==18){	
	
if(messageView8.length>=64){

var ab=utils.hexToArrayBuffer('0100120000000f001200e542bb8b3206000002000000740a0000740a000000000000ffffffff9fec605b00000000');	

//console.log(jMsg0);
//
var jMsg0=utils.DecodeMessage(data.fullRequest).split('::')[1].split('####')[0];
try{
var fishData=JSON.parse(jMsg0);
}catch(e){
var fishData=JSON.parse('{ "gameId": 15,"lenHits": 15,"hits":[ { "fishId": 43,"fishType": -1,"bet": 1,"syncRand": 1034981112,"win": 0,"balance": 0 } ] }');	
}
var action='Act19';
await _self.MessageHandler_(action,ab,fishData);
_self.msgHandler=1;
return;


}else{	
	
var ab=utils.hexToArrayBuffer('0100120000000f000800f88eb03d5d01740a000000000000ffffffff261765bf00000000');	
var action='Act18';
await _self.MessageHandler_(action,ab);
_self.msgHandler=1;
return;
	
}
	
}



	
}	






};


_self.msgHandler=1;
_self.msgHandlerStack=[];
_self.msgHandlerTicker=0;

_self.msgHandlerTicker=setInterval(_self.MessageCheck,20);

return _self;	
	
}



module.exports = { Game }
