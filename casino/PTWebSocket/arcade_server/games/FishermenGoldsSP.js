
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


var fs = require('fs');

_self.fishRoutes=JSON.parse(fs.readFileSync('./arcade_server/games/SPRoutes.json', 'utf8'));

_self.gameData={};

/*---------- fishes paytable ------------*/

var fishPay=[];

fishPay['Fish_1']=[1,1];
fishPay['Fish_2']=[2,2];
fishPay['Fish_3']=[3,3];
fishPay['Fish_4']=[5,5];
fishPay['Fish_5']=[6,6];
fishPay['Fish_6']=[7,7];
fishPay['Fish_7']=[10,10];
fishPay['Fish_8']=[14,14];
fishPay['Fish_9']=[17,17];
fishPay['Fish_10']=[25,25];
fishPay['Fish_11']=[30,30];
fishPay['Fish_12']=[40,40];
fishPay['Fish_13']=[50,50];
fishPay['Fish_14']=[75,75];
fishPay['Fish_15']=[100,100];
fishPay['Fish_16']=[175,175];
fishPay['Fish_17']=[175,175];
fishPay['Fish_18']=[175,175];
fishPay['Fish_19']=[250,250];
fishPay['Fish_20']=[250,250];
fishPay['Fish_21']=[250,250];
fishPay['Fish_22']=[400,400];
fishPay['Fish_23']=[400,400];
fishPay['Fish_24']=[400,400];
fishPay['Fish_25']=[500,500];
fishPay['Fish_26']=[500,500];
fishPay['Fish_27']=[500,500];
fishPay['Fish_28']=[750,750];
fishPay['Fish_29']=[750,750];
fishPay['Fish_30']=[750,750];


var fishDamage=[];

fishDamage['Fish_1']=[1,2];
fishDamage['Fish_2']=[1,3];
fishDamage['Fish_3']=[1,3];
fishDamage['Fish_4']=[1,5];
fishDamage['Fish_5']=[1,6];
fishDamage['Fish_6']=[1,7];
fishDamage['Fish_7']=[2,12];
fishDamage['Fish_8']=[3,15];
fishDamage['Fish_9']=[4,18];
fishDamage['Fish_10']=[5,25];
fishDamage['Fish_11']=[5,30];
fishDamage['Fish_12']=[10,40];
fishDamage['Fish_13']=[10,50];
fishDamage['Fish_14']=[10,75];
fishDamage['Fish_15']=[10,100];
fishDamage['Fish_16']=[10,175];
fishDamage['Fish_17']=[10,175];
fishDamage['Fish_18']=[10,175];
fishDamage['Fish_19']=[20,250];
fishDamage['Fish_20']=[20,250];
fishDamage['Fish_21']=[1,2];
fishDamage['Fish_22']=[1,2];
fishDamage['Fish_23']=[30,400];
fishDamage['Fish_24']=[30,400];
fishDamage['Fish_25']=[40,500];
fishDamage['Fish_26']=[40,500];
fishDamage['Fish_27']=[40,500];
fishDamage['Fish_28']=[40,750];
fishDamage['Fish_29']=[40,750];
fishDamage['Fish_30']=[40,750];

/*----------control fishes on scene------------*/

_self.fishesId=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,13,13,13,13,13,13,13,13,13,13,13,13,13,13,14,14,14,14,14,14,14,14,14,14,14,14,14,15,15,15,15];



_self.fishesId=utils.ShuffleArray(_self.fishesId);

_self.fishesId_=0;

