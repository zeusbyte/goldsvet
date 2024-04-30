
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
fishPay['Fish_14'] = [20,60];
fishPay['Fish_15'] = [20,60];
fishPay['Fish_16'] = [20,60];

fishPay['Fish_17'] = [30,100];
fishPay['Fish_18'] = [60,200];
fishPay['Fish_19'] = [350,350];

fishPay['Fish_20'] = [0,0];//none
fishPay['Fish_21'] = [0,0];//none
fishPay['Fish_22'] = [0,0];//none
fishPay['Fish_23'] = [0,0];// emperor crab
fishPay['Fish_24'] = [0,0];//none
fishPay['Fish_25'] = [0,0];//ancien crocdile
fishPay['Fish_26'] = [0,0];//thunder dragon
fishPay['Fish_27'] = [0,0];//super bomb crab
fishPay['Fish_28'] = [0,0];//lase crab
fishPay['Fish_29'] = [0,0];//dril crab
fishPay['Fish_30'] = [0,0];//roulett crab
fishPay['Fish_31'] = [0,0];//quake crab
fishPay['Fish_32'] = [0,0];//none
fishPay['Fish_33'] = [0,0];//none
fishPay['Fish_34'] = [0,0];//mermaid
fishPay['Fish_35'] = [0,0];//fire phoenix
fishPay['Fish_36'] = [0,0];//none
fishPay['Fish_37'] = [0,0];//none
fishPay['Fish_38'] = [0,0];//none
fishPay['Fish_39'] = [0,0];//none
fishPay['Fish_40'] = [0,0];//boss
fishPay['Fish_41'] = [0,0];//
fishPay['Fish_42'] = [0,0];//
fishPay['Fish_43'] = [0,0];//
fishPay['Fish_44'] = [0,0];//
fishPay['Fish_45'] = [0,0];//
fishPay['Fish_46'] = [0,0];//
fishPay['Fish_47'] = [0,0];//
fishPay['Fish_48'] = [0,0];//



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
fishDamage['Fish_23']=[10,80];
fishDamage['Fish_24']=[10,80];
fishDamage['Fish_25']=[10,80];
fishDamage['Fish_26']=[10,80];
fishDamage['Fish_27']=[10,80];
fishDamage['Fish_28']=[10,80];
fishDamage['Fish_29']=[10,80];
fishDamage['Fish_30']=[10,80];
fishDamage['Fish_31']=[10,80];
fishDamage['Fish_32']=[10,80];
fishDamage['Fish_33']=[10,80];
fishDamage['Fish_34']=[10,80];
fishDamage['Fish_35']=[10,80];
fishDamage['Fish_36']=[10,80];
fishDamage['Fish_37']=[10,80];
fishDamage['Fish_38']=[10,80];
fishDamage['Fish_39']=[10,80];
fishDamage['Fish_40']=[10,80];
fishDamage['Fish_41']=[10,80];
fishDamage['Fish_42']=[10,80];
fishDamage['Fish_43']=[10,80];
fishDamage['Fish_44']=[10,80];
fishDamage['Fish_45']=[10,80];
fishDamage['Fish_46']=[10,80];
fishDamage['Fish_47']=[10,80];



/*----------control fishes on scene------------*/


