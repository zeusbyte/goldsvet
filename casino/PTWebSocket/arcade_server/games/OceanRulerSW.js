
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

fishPay['Fish_1'] = [2];
		fishPay['Fish_2'] = [3];
		fishPay['Fish_3'] = [20,25,30,35,40,45,50,55,60];
		fishPay['Fish_4'] = [4];
		fishPay['Fish_5'] = [20,25,30,35,40,45,50,55,60];
		fishPay['Fish_6'] = [5];
		fishPay['Fish_7'] = [20,25,30,35,40,45,50,55,60];
		fishPay['Fish_8'] = [6];
		fishPay['Fish_9'] = [7];
		fishPay['Fish_10'] = [8];
		fishPay['Fish_11'] = [9];
		fishPay['Fish_12'] = [10];
		fishPay['Fish_13'] = [12];
		fishPay['Fish_14'] = [15];
		fishPay['Fish_15'] = [18];
		fishPay['Fish_16'] = [20];
		fishPay['Fish_17'] = [30,40,50,60,75,100];
		fishPay['Fish_18'] = [60,80,100,125,150,200];
		fishPay['Fish_19'] = [350];
		fishPay['Fish_20'] = [100,150,200,250,300,500];
		fishPay['Fish_21'] = [25];
		fishPay['Fish_22'] = [0];
		fishPay['Fish_23'] = [100,200,300,500,800];
		fishPay['Fish_24'] = [100,150,200,250,300,500];
		fishPay['Fish_25'] = [100,200,300,500,800];
		fishPay['Fish_26'] = [100,200,300,500,800];
		fishPay['Fish_27'] = ['crabDrill'];
		fishPay['Fish_28'] = ['crabLaser'];
		fishPay['Fish_29'] = ['crabBonus'];
		fishPay['Fish_30'] = ['bomb'];



var fishDamage=[];

