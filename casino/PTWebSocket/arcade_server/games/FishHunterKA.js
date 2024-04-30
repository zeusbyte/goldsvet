
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

        fishPay['Fish_22'] = 2;
        fishPay['Fish_21'] = 3;
        fishPay['Fish_20'] = 4;
		fishPay['Fish_19'] = 5;
		fishPay['Fish_18'] = 6;
		fishPay['Fish_17'] = 7;
		fishPay['Fish_16'] = 8;
		fishPay['Fish_15'] = 9;
		fishPay['Fish_14'] = 10;
		fishPay['Fish_13'] = 12;
		fishPay['Fish_12'] = 15;
		fishPay['Fish_11'] = 18;
		fishPay['Fish_10'] = 20;
		fishPay['Fish_09'] = 25;
		fishPay['Fish_08'] = 30;
		fishPay['Fish_07'] = 40;
		fishPay['Fish_06'] = 80;
		fishPay['Fish_05'] = 100;
		fishPay['Fish_04'] = 150;
		fishPay['Fish_03'] = 200;
		fishPay['Fish_02'] = 200;
		fishPay['Fish_01'] = 20;
		
		
		
		
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
fishDamage['Fish_23']=[20,200];
fishDamage['Fish_24']=[20,200];
fishDamage['Fish_25']=[20,200];
fishDamage['Fish_26']=[20,200];
fishDamage['Fish_27']=[20,200];
fishDamage['Fish_28']=[20,200];
fishDamage['Fish_29']=[20,200];
fishDamage['Fish_30']=[20,200];



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

var  fishPreset='{"message":[{"uid":'+curFishUID+',"type":1,"classid":'+curFishId+',"fishid":'+curFishId+',"born_time":'+(curTime.getTime())+',"routeid":'+route+',"offsettype":0,"offsetx":'+curFishOX+',"offsety":'+curFishOY+',"offsetr":0,"dead_time":'+(curTime.getTime()+40000)+',"angel":0,"pos":0,"rate":'+cFishPay+',"gun_rate":1,"extra":0}],"succ":true,"errinfo":"ok","type":"increasesprites"}';		
	
	
	
emitter.emit('outcomingMessage',fishPreset,true);		
	
_self.fishesId_++;	
	
};

