
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


fishPay['Fish_0'] = [0,0];
fishPay['Fish_1'] = [2,2];
fishPay['Fish_2'] = [2,2];
fishPay['Fish_3'] = [3,3];
fishPay['Fish_4'] = [5,5];
fishPay['Fish_5'] = [6,6];
fishPay['Fish_6'] = [7,7];
fishPay['Fish_7'] = [8,8];
fishPay['Fish_8'] = [9,9];
fishPay['Fish_9'] = [10,10];
fishPay['Fish_10'] = [12,12];
fishPay['Fish_11'] = [15,15];
fishPay['Fish_12'] = [18,18];
fishPay['Fish_13'] = [20,20];
fishPay['Fish_14'] = [25,25];
fishPay['Fish_15'] = [30,30];
fishPay['Fish_16'] = [40,40];
fishPay['Fish_17'] = [60,60];
fishPay['Fish_18'] = [80,80];
fishPay['Fish_19'] = [100,200];
fishPay['Fish_20'] = [200,500];
fishPay['Fish_21'] = [1000,1000];
fishPay['Fish_22'] = [0,0];
fishPay['Fish_23'] = [0,0];
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
fishDamage['Fish_19']=[10,100];
fishDamage['Fish_20']=[50,500];
fishDamage['Fish_21']=[50,1000];
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

_self.fishesId=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,12,12,12,12,12,12,13,13,13,13,13,13,13,13,13,13,13,13,13,13,14,14,14,14,14,14,14,14,14,15,15,15,15,15,15,15,15,16,16,16,16,16,16,17,17,17,17,17,17,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,20,20,20,21,21,21,25,27,26];



_self.fishesId=utils.ShuffleArray(_self.fishesId);

_self.fishesId_=0;

this.FishesUpdate=function(){
	
var curFishOX=-10;	
var curFishOY=-20;	

var curFishId=_self.fishesId[utils.RandomInt(0,_self.fishesId.length-1)];
var curFishUID=utils.RandomInt(1,1000000);	
var curTime  = new Date();

/*
var fs = require('fs');
var ff =fs.readFileSync('./arcade_server/games/1.txt', 'utf8');
var curFishId=ff;
*/

if(_self.fishesId_==20){
	//curFishId=25;
}


var routes=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27];
var route=routes[utils.RandomInt(0,routes.length-1)];	

	

	
var cFishHealth=utils.RandomInt(fishDamage['Fish_'+curFishId][0],fishDamage['Fish_'+curFishId][1]);	
//var cFishHealth=3;	
var cFishPay=utils.RandomInt(fishPay['Fish_'+curFishId][0],fishPay['Fish_'+curFishId][1]);	





	

_self.sceneFishes['fish_'+curFishUID]={curFishUID:curFishUID,fishId:curFishId,fishHealth:cFishHealth,fishPay:cFishPay,fishTime:curTime.getTime()};	

var  fishPreset='{"message":[{"uid":'+curFishUID+',"type":1,"classid":'+curFishId+',"fishid":'+curFishId+',"born_time":'+(curTime.getTime())+',"routeid":'+route+',"offsettype":0,"offsetx":'+curFishOX+',"offsety":'+curFishOY+',"offsetr":0,"dead_time":'+(curTime.getTime()+30000)+',"angel":0,"pos":0,"rate":'+cFishPay+',"gun_rate":1,"extra":0,"size_change":0,"next_change_time":0}],"succ":true,"errinfo":"ok","type":"increasesprites"}';		
	
if(curFishId==26){


	
}	
	

//{"message":{"sceneid":2,"state":0,"servtime":1606670533633},"succ":true,"errinfo":"ok","type":"changescene"}
//{"message":{"sceneid":0,"state":0,"servtime":1606670876977},"succ":true,"errinfo":"ok","type":"changescene"}

	
	
emitter.emit('outcomingMessage',fishPreset,true);		
	
_self.fishesId_++;	
	
};

