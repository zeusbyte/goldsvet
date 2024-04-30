
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

//[0,0,0,0,0,0,0,0,0,0,60,50,45,40,35,30,20,18,15,12,10,9,8,7,6,5,5,4,3,3,2,2

fishPay['Fish_0'] = [0,0];
 fishPay['Fish_1'] = [0,0];
 fishPay['Fish_2'] = [0,0];
 fishPay['Fish_3'] = [0,0];
 fishPay['Fish_4'] = [0,0];
 fishPay['Fish_5'] = [68,368];
 fishPay['Fish_6'] = [68,268];
 fishPay['Fish_7'] = [68,168];
 fishPay['Fish_8'] = [68,138];
 fishPay['Fish_9'] = [68,138];
 fishPay['Fish_10'] = [60,60];
 fishPay['Fish_11'] = [50,50];
 fishPay['Fish_12'] = [45,45];
 fishPay['Fish_13'] = [40,40];
 fishPay['Fish_14'] = [35,35];
 fishPay['Fish_15'] = [30,30];
 fishPay['Fish_16'] = [20,20];
 fishPay['Fish_17'] = [18,18];
 fishPay['Fish_18'] = [15,15];
 fishPay['Fish_19'] = [12,12];
 fishPay['Fish_20'] = [10,10];
 fishPay['Fish_21'] = [9,9];
 fishPay['Fish_22'] = [8,8];
 fishPay['Fish_23'] = [7,7];
 fishPay['Fish_24'] = [6,6];
 fishPay['Fish_25'] = [5,5];
 fishPay['Fish_26'] = [5,5];
 fishPay['Fish_27'] = [4,4];
 fishPay['Fish_28'] = [3,3];
 fishPay['Fish_29'] = [3,3];
 fishPay['Fish_30'] = [2,2];
 fishPay['Fish_31'] = [2,2];




var fishDamage=[];

fishDamage['Fish_0'] = [10,80];
 fishDamage['Fish_1'] = [10,80];
 fishDamage['Fish_2'] = [10,80];
 fishDamage['Fish_3'] = [10,80];
 fishDamage['Fish_4'] = [10,80];
 fishDamage['Fish_5'] = [10,80];
 fishDamage['Fish_6'] = [10,80];
 fishDamage['Fish_7'] = [10,80];
 fishDamage['Fish_8'] = [10,80];
 fishDamage['Fish_9'] = [10,80];
 fishDamage['Fish_10'] = [8,65];
 fishDamage['Fish_11'] = [8,54];
 fishDamage['Fish_12'] = [6,50];
 fishDamage['Fish_13'] = [5,44];
 fishDamage['Fish_14'] = [5,38];
 fishDamage['Fish_15'] = [4,32];
 fishDamage['Fish_16'] = [3,22];
 fishDamage['Fish_17'] = [3,20];
 fishDamage['Fish_18'] = [3,17];
 fishDamage['Fish_19'] = [2,15];
 fishDamage['Fish_20'] = [2,12];
 fishDamage['Fish_21'] = [2,11];
 fishDamage['Fish_22'] = [2,10];
 fishDamage['Fish_23'] = [2,9];
 fishDamage['Fish_24'] = [2,8];
 fishDamage['Fish_25'] = [2,7];
 fishDamage['Fish_26'] = [2,7];
 fishDamage['Fish_27'] = [1,6];
 fishDamage['Fish_28'] = [1,4];
 fishDamage['Fish_29'] = [1,4];
 fishDamage['Fish_30'] = [1,3];
 fishDamage['Fish_31'] = [1,3];



/*----------control fishes on scene------------*/


_self.fishesId=[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];	


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
	curFishId=40;
}
*/
/*
var fs = require('fs');
var ff =fs.readFileSync('./arcade_server/games/1.txt', 'utf8');
var curFishId=ff;
*/
var routes=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27];
var route=routes[utils.RandomInt(0,routes.length-1)];	

	

	
var cFishHealth=utils.RandomInt(fishDamage['Fish_'+curFishId][0],fishDamage['Fish_'+curFishId][1]);	

