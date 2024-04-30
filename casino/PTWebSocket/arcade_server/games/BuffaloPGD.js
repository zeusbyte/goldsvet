
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




fishPay['Fish_0'] = [2,2];
fishPay['Fish_1'] = [3,3];
fishPay['Fish_2'] = [4,4];
fishPay['Fish_3'] = [5,5];
fishPay['Fish_4'] = [6,6];
fishPay['Fish_5'] = [7,7];
fishPay['Fish_6'] = [8,8];
fishPay['Fish_7'] = [9,9];
fishPay['Fish_8'] = [10,10];
fishPay['Fish_9'] = [12,12];
fishPay['Fish_10'] = [15,15];
fishPay['Fish_11'] = [18,18];
fishPay['Fish_12'] = [20,20];
fishPay['Fish_13'] = [10,30];
fishPay['Fish_14'] = [10,30];
fishPay['Fish_15'] = [10,30];
fishPay['Fish_16'] = [20,60];
fishPay['Fish_17'] = [30,100];
fishPay['Fish_18'] = [100,100];





fishPay['Fish_19'] = [0,0];//none
fishPay['Fish_20'] = [0,0];//none
fishPay['Fish_21'] = [0,0];//none
fishPay['Fish_22'] = [0,0];//lase crab 
fishPay['Fish_23'] = [0,0];//drill crab
fishPay['Fish_24'] = [0,0];//none
fishPay['Fish_25'] = [100,500];//mermaid
fishPay['Fish_26'] = [0,0];//none
fishPay['Fish_27'] = [0,0];//none
fishPay['Fish_28'] = [0,0];//none
fishPay['Fish_29'] = [0,0];//none
fishPay['Fish_30'] = [0,0];//none
fishPay['Fish_31'] = [0,0];//none
fishPay['Fish_32'] = [0,0];//none
fishPay['Fish_33'] = [0,0];//none
fishPay['Fish_34'] = [0,0];//bomb crab
fishPay['Fish_35'] = [0,0];//none
fishPay['Fish_36'] = [0,0];//none
fishPay['Fish_37'] = [0,0];//none
fishPay['Fish_38'] = [0,0];//none
fishPay['Fish_39'] = [0,0];//none
fishPay['Fish_40'] = [0,0];//none
fishPay['Fish_41'] = [0,0];//none
fishPay['Fish_42'] = [0,0];//none
fishPay['Fish_43'] = [0,0];//none
fishPay['Fish_44'] = [0,0];//none
fishPay['Fish_45'] = [0,0];//none
fishPay['Fish_46'] = [0,0];//none
fishPay['Fish_47'] = [0,0];//none
fishPay['Fish_48'] = [0,0];//none
fishPay['Fish_49'] = [0,0];//none
fishPay['Fish_50'] = [0,0];//none
fishPay['Fish_51'] = [0,0];//none
fishPay['Fish_52'] = [0,0];//none
fishPay['Fish_53'] = [0,0];//none
fishPay['Fish_54'] = [0,0];//none
fishPay['Fish_55'] = [0,0];//none
fishPay['Fish_56'] = [0,0];//none
fishPay['Fish_57'] = [0,0];//none
fishPay['Fish_58'] = [0,0];//none
fishPay['Fish_59'] = [0,0];//none
fishPay['Fish_60'] = [0,0];//none
fishPay['Fish_61'] = [0,0];//none
fishPay['Fish_62'] = [0,0];//none
fishPay['Fish_63'] = [0,0];//none
fishPay['Fish_64'] = [0,0];//none
fishPay['Fish_65'] = [0,0];//none
fishPay['Fish_66'] = [0,0];//none
fishPay['Fish_67'] = [0,0];//none
fishPay['Fish_68'] = [0,0];//none
fishPay['Fish_69'] = [0,0];//none
fishPay['Fish_70'] = [0,0];//none
fishPay['Fish_71'] = [0,0];//none
fishPay['Fish_72'] = [0,0];//none
fishPay['Fish_73'] = [0,0];//none
fishPay['Fish_74'] = [0,0];//none
fishPay['Fish_75'] = [0,0];//none
fishPay['Fish_76'] = [0,0];//none
fishPay['Fish_77'] = [0,0];//none
fishPay['Fish_78'] = [100,500];//croco
fishPay['Fish_79'] = [0,0];//none
fishPay['Fish_80'] = [0,0];//none
fishPay['Fish_81'] = [0,0];//none
fishPay['Fish_82'] = [0,0];//none
fishPay['Fish_83'] = [0,0];//none
fishPay['Fish_84'] = [0,0];//none
fishPay['Fish_85'] = [0,0];//none



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
fishDamage['Fish_48']=[10,80];
fishDamage['Fish_49']=[10,80];
fishDamage['Fish_50']=[10,80];
fishDamage['Fish_51']=[10,80];
fishDamage['Fish_52']=[10,80];
fishDamage['Fish_53']=[10,80];
fishDamage['Fish_54']=[10,80];
fishDamage['Fish_55']=[10,80];
fishDamage['Fish_56']=[10,80];
fishDamage['Fish_57']=[10,80];
fishDamage['Fish_58']=[10,80];
fishDamage['Fish_59']=[10,80];
fishDamage['Fish_60']=[10,80];
fishDamage['Fish_61']=[10,80];
fishDamage['Fish_62']=[10,80];
fishDamage['Fish_63']=[10,80];
fishDamage['Fish_64']=[10,80];
fishDamage['Fish_65']=[10,80];
fishDamage['Fish_66']=[10,80];
fishDamage['Fish_67']=[10,80];
fishDamage['Fish_68']=[10,80];
fishDamage['Fish_69']=[10,80];
fishDamage['Fish_70']=[10,80];
fishDamage['Fish_71']=[10,80];
fishDamage['Fish_72']=[10,80];
fishDamage['Fish_73']=[10,80];
fishDamage['Fish_74']=[10,80];
fishDamage['Fish_75']=[10,80];
fishDamage['Fish_76']=[10,80];
fishDamage['Fish_77']=[10,80];
fishDamage['Fish_78']=[10,80];
fishDamage['Fish_79']=[10,80];
fishDamage['Fish_80']=[10,80];
fishDamage['Fish_81']=[10,80];
fishDamage['Fish_82']=[10,80];
fishDamage['Fish_83']=[10,80];



