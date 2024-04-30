
function FishHunterController() {

var _self = this;   


_self.fhcBullets=[];	
_self.fhcBalance=1110;	
_self.fhcBet=1;	
_self.fhcBetIs=0;	
	
this.OnFire=function(postData){
	
	
var result_tmp=[];

var bulletId=Math.round(Math.random()*1000000);





if(_self.fhcBalance<_self.fhcBet || _self.fhcBetIs!=0){

var bullets='';	

}else{
	
//_self.fhcBalance-=_self.fhcBet;	
	
var bullets=',"bullet":{"transactionId":"4623343b-db8d-442c-a032-7523aac41417","createTime":1584376468710,"areaId":"7909d963c43c6df71d7f7ee17bfc4b5133809d80342e2f645d01e16119eec1ad-connector-server-3","playerId":"d607e29f-99cc-48bc-a37d-5590b80fa0f6","bulletId":'+bulletId+',"angle":'+postData['query']['angle']+',"cost":'+_self.fhcBet+',"lockTargetId":'+postData['query']['lockId']+',"chairId":0,"cannonlevel":1,"cannonskin":1,"_id":"9dab0ea6-0cb0-4b8c-951a-e10077945f2b3584376468710","level":1}';	
	
//,"lockId":-8013309989836176	
//_self.fhcBullets.push(bulletId);	
	
}


 result_tmp[0]='{"answerType":"game.fire","responseView":[4,0,0,0,6,9],"msg":{"player":{"nickName":"","gender":1,"avatarUrl":"","gameServerId":"player-server-3","connectorId":"connector-server-3","teamId":"","gameId":"10007","tableId":"2ba04cc50c285a21b223e1043993456918e041415cac8ce29e72d3dc948474be-connector-server-3","gameState":"playing","id":"9dab0ea6-0cb0-4b8c-951a-e10077945f2b","areaId":"7909d963c43c6df71d7f7ee17bfc4b5133809d80342e2f645d01e16119eec1ad-connector-server-3","gold":'+(_self.fhcBalance*100)+',"delta":1,"gain":0,"cost":0,"ratio":1,"rmpRatioCredit":'+(_self.fhcBalance*100)+',"denom":0.01},"areaPlayer":{"id":"13879583b6558342be4b011cf849ee29989667afd2eb4c993a7f06371e78a2d4","areaId":"7909d963c43c6df71d7f7ee17bfc4b5133809d80342e2f645d01e16119eec1ad-connector-server-3","playerId":"d607e29f-99cc-48bc-a37d-5590b80fa0f6","cannonLevel":1,"cannonCost":'+(_self.fhcBet*100)+',"cannonMaxLen":18,"skin":1,"lockTargetId":0,"chairId":2}'+bullets+'}}';


result_tmp[1]='{"answerType":"game.colliderResult","responseView":[4,0,0,0,6,19],"msg":{"player":{"id":"d607e29f-99cc-48bc-a37d-5590b80fa0f6","gold":0,"delta":0,"gain":0,"cost":'+(_self.fhcBet*100)+',"rmpRatioCredit":'+((_self.fhcBalance)*100)+',"ratio":1},"result":[]}}';	


////// 



	
_self.fhcBetIs++;

if(_self.fhcBetIs>1){_self.fhcBetIs=0;return [];	}
	
return result_tmp;	
	
};	


this.DeleteBullet=function(bid){
	
var bPos=_self.fhcBullets.indexOf(bid);
	
if(bPos!=-1){	
_self.fhcBullets.slice(bPos,1);	
}


};	
	
	
return _self;	
	
}



module.exports = { FishHunterController }
