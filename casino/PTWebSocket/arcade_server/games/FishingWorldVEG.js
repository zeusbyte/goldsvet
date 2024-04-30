
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

fishPay['Fish_1'] = [40,40];
fishPay['Fish_2'] = [15,15];
fishPay['Fish_3'] = [2,2];
fishPay['Fish_4'] = [100,300];
fishPay['Fish_5'] = [7,7];
fishPay['Fish_6'] = [10,10];
fishPay['Fish_7'] = [3,3];
fishPay['Fish_8'] = [30,30];
fishPay['Fish_9'] = [60,60];
fishPay['Fish_10'] = [6,6];
fishPay['Fish_11'] = [5,5];
fishPay['Fish_12'] = [20,20];
fishPay['Fish_13'] = [5,5];
fishPay['Fish_14'] = [20,20];
fishPay['Fish_15'] = [4,4];
fishPay['Fish_16'] = [12,12];
fishPay['Fish_17'] = [30,30];
fishPay['Fish_18'] = [50,50];
fishPay['Fish_19'] = [9,9];
fishPay['Fish_20'] = [18,18];
fishPay['Fish_21'] = [20,20];
fishPay['Fish_22'] = [15,15];
fishPay['Fish_23'] = [0,0];
fishPay['Fish_24'] = [0,0];
fishPay['Fish_25'] = [80,80];
fishPay['Fish_26'] = [50,50];
fishPay['Fish_27'] = [30,30];
fishPay['Fish_28'] = [30,30];
fishPay['Fish_29'] = [0,0];
fishPay['Fish_30'] = [300,1000];



var fishDamage=[];

fishDamage['Fish_1'] = [5,30];
fishDamage['Fish_2'] = [2,8];
fishDamage['Fish_3'] = [1,3];
fishDamage['Fish_4'] = [5,50];
fishDamage['Fish_5'] = [1,5];
fishDamage['Fish_6'] = [2,8];
fishDamage['Fish_7'] = [1,3];
fishDamage['Fish_8'] = [3,15];
fishDamage['Fish_9'] = [5,40];
fishDamage['Fish_10'] = [1,4];
fishDamage['Fish_11'] = [1,3];
fishDamage['Fish_12'] = [2,8];
fishDamage['Fish_13'] = [1,4];
fishDamage['Fish_14'] = [3,10];
fishDamage['Fish_15'] = [1,3];
fishDamage['Fish_16'] = [2,8];
fishDamage['Fish_17'] = [4,18];
fishDamage['Fish_18'] = [5,25];
fishDamage['Fish_19'] = [1,5];
fishDamage['Fish_20'] = [3,10];
fishDamage['Fish_21'] = [4,12];
fishDamage['Fish_22'] = [3,10];
fishDamage['Fish_23'] = [0];
fishDamage['Fish_24'] = [0];
fishDamage['Fish_25'] = [10,60];
fishDamage['Fish_26'] = [10,35];
fishDamage['Fish_27'] = [5,20];
fishDamage['Fish_28'] = [5,20];
fishDamage['Fish_29'] = [0,0];
fishDamage['Fish_30'] = [25,300];

/*----------control fishes on scene------------*/

_self.fishesId=[3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,2,8,9,12,14,17,18,20,21,22,23,25,26,1,27,28,30,4,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,2,8,9,12,14,17,18,20,21,22,23,25,26,1,27,28,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,2,8,9,12,14,17,18,20,21,22,23,25,26,1,27,28,30,4,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,2,8,9,12,14,17,18,20,21,22,23,25,26,1,27,28,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,2,8,9,12,14,17,18,20,21,22,23,25,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,3,5,7,10,11,13,15,19,2,6,16,2,8,9,12,14,17,18,20,21,22,23,25];

_self.fishesId=utils.ShuffleArray(_self.fishesId);

_self.fishesId_=0;