this.FishesUpdate=function(){
	
var fDirectArr=['leftToRight','rightToLeft','upToDown','downToUp'];	
var fDirect=fDirectArr[utils.RandomInt(0,3)];	

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
	
_self.fishRoutes=JSON.parse(fs.readFileSync('./arcade_server/games/SPRoutes.json', 'utf8'));


var curFishId=_self.fishesId[utils.RandomInt(0,_self.fishesId.length-1)];
var curFishUID=utils.RandomInt(1,1000000);	
var curTime  = new Date();


	
	
	
var curRoute=_self.fishRoutes[utils.RandomInt(0,_self.fishRoutes.length-1)]['Object'][0];

var fishPreset0='{"Object":[{"coord":{"x":"'+curRoute.coord.x+'","y":"'+curRoute.coord.y+'"},"curpos":"-0.200000","inst_id":"'+curFishUID+'","species":"'+curFishId+'","state":"1","timestamp":"'+curTime.getTime()+'","transform":['+curRoute.transform.join(',')+']}],"action":"73"}';	


var fishPreset1='{"action" : "74","inst_id" : "'+curFishUID+'"}';	
	
	
	
var cFishHealth=utils.RandomInt(fishDamage['Fish_'+curFishId][0],fishDamage['Fish_'+curFishId][1]);	

var cFishPay=utils.RandomInt(fishPay['Fish_'+curFishId][0],fishPay['Fish_'+curFishId][1]);	
	

	
_self.sceneFishes['fish_'+curFishUID]={fishId:curFishId,fishHealth:cFishHealth,fishPay:cFishPay,fishTime:curTime.getTime()};	

	
	
	
	
emitter.emit('outcomingMessage',fishPreset0);		
emitter.emit('outcomingMessage',fishPreset1);		
	
_self.fishesId_++;	


if(_self.fishesId_>300){
_self.fishesId_=0;	
var rfb='{"action" : "76","background" : "1","next_bg" : "2","timestamp" : "'+curTime.getTime()+'"}';	
emitter.emit('outcomingMessage',rfb);		
_self.sceneFishes=[];
}
	
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



 this.Init = async function(step,dat)
{


var balanceInCents,response;

switch(step){
	
case 0:

await sys.CreateConnection();	

_self.GetSettings();

balanceInCents=await sys.GetBalance();
_self.gameBalanceInCents=balanceInCents*100;

response='{   "account_id" : "'+sys.userName+'",   "action" : "60",   "balance" : "'+_self.gameBalanceInCents+'",   "code" : "200",   "denom_range" : [ 10, 50, 50, 500, 100, 1000, 0, 0, 0, 0, 0, 0 ],   "denomination" : "100",   "free_bullet" : "0",   "multiplier" : "1",   "multiplier_list" : [ 1, 2, 3, 5, 10 ],   "result" : "1",   "session_id" : "ce94c6b0-d571-11ea-8211-dab88abf32ff",   "status" : "0",   "user_id" : "10166"}';

break;

case 1:

response='{"action" : "88", "result" : "1","wallet_balance" : "0.000000"}';

break;

}


emitter.emit('outcomingMessage',response);	

};


 this.Resume = async function(dat)
{

await sys.CreateConnection();	

_self.GetSettings();

balanceInCents=await sys.GetBalance();
_self.gameBalanceInCents=balanceInCents*100;

response='{   "account_id" : "'+sys.userName+'",   "action" : "60",   "balance" : "'+_self.gameBalanceInCents+'",   "code" : "200",   "denom_range" : [ 10, 50, 50, 500, 100, 1000, 0, 0, 0, 0, 0, 0 ],   "denomination" : "100",   "free_bullet" : "0",   "multiplier" : "1",   "multiplier_list" : [ 1, 2, 3, 5, 10 ],   "result" : "1",   "session_id" : "ce94c6b0-d571-11ea-8211-dab88abf32ff",   "status" : "0",   "user_id" : "10166"}';
emitter.emit('outcomingMessage',response);		
	
}

 this.Ping = async function(dat)
{

var curTime  = new Date();	
	
var response='{"action" : "96","now" : "'+Math.round(curTime.getTime()/100)+'","timestamp" : "'+curTime.getTime()+'"}';	
emitter.emit('outcomingMessage',response);		
	
}


 this.ExitRoom = async function(dat)
{

var response0='{"action" : "72","player_id" : "0"}';
var response1='{ "action" : "82","result" : "1"}';
	
emitter.emit('outcomingMessage',response0);		
emitter.emit('outcomingMessage',response1);		
	
}

 this.SetMultiplier = async function(dat)
{

_self.gameData.CurrentMpl=dat['value']

var response0='{"action" : "80", "player" : "2","result" : "1", "value" : "'+_self.gameData.CurrentMpl+'"}';

	
emitter.emit('outcomingMessage',response0);		
	
	
}
 this.SetDenomination = async function(dat)
{

_self.gameData.CurrentBet=dat['value']

var response0='{"action" : "79","player" : "2","result" : "1","value" : "'+_self.gameData.CurrentBet+'"}';

	
emitter.emit('outcomingMessage',response0);		
	
	
}

 this.Fire = async function(dat)
{
	
	
	
var curTime  = new Date();	


var bid=utils.RandomInt(1,9999999);

_self.sceneBullets['bullet_'+bid]=[_self.gameData.CurrentBet,_self.gameData.CurrentMpl];


if(dat['target_id']!=undefined){

var response='{   "action" : "70",   "bullet" : {      "balance" : "'+_self.gameBalanceInCents+'",      "coord" : {          "x" : "1.483134",         "y" : "0.921284"      },      "cost" : "'+(_self.gameData.CurrentBet*_self.gameData.CurrentMpl)+'",      "denomination" : "'+_self.gameData.CurrentBet+'",      "free_bullet" : "0",      "head_to" : "'+dat['heading']+'",      "id" : "'+bid+'",      "multiplier" : "'+_self.gameData.CurrentMpl+'", "player_id" : "2",      "rebound" : {         "x" : "-0.204000",         "y" : "0.0"      },      "speed" : "1.000000",      "target_id" : "'+dat['target_id']+'",      "timestamp" : "'+curTime.getTime()+'"   },   "result" : "1"}';
	
}else{
	
var response='{   "action" : "70",   "bullet" : {      "balance" : "'+_self.gameBalanceInCents+'",      "coord" : {         "x" : "1.483134",         "y" : "0.921284"      },      "cost" : "'+(_self.gameData.CurrentBet*_self.gameData.CurrentMpl)+'",      "denomination" : "'+_self.gameData.CurrentBet+'",      "free_bullet" : "0",      "head_to" : "'+dat['heading']+'",      "id" : "'+bid+'",      "multiplier" : "'+_self.gameData.CurrentMpl+'", "player_id" : "2",      "rebound" : {         "x" : "0.000000",         "y" : "0.0"      },      "speed" : "1.000000",      "target_id" : "'+dat['target_id']+'",      "timestamp" : "'+curTime.getTime()+'"   },   "result" : "1"}';
	
}
	
emitter.emit('outcomingMessage',response);		
	
}





/*-----------simple hit--------------*/
 this.Hit = async function(dat)
{
	

	
var curTime  = new Date();	
	
for(var cf in _self.sceneFishes){

if(curTime.getTime()-_self.sceneFishes[cf].fishTime>=80000){
	
delete _self.sceneFishes[cf];	
	
}	



}	
	
if(_self.sceneBullets['bullet_'+dat['bid']]!=undefined){

var bet=(_self.sceneBullets['bullet_'+dat['bid']][0]*_self.sceneBullets['bullet_'+dat['bid']][1])/100;

delete _self.sceneBullets['bullet_'+dat['bid']];
	
}	else {
	
var bet=(_self.gameData.CurrentBet*_self.gameData.CurrentMpl)/100;	
	
}

	

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
var freeInfo='';
var fishPay=0;
/*-----------------------------*/	

var gameBank=await sys.GetBank();	

if(_self.sceneFishes['fish_'+dat['inst_id']]!=undefined){
_self.sceneFishes['fish_'+dat['inst_id']].fishHealth--;
var  tmpWin=_self.sceneFishes['fish_'+dat['inst_id']].fishPay*bet;

/*-----------------------------*/	



fishPay=_self.sceneFishes['fish_'+dat['inst_id']].fishPay;


if(_self.sceneFishes['fish_'+dat['inst_id']].fishHealth<=0 && tmpWin<=gameBank){

totalWin=tmpWin;
winsArr.push('{"uid":'+dat['inst_id']+',"score":'+Math.round(tmpWin*100)+',"rate":'+_self.sceneFishes['fish_'+dat['inst_id']].fishPay+',"ext":0}');		
delete _self.sceneFishes['fish_'+dat['inst_id']];	


	
}


	
}	
	
	



	
var endBalance=startBalance-bet+totalWin;


var response;

if(totalWin>0){
	
await sys.SetBalance(totalWin);	
await sys.SetBank(-totalWin,'');	

 response='{   "action" : "75",   "balance" : "'+(endBalance*100)+'",   "bullet_id" : "'+dat['bid']+'",   "hitpoint" : {      "x" : "'+dat['cX']+'",      "y" : "'+dat['cY']+'"   },   "inst_id" : "'+dat['inst_id']+'",   "online" : "1",   "point_award" : "'+Math.round(totalWin*100)+'",   "point_multiply" : "'+fishPay+'",   "seat_id" : "2",   "timestamp" : "'+curTime.getTime()+'"}';	
emitter.emit('outcomingMessage',response);	

}











 await sys.Commit();	
 sys.SaveLogReport({balance:endBalance,bet:bet,win:totalWin});	



	








	
}

 this.FreeHitAccept = async function(dat)
{
	




var response='705.{"serialNo":"'+dat.serialNo+'","code":0,"win":0,"cnt":1}';
	
emitter.emit('outcomingMessage',response);		


	
}
 this.HitAccept = async function(dat)
{
	
	

var response='709.{"serialNo":"'+dat.serialNo+'","code":0,"pis":[]}';
	
emitter.emit('outcomingMessage',response);		
	
}


 this.DataRoom = async function(dat)
{
	
	var balanceInCents=await sys.GetBalance();
_self.gameBalanceInCents=balanceInCents*100;
	
var curTime  = new Date();		


if(dat['mode']==3){

	var response0='{"Object":[],"action":"69","background":"1","machine_id":"20004","player":[{"account_id":"'+sys.userName+'","balance":"'+_self.gameBalanceInCents+'","denomination":"'+_self.gameData.CurrentBet+'","free_bullet":"0","multiplier":"1","seat_id":2}],"stage_id":"673226195","status":"2","timestamp":"'+curTime.getTime()+'"}';	
var response1='{"action":"74","inst_id":"21359289"}';


emitter.emit('outcomingMessage',response0);	
emitter.emit('outcomingMessage',response1);	


}else if(dat['mode']==2 && dat['page']==0){

var response0='{"action":"69","background":"1","machine_id":"20005","player":[{"account_id":"'+sys.userName+'","balance":"199992","denomination":"'+_self.gameData.CurrentBet+'","free_bullet":"0","multiplier":"1","seat_id":2}],"species":[{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.700000","sine":"0.200000","t0":"-0.200000","t1":"0.600000","t2":"-0.100000","tc":"0.350000","ts":"0.630000"},"y":{"cosine":"0.400000","sine":"0.200000","t0":"-0.100000","t1":"0.050000","t2":"0.050000","tc":"0.600000","ts":"0.150000"}},"proxy":{"height":"0.020000","type":"box","width":"0.060000"},"size":"0.050000","species":"1","speed":"0.150000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.220000","sine":"0.060000","t0":"-0.500000","t1":"0.260000","t2":"0.050000","tc":"0.250000","ts":"0.100000"},"y":{"cosine":"0.070000","sine":"0.750000","t0":"0.000000","t1":"0.110000","t2":"0.020000","tc":"-0.100000","ts":"0.180000"}},"proxy":{"height":"0.025000","type":"box","width":"0.070000"},"size":"0.050000","species":"2","speed":"0.200000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.610000","sine":"0.240000","t0":"-0.100000","t1":"0.360000","t2":"0.050000","tc":"0.100000","ts":"0.430000"},"y":{"cosine":"0.170000","sine":"0.610000","t0":"0.200000","t1":"0.110000","t2":"0.050000","tc":"0.090000","ts":"0.380000"}},"proxy":{"height":"0.030000","type":"box","width":"0.070000"},"size":"0.050000","species":"3","speed":"0.150000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.000000","sine":"0.200000","t0":"0.120000","t1":"0.000000","t2":"0.040000","tc":"0.000000","ts":"0.430000"},"y":{"cosine":"0.400000","sine":"-0.200000","t0":"0.200000","t1":"0.000000","t2":"0.010000","tc":"0.100000","ts":"-0.430000"}},"proxy":{"height":"0.030000","type":"box","width":"0.090000"},"size":"0.050000","species":"4","speed":"0.250000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.190000","sine":"0.110000","t0":"0.000000","t1":"0.150000","t2":"0.030000","tc":"-0.430000","ts":"0.140000"},"y":{"cosine":"0.210000","sine":"0.160000","t0":"0.300000","t1":"-0.060000","t2":"0.050000","tc":"0.330000","ts":"0.130000"}},"proxy":{"height":"0.040000","type":"box","width":"0.100000"},"size":"0.050000","species":"5","speed":"0.150000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.000000","sine":"0.000000","t0":"0.000000","t1":"0.150000","t2":"0.000000","tc":"0.000000","ts":"0.000000"},"y":{"cosine":"0.000000","sine":"0.130000","t0":"0.000000","t1":"0.070000","t2":"0.000000","tc":"0.000000","ts":"0.110000"}},"proxy":{"height":"0.040000","type":"box","width":"0.100000"},"size":"0.050000","species":"6","speed":"0.500000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.140000","sine":"0.000000","t0":"1.700000","t1":"-0.100000","t2":"0.000000","tc":"0.200000","ts":"0.000000"},"y":{"cosine":"0.000000","sine":"0.250000","t0":"0.000000","t1":"0.100000","t2":"0.000000","tc":"0.000000","ts":"0.400000"}},"proxy":{"height":"0.040000","type":"box","width":"0.100000"},"size":"0.050000","species":"7","speed":"0.300000","type_id":"1"},{"disp_offset":{"x":"0.010000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.100000","sine":"0.260000","t0":"-0.200000","t1":"0.000000","t2":"0.000000","tc":"0.300000","ts":"0.210000"},"y":{"cosine":"0.000000","sine":"0.000000","t0":"-0.200000","t1":"0.090000","t2":"0.020000","tc":"0.000000","ts":"0.000000"}},"proxy":{"radius":"0.040000","type":"single"},"size":"0.050000","species":"8","speed":"0.200000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.000000","sine":"0.050000","t0":"0.000000","t1":"0.420000","t2":"0.000000","tc":"0.000000","ts":"0.050000"},"y":{"cosine":"0.000000","sine":"0.000000","t0":"0.430000","t1":"0.000000","t2":"0.020000","tc":"0.000000","ts":"0.000000"}},"proxy":{"radius":"0.050000","type":"single"},"size":"0.050000","species":"9","speed":"0.150000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.000000","sine":"0.780000","t0":"0.000000","t1":"0.500000","t2":"0.000000","tc":"0.000000","ts":"0.110000"},"y":{"cosine":"0.000000","sine":"0.200000","t0":"0.380000","t1":"0.000000","t2":"0.000000","tc":"0.000000","ts":"0.200000"}},"proxy":{"radius":"0.040000","type":"single"},"size":"0.050000","species":"10","speed":"0.150000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.100000","sine":"0.370000","t0":"-0.500000","t1":"0.810000","t2":"0.000000","tc":"0.830000","ts":"0.960000"},"y":{"cosine":"0.290000","sine":"0.000000","t0":"0.400000","t1":"-0.190000","t2":"0.010000","tc":"0.130000","ts":"0.000000"}},"proxy":{"radius":"0.060000","type":"single"},"size":"0.050000","species":"11","speed":"0.050000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.050000","sine":"0.000000","t0":"-0.250000","t1":"0.000000","t2":"0.030000","tc":"0.200000","ts":"0.000000"},"y":{"cosine":"0.000000","sine":"0.200000","t0":"-0.200000","t1":"0.000000","t2":"0.020000","tc":"0.000000","ts":"0.200000"}},"proxy":{"height":"0.050000","type":"box","width":"0.350000"},"size":"0.050000","species":"12","speed":"0.200000","type_id":"1"},{"disp_offset":{"x":"0.025000","y":"0.000000"},"path":{"end":{"x":"2.000000","y":"0.500000"},"start":{"x":"-0.800000","y":"0.500000"},"type":"linear"},"proxy":{"height":"0.100000","type":"box","width":"0.100000"},"size":"0.050000","species":"13","speed":"0.040000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.000000","sine":"0.060000","t0":"0.000000","t1":"0.500000","t2":"0.000000","tc":"0.000000","ts":"0.200000"},"y":{"cosine":"0.140000","sine":"0.000000","t0":"0.600000","t1":"0.000000","t2":"0.000000","tc":"-0.190000","ts":"0.000000"}},"proxy":{"height":"0.070000","type":"box","width":"0.250000"},"size":"0.050000","species":"14","speed":"0.150000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.000000","sine":"0.120000","t0":"-0.200000","t1":"0.000000","t2":"0.040000","tc":"0.000000","ts":"0.130000"},"y":{"cosine":"0.130000","sine":"0.000000","t0":"0.500000","t1":"0.000000","t2":"0.000000","tc":"-0.140000","ts":"0.000000"}},"proxy":{"height":"0.050000","type":"box","width":"0.200000"},"size":"0.050000","species":"15","speed":"0.250000","type_id":"1"},{"disp_offset":{"x":"0.030000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.300000","sine":"0.000000","t0":"-0.300000","t1":"0.500000","t2":"0.000000","tc":"0.200000","ts":"0.000000"},"y":{"cosine":"0.000000","sine":"0.230000","t0":"0.300000","t1":"0.000000","t2":"0.000000","tc":"0.000000","ts":"0.170000"}},"proxy":{"height":"0.100000","type":"box","width":"0.100000"},"size":"0.050000","species":"16","speed":"0.150000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.000000","sine":"0.000000","t0":"0.000000","t1":"0.800000","t2":"0.000000","tc":"0.000000","ts":"0.000000"},"y":{"cosine":"0.300000","sine":"0.000000","t0":"0.000000","t1":"0.400000","t2":"0.000000","tc":"0.400000","ts":"0.000000"}},"proxy":{"height":"0.060000","type":"box","width":"0.350000"},"size":"0.050000","species":"17","speed":"0.100000","type_id":"1"},{"disp_offset":{"x":"0.050000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.000000","sine":"0.000000","t0":"0.000000","t1":"0.200000","t2":"0.000000","tc":"0.000000","ts":"0.000000"},"y":{"cosine":"0.100000","sine":"0.000000","t0":"0.000000","t1":"0.100000","t2":"0.000000","tc":"0.600000","ts":"0.000000"}},"proxy":{"height":"0.080000","type":"box","width":"0.250000"},"size":"0.050000","species":"18","speed":"0.200000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"end":{"x":"2.000000","y":"0.700000"},"start":{"x":"-0.700000","y":"0.200000"},"type":"linear"},"proxy":{"height":"0.100000","type":"box","width":"0.400000"},"size":"0.050000","species":"19","speed":"0.024000","type_id":"1"},{"disp_offset":{"x":"0.030000","y":"0.000000"},"path":{"end":{"x":"2.700000","y":"0.500000"},"start":{"x":"-1.000000","y":"0.500000"},"type":"linear"},"proxy":{"height":"0.120000","type":"box","width":"0.400000"},"size":"0.050000","species":"20","speed":"0.006000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.780000","sine":"0.320000","t0":"0.000000","t1":"0.150000","t2":"0.030000","tc":"-0.430000","ts":"0.140000"},"y":{"cosine":"0.480000","sine":"0.160000","t0":"0.300000","t1":"-0.060000","t2":"0.050000","tc":"0.330000","ts":"0.130000"}},"proxy":{"height":"0.020000","type":"box","width":"0.060000"},"size":"0.050000","species":"21","speed":"0.150000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.280000","sine":"0.090000","t0":"-0.300000","t1":"0.320000","t2":"0.030000","tc":"0.130000","ts":"0.140000"},"y":{"cosine":"0.520000","sine":"0.160000","t0":"0.190000","t1":"0.060000","t2":"0.050000","tc":"0.230000","ts":"0.130000"}},"proxy":{"height":"0.020000","type":"box","width":"0.060000"},"size":"0.050000","species":"22","speed":"0.150000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.120000","sine":"0.060000","t0":"-0.500000","t1":"0.210000","t2":"0.050000","tc":"0.250000","ts":"0.100000"},"y":{"cosine":"0.070000","sine":"0.360000","t0":"0.000000","t1":"0.010000","t2":"0.020000","tc":"0.100000","ts":"0.180000"}},"proxy":{"height":"0.025000","type":"box","width":"0.070000"},"size":"0.050000","species":"23","speed":"0.200000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.520000","sine":"0.960000","t0":"-0.200000","t1":"0.710000","t2":"0.050000","tc":"0.250000","ts":"0.100000"},"y":{"cosine":"0.910000","sine":"0.360000","t0":"0.000000","t1":"0.110000","t2":"0.020000","tc":"0.100000","ts":"0.280000"}},"proxy":{"height":"0.025000","type":"box","width":"0.070000"},"size":"0.050000","species":"24","speed":"0.100000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.780000","sine":"0.230000","t0":"-0.050000","t1":"0.360000","t2":"0.050000","tc":"0.650000","ts":"0.100000"},"y":{"cosine":"0.170000","sine":"0.390000","t0":"-0.200000","t1":"0.140000","t2":"0.050000","tc":"0.270000","ts":"0.530000"}},"proxy":{"height":"0.030000","type":"box","width":"0.070000"},"size":"0.050000","species":"25","speed":"0.050000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.050000","sine":"0.130000","t0":"-0.050000","t1":"0.130000","t2":"0.010000","tc":"0.010000","ts":"0.390000"},"y":{"cosine":"0.190000","sine":"0.230000","t0":"0.100000","t1":"0.080000","t2":"0.020000","tc":"0.100000","ts":"0.230000"}},"proxy":{"height":"0.030000","type":"box","width":"0.070000"},"size":"0.050000","species":"26","speed":"0.200000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.000000","sine":"0.200000","t0":"0.120000","t1":"0.050000","t2":"0.040000","tc":"0.000000","ts":"0.430000"},"y":{"cosine":"0.260000","sine":"-0.600000","t0":"0.400000","t1":"0.000000","t2":"0.010000","tc":"0.100000","ts":"-0.130000"}},"proxy":{"height":"0.030000","type":"box","width":"0.090000"},"size":"0.050000","species":"27","speed":"0.300000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.190000","sine":"0.110000","t0":"0.000000","t1":"0.150000","t2":"0.030000","tc":"-0.430000","ts":"0.140000"},"y":{"cosine":"0.210000","sine":"0.160000","t0":"0.300000","t1":"-0.060000","t2":"0.050000","tc":"0.330000","ts":"0.130000"}},"proxy":{"height":"0.040000","type":"box","width":"0.100000"},"size":"0.050000","species":"28","speed":"0.150000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.670000","sine":"0.170000","t0":"0.000000","t1":"0.350000","t2":"0.010000","tc":"0.030000","ts":"0.490000"},"y":{"cosine":"0.120000","sine":"0.370000","t0":"0.000000","t1":"0.070000","t2":"0.000000","tc":"0.340000","ts":"0.110000"}},"proxy":{"height":"0.040000","type":"box","width":"0.100000"},"size":"0.050000","species":"29","speed":"0.150000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.230000","sine":"0.090000","t0":"0.000000","t1":"0.100000","t2":"0.020000","tc":"-0.130000","ts":"0.610000"},"y":{"cosine":"0.690000","sine":"0.150000","t0":"0.000000","t1":"0.100000","t2":"0.000000","tc":"0.020000","ts":"0.140000"}},"proxy":{"height":"0.040000","type":"box","width":"0.100000"},"size":"0.050000","species":"30","speed":"0.200000","type_id":"1"}],"species_count":"43","species_page":"0","stage_id":"673225579","status":"2","timestamp":"'+curTime.getTime()+'"}';

emitter.emit('outcomingMessage',response0);	

}else if(dat['mode']==2 && dat['page']==1){

	var response0='{"action":"69","background":"1","machine_id":"20005","player":[{"account_id":"'+sys.userName+'","balance":"'+_self.gameBalanceInCents+'","denomination":"'+_self.gameData.CurrentBet+'","free_bullet":"0","multiplier":"1","seat_id":3}],"species":[{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.000000","sine":"0.000000","t0":"0.000000","t1":"0.500000","t2":"0.000000","tc":"0.000000","ts":"0.000000"},"y":{"cosine":"1.000000","sine":"0.000000","t0":"0.500000","t1":"0.000000","t2":"0.000000","tc":"0.050000","ts":"0.000000"}},"proxy":{"height":"0.020000","type":"box","width":"0.060000"},"size":"0.050000","species":"31","speed":"0.300000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.000000","sine":"0.000000","t0":"0.000000","t1":"0.600000","t2":"0.000000","tc":"0.000000","ts":"0.000000"},"y":{"cosine":"0.100000","sine":"0.000000","t0":"0.750000","t1":"0.000000","t2":"0.000000","tc":"0.000000","ts":"0.000000"}},"proxy":{"height":"0.025000","type":"box","width":"0.070000"},"size":"0.050000","species":"32","speed":"0.300000","type_id":"1"},{"disp_offset":{"x":"0.050000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.000000","sine":"0.000000","t0":"0.000000","t1":"0.500000","t2":"0.000000","tc":"0.000000","ts":"0.000000"},"y":{"cosine":"0.000000","sine":"0.000000","t0":"0.500000","t1":"0.000000","t2":"0.000000","tc":"0.000000","ts":"0.000000"}},"proxy":{"height":"0.080000","type":"box","width":"0.250000"},"size":"0.050000","species":"33","speed":"0.250000","type_id":"1"},{"disp_offset":{"x":"0.030000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.300000","sine":"0.000000","t0":"-0.300000","t1":"0.500000","t2":"0.000000","tc":"0.200000","ts":"0.000000"},"y":{"cosine":"0.000000","sine":"0.230000","t0":"0.300000","t1":"0.000000","t2":"0.000000","tc":"0.000000","ts":"0.170000"}},"proxy":{"height":"0.060000","type":"box","width":"0.400000"},"size":"0.050000","species":"34","speed":"0.150000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.000000","sine":"0.000000","t0":"0.000000","t1":"0.800000","t2":"0.000000","tc":"0.000000","ts":"0.000000"},"y":{"cosine":"0.300000","sine":"0.000000","t0":"0.000000","t1":"0.400000","t2":"0.000000","tc":"0.400000","ts":"0.000000"}},"proxy":{"height":"0.060000","type":"box","width":"0.350000"},"size":"0.050000","species":"35","speed":"0.100000","type_id":"1"},{"disp_offset":{"x":"0.050000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.000000","sine":"0.000000","t0":"0.000000","t1":"0.200000","t2":"0.000000","tc":"0.000000","ts":"0.000000"},"y":{"cosine":"0.100000","sine":"0.000000","t0":"0.000000","t1":"0.100000","t2":"0.000000","tc":"0.600000","ts":"0.000000"}},"proxy":{"height":"0.060000","type":"box","width":"0.400000"},"size":"0.050000","species":"36","speed":"0.200000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"end":{"x":"2.000000","y":"0.700000"},"start":{"x":"-0.700000","y":"0.200000"},"type":"linear"},"proxy":{"height":"0.100000","type":"box","width":"0.400000"},"size":"0.050000","species":"37","speed":"0.024000","type_id":"1"},{"disp_offset":{"x":"0.030000","y":"0.000000"},"path":{"end":{"x":"2.700000","y":"0.500000"},"start":{"x":"-1.000000","y":"0.500000"},"type":"linear"},"proxy":{"height":"0.120000","type":"box","width":"0.500000"},"size":"0.050000","species":"38","speed":"0.006000","type_id":"1"},{"disp_offset":{"x":"0.100000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.300000","sine":"0.000000","t0":"-0.300000","t1":"0.500000","t2":"0.000000","tc":"0.200000","ts":"0.000000"},"y":{"cosine":"0.000000","sine":"0.230000","t0":"0.300000","t1":"0.000000","t2":"0.000000","tc":"0.000000","ts":"0.170000"}},"proxy":{"height":"0.100000","type":"box","width":"0.100000"},"size":"0.050000","species":"39","speed":"0.150000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.000000","sine":"0.000000","t0":"0.000000","t1":"0.800000","t2":"0.000000","tc":"0.000000","ts":"0.000000"},"y":{"cosine":"0.300000","sine":"0.000000","t0":"0.000000","t1":"0.400000","t2":"0.000000","tc":"0.400000","ts":"0.000000"}},"proxy":{"height":"0.120000","type":"box","width":"0.300000"},"size":"0.050000","species":"40","speed":"0.100000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"type":"locus","x":{"cosine":"0.000000","sine":"0.000000","t0":"0.000000","t1":"0.200000","t2":"0.000000","tc":"0.000000","ts":"0.000000"},"y":{"cosine":"0.100000","sine":"0.000000","t0":"0.000000","t1":"0.100000","t2":"0.000000","tc":"0.600000","ts":"0.000000"}},"proxy":{"height":"0.120000","type":"box","width":"0.550000"},"size":"0.050000","species":"41","speed":"0.200000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"end":{"x":"2.000000","y":"0.700000"},"start":{"x":"-0.700000","y":"0.200000"},"type":"linear"},"proxy":{"height":"0.100000","type":"box","width":"0.400000"},"size":"0.050000","species":"42","speed":"0.024000","type_id":"1"},{"disp_offset":{"x":"0.000000","y":"0.000000"},"path":{"end":{"x":"2.700000","y":"0.500000"},"start":{"x":"-1.000000","y":"0.500000"},"type":"linear"},"proxy":{"height":"0.120000","type":"box","width":"0.700000"},"size":"0.050000","species":"43","speed":"0.006000","type_id":"1"}],"species_count":"43","species_page":"1","stage_id":"673225579","status":"2","timestamp":"'+curTime.getTime()+'"}';

emitter.emit('outcomingMessage',response0);	

}

		
//emitter.emit('outcomingMessage',response1);		
	
};


 this.EnterRoom = async function(dat)
{
	
/*-------init game data-------*/	

_self.gameData.slotState='';	
_self.gameData.CurrentBet=10;	
_self.gameData.CurrentMpl=1;	
_self.gameData.DenomList=[10, 20, 30, 40, 50];

/*----------------*/
/*----------------*/


if(dat['scene_lv']==0){

_self.fishesId=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,13,13,13,13,13,13,13,13,13,13,13,13,13,13,14,14,14,14,14,14,14,14,14,14,14,14,14,15,15,15,15,16,17,18,19,20,16,17,18,19,20,16,17,18,19,20,16,17,18,19,20,16,17,18,19,20,16,17,18,19,20,16,17,18,19,20,16,17,18,19,20,16,17,18,19,20,16,17,18,19,20,16,17,18,19,20];

fishPay['Fish_16']=[175,175];
fishPay['Fish_17']=[250,250];
fishPay['Fish_18']=[400,400];
fishPay['Fish_19']=[500,500];
fishPay['Fish_20']=[750,750];

fishDamage['Fish_16']=[20,200];
fishDamage['Fish_17']=[30,200];
fishDamage['Fish_18']=[30,400];
fishDamage['Fish_19']=[30,500];
fishDamage['Fish_20']=[50,750];



_self.gameData.CurrentBet=10;
_self.gameData.CurrentMpl=1;
_self.gameData.DenomList=[10, 20, 30, 40, 50];

}
if(dat['scene_lv']==1){
	
	
	_self.fishesId=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,13,13,13,13,13,13,13,13,13,13,13,13,13,13,14,14,14,14,14,14,14,14,14,14,14,14,14,15,15,15,15,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,25,25,25,25,25,25];

fishPay['Fish_21']=[175,175];
fishPay['Fish_22']=[250,250];
fishPay['Fish_23']=[400,400];
fishPay['Fish_24']=[500,500];
fishPay['Fish_25']=[750,750];

fishDamage['Fish_21']=[20,200];
fishDamage['Fish_22']=[30,200];
fishDamage['Fish_23']=[30,400];
fishDamage['Fish_24']=[30,500];
fishDamage['Fish_25']=[50,750];
	

_self.gameData.CurrentBet=100;
_self.gameData.CurrentMpl= 1;


_self.gameData.DenomList=[100, 200, 300, 400, 500];

}
if(dat['scene_lv']==2){
	
	
	
		_self.fishesId=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,13,13,13,13,13,13,13,13,13,13,13,13,13,13,14,14,14,14,14,14,14,14,14,14,14,14,14,15,15,15,15,26,27,28,29,30];