/*----------control fishes on scene------------*/


_self.fishesId=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,22,23,25,34];	


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


var fs = require('fs');
var ff =fs.readFileSync('./arcade_server/games/1.txt', 'utf8').split(',');
var curFishId=ff[0];
*/

var route=utils.RandomInt(1,300);	

	

	
var cFishHealth=utils.RandomInt(fishDamage['Fish_'+curFishId][0],fishDamage['Fish_'+curFishId][1]);	
//var cFishHealth=1;	
var cFishPay=utils.RandomInt(fishPay['Fish_'+curFishId][0],fishPay['Fish_'+curFishId][1]);	



	

_self.sceneFishes['fish_'+curFishUID]={curFishUID:curFishUID,fishId:curFishId,fishHealth:cFishHealth,fishPay:cFishPay,fishTime:curTime.getTime()};	


var  responseStr='{"sys":"fish","cmd":"f1","data":{"11":[{"1":'+curFishUID+',"3":34,"2":'+curFishId+',"5":'+route+',"4":'+cFishPay+',"7":0,"6":0,"9":206,"8":1,"16":null}],"10":"11","15":[{},{"inflated":[17.0,3.1,6.4,6.3,7.9]},{}],"14":2003,"timestamp":'+curTime.getTime()+'}}';		
	
	
	
var s=responseStr.length;
var ss=['0','0','0','0'];
ss.splice(0,s.toString().length);
responseL=ss.join("")+s;
var response=responseL+responseStr;
emitter.emit('outcomingMessage',response,false);			
	

	
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



 this.PlayerJoin = async function(step)
{


var balanceInCents,response;

await sys.CreateConnection();	

var curTime  = new Date();
var responseStr='{"sys":"kiosk","data":{"data":{"itemEnable":false,"ratio":1,"eventInfo":{"900004":{}},"normalRoomNum":6,"itemDropEnable":false,"highRollerBetRange":[20,30,40,50,60,70,80,90,100,150,200,250,300,350,400,450,500],"normalBetRange":[5,10,15,20,25,30,35,40,45,50,60,70,80,90,100,150,200,250,300],"highRollerRoomNum":0,"NormalTable":[{"iTableID":1,"ArraySeat":[0,0,0,0]},{"iTableID":2,"ArraySeat":[0,0,0,0]},{"iTableID":3,"ArraySeat":[0,0,0,0]},{"iTableID":4,"ArraySeat":[0,0,0,0]},{"iTableID":5,"ArraySeat":[0,0,0,0]},{"iTableID":6,"ArraySeat":[0,0,0,0]}],"commonInfo":"","keepSeat":{},"HighRollerTable":[],"maxGate":10000000,"minGate":0}},"sn":"'+curTime.getTime()+'","ret":"PlayerJoin"}';
var s=responseStr.length;
var ss=['0','0','0','0'];
ss.splice(0,s.toString().length);
responseL=ss.join("")+s;
var response=responseL+responseStr;
emitter.emit('outcomingMessage',response,false);		

};