this.FishesUpdate=function(){
	
var fDirectArr=['leftToRight','rightToLeft','upToDown','downToUp'];	
var fDirect=fDirectArr[utils.RandomInt(0,3)];	

//fDirect='leftToRight';

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



var curFishId=_self.fishesId[utils.RandomInt(0,_self.fishesId.length-1)];
var curFishUID=utils.RandomInt(1,1000000);	
var curTime  = new Date();

/*
if(_self.fishesId_==20){
	curFishId=104;
}
*/

var curFishId_=curFishId;

if(curFishId<10){
curFishId='0'+curFishId;	
}
	
	
	
var fishPreset='{"code":200,"data":{"code":"new_fish_msg","data":[{"id":"100'+curFishId+'","aniID":100'+curFishId+',"uuid":"'+curFishUID+'","routeArray":[[{"_x":'+routeSet.startX+',"_y":'+routeSet.startY+'},{"_x":'+routeSet.midX+',"_y":'+routeSet.midY+'},{"_x":'+routeSet.mid2X+',"_y":'+routeSet.mid2Y+'},{"_x":'+routeSet.endX+',"_y":'+routeSet.endY+'}]],"speed":1.2,"birthTime":'+curTime.getTime()+',"type":0,"isFishArray":false,"multiple":40}]}}';	
	
var cFishHealth=utils.RandomInt(fishDamage['Fish_'+curFishId_][0],fishDamage['Fish_'+curFishId_][1]);	

var cFishPay=utils.RandomInt(fishPay['Fish_'+curFishId_][0],fishPay['Fish_'+curFishId_][1]);	

	
_self.sceneFishes['fish_'+curFishUID]={fishId:curFishId_,fishHealth:cFishHealth,fishPay:cFishPay,fishTime:curTime.getTime()};	

	
	
	
	
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



 this.Hshake = async function(dat)
{


var balanceInCents,response;


await sys.CreateConnection();	

let curTime  = new Date();	

response='{"id":'+dat.id+',"router":"room.handshake","code":200,"data":{"player":{"id":386882,"account":"BJ0021956936","agent":"sgg","website":"","agentType":"newgg","trial":0,"uuid":"80a7de61-33ce-1d3d-421e-638a05c286fd","nickname":"'+sys.userName+'","balance":0,"language":"en_US","currency":"USD","country":"zh-CN","roomId":null,"roomUUID":"202008022158165150493602","battery":0,"batteryLevel":0,"lockFishUUID":null,"isFree":false,"freeStartTime":0,"isRage":false,"rageStartTime":0,"isDouble":false,"doubleStartTime":0,"allConsume":410,"allAward":420,"asset":10,"happyTimeArray":{"novice":{"roomType":"novice","count":0,"endTime":0,"rewardRateIndex":0,"isCanOpenHappyTime":false,"shellLevel":0},"elite":{"roomType":"elite","count":0,"endTime":0,"rewardRateIndex":0,"isCanOpenHappyTime":false,"shellLevel":0},"master":{"roomType":"master","count":0,"endTime":0,"rewardRateIndex":0,"isCanOpenHappyTime":false,"shellLevel":0},"legend":{"roomType":"legend","count":0,"endTime":0,"rewardRateIndex":0,"isCanOpenHappyTime":false,"shellLevel":0},"emperor":{"roomType":"emperor","count":0,"endTime":0,"rewardRateIndex":0,"isCanOpenHappyTime":false,"shellLevel":0},"god":{"roomType":"god","count":0,"endTime":0,"rewardRateIndex":0,"isCanOpenHappyTime":false,"shellLevel":0}},"machineCannonList":{"novice":{"roomType":"novice","count":0,"batteryLevel":0},"elite":{"roomType":"elite","count":0,"batteryLevel":0},"master":{"roomType":"master","count":0,"batteryLevel":0},"legend":{"roomType":"legend","count":0,"batteryLevel":0},"emperor":{"roomType":"emperor","count":0,"batteryLevel":0},"god":{"roomType":"god","count":0,"batteryLevel":0}},"isOpenBlackHole":false,"blackHoleFishPos":null,"isOpenWealthGod":false,"wealthGodInfo":{},"roomOwner":false,"items":{"novice":{"1000":0,"1001":0,"1002":0,"1003":0},"elite":{"1000":0,"1001":0,"1002":0,"1003":0},"master":{"1000":0,"1001":0,"1002":0,"1003":0},"legend":{"1000":0,"1001":0,"1002":0,"1003":0},"emperor":{"1000":0,"1001":0,"1002":0,"1003":0},"god":{"1000":0,"1001":0,"1002":0,"1003":0}},"lastSendShellTime":0,"oldBalance":0,"lastIp":"","origin":0,"sessionId":"ncjGAznFT6i0tjVZhRlUlOnfcCMs7+NI/remQo34wlx16Dh8UZ9VJTCEKT2ABxgn","sectionId":"202008030746105650086029","lastSummaryLogTime":0,"tempRoomType":"","lastFireTime":'+curTime.getTime()+',"roomConsume":{"novice":410},"walletType":1,"shellIndex":1,"sid":"202008030746105650086029100001"},"heartbeat":15}}';


emitter.emit('outcomingMessage',response);	

};


 this.Ping = async function(dat)
{

	
var response='{"id":'+dat.id+',"router":"room.heartBeat","code":200,"data":{}}';	
emitter.emit('outcomingMessage',response);		
	
}


 this.TransferBalance = async function(dat)
{
	
	
let balanceInCents=await sys.GetBalance();
_self.gameBalanceInCents=balanceInCents*100;

var response0='{"id":'+dat.id+',"router":"room.transferBalance","code":200,"data":{"balance":'+_self.gameBalanceInCents+'}}';
var response1='{"code":200,"data":{"code":"player_update","data":{"uuid":"80a7de61-33ce-1d3d-421e-638a05c286fd","battery":5,"balance":'+_self.gameBalanceInCents+',"roomId":"202008022158165150493602"}}}';

	
emitter.emit('outcomingMessage',response0);		
emitter.emit('outcomingMessage',response1);		
	
}

 this.QueryBalance = async function(dat)
{
	
	
let balanceInCents=await sys.GetBalance();
_self.gameBalanceInCents=balanceInCents*100;

let response='{"id":'+dat.id+',"router":"room.queryBalance","code":200,"data":{"balance":'+_self.gameBalanceInCents+'}}';
	
emitter.emit('outcomingMessage',response);		
	
}

 this.ExitRoom = async function(dat)
{
	
	
let balanceInCents=await sys.GetBalance();
_self.gameBalanceInCents=balanceInCents;

let response='{"id":'+dat.id+',"router":"room.quitRoom","code":200,"data":{"player":{"happyTimeArray":{"novice":{"_events":null,"roomType":"novice","count":0,"endTime":0,"rewardRateIndex":0,"isCanOpenHappyTime":false,"shellLevel":0},"elite":{"_events":null,"roomType":"elite","count":0,"endTime":0,"rewardRateIndex":0,"isCanOpenHappyTime":false,"shellLevel":0},"master":{"_events":null,"roomType":"master","count":0,"endTime":0,"rewardRateIndex":0,"isCanOpenHappyTime":false,"shellLevel":0},"legend":{"_events":null,"roomType":"legend","count":0,"endTime":0,"rewardRateIndex":0,"isCanOpenHappyTime":false,"shellLevel":0},"emperor":{"_events":null,"roomType":"emperor","count":0,"endTime":0,"rewardRateIndex":0,"isCanOpenHappyTime":false,"shellLevel":0},"god":{"_events":null,"roomType":"god","count":0,"endTime":0,"rewardRateIndex":0,"isCanOpenHappyTime":false,"shellLevel":0}}}}}';
	
emitter.emit('outcomingMessage',response);		
	
}

 this.Fire = async function(dat)
{
	
	
let balanceInCents=_self.gameBalanceInCents;

let response='{"id":'+dat.id+',"router":"room.fire","code":200,"data":{"pay":true,"isFree":false,"machineCannonInfo":null,"shellUUID":"'+utils.RandomInt(1,900000)+'"}}';
	
emitter.emit('outcomingMessage',response);		
	
}


 this.ChangeBet = async function(dat)
{
	
	
let balanceInCents=_self.gameBalanceInCents;



 
CurrentBet=_self.gameData.CurrentBet;
batteryLevel=_self.gameData.batteryLevel;
CurrentRoom=_self.gameData.CurrentRoom;

/////////////////////////


batteryLevel=dat['data']['level'];



if(CurrentRoom=="novice"){
	
bets=[10,20,50,100];	
	
}else if(CurrentRoom=="elite"){
bets=[100,200,500,1000];		
}else if(CurrentRoom=="master"){
bets=[200,400,1000,2000];		
}else if(CurrentRoom=="legend"){
bets=[1000,2000,5000,10000];		
}else if(CurrentRoom=="emperor"){
bets=[5000,10000,25000,50000];		
}else if(CurrentRoom=="god"){
bets=[10000,20000,50000,100000];	
}



CurrentBet=bets[batteryLevel];

var response='{"id":'+dat['id']+',"router":"room.changeBatteryLevel","code":200,"data":{"code":"player_update","data":{"uuid":"80a7de61-33ce-1d3d-421e-638a05c286fd","battery":5,"batteryLevel":'+batteryLevel+',"roomId":"202008022158165150493602"},"playerUUIDArray":["7df26088-8fc2-2760-c9b7-0244e4182fdb","38f76004-55c2-779b-7ca2-4389246cfeaa","dac7171d-c0ea-3bc8-fc13-0fdec1ace5bc"],"player":{"uuid":"80a7de61-33ce-1d3d-421e-638a05c286fd","battery":5,"batteryLevel":'+batteryLevel+',"roomId":"202008022158165150493602"}}}';


_self.gameData.CurrentBet=CurrentBet;
_self.gameData.batteryLevel=batteryLevel;





	
emitter.emit('outcomingMessage',response);		
	
}





/*-----------simple hit--------------*/

/*-----------simple hit--------------*/
 this.Hit = async function(dat)
{
	

	
let curTime  = new Date();	
	
for(var cf in _self.sceneFishes){

if(curTime.getTime()-_self.sceneFishes[cf].fishTime>=30000){
	
delete _self.sceneFishes[cf];	
	
}	



}	
	

	
let bet=_self.gameData.CurrentBet/100;
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
var winsArr2=[];
var freeInfo='';
/*-----------------------------*/	

var targetFishes=dat.data.fishUUIDs;
var gameBank=await sys.GetBank();	

for(let fi=0; fi<targetFishes.length; fi++){

var cfish=targetFishes[fi];

if(_self.sceneFishes['fish_'+cfish]!=undefined){

_self.sceneFishes['fish_'+cfish].fishHealth--;

var  tmpWin=_self.sceneFishes['fish_'+cfish].fishPay*bet;

/*-----------------------------*/	



//disable mass attack in free

if(_self.gameData.slotState=='freegame' && (_self.sceneFishes['fish_'+cfish].fishId==104 || _self.sceneFishes['fish_'+cfish].fishId==105  || _self.sceneFishes['fish_'+cfish].fishId==101   || _self.sceneFishes['fish_'+cfish].fishId==100) ){
_self.sceneFishes['fish_'+cfish].fishHealth=1;	
}


if(_self.sceneFishes['fish_'+cfish].fishHealth<=0 && (tmpWin+totalWin)<=gameBank){


totalWin+=tmpWin;
	
winsArr.push('"'+cfish+'":{"reward":'+(Math.round(tmpWin*100))+'}');		
winsArr2.push('"'+cfish+'"');		
	
delete _self.sceneFishes['fish_'+cfish];	


	
}


	
}	
	
}


/*-----------free game coontrol-----------------*/


if(_self.gameData.freeInfo.count>=_self.gameData.freeInfo.index){
freeInfo=',"fi":{"c":'+_self.gameData.freeInfo.count+',"i":'+_self.gameData.freeInfo.index+'}';	
_self.gameData.freeInfo.freeWin+=totalWin;	

}

if(_self.gameData.freeInfo.count<=_self.gameData.freeInfo.index){
	
var freeWinResponse='-121.{"kd":100,"ciId":1,"win":'+_self.gameData.freeInfo.freeWin+'}';	
_self.gameData.freeInfo.freeWin=0;	
_self.gameData.freeInfo.index=0;
_self.gameData.freeInfo.count=-1;
_self.gameData.slotState='';		
emitter.emit('outcomingMessage',freeWinResponse);		
}
/*-------------------------------------------------------*/

	
let endBalance=startBalance-bet+totalWin;
_self.gameBalanceInCents=endBalance;

let response;

if(totalWin>0){
	
await sys.SetBalance(totalWin);	
await sys.SetBank(-totalWin,'');	

}

 response='{"id":'+dat.id+',"router":"room.hit","code":200,"data":{"deadFishUUIDArray":['+winsArr2.join(',')+'],"deadFishRewardArray":{'+winsArr.join(',')+'},"balance":'+(endBalance*100)+'}}';		








 await sys.Commit();	
 sys.SaveLogReport({balance:endBalance,bet:bet,win:totalWin});	



emitter.emit('outcomingMessage',response);		



if(_self.gameData.freeInfo.count!=-1){

_self.gameData.freeInfo.index++;	
}






	
};

 this.EnterRoom = async function(dat)
{
	


let response='{"id":'+dat.id+',"router":"room.checkEnterGame","code":200,"data":{}}';
	
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


/*-------init game data-------*/	

_self.gameData.slotState='';	
_self.gameData.freeInfo={count:-1,index:0};	
	
/*----------------*/


_self.gameData.CurrentRoom=dat.data.roomType;
_self.gameData.CurrentBet=10;
_self.gameData.batteryLevel=0;
/////////////////////////
var curTime  = new Date();


if(_self.gameData.CurrentRoom=="novice"){
	
_self.gameData.bets=[10,20,50,100];	
	
}else if(_self.gameData.CurrentRoom=="elite"){
_self.gameData.bets=[100,200,500,1000];		
}else if(_self.gameData.CurrentRoom=="master"){
_self.gameData.bets=[200,400,1000,2000];		
}else if(_self.gameData.CurrentRoom=="legend"){
_self.gameData.bets=[1000,2000,5000,10000];		
}else if(_self.gameData.CurrentRoom=="emperor"){
_self.gameData.bets=[5000,10000,25000,50000];		
}else if(_self.gameData.CurrentRoom=="god"){
_self.gameData.bets=[10000,20000,50000,100000];	
}

_self.gameData.CurrentBet=_self.gameData.bets[_self.gameData.batteryLevel];

var response0='{"code":200,"data":{"code":"player_enter_room","data":[{"userId":386882,"uuid":"80a7de61-33ce-1d3d-421e-638a05c286fd","nickname":"'+sys.userName+'","balance":0,"battery":4,"batteryLevel":0,"machineCannonInfo":{"_events":null,"roomType":"novice","count":0,"batteryLevel":0},"isOpenWealthGod":false}]}}';

var response1='{"id": '+dat.id+',"router": "room.requestEnterRoom", "code": 200,"data": {"bgIndex": 4,"playMusicList": { "0": 7},"bossEndTime": 0,"bossType": 0,"roomUUID": "202008022158165150493602","roomType": "novice","roundType": 1,"roundEndTime": '+(curTime.getTime()+20000)+', "iceItemEndTime": 1596430357, "batteryIndex": 4,"fishArray": []}}';







	
emitter.emit('outcomingMessage',response0);		
emitter.emit('outcomingMessage',response1);		
	
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


_self.gameCommand=data.gameData.router;




if(_self.gameCommand=='room.handshake'){
_self.gameCommand='handshake';	
}

switch(_self.gameCommand){
	
case 'room.hit':

await  _self.Hit(data.gameData); 

break;		

case 'handshake':

_self.Hshake(data.gameData); 

break;

case 'room.requestEnterRoom':

_self.GetSettings(data.gameData); 

break;	

case 'room.checkEnterGame':

_self.EnterRoom(data.gameData); 

break;	
case 'room.heartBeat':

_self.Ping(data.gameData); 

break;	

case 'room.queryBalance':

_self.QueryBalance(data.gameData); 

break;
case 'room.transferBalance':

_self.TransferBalance(data.gameData); 

break;	
case 'room.fire':

_self.Fire(data.gameData); 

break;		
case 'room.quitRoom':

_self.ExitRoom(data.gameData); 

break;		
case 'room.changeBatteryLevel':

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