this.StartFishesUpdate=function(){
_self.StopFishesUpdate();	
_self.fishesUpdateInterval=setInterval(_self.FishesUpdate,1000);	
	
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



 this.Login = async function(step)
{


var balanceInCents,response;

await sys.CreateConnection();	


response='{"message":{"issucc":1,"uid":7401},"succ":true,"errinfo":"ok","type":"login"}';

emitter.emit('outcomingMessage',response,true);	

};


 this.Ping = async function(dat)
{

var curTime  = new Date();
	
var response='{"type":"heart","message":{"time":'+curTime.getTime()+'}}';
emitter.emit('outcomingMessage',response,true);		
	
}

 this.ChangeLocking = async function(dat)
{

var curTime  = new Date();
	
var response='{"message":{"pos":5,"fishid":'+dat.message.fishid+'},"succ":true,"errinfo":"ok","type":"changelock"}';
emitter.emit('outcomingMessage',response,true);		
	
}

 this.CancleLocking = async function(dat)
{

var curTime  = new Date();
	
var response='{"message":{"pos":5,"fishid":0},"succ":true,"errinfo":"ok","type":"changelock"}';
emitter.emit('outcomingMessage',response,true);			
	
}


 this.ExitRoom = async function(dat)
{
	
	
var balanceInCents=await sys.GetBalance();
_self.gameBalanceInCents=balanceInCents;

var response='708.{"serialNo":"'+dat.serialNo+'","code":0,"ai":{"acctId":"'+sys.userName+'","acctName":"'+sys.userName+'","merchant":"TEST","currency":"PTS","balance":'+balanceInCents+'}}';
	
emitter.emit('outcomingMessage',response,true);		
	
}

 this.ChangeRate = async function(dat)
{
	
	


_self.gameData.CurrentBet=dat.message.rewardrate;

if(_self.gameData.CurrentBet<0){
_self.gameData.CurrentBet=1;	
}

//////////////////////////
var balanceInCents=await sys.GetBalance();
_self.gameBalanceInCents=balanceInCents*100;

var response0='{"type":"changerate","message":{"rewardrate":'+dat.message.rewardrate+'}}';
var response1='{"message":{"type":3,"player":{"uid":7401,"ws":0,"pos":5,"gunid":1,"gunnum":0,"reward_rate":'+_self.gameData.CurrentBet+',"score":'+_self.gameBalanceInCents+',"isvistor":0}},"succ":true,"errinfo":"ok","type":"broadplayer"}';

	
emitter.emit('outcomingMessage',response0,true);		
emitter.emit('outcomingMessage',response1,true);		
	
}

 this.Fire = async function(dat)
{
	
	
var balanceInCents=_self.gameBalanceInCents;

var response='{"message":{"type":3,"player":{"uid":7401,"ws":0,"pos":5,"gunid":1,"gunnum":0,"reward_rate":'+_self.gameData.CurrentBet+',"score":'+balanceInCents+',"isvistor":0}},"succ":true,"errinfo":"ok","type":"broadplayer"}';
	
emitter.emit('outcomingMessage',response,true);		
	
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


var response='{"message":{"sceneid":'+utils.RandomInt(0,2)+',"state":0,"servtime":'+(curTime.getTime()+60000)+'},"succ":true,"errinfo":"ok","type":"changescene"}';
	
emitter.emit('outcomingMessage',response,true);		
	
}





/*-----------prepare hit--------------*/
 this.PrepareHit = async function(dat)
{
	
///	

var isSpecial=false;
var curSpecId=-1;
var curSpecUId=0;
//	

var specialFishId=[26,27,25];	

var targetFishes=dat.message.fblist[0].fishids;
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

case 27:
case 26:
case 25:

var explodeArr=[];

for(var fi=0; fi<targetFishes.length; fi++){
var cfish=targetFishes[fi];

//////////////cf
if(_self.sceneFishes['fish_'+cfish]==undefined){continue;}

if(curSpecUId!=cfish){

explodeArr.push(cfish);
	
}

}

var response='{"message":{"bombs":[{"id":'+cfish+',"uid":'+cfish+',"pos":5,"points":[],"born_time":'+(curTime.getTime())+',"dead_time":'+(curTime.getTime()+30000)+',"use_rate":0,"rate":555,"brate":10,"fish_id":'+cfish+',"bomb_cnt":1,"num":1,"flag":1,"type":'+curSpecId+',"del_time":0,"ext":0,"cond_rate":0,"shot_time":0,"class_id":'+curSpecId+',"tons_list":[]}]},"succ":true,"errinfo":"ok","type":"increasebomb"}';


emitter.emit('outcomingMessage',response,true);		

break;		
	
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

var targetFishes=dat.message.fblist[0].fishids;
var gameBank=await sys.GetBank();	

/*full bomb*/

var fishDmgValue=1;

var isBomb=false;
var isBombId=0;

for(var fi=0; fi<targetFishes.length; fi++){
var cfish=targetFishes[fi];


if(_self.sceneFishes['fish_'+cfish]==undefined){continue;}

//////////////////////////////

if(_self.sceneFishes['fish_'+cfish].fishId!=localBombId || _self.sceneFishes['fish_'+cfish].fishId!=fullBombId){
	
targetFishes=[cfish];
fi=0;
	
}

//////////////////////////////

if(_self.sceneFishes['fish_'+cfish].fishId==localBombId && _self.sceneFishes['fish_'+cfish].fishHealth-1>0){
isBomb=true;
isBombId=_self.sceneFishes['fish_'+cfish].curFishUID;
}
if(_self.sceneFishes['fish_'+cfish].fishId==fullBombId && _self.sceneFishes['fish_'+cfish].fishHealth-1>0){
isBomb=true;
isBombId=_self.sceneFishes['fish_'+cfish].curFishUID;
}

///////////////////////////
if(_self.sceneFishes['fish_'+cfish].fishId==localBombId && _self.sceneFishes['fish_'+cfish].fishHealth-1<=0){
fishDmgValue=400;
}
if(_self.sceneFishes['fish_'+cfish].fishId==fullBombId && _self.sceneFishes['fish_'+cfish].fishHealth-1<=0){
fishDmgValue=400;
/*--------------*/
for(var cf in _self.sceneFishes){

if(_self.sceneFishes[cf]!=undefined){
	targetFishes.push(_self.sceneFishes[cf].curFishUID);
}

}	
/*--------------*/	

break;
	
}	
	
}
/*--------------*/




for(var fi=0; fi<targetFishes.length; fi++){

var cfish=targetFishes[fi];



if(_self.sceneFishes['fish_'+cfish]!=undefined){
	

if(isBomb && cfish!=isBombId){

continue;
	
}	
	
//console.log('FISH IID::: '+_self.sceneFishes['fish_'+cfish].fishId);
_self.sceneFishes['fish_'+cfish].fishHealth-=fishDmgValue;

var  tmpWin=_self.sceneFishes['fish_'+cfish].fishPay*bet;

/*-----------------------------*/	




if(_self.sceneFishes['fish_'+cfish].fishHealth<=0 && (tmpWin+totalWin)<=gameBank){


totalWin+=tmpWin;
	
winsArr.push('{"uid":'+cfish+',"score":'+(Math.round(tmpWin*100))+',"rate":'+_self.sceneFishes['fish_'+cfish].fishPay+',"ext":0}');		

	
delete _self.sceneFishes['fish_'+cfish];	


	
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

if(winsArr.length>0){
response.push('{"message":{"bulletid":"'+dat.message.fblist[0].bulletid+'","pos":5,"fishes":['+winsArr.join(',')+'],"rate":1},"succ":true,"errinfo":"ok","type":"hitsprites"}');	
}

response.push('{"message":{"money":0},"succ":true,"errinfo":"ok","type":"userinfo"}');
response.push('{"message":{"type":3,"player":{"uid":7401,"ws":0,"pos":5,"gunid":1,"gunnum":0,"reward_rate":'+Math.round(bet*100)+',"score":'+Math.round(endBalance*100)+',"isvistor":0}},"succ":true,"errinfo":"ok","type":"broadplayer"}');	








 await sys.Commit();	
 sys.SaveLogReport({balance:endBalance,bet:bet,win:totalWin});	




for(var rpc=0; rpc<response.length; rpc++){
emitter.emit('outcomingMessage',response[rpc],true);		
}

	



	
};

/*-----------bomb hit--------------*/
 this.BombHit = async function(dat)
{
	

		
var curTime  = new Date();	
	
for(var cf in _self.sceneFishes){

if(curTime.getTime()-_self.sceneFishes[cf].fishTime>=30000){
	
delete _self.sceneFishes[cf];	
	
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


for(var fi=0; fi<targetFishes.length; fi++){

var cfish=targetFishes[fi];



if(_self.sceneFishes['fish_'+cfish]!=undefined){
	


	
//console.log('FISH IID::: '+_self.sceneFishes['fish_'+cfish].fishId);
_self.sceneFishes['fish_'+cfish].fishHealth-=fishDmgValue;

var  tmpWin=_self.sceneFishes['fish_'+cfish].fishPay*bet;

/*-----------------------------*/	




if(_self.sceneFishes['fish_'+cfish].fishHealth<=0 && (tmpWin+totalWin)<=gameBank){


totalWin+=tmpWin;
	
	
winsArr.push('{"uid":'+cfish+',"score":'+(Math.round(tmpWin*100))+',"rate":'+_self.sceneFishes['fish_'+cfish].fishPay+',"ext":0,"fish_id":0}');		

	
delete _self.sceneFishes['fish_'+cfish];	


	
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

if(winsArr.length>0){
//response.push('{"message":{"bulletid":"'+dat.message.fblist[0].bulletid+'","pos":5,"fishes":['+winsArr.join(',')+'],"rate":1},"succ":true,"errinfo":"ok","type":"hitsprites"}');	
response.push('{"message":{"bombid":2840,"pos":5,"angle":0,"fishes":['+winsArr.join(',')+'],"bomb":{"id":2840,"uid":58632,"pos":5,"points":[],"born_time":1606651066186,"dead_time":1606651132186,"use_rate":0,"rate":555,"brate":100,"fish_id":1496371,"bomb_cnt":1,"num":1,"flag":1,"type":26,"del_time":0,"ext":0,"cond_rate":0,"shot_time":0,"class_id":26,"tons_list":[]}},"succ":true,"errinfo":"ok","type":"bombhit"}');	
}

response.push('{"message":{"money":0},"succ":true,"errinfo":"ok","type":"userinfo"}');
response.push('{"message":{"type":3,"player":{"uid":7401,"ws":0,"pos":5,"gunid":1,"gunnum":0,"reward_rate":'+Math.round(bet*100)+',"score":'+Math.round(endBalance*100)+',"isvistor":0}},"succ":true,"errinfo":"ok","type":"broadplayer"}');	








 await sys.Commit();	
 sys.SaveLogReport({balance:endBalance,bet:bet,win:totalWin});	





for(var rpc=0; rpc<response.length; rpc++){
emitter.emit('outcomingMessage',response[rpc],true);		
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

if(dat.message.roomtype==0){

_self.gameData.CurrentBet=1;
_self.gameData.min=1;	
_self.gameData.max=200;	
	
}else if(dat.message.roomtype==1){

_self.gameData.CurrentBet=10;
_self.gameData.min=10;	
_self.gameData.max=2000;	
	
}else if(dat.message.roomtype==2){

_self.gameData.CurrentBet=50;
_self.gameData.min=50;	
_self.gameData.max=20000;	
}



var response='{"message":{"result":1,"roompos":3,"scenestate":5,"sceneid":1,"scene_etime":'+curTime.getTime()+',"scene_btime":'+(curTime.getTime()+80000)+',"players":[{"uid":7401,"ws":0,"pos":5,"gunid":1,"gunnum":0,"reward_rate":'+_self.gameData.CurrentBet+',"score":'+_self.gameBalanceInCents+',"isvistor":false}],"sprites":[],"bullets":[],"min":'+_self.gameData.min+',"max":'+_self.gameData.max+',"coinrate":1000,"bombs":[],"feathers":[{"k":10089,"v":1},{"k":9914,"v":1},{"k":8331,"v":4},{"k":8975,"v":1},{"k":9336,"v":4},{"k":2512,"v":2},{"k":6707,"v":2},{"k":8609,"v":2},{"k":9614,"v":1},{"k":8819,"v":2},{"k":9870,"v":3},{"k":3208,"v":3},{"k":9772,"v":1},{"k":6603,"v":1},{"k":9634,"v":4},{"k":9573,"v":1},{"k":8704,"v":4},{"k":103,"v":4},{"k":8976,"v":4},{"k":7420,"v":1},{"k":9429,"v":4},{"k":5639,"v":1},{"k":6498,"v":4},{"k":6105,"v":4},{"k":9361,"v":1},{"k":5142,"v":2},{"k":9138,"v":4},{"k":9635,"v":4},{"k":9157,"v":4},{"k":7852,"v":1},{"k":10019,"v":1},{"k":2076,"v":1},{"k":8599,"v":1},{"k":8790,"v":4},{"k":10047,"v":3},{"k":9469,"v":4},{"k":6501,"v":1},{"k":7528,"v":3},{"k":5090,"v":4},{"k":7818,"v":1},{"k":5843,"v":1},{"k":8566,"v":4},{"k":7041,"v":1},{"k":9143,"v":1},{"k":2805,"v":3},{"k":6155,"v":4},{"k":10151,"v":2},{"k":9166,"v":4},{"k":2057,"v":4},{"k":8342,"v":3},{"k":7383,"v":4},{"k":10087,"v":4},{"k":9322,"v":1},{"k":10339,"v":2},{"k":7689,"v":1},{"k":10457,"v":1},{"k":2126,"v":1},{"k":9229,"v":4},{"k":9451,"v":1},{"k":7200,"v":3},{"k":8633,"v":4},{"k":8446,"v":2},{"k":8700,"v":1},{"k":7587,"v":2},{"k":9023,"v":4},{"k":2443,"v":3},{"k":9010,"v":3},{"k":10141,"v":4},{"k":7483,"v":4},{"k":2679,"v":4},{"k":8631,"v":4},{"k":8027,"v":1},{"k":4488,"v":1},{"k":9896,"v":1},{"k":9840,"v":4},{"k":9252,"v":1},{"k":144,"v":2},{"k":983,"v":2},{"k":8341,"v":3},{"k":7980,"v":1},{"k":4329,"v":1},{"k":9289,"v":1},{"k":8629,"v":4},{"k":9534,"v":4},{"k":8823,"v":2},{"k":9681,"v":1},{"k":8932,"v":1},{"k":8205,"v":4},{"k":6679,"v":2},{"k":8960,"v":2},{"k":5492,"v":2},{"k":10070,"v":1},{"k":8974,"v":4},{"k":95,"v":1},{"k":9583,"v":2},{"k":2819,"v":4},{"k":9691,"v":3},{"k":8029,"v":4},{"k":9261,"v":4},{"k":8721,"v":4},{"k":1187,"v":4},{"k":10296,"v":2},{"k":1778,"v":1},{"k":4379,"v":2},{"k":10181,"v":4},{"k":8523,"v":3},{"k":6718,"v":4},{"k":2761,"v":4},{"k":8841,"v":2},{"k":8664,"v":4},{"k":3710,"v":2},{"k":9326,"v":2},{"k":276,"v":4},{"k":8457,"v":1},{"k":99,"v":4},{"k":8521,"v":4},{"k":8640,"v":4},{"k":9456,"v":2},{"k":7485,"v":4},{"k":8522,"v":1},{"k":9406,"v":1},{"k":8333,"v":4},{"k":8327,"v":1},{"k":3701,"v":4},{"k":84,"v":4},{"k":8724,"v":4},{"k":9004,"v":4},{"k":8086,"v":3},{"k":4987,"v":4},{"k":6774,"v":1},{"k":5908,"v":1},{"k":9879,"v":1},{"k":7474,"v":1},{"k":4849,"v":4},{"k":9936,"v":4},{"k":88,"v":4},{"k":3086,"v":2},{"k":9575,"v":3},{"k":6875,"v":3},{"k":9053,"v":4},{"k":6022,"v":4},{"k":154,"v":4},{"k":8598,"v":4},{"k":6457,"v":4},{"k":8295,"v":1},{"k":10142,"v":4},{"k":10137,"v":1},{"k":8972,"v":1},{"k":8626,"v":1},{"k":7757,"v":3},{"k":9829,"v":1},{"k":5809,"v":4},{"k":9524,"v":2},{"k":8644,"v":4},{"k":8752,"v":2},{"k":5865,"v":2},{"k":2830,"v":1},{"k":7397,"v":3},{"k":98,"v":4},{"k":10356,"v":4},{"k":8891,"v":4},{"k":7669,"v":3},{"k":8769,"v":1},{"k":9274,"v":4},{"k":6484,"v":4},{"k":9486,"v":1},{"k":1358,"v":2},{"k":8652,"v":2},{"k":3402,"v":2},{"k":7991,"v":1},{"k":9832,"v":4},{"k":6061,"v":1},{"k":4356,"v":2},{"k":7745,"v":4},{"k":9752,"v":4},{"k":9392,"v":1},{"k":8324,"v":4},{"k":8973,"v":1},{"k":9767,"v":2},{"k":8965,"v":1},{"k":8329,"v":4},{"k":2496,"v":4},{"k":7225,"v":4},{"k":9142,"v":2},{"k":9174,"v":4},{"k":8751,"v":1},{"k":6761,"v":4},{"k":1186,"v":4},{"k":9237,"v":4},{"k":8699,"v":4},{"k":7760,"v":4},{"k":6461,"v":4},{"k":9807,"v":1},{"k":10332,"v":1},{"k":8313,"v":1},{"k":9798,"v":4},{"k":6049,"v":3},{"k":7911,"v":3},{"k":8321,"v":4},{"k":9250,"v":2},{"k":7445,"v":4},{"k":9408,"v":4},{"k":9032,"v":4},{"k":8992,"v":4},{"k":8178,"v":4},{"k":7529,"v":4},{"k":9925,"v":1},{"k":8428,"v":2},{"k":8087,"v":1},{"k":2788,"v":2},{"k":1999,"v":1},{"k":9632,"v":2},{"k":4473,"v":4},{"k":7509,"v":4},{"k":9714,"v":1},{"k":9173,"v":4},{"k":8722,"v":4},{"k":7515,"v":4},{"k":5432,"v":4},{"k":8390,"v":4},{"k":3220,"v":2},{"k":8723,"v":4},{"k":8984,"v":1},{"k":7612,"v":1},{"k":157,"v":4},{"k":9049,"v":1},{"k":8536,"v":3},{"k":8803,"v":1},{"k":8837,"v":1},{"k":9033,"v":1},{"k":7653,"v":4},{"k":10386,"v":1},{"k":4493,"v":1},{"k":8949,"v":4},{"k":9933,"v":3},{"k":6161,"v":2},{"k":9151,"v":2},{"k":7197,"v":1},{"k":3794,"v":1},{"k":9608,"v":4},{"k":6406,"v":4},{"k":6480,"v":1},{"k":8304,"v":1},{"k":9066,"v":1},{"k":10309,"v":2},{"k":7787,"v":1},{"k":6824,"v":4},{"k":85,"v":1},{"k":8411,"v":4},{"k":4375,"v":4},{"k":5230,"v":1},{"k":8167,"v":4},{"k":9766,"v":2},{"k":7417,"v":1},{"k":9636,"v":4},{"k":8938,"v":1},{"k":9260,"v":1},{"k":7436,"v":4},{"k":2376,"v":2},{"k":6333,"v":4},{"k":9461,"v":1},{"k":9924,"v":3},{"k":8636,"v":4}]},"succ":true,"errinfo":"ok","type":"enterroom"}';



/*-----------------------------------*/	

emitter.emit('outcomingMessage',response,true);		


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


_self.gameCommand=data.gameData.type;



switch(_self.gameCommand){
	
case 'heart':

 _self.Ping(data.gameData); 

break;
	
case 'login':

 _self.Login(data.gameData); 

break;	
case 'quickenterroom':

 _self.EnterRoom(data.gameData); 

break;
case 'changbackstage':

 _self.ChangeBackstage(data.gameData); 

break;

case 'fire':

 _self.Fire(data.gameData); 

break;

case 'bombhit':

await  _self.BombHit(data.gameData); 

break;
case 'hit':

await  _self.PrepareHit(data.gameData); 

break;

case 'changerate':

 _self.ChangeRate(data.gameData); 

break;
case 'canclelocking':

 _self.CancleLocking(data.gameData); 

break;
case 'changelocking':

 _self.ChangeLocking(data.gameData); 

break;
case 'leaveroom':

break;
case 'electrichit':

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
