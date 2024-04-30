
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

var balanceInCents=await sys.GetBalance();
_self.gameBalanceInCents=balanceInCents;

response='42["init",{"gameSession":"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiIwIiwiaWQiOiJnYW1lczpjb250ZXh0OjE1MDpwbGF5ZXIxNTg5MTMzODk5MzQxOnN3X2Z1ZmlzaF9pbnR3Om1vYmlsZSIsImdhbWVNb2RlIjoiZnVuIiwiaWF0IjoxNTg5MTMzOTIwLCJpc3MiOiJza3l3aW5kZ3JvdXAifQ.7U9pc0abgmefSMTWYhhmWREN8bB0QsasvKhq5jzUldsBSHmgiY48qbzl7oGLVDpTDGwwX7eyJIng9rVsfM7uoQ","balance":{"currency":"","amount":'+balanceInCents+',"real":{"amount":'+balanceInCents+'},"bonus":{"amount":0}},"result":{"request":"init","player_id":"'+sys.userName+'","player_code":"'+sys.userName+'","player_name":"'+sys.userName+'","coins_rate":0.01,"settings":{"coinsRate":0.01,"defaultCoin":1,"coins":[1],"currencyMultiplier":100}},"gameSettings":{},"brandSettings":{"fullscreen":true},"roundEnded":true}]';

