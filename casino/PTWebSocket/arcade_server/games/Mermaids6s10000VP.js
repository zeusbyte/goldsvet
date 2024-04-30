
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




fishPay['Fish_1'] = [2,2];
fishPay['Fish_2'] = [3,3];
fishPay['Fish_3'] = [4,4];
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
fishPay['Fish_17'] = [50,50];
fishPay['Fish_18'] = [100,100];
fishPay['Fish_19'] = [20,40];
fishPay['Fish_20'] = [20,40];
fishPay['Fish_21'] = [20,40];
fishPay['Fish_22'] = [100,300];
fishPay['Fish_23'] = [100,300];
fishPay['Fish_24'] = [0,0];
fishPay['Fish_25'] = [0,0];
fishPay['Fish_26'] = [0,0];
fishPay['Fish_27'] = [0,0];
fishPay['Fish_28'] = [0,0];
fishPay['Fish_29'] = [0,0];
fishPay['Fish_30'] = [0,0];
fishPay['Fish_27'] = [0,0];
fishPay['Fish_28'] = [0,0];
fishPay['Fish_29'] = [100,400];
fishPay['Fish_30'] = [100,400];
fishPay['Fish_31'] = [100,400];
fishPay['Fish_32'] = [0,0];
fishPay['Fish_33'] = [0,0];

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
fishDamage['Fish_19']=[10,200];
fishDamage['Fish_20']=[10,200];
fishDamage['Fish_21']=[10,200];
fishDamage['Fish_22']=[10,200];
fishDamage['Fish_23']=[10,200];
fishDamage['Fish_24']=[10,200];
fishDamage['Fish_25']=[10,200];
fishDamage['Fish_26']=[10,200];
fishDamage['Fish_27']=[20,200];
fishDamage['Fish_28']=[20,200];
fishDamage['Fish_29']=[20,200];
fishDamage['Fish_30']=[20,200];
fishDamage['Fish_31']=[20,200];
fishDamage['Fish_32']=[20,200];
fishDamage['Fish_33']=[20,200];



/*----------control fishes on scene------------*/

_self.fishesId=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,12,12,12,12,12,12,13,13,13,13,13,13,13,13,13,13,13,13,13,13,14,14,14,14,14,14,14,14,14,15,15,15,15,15,15,15,15,16,16,16,16,16,16,17,17,17,17,17,17,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,21,21,21,21,22,22,22,22,22,22,22,22,31,31,31,31,30,30,30,30,29,29,29,29,23,23,23,23,23,23,23,23,23,25,26,25,26,25,26,25,26,25,26,25,26,25,26];




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
	curFishId=26;
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

var response='{"message":{"sceneid":'+utils.RandomInt(1,3)+',"btime":'+(curTime.getTime()+60000)+',"etime":'+(curTime.getTime())+'},"succ":true,"errinfo":"ok","type":"changescene"}';
	
emitter.emit('outcomingMessage',response,true);		
	
}





/*-----------simple hit--------------*/
 this.Hit = async function(dat)
{
	
var fullBombId=25;
var localBombId=26;
	
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
	
////////console.log('ISBOMB::: '+isBomb,' BOMB ID::: '+isBombId,' FISH UID::: '+_self.sceneFishes['fish_'+cfish].fishId);

if(isBomb && cfish!=isBombId){

continue;
	
}	
	
//////console.log('FISH IID::: '+_self.sceneFishes['fish_'+cfish].fishId);
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

_self.gameData.CurrentBet=10;
_self.gameData.min=10;	
_self.gameData.max=100;	
	
}else if(dat.message.roomtype==1){

_self.gameData.CurrentBet=100;
_self.gameData.min=100;	
_self.gameData.max=1000;	
	
}

var response='{"message":{"result":1,"roompos":3,"scenestate":5,"sceneid":1,"scene_etime":'+curTime.getTime()+',"scene_btime":'+(curTime.getTime()+80000)+',"players":[{"uid":7401,"ws":0,"pos":5,"gunid":1,"gunnum":0,"reward_rate":'+_self.gameData.CurrentBet+',"score":'+_self.gameBalanceInCents+',"isvistor":false}],"sprites":[],"bullets":[],"min":'+_self.gameData.min+',"max":'+_self.gameData.max+',"coinrate":1000,"bombs":[]},"succ":true,"errinfo":"ok","type":"enterroom"}';



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

case 'hit':

 await  _self.Hit(data.gameData); 

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
