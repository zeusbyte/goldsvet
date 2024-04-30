
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

fishPay['Fish_0']=[2,2];//
fishPay['Fish_1']=[3,3];//
fishPay['Fish_2']=[4,4];//
fishPay['Fish_3']=[5,5];//
fishPay['Fish_4']=[6,6];//
fishPay['Fish_5']=[7,7];//
fishPay['Fish_6']=[8,8];//
fishPay['Fish_7']=[9,9];//
fishPay['Fish_8']=[10,10];//
fishPay['Fish_9']=[12,12];//
fishPay['Fish_10']=[15,15];//
fishPay['Fish_11']=[18,18];//
fishPay['Fish_12']=[20,20];//
fishPay['Fish_13']=[25,25];//
fishPay['Fish_14']=[30,30];//
fishPay['Fish_15']=[40,40];//
fishPay['Fish_16']=[50,50];//
fishPay['Fish_17']=[30,70];//
fishPay['Fish_18']=[30,70];//
fishPay['Fish_19']=[40,80];//
fishPay['Fish_20']=[40,90];//
fishPay['Fish_21']=[50,100];//
fishPay['Fish_22']=[50,100];//
fishPay['Fish_23']=[60,200];//
fishPay['Fish_24']=[60,888];//

fishPay['Fish_100']=[0,0];//laser crab
fishPay['Fish_101']=[0,0];//drill crab
fishPay['Fish_102']=[0,0];//bomb crab
fishPay['Fish_103']=[0,0];//wheel
fishPay['Fish_104']=[0,0];//jellyfish
fishPay['Fish_105']=[0,0];//firestorm
fishPay['Fish_106']=[0,0];//immortal dragon
fishPay['Fish_107']=[10,200];//gold bag



var fishDamage=[];

fishDamage['Fish_0']=[1,6];//
fishDamage['Fish_1']=[1,6];//
fishDamage['Fish_2']=[1,6];//
fishDamage['Fish_3']=[1,7];//
fishDamage['Fish_4']=[1,8];//
fishDamage['Fish_5']=[1,10];//
fishDamage['Fish_6']=[1,10];//
fishDamage['Fish_7']=[1,12];//
fishDamage['Fish_8']=[2,12];//
fishDamage['Fish_9']=[3,15];//
fishDamage['Fish_10']=[4,18];//
fishDamage['Fish_11']=[5,20];//
fishDamage['Fish_12']=[6,30];//
fishDamage['Fish_13']=[7,30];//
fishDamage['Fish_14']=[10,40];//
fishDamage['Fish_15']=[10,50];//
fishDamage['Fish_16']=[10,60];//
fishDamage['Fish_17']=[15,80];//
fishDamage['Fish_18']=[15,80];//
fishDamage['Fish_19']=[15,100];//
fishDamage['Fish_20']=[15,100];//
fishDamage['Fish_21']=[20,120];//
fishDamage['Fish_22']=[20,120];//
fishDamage['Fish_23']=[30,250];//
fishDamage['Fish_24']=[30,300];//

fishDamage['Fish_100']=[30,200];//laser crab
fishDamage['Fish_101']=[30,200];//drill crab
fishDamage['Fish_102']=[30,200];//bomb crab
fishDamage['Fish_103']=[30,200];//wheel
fishDamage['Fish_104']=[30,200];//jellyfish
fishDamage['Fish_105']=[30,200];//firestorm
fishDamage['Fish_106']=[30,200];//immortal dragon
fishDamage['Fish_107']=[10,100];//gold bag


/*----------control fishes on scene------------*/

_self.fishesId=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,12,12,12,13,13,13,13,13,13,13,13,13,14,14,14,14,14,14,14,15,15,15,15,15,15,15,16,16,16,16,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,24,24,24,24,24,24,24,100,101,102,103,104,105,106,107];

_self.fishesId=utils.ShuffleArray(_self.fishesId);

_self.fishesId_=0;