emitter.emit('outcomingMessage',response);		

};


 this.AttackBoss = async function(dat)
{


var response=[];

/*-----------------------*/
var fishPay=[];
var fishDamage=[];

fishPay['Air_0'] = utils.RandomInt(35,60);
fishPay['Air_1'] = utils.RandomInt(12,30);
fishPay['Air_2'] = utils.RandomInt(8,15);
fishPay['Air_3'] = utils.RandomInt(6,10);
fishPay['Air_4'] = utils.RandomInt(2,8);
fishPay['Air_5'] = 0;
fishPay['Air_6'] = 0;

fishDamage['Air_0'] = 50;
fishDamage['Air_1'] = 40;
fishDamage['Air_2'] = 20;
fishDamage['Air_3'] = 8;
fishDamage['Air_4'] = 5;
fishDamage['Air_5'] = 10;
fishDamage['Air_6'] = 50;


/*-----------------------*/

	
var requestId=dat[1]['requestId'];
var bulletId=dat[1]['bulletId'];
var allbet=dat[1]['bet'];
var item=dat[1]['item'];
var killed=[];
var totalWin=0;

		
var curTime  = new Date();	

/*--------------*/
if(sys.conn.connection._closing){
await sys.CreateConnection();	
}
/*-------------*/
await sys.StartTransaction();	




/*----------------------------------------*/
/*----------------------------------------*/

var startBalance=await sys.GetBalanceB();	
var bank= await sys.GetBank();
var allbet=parseFloat(allbet);
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

_self.gameData.AllBet=allbet;	

/*check bet balance & add to bank*/

var features='';


var Progress=_self.gameData.Progress;	
var World=_self.gameData.World;
var Mission=_self.gameData.Mission;	

var BossWin=_self.gameData.BossWin;	
var progressWin=_self.gameData.progressWin;	


	
var airType=item['target']['type'];	
var winChance=utils.RandomInt(1,fishDamage['Air_'+airType] );	




if(winChance==1){
	
progressWin=progressWin*100;
progressWin-=20;
progressWin=progressWin/100;	
BossWin-=utils.RandomInt(0,5)*allbet;	



if(progressWin<=0){
	
	

	
if(bank>=BossWin){
	
	totalWin=BossWin;
	killed.push('{"uid":'+item['target']['uid']+',"type":'+airType+',"payout":'+BossWin+'}');		
	}else{
		
BossWin=_self.gameData.BossWin;	
progressWin=_self.gameData.progressWin;		
		
	}
	
	
	
}

	
}


var endBalance=startBalance-allbet+totalWin;

/*-----------------------------------------*/	
	
_self.gameData.BossWin=BossWin;	
_self.gameData.progressWin=progressWin;	


if(progressWin<=0){

response.push('42["play",{"balance":{"currency":"","amount":'+endBalance+',"real":{"amount":'+endBalance+'},"bonus":{"amount":0}},"result":{"bulletId":'+bulletId+',"killed":['+killed.join(',')+'],"request":"attackBoss","totalBet":'+allbet+',"state":{"world":'+World+',"mode":"boss","mission":'+Mission+',"bet":'+allbet+',"progress":'+JSON.stringify(Progress)+',"features":[],"bossInfo":{"shootId":0,"win":'+BossWin+',"progressWin":'+progressWin+',"maxWin":'+BossWin+'}},"totalWin":'+BossWin+',"roundEnded":false},"requestId":'+requestId+',"roundEnded":false}]');	



}else{	
	
response.push('42["play",{"balance":{"currency":"","amount":'+endBalance+',"real":{"amount":'+endBalance+'},"bonus":{"amount":0}},"result":{"bulletId":'+bulletId+',"killed":['+killed.join(',')+'],"request":"attackBoss","totalBet":'+allbet+',"state":{"world":'+World+',"mode":"boss","mission":'+Mission+',"bet":'+allbet+',"progress":'+JSON.stringify(Progress)+',"features":[],"bossInfo":{"shootId":0,"win":0,"progressWin":'+progressWin+',"maxWin":'+BossWin+'}},"totalWin":0,"roundEnded":false},"requestId":'+requestId+',"roundEnded":false}]');	
	
	
}

sys.SessionStorage(sys.userId,sys.gameName,'progressWin',progressWin);
sys.SessionStorage(sys.userId,sys.gameName,'BossWin',BossWin);


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

 this.StartBoss = async function(dat)
{


var response;
var balanceInCents=await sys.GetBalance();
_self.gameBalanceInCents=balanceInCents;


/*-----------------------*/



var requestId=dat[1]['requestId'];

var allbet=_self.gameData.AllBet;	
var Progress=_self.gameData.Progress;	
var World=_self.gameData.World;
var Mission=_self.gameData.Mission;	



///////////////////
var progressWin=1;

if(World==0){
var BossWin=utils.RandomInt(50,300)*allbet;
}
if(World==1){
var BossWin=utils.RandomInt(50,350)*allbet;
}

if(World==2){
var BossWin=utils.RandomInt(50,500)*allbet;
}

if(World==3){
var BossWin=utils.RandomInt(50,750)*allbet;
}

if(World>=4){
var BossWin=utils.RandomInt(50,1000)*allbet;
}

_self.gameData.BossWin=BossWin;	
_self.gameData.progressWin=progressWin;	
//////////////////	
	
if(sys.SessionStorage(sys.userId,sys.gameName,'BossWin')!=undefined &&  sys.SessionStorage(sys.userId,sys.gameName,'progressWin')!=undefined){

_self.gameData.BossWin=sys.SessionStorage(sys.userId,sys.gameName,'BossWin');
_self.gameData.progressWin=sys.SessionStorage(sys.userId,sys.gameName,'progressWin');
BossWin=_self.gameData.BossWin;	
progressWin=_self.gameData.progressWin;	

}	
	
	
var response='42["play",{"balance":{"currency":"","amount":'+balanceInCents+',"real":{"amount":'+balanceInCents+'},"bonus":{"amount":0}},"result":{"request":"startBoss","state":{"world":'+World+',"mode":"boss","mission":'+Mission+',"bet":'+allbet+',"progress":'+JSON.stringify(Progress)+',"features":[],"bossInfo":{"shootId":0,"win":0,"progressWin":'+progressWin+',"maxWin":'+BossWin+'}},"totalWin":0,"roundEnded":false},"requestId":'+requestId+',"roundEnded":false}]';	



sys.SessionStorage(sys.userId,sys.gameName,'progressWin',progressWin);
sys.SessionStorage(sys.userId,sys.gameName,'BossWin',BossWin);

/*-----------------------*/
emitter.emit('outcomingMessage',response);		

};

 this.ExitRoom = async function(dat)
{


var response;
var balanceInCents=await sys.GetBalance();
_self.gameBalanceInCents=balanceInCents;



requestId=dat[1]['requestId'];

response='42["play",{"balance":{"currency":"","amount":'+balanceInCents+',"real":{"amount":'+balanceInCents+'},"bonus":{"amount":0}},"result":{"request":"exitRoom","totalBet":0,"totalWin":0,"roundEnded":true},"requestId":'+requestId+',"roundEnded":true}]';	


/*-----------------------*/
emitter.emit('outcomingMessage',response);		

};

 this.FinishBoss = async function(dat)
{


var response;
var balanceInCents=await sys.GetBalance();
_self.gameBalanceInCents=balanceInCents;


/*-----------------------*/

var requestId=dat[1]['requestId'];

var allbet=_self.gameData.AllBet;	
var Progress=_self.gameData.Progress;	
var World=_self.gameData.World;
var Mission=_self.gameData.Mission;	

Mission+=3;
World+=1;

Progress[0][0]=0;
Progress[0][1]+=2;
Progress[1][0]=0;
Progress[1][1]+=3;
Progress[2][0]=0;
Progress[2][1]+=4;
Progress[3][0]=0;
Progress[3][1]+=5;
Progress[4][0]=0;
Progress[4][1]+=6;





	
response='42["play",{"balance":{"currency":"","amount":'+balanceInCents+',"real":{"amount":'+balanceInCents+'},"bonus":{"amount":0}},"result":{"request":"finishBoss","state":{"world":'+World+',"mode":"game","mission":'+Mission+',"bet":'+allbet+',"progress":'+JSON.stringify(Progress)+',"features":[]},"totalWin":0,"roundEnded":false},"requestId":'+requestId+',"roundEnded":false}]';		
	
	
_self.gameData.Progress=Progress;
_self.gameData.World=World;
_self.gameData.Mission=Mission;	
sys.SessionStorage(sys.userId,sys.gameName,'Progress',Progress);
sys.SessionStorage(sys.userId,sys.gameName,'World',World);
sys.SessionStorage(sys.userId,sys.gameName,'Mission',Mission);


sys.SessionStorage(sys.userId,sys.gameName,'progressWin',undefined);
sys.SessionStorage(sys.userId,sys.gameName,'BossWin',undefined);

/*-----------------------*/
emitter.emit('outcomingMessage',response);		

};

 this.Balance = async function(dat)
{


var response;
var balanceInCents=await sys.GetBalance();
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






/*-----------fire and shot--------------*/
 this.Hit = async function(dat)
{
	


var fishPay=[];
var fishDamage=[];


		

fishPay['Air_0'] = utils.RandomInt(35,60);
fishPay['Air_1'] = utils.RandomInt(12,30);
fishPay['Air_2'] = utils.RandomInt(8,15);
fishPay['Air_3'] = utils.RandomInt(6,10);
fishPay['Air_4'] = utils.RandomInt(2,8);
fishPay['Air_5'] = 0;
fishPay['Air_6'] = 0;




fishDamage['Air_0'] = 50;
fishDamage['Air_1'] = 40;
fishDamage['Air_2'] = 20;
fishDamage['Air_3'] = 8;
fishDamage['Air_4'] = 5;
fishDamage['Air_5'] = 10;
fishDamage['Air_6'] = 50;


////////////////////

		
var curTime  = new Date();	

/*--------------*/
if(sys.conn.connection._closing){
await sys.CreateConnection();	
}
/*-------------*/
await sys.StartTransaction();	







/*-----fishes damage -----*/
/*--------------*/





var totalWin=0;
var response = [];
var requestId=dat[1]['requestId'];
var bulletId=dat[1]['bulletId'];
var allbet=dat[1]['bet'];
var item=dat[1]['item'];
var killed=[];
var bank=await sys.GetBank();


/*----------------------------------------*/
/*----------------------------------------*/

var startBalance=await sys.GetBalanceB();	
var allbet=parseFloat(allbet);
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

_self.gameData.AllBet=allbet;	

/*check bet balance & add to bank*/

var features='';


var Progress=_self.gameData.Progress;	
var World=_self.gameData.World;
var Mission=_self.gameData.Mission;	




if(item['mode']=='singleShot'){
	
var airType=item['target']['type'];	
var winChance=utils.RandomInt(1,fishDamage['Air_'+airType] );	

var mpl=1;

if(item['target']['m']!=undefined){
mpl=2;	
}

var tmpWin=fishPay['Air_'+airType]*allbet*mpl;	
	
	


	
if(bank>=tmpWin  && winChance==1){

if(item['target']['m']!=undefined){
killed.push('{"uid":'+item['target']['uid']+',"type":'+airType+',"payout":'+tmpWin+',"m":true}');	
}else{
killed.push('{"uid":'+item['target']['uid']+',"type":'+airType+',"payout":'+tmpWin+'}');		
}



totalWin+=tmpWin ;
	
Progress[airType][0]++;	
	
}	
	
	
	
}
///////////////////////
///////////////
///////
////////////
//////////////////////

if(item['mode']=='chainReactorShot'){
	
	
	
	
////////////////////	
var airType=item['target']['type'];	
winChance=utils.RandomInt(1,fishDamage['Air_'+airType] );	
tmpWin=fishDamage['Air_'+airType]*allbet;	

if( winChance==1){


killed.push('{"uid":'+item['target']['uid']+',"type":'+airType+',"payout":'+tmpWin+'}');		


totalWin+=tmpWin ;
	
Progress[airType][0]++;	
	

///////////////////////

for(i=0; i<item['hitItems'].length; i++){
	
/*------------*/	
airType=item['hitItems'][i]['type'];	
winChance=utils.RandomInt(1,fishDamage['Air_'+airType] );	
tmpWin=fishDamage['Air_'+airType]*allbet;	



killed.push('{"uid":'+item['hitItems'][i]['uid']+',"type":'+airType+',"payout":'+tmpWin+'}');		

totalWin+=tmpWin ;
	
Progress[airType][0]++;	
	

/*------------*/	
	
}


	


if(bank<totalWin){
var killed=[];
totalWin=0;	
Progress=_self.gameData.Progress;	
}	
//limit control

	
}
	
	
}

///////////////////////
///////////////
///////
////////////
//////////////////////

if(item['mode']=='bombShot'){
	
	
	
	
////////////////////	
airType=item['target']['type'];	
winChance=utils.RandomInt(1,fishDamage['Air_'+airType] );	
tmpWin=fishDamage['Air_'+airType]*allbet;	




if( winChance==1){


killed.push('{"uid":'+item['target']['uid']+',"type":'+airType+',"payout":0}');		


totalWin+=tmpWin ;
	

	

///////////////////////

for(i=0; i<item['hitItems'].length; i++){
	
/*------------*/	
airType=item['hitItems'][i]['type'];	
winChance=utils.RandomInt(1,fishDamage['Air_'+airType] );	
tmpWin=fishDamage['Air_'+airType]*allbet;	



killed.push('{"uid":'+item['hitItems'][i]['uid']+',"type":'+airType+',"payout":'+tmpWin+'}');		

totalWin+=tmpWin ;
	
Progress[airType][0]++;	
	

/*------------*/	
	
}



if(bank<totalWin){
killed=[];
totalWin=0;	
Progress=_self.gameData.Progress;	
}	
//limit control
	
	
}
	
	
}




features='';


if(Progress[0][0]>=Progress[0][1] && Progress[1][0]>=Progress[1][1] && Progress[2][0]>=Progress[2][1] && Progress[3][0]>=Progress[3][1]  && Progress[4][0]>=Progress[4][1]){

features='{"type":"boss"}';	
	
}





/*-------fire-----------*/
var endBalance=startBalance-allbet+totalWin;


response.push('42["play",{"balance":{"currency":"","amount":'+endBalance+',"real":{"amount":'+endBalance+'},"bonus":{"amount":0}},"result":{"bulletId":'+bulletId+',"killed":['+killed.join(',')+'],"request":"shot","totalBet":'+allbet+',"state":{"world":'+World+',"mode":"game","mission":'+Mission+',"bet":'+allbet+',"progress":'+JSON.stringify(Progress)+',"features":['+features+']},"totalWin":'+totalWin+',"roundEnded":false},"requestId":'+requestId+',"roundEnded":false}]');	
	

///////////////

_self.gameData.Progress=Progress;
_self.gameData.World=World;
_self.gameData.Mission=Mission;

sys.SessionStorage(sys.userId,sys.gameName,'Progress',Progress);
sys.SessionStorage(sys.userId,sys.gameName,'World',World);
sys.SessionStorage(sys.userId,sys.gameName,'Mission',Mission);


/*-----------------------*/
/*-----------------------*/


/*-------fire-----------*/
/*----------------------------------------------------*/





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

/*--------------------------------------------------------*/
/*--------------------------------------------------------*/


var requestId=dat[1].requestId;
var bet=dat[1].bet;

var features='';
var bossInfo='';
//features='{"type":"boss"}';
if(sys.SessionStorage(sys.userId,sys.gameName,'Progress')!=undefined && sys.SessionStorage(sys.userId,sys.gameName,'World')!=undefined && sys.SessionStorage(sys.userId,sys.gameName,'Mission')!=undefined){

_self.gameData.Progress=sys.SessionStorage(sys.userId,sys.gameName,'Progress');
_self.gameData.World=sys.SessionStorage(sys.userId,sys.gameName,'World');
_self.gameData.Mission=sys.SessionStorage(sys.userId,sys.gameName,'Mission');



//Start Boss 
if(_self.gameData.Progress[0][0]>=_self.gameData.Progress[0][1] && _self.gameData.Progress[1][0]>=_self.gameData.Progress[1][1] && _self.gameData.Progress[2][0]>=_self.gameData.Progress[2][1] && _self.gameData.Progress[3][0]>=_self.gameData.Progress[3][1]  && _self.gameData.Progress[4][0]>=_self.gameData.Progress[4][1]){

_self.gameData.AllBet=bet;




_self.gameData.BossWin=sys.SessionStorage(sys.userId,sys.gameName,'BossWin');
_self.gameData.progressWin=sys.SessionStorage(sys.userId,sys.gameName,'progressWin');
	

features='{"type":"boss"}';	
bossInfo=',"bossInfo":{"shootId":0,"win":0,"progressWin":'+_self.gameData.progressWin+',"maxWin":'+_self.gameData.BossWin+'}';

	
}




if(_self.gameData.Progress[0][0]>_self.gameData.Progress[0][1]){_self.gameData.Progress[0][0]=_self.gameData.Progress[0][1];}
if(_self.gameData.Progress[1][0]>_self.gameData.Progress[1][1]){_self.gameData.Progress[1][0]=_self.gameData.Progress[1][1];}
if(_self.gameData.Progress[2][0]>_self.gameData.Progress[2][1]){_self.gameData.Progress[2][0]=_self.gameData.Progress[2][1];}
if(_self.gameData.Progress[3][0]>_self.gameData.Progress[3][1]){_self.gameData.Progress[3][0]=_self.gameData.Progress[3][1];}
if(_self.gameData.Progress[4][0]>_self.gameData.Progress[4][1]){_self.gameData.Progress[4][0]=_self.gameData.Progress[4][1];}


	
}else{
	
_self.gameData.Progress=[[0,1],[0,4],[0,4],[0,4],[0,6]];
_self.gameData.World=0;
_self.gameData.Mission=0;		

sys.SessionStorage(sys.userId,sys.gameName,'Progress',_self.gameData.Progress);
sys.SessionStorage(sys.userId,sys.gameName,'World',_self.gameData.World);
sys.SessionStorage(sys.userId,sys.gameName,'Mission',_self.gameData.Mission);	
	
}
	

	
_self.gameData.bet=bet;






var response='42["play",{"balance":{"currency":"","amount":'+balanceInCents+',"real":{"amount":'+balanceInCents+'},"bonus":{"amount":0}},"result":{"request":"enterRoom","totalBet":'+bet+',"state":{"world":'+_self.gameData.World+',"mode":"game","mission":'+_self.gameData.Mission+',"bet":'+bet+',"progress":'+JSON.stringify(_self.gameData.Progress)+',"features":['+features+']'+bossInfo+'},"totalWin":0,"roundEnded":true},"requestId":'+requestId+',"roundEnded":false}]';







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

case 'exitRoom':

 _self.ExitRoom(data.gameData); 

break;	
case 'enterRoom':

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
case 'startBoss':

 _self.StartBoss(data.gameData); 

break;
case 'attackBoss':

 _self.AttackBoss(data.gameData); 

break;
case 'finishBoss':

 _self.FinishBoss(data.gameData); 

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