/*-------------------------*/
/*-------------------------*/
 this.Pin = async function(dat)
{

var curTime  = new Date();
var responseStr='{"sys":"lobby","data":{"result":0},"sn":"'+curTime.getTime()+'","ret":"pin"}';
var s=responseStr.length;
var ss=['0','0','0','0'];
ss.splice(0,s.toString().length);
responseL=ss.join("")+s;
var response=responseL+responseStr;
emitter.emit('outcomingMessage',response,false);		


var responseStr='{"sys":"lobby","cmd":"UpdateInfo","data":{"game_maintain_list":[],"msg_info":{},"game_version":{"PC":"1.11912.0","FireBall":"1.11371.0","FireStorm":"1.11371.0","PC_H5":"1278.3"}}}';
var s=responseStr.length;
var ss=['0','0','0','0'];
ss.splice(0,s.toString().length);
responseL=ss.join("")+s;
var response=responseL+responseStr;
emitter.emit('outcomingMessage',response,false);		
	
}



 this.UpdateBet = async function(dat)
{

var curTime  = new Date();
var responseStr='{"sys":"fish_player","cmd":"update_bet","data":{"timestamp":'+curTime.getTime()+',"device":1,"auto":false,"bet_value":5,"weapon":50001,"seat":0}}';
var s=responseStr.length;
var ss=['0','0','0','0'];
ss.splice(0,s.toString().length);
responseL=ss.join("")+s;
var response=responseL+responseStr;
emitter.emit('outcomingMessage',response,false);		
	
};
 this.UpdatePlayer = async function(dat)
{

var curTime  = new Date();
var responseStr='{"sys":"fish_player","cmd":"update_player","data":{"players":{"11357450":{"vip_lv":null,"auto":false,"seat":0,"entries":'+_self.gameBalanceInCents+',"bet_value":1,"coin":'+_self.gameBalanceInCents+',"id":"11357450","name":null,"weapon":0,"character":null,"winning":0.0,"lv":null}},"timestamp":'+curTime.getTime()+'}}';
var s=responseStr.length;
var ss=['0','0','0','0'];
ss.splice(0,s.toString().length);
responseL=ss.join("")+s;
var response=responseL+responseStr;
emitter.emit('outcomingMessage',response,false);		
	
};


 this.InitPlayer = async function(dat)
{

var curTime  = new Date();
var responseStr='{"sys":"fish_player","cmd":"init_player","data":{"vip_lv":null,"timestamp":'+curTime.getTime()+',"seat":0,"bet_type":0,"entries":'+_self.gameBalanceInCents+',"bet_list":[5,10,15,20,25,30,35,40,45,50,60,70,80,90,100,150,200,250,300],"bet_value":1,"coin":'+_self.gameBalanceInCents+',"id":"11357450","name":null,"weapon":0,"character":null,"winning":0,"lv":null}}';
var s=responseStr.length;
var ss=['0','0','0','0'];
ss.splice(0,s.toString().length);
responseL=ss.join("")+s;
var response=responseL+responseStr;
emitter.emit('outcomingMessage',response,false);		
	
}

 this.F5 = async function(dat)
{

var curTime  = new Date();
var responseStr='{"sys":"fish","cmd":"f5","data":{"1":"buf003","timestamp":'+curTime.getTime()+',"13":72}}';
var s=responseStr.length;
var ss=['0','0','0','0'];
ss.splice(0,s.toString().length);
responseL=ss.join("")+s;
var response=responseL+responseStr;
emitter.emit('outcomingMessage',response,false);		


	
}

 this.F4 = async function(dat)
{

var curTime  = new Date();
var responseStr='{"sys":"fish","cmd":"f6","data":{"1":"BG_05","timestamp":'+curTime.getTime()+',"2":2005}}';
var s=responseStr.length;
var ss=['0','0','0','0'];
ss.splice(0,s.toString().length);
responseL=ss.join("")+s;
var response=responseL+responseStr;
emitter.emit('outcomingMessage',response,false);		


	
}

 this.GetItemInfo = async function(dat)
{

var curTime  = new Date();
var responseStr='{"sys":"game","cmd":"init_game","data":{"timestamp":'+curTime.getTime()+',"bg":0,"event":null}}';
var s=responseStr.length;
var ss=['0','0','0','0'];
ss.splice(0,s.toString().length);
responseL=ss.join("")+s;
var response=responseL+responseStr;
emitter.emit('outcomingMessage',response,false);		

	
}

 this.InitGame = async function(dat)
{

var curTime  = new Date();
var responseStr='{"sys":"kiosk","data":{"data":{"NormalTable":[{"iTableID":1,"ArraySeat":[1,0,0,0]},{"iTableID":2,"ArraySeat":[0,0,0,0]},{"iTableID":3,"ArraySeat":[0,0,0,0]},{"iTableID":4,"ArraySeat":[0,0,0,0]},{"iTableID":5,"ArraySeat":[0,0,0,0]},{"iTableID":6,"ArraySeat":[0,0,0,0]}],"seat_id":0,"table_id":1,"result":0,"HighRollerTable":[]}},"sn":"'+curTime.getTime()+'","ret":"JoinTable"}';
var s=responseStr.length;
var ss=['0','0','0','0'];
ss.splice(0,s.toString().length);
responseL=ss.join("")+s;
var response=responseL+responseStr;
emitter.emit('outcomingMessage',response,false);		

	
}

 this.Auth = async function(dat)
{

var curTime  = new Date();
var responseStr='{"data":{"status":0},"sn":"'+curTime.getTime()+'","ret":"auth"}';
var s=responseStr.length;
var ss=['0','0','0','0'];
ss.splice(0,s.toString().length);
responseL=ss.join("")+s;
var response=responseL+responseStr;
emitter.emit('outcomingMessage',response,false);		
	
}
 this.Alive = async function(dat)
{

var curTime  = new Date();
var responseStr='{"sys":"lobby","cmd":"UpdateInfo","data":{"game_maintain_list":[],"msg_info":{},"game_version":{"PC":"1.11912.0","FireBall":"1.11371.0","FireStorm":"1.11371.0","PC_H5":"1278.3"}}}';
var s=responseStr.length;
var ss=['0','0','0','0'];
ss.splice(0,s.toString().length);
responseL=ss.join("")+s;
var response=responseL+responseStr;
emitter.emit('outcomingMessage',response,false);		
	
}

 this.JP = async function(dat)
{

var curTime  = new Date();
var responseStr='{"sys":"jp","data":{"data":{"jp_rate":"0.000001","exchange_rate":0.01,"jp1":0,"jp0":0,"jp3":0,"jp2":0},"result":"0"},"sn":"'+curTime.getTime()+'","ret":"jp"}';
var s=responseStr.length;
var ss=['0','0','0','0'];
ss.splice(0,s.toString().length);
responseL=ss.join("")+s;
var response=responseL+responseStr;
emitter.emit('outcomingMessage',response,false);		
	
}
/*-------------------------*/
/*-------------------------*/



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


