
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


fishPay["Fish_21"]=10;
fishPay["Fish_0"]=0;
fishPay["Fish_22"]=8;
fishPay["Fish_20"]=10;
fishPay["Fish_07"]=40;
fishPay["Fish_29"]=2;
fishPay["Fish_08"]=30;
fishPay["Fish_05"]=70;
fishPay["Fish_27"]=4;
fishPay["Fish_06"]=40;
fishPay["Fish_28"]=3;
fishPay["Fish_03"]=90;
fishPay["Fish_25"]=5;
fishPay["Fish_04"]=80;
fishPay["Fish_26"]=4;
fishPay["Fish_01"]=10;
fishPay["Fish_23"]=8;
fishPay["Fish_02"]=100;
fishPay["Fish_24"]=6;
fishPay["Fish_09"]=30;
fishPay["Fish_10"]=25;
fishPay["Fish_32"]=4;
fishPay["Fish_11"]=25;
fishPay["Fish_33"]=2;
fishPay["Fish_30"]=3;
fishPay["Fish_31"]=2;
fishPay["Fish_18"]=12;
fishPay["Fish_19"]=12;
fishPay["Fish_16"]=16;
fishPay["Fish_17"]=14;
fishPay["Fish_14"]=18;
fishPay["Fish_15"]=16;
fishPay["Fish_12"]=20;
fishPay["Fish_34"]=3;
fishPay["Fish_13"]=20;
fishPay["Fish_35"]=2;
 

 
 









		
		
		
		
var fishDamage=[];

 fishDamage["Fish_0"]=[5,20];
 fishDamage["Fish_01"]=[5,20];
 fishDamage["Fish_02"]=[20,300];
 fishDamage["Fish_03"]=[20,200];
 fishDamage["Fish_04"]=[20,150];
 fishDamage["Fish_05"]=[15,100];
 fishDamage["Fish_06"]=[15,80];
 fishDamage["Fish_07"]=[10,60];
 fishDamage["Fish_08"]=[10,50];
 fishDamage["Fish_09"]=[10,45]; 
 fishDamage["Fish_10"]=[8,40];
 fishDamage["Fish_11"]=[5,35];
 fishDamage["Fish_12"]=[5,30];
 fishDamage["Fish_13"]=[5,30];
 fishDamage["Fish_14"]=[4,25];
 fishDamage["Fish_15"]=[4,20];
 fishDamage["Fish_16"]=[3,18];
 fishDamage["Fish_17"]=[3,15];
 fishDamage["Fish_18"]=[2,12];
 fishDamage["Fish_19"]=[2,10]; 
 fishDamage["Fish_20"]=[2,10]; 
 fishDamage["Fish_21"]=[1,8]; 
 fishDamage["Fish_22"]=[1,6];
 fishDamage["Fish_23"]=[1,5];
 fishDamage["Fish_24"]=[1,4]; 
 fishDamage["Fish_25"]=[1,3];
 fishDamage["Fish_26"]=[1,2];
 fishDamage["Fish_27"]=[1,2];
 fishDamage["Fish_28"]=[1,2];
 fishDamage["Fish_29"]=[1,2];
 fishDamage["Fish_30"]=[1,2];
 fishDamage["Fish_31"]=[1,2];
 fishDamage["Fish_32"]=[1,3];
 fishDamage["Fish_33"]=[1,3];
 fishDamage["Fish_34"]=[1,3];
 fishDamage["Fish_35"]=[1,3];




/*----------control fishes on scene------------*/


this.FishesUpdate=function(){

if(_self.PingRequest!=undefined){
 _self.Ping(_self.PingRequest); 	
}
	

};

this.StartFishesUpdate=function(){
_self.StopFishesUpdate();	
_self.fishesUpdateInterval=setInterval(_self.FishesUpdate,10000);	
	
};

this.StopFishesUpdate=function(){
	

clearInterval(_self.fishesUpdateInterval);
	
};
this.ClearGameData=function(){
	

clearInterval(_self.msgHandlerTicker);
clearInterval(_self.fishesUpdateInterval);
	
};