fishDamage['Fish_1'] = 2;
		fishDamage['Fish_2'] = 2;
		fishDamage['Fish_3'] = 20;
		fishDamage['Fish_4'] = 3;
		fishDamage['Fish_5'] = 20;
		fishDamage['Fish_6'] = 3;
		fishDamage['Fish_7'] = 20;
		fishDamage['Fish_8'] = 4;
		fishDamage['Fish_9'] = 5;
		fishDamage['Fish_10'] = 6;
		fishDamage['Fish_11'] = 6;
		fishDamage['Fish_12'] = 8;
		fishDamage['Fish_13'] = 8;
		fishDamage['Fish_14'] = 10;
		fishDamage['Fish_15'] = 10;
		fishDamage['Fish_16'] = 10;
		fishDamage['Fish_17'] = 10;
		fishDamage['Fish_18'] = 15;
		fishDamage['Fish_19'] = 30;
		fishDamage['Fish_20'] = 30;
		fishDamage['Fish_21'] = 15;
		fishDamage['Fish_22'] = 100;
		fishDamage['Fish_23'] = 50;
		fishDamage['Fish_24'] = 50;
		fishDamage['Fish_25'] = 45;
		fishDamage['Fish_26'] = 45;
		fishDamage['Fish_27'] = 100;
		fishDamage['Fish_28'] = 50;
		fishDamage['Fish_29'] = 50;
		fishDamage['Fish_30'] = 50;



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
this.ClearGameData= async function(){
	

if(_self.bankReserved>0){

await sys.SetBank(_self.bankReserved);		

_self.bankReserved=0;
	
}

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


response='42["init",{"gameSession":"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiIwIiwiaWQiOiJnYW1lczpjb250ZXh0OjE1MDpwbGF5ZXIxNTg5MDIzNzQzNzkwOnN3X29yOm1vYmlsZSIsImdhbWVNb2RlIjoiZnVuIiwiaWF0IjoxNTg5MDI4NjI3LCJpc3MiOiJza3l3aW5kZ3JvdXAifQ.xq2WFe3GCy7VZugNB_FK_DFcUhwwbaYKDN_RYbydQnuMX4t1WTJ3W8WVL5HAt8B27XHAVOVibzPun2fEJTOPVA","balance":{"currency":"","amount":'+balanceInCents+',"real":{"amount":'+balanceInCents+'},"bonus":{"amount":0}},"result":{"request":"init","gameId":"sw_or","version":"2.1.0","name":"Ocean Ruler","settings":{"coins":[1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100,200,300,400,500,600,700,800,900,1000],"stakeDef":0.01,"coinsRate":0.01,"defaultCoin":1,"currencyMultiplier":100},"state":{"mode":"normal","features":[]},"playerCode":"'+sys.userName+'"},"gameSettings":{},"brandSettings":{"fullscreen":true},"roundEnded":true}]';

emitter.emit('outcomingMessage',response);		

};


 this.StartBonus = async function(dat)
{


var response;
var balanceInCents=await sys.GetBalance()*100;
_self.gameBalanceInCents=balanceInCents;


/*-----------------------*/

/*-----------------------*/

response='42["play",{"balance":{"currency":"USD","amount":'+balanceInCents+',"real":{"amount":'+balanceInCents+'},"bonus":{"amount":0}},"result":{"request":"startBonus","state":{"mode":"bonus","features":[],"bonus":{"bet":'+_self.Allbet+',"rounds":[]}},"totalWin":0,"roundEnded":false},"requestId":990,"roundEnded":false}]';

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

 this.PlayBonus = async function(dat)
{


var response;
var balanceInCents=await sys.GetBalance();
_self.gameBalanceInCents=balanceInCents;

var requestId=dat[1].requestId;

var totalWin=0;
var BonusStep= _self.boardBonusStep;
_self.boardBonusStepCount++;


var select=dat[1]['select'];



var payouts=[];


if(_self.boardBonusStepCount==1){
var tBonusWinArr=[1,2,3,4,5,6,7,8,9,10,15,20,25,40,70,-1,-1,-1];	
}
if(_self.boardBonusStepCount==2){
var tBonusWinArr=[70,75,80,85,90,95,100,120,130,140,150,170,-1,-1,-1];	
}
if(_self.boardBonusStepCount==3){
var tBonusWinArr=[170,180,190,200,210,220,230,240,250,-1,-1,-1];	
}
if(_self.boardBonusStepCount==4){
var tBonusWinArr=[300,350,400,450,500,550,600,650,700,750,800,-1,-1,-1];	
}

tBonusWinArr=utils.ShuffleArray(tBonusWinArr);

for(var i=0; i<5; i++){

if(tBonusWinArr[0]>0){	
payouts[i]=Math.round(tBonusWinArr[i]*_self.Allbet*100);	
}else{
payouts[i]	=tBonusWinArr[i];
}


}



if(_self.boardBonusStepCount>=BonusStep){

payouts[select]=Math.round(_self.bankReserved*100);
 totalWin=_self.bankReserved;	
 _self.bankReserved=0;
 
 
if(totalWin>0){
await sys.SetBalance(totalWin);	
}




sys.toGameBanks=0;
sys.toSlotJackBanks=0;
sys.betProfit=0;
 sys.SaveLogReport({balance:balanceInCents+totalWin,bet:0,win:totalWin});
 
 
}else{

payouts[select]=-1;	
	
}

var curRound='{"selection":'+select+',"payouts":['+payouts.join(',')+']}';
_self.boardBonusRounds.push(curRound);

var requestId=dat[1].requestId;


response='42["play",{"balance":{"currency":"USD","amount":'+Math.round((balanceInCents+totalWin)*100)+',"real":{"amount":'+Math.round((balanceInCents+totalWin)*100)+'},"bonus":{"amount":0}},"result":{"request":"playBonus","state":{"mode":"bonus","features":[],"bonus":{"bet":'+Math.round(_self.Allbet*100)+',"rounds":['+_self.boardBonusRounds.join(',')+']}},"roundResult":'+curRound+',"totalWin":'+Math.round(totalWin*100)+',"roundEnded":false},"requestId":'+requestId+',"roundEnded":false}]';

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
	


if(_self.gameState!='drill' && _self.gameCommand=='drill'){
	
emitter.emit('outcomingMessage','Invalid internal state');		
	
return;	

}

		
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


/*-----------------------*/



var requestId=dat[1]['requestId'];
var bulletId=dat[1]['bulletId'];
var allbet=dat[1]['bet']/100;


/*-----------------------*/

if(_self.gameCommand=='drill'  || _self.gameCommand=='laser'){
	
allbet=_self.Allbet;	
bulletId=_self.bulletId;
	
}

var startBalance=await sys.GetBalanceB();	
allbet=parseFloat(allbet);
if(startBalance<allbet || allbet<0.0001 || !Number.isFinite(allbet) ){
emitter.emit('Error','Invalid balance or bet');	
sys.Rollback();   	
return;	
}	


if(_self.gameCommand=='fire' || _self.gameCommand=='shot'){
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

}else if(_self.gameCommand=='drill' || _self.gameCommand=='laser') {

if(_self.bankReserved>0){

await sys.SetBank(_self.bankReserved);		

_self.bankReserved=0;
	
}
	
	

	
}

/*-----------------------*/

var bonusType='none';

/*-----------------------*/


if(dat[1]['items']!=undefined){
	
var items=dat[1]['items'];
var shotState='normal';
var items_=[];

}else if(_self.gameCommand=='drill'){

var items=[];	
var items_=dat[1]['feature']['hitItems'];
var shotState='DRILL';	

_self.gameState='normal';
	
}else if(_self.gameCommand=='laser'){

var items=[];	
var items_=dat[1]['feature']['hitItems'];
var shotState='LASER';	

_self.gameState='normal';
	
}else{
	
var items=[];	
var items_=dat[1]['item'];
var shotState=items_['mode'];

if(shotState=='vortex' || shotState=='chainReaction' || shotState=='bomb'){

var items_=dat[1]['item']['hitItems'];
items_.unshift(dat[1]['item']['target']);
var shotState=dat[1]['item']['mode'];
	
}


}




var features='';

var kills=[];
//target
for(i=0;i<items.length;i++){
	
var curItem=items[i];	
var fishType=curItem['target']['type'];	
var fishId=curItem['target']['uid'];	
var damage=utils.RandomInt(1,fishDamage['Fish_'+fishType]);	
var pay=fishPay['Fish_'+fishType];	



if(Number.isInteger(pay[0])){
pay=utils.ShuffleArray(pay);
var win=pay[0]*allbet;	
	
}else{
	
	
	

bonusType=pay[0];


	

var win=0;		

}
	

//limit control


////console.log('BANK ::: ',bank,50*allbet);




if(bonusType!='none' && (bank<50*allbet )  ){
damage=0;	
}



if((totalWin+win)<=bank && damage==1){

if(Number.isInteger(pay[0])){
kills.push('['+fishId+','+pay[0]+']');		
}else{
kills.push('['+fishId+',0]');		
}	


}else{
win=0;	
bonusType='none';
}	
	
totalWin+=win;
	
	
	
	
}


/*BOARD BONUS*/


////console.log('bonusType',bonusType);
	
_self.boardBonusWin=0;
if(bonusType=='crabBonus'){


_self.boardBonusStepCount=0;
_self.boardBonusRounds=[];
for(var w=0; w<100; w++){
	
var wlm=utils.RandomInt(1,5);	
var tmpBWin=0;
var tBonusWin=0;
	


_self.boardBonusStep=utils.RandomInt(1,4);


if(_self.boardBonusStep==1){
var tBonusWinArr=[1,2,3,4,5,6,7,8,9,10,15,20,25,40,70];	
}
if(_self.boardBonusStep==2){
var tBonusWinArr=[70,75,80,85,90,95,100,120,130,140,150,170];	
}
if(_self.boardBonusStep==3){
var tBonusWinArr=[170,180,190,200,210,220,230,240,250];	
}
if(_self.boardBonusStep==4){
var tBonusWinArr=[300,350,400,450,500,550,600,650,700,750,800];	
}
	
tmpBWin=tBonusWinArr[0]*allbet;	


	
	
	
	
if((totalWin+tmpBWin)<=bank ){
	
tBonusWin=tmpBWin;
_self.boardBonusWin=tBonusWin;
break;
	
}	


	
}
	

if(tBonusWin>0){
	
await sys.SetBank(-tBonusWin);		
	
_self.bankReserved=tBonusWin;
	
}	
	
features='{"id":"627b4bff-c894-4d01-8217-6bc0da27831c","type":"BONUS","bet":'+Math.round(allbet*100)+',"payout":'+Math.round(tBonusWin*100)+'}';	
_self.gameState='boardbonus';
_self.Allbet=allbet;
_self.bulletId=bulletId;




	
}
/*-----------------------*/
/*-----------------------*/

/*DRILL BONUS*/

	

if(bonusType=='crabDrill'){

var tBonusWinArr=[20,25,30,35,40,45,50,55,60,30,40,50,60,75,100,30,40,50,60,75,100,30,40,50,60,75,100,100,150,200,250,300,500,100,200,300,500,800];







for(var w=0; w<10; w++){
	
var wlm=utils.RandomInt(1,5);	
var tmpBWin=0;
var tBonusWin=0;
	
tBonusWinArr=utils.ShuffleArray(tBonusWinArr);	


for(var w2=0; w2<wlm; w2++){
	
tmpBWin+=tBonusWinArr[wlm]*allbet;	

}
	
	

	
if((totalWin+tmpBWin)<=bank){
	
tBonusWin=tmpBWin;

break;
	
}	


	
}
	

if(tBonusWin>0){
	
await sys.SetBank(-tBonusWin);		
	
_self.bankReserved=tBonusWin;
	
}	
	
features='{"id":"627b4bff-c894-4d01-8217-6bc0da27831c","type":"DRILL","bet":'+Math.round(allbet*100)+',"payout":'+Math.round(tBonusWin*100)+'}';	
_self.gameState='drill';
_self.Allbet=allbet;
_self.bulletId=bulletId;




	
}
/*-----------------------*/
/*-----------------------*/



/*LASER BONUS*/



if(bonusType=='crabLaser'){

var tBonusWinArr=[20,25,30,35,40,45,50,55,60,30,40,50,60,75,100,30,40,50,60,75,100,30,40,50,60,75,100,100,150,200,250,300,500,100,200,300,500,800];


for(var w=0; w<10; w++){
	
var wlm=utils.RandomInt(1,5);	
var tmpBWin=0;
var tBonusWin=0;
	
tBonusWinArr=utils.ShuffleArray(tBonusWinArr);	


for(var w2=0; w2<wlm; w2++){
	
tmpBWin+=tBonusWinArr[wlm]*allbet;	

}
	

	

	
if((totalWin+tmpBWin)<=bank){
	
tBonusWin=tmpBWin;

break;
	
}	


	
}
	

if(tBonusWin>0){
	
await sys.SetBank(-tBonusWin);		
_self.bankReserved=tBonusWin;
	
}	
	
features='{"id":"627b4bff-c894-4d01-8217-6bc0da27831c","type":"LASER","bet":'+Math.round(allbet*100)+',"payout":'+Math.round(tBonusWin*100)+'}';	
_self.gameState='drill';
_self.Allbet=allbet;
_self.bulletId=bulletId;




	
}
/*-----------------------*/
/*-----------------------*/

/*-----------------------*/
/*-----------bonus items------------*/



var allDamages=0;
for(i=0;i<items_.length;i++){
	
var curItem=items_[i];	
var fishType=curItem['type'];	
var fishId=curItem['uid'];	
var damage=utils.RandomInt(1,fishDamage['Fish_'+fishType]);	
var pay=fishPay['Fish_'+fishType];	

if(damage==1 && i==0){
 allDamages=1;	
}
damage=allDamages;


if(_self.gameCommand=='drill' || _self.gameCommand=='laser'){

damage=1;	
	
}

if(Number.isInteger(pay[0])){
pay=utils.ShuffleArray(pay);
win=pay[0]*allbet;	
	
}else{

win=0;		

}
	

	
//limit control


if((totalWin+win)<=bank && damage==1){
kills.push('['+fishId+','+pay[0]+']');		
}else{
win=0;	
}	
	
totalWin+=win;
	
	
	
	
}

/*-----------------------*/
var endBalance=startBalance-allbet+totalWin;
/*-------fire-----------*/
/*----------------------------------------------------*/


/*-------shot-----------*/

	

response[0]='42["play",{"balance":{"currency":"","amount":'+(endBalance*100)+',"real":{"amount":'+(endBalance*100)+'},"bonus":{"amount":0}},"result":{"bulletId":'+bulletId+',"killed":['+kills.join(',')+'],"request":"'+_self.gameCommand+'","totalBet":'+allbet+',"state":{"mode":"normal","features":['+features+']},"totalWin":'+totalWin+',"roundEnded":false},"requestId":'+requestId+',"roundEnded":false}]';	
	




/*-----------------------*/




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

 _self.Exit(data.gameData); 

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

case 'drill':

 await  _self.Hit(data.gameData); 

break;

case 'laser':

 await  _self.Hit(data.gameData); 

break;

case 'startBonus':

 _self.StartBonus(data.gameData); 

break;

case 'playBonus':

 _self.PlayBonus(data.gameData); 

break;

default:



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