/*-----------prepare hit--------------*/
 this.PrepareHit = async function(dat,isLock)
{
	

var isSpecial=false;
var curSpecId=-1;
var curSpecUId=0;
//	

var specialFishId=[];	

if(dat.data['7']!=undefined){
var targetFishes=dat.data['7'];	
}else{
var targetFishes=[dat.data['6']];	
}
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

await _self.Hit(dat,isLock);

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
 this.Hit = async function(dat,isLock)
{
	
var fullBombId=0;
var localBombId=0;
	
var curTime  = new Date();	
	
for(var cf in _self.sceneFishes){

if(curTime.getTime()-_self.sceneFishes[cf].fishTime>=30000){
	
delete _self.sceneFishes[cf];	
	
}	



}	
	
	
//0104{"sys":"weapon","cmd":"w2","sn":"1608022341003","data":{"1":"0_21","2":0,"7":["6022"],"9":5,"device":1}}	
	

	
var bet=dat.data['9']/100;
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

if(dat.data['7']!=undefined){
var targetFishes=dat.data['7'];	
}else{
var targetFishes=[dat.data['6']];	
}

var bulletId=dat.data['1'];
var gameBank=await sys.GetBank();	

/*full bomb*/

var fishDmgValue=1;

var isBomb=false;
var isBombId=0;



for(var fi=0; fi<targetFishes.length; fi++){

var cfish=targetFishes[fi];

console.log(_self.sceneFishes['fish_'+cfish]);

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
	
winsArr.push('"'+cfish+'":{"11":'+(Math.round(tmpWin*100))+',"10":'+_self.sceneFishes['fish_'+cfish].fishPay+',"13":{}}');		

	
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
	
if(isLock){
var responseStr='{"sys":"skill","cmd":"sk24","data":{"1":"","10":8,"3":0.0,"2":0,"17":false,"timestamp":'+curTime.getTime()+',"9":'+Math.round(bet*100)+',"8":{'+winsArr.join(',')+'}}}';		
}else{
var responseStr='{"sys":"weapon","cmd":"w2","data":{"1":"0_22","10":6,"3":0.0,"2":0,"17":false,"timestamp":'+curTime.getTime()+',"9":'+Math.round(bet*100)+',"8":{'+winsArr.join(',')+'}}}';		
}

var s=responseStr.length;
var ss=['0','0','0','0'];
ss.splice(0,s.toString().length);
responseL=ss.join("")+s;
var response=responseL+responseStr;
emitter.emit('outcomingMessage',response,false);		

}else{
	
	
if(isLock){
var responseStr='{"sys":"skill","cmd":"sk24","data":{"1":"","3":0.0,"2":0,"17":false,"6":'+dat.data['6']+',"9":'+Math.round(bet*100)+',"timestamp":'+curTime.getTime()+'}}';
}else{
var responseStr='{"sys":"weapon","cmd":"w2","data":{"1":"0_21","3":0.0,"2":0,"17":false,"9":'+Math.round(bet*100)+',"timestamp":'+curTime.getTime()+'}}';	
}
var s=responseStr.length;
var ss=['0','0','0','0'];
ss.splice(0,s.toString().length);
responseL=ss.join("")+s;
var response=responseL+responseStr;
emitter.emit('outcomingMessage',response,false);	
	
}


//////////////////////////////
//0110{"sys":"fish_player","cmd":"current_credit","data":{"timestamp":1608120532,"winnings":215.0,"entries":4850.0}}

var responseStr='{"sys":"fish_player","cmd":"refresh_credit","data":{"timestamp":'+curTime.getTime()+',"winnings":0.0,"entries":'+_self.gameBalanceInCents+'}}';
var s=responseStr.length;
var ss=['0','0','0','0'];
ss.splice(0,s.toString().length);
responseL=ss.join("")+s;
var response=responseL+responseStr;
emitter.emit('outcomingMessage',response,false);		
/////////////////////////////
var responseStr='{"sys":"fish_player","cmd":"current_credit","data":{"timestamp":'+curTime.getTime()+',"winnings":0.0,"entries":'+_self.gameBalanceInCents+'}}';
var s=responseStr.length;
var ss=['0','0','0','0'];
ss.splice(0,s.toString().length);
responseL=ss.join("")+s;
var response=responseL+responseStr;
emitter.emit('outcomingMessage',response,false);		
/////////////////////////////









 await sys.Commit();	
 sys.SaveLogReport({balance:endBalance,bet:bet,win:totalWin});	



	
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


_self.gameData.CurrentBet=5;
_self.gameData.min=5;	
_self.gameData.max=200;	



var responseStr='{"cmd":"join","data":{"ark_id":"11357450"}}';
var s=responseStr.length;
var ss=['0','0','0','0'];
ss.splice(0,s.toString().length);
responseL=ss.join("")+s;
var response=responseL+responseStr;
emitter.emit('outcomingMessage',response,false);	


var responseStr='{"sys":"game","cmd":"join_table","data":{"player_id":"11357450","game_id":"31725142","timestamp":'+curTime.getTime()+',"seat":0}}';
var s=responseStr.length;
var ss=['0','0','0','0'];
ss.splice(0,s.toString().length);
responseL=ss.join("")+s;
var response=responseL+responseStr;
emitter.emit('outcomingMessage',response,false);	


/*-----------------------------------*/	


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


_self.gameCommand=data.gameData.cmd;

//console.log('data.gameData ::: '+JSON.stringify(data.gameData));	

switch(_self.gameCommand){
	
case 'jp':

 _self.JP(data.gameData); 

break;		
case 'pin':

 _self.Pin(data.gameData); 

break;		
case 'alive':

 _self.Alive(data.gameData); 

break;		
case 'auth':

 _self.Auth(data.gameData); 

break;	




case 'update_player':

 _self.UpdatePlayer(data.gameData); 

break;

case 'update_bet':

 _self.UpdateBet(data.gameData); 

break;

case 'init_player':

 _self.InitPlayer(data.gameData); 

break;

case 'init_game':

 _self.InitGame(data.gameData); 

break;
	
case 'PlayerJoin':

 _self.PlayerJoin(data.gameData); 

break;	
case 'JoinTable':

 _self.EnterRoom(data.gameData); 

break;

case 'f4':

 _self.F4(data.gameData); 

break;
case 'f5':

 _self.F5(data.gameData); 

break;
case 'get_item_info':

 _self.GetItemInfo(data.gameData); 

break;
case 'w2':

 await  _self.PrepareHit(data.gameData,false); 

break;
case 'sk24':

 await  _self.PrepareHit(data.gameData,true); 

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