fishPay['Fish_26']=[175,175];
fishPay['Fish_27']=[250,250];
fishPay['Fish_28']=[400,400];
fishPay['Fish_29']=[500,500];
fishPay['Fish_30']=[750,750];

fishDamage['Fish_26']=[20,200];
fishDamage['Fish_27']=[30,200];
fishDamage['Fish_28']=[30,400];
fishDamage['Fish_29']=[30,500];
fishDamage['Fish_30']=[50,750];
	

_self.gameData.CurrentBet=1000;
_self.gameData.CurrentMpl=1;

_self.gameData.DenomList=[1000, 2000, 3000, 4000, 5000];

}





CurrentBet=_self.gameData.CurrentBet;
CurrentMpl=_self.gameData.CurrentMpl;
_self.gameData.Background= 1;
/*----------------*/
/*----------------*/

	
var balanceInCents=await sys.GetBalance();
_self.gameBalanceInCents=balanceInCents*100;




var response0='{   "account_id" : "'+sys.userName+'",   "action" : "71",   "balance" : "'+_self.gameBalanceInCents+'",   "denomination" : "'+_self.gameData.CurrentBet+'",   "free_bullet" : "0",   "multiplier" : "'+_self.gameData.CurrentMpl+'",   "player_id" : "2"}';
var response1='{   "account_id" : "'+sys.userName+'",   "action" : "67",   "background" : "'+_self.gameData.Background+'",   "denomina_list" : [ '+_self.gameData.DenomList.join(',')+' ],   "denomination" : "'+_self.gameData.CurrentBet+'",   "free_bullet" : "0",   "multiplier" : "'+_self.gameData.CurrentMpl+'",   "multiplier_list" : [ 1, 2, 3, 5, 10 ],   "next_denomination" : "1",   "result" : "1",   "scene_id" : "0",   "scene_level" : "0",   "seat_id" : "2"}';
	