var cFishPay=utils.RandomInt(fishPay['Fish_'+curFishId][0],fishPay['Fish_'+curFishId][1]);	



	

_self.sceneFishes['fish_'+curFishUID]={curFishUID:curFishUID,fishId:curFishId,fishHealth:cFishHealth,fishPay:cFishPay,fishTime:curTime.getTime()};	

var  fishPreset='{"s":{"lst":0,"f":[{"pi":'+route+',"ttl":'+utils.RandomInt(10,30)+',"g":-1,"fid":'+curFishUID+',"ft":'+curFishId+',"st":1608376611110}],"sc":0,"map":{}},"rt":"fsb","mid":5103012989}';		
	
	
	
	
emitter.emit('outcomingMessage',fishPreset,false);		
	
_self.fishesId_++;	
	
};

this.StartFishesUpdate=function(){
_self.StopFishesUpdate();	
_self.fishesUpdateInterval=setInterval(_self.FishesUpdate,700);	
	
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



 this.Login = async function(dat)
{


var balanceInCents,response;

await sys.CreateConnection();	

var curTime  = new Date();


var balanceInCents=await sys.GetBalance();
_self.gameBalanceInCents=balanceInCents;

var response='{"ctx":"d6b3e01bb7aabbc4fbbbd69345409065","p":"237558600","g":"KingOctopus","ip":"0.0.0.0","cr":"","b":9999996,"bs":[1,2,3,5,8,10,10,20,30,50,80,100,100,200,300,500,800,1000],"dn":0.01,"crs":"$","crf":2,"crb":false,"tp":",","dp":".","nw":false,"rcg":[],"st":1608375133598,"ec":0,"mid":'+dat.mid+'}';

emitter.emit('outcomingMessage',response,false);	

};


 this.Ping = async function(dat)
{

var curTime  = new Date();
	

var response='{"b":'+_self.gameBalanceInCents+',"ec":0,"mid":'+dat.mid+'}';
emitter.emit('outcomingMessage',response,false);		
	
}


 this.ExitRoom = async function(dat)
{
	
	
var balanceInCents=await sys.GetBalance();
_self.gameBalanceInCents=balanceInCents;

var response='{"ec":0,"mid":'+dat.mid+'}';
	
emitter.emit('outcomingMessage',response,false);		
	
}

 this.Fire = async function(dat)
{
	
	
var balanceInCents=_self.gameBalanceInCents;

var response='{"message":{"type":3,"player":{"uid":7401,"ws":0,"pos":5,"gunid":'+_self.gameData.GunId+',"gunnum":0,"reward_rate":'+_self.gameData.CurrentBet+',"score":'+balanceInCents+',"isvistor":0}},"succ":true,"errinfo":"ok","type":"broadplayer"}';
	
emitter.emit('outcomingMessage',response,false);		
	
}


  this.GetBonusSum =  function()
{

var fp = fishPay;
var fpc = 0;
var fpsum=0;

for(var f in fp){
	
var cf=fp[f];	

if(cf[0]>0 ){

fpsum+=cf[0];
fpc++;
	
}


	
}

var total = (fpsum/fpc)*2;
	
return total;	
	
}
 
this.ChangeBackstage = async function(dat)
{
	
var curTime  = new Date();		

var response='{"message":{"sceneid":'+utils.RandomInt(1,3)+',"btime":'+(curTime.getTime()+60000)+',"etime":'+(curTime.getTime())+'},"succ":true,"errinfo":"ok","type":"changescene"}';
	
emitter.emit('outcomingMessage',response,false);		
	
}


 this.ChangeBet = async function(dat)
{
	
	
var balanceInCents=_self.gameBalanceInCents;

/*---------------------------------------------*/




var Bet=_self.gameData.Bet;	
var BetCnt=_self.gameData.BetCnt;	
var BetArr=_self.gameData.BetArr;	
var BetLevel=_self.gameData.BetLevel;	
var cnLevel=_self.gameData.BetLevel*6;	

if(dat.i){
BetCnt++;	
}else{
BetCnt--;	
}


if(BetCnt>=BetArr.length){
	
BetCnt=BetArr.length-1;	
	
}

if(BetCnt<=0){
	
BetCnt=0;	
	
}



Bet=BetArr[BetCnt];

_self.gameData.Bet=Bet/100;	
_self.gameData.BetCnt=BetCnt;	
_self.gameData.BetArr=BetArr;	
_self.gameData.BetLevel=BetLevel;


var response='{"cl":'+BetCnt+',"b":'+Bet+',"ec":0,"mid":'+dat.mid+'}';





/*---------------------------------------------*/
emitter.emit('outcomingMessage',response,false);	
	
};


/*-----------prepare hit--------------*/
 this.PrepareHit = async function(dat)
{
	
///	

var isSpecial=false;
var curSpecId=-1;
var curSpecUId=0;
//	

var specialFishId=[];	

var targetFishes=dat.fid;
//

//check fish time (destroy fish)
var curTime  = new Date();	
for(var cf in _self.sceneFishes){
if(curTime.getTime()-_self.sceneFishes[cf].fishTime>=30000){
delete _self.sceneFishes[cf];	
}	
}	
//////////////

for(var fi=0; fi<targetFishes.length; fi++){
var cfish=targetFishes[fi];

//////////////cf
if(_self.sceneFishes['fish_'+cfish]==undefined){continue;}

//////////////////////////////

//////////////////////////////
if(_self.sceneFishes['fish_'+cfish]==undefined){continue;}

var bet=_self.gameData.CurrentBet/100;
var bsum= this.GetBonusSum();
var acceptRtp=(sys.ServerStorage(sys.shopId,sys.gameName,'stat_out')+(bet*bsum))<=sys.ServerStorage(sys.shopId,sys.gameName,'stat_in');
var acceptBank=sys.gameBank>=(bet*bsum);

if((!acceptRtp || !acceptBank) && specialFishId.indexOf(_self.sceneFishes['fish_'+cfish].fishId)!=-1){
_self.sceneFishes['fish_'+cfish].fishHealth+=2;	
}

//////////////////////////////
if(specialFishId.indexOf(_self.sceneFishes['fish_'+cfish].fishId)!=-1  && _self.sceneFishes['fish_'+cfish].fishHealth-1<=0){
	

isSpecial=true;
curSpecId=_self.sceneFishes['fish_'+cfish].fishId;
curSpecUId=cfish;
break;
	
}
//////////////cf
	
}

//console.log('curSpecId ::: '+curSpecId);

switch(curSpecId){

case -1:

//console.log('HIT ::: '+curSpecId);

await _self.Hit(dat);

break;	

case 23:
case 25:
case 27:
case 28:
case 29:
case 30:
case 31:
case 34:
case 35:
case 40:



var explodeArr=[];

for(var fi=0; fi<targetFishes.length; fi++){
var cfish=targetFishes[fi];

//////////////cf
if(_self.sceneFishes['fish_'+cfish]==undefined){continue;}

if(curSpecUId!=cfish){

explodeArr.push(cfish);
	
}

}

_self.gameData.BombUID=cfish;
_self.gameData.BombType=curSpecId;

var eTime=5000;
var shotTime=utils.RandomInt(5,10);
if(curSpecId==25){
eTime=9000;	
shotTime=1;
}

var response='{"message":{"bombs":[{"id":'+cfish+',"uid":'+cfish+',"pos":5,"points":[{"x":'+utils.RandomInt(300,800)+',"y":300}],"born_time":'+(curTime.getTime())+',"dead_time":'+(curTime.getTime()+eTime)+',"use_rate":1,"rate":1,"brate":1,"fish_id":'+cfish+',"bomb_cnt":1,"num":1,"flag":1,"type":'+curSpecId+',"del_time":'+(curTime.getTime()+eTime)+',"ext":0,"cond_rate":1,"shot_time":'+shotTime+',"class_id":'+curSpecId+',"tons_list":[]}]},"succ":true,"errinfo":"ok","type":"increasebombs"}';


emitter.emit('outcomingMessage',response,false);		

break;		
	
}



	
};


/*-----------bomb hit--------------*/
 this.BombHit = async function(dat)
{
	

		
var curTime  = new Date();	
	
var fullscreenFishes=[];	
	
for(var cf in _self.sceneFishes){

if(curTime.getTime()-_self.sceneFishes[cf].fishTime>=30000){
	
delete _self.sceneFishes[cf];	
	
}else{
	
fullscreenFishes.push(_self.sceneFishes[cf].curFishUID);	
	
}



}	
	

	
var bet=_self.gameData.CurrentBet/100;
var totalWin=0;	
	
_self.bet=bet;	
	
/*--------------*/
if(sys.conn.connection._closing){
await sys.CreateConnection();	
}
/*-------------*/
await sys.StartTransaction();	
var startBalance=await sys.GetBalanceB();	

bet=parseFloat(bet);
if( bet<0.0001 || !Number.isFinite(bet) ){
emitter.emit('Error','Invalid balance or bet');	
sys.Rollback();   	
return;	
}	









if(sys.address>0 && sys.count_balance<=0){
sys.shopPercent=100;	
}else if(sys.count_balance<=0){
sys.shopPercent=100;	
}


	




/*-----------------------------*/	
var winsArr=[];
var winsArr2=[];
var freeInfo='';
/*-----------------------------*/	

var targetFishes=dat.message.fishids;
var gameBank=await sys.GetBank();	

/*full bomb*/

var fishDmgValue=400;

var isBomb=false;
var isBombId=0;


if(targetFishes.length<=0){
	
targetFishes=fullscreenFishes;	
	
}


for(var fi=0; fi<targetFishes.length; fi++){

var cfish=targetFishes[fi];



if(_self.sceneFishes['fish_'+cfish]!=undefined){
	


	
//console.log('FISH IID::: '+_self.sceneFishes['fish_'+cfish].fishId);
_self.sceneFishes['fish_'+cfish].fishHealth-=fishDmgValue;

var  tmpWin=_self.sceneFishes['fish_'+cfish].fishPay*bet;

/*-----------------------------*/	




if(_self.sceneFishes['fish_'+cfish].fishHealth<=0 && (tmpWin+totalWin)<=gameBank){


totalWin+=tmpWin;
	
	

winsArr.push('{"bid":"'+dat.bid+'","fid":'+cfish+',"w":true,"d":true,"wa":'+_self.sceneFishes['fish_'+cfish].fishPay+',"ba":'+Math.round(bet*100)+',"bl":0,"rr":0,"bt":'+_self.sceneFishes['fish_'+cfish].fishId+'}');		

	
delete _self.sceneFishes['fish_'+cfish];	


	
}else{
	
winsArr.push('{"bid":"'+dat.bid+'","fid":'+cfish+',"w":false,"d":false,"wa":'+_self.sceneFishes['fish_'+cfish].fishPay+',"ba":'+Math.round(bet*100)+',"bl":0,"rr":0,"bt":'+_self.sceneFishes['fish_'+cfish].fishId+'}');	
	
}


	
}	
	
}



	
var endBalance=startBalance-bet+totalWin;
_self.gameBalanceInCents=endBalance*100;

var response=[];

if(totalWin>0){
	
await sys.SetBalance(totalWin);	
await sys.SetBank(-totalWin,'');	




}



response.push('{"p":"accessKey||'+ sys.userName+'","hr":['+winsArr.join(',')+'],"b":'+_self.gameBalanceInCents+',"rt":"hb","mid":'+dat.mid+'}');	









 await sys.Commit();	
 sys.SaveLogReport({balance:endBalance,bet:bet,win:totalWin});	





for(var rpc=0; rpc<response.length; rpc++){
emitter.emit('outcomingMessage',response[rpc],false);		
}

	



	
};

/*-----------simple hit--------------*/
 this.Hit = async function(dat)
{
	
var fullBombId=0;
var localBombId=0;
	
var curTime  = new Date();	
	
for(var cf in _self.sceneFishes){

if(curTime.getTime()-_self.sceneFishes[cf].fishTime>=30000){
	
delete _self.sceneFishes[cf];	
	
}	



}	
	

	
var bet=_self.sceneBullets[dat.bid]/100;
var totalWin=0;	

delete _self.sceneBullets[dat.bid];	
_self.bet=bet;	
	
/*--------------*/
if(sys.conn.connection._closing){
await sys.CreateConnection();	
}
/*-------------*/
await sys.StartTransaction();	
var startBalance=await sys.GetBalanceB();	

bet=parseFloat(bet);
if(startBalance<bet || bet<0.0001 || !Number.isFinite(bet) ){
emitter.emit('Error','Invalid balance or bet');	
sys.Rollback();   	
return;	
}	







await sys.UpdateJackpots(bet);

if(sys.address>0 && sys.count_balance<=0){
sys.shopPercent=100;	
}else if(sys.count_balance<=0){
sys.shopPercent=100;	
}

if(sys.shopPercent>0){
var sumToBank=(bet/100)*sys.shopPercent;		
}else{
var sumToBank=bet;		
}
	
await sys.SetBalance(-bet);	
await sys.SetBank(sumToBank,'bet');	



/*-----------------------------*/	
var winsArr=[];
var winsArr2=[];
var freeInfo='';
/*-----------------------------*/	

var targetFishes=[dat.fid];
var gameBank=await sys.GetBank();	

/*full bomb*/

var fishDmgValue=1;

var isBomb=false;
var isBombId=0;






for(var fi=0; fi<targetFishes.length; fi++){

var cfish=targetFishes[fi];



if(_self.sceneFishes['fish_'+cfish]!=undefined){
	
////////console.log('ISBOMB::: '+isBomb,' BOMB ID::: '+isBombId,' FISH UID::: '+_self.sceneFishes['fish_'+cfish].fishId);

if(isBomb && cfish!=isBombId){

continue;
	
}	
	
//console.log('FISH IID::: '+_self.sceneFishes['fish_'+cfish].fishId+ ' ::: '+_self.sceneFishes['fish_'+cfish].fishHealth);
_self.sceneFishes['fish_'+cfish].fishHealth-=fishDmgValue;

var  tmpWin=_self.sceneFishes['fish_'+cfish].fishPay*bet;

/*-----------------------------*/	




if(_self.sceneFishes['fish_'+cfish].fishHealth<=0 && (tmpWin+totalWin)<=gameBank){


totalWin+=tmpWin;
	
	

winsArr.push('{"bid":"'+dat.bid+'","fid":'+cfish+',"w":true,"d":true,"wa":'+Math.round(tmpWin*100)+',"ba":'+Math.round(bet*100)+',"bl":0,"rr":0,"bt":28}');		

	
delete _self.sceneFishes['fish_'+cfish];	


	
}

	
}	
	
}




	
var endBalance=startBalance-bet+totalWin;
_self.gameBalanceInCents=Math.round(endBalance*100);

var response=[];

if(totalWin>0){
	
await sys.SetBalance(totalWin);	
await sys.SetBank(-totalWin,'');	




}

response.push('{"ec":0,"mid":'+dat.mid+'}');	
response.push('{"p":"accessKey||'+ sys.userName+'","hr":['+winsArr.join(',')+'],"b":'+_self.gameBalanceInCents+',"rt":"hb","mid":'+dat.mid+'}');	








 await sys.Commit();	
 sys.SaveLogReport({balance:endBalance,bet:bet,win:totalWin});	





for(var rpc=0; rpc<response.length; rpc++){
emitter.emit('outcomingMessage',response[rpc],false);		
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
_self.gameData.GunId=1;	
/*----------------*/

	
var balanceInCents=await sys.GetBalance();
_self.gameBalanceInCents=balanceInCents*100;


/*--------------ENTER ROOM---------------------*/	

var curTime  = new Date();

if(dat.rl==0){

_self.gameData.CurrentBet=1;
_self.gameData.min=1;	
_self.gameData.max=10;	

_self.gameData.BetCnt=0;	
_self.gameData.BetArr=[1,2,3,5,8,10];	
	
}else if(dat.rl==1){

_self.gameData.CurrentBet=10;
_self.gameData.min=10;	
_self.gameData.max=100;	

_self.gameData.BetCnt=0;	
_self.gameData.BetArr=[10,20,30,50,80,100];	
	
}else if(dat.rl==2){

_self.gameData.CurrentBet=100;
_self.gameData.min=100;	
_self.gameData.max=1000;	

_self.gameData.BetCnt=0;	
_self.gameData.BetArr=[100,200,300,500,800,1000];	
}



var response='{"me":{"pid":"accessKey||'+ sys.userName+'","n":"'+ sys.userName+'","cr":"","b":'+_self.gameBalanceInCents+',"bl":0,"ch":1},"rm":{"id":"66448BDCFC73765EF5C695289044F335","hst":"host","p":[{"pid":"accessKey||'+ sys.userName+'","n":"'+ sys.userName+'","cr":"","b":'+_self.gameBalanceInCents+',"bl":0,"ch":1}]},"fs":{"lst":0,"f":[],"sc":2,"map":{}},"rl":0,"ab":['+_self.gameData.BetArr.join(',')+'],"ec":0,"mid":'+dat.mid+'}';


emitter.emit('outcomingMessage',response,false);			
////////////
_self.StartFishesUpdate();

	
}

 this.Fr= async function(dat)
{

var bid='64759016488698F'+utils.RandomInt(1000,99999);

_self.sceneBullets[bid]=dat.b;
var bet=dat.b;
console.log(_self.gameBalanceInCents,bet);
if(_self.gameBalanceInCents<bet || bet<=0  || !Number.isFinite(bet) ){
emitter.emit('Error','Invalid balance or bet');	
return;	
}	

var response='{"tx":"'+bid+'","c":0,"b":'+_self.gameBalanceInCents+',"bt":-1,"ec":0,"mid":'+dat.mid+'}';
emitter.emit('outcomingMessage',response,false);		
	
}

 this.Hbr= async function(dat)
{

var response='{"ec":0,"mid":'+dat.mid+'}';
emitter.emit('outcomingMessage',response,false);		
	
}
 this.Ptr= async function(dat)
{

var response='{"b":'+_self.gameBalanceInCents+',"cb":0,"ba":0,"pt":[[0,0,0,0,0,0,0,0,0,0,60,50,45,40,35,30,20,18,15,12,10,9,8,7,6,5,5,4,3,3,2,2]],"ec":0,"mid":'+dat.mid+'}';
emitter.emit('outcomingMessage',response,false);		
	
}


 this.IncomingDataHandler = async function(data)
{



if(data.gameData.rt=='fr'){
 _self.Fr(data.gameData);	
}else{
_self.msgHandlerStack.push(data);	
}



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


_self.gameCommand=data.gameData.rt;

//console.log('data.gameData ::: '+JSON.stringify(data.gameData));	

switch(_self.gameCommand){

	
case 'lr':

 _self.Login(data.gameData); 

break;
case 'hr':

 await _self.PrepareHit(data.gameData); 

break;	

case 'hbr':

 _self.Hbr(data.gameData); 

break;	
case 'lrr':

 _self.ExitRoom(data.gameData); 

break;
case 'jrr':

 _self.EnterRoom(data.gameData); 

break;		
case 'pr':

 _self.Ping(data.gameData); 

break;			
case 'ptr':

 _self.Ptr(data.gameData); 

break;	
case 'ubr':

 _self.ChangeBet(data.gameData); 

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
