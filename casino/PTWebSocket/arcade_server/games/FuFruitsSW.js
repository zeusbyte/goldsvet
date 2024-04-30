
function Game(emitter,sys,utils) {

var _self = this;   

_self.gameCommand=null;
_self.gameCode=null;
_self.gameSettings=null;
_self.gameBalanceInCents=null;

///////////////////////////
_self.sceneBullets=[];
_self.sceneFishes=[];
_self.fishesUpdateInterval=0;

_self.gameData={};

/*---------- fishes paytable ------------*/

var fishPay=[];

fishPay['Fish_1'] = [0,0];
fishPay['Fish_103'] = [0,0];
fishPay['Fish_0'] = [0,0];
fishPay['Fish_1'] = [2,2];
fishPay['Fish_2'] = [2,2];
fishPay['Fish_3'] = [3,3];
fishPay['Fish_4'] = [4,4];
fishPay['Fish_5'] = [5,5];
fishPay['Fish_6'] = [6,6];
fishPay['Fish_7'] = [7,7];
fishPay['Fish_8'] = [20,20];
fishPay['Fish_9'] = [8,8];
fishPay['Fish_10'] = [30,30];
fishPay['Fish_11'] = [10,10];
fishPay['Fish_12'] = [12,12];
fishPay['Fish_13'] = [15,15];
fishPay['Fish_14'] = [18,18];
fishPay['Fish_15'] = [25,25];
fishPay['Fish_16'] = [40,40];
fishPay['Fish_17'] = [50,50];
fishPay['Fish_18'] = [80,80];
fishPay['Fish_1901'] = [50,50];
fishPay['Fish_1902'] = [80,80];
fishPay['Fish_1903'] = [100,100];
fishPay['Fish_1904'] = [150,150];
fishPay['Fish_1905'] = [200,200];
fishPay['Fish_1906'] = [300,300];
fishPay['Fish_1907'] = [500,500];
fishPay['Fish_2001'] = [200,200];
fishPay['Fish_2002'] = [250,250];
fishPay['Fish_2003'] = [300,300];
fishPay['Fish_2004'] = [350,350];
fishPay['Fish_2005'] = [500,500];
fishPay['Fish_2006'] = [888,888];
fishPay['Fish_21'] = [5,5];

var fishDamage=[];

fishDamage['Fish_0'] = [0,0];
fishDamage['Fish_1'] = [6,6];
fishDamage['Fish_2'] = [6,6];
fishDamage['Fish_3'] = [10,10];
fishDamage['Fish_4'] = [10,10];
fishDamage['Fish_5'] = [10,10];
fishDamage['Fish_6'] = [16,16];
fishDamage['Fish_7'] = [16,16];
fishDamage['Fish_8'] = [30,30];
fishDamage['Fish_9'] = [20,20];
fishDamage['Fish_10'] = [60,60];
fishDamage['Fish_11'] = [30,30];
fishDamage['Fish_12'] = [30,30];
fishDamage['Fish_13'] = [30,30];
fishDamage['Fish_14'] = [50,50];
fishDamage['Fish_15'] = [60,60];
fishDamage['Fish_16'] = [100,100];
fishDamage['Fish_17'] = [100,100];
fishDamage['Fish_18'] = [100,100];
fishDamage['Fish_1901'] = [100,100];
fishDamage['Fish_1902'] = [200,200];
fishDamage['Fish_1903'] = [100,100];
fishDamage['Fish_1904'] = [140,140];
fishDamage['Fish_1905'] = [140,140];
fishDamage['Fish_1906'] = [140,140];
fishDamage['Fish_1907'] = [200,200];
fishDamage['Fish_2001'] = [200,200];
fishDamage['Fish_2002'] = [200,200];
fishDamage['Fish_2003'] = [200,200];
fishDamage['Fish_2004'] = [300,300];
fishDamage['Fish_2005'] = [300,300];
fishDamage['Fish_2006'] = [200,200];
fishDamage['Fish_21'] = [6,6];	
fishDamage['Fish_103'] = [10000,10000];	



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
	
	
	
emitter.emit('outcomingMessage',fishPreset);		
	
_self.fishesId_++;	
	
};