this.FormatAndSendMessage=function(jsnMsg,pAnswer,messageView){
	

for(var ac=0; ac<pAnswer.length; ac++){

try{

var pAnswerT=JSON.parse(pAnswer[ac]);
/*-----------*/	
}catch(e){
continue;
}

	

if(jsnMsg['action']=='areaFishControl.fishHandler.fetchFishInfo'){
	

	
var par0=pAnswerT['answerType'];
var par1=pAnswer[ac];




var adv_char='++';
 if(messageView[6]!=41){
var response=utils.EncodeMessage('+.....+'+par1);	
var adv_char='+.+';	
}else{
var response=utils.EncodeMessage('+....+'+par1);	
}
var responseView = new Int8Array(response);
var allDataMsg=(adv_char+par1);
var allDataMsgStr=utils.DecimalToHex(allDataMsg.length, 4);
responseView[0]=4;
responseView[1]=0;
responseView[2]=utils.HexToDecimal(allDataMsgStr[0]+allDataMsgStr[1]);
responseView[3]=utils.HexToDecimal(allDataMsgStr[2]+allDataMsgStr[3]);
responseView[4]=4;
responseView[5]=messageView[5];	
if(messageView[6]!=41){
responseView[6]=messageView[6];	
}


		
	
}else{
	
	

	
var par0=pAnswerT['answerType'];
var par1=pAnswer[ac];
var response=utils.EncodeMessage('+....+'+par0+par1);	
var responseView = new Int8Array(response);
var allDataMsg=('++'+par0+par1);
var allDataMsgStr=utils.DecimalToHex(allDataMsg.length, 4);

responseView[0]=4;
responseView[1]=0;
responseView[2]=utils.HexToDecimal(allDataMsgStr[0]+allDataMsgStr[1]);
responseView[3]=utils.HexToDecimal(allDataMsgStr[2]+allDataMsgStr[3]);
responseView[4]=pAnswerT['responseView'][4];
responseView[5]=pAnswerT['responseView'][5];	







	
}




emitter.emit('outcomingMessage',response);	



if(jsnMsg['action']=='playerControl.tableHandler.leaveTable'){
	

//var response=utils.EncodeMessage('+.....{"code":200}');	
var response=utils.EncodeMessage(' {"code":200,"type":2,"id":14}');	
var responseView = new Int8Array(response);
responseView[0]=4;
responseView[1]=0;
responseView[2]=0;
responseView[3]=14;
responseView[4]=4;
responseView[5]=messageView[5];	



emitter.emit('outcomingMessage',response);	

}

}

//////////////////////////
//////////////////////////


	
};


 this.Login = async function(dat)
{


var balanceInCents,response;

await sys.CreateConnection();	



var balanceInCents=await sys.GetBalance();



var response='{"responseView":[4,0,0,0,4,1],"answerType":"","data":{"nickName":"'+sys.userName+'","gender":1,"playerId":"accessKey|USD|'+sys.userName+'","twSSOId":"accessKey|USD|'+sys.userName+'","state":0,"role":0,"creditAmount":'+balanceInCents+',"creditCode":"USD","rmpCannonCost":[1,2,3,5,8,10,10,20,30,50,80,100,100,200,300,500,800,1000],"denom":0.01,"currencySymbol":"$","currencyFractionDigits":2,"currencySymbolInBack":false,"thousandGroupingSepartor":",","decimalSeparator":".","transactionBufferSize":5,"transactionBufferMilliseconds":1000,"rmpCredit":'+balanceInCents+',"roomLevel":0,"cannonLevel":0,"token":"72c4ab998854158b5ecf48c442b27353","recommendedGames":[],"openRecommendedGamesInNewWindow":false,"ip":"0.0.0.0","realIp":"0.0.0.0","gameId":"GoldenDragon","tableId":""},"code":200,"type":2,"id":1}';

_self.FormatAndSendMessage(dat,[response],dat.messageView);

};


 this.Info = async function(dat)
{


Bet=_self.gameData.Bet;	



//var response='{"data":{"scores":{"Fish_21":7,"Fish_00":0,"Fish_22":6,"Fish_20":8,"Fish_07":0,"Fish_29":2,"Fish_08":0,"Fish_05":0,"Fish_27":3,"Fish_06":0,"Fish_28":2,"Fish_03":0,"Fish_25":4,"Fish_04":0,"Fish_26":3,"Fish_01":0,"Fish_23":5,"Fish_02":0,"Fish_24":5,"Fish_09":60,"Fish_10":50,"Fish_11":40,"Fish_18":10,"Fish_19":9,"Fish_16":15,"Fish_17":12,"Fish_14":20,"Fish_15":18,"Fish_12":35,"Fish_13":30},"cannonCost":'+(Bet*100)+'},"code":200,"type":2,"id":142}';
var response='{"data":{"scores":{"Fish_21":10,"Fish_00":0,"Fish_22":8,"Fish_20":10,"Fish_07":40,"Fish_29":2,"Fish_08":30,"Fish_05":70,"Fish_27":4,"Fish_06":40,"Fish_28":3,"Fish_03":90,"Fish_25":5,"Fish_04":80,"Fish_26":4,"Fish_01":10,"Fish_23":8,"Fish_02":100,"Fish_24":6,"Fish_09":30,"Fish_10":25,"Fish_32":4,"Fish_11":25,"Fish_33":2,"Fish_30":3,"Fish_31":2,"Fish_18":12,"Fish_19":12,"Fish_16":16,"Fish_17":14,"Fish_14":18,"Fish_15":16,"Fish_12":20,"Fish_34":3,"Fish_13":20,"Fish_35":2},"cannonCost":'+(Bet*100)+'},"code":200,"type":2,"id":6}';

_self.FormatAndSendMessage(dat,[response],dat.messageView);	
	

	
}



 this.Ping = async function(dat)
{



bullets='';

Bet=_self.gameData.Bet;	
BetCnt=_self.gameData.BetCnt;	
BetArr=_self.gameData.BetArr;	
BetLevel=_self.gameData.BetLevel;	

var curTime  = new Date();	
var balanceInCents=_self.gameBalanceInCents*100;

var result_tmp=[];

if( _self.gameData.GamePause > curTime.getTime() ){
	
	
result_tmp[0]='{"answerType":"game.fire","responseView":[4,0,0,0,6,'+String('game.fire').length+'],"msg":{"player":{"nickName":"'+sys.userName+'","gender":1,"avatarUrl":"","gameServerId":"player-server-3","connectorId":"connector-server-3","teamId":"","gameId":"10007","tableId":"0AB57DB3C77E99746D9E0AE0BF896412","gameState":"playing","id":"9dab0ea6-0cb0-4b8c-951a-e10077945f2b","areaId":"0AB57DB3C77E99746D9E0AE0BF896412","gold":100,"delta":'+(Bet*100)+',"gain":0,"cost":'+(Bet*100)+',"ratio":1,"rmpRatioCredit":'+balanceInCents+',"denom":0.01},"areaPlayer":{"id":"13879583b6558342be4b011cf849ee29989667afd2eb4c993a7f06371e78a2d4","areaId":"0AB57DB3C77E99746D9E0AE0BF896412","playerId":"d607e29f-99cc-48bc-a37d-5590b80fa0f6","cannonLevel":'+BetCnt+',"cannonCost":'+(Bet*100)+',"cannonMaxLen":18,"skin":1,"lockTargetId":0,"chairId":2}'+bullets+'}}';

	
	
}else{

_self.gameData.GamePause=curTime.getTime();		
	
}




/*------      NEW WAVE    -------*/
if(curTime.getTime()-_self.gameData.WaveTime>=_self.gameData.WaveTimeLimit ){

_self.gameData.Fishes=[];	

curScene=_self.gameData.CurScene;

curScene++;

if(curScene>=3){
curScene=0;	
}

result_tmp[0]='{"answerType":"game.changeScene","responseView":[4,0,0,0,6,'+String('game.changeScene').length+'],"msg":{"scene":'+curScene+'}}'; //WAVE

_self.gameData.WaveTime=curTime.getTime();	
_self.gameData.CurScene=curScene;
_self.gameData.IsGroupFish=utils.RandomInt(0,10);
	
if(_self.gameData.IsGroupFish==1){
_self.gameData.WaveTimeLimit=60000;	
}else{
_self.gameData.WaveTimeLimit=120000;	
}	
	
	
}else{
	




result_tmp[0]='{"answerType":"game.fire","responseView":[4,0,0,0,6,'+String('game.fire').length+'],"msg":{"player":{"nickName":"'+sys.userName+'","gender":1,"avatarUrl":"","gameServerId":"player-server-3","connectorId":"connector-server-3","teamId":"","gameId":"10007","tableId":"0AB57DB3C77E99746D9E0AE0BF896412","gameState":"playing","id":"9dab0ea6-0cb0-4b8c-951a-e10077945f2b","areaId":"0AB57DB3C77E99746D9E0AE0BF896412","gold":100,"delta":'+(Bet*100)+',"gain":0,"cost":'+(Bet*100)+',"ratio":1,"rmpRatioCredit":'+balanceInCents+',"denom":0.01},"areaPlayer":{"id":"13879583b6558342be4b011cf849ee29989667afd2eb4c993a7f06371e78a2d4","areaId":"0AB57DB3C77E99746D9E0AE0BF896412","playerId":"d607e29f-99cc-48bc-a37d-5590b80fa0f6","cannonLevel":'+BetCnt+',"cannonCost":'+(Bet*100)+',"cannonMaxLen":18,"skin":1,"lockTargetId":0,"chairId":2}'+bullets+'}}';




fishesArr=[];

fishes=_self.gameData.Fishes;	

/*if(!is_array(fishes)){
fishes=[];	
}*/


if(_self.gameData.IsGroupFish != 1){
		
	
answerType='game.onSpawnFishes';	
gr='';	

rfish=utils.RandomInt(3,10);
for(i=0; i<rfish; i++){
	
sid=utils.RandomInt(1,99999999)	
fishViewArr=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35];
fishViewArr=utils.ShuffleArray(fishViewArr);
fishView=fishViewArr[0];	
	
state='solo';	
stateArr=['solo','solo','solo','solo','solo','solo','solo','solo','solo','solo','solo','solo','solo','bomb','flock','flock'];
stateArr=utils.ShuffleArray(stateArr);	
	
if(fishView>15){state=stateArr[0];}	
	
if(fishView<10){
fishView='0'+fishView;	
}		



fishes[sid]={fishView:"Fish_"+fishView,sid:sid,pay:fishPay["Fish_"+fishView],tl:curTime.getTime(),state:state};	
	
//fishesArr.push('{"areaId":"0AB57DB3C77E99746D9E0AE0BF896412","id":'+sid+',"type":"Fish_'+fishView+'","amount":1,"born":1584296702070,"alive":'+utils.RandomInt(5,10)+',"state":"'+state+'","path":"bezier_id_'+utils.RandomInt(1,22)+'","index":0,"score":1,"teamid":"none","_id":"70AB57DB3C77E99746D9E0AE0BF896412","expired":1584296782070}');	

fishesArr.push('{"areaId":"0AB57DB3C77E99746D9E0AE0BF896412","id":'+sid+',"type":"Fish_'+fishView+'","amount":40,"born":1608820243662,"alive":'+utils.RandomInt(5,10)+',"state":"solo","path":"'+utils.RandomInt(1,10)+'","index":0,"score":40,"teamid":"","_id":"2878D547D080B2F5FBC608047DA2BB7A","expired":1608820303662}');	
	
}



}else{
	



gr='"group":{"state":"group","group":"group_id_rtol","path":[],"seed":1584453624058,"alive":'+utils.RandomInt(5,10)+'},';
answerType='game.onSpawnGroup';	

rfish=80;
fishViewArr=[17,18,19,20,21,22,13,14,15,16,17,18,19,20,21,22,13,14,15,16,17,18,19,20,21,22];
fishViewArr=utils.ShuffleArray(fishViewArr);
for(i=0; i<rfish; i++){
	
sid=utils.RandomInt(1,999999999);	

fishView=fishViewArr[0];	
if(fishView<10){
fishView='0'+fishView;	
}		
fishes[sid]={fishView:"Fish_"+fishView,sid:sid,pay:fishPay["Fish_"+fishView],tl:curTime.getTime(),state:'group'};	
	
fishesArr.push('{"areaId":"0AB57DB3C77E99746D9E0AE0BF896412","id":'+sid+',"type":"Fish_'+fishView+'","amount":1,"born":1584296702070,"alive":'+utils.RandomInt(5,10)+',"state":"group","path":"bezier_group_B1","index":'+i+',"score":1,"teamid":"none","_id":"0AB57DB3C77E99746D9E0AE0BF8964121","expired":1584296782070}');	
	
}



rfish=54;
fishViewArr=[17,18,19,20,21,22,13,14,15,16,17,18,19,20,21,22,13,14,15,16,17,18,19,20,21,22];
fishViewArr=utils.ShuffleArray(fishViewArr);
for(i=0; i<rfish; i++){
	
	
	
sid=utils.RandomInt(1,999999);	

fishView=fishViewArr[0];	
if(fishView<10){
fishView='0'+fishView;	
}		
fishes[sid]={fishView:"Fish_"+fishView,sid:sid,pay:fishPay["Fish_"+fishView],tl:curTime.getTime()};	
	
fishesArr.push('{"areaId":"0AB57DB3C77E99746D9E0AE0BF896412","id":'+sid+',"type":"Fish_'+fishView+'","amount":1,"born":1584296702070,"alive":'+utils.RandomInt(5,10)+',"state":"group","path":"bezier_group_B2","index":'+i+',"score":1,"teamid":"none","_id":"0AB57DB3C77E99746D9E0AE0BF8964121","expired":1584296782070}');	
	


}


}



fishesArrNew=[];
for(var f in fishes ){
	
if(fishes[f]!=undefined){
	

if(curTime.getTime()-fishes[f]['tl']<20000){
fishesArrNew[f]=fishes[f];
}		
	
}


	
}



result_tmp[1]='{"answerType":"'+answerType+'","responseView":[4,0,0,0,6,'+String(answerType).length+'],"msg":{'+gr+'"fishes":['+fishesArr.join(',')+']}}';

_self.gameData.Fishes=fishesArrNew;	


}
	