_self.fishesId=[1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,5,5,6,6,6,6,7,7,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,10,10,11,11,11,11,11,12,12,12,12,12,12,12,13,14,15,16,17,18,19,13,14,15,16,17,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,5,5,6,6,6,6,7,7,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,10,10,11,11,11,11,11,12,12,12,12,12,12,12,13,14,15,16,17,18,19,13,14,15,16,17,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,5,5,6,6,6,6,7,7,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,10,10,11,11,11,11,11,12,12,12,12,12,12,12,13,14,15,16,17,18,19,13,14,15,16,17,18,19,13,14,15,16,17,18,19,13,14,15,16,17,18,19,13,14,15,16,17,18,19,13,14,15,16,17,18,19,13,14,15,16,17,18,19,1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,5,5,6,6,6,6,7,7,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,10,10,11,11,11,11,11,12,12,12,12,12,12,12,13,14,15,16,17,18,19,13,14,15,16,17,18,19,13,14,15,16,17,18,19,13,14,15,16,17,18,19,13,14,15,16,17,18,19,13,14,15,16,17,18,19,13,14,15,16,17,18,19,1,1,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,5,5,6,6,6,6,7,7,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,10,10,11,11,11,11,11,12,12,12,12,12,12,12,13,14,15,16,17,18,19,13,14,15,16,17,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,5,5,6,6,6,6,7,7,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,10,10,11,11,11,11,11,12,12,12,12,12,12,12,13,14,15,16,17,18,19,13,14,15,16,17,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,5,5,6,6,6,6,7,7,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,10,10,11,11,11,11,11,12,12,12,12,12,12,12,13,14,15,16,17,18,19,13,14,15,16,17,18,19,13,14,15,16,17,18,19,13,14,15,16,17,18,19,13,14,15,16,17,18,19,13,14,15,16,17,18,19,13,14,15,16,17,18,19,1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,5,5,6,6,6,6,7,7,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,10,10,11,11,11,11,11,12,12,12,12,12,12,12,13,14,15,16,17,18,19,13,14,15,16,17,18,19,13,14,15,16,17,18,19,13,14,15,16,17,18,19,13,14,15,16,17,18,19,13,14,15,16,17,18,19,13,14,15,16,17,18,19,23,25,27,28,29,31,34,35,40];	


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
//var cFishHealth=1;	
var cFishPay=utils.RandomInt(fishPay['Fish_'+curFishId][0],fishPay['Fish_'+curFishId][1]);	



	

_self.sceneFishes['fish_'+curFishUID]={curFishUID:curFishUID,fishId:curFishId,fishHealth:cFishHealth,fishPay:cFishPay,fishTime:curTime.getTime()};	