this.StartFishesUpdate=function(){

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



 this.Init = async function(dat)
{


var response;

await sys.CreateConnection();	

var balanceInCents=await sys.GetBalance()*100;
_self.gameBalanceInCents=balanceInCents;

response='42["init",{"gameSession":"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiIwIiwiaWQiOiJnYW1lczpjb250ZXh0OjE1MDpwbGF5ZXIxNTg5MTMzODk5MzQxOnN3X2Z1ZmlzaF9pbnR3Om1vYmlsZSIsImdhbWVNb2RlIjoiZnVuIiwiaWF0IjoxNTg5MTMzOTIwLCJpc3MiOiJza3l3aW5kZ3JvdXAifQ.7U9pc0abgmefSMTWYhhmWREN8bB0QsasvKhq5jzUldsBSHmgiY48qbzl7oGLVDpTDGwwX7eyJIng9rVsfM7uoQ","balance":{"currency":"","amount":'+balanceInCents+',"real":{"amount":'+balanceInCents+'},"bonus":{"amount":0}},"result":{"request":"init","player_id":"'+sys.userName+'","player_code":"'+sys.userName+'","player_name":"'+sys.userName+'","coins_rate":0.01,"settings":{"coinsRate":0.01,"defaultCoin":1,"coins":[1],"currencyMultiplier":100}},"gameSettings":{},"brandSettings":{"fullscreen":true},"roundEnded":true}]';

emitter.emit('outcomingMessage',response);		

};


 this.StartBonus = async function(dat)
{


var response;
var balanceInCents=await sys.GetBalance()*100;
_self.gameBalanceInCents=balanceInCents;


/*-----------------------*/

/*-----------------------*/

response='42["balance",{"gameSession":"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiIwIiwiaWQiOiJnYW1lczpjb250ZXh0OjE1MDpwbGF5ZXIxNTg5MTIyMzE5NDcwOnN3X2Z1ZmlzaF9pbnR3Om1vYmlsZSIsImdhbWVNb2RlIjoiZnVuIiwiaWF0IjoxNTg5MTIyNDg3LCJpc3MiOiJza3l3aW5kZ3JvdXAifQ.mNF0rwOpuY3pE6rV55zbBc1q03yM3QtawnKQUmVKWlXwGpIm74lTx5oazOSaZtoEtbnBXoFdfsqrnzC_kQpVXw","balance":{"currency":"","amount":'+balanceInCents+',"real":{"amount":'+balanceInCents+'},"bonus":{"amount":0}},"result":{"request":"balance"}}]';

emitter.emit('outcomingMessage',response);		

};

 this.JPTicker = async function(dat)
{


var response;
var balanceInCents=await sys.GetBalance()*100;
_self.gameBalanceInCents=balanceInCents;

//await sys.GetJackpots();
sys.jpgs=[];

/*-----------------------*/

/*-----------------------*/

response='42["jp-ticker",{"balance":{"currency":"","amount":'+balanceInCents+',"real":{"amount":'+balanceInCents+'},"bonus":{"amount":0}},"tickers":[{"jackpotId":"0","pools":{ "big":{"amount":'+(sys.jpgs[0].balance*100)+'},"small":{"amount":'+(sys.jpgs[1].balance*100)+'},"medium":{"amount":'+(sys.jpgs[2].balance*100)+'} } }],"result":{"request":"jp-ticker"},"roundEnded":false}]';

emitter.emit('outcomingMessage',response);		

};

 this.Balance = async function(dat)
{


var response;
var balanceInCents=await sys.GetBalance()*100;
_self.gameBalanceInCents=balanceInCents;

response='42["balance",{"gameSession":"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiIwIiwiaWQiOiJnYW1lczpjb250ZXh0OjE1MDpwbGF5ZXIxNTg5MTIyMzE5NDcwOnN3X2Z1ZmlzaF9pbnR3Om1vYmlsZSIsImdhbWVNb2RlIjoiZnVuIiwiaWF0IjoxNTg5MTIyNDg3LCJpc3MiOiJza3l3aW5kZ3JvdXAifQ.mNF0rwOpuY3pE6rV55zbBc1q03yM3QtawnKQUmVKWlXwGpIm74lTx5oazOSaZtoEtbnBXoFdfsqrnzC_kQpVXw","balance":{"currency":"","amount":'+balanceInCents+',"real":{"amount":'+balanceInCents+'},"bonus":{"amount":0}},"result":{"request":"balance"}}]';

emitter.emit('outcomingMessage',response);		

};

 this.ListRooms = async function(dat)
{


var response;
var balanceInCents=await sys.GetBalance();
_self.gameBalanceInCents=balanceInCents;

var requestId=dat[1].requestId;

response='42["play",{"balance":{"currency":"","amount":'+balanceInCents+',"real":{"amount":'+balanceInCents+'},"bonus":{"amount":0}},"result":{"request":"list-rooms","rooms":[{"type":"1","bet_list":[1,2,3,4,5,6,7,8,9],"active":true,"default_bet":1},{"type":"2","bet_list":[10,20,30,40,50,60,70,80,90],"active":true,"default_bet":10},{"type":"3","bet_list":[100,200,300,400,500,600,700,800,900,1000],"active":true,"default_bet":100}]},"requestId":'+requestId+',"roundEnded":true}]';

emitter.emit('outcomingMessage',response);		

};

 this.Ping = async function(dat)
{

var curTime  = new Date();
	
var response='{"type":"heart","message":{"time":'+curTime.getTime()+'}}';
emitter.emit('outcomingMessage',response);			
	
}



 this.ExitRoom = async function(dat)
{
	
var curTime  = new Date();	
var balanceInCents=await sys.GetBalance();
_self.gameBalanceInCents=balanceInCents;
var requestId=dat[1].requestId;

var response='42["play",{"balance":{"currency":"","amount":'+balanceInCents+',"real":{"amount":'+balanceInCents+'},"bonus":{"amount":0}},"result":{"request":"room-exit","timestamp":'+curTime.getTime()+',"roundEnded":true},"requestId":'+requestId+',"roundEnded":true}]';
	
emitter.emit('outcomingMessage',response);			
	
}

/*-----------fire and shot--------------*/
 this.Hit = async function(dat)
{
	

		
var curTime  = new Date();	

/*--------------*/
if(sys.conn.connection._closing){
await sys.CreateConnection();	
}
/*-------------*/
await sys.StartTransaction();	







/*-----fishes damage -----*/
/*--------------*/


var bank=await sys.GetBank();
var totalWin=0;
var response=[];

var requestId=dat[1].requestId;
var bulletId=dat[1].bullet_id;
var allbet=dat[1].bet_amount/100;
var is_bomb=dat[1].is_bomb;
var bomb_id=dat[1].bomb_id;



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




if(is_bomb!=true){
	
var items=dat[1].hit_items;
var shotState='normal';
var items_=[];

}else{


var items=[];	
var items_=dat[1].hit_items;




}


fishPay['Fish_2006'] = [888,888];
fishDamage['Fish_0'] = [0,0];


var features='';
var kills=[];
//target
for(i=0;i<items.length;i++){
	
var curItem=items[i];	
var fishType=curItem[0];	
var fishId=curItem[1];	
if(fishDamage['Fish_'+fishType]==undefined){fishDamage['Fish_'+fishType]=[10000];}
if(fishPay['Fish_'+fishType]==undefined){fishPay['Fish_'+fishType]=[0];}
var damage=utils.RandomInt(1,fishDamage['Fish_'+fishType][1]);	
var pay=fishPay['Fish_'+fishType];	


pay=utils.ShuffleArray(pay);
win=pay[0]*allbet;	
	

	
//limit control


if((totalWin+win)<=bank && damage==1){
kills.push(''+fishId+'');		
}else{
win=0;	
}	
	
totalWin+=win;
	
	
	
	
}

/*-----------------------*/
/*-----------bonus items------------*/

var allDamages=0;
for(i=0;i<items_.length;i++){
	
var curItem=items_[i];	
var fishType=curItem[0];	
var fishId=curItem[1];	
if(fishDamage['Fish_'+fishType]==undefined){fishDamage['Fish_'+fishType]=[10000];}
if(fishPay['Fish_'+fishType]==undefined){fishPay['Fish_'+fishType]=[0];}
var damage=utils.RandomInt(1,fishDamage['Fish_'+fishType][1]);	
var pay=fishPay['Fish_'+fishType];	

if(damage==1 && fishId==bomb_id){
allDamages=1;	
}

damage=allDamages;


pay=utils.ShuffleArray(pay);
win=pay[0]*allbet;	

	
	
//limit control


if((totalWin+win)<=bank && damage==1){
kills.push(''+fishId+'');		
}else{
win=0;	
}	
	
totalWin+=win;
	
	
	
	
}

/*-----------------------*/

var endBalance=startBalance-allbet+totalWin;
/*-------fire-----------*/
/*----------------------------------------------------*/
//////console.log('_self.gameCommand::: '+_self.gameCommand);
if(_self.gameCommand=='fire'){
	


if(is_bomb){
is_bomb='true';	
}else{
is_bomb='false';		
}

response.push('42["play",{"balance":{"currency":"","amount":'+(endBalance*100)+',"real":{"amount":'+(endBalance*100)+'},"bonus":{"amount":0}},"result":{"request":"fire","requestId":'+requestId+',"bullet_id":'+bulletId+',"bet_amount":'+allbet+',"coins_amount":'+utils.FixNumber(totalWin)+',"is_bomb":'+is_bomb+',"rewards":['+kills.join(',')+'],"timestamp":'+curTime.getTime()+',"is_season":false,"coins_rate":0.01},"requestId":'+requestId+',"roundEnded":false}]');	
	
}





/*------------------------*/

//





/*-----------*/
/*-----------*/


	





if(totalWin>0){
await sys.SetBalance(totalWin);	
await sys.SetBank(-totalWin,'');	
}




/*--------------------------*/


/*--------------------------*/


 await sys.Commit();
sys.SaveLogReport({balance:endBalance,bet:allbet,win:totalWin});		



/*--------------------------*/

for(var rpc=0; rpc<response.length; rpc++){
emitter.emit('outcomingMessage',response[rpc]);		
}

	



	
};


 this.EnterRoom = async function(dat)
{
	
	
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

	
var balanceInCents=await sys.GetBalance();
_self.gameBalanceInCents=balanceInCents*100;


/*--------------ENTER ROOM---------------------*/	

var curTime  = new Date();

var requestId=dat[1].requestId;
var roomType=dat[1].type;

var response='42["play",{"balance":{"currency":"","amount":'+balanceInCents+',"real":{"amount":'+balanceInCents+'},"bonus":{"amount":0}},"result":{"request":"room-enter","type":"'+roomType+'","room_id":"ID-'+roomType+'","timestamp":'+curTime.getTime()+',"roundEnded":false},"requestId":'+requestId+',"roundEnded":false}]';



/*-----------------------------------*/	

emitter.emit('outcomingMessage',response);			


////////////
_self.StartFishesUpdate();

	
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



if(data.gameData=='2probe'){
	
var response='3probe';	
emitter.emit('outcomingMessage',response);	
_self.msgHandler=1;
return;	
}else if(data.gameData=='2'){
	
var response='3';	
emitter.emit('outcomingMessage',response);	
_self.msgHandler=1;
return;
}else if(data.gameData=='5'){
_self.msgHandler=1;
return;

	
}




if(data.gameData[0]=='play'){
_self.gameCommand=data.gameData[1].request;	
}else{
_self.gameCommand=data.gameData[0];	
}





switch(_self.gameCommand){
	
case 'init':

 _self.Init(data.gameData); 

break;

	
case 'balance':

 _self.Balance(data.gameData); 

break;

	
case 'list-rooms':

 _self.ListRooms(data.gameData); 

break;	
case 'room-exit':

 _self.ExitRoom(data.gameData); 

break;	
case 'room-enter':

 _self.EnterRoom(data.gameData); 

break;
case 'fire':

 await  _self.Hit(data.gameData); 

break;

case 'shot':

 await  _self.Hit(data.gameData); 

break;
case 'startBonus':

 _self.StartBonus(data.gameData); 

break;
case 'jp-ticker':

 _self.JPTicker(data.gameData); 

break;

default:

//////console.log('Unknow command :::::: ' ,_self.gameCommand);

break;


}


_self.msgHandler=1;
};


_self.msgHandler=1;
_self.msgHandlerStack=[];
_self.msgHandlerTicker=0;

_self.msgHandlerTicker=setInterval(_self.MessageCheck,20);

return _self;	
	
}



module.exports = { Game }