if(result_tmp[1]!=undefined){
_self.FormatAndSendMessage(dat,[result_tmp[0],result_tmp[1]],dat.messageView);		
}else{
_self.FormatAndSendMessage(dat,[result_tmp[0]],dat.messageView);		
}	
	

	
};


 this.ExitRoom = async function(dat)
{

_self.StopFishesUpdate();	
	
var balanceInCents=_self.gameBalanceInCents;



var response0='{"answerType":"table.quit","responseView":[4,0,0,0,6,'+String('table.quit').length+'],"msg":{"table":{"_id":"0D1577E59238B91234F1F40550436EE8","name":"0D1577E59238B91234F1F40550436EE8","hostId":"host","serverId":"","recycle":false,"playerIds":["accessKey|USD|'+sys.userName+'",null,null,null],"chairIds":["accessKey|USD|'+sys.userName+'",null,null,null],"level":0},"players":[{"nickName":"'+sys.userName+'","gender":1,"teamId":"","gameState":"","id":"accessKey|USD|'+sys.userName+'","areaId":"0D1577E59238B91234F1F40550436EE8","gold":0,"delta":0,"gain":0,"cost":0,"ratio":0,"rmpRatioCredit":0,"denom":0.0}]},"route":"table.quit","id":0,"type":3}';



var response1='{"answerType":"game.quit","responseView":[4,0,0,0,6,'+String('game.quit').length+'],"msg":{"area":{"id":"0D1577E59238B91234F1F40550436EE8","scene":0,"state":"started","pauseTime":0,"stage":"normal"},"areaPlayers":[{"areaId":"0D1577E59238B91234F1F40550436EE8","playerId":"accessKey|USD|'+sys.userName+'","cannonLevel":0,"cannonCost":0,"cannonMaxLen":18,"skin":1,"lockTargetId":0,"chairId":0}],"players":[{"nickName":"'+sys.userName+'","gender":1,"gameServerid":"","conectorId":"","teamId":"","gameState":"playing","id":"accessKey|USD|'+sys.userName+'","areaId":"0D1577E59238B91234F1F40550436EE8","gold":'+(balanceInCents*100)+',"delta":0,"gain":0,"cost":1,"ratio":1,"rmpRatioCredit":'+(balanceInCents*100)+',"denom":0.01}]},"route":"game.quit","id":0,"type":3}';
	
	
_self.FormatAndSendMessage(dat,[response0,response1],dat.messageView);			
	
}

 this.Fire = async function(dat)
{
	
	
var balanceInCents=_self.gameBalanceInCents;

/*---------------------------------------------*/
/*---------------------------------------------*/

bulletsArr=_self.gameData.Bullets;	
bulletBet=_self.gameData.Bet;	
allbet=bulletBet;

Bet=_self.gameData.Bet;	
BetCnt=_self.gameData.BetCnt;	
BetArr=_self.gameData.BetArr;	
BetLevel=_self.gameData.BetLevel;	


bulletId=utils.RandomInt(1,99999999);

if(dat['query']['lockId']!=null){
var lockTargetId=dat['query']['lockId'];
}else{
var lockTargetId=0;	
}

if(balanceInCents<Bet){

bullets='';
	
}else{


bullets=',"bullet":{"transactionId":"","createTime":1608709290545,"areaId":"0AB57DB3C77E99746D9E0AE0BF896412","playerId":"accessKey|USD|'+sys.userName+'","bulletId":"'+bulletId+'","angle":'+dat['query']['angle']+',"cost":0,"lockTargetId":'+lockTargetId+',"chairId":0,"cannonlevel":0,"cannonskin":1,"level":0}';

}



var response0='{"answerType":"game.fire","responseView":[4,0,0,0,6,'+String('game.fire').length+'],"msg":{"player":{"nickName":"'+sys.userName+'","gender":1,"avatarUrl":"","gameServerId":"player-server-3","connectorId":"connector-server-3","teamId":"","gameId":"10007","tableId":"0AB57DB3C77E99746D9E0AE0BF896412","gameState":"playing","id":"0AB57DB3C77E99746D9E0AE0BF896412","areaId":"0AB57DB3C77E99746D9E0AE0BF896412","gold":100,"delta":'+bulletBet+',"gain":0,"cost":0,"ratio":1,"rmpRatioCredit":100,"denom":0.01},"areaPlayer":{"id":"accessKey|USD|'+sys.userName+'","areaId":"0AB57DB3C77E99746D9E0AE0BF896412","playerId":"d607e29f-99cc-48bc-a37d-5590b80fa0f6","cannonLevel":'+BetCnt+',"cannonCost":'+(Bet*100)+',"cannonMaxLen":18,"skin":1,"lockTargetId":'+lockTargetId+',"chairId":2}'+bullets+'}}';



var response1='{"answerType":"","responseView":[4,0,0,0,4,2],"data":{"bulletId":"'+bulletId+'","cannonlevel":0,"cannonskin":1,"balance":'+(balanceInCents*100)+',"roundRemaining":0},"code":200,"type":2,"id":6}';


/*---------------------------------------------*/
/*---------------------------------------------*/

_self.FormatAndSendMessage(dat,[response0,response1],dat.messageView);
	
};



 this.ChangeBet = async function(dat)
{
	
	
var balanceInCents=_self.gameBalanceInCents;

/*---------------------------------------------*/




Bet=_self.gameData.Bet;	
BetCnt=_self.gameData.BetCnt;	
BetArr=_self.gameData.BetArr;	
BetLevel=_self.gameData.BetLevel;	
cnLevel=_self.gameData.BetLevel*6;	

if(dat['query']['upgrade']){
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




var response='{"answerType":"game.updateCannon","Balance":'+balanceInCents+',"curBet":'+_self.gameData.Bet+',"responseView":[4,0,0,0,6,'+String('game.updateCannon').length+'],"msg":{"areaPlayer":{"areaId":"0AB57DB3C77E99746D9E0AE0BF896412","playerId":"accessKey|USD|'+sys.userName+'","cannonLevel":'+(BetCnt)+',"cannonCost":'+(Bet*100)+',"cannonMaxLen":18,"skin":1,"lockTargetId":0,"chairId":1}},"route":"game.updateCannon","id":0,"type":3}';





/*---------------------------------------------*/

_self.FormatAndSendMessage(dat,[response],dat.messageView);
	
};

/*-----------simple hit--------------*/
 this.Hit = async function(dat)
{

/*----------------------------*/

var curTime  = new Date();

var Bet=_self.gameData.Bet;	
var BetCnt=_self.gameData.BetCnt;	
var BetArr=_self.gameData.BetArr;	
var BetLevel=_self.gameData.BetLevel;	

var fid=dat['query'][0]['fid'];
var bid=dat['query'][0]['bid'];

var fishes=_self.gameData.Fishes;	
var bulletsArr=_self.gameData.Bullets;	
var allbet=_self.gameData.Bet;	




var die='false';
var results='';
var totalWin=0;
var pause='';

/*--------------------------*/
/*--------------*/
if(sys.conn.connection._closing){
await sys.CreateConnection();	
}
/*-------------*/
await sys.StartTransaction();	
var startBalance=await sys.GetBalanceB();	

var allbet=parseFloat(allbet);
if(startBalance<allbet || allbet<0.0001 || !Number.isFinite(allbet) ){
emitter.emit('Error','Invalid balance or bet');	
sys.Rollback();   	
return;	
}	



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

var bank=await sys.GetBank();	

/*--------------------------*/








if(BetLevel==0){
	
winRatio=100;	
	
}else if( BetLevel == 1){

winRatio=10;	
	
}else{

winRatio=1;
	
}





console.log(fishes[fid]);



if( fishes[fid]!=undefined ){


if(fishes[fid]['state']==undefined){
fishes[fid]['state']='solo';	
}


if(fishes[fid]['state']=='bomb'){

var fidsAll=fishes;
var fidsArr=[];
var winsArr=[];
var fidsCnt=utils.RandomInt(2,5);

	


fidsArr.push('"'+fid+'"');
winsArr.push((fishes[fid]['pay'])*Bet*winRatio);
totalWin+=fishes[fid]['pay']*Bet;	

	
for(var vv in fidsAll){
var v=fidsAll[vv];

if(curTime.getTime()-v['tl']<20000){

fidsArr.push('"'+v['sid']+'"');
winsArr.push((v['pay']*Bet)*winRatio);

totalWin+=v['pay']*Bet;

fidsCnt--;
if(fidsCnt<=0){
break;	
}	


}
	
}	
	

	
}else{

totalWin=fishes[fid]['pay']*Bet;	
	
}

var fishKilled=utils.RandomInt(1,5);


//limit control



//limits controol
	
if(bank >=  totalWin &&  fishKilled==1  && totalWin>0 && fishes[fid]['state']=='bomb'){	

income=0;
ptime='';

/*add win to bank*/		

		
//results='{"bid":'+bid+',"fids":['+fidsArr.join(',')+'],"ftypes":["'+fishes[fid]['fishView']+'|bomb"],"success":true,"die":true,"score":'+(totalWin*winRatio)+',"income":'+(totalWin*winRatio)+',"chairId":0,"typeBombs":['+fidsArr.join(',')+'],"pause":['+pause+'],"diefids":['+fidsArr.join(',')+'],"winscore":['+winsArr.join(',')+'],"cannonlevel":0'+ptime+'}';			

results='{"bid":"'+bid+'","fid":['+fidsArr.join(',')+'],"ftypes":["'+fishes[fid]['fishView']+'"],"success":true,"die":true,"score":'+(totalWin*winRatio)+',"income":0,"chairId":0,"typeBombs":['+fidsArr.join(',')+'],"pause":['+pause+'],"diefids":['+fidsArr.join(',')+'],"winscore":['+winsArr.join(',')+'],"cannonlevel":0,"fishscore":['+winsArr.join(',')+']'+ptime+'}';		
	


		
}else if(bank >=  totalWin && fishKilled==1  && totalWin>0 && fishes[fid]['state']!='bomb'){	

income=0;
ptime='';

if(fishes[fid]['fishView']=='Fish_01'){

pause='"'+fid+'"';	
income=(totalWin*winRatio);	
_self.gameData.GamePause=curTime.getTime()+10000;			
ptime=',"pauseTime":10000';	
}


/*add win to bank*/		
		
		

results='{"bid":"'+bid+'","fid":[],"ftypes":["'+fid+'"],"success":true,"die":true,"score":'+(totalWin*winRatio)+',"income":0,"chairId":0,"typeBombs":[],"pause":[],"diefids":['+fid+'],"winscore":['+(totalWin*winRatio)+'],"cannonlevel":0,"fishscore":['+(totalWin*winRatio)+'],"pauseTime":0}';		
	

		
}else{
totalWin=0;	


results='{"bid":"'+bid+'","fid":[],"success":false,"die":false,"score":0,"income":0,"chairId":0,"diefids":[],"winscore":[0],"cannonlevel":0,"fishscore":[],"pauseTime":0}';		
	
}
	
	

	
}

_self.gameData.Fishes=fishes;	


/*/////////////////////*/

var endBalance=startBalance-allbet+totalWin;
_self.gameBalanceInCents=endBalance;

if(totalWin>0){
	
await sys.SetBalance(totalWin);	
await sys.SetBank(-totalWin,'');	

}

/*//////////////////////*/



if(endBalance<0.01){
	
var response ='{"answerType":"game.colliderResult","Win":'+(totalWin*100)+',"Balance":'+(endBalance)+',"curBet":'+_self.gameData.Bet+',"responseView":[4,0,0,0,6,'+String('game.colliderResult').length+'],"msg":{"player":{"gender":0,"id":"accessKey|USD|'+sys.userName+'","gold":0,"delta":0,"gain":0,"cost":0,"ratio":0,"rmpRatioCredit":'+(endBalance*100)+',"denom":0.0},"result":['+results+']},"route":"game.colliderResult","id":0,"type":3}';	

}else{

var response ='{"answerType":"game.colliderResult","Win":'+(totalWin*100)+',"Balance":'+(endBalance)+',"curBet":'+_self.gameData.Bet+',"responseView":[4,0,0,0,6,'+String('game.colliderResult').length+'],"msg":{"player":{"gender":0,"id":"accessKey|USD|'+sys.userName+'","gold":0,"delta":0,"gain":0,"cost":0,"ratio":0,"rmpRatioCredit":'+(endBalance*100)+',"denom":0.0},"result":['+results+']},"route":"game.colliderResult","id":0,"type":3}';	
	
}


/*-----------------------------*/




await sys.Commit();		

 sys.SaveLogReport({balance:endBalance,bet:allbet,win:totalWin});
/*-----------------------------*/




_self.FormatAndSendMessage(dat,[response],dat.messageView);
	
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
_self.gameBalanceInCents=balanceInCents;


/*--------------ENTER ROOM---------------------*/	

var curTime  = new Date();

/*--------------------------------------------*/
/*--------------------------------------------*/
/*--------------------------------------------*/


_self.gameData.WaveTimeLimit=120000;	
_self.gameData.Bullets=[];	
_self.gameData.Fishes=[];	
_self.gameData.WaveTime=curTime.getTime();	
_self.gameData.CurScene=0;	
_self.gameData.IsGroupFish=0;
_self.gameData.GamePause=curTime.getTime();	


if(dat['query']['level']==0){


_self.gameData.Bet=0.01;	
_self.gameData.BetCnt=0;	
_self.gameData.BetArr=[0.01,0.02,0.03,0.05,0.08,0.10];	


}else if(dat['query']['level']==1){


_self.gameData.Bet=0.10;	
_self.gameData.BetCnt=0;	
_self.gameData.BetArr=[0.10,0.20,0.30,0.50,0.80,1.00];	


}else if(dat['query']['level']==2){


_self.gameData.Bet=1;	
_self.gameData.BetCnt=0;	
_self.gameData.BetArr=[1,2,3,5,8,10];	


}
_self.gameData.Bet=0.01;	
_self.gameData.BetCnt=0;
_self.gameData.BetArr=[0.01,0.02,0.03,0.05,0.08,0.10,0.20,0.30,0.50,0.80,1.00,2,3,5,8,10];
Bet=_self.gameData.Bet;	


fBets=_self.gameData.BetArr;

for(var fb=0; fb<fBets.length; fb++){
	
fBets[fb]=fBets[fb]*100;	
	
}


_self.gameData.BetLevel=dat['query']['level'];	



var response0='{"answerType":"game.start","Balance":'+balanceInCents+',"curBet":'+_self.gameData.Bet+',"responseView":[4,0,0,0,6,'+String('game.start').length+'],"msg":{"area":{"id":"0AB57DB3C77E99746D9E0AE0BF896412","scene":0,"state":"started","pauseTime":0,"stage":"normal"},"areaPlayers":[{"areaId":"0AB57DB3C77E99746D9E0AE0BF896412","playerId":"accessKey|USD|'+sys.userName+'","cannonLevel":0,"cannonCost":0,"cannonMaxLen":18,"skin":1,"lockTargetId":0,"chairId":0}],"table":{"_id":"0AB57DB3C77E99746D9E0AE0BF896412","name":"0AB57DB3C77E99746D9E0AE0BF896412","hostId":"host","serverId":"","recycle":false,"playerIds":["accessKey|USD|'+sys.userName+'",null,null,null],"chairIds":["accessKey|USD|'+sys.userName+'",null,null,null],"level":0},"players":[{"nickName":"'+sys.userName+'","gender":1,"teamId":"","gameState":"","id":"accessKey|USD|'+sys.userName+'","areaId":"0AB57DB3C77E99746D9E0AE0BF896412","gold":0,"delta":0,"gain":0,"cost":0,"ratio":0,"rmpRatioCredit":0,"denom":0.0}],"playerId":"accessKey|USD|'+sys.userName+'"},"route":"game.start","id":0,"type":3}';





var response1='{"answerType":"","responseView":[4,0,0,0,4,2],"data":{"table":{"_id":"0AB57DB3C77E99746D9E0AE0BF896412","name":"0AB57DB3C77E99746D9E0AE0BF896412","hostId":"host","serverId":"","recycle":false,"playerIds":["accessKey|USD|'+sys.userName+'",null,null],"chairIds":["accessKey|USD|'+sys.userName+'",null,null],"level":0},"players":[{"nickName":"'+sys.userName+'","gender":1,"teamId":"","gameState":"","id":"accessKey|USD|'+sys.userName+'","areaId":"0AB57DB3C77E99746D9E0AE0BF896412","gold":0,"delta":0,"gain":0,"cost":0,"ratio":0,"rmpRatioCredit":0,"denom":0.0}],"ratio":1,"rmpRatioCredit":'+balanceInCents+',"denom":0.01,"roomLevel":'+dat['query']['level']+',"rmpCannonCost":[1,2,3,5,8,10,20,30,50,80,100,200,300,500,800,1000]},"code":200,"type":2,"id":2}';


fishesArr=[];

fishes=_self.gameData.Fishes;	

if(!Array.isArray(fishes)){
fishes=[];	
}


rfish=utils.RandomInt(12,35);
for(i=0; i<rfish; i++){
	
sid=utils.RandomInt(1,9999999);	
fishView=utils.RandomInt(1,22);	
	
state='solo';	
stateArr=['solo','solo','solo','solo','solo','solo','solo','solo','solo','solo','bomb','bomb','bomb','flock','flock','flock'];
stateArr=utils.ShuffleArray(stateArr);	
	
if(fishView>18){state=stateArr[0];}	
	
if(fishView<10){
fishView='0'+fishView;	
}		



fishes[sid]={fishView:"Fish_"+fishView,sid:sid,pay:fishPay["Fish_"+fishView],tl:curTime.getTime(),state:state};	
		
	
fishesArr.push('{"areaId":"0AB57DB3C77E99746D9E0AE0BF896412","id":'+sid+',"type":"Fish_'+fishView+'","amount":1,"born":1584296702070,"alive":'+utils.RandomInt(5,10)+',"state":"solo","path":"bezier_id_'+utils.RandomInt(1,22)+'","index":'+i+',"score":1,"teamid":"none","_id":"0AB57DB3C77E99746D9E0AE0BF8964121","expired":1584296782070}');	
	
}



//_self.gameData.Fishes=fishes;	


//var response2='{"answerType":"game.onSpawnFishes","responseView":[4,0,0,0,6,'+String('game.onSpawnFishes').length+'],"msg":{"fishes":['+fishesArr.join(",")+']}}';


/*--------------------------------------------*/
/*--------------------------------------------*/


_self.FormatAndSendMessage(dat,[response0,response1],dat.messageView);


/*--------------------------------------------*/
/*--------------------------------------------*/
_self.StartFishesUpdate();
	
}

 this.IncomingDataHandler = async function(data)
{


if(data.action=='fishHunter.areaHandler.onFire'){
 _self.Fire(data); 	
}else{
	
_self.msgHandlerStack.push(data);		
	
}



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


_self.gameCommand=data.action;



switch(_self.gameCommand){
	
case 'heart':

 _self.Ping(data); 

break;
	
case 'connector.accountHandler.twLogin':

 _self.Login(data); 

break;	

case 'playerControl.tableHandler.searchTableAndJoin':
_self.PingRequest=data;
 _self.EnterRoom(data); 

break;	
case 'connector.accountHandler.onPingBalance':

_self.PingRequest=data;
 _self.Ping(data); 

break;		
case 'fishHunter.areaHandler.onFire':

 _self.Fire(data); 

break;		

case 'playerControl.areaHandler.onCollider':

 await  _self.Hit(data); 

break;	

case 'areaFishControl.fishHandler.fetchFishInfo':

 _self.Info(data); 

break;	
case 'fishHunter.areaHandler.onUpdateCannon':

 _self.ChangeBet(data); 

break;

case 'playerControl.tableHandler.leaveTable':

 _self.ExitRoom(data); 

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