emitter.emit('outcomingMessage',response0);		
emitter.emit('outcomingMessage',response1);		


////////////
_self.StartFishesUpdate();

	
}

this.GetSettings = async function()
{

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



	
}

 this.IncomingDataHandler = async function(data)
{


var pTmp=data.gameData.split("&");
var incParam=[];
for(var cf=0; cf<pTmp.length; cf++){
	
var tcf	= pTmp[cf].split("=");
	
if(tcf[1]!=undefined){

incParam[tcf[0]]=tcf[1];
	
}	

	
}

_self.gameCommand=incParam['action'];




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



var pTmp=data.gameData.split("&");
var incParam=[];
for(var cf=0; cf<pTmp.length; cf++){
	
var tcf	= pTmp[cf].split("=");
	
if(tcf[1]!=undefined){

incParam[tcf[0]]=tcf[1];
	
}	

	
}

_self.gameCommand=incParam['action'];

//console.log('command ::: '+data.gameData);

switch(_self.gameCommand){


case 'account_register':

 _self.Init(0,incParam); 

break;

case 'account_fund_enquiry':

 _self.Init(1,incParam); 

break;
case 'account_attack':

 _self.Fire(incParam); 

break;

case 'account_set_multiplier':

 _self.SetMultiplier(incParam); 

break;
case 'account_set_denomination':

 _self.SetDenomination(incParam); 

break;
case 'peer_time_sync':

 _self.Ping(incParam); 

break;
case 'account_join_lobby':

 _self.EnterRoom(incParam); 

break;
case 'account_leave_lobby':

 _self.ExitRoom(incParam); 

break;

case 'account_get_scene_data':

 _self.DataRoom(incParam); 

break;



case 'hit':

 await  _self.Hit(incParam); 

break;
case 'resumeconnection':

 _self.Resume(incParam); 

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