var  fishPreset='{"message":{"sprites":[{"id":'+curFishUID+',"classid":'+curFishId+',"fishid":'+curFishId+',"born_time":'+(curTime.getTime())+',"routeid":'+route+',"dead_time":'+(curTime.getTime()+30000)+',"offsettype":0,"offsetx":'+curFishOX+',"offsety":'+curFishOY+',"offsetr":0,"type":1,"rate":200,"ext":0}]},"succ":true,"errinfo":"ok","type":"increasesprites"}';		
	
	
	
	
emitter.emit('outcomingMessage',fishPreset,true);		
	
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

 this.ChangeGun = async function(dat)
{
	
var GunId=_self.gameData.GunId;
var CurrentBet=_self.gameData.CurrentBet;


if(_self.gameData.GunId==undefined || _self.gameData.GunId==1){
GunId=3;	

}else{

GunId=1;	
	
}


_self.gameData.GunId=GunId;	


var response0='{"message":{"result":1},"succ":true,"errinfo":"ok","type":"changegun"}';
var response1='{"message":{"type":3,"player":{"uid":7401,"ws":0,"pos":5,"gunid":'+GunId+',"gunnum":0,"reward_rate":'+Math.round(utils.FixNumber(CurrentBet))+',"score":'+(_self.gameBalanceInCents*100)+',"isvistor":0}},"succ":true,"errinfo":"ok","type":"broadplayer"}';


	
emitter.emit('outcomingMessage',response0,true);		
emitter.emit('outcomingMessage',response1,true);		
	
}
 this.ChangeRate = async function(dat)
{
	
	


_self.gameData.CurrentBet=Math.round(utils.FixNumber(dat.message.rewardrate));

if(_self.gameData.CurrentBet<0){
_self.gameData.CurrentBet=1;	
}

//////////////////////////
var balanceInCents=await sys.GetBalance();
_self.gameBalanceInCents=balanceInCents*100;

var response0='{"type":"changerate","message":{"rewardrate":'+Math.round(utils.FixNumber(dat.message.rewardrate))+'}}';
var response1='{"message":{"type":3,"player":{"uid":7401,"ws":0,"pos":5,"gunid":'+_self.gameData.GunId+',"gunnum":0,"reward_rate":'+Math.round(utils.FixNumber(_self.gameData.CurrentBet))+',"score":'+_self.gameBalanceInCents+',"isvistor":0}},"succ":true,"errinfo":"ok","type":"broadplayer"}';

	
emitter.emit('outcomingMessage',response0,true);		
emitter.emit('outcomingMessage',response1,true);		
	
}

 this.Fire = async function(dat)
{
	
	
var balanceInCents=_self.gameBalanceInCents;

var response='{"message":{"type":3,"player":{"uid":7401,"ws":0,"pos":5,"gunid":'+_self.gameData.GunId+',"gunnum":0,"reward_rate":'+_self.gameData.CurrentBet+',"score":'+balanceInCents+',"isvistor":0}},"succ":true,"errinfo":"ok","type":"broadplayer"}';
	
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




/*-----------prepare hit--------------*/
 this.PrepareHit = async function(dat)
{
	
///	

var isSpecial=false;
var curSpecId=-1;
var curSpecUId=0;
//	

var specialFishId=[23,25,27,28,29,31,34,35,40];	

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


emitter.emit('outcomingMessage',response,true);		

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


/*

_self.gameData.BombUID=cfish;
_self.gameData.BombType=curSpecId;

*/

if(winsArr.length>0){

response.push('{"message":{"bombid":'+_self.gameData.BombUID+',"pos":5,"angle":0,"fishes":['+winsArr.join(',')+'],"bomb":{"id":'+_self.gameData.BombUID+',"uid":'+_self.gameData.BombUID+',"pos":5,"points":[],"born_time":'+(curTime.getTime()-5000)+',"dead_time":'+(curTime.getTime()+5000)+',"use_rate":'+Math.round(totalWin*100)+',"rate":'+Math.round(totalWin*100)+',"brate":'+Math.round(totalWin*100)+',"fish_id":'+_self.gameData.BombUID+',"bomb_cnt":1,"num":1,"flag":1,"type":'+_self.gameData.BombType+',"del_time":'+(curTime.getTime()+5000)+',"ext":0,"cond_rate":0,"shot_time":0,"class_id":'+_self.gameData.BombType+',"tons_list":[]}},"succ":true,"errinfo":"ok","type":"bombhits"}');	


}


response.push('{"message":{"bomb_id":'+_self.gameData.BombUID+',"score":'+Math.round(totalWin*100)+',"pos":5},"succ":true,"errinfo":"ok","type":"bombbroad"}');	

response.push('{"message":{"type":3,"player":{"uid":7401,"ws":0,"pos":5,"gunid":1,"gunnum":0,"reward_rate":'+Math.round(bet*100)+',"score":'+Math.round(endBalance*100)+',"isvistor":0}},"succ":true,"errinfo":"ok","type":"broadplayer"}');	








 await sys.Commit();	
 sys.SaveLogReport({balance:endBalance,bet:bet,win:totalWin});	





for(var rpc=0; rpc<response.length; rpc++){
emitter.emit('outcomingMessage',response[rpc],true);		
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
response.push('{"message":{"type":3,"player":{"uid":7401,"ws":0,"pos":5,"gunid":'+_self.gameData.GunId+',"gunnum":0,"reward_rate":'+Math.round(bet*100)+',"score":'+Math.round(endBalance*100)+',"isvistor":0}},"succ":true,"errinfo":"ok","type":"broadplayer"}');	








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
_self.gameData.GunId=1;	
/*----------------*/

	
var balanceInCents=await sys.GetBalance();
_self.gameBalanceInCents=balanceInCents*100;


/*--------------ENTER ROOM---------------------*/	

var curTime  = new Date();

if(dat.message.roomtype==0){

_self.gameData.CurrentBet=5;
_self.gameData.min=5;	
_self.gameData.max=200;	
	
}else if(dat.message.roomtype==1){

_self.gameData.CurrentBet=10;
_self.gameData.min=10;	
_self.gameData.max=2000;	
	
}else if(dat.message.roomtype==2){

_self.gameData.CurrentBet=100;
_self.gameData.min=100;	
_self.gameData.max=20000;	
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

//console.log('data.gameData ::: '+JSON.stringify(data.gameData));	

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

 //_self.ChangeBackstage(data.gameData); 

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

case 'changegun':

 _self.ChangeGun(data.gameData); 

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