this.StartFishesUpdate=function(){
_self.StopFishesUpdate();	
_self.fishesUpdateInterval=setInterval(_self.Ping,10000);	
	
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


response='{"code":200,"responseView":[4,0,0,0,4,1],"answerType":"","data":{"nickName":"'+sys.userName+'","gender":1,"avatarUrl":"","playerId":"d607e29f-99cc-48bc-a37d-5590b80fa0f6","twSSOId":"accessKey||766764546","parentId":"","state":0,"role":0,"locale":"en","creditAmount":'+balanceInCents+',"creditCode":"","rmpCannonCost":[1,2,3,5,8,10,10,20,30,50,80,100,100,200,300,500,800,1000],"denom":0.01,"currencySymbol":"","currencyFractionDigits":2,"currencySymbolInBack":false,"thousandGroupingSepartor":",","decimalSeparator":"+","transactionBufferSize":5,"transactionBufferMilliseconds":1000,"rmpCredit":'+balanceInCents+',"roomLevel":0,"cannonlevel":0,"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOiJlM2UyODkyYS1kZjQ4LTRkNTMtODI1Zi0zNDA3ZDg4N2ZiZjkiLCJpYXQiOjE1ODQyODM3NTcsImV4cCI6MTU4NDM3MDE1N30.zoeZ7VmLyP1GESKmfPx89a_JRmqGoTiaaDNOQZylJwlyAHrszs-DxjdyrvXByi1Iyg0ELrciQLUX53iHPkETY11YNjkwKapQgCZVKK3OiTjK_qtVUBVYy8N420LSHaYK7D_L4z-GTD_XSnZFWfI0xlmT5QgshUSNvnkybFpGIgk","recommendedGames":[],"openRecommendedGamesInNewWindow":false,"ip":"::ffff:127.0.0.1:52678","realip":"","gameServerId":"player-server-3","gameId":"10007","tableId":""}}';

_self.FormatAndSendMessage(dat,[response],dat.messageView);

};


 this.Info = async function(dat)
{


Bet=_self.gameData.Bet;	

var response='{"code":200,"data":{"scores":{"Fish_22":2,"Fish_21":3,"Fish_20":4,"Fish_19":5,"Fish_18":6,"Fish_17":7,"Fish_16":8,"Fish_15":9,"Fish_14":10,"Fish_13":12,"Fish_12":15,"Fish_11":18,"Fish_10":20,"Fish_09":25,"Fish_08":30,"Fish_07":40,"Fish_06":80,"Fish_05":100,"Fish_04":150,"Fish_03":200,"Fish_02":200,"Fish_01":20},"cannonCost":'+(Bet*100)+'}}';

_self.FormatAndSendMessage(dat,[response],dat.messageView);	
	

	
}



 this.Ping = async function()
{

var dat=_self.cdata;

bullets='';

Bet=_self.gameData.Bet;	
BetCnt=_self.gameData.BetCnt;	
BetArr=_self.gameData.BetArr;	
BetLevel=_self.gameData.BetLevel;	

var curTime  = new Date();	
var balanceInCents=_self.gameBalanceInCents*100;

var result_tmp=[];

if( _self.gameData.GamePause > curTime.getTime() ){
	
	
result_tmp[0]='{"answerType":"game.fire","responseView":[4,0,0,0,6,'+String('game.fire').length+'],"msg":{"player":{"nickName":"'+sys.userName+'","gender":1,"avatarUrl":"","gameServerId":"player-server-3","connectorId":"connector-server-3","teamId":"","gameId":"10007","tableId":"2ba04cc50c285a21b223e1043993456918e041415cac8ce29e72d3dc948474be-connector-server-3","gameState":"playing","id":"9dab0ea6-0cb0-4b8c-951a-e10077945f2b","areaId":"7909d963c43c6df71d7f7ee17bfc4b5133809d80342e2f645d01e16119eec1ad-connector-server-3","gold":100,"delta":'+(Bet*100)+',"gain":0,"cost":'+(Bet*100)+',"ratio":1,"rmpRatioCredit":'+balanceInCents+',"denom":0.01},"areaPlayer":{"id":"13879583b6558342be4b011cf849ee29989667afd2eb4c993a7f06371e78a2d4","areaId":"7909d963c43c6df71d7f7ee17bfc4b5133809d80342e2f645d01e16119eec1ad-connector-server-3","playerId":"d607e29f-99cc-48bc-a37d-5590b80fa0f6","cannonLevel":'+BetCnt+',"cannonCost":'+(Bet*100)+',"cannonMaxLen":18,"skin":1,"lockTargetId":0,"chairId":2}'+bullets+'}}';

	
	
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
_self.gameData.IsGroupFish=utils.RandomInt(0,3);
	
if(_self.gameData.IsGroupFish==1){
_self.gameData.WaveTimeLimit=60000;	
}else{
_self.gameData.WaveTimeLimit=120000;	
}	
	
	
}else{
	




result_tmp[0]='{"answerType":"game.fire","responseView":[4,0,0,0,6,'+String('game.fire').length+'],"msg":{"player":{"nickName":"'+sys.userName+'","gender":1,"avatarUrl":"","gameServerId":"player-server-3","connectorId":"connector-server-3","teamId":"","gameId":"10007","tableId":"2ba04cc50c285a21b223e1043993456918e041415cac8ce29e72d3dc948474be-connector-server-3","gameState":"playing","id":"9dab0ea6-0cb0-4b8c-951a-e10077945f2b","areaId":"7909d963c43c6df71d7f7ee17bfc4b5133809d80342e2f645d01e16119eec1ad-connector-server-3","gold":100,"delta":'+(Bet*100)+',"gain":0,"cost":'+(Bet*100)+',"ratio":1,"rmpRatioCredit":'+balanceInCents+',"denom":0.01},"areaPlayer":{"id":"13879583b6558342be4b011cf849ee29989667afd2eb4c993a7f06371e78a2d4","areaId":"7909d963c43c6df71d7f7ee17bfc4b5133809d80342e2f645d01e16119eec1ad-connector-server-3","playerId":"d607e29f-99cc-48bc-a37d-5590b80fa0f6","cannonLevel":'+BetCnt+',"cannonCost":'+(Bet*100)+',"cannonMaxLen":18,"skin":1,"lockTargetId":0,"chairId":2}'+bullets+'}}';




fishesArr=[];

fishes=_self.gameData.Fishes;	

/*if(!is_array(fishes)){
fishes=[];	
}*/


if(_self.gameData.IsGroupFish != 1){
	

	
	
answerType='game.onSpawnFishes';	
gr='';	

rfish=utils.RandomInt(10,30);
for(i=0; i<rfish; i++){
	
sid=utils.RandomInt(1,99999999)	
fishViewArr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,13,14,15,16,17,18,19,20,21,22,13,14,15,16,17,18,19,20,21,22];
fishViewArr=utils.ShuffleArray(fishViewArr);
fishView=fishViewArr[0];	
	
state='solo';	
stateArr=['solo','solo','solo','solo','solo','solo','solo','solo','solo','solo','bomb','bomb','flock','flock'];
stateArr=utils.ShuffleArray(stateArr);	
	
if(fishView>15){state=stateArr[0];}	
	
if(fishView<10){
fishView='0'+fishView;	
}		



fishes[sid]={fishView:"Fish_"+fishView,sid:sid,pay:fishPay["Fish_"+fishView],tl:curTime.getTime(),state:state};	
	
fishesArr.push('{"areaId":"7909d963c43c6df71d7f7ee17bfc4b5133809d80342e2f645d01e16119eec1ad-connector-server-3","id":'+sid+',"type":"Fish_'+fishView+'","amount":1,"born":1584296702070,"alive":'+utils.RandomInt(5,10)+',"state":"'+state+'","path":"bezier_id_'+utils.RandomInt(1,22)+'","index":0,"score":1,"teamid":"none","_id":"7909d963c43c6df71d7f7ee17bfc4b5133809d80342e2f645d01e16119eec1ad-connector-server-31","expired":1584296782070}');	
	
}



}else{
	


_self.gameData.IsGroupFish;
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
	
fishesArr.push('{"areaId":"7909d963c43c6df71d7f7ee17bfc4b5133809d80342e2f645d01e16119eec1ad-connector-server-3","id":'+sid+',"type":"Fish_'+fishView+'","amount":1,"born":1584296702070,"alive":'+utils.RandomInt(5,10)+',"state":"group","path":"bezier_group_B1","index":'+i+',"score":1,"teamid":"none","_id":"7909d963c43c6df71d7f7ee17bfc4b5133809d80342e2f645d01e16119eec1ad-connector-server-31","expired":1584296782070}');	
	
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
	
fishesArr.push('{"areaId":"7909d963c43c6df71d7f7ee17bfc4b5133809d80342e2f645d01e16119eec1ad-connector-server-3","id":'+sid+',"type":"Fish_'+fishView+'","amount":1,"born":1584296702070,"alive":'+utils.RandomInt(5,10)+',"state":"group","path":"bezier_group_B2","index":'+i+',"score":1,"teamid":"none","_id":"7909d963c43c6df71d7f7ee17bfc4b5133809d80342e2f645d01e16119eec1ad-connector-server-31","expired":1584296782070}');	
	


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
	
	
var balanceInCents=await sys.GetBalance();



//var response1='{"answerType":"","responseView":[4,0,0,0,4,2],"code":200,"data":{"table":{"_id":"7909d963c43c6df71d7f7ee17bfc4b5133809d80342e2f645d01e16119eec1ad-connector-server-3","name":"Auto","hostId":"","serverId":"player-server-3","recycle":true,"playerIds":["d607e29f-99cc-48bc-a37d-5590b80fa0f6"],"chairIds":["d607e29f-99cc-48bc-a37d-5590b80fa0f6","","",""],"level":0},"players":[{"nickName":"'+sys.userName+'","gender":1,"avatarUrl":"","gameServerId":"player-server-3","connectorId":"connector-server-3","teamId":"","gameId":"10007","tableId":"","gameState":"free","id":"d607e29f-99cc-48bc-a37d-5590b80fa0f6","areaId":"","gold":'+balanceInCents+'}],"ratio":1,"rmpRatioCredit":'+balanceInCents+',"denom":0.01,"roomLevel":'+dat['query']['level']+',"rmpCannonCost":[1,2,3,5,8,10,10,20,30,50,80,100,100,200,300,500,800,1000]}}';




var response0='{"answerType":"table.quit","responseView":[4,0,0,0,6,'+String('table.quit').length+'],"msg":{"table":{"_id":"7909d963c43c6df71d7f7ee17bfc4b5133809d80342e2f645d01e16119eec1ad-connector-server-3","name":"Auto","hostId":"host","serverId":"","recycle":false,"playerIds":["accessKey||766764546",null,null,null],"chairIds":["accessKey||766764546",null,null,null],"level":0},"players":[{"nickName":"766764546","gender":1,"teamId":"","gameState":"","id":"accessKey||766764546","areaId":"","gold":0,"delta":0,"gain":0,"cost":0,"ratio":0,"rmpRatioCredit":0,"denom":0.0}]},"route":"table.quit","id":0,"type":3}';


var response1='{"answerType":"game.quit","responseView":[4,0,0,0,6,'+String('game.quit').length+'],"msg":{"area":{"_id":"7909d963c43c6df71d7f7ee17bfc4b5133809d80342e2f645d01e16119eec1ad-connector-server-3","state":"started","scene":0,"stage":"group"},"areaPlayers":[],"bullets":[],"players":[{"nickName":"'+sys.userName+'","gender":1,"avatarUrl":"","gameServerId":"player-server-3","connectorId":"connector-server-3","teamId":"","gameId":"10007","tableId":"2ba04cc50c285a21b223e1043993456918e041415cac8ce29e72d3dc948474be-connector-server-3","gameState":"free","id":"d607e29f-99cc-48bc-a37d-5590b80fa0f6","areaId":"","gold":0}]}}';
	
	
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

if(balanceInCents<Bet){

bullets='';
	
}else{

bullets=',"bullet":{"transactionId":"4623343b-db8d-442c-a032-7523aac41417","createTime":1584376468710,"areaId":"7909d963c43c6df71d7f7ee17bfc4b5133809d80342e2f645d01e16119eec1ad-connector-server-3","playerId":"d607e29f-99cc-48bc-a37d-5590b80fa0f6","bulletId":'+bulletId+',"angle":'+dat['query']['angle']+',"cost":'+bulletBet+',"lockTargetId":'+dat['query']['lockId']+',"chairId":0,"cannonlevel":'+BetCnt+',"cannonskin":1,"_id":"9dab0ea6-0cb0-4b8c-951a-e10077945f2b3584376468710","level":1}';

}



var response0='{"answerType":"game.fire","responseView":[4,0,0,0,6,'+String('game.fire').length+'],"msg":{"player":{"nickName":"'+sys.userName+'","gender":1,"avatarUrl":"","gameServerId":"player-server-3","connectorId":"connector-server-3","teamId":"","gameId":"10007","tableId":"2ba04cc50c285a21b223e1043993456918e041415cac8ce29e72d3dc948474be-connector-server-3","gameState":"playing","id":"9dab0ea6-0cb0-4b8c-951a-e10077945f2b","areaId":"7909d963c43c6df71d7f7ee17bfc4b5133809d80342e2f645d01e16119eec1ad-connector-server-3","gold":100,"delta":'+bulletBet+',"gain":0,"cost":0,"ratio":1,"rmpRatioCredit":100,"denom":0.01},"areaPlayer":{"id":"13879583b6558342be4b011cf849ee29989667afd2eb4c993a7f06371e78a2d4","areaId":"7909d963c43c6df71d7f7ee17bfc4b5133809d80342e2f645d01e16119eec1ad-connector-server-3","playerId":"d607e29f-99cc-48bc-a37d-5590b80fa0f6","cannonLevel":'+BetCnt+',"cannonCost":'+(Bet*100)+',"cannonMaxLen":18,"skin":1,"lockTargetId":0,"chairId":2}'+bullets+'}}';

var response1='{"answerType":"game.colliderResult","responseView":[4,0,0,0,6,'+String('game.colliderResult').length+'],"msg":{"player":{"id":"d607e29f-99cc-48bc-a37d-5590b80fa0f6","gold":0,"delta":0,"gain":0,"cost":'+(Bet*100)+',"rmpRatioCredit":'+(balanceInCents*100)+',"ratio":1},"result":[]}}';


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


var response='{"answerType":"game.updateCannon","Balance":'+balanceInCents+',"curBet":'+_self.gameData.Bet+',"responseView":[4,0,0,0,6,'+String('game.updateCannon').length+'],"msg":{"areaPlayer":{"id":"2b7e1e20bfc42e388fe81831c2a2d80a6657370638b7170b5031110e10e73379","areaId":"e339f81cfa6b0d3ed09053d2d6f186416e90b358c2b26a84a81fa9e90d94004a-connector-server-3","playerId":"d607e29f-99cc-48bc-a37d-5590b80fa0f6","cannonLevel":'+(BetCnt)+',"cannonCost":'+(Bet*100)+',"cannonMaxLen":18,"skin":1,"lockTargetId":0,"chairId":0}}}';





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









if( fishes[fid]!=undefined ){


if(fishes[fid]['state']==undefined){
fishes[fid]['state']='solo';	
}


if(fishes[fid]['state']=='bomb'){

var fidsAll=fishes;
var fidsArr=[];
var winsArr=[];
var viewsArr=[];
var fidsCnt=utils.RandomInt(2,5);

var bombId=	fishes[fid]['fishView'];


fidsArr.push('"'+fid+'"');
winsArr.push((fishes[fid]['pay'])*Bet*winRatio);
viewsArr.push('"'+fishes[fid]['fishView']+'|solo"');
totalWin+=fishes[fid]['pay']*Bet;	

	
for(var vv in fidsAll){
var v=fidsAll[vv];

if(curTime.getTime()-v['tl']<8000 && bombId==v['fishView'] && v['state']!='bomb'){

fidsArr.push('"'+v['sid']+'"');
winsArr.push((v['pay']*Bet)*winRatio);
viewsArr.push('"'+v['fishView']+'|solo"');
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

var fishKilled=utils.RandomInt(1,fishes[fid]['pay']);


//limit control



//limits controol
	
if(bank >=  totalWin &&  fishKilled==1  && totalWin>0 && fishes[fid]['state']=='bomb'){	

income=0;
ptime='';

/*add win to bank*/		

		
results='{"bid":'+bid+',"fid":[],"ftypes":['+viewsArr.join(',')+'],"success":true,"die":true,"score":'+Math.round(totalWin*winRatio)+',"income":'+Math.round(totalWin*winRatio)+',"chairId":0,"typeBombs":['+fidsArr.join(',')+'],"pause":['+pause+'],"diefids":['+fidsArr.join(',')+'],"winscore":['+winsArr.join(',')+'],"fishscore":['+winsArr.join(',')+'],"cannonlevel":0'+ptime+'}';			



		
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
		
results='{"bid":'+bid+',"fid":["'+fid+'"],"ftypes":["'+fishes[fid]['fishView']+'|'+fishes[fid]['state']+'"],"success":true,"die":true,"score":'+Math.round(totalWin*winRatio)+',"income":'+Math.round(totalWin*winRatio)+',"chairId":0,"typeBombs":[],"pause":['+pause+'],"diefids":['+fid+'],"winscore":['+Math.round(totalWin*winRatio)+'],"fishscore":['+Math.round(totalWin*winRatio)+'],"cannonlevel":0'+ptime+'}';			



		
}else{
totalWin=0;	
results='{"bid":'+bid+',"fid":["'+fid+'"],"ftypes":["Fish_15|flock"],"success":true,"die":false,"score":0,"income":0,"chairId":0,"typeBombs":[],"pause":[],"diefids":[],"winscore":[],"fishscore":[],"cannonlevel":0}';		
	
}
	
//{"msg":{"player":{"gender":0,"id":"accessKey|USD|339958652","gold":0,"delta":0,"gain":0,"cost":0,"ratio":0,"rmpRatioCredit":9999998,"denom":0.0},"result":[{"bid":"143264885EB916271BCBEA0CC156067D","fid":[],"success":false,"die":false,"score":0,"income":0,"chairId":0,"diefids":[],"winscore":[0],"cannonlevel":0,"fishscore":[],"pauseTime":0}]},"route":"game.colliderResult","id":0,"type":3}	

	
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
var response ='{"answerType":"game.colliderResult","Win":'+(totalWin*100)+',"Balance":0.0,"curBet":'+_self.gameData.Bet+',"responseView":[4,0,0,0,6,'+String('game.colliderResult').length+'],"msg":{"player":{"id":"d607e29f-99cc-48bc-a37d-5590b80fa0f6","gold":'+(totalWin*100)+',"delta":0,"gain":0,"cost":'+(Bet*100)+',"rmpRatioCredit":0.1,"ratio":1},"result":['+results+']}}';
}else{

var response ='{"answerType":"game.colliderResult","Win":'+(totalWin*100)+',"Balance":'+(endBalance)+',"curBet":'+_self.gameData.Bet+',"responseView":[4,0,0,0,6,'+String('game.colliderResult').length+'],"msg":{"player":{"id":"d607e29f-99cc-48bc-a37d-5590b80fa0f6","gold":'+(totalWin*100)+',"delta":1,"gain":1,"cost":'+(Bet*100)+',"rmpRatioCredit":'+(endBalance*100)+',"ratio":1},"result":['+results+']}}';	
	
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

var response0='{"answerType":"game.start","Balance":'+balanceInCents+',"curBet":'+_self.gameData.Bet+',"responseView":[4,0,0,0,6,'+String('game.start').length+'],"msg":{"area":{"id":"7909d963c43c6df71d7f7ee17bfc4b5133809d80342e2f645d01e16119eec1ad-connector-server-3","scene":0,"state":"started","pauseTime":0,"stage":"normal"},"areaPlayers":[{"id":"e65975e402d48d76e08ffee182054dff22fab8729c0013eab47367fa56ded7c8","areaId":"7909d963c43c6df71d7f7ee17bfc4b5133809d80342e2f645d01e16119eec1ad-connector-server-3","playerId":"d607e29f-99cc-48bc-a37d-5590b80fa0f6","cannonLevel":0,"cannonCost":'+(Bet*100)+',"cannonMaxLen":18,"skin":1,"lockTargetId":0,"chairId":0}],"table":{"_id":"7909d963c43c6df71d7f7ee17bfc4b5133809d80342e2f645d01e16119eec1ad-connector-server-3","level":0,"maxChairs":1,"chairIds":["d607e29f-99cc-48bc-a37d-5590b80fa0f6","","",""],"recycle":true,"secret":"","gameId":"10007","serverId":"player-server-3","hostId":"","name":"Auto"},"players":[{"nickName":"'+sys.userName+'","gender":1,"avatarUrl":"","gameServerId":"player-server-3","connectorId":"connector-server-3","teamId":"","gameId":"10007","tableId":"2ba04cc50c285a21b223e1043993456918e041415cac8ce29e72d3dc948474be-connector-server-3","gameState":"playing","id":"d607e29f-99cc-48bc-a37d-5590b80fa0f6","areaId":"7909d963c43c6df71d7f7ee17bfc4b5133809d80342e2f645d01e16119eec1ad-connector-server-3","gold":'+balanceInCents+'}],"playerId":"d607e29f-99cc-48bc-a37d-5590b80fa0f6"}}';

var response1='{"answerType":"","responseView":[4,0,0,0,4,2],"code":200,"data":{"table":{"_id":"7909d963c43c6df71d7f7ee17bfc4b5133809d80342e2f645d01e16119eec1ad-connector-server-3","name":"Auto","hostId":"","serverId":"player-server-3","recycle":true,"playerIds":["d607e29f-99cc-48bc-a37d-5590b80fa0f6"],"chairIds":["d607e29f-99cc-48bc-a37d-5590b80fa0f6","","",""],"level":0},"players":[{"nickName":"'+sys.userName+'","gender":1,"avatarUrl":"","gameServerId":"player-server-3","connectorId":"connector-server-3","teamId":"","gameId":"10007","tableId":"","gameState":"free","id":"d607e29f-99cc-48bc-a37d-5590b80fa0f6","areaId":"","gold":'+balanceInCents+'}],"ratio":1,"rmpRatioCredit":'+balanceInCents+',"denom":0.01,"roomLevel":'+dat['query']['level']+',"rmpCannonCost":[1,2,3,5,8,10,20,30,50,80,100,200,300,500,800,1000]}}';


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
		
	
fishesArr.push('{"areaId":"7909d963c43c6df71d7f7ee17bfc4b5133809d80342e2f645d01e16119eec1ad-connector-server-3","id":'+sid+',"type":"Fish_'+fishView+'","amount":1,"born":1584296702070,"alive":'+utils.RandomInt(5,10)+',"state":"solo","path":"bezier_id_'+utils.RandomInt(1,22)+'","index":'+i+',"score":1,"teamid":"none","_id":"7909d963c43c6df71d7f7ee17bfc4b5133809d80342e2f645d01e16119eec1ad-connector-server-31","expired":1584296782070}');	
	
}



//_self.gameData.Fishes=fishes;	


//var response2='{"answerType":"game.onSpawnFishes","responseView":[4,0,0,0,6,'+String('game.onSpawnFishes').length+'],"msg":{"fishes":['+fishesArr.join(",")+']}}';


/*--------------------------------------------*/
/*--------------------------------------------*/


_self.FormatAndSendMessage(dat,[response0,response1],dat.messageView);

_self.StartFishesUpdate();
/*--------------------------------------------*/
/*--------------------------------------------*/

	
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

_self.cdata=data;
 _self.Login(data); 

break;	

case 'playerControl.tableHandler.searchTableAndJoin':
_self.cdata=data;
 _self.EnterRoom(data); 

break;	
case 'connector.accountHandler.onPingBalance':
_self.cdata=data;
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