this.FishesUpdate=function(){
	
var fDirectArr=['leftToRight','rightToLeft','upToDown','downToUp'];	
var fDirect=fDirectArr[utils.RandomInt(0,3)];	


var curFishId=_self.fishesId[utils.RandomInt(0,_self.fishesId.length-1)];
var curFishUID=utils.RandomInt(1,1000000);	
var curTime  = new Date();


//fDirect='leftToRight';

if(curFishId==107){
fDirect='rightToLeft';	
}

if(fDirect=='leftToRight'){
	
var routeSet={
startX:-(utils.RandomInt(250,300)),	
startY:utils.RandomInt(0,900),
midX:utils.RandomInt(300,500),	
midY:utils.RandomInt(0,800),	
mid2X:utils.RandomInt(500,900),	
mid2Y:utils.RandomInt(0,800),	
endX:1800,	
endY:utils.RandomInt(0,900)	
	
};	
	
	
}else if(fDirect=='rightToLeft'){
	
var routeSet={
endX:-(utils.RandomInt(650,700)),	
endY:utils.RandomInt(0,900),
mid2X:utils.RandomInt(300,500),	
mid2Y:utils.RandomInt(0,800),	
midX:utils.RandomInt(500,900),	
midY:utils.RandomInt(0,800),	
startX:1700,	
startY:utils.RandomInt(0,900)	
	
};	
	
	
}else if(fDirect=='upToDown'){
	
var routeSet={
endX:utils.RandomInt(0,1300),	
endY:1300,	
midX:utils.RandomInt(300,800),	
midY:utils.RandomInt(600,800),	
mid2X:utils.RandomInt(300,800),	
mid2Y:utils.RandomInt(600,800),
startX:utils.RandomInt(0,1300),	
startY:-60	
	
};	
	
	
}else if(fDirect=='downToUp'){
	
var routeSet={
startX:utils.RandomInt(0,1300),	
startY:900,	
midX:utils.RandomInt(300,800),	
midY:utils.RandomInt(600,800),	
mid2X:utils.RandomInt(300,800),	
mid2Y:utils.RandomInt(600,800),
endX:utils.RandomInt(0,1300),	
endY:-300	
	
};	
	
	
}		
	





/*
if(_self.fishesId_==20){
	curFishId=104;
}
*/

	
var fishPreset='-114.{"cti":"2020-08-04 14:02:45.078","fhes":[{"id":'+curFishUID+',"kd":'+curFishId+'}],"tc":{"ps":[{"x":'+routeSet.startX+',"y":'+routeSet.startY+'},{"x":'+routeSet.midX+',"y":'+routeSet.midY+'},{"x":'+routeSet.mid2X+',"y":'+routeSet.mid2Y+'},{"x":'+routeSet.endX+',"y":'+routeSet.endY+'}],"tp":1}}';	
	
var cFishHealth=utils.RandomInt(fishDamage['Fish_'+curFishId][0],fishDamage['Fish_'+curFishId][1]);	
var cFishHealth=1;	

var cFishPay=utils.RandomInt(fishPay['Fish_'+curFishId][0],fishPay['Fish_'+curFishId][1]);	
	
if(curFishId==103){
	
var wheelPays=[30,40,50,60,70,80,90,100,200,300];	

wheelPays=utils.ShuffleArray(wheelPays);
cFishPay=wheelPays[0];
	
}	
	
_self.sceneFishes['fish_'+curFishUID]={fishId:curFishId,fishHealth:cFishHealth,fishPay:cFishPay,fishTime:curTime.getTime()};	

	
	
	
	
emitter.emit('outcomingMessage',fishPreset);		
	
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



 this.Init = async function(step)
{


var balanceInCents,response;

switch(step){
	
case 0:

await sys.CreateConnection();	

balanceInCents=await sys.GetBalance();
_self.gameBalanceInCents=balanceInCents;

response='99999.{"serialNo":"99999.","code":0,"sessionId":"c7w5i0rqo0ojimg1rewdmxhhnlxto13m","token":"f799cce70b4ead8df9fe31a2728d08c2","acct":{"acctId":"'+sys.userName+'","acctName":"'+sys.userName+'","merchant":"TEST","currency":"PTS","balance":'+balanceInCents+',"oneWallet":false},"lobbyUrl":"","reTime":30}';

break;

case 1:

balanceInCents=_self.gameBalanceInCents;


response='1.{"serialNo":"0","code":0,"sessionId":"c7w5i0rqo0ojimg1rewdmxhhnlxto13m","token":"f799cce70b4ead8df9fe31a2728d08c2","acct":{"acctId":"'+sys.userName+'","acctName":"'+sys.userName+'","merchant":"TEST","currency":"PTS","balance":'+balanceInCents+',"oneWallet":false},"lobbyUrl":"","reTime":30}';


break;	

case 2:


response='6.{"serialNo":"2","code":0,"time":"2020-08-04 09:20:08","timeMillis":1596504008529,"timeZone":"+0800"}';


break;	



}


emitter.emit('outcomingMessage',response);	

};


 this.Ping = async function(dat)
{

	
var response='6.{"serialNo":"'+dat.serialNo+'","code":0,"time":"2020-08-04 09:20:08","timeMillis":1596504008529,"timeZone":"+0800","uid":'+sys.userId+'}';	
emitter.emit('outcomingMessage',response);		
	
}


 this.ExitRoom = async function(dat)
{
	
	
let balanceInCents=await sys.GetBalance();
_self.gameBalanceInCents=balanceInCents;

let response='708.{"serialNo":"'+dat.serialNo+'","code":0,"ai":{"acctId":"'+sys.userName+'","acctName":"'+sys.userName+'","merchant":"TEST","currency":"PTS","balance":'+balanceInCents+'}}';
	
emitter.emit('outcomingMessage',response);		
	
}

 this.Fire = async function(dat)
{
	
	
let balanceInCents=_self.gameBalanceInCents;

let response='702.{"serialNo":"'+dat.serialNo+'","code":0,"win":0,"cnt":1}';
	
emitter.emit('outcomingMessage',response);		
	
}




/*-----------massive hit--------------*/

 this.MassHit = async function(dat)
{
	
let curTime  = new Date();	
	
for(var cf in _self.sceneFishes){

if(curTime.getTime()-_self.sceneFishes[cf].fishTime>=30000){
	
delete _self.sceneFishes[cf];	
	
}	



}	
	

/*---check internal state---*/	
if(_self.gameData.slotState!='masshit'){
  var response='704.{"serialNo":"'+dat.serialNo+'","code":0,"win":0,"bal":0,"fhes":[],"st":9,"fhId":0,"kd":0}';	
  emitter.emit('outcomingMessage',response);		
return;	
}	
/*-----------------------------------*/	
	
let bet=_self.bet;
let startBalance=await sys.GetBalanceB();
let totalWin=0;	
	
/*--------------*/
if(sys.conn.connection._closing){
await sys.CreateConnection();	
}
/*-------------*/
await sys.StartTransaction();	
	







/*-----------------------------*/	
var winsArr=[];

var targetFishes=dat.fhIds;
var gameBank=await sys.GetBank();	

for(let fi=0; fi<targetFishes.length; fi++){

var cfish=targetFishes[fi];

if(_self.sceneFishes['fish_'+cfish]!=undefined){



if(dat.kd==105 || dat.kd==104){
_self.sceneFishes['fish_'+cfish].fishHealth-=50;	
}else{
_self.sceneFishes['fish_'+cfish].fishHealth-=utils.RandomInt(20,100);			
}





var  tmpWin=_self.sceneFishes['fish_'+cfish].fishPay*bet;






if(_self.sceneFishes['fish_'+cfish].fishHealth<=0 && (totalWin+tmpWin)<=gameBank){

totalWin+=tmpWin;
	
winsArr.push('{"id":'+cfish+',"kd":'+_self.sceneFishes['fish_'+cfish].fishId+',"win":'+tmpWin+',"od":'+_self.sceneFishes['fish_'+cfish].fishPay+'}');		
	
delete _self.sceneFishes['fish_'+cfish];	
	
}


	
}	
	
	
}
	
/*-----------------------------*/	
	

	
let endBalance=utils.FixNumber(startBalance-bet+totalWin);


var response;
var d=utils.RandomInt(1,20);	

if(d==9 || dat.kd==101){
_self.gameData.slotState='hit';	
}


if(totalWin>0){
	
await sys.SetBalance(totalWin);	
await sys.SetBank(-totalWin,'');	
	

	
 response='704.{"serialNo":"'+dat.serialNo+'","code":0,"win":'+totalWin+',"bal":'+endBalance+',"fhes":['+winsArr.join(",")+'],"st":'+d+',"fhId":'+dat.rfId+',"kd":'+dat.kd+'}';	

}else{
	
  response='704.{"serialNo":"'+dat.serialNo+'","code":0,"win":'+totalWin+',"bal":'+endBalance+',"fhes":['+winsArr.join(",")+'],"st":'+d+',"fhId":'+dat.rfId+',"kd":'+dat.kd+'}';	

}












 await sys.Commit();	
 sys.SaveLogReport({balance:endBalance,bet:bet,win:totalWin});	



emitter.emit('outcomingMessage',response);		
	

	
}



/*-----------simple hit--------------*/
 this.Hit = async function(dat)
{
	

	
let curTime  = new Date();	
	
for(var cf in _self.sceneFishes){

if(curTime.getTime()-_self.sceneFishes[cf].fishTime>=30000){
	
delete _self.sceneFishes[cf];	
	
}	



}	
	

	
let bet=dat.bet;
let totalWin=0;	
	
_self.bet=bet;	
	
/*--------------*/
if(sys.conn.connection._closing){
await sys.CreateConnection();	
}
/*-------------*/
await sys.StartTransaction();	
let startBalance=await sys.GetBalanceB();	

bet=parseFloat(bet);
if(startBalance<bet || bet<0.0001 || !Number.isFinite(bet) ){
emitter.emit('Error','Invalid balance or bet');	
sys.Rollback();   	
return;	
}	





if(_self.gameData.freeInfo.count<_self.gameData.freeInfo.index){

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

}

/*-----------------------------*/	
var winsArr=[];
var freeInfo='';
/*-----------------------------*/	

var gameBank=await sys.GetBank();	

if(_self.sceneFishes['fish_'+dat.fhId]!=undefined){



_self.sceneFishes['fish_'+dat.fhId].fishHealth--;



var  tmpWin=_self.sceneFishes['fish_'+dat.fhId].fishPay*bet;

/*-----------------------------*/	
	






//disable mass attack in free

if(_self.gameData.slotState=='freegame' && (_self.sceneFishes['fish_'+dat.fhId].fishId==102 || _self.sceneFishes['fish_'+dat.fhId].fishId==104 || _self.sceneFishes['fish_'+dat.fhId].fishId==100  || _self.sceneFishes['fish_'+dat.fhId].fishId==101   || _self.sceneFishes['fish_'+dat.fhId].fishId==105) ){
_self.sceneFishes['fish_'+dat.fhId].fishHealth=1;	
}


/*check bonus accept*/
if((_self.sceneFishes['fish_'+dat.fhId].fishId==102 || _self.sceneFishes['fish_'+dat.fhId].fishId==100  || _self.sceneFishes['fish_'+dat.fhId].fishId==101  || _self.sceneFishes['fish_'+dat.fhId].fishId==104) && (20*bet)>gameBank ){
_self.sceneFishes['fish_'+dat.fhId].fishHealth=1;	
}


if(_self.sceneFishes['fish_'+dat.fhId].fishHealth<=0 && tmpWin<=gameBank){

if(_self.sceneFishes['fish_'+dat.fhId].fishId==102 || _self.sceneFishes['fish_'+dat.fhId].fishId==100  || _self.sceneFishes['fish_'+dat.fhId].fishId==101  || _self.sceneFishes['fish_'+dat.fhId].fishId==104 ){
	_self.gameData.slotState='masshit';	
}

if(_self.sceneFishes['fish_'+dat.fhId].fishId==105){
_self.gameData.slotState='freegame';		
_self.gameData.freeInfo.count=50;
_self.gameData.freeInfo.index=0;
_self.gameData.freeInfo.freeWin=0;	
freeInfo=',"fi":{"count":'+_self.gameData.freeInfo.count+',"index":0,"c":'+_self.gameData.freeInfo.count+',"i":0}';	
}


totalWin=tmpWin;
	
winsArr.push('{"id":'+dat.fhId+',"kd":'+dat.kd+',"win":'+tmpWin+',"od":'+_self.sceneFishes['fish_'+dat.fhId].fishPay+'}');		
	
delete _self.sceneFishes['fish_'+dat.fhId];	


	
}


	
}	
	
	


/*-----------free game coontrol-----------------*/


if(_self.gameData.freeInfo.count>=_self.gameData.freeInfo.index){
freeInfo=',"fi":{"c":'+_self.gameData.freeInfo.count+',"i":'+_self.gameData.freeInfo.index+'}';	
_self.gameData.freeInfo.freeWin+=totalWin;	

}

if(_self.gameData.freeInfo.count<=_self.gameData.freeInfo.index && _self.gameData.freeInfo.count>0){
	
var freeWinResponse='-121.{"kd":105,"ciId":1,"win":'+_self.gameData.freeInfo.freeWin+'}';	
_self.gameData.freeInfo.freeWin=0;	
_self.gameData.freeInfo.index=0;
_self.gameData.freeInfo.count=-1;
_self.gameData.slotState='';		
emitter.emit('outcomingMessage',freeWinResponse);		
}
/*-------------------------------------------------------*/

	
let endBalance=utils.FixNumber(startBalance-bet+totalWin);


let response;

if(totalWin>0){
	
await sys.SetBalance(totalWin);	
await sys.SetBank(-totalWin,'');	

}

if(winsArr.length>0){
 response='703.{"serialNo":"'+dat.serialNo+'","code":0,"ty":1,"win":'+totalWin+',"bal":'+endBalance+',"scBet":'+dat.bet+',"blId":"'+dat.blId+'","fhId":'+dat.fhId+',"fhes":['+winsArr.join(",")+']'+freeInfo+'}';	
}else{
 response='703.{"serialNo":"'+dat.serialNo+'","code":0,"ty":1,"win":'+totalWin+',"bal":'+endBalance+',"scBet":'+dat.bet+',"blId":"'+dat.blId+'","fhId":'+dat.fhId+''+freeInfo+'}';		
}






 sys.SaveLogReport({balance:endBalance,bet:dat.bet,win:totalWin});

await sys.Commit();		



emitter.emit('outcomingMessage',response);		



if(_self.gameData.freeInfo.count!=-1){

_self.gameData.freeInfo.index++;	
}






	
}

 this.FreeHitAccept = async function(dat)
{
	




let response='705.{"serialNo":"'+dat.serialNo+'","code":0,"win":0,"cnt":1}';
	
emitter.emit('outcomingMessage',response);		


	
}
 this.HitAccept = async function(dat)
{
	
	

let response='709.{"serialNo":"'+dat.serialNo+'","code":0,"pis":[]}';
	
emitter.emit('outcomingMessage',response);		
	
}


 this.EnterRoom = async function(dat)
{
	
/*-------init game data-------*/	

_self.gameData.slotState='';	
_self.gameData.freeInfo={count:-1,index:0};	
	
/*----------------*/

	
let balanceInCents=await sys.GetBalance();
_self.gameBalanceInCents=balanceInCents;

let response='701.{"serialNo":"'+dat.serialNo+'","code":0,"time":"2020-08-04 09:44:16","backHome":true,"di":{"bal":'+balanceInCents+',"rmId":"L1","dkId":2,"ciId":1,"st":1,"atId":1241064,"skId":2,"scId":1,"isSc":false,"mbs":15,"pis":[],"tms":[],"kis":[{"kd":0,"sp":200},{"kd":1,"sp":150},{"kd":2,"sp":180},{"kd":3,"sp":100},{"kd":4,"sp":100},{"kd":5,"sp":100},{"kd":6,"sp":70},{"kd":7,"sp":90},{"kd":8,"sp":80},{"kd":9,"sp":100},{"kd":10,"sp":70},{"kd":11,"sp":150},{"kd":12,"sp":100},{"kd":13,"sp":100},{"kd":14,"sp":100},{"kd":15,"sp":70},{"kd":16,"sp":70},{"kd":17,"sp":70},{"kd":18,"sp":70},{"kd":19,"sp":70},{"kd":20,"sp":70},{"kd":21,"sp":70},{"kd":100,"sp":70},{"kd":101,"sp":70},{"kd":102,"sp":70,"se":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]},{"kd":103,"sp":180},{"kd":104,"sp":60},{"kd":105,"sp":60},{"kd":106,"sp":70},{"kd":107,"sp":70}],"lscet":"2020-08-04 09:41:33"}}';
	
emitter.emit('outcomingMessage',response);		


////////////
_self.StartFishesUpdate();

	
}

this.GetSettings = async function(dat)
{

let gameSettings=await sys.GetSettings();
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


let response='700.{"serialNo":"'+dat.serialNo+'","code":0,"gameCode":"F-SF02","ris":[{"id":"L1","dm":[[0.01],[0.05,0.10],[0.20,0.30,0.40],[0.50,0.60],[0.70,0.80],[0.90,1.00]],"ddm":0.01},{"id":"L2","dm":[[0.10,0.20,0.30,0.40,0.50],[0.60,0.70,0.80,0.90,1.00],[2],[3],[4],[5]],"ddm":0.10},{"id":"L3","dm":[[1.00,2.00],[3.00,4.00],[5.00,6.00],[7.00,8.00],[9],[10]],"ddm":1.00}]}';
	
emitter.emit('outcomingMessage',response);		
	
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


_self.gameCommand=data.gameData.t;
_self.gameCode=data.gameData.gameCode;



switch(_self.gameCommand){
	
case 99999:

 _self.Init(0); 

break;

case 1:

 _self.Init(1); 

break;		

case 6:

 _self.Ping(data.gameData); 

break;

case 708:

 _self.ExitRoom(data.gameData); 

break;

case 700:

 _self.GetSettings(data.gameData); 

break;

case 701:

 _self.EnterRoom(data.gameData); 

break;

case 702:

 _self.Fire(data.gameData); 

break;

case 703:

 await  _self.Hit(data.gameData); 

break;

case 704:

 await   _self.MassHit(data.gameData); 

break;

case 709:

 await  _self.HitAccept(data.gameData); 

break;

case 705:

 _self.FreeHitAccept(data.gameData); 

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
