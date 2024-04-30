
  function System(emitter,sessionStorage,serverStorage,utils,queue,timezone) {

var _self = this;   
var  fs = require('fs');	
const  mysql = require("mysql2/promise");
var dbConfigStr = fs.readFileSync('../.env', 'utf8');
var dbConfig=[];
/*------parse env------*/
let dbConfigTmp=dbConfigStr.split("\n");
for(var cf=0; cf<dbConfigTmp.length; cf++){
	
var tcf	= dbConfigTmp[cf].split("=");
	
if(tcf[1]!=undefined){

dbConfig[tcf[0]]=tcf[1];
	
}	

	
}

/*---------------------------*/
this.startTimeSystem=0;
this.startTimeServer=0;

/*---------------------------*/
var moment = require('moment-timezone');
var conn;
 
 /////////////////
 _self.transactionTimeout=0;
 _self.transactionInProgress=0;
 
 _self.userId=-1;
 _self.shopId=-1;
 _self.userName=null;
 _self.bankType=null;
 _self.bankId=null;
 _self.gameBank=0;
 _self.gameName='';
 _self.lockedTables=[];
 _self.sessionId=0;
 _self.jpgs=[];
 
 _self.shopCurrency = '';
 _self.shopPercent = 0;
 _self.shopBlocked = 0;
 
 _self.Config={
  host: dbConfig.DB_HOST,
  user: dbConfig.DB_USERNAME,
  database: dbConfig.DB_DATABASE,
  password: dbConfig.DB_PASSWORD,
  prefix:dbConfig.DB_PREFIX
  
 };
 
 
 this.ConvertTime0=function(d2){

var d1=new Date().toLocaleString('en-US', {timeZone: timezone,hour12:false});

var tmpT=d1.split(',');
var tmpT0=tmpT[0].split('/');

var tmpT1=tmpT[1].split(':');

if(tmpT1[0]>=24 && (tmpT1[1]>0 || tmpT1[2]>0)){tmpT1[0]=0;}

///
for(var i=0; i<3;i++){
tmpT1[i]=parseInt(tmpT1[i]);
if(tmpT1[i]<10){tmpT1[i]='0'+tmpT1[i];}
	
}

var rtn=new Date(tmpT0[2]+"-"+tmpT0[0]+"-"+tmpT0[1]+"-"+tmpT1.join(":"));	
	
return rtn;
	 
 }
 
 this.ConvertTime1=function(d2){


var tmp0=d2.split(", ");
var tmp1=tmp0[0].split("/");

var tmpT1=tmp0[1].split(':');

if(tmpT1[0]>=24 && (tmpT1[1]>0 || tmpT1[2]>0)){tmpT1[0]=0;}

///
for(var i=0; i<3;i++){
tmpT1[i]=parseInt(tmpT1[i]);
if(tmpT1[i]<10){tmpT1[i]='0'+tmpT1[i];}
	
}


if(tmp1[0]<10){tmp1[0]='0'+tmp1[0].toString();}	
if(tmp1[1]<10){tmp1[1]='0'+tmp1[1].toString();}	

var st= tmp1[2]+"-"+tmp1[0]+"-"+tmp1[1]+" "+tmpT1.join(":");	
	
	
	
	
var d1=new Date(st);	
	
return d1;
	
 }

this.ConvertTime=function(d2){
	

	
var d1=new Date().toLocaleString('en-US', {timeZone: timezone,hour12:false});

var tmpT=d1.split(',');
var tmpT0=tmpT[0].split('/');
var tmpT1=tmpT[1].split(':');

if(tmpT1[0]>=24 && (tmpT1[1]>0 || tmpT1[2]>0)){tmpT1[0]=0;}

///
for(var i=0; i<3;i++){
tmpT1[i]=parseInt(tmpT1[i]);
if(tmpT1[i]<10){tmpT1[i]='0'+tmpT1[i];}
	
}


/////

if(tmpT0[0]<10){tmpT0[0]='0'+tmpT0[0];}
if(tmpT0[1]<10){tmpT0[1]='0'+tmpT0[0];}


	
return tmpT0[2]+"-"+tmpT0[0]+"-"+tmpT0[1]+" "+tmpT1.join(":");



}
//Create Connection
 this.CreateConnection = async function()
{
	
 conn = await mysql.createConnection({  
  host: _self.Config.host,
  user: _self.Config.user,
  database:  _self.Config.database,
  password:  _self.Config.password,
  enableKeepAlive:true
});

 _self.conn=conn;	

//console.log('CreateConnection');


}

//sess storage
this.SessionStorage=function(user,game,key,value=null){

var curTime  = new Date();

if(sessionStorage[user]==undefined){
sessionStorage[user]=[];	
}	

if(sessionStorage[user][game]==undefined){
sessionStorage[user][game]=[];	
}	

var ct=curTime.getTime();

for(var u in sessionStorage){

   for(var g in sessionStorage[u]){
     	
       for(var k in sessionStorage[u][g]){
     	
		try{
        if(sessionStorage[u][g][k].tl<ct){
		delete sessionStorage[u][g][k];
		}
		}catch(e){
		delete sessionStorage[u][g][k];	
		}
    	
        }	
    	
    }	
	
}


if(value!=null){

sessionStorage[user][game][key]={payload:value,tl:curTime.getTime()+7200000};	


	
}else{
	

	
if(sessionStorage[user][game][key]!=undefined){
return sessionStorage[user][game][key].payload;	
}else{
return undefined;	
}	
	

	
}



	
	
}



/////////////
this.ServerStorage=function(user,game,key,value=null){

var curTime  = new Date();

if(serverStorage[user]==undefined){
serverStorage[user]=[];	
}	

if(serverStorage[user][game]==undefined){
serverStorage[user][game]=[];	
}	

if(value!=null){
serverStorage[user][game][key]={payload:value};	
}else{


	
if(serverStorage[user][game][key]!=undefined){
return serverStorage[user][game][key].payload;	
}else{
return undefined;	
}	
	
}
	
	
}


//
 this.DestroyTransaction = function()
{

_self.Rollback();
_self.InternalError('Transaction timeout. Destroy connection.');	
 _self.transactionInProgress=0;
process.exit(22);		
}

//End Connection
 this.EndConnection = async function()
{
	
conn.destroy(); 	
_self.conn.destroy(); 	

	
}


//Debug
 this.Debug = function(limits,win,bank)
{
	
////////console.log('SumWin:: '+limits.sumWinLimit+' WinMeter:: '+limits.currentWinMeter+' Bank:: '+bank);	
	
}

//End Connection
 this.InternalError = function(msg)
{
	
var  strLog='';	


try{
strLog=fs.readFileSync('../storage/logs/'+_self.gameName+'_Internal.log', 'utf8');		
}catch(e){
strLog='';		
}

strLog +="\n";
strLog +='{"responseEvent":"error","responseType":"'+msg+'","serverResponse":"InternalError"}';
strLog +="\n";
strLog +=" ############################################### ";
strLog +="\n";	
	
fs.writeFileSync('../storage/logs/'+_self.gameName+'_Internal.log', strLog);		
	
	
emitter.emit('CloseSocket');
	
}
//End Connection
 this.InternalErrorLog = function(msg)
{
	

	
var  strLog='';	


try{
strLog=fs.readFileSync('../storage/logs/'+_self.gameName+'_Internal.log', 'utf8');		
}catch(e){
strLog='';		
}

strLog +="\n";
strLog +=msg;
strLog +="\n";
strLog +=" ############################################### ";
strLog +="\n";	

fs.writeFileSync('../storage/logs/'+_self.gameName+'_Internal.log', strLog);		
	
	

	
}
//lock tables
 this.SendQuery = async function(qs)
{

if(_self.conn==undefined){
await _self.CreateConnection();		
}

if(_self.conn.connection._closing){
 await _self.EndConnection();
await _self.CreateConnection();	
}	

try{
	
return [rows, fields] = await  _self.conn.query(qs);
}catch(e){

try{
await _self.EndConnection();
await _self.CreateConnection();	
return  [rows, fields] = await _self.conn.query(qs);	
}catch(e){


var detailError={
	
msg:e.message,	
stack:e.stack,	
q:qs,	
desc:'query error.',	
	
};	


this.InternalErrorLog(JSON.stringify(detailError));	
await _self.EndConnection();

emitter.emit('CloseSocket');	


}

}


}

//lock tables
 this.StartTransaction = async function(tables)
{

/*--------------*/
if(_self.conn.connection._closing){
 await _self.EndConnection();
await _self.CreateConnection();	
}
/*-------------*/

 var queryStr="set autocommit=0;";
  await _self.SendQuery(queryStr); 


 var queryStr="START TRANSACTION;";
 await _self.SendQuery(queryStr); 

 _self.transactionTimeout=setTimeout(_self.DestroyTransaction,3000);
 _self.transactionInProgress=1;	
  
};
//lock tables
 this.Commit = async function()
{
/*--------------*/
/*--------------*/

if(_self.conn.connection._closing){
 await _self.EndConnection();
await _self.CreateConnection();	
}
/*-------------*/
	

 var queryStr="COMMIT;";
  await _self.SendQuery(queryStr); 
  
clearTimeout( _self.transactionTimeout);
 _self.transactionInProgress=0;
};//lock tables 

this.Rollback = async function()
{
/*--------------*/
if(conn.connection._closing){
 await _self.EndConnection();
	
var s= async function (){
await _self.CreateConnection();		
};	
s();	

}
/*-------------*/

clearTimeout( _self.transactionTimeout);
 var queryStr="rollback;";
 _self.SendQuery(queryStr); 

};//lock tables

 this.SaveLogReport = async function(stat)
{

if(conn.connection._closing){
 await _self.EndConnection();
await _self.CreateConnection();	
}


var cTime=_self.ConvertTime(new Date());
 
var toGameBanks=_self.toGameBanks;
var toSlotJackBanks = _self.toSlotJackBanks;
var toSysJackBanks=_self.toSysJackBanks;
var betProfit=_self.betProfit;

let queryStr0="SELECT * FROM `"+_self.Config.prefix+"fish_bank` WHERE shop_id="+_self.shopId+" ;";
let [rows, fields] = await _self.SendQuery(queryStr0);


let queryStr_="SELECT * FROM `"+_self.Config.prefix+"game_bank` WHERE shop_id="+_self.shopId+"; ";
let [rows_, fields_] = await conn.execute(queryStr_);

var totalBank=rows_[0].slots*1+rows_[0].bonus*1+rows[0].fish*1+rows_[0].table_bank*1+rows_[0].little*1;



var queryStr="INSERT INTO `"+_self.Config.prefix+"stat_game` (`id`, `date_time`, `user_id`, `balance`, `bet`, `win`, `game`, `in_game`, `in_jpg`, `in_profit`, `denomination`, `slots_bank`, `bonus_bank`, `fish_bank`, `table_bank`, `little_bank`, `total_bank`, `shop_id`) VALUES (NULL , '"+cTime+"' , '"+_self.userId+"', '"+stat.balance+"', '"+stat.bet+"', '"+stat.win+"', '"+_self.gameName+"', '"+toGameBanks+"','"+toSlotJackBanks+"', '"+betProfit+"', '1', '"+rows_[0].slots+"', '"+rows_[0].bonus+"', '"+rows[0].fish+"', '"+rows_[0].table_bank+"', '"+rows_[0].little+"', '"+totalBank+"', '"+_self.shopId+"' );";

await _self.SendQuery(queryStr);
 _self.lockedTables=[];
 
/////////////////////////
/////////////////////////

var queryStr="UPDATE `"+_self.Config.prefix+"games` SET bids=bids+1 ,  stat_in = stat_in +'"+stat.bet+"' , stat_out = stat_out +'"+stat.win+"'  WHERE name = '"+_self.gameName+"' AND shop_id="+_self.shopId+"; ";

this.lastBet=stat.bet;
this.stat_in+=stat.bet;
this.stat_out+=stat.win;


this.ServerStorage(_self.shopId,_self.gameName,'stat_in',this.ServerStorage(_self.shopId,_self.gameName,'stat_in')+stat.bet);
this.ServerStorage(_self.shopId,_self.gameName,'stat_out',this.ServerStorage(_self.shopId,_self.gameName,'stat_out')+stat.win);


queue.emit('PutQuery',queryStr);

 _self.TournamentStat('bet', _self.userId, stat.bet, stat.win);
/////////////////////////
/////////////////////////
	
};

//set count balance 
 this.SetCountBalance = async function(sum,bet)
{

/*--------------*/
if(conn.connection._closing){
 await _self.EndConnection();
await _self.CreateConnection();	
}
/*-------------*/

/*---------------------*/
/*--------------------------------*/

if(bet>0){

bbet0=Math.abs(bet);
if(_self.count_balance == 0){
	
var sm=Math.abs(bet);	

   if(_self.address<sm && _self.address>0){
	
	
	_self.address=0;
	}else if(_self.address>0 ){
		
		_self.address-=sm;
		
	}



}else if(_self.count_balance>0 && bbet0 > _self.count_balance){
	
	
	sm=bbet0-_self.count_balance;
	
   if(_self.address<sm && _self.address>0){
	
	
	_self.address=0;
	}else if(_self.address>0  ){
		
		_self.address-=sm;
		
	}	
	
	
}

}

/*---------------------------------------------*/

if(_self.count_balance<=0 && bet>0){


_self.count_tournaments-=bet;if(_self.count_tournaments<=0){_self.count_tournaments=0;}
_self.count_happyhours-=bet;if(_self.count_happyhours<=0){_self.count_happyhours=0;}
_self.count_refunds-=bet;if(_self.count_refunds<=0){_self.count_refunds=0;}
_self.count_progress-=bet;if(_self.count_progress<=0){_self.count_progress=0;}
_self.count_daily_entries-=bet;if(_self.count_daily_entries<=0){_self.count_daily_entries=0;}
_self.count_invite-=bet;if(_self.count_invite<=0){_self.count_invite=0;}
_self.count_welcomebonus-=bet;if(_self.count_welcomebonus<=0){_self.count_welcomebonus=0;}
_self.count_smsbonus-=bet;if(_self.count_smsbonus<=0){_self.count_smsbonus=0;}
_self.count_wheelfortune-=bet;if(_self.count_wheelfortune<=0){_self.count_wheelfortune=0;}

}
	
var queryStr="UPDATE `"+_self.Config.prefix+"users` SET count_tournaments = '"+_self.count_tournaments+"', count_happyhours = '"+_self.count_happyhours+"', count_refunds = '"+_self.count_refunds+"', count_progress = '"+_self.count_progress+"', count_daily_entries = '"+_self.count_daily_entries+"', count_invite = '"+_self.count_invite+"', address = '"+utils.FixNumber(_self.address)+"' , count_welcomebonus = '"+_self.count_welcomebonus+"', count_smsbonus = '"+_self.count_smsbonus+"', count_wheelfortune = '"+utils.FixNumber(_self.count_wheelfortune)+"', count_balance = count_balance + ("+sum+")  WHERE id="+_self.userId+"; ";
//////console.log(queryStr);
await _self.SendQuery(queryStr);
	
	
};

//////////////////////////////////
//////////////////////////////////
//////////////////////////////////

 this.UpdateLevel=async function (type, sum){

//console.log('_self.progress_active',_self.progress_active);
if(_self.progress_active!=1){
return false;	
}

/*------------*/


var qs="SELECT * FROM `"+_self.Config.prefix+"progress` WHERE `shop_id`="+_self.shopId+" AND `rating`="+ (_self.userRating+1)+"; ";	
var [r, f] = await _self.SendQuery(qs);

/*------------*/

        var progress = r[0];

var cTime=_self.ConvertTime(new Date());

        if(progress!=undefined){
			
			var qs="SELECT * FROM `"+_self.Config.prefix+"progress_users` WHERE `user_id`="+_self.userId+" AND `rating`="+progress.rating+" ORDER BY id DESC  ;";	
            var [r, f] = await _self.SendQuery(qs);
			
            var progressUser = r[0];

            if(r[0]==undefined){
				
				qs="INSERT INTO `"+_self.Config.prefix+"progress_users` (`id`, `user_id`, `rating`, `sum`, `spins`, `progress_id`) VALUES (NULL, '"+_self.userId+"', '"+progress.rating+"', '0.0000', '0', '"+progress.id+"');";
				await _self.SendQuery(qs);
				
                progressUser = {
					
				user_id:_self.userId,
				rating:progress.rating,
				sum:0.0000,
				spins:0,
				progress_id:progress.id
				
				};
				
				
            }

            if(type == 'balance'){
                if( progress.type == 'one_pay' && sum >= progress.sum ){
                    progressUser.sum=sum;
                }
                if( progress.type == 'sum_pay' ){
                    progressUser.sum=progressUser.sum + sum;
                }
            }

            if(type == 'bet'){
                if( parseFloat(sum) >= parseFloat(progress.bet) ){
                    progressUser.spins++;
					var queryStr="UPDATE `"+_self.Config.prefix+"progress_users` SET spins = '"+progressUser.spins+"'  WHERE user_id="+_self.userId+" AND `rating`="+progress.rating+"; ";	
					await _self.SendQuery(queryStr);
                }
            }

            if( parseInt(progressUser.spins) >=parseInt(progress.spins) && parseFloat(progressUser.sum) >= parseFloat(progress.sum) ){
                _self.userRating++;

                if( progress.bonus > 0 ){
					
					var pbonus=parseFloat(progress.bonus)*parseFloat(progress.wager);
					
					var queryStr="UPDATE `"+_self.Config.prefix+"users` SET rating = '"+_self.userRating+"', balance = balance + ("+pbonus+"), progress = progress + ("+pbonus+"), count_progress = count_progress + ("+pbonus+"), address = address + ("+pbonus+")  WHERE id="+_self.userId+"; ";
					
					
					var q1="INSERT INTO `"+_self.Config.prefix+"messages` (`id`, `user_id`, `type`, `value`, `status`, `shop_id`, `created_at`, `updated_at`) VALUES (NULL, '"+_self.userId+"', 'progress', '"+pbonus+"', '1', '"+_self.shopId+"', '"+cTime+"', '"+cTime+"');";
					
					var q2="INSERT INTO `"+_self.Config.prefix+"statistics` (`id`, `title`, `user_id`, `payeer_id`, `system`, `old`, `sum`, `sum2`, `type`, `item_id`, `status`, `shop_id`, `created_at`, `updated_at`) VALUES(NULL, 'PB', "+_self.userId+", "+_self.parentId+", 'progress', '0.0000', '"+pbonus+"', NULL, 'add', NULL, 1, "+_self.shopId+", '"+cTime+"', '"+cTime+"');";
					
			_self.address+=pbonus;
					
					var [rows, fields] = await _self.SendQuery(queryStr);
					queue.emit('PutQuery',q1);
					queue.emit('PutQuery',q2);
					
             //////console.log('PB1',queryStr);
             //////console.log('PB2',rows);
        
                }else{
				var queryStr="UPDATE `"+_self.Config.prefix+"users` SET rating = '"+_self.userRating+"'  WHERE id="+_self.userId+"; ";	
				var [rows, fields] = await _self.SendQuery(queryStr);
				}

             

            }

        }

        return true;

    }


//////////////////////////////////
//////////////////////////////////
//////////////////////////////////


//update jackpots
 this.GetJackpots = async function(lock=false)
{
/*--------------*/
if(conn.connection._closing){
 await _self.EndConnection();
await _self.CreateConnection();	
}
/*-------------*/
if(lock){
var queryStr="SELECT * FROM `"+_self.Config.prefix+"jpg`  WHERE `shop_id`="+_self.shopId+"  FOR UPDATE  ;  ";
}else{
var queryStr="SELECT * FROM `"+_self.Config.prefix+"jpg`  WHERE `shop_id`="+_self.shopId+" ;  ";	
}
let [rows, fields] = await _self.SendQuery(queryStr);

_self.jpgs=rows;

	
};


//update jackpots
 this.UpdateJackpots = async function(bet)
{



var count_balance=await _self.GetCountBalance();


	
if(count_balance>0 && count_balance<bet){
var  queryStr="UPDATE `"+_self.Config.prefix+"jpg` SET `balance` = `balance`+("+(utils.FixNumber(count_balance))+"/100*`percent`) WHERE shop_id="+_self.shopId+"; ";

queue.emit('PutQuery',queryStr);

}else if(count_balance>0){
var  queryStr="UPDATE `"+_self.Config.prefix+"jpg` SET `balance` = `balance`+("+(utils.FixNumber(bet))+"/100*`percent`) WHERE shop_id="+_self.shopId+"; ";
queue.emit('PutQuery',queryStr);

}

var randPS=utils.RandomInt(0,10);

var queryStr="SELECT *  FROM `"+_self.Config.prefix+"jpg` WHERE  shop_id="+_self.shopId+";   ";
var [rows, fields] = await _self.SendQuery(queryStr);

for(var i=0; i<rows.length; i++){

if(rows[i]!=undefined){
	
	
	
var cTime=_self.ConvertTime();	
var psArr=[[0,0],[10,20],[20,30],[30,40],[40,50],[50,60],[100,110],[200,210],[300,310],[400,410],[500,510],[1000,1010],[2000,2010],[3000,3010],[4000,4010],[5000,5010],[10000,10010]];	

var sbArr=[[1,5],[5,10],[10,50],[50,100],[100,1000]];	

var psum=utils.RandomInt(psArr[rows[i].pay_sum][0],psArr[rows[i].pay_sum][1]);	
var bssum=utils.RandomInt(sbArr[rows[i].start_balance][0],sbArr[rows[i].start_balance][1]);	
var bssum_min=sbArr[rows[i].start_balance][0];	
	
//////////////////////////////////////////////////	
	
var jackAccept=true;	
	
if(rows[i].user_id!=undefined && rows[i].user_id!='' && rows[i].user_id!='NULL'){

if(rows[i].user_id!=_self.userName){
	jackAccept=false;	
}
	
}		
	
	
if(rows[i].balance>=psum && rows[i].pay_sum>0 && jackAccept){	
	


var  queryStr0="UPDATE `"+_self.Config.prefix+"jpg` SET `balance` = balance - ("+psum+") WHERE shop_id="+_self.shopId+" AND id="+rows[i].id+" ";	

var  queryStr1="UPDATE `"+_self.Config.prefix+"users` SET balance = balance + ("+(psum)+")  WHERE id="+_self.userId+"; ";
rows[i].balance-=psum;

var stat={
	
	win:psum,
	balance:(await _self.GetBalance()+psum),
	
	};

var queryStr2="INSERT INTO `"+_self.Config.prefix+"stat_game` (`id`, `date_time`, `user_id`, `balance`, `bet`, `win`, `game`, `in_game`, `in_jpg`, `in_profit`, `denomination`, `slots_bank`, `bonus_bank`, `fish_bank`, `table_bank`, `little_bank`, `total_bank`, `shop_id`) VALUES (NULL , '"+cTime+"' , '"+_self.userId+"', '"+stat.balance+"', '"+0+"', '"+stat.win+"', '"+_self.gameName+" JPG "+rows[i].id+"', '"+0+"','"+0+"', '"+0+"', '1', '"+0+"', '"+0+"', '"+0+"', '"+0+"', '"+0+"', '"+0+"', '"+_self.shopId+"');";

 
queue.emit('PutQuery',queryStr1);
queue.emit('PutQuery',queryStr2);
await _self.SendQuery(queryStr0);	


	}


if(rows[i].balance<bssum_min){
var  queryStr0="UPDATE `"+_self.Config.prefix+"jpg` SET `balance` = balance + ("+bssum+") WHERE shop_id="+_self.shopId+" AND id="+rows[i].id+" ";	
var q2="INSERT INTO `"+_self.Config.prefix+"statistics` (`id`, `title`, `user_id`, `payeer_id`, `system`, `old`, `sum`, `sum2`, `type`, `item_id`, `status`, `shop_id`, `created_at`, `updated_at`) VALUES(NULL, 'JPG "+rows[i].id+"', '1' , NULL, 'jpg', '0.0000', '"+bssum+"', NULL, 'add', NULL, 1, "+_self.shopId+", '"+cTime+"', '"+cTime+"');";

var q3="INSERT INTO `"+_self.Config.prefix+"statistics_add` (`id`, `agent_in`, `agent_out`, `distributor_in`, `distributor_out`, `type_in`, `type_out`, `credit_in`, `credit_out`, `money_in`, `money_out`, `statistic_id`, `user_id`, `shop_id`, `created_at`, `updated_at`) VALUES (NULL, NULL, NULL, NULL, NULL, '"+bssum+"', NULL, NULL, NULL, NULL, NULL, LAST_INSERT_ID(), '1', '"+_self.shopId+"', '"+cTime+"', '"+cTime+"');";



 await _self.SendQuery(queryStr0);
 queue.emit('PutQuery',q2);
 queue.emit('PutQuery',q3);
 
 
}

	
}

}
	
};


//get limit state 
 this.GetLimits = async function(lmStr)
{
/*--------------*/
if(conn.connection._closing){
 await _self.EndConnection();
await _self.CreateConnection();	
}
/*-------------*/
let queryStr="SELECT advanced FROM `"+_self.Config.prefix+"games` WHERE name = '"+_self.gameName+"' AND shop_id="+_self.shopId+"   FOR UPDATE  ;  ";
let [rows, fields] = await _self.SendQuery(queryStr);

return rows[0].advanced;
	
};

//set balance 
 this.SetBalance = async function(sum)
{
sum=utils.FixNumber(sum);
/*--------------*/
if(conn.connection._closing){
 await _self.EndConnection();
await _self.CreateConnection();	
}
/*-------------*/	

if(sum<0){
var cTime=_self.ConvertTime(new Date());	
var queryStr="UPDATE `"+_self.Config.prefix+"users` SET last_bid = '"+cTime+"' , last_progress = '"+cTime+"' , balance = balance + ("+sum+")  WHERE id="+_self.userId+"; ";		
}else{
var queryStr="UPDATE `"+_self.Config.prefix+"users` SET  balance = balance + ("+sum+")  WHERE id="+_self.userId+"; ";	

}



await _self.SendQuery(queryStr);
	
	
};

//get count balance 
 this.GetCountBalance = async function()
{
/*--------------*/
if(conn.connection._closing){
 await _self.EndConnection();
await _self.CreateConnection();	
}
/*-------------*/
let queryStr="SELECT *  FROM `"+_self.Config.prefix+"users` WHERE id="+_self.userId+"   FOR UPDATE  ;  ";
let [rows, fields] = await _self.SendQuery(queryStr);

 _self.count_tournaments=rows[0].count_tournaments;
 _self.count_happyhours=rows[0].count_happyhours;
 _self.count_refunds=rows[0].count_refunds;
 _self.count_progress=rows[0].count_progress;
 _self.count_daily_entries=rows[0].count_daily_entries; 
 _self.count_invite=rows[0].count_invite;
 _self.count_balance=rows[0].count_balance;
 _self.address=rows[0].address;
 _self.count_welcomebonus=rows[0].count_welcomebonus;
 _self.count_smsbonus=rows[0].count_smsbonus;
 _self.count_wheelfortune=rows[0].count_wheelfortune;
 
 if( _self.address==null){
 _self.address=0;	 
 }
 
  _self.address=utils.FixNumber( _self.address);
 
 _self.userRating=rows[0].rating;
 _self.parentId=rows[0].parent_id;

return utils.FixNumber(rows[0].count_balance);

};
//get balance 
 this.GetBalance = async function()
{
/*--------------*/
if(conn.connection._closing){
 await _self.EndConnection();
await _self.CreateConnection();	
}
/*-------------*/
let queryStr="SELECT balance  FROM `"+_self.Config.prefix+"users` WHERE id="+_self.userId+";  ";
let [rows, fields] = await _self.SendQuery(queryStr);

return utils.FixNumber(rows[0].balance);

};
//get balance 
 this.GetBalanceB = async function()
{
/*--------------*/
if(conn.connection._closing){
 await _self.EndConnection();
await _self.CreateConnection();	
}
/*-------------*/
let queryStr="SELECT balance  FROM `"+_self.Config.prefix+"users` WHERE id="+_self.userId+"   FOR UPDATE  ;  ";
let [rows, fields] = await _self.SendQuery(queryStr);

return utils.FixNumber(rows[0].balance);

};


//get bank 
 this.SetBank = async function(sum,slotEvent,requestId='')
{
/*--------------*/
if(conn.connection._closing){
 await _self.EndConnection();
await _self.CreateConnection();	
}

/*-------------*/


var cBank=await _self.gameBank;	
let decSum=cBank+sum;	

if(decSum<0){
_self.Rollback(); 
_self.InternalError('Invalid bank value : '+decSum+' . '+'Current Bank : '+cBank+' . '+' Sum:  '+sum);
return;
}	



/*---------------------------------------------*/
/*---------------------------------------------*/
/*---------------------------------------------*/


/*---------------------------------------------*/
var bbet =utils.FixNumber((sum / _self.shopPercent) * 100);
var count_balance = await _self.GetCountBalance();
_self.betRemains=undefined;
_self.betRemains0=undefined;

if(sum>0 && slotEvent=='bet'){
	
	
if(_self.count_balance == 0 && _self.address>0){
_self.shopPercent=0;	
}else if(_self.count_balance == 0){
_self.shopPercent=100;		
}else{
_self.shopPercent=_self.shopPercentRaw;		
}

if(_self.count_balance == 0){
	
var remains=[];
_self.betRemains=0;	
var sm=Math.abs(bbet);	
if(_self.address<sm && _self.address>0){
	
	
	remains[0]=sm-_self.address;
	_self.betRemains=remains[0];	
	}
	



}



/*---------------------------------------------*/


if(_self.count_balance>0 && bbet>_self.count_balance){
	
var remains0=[];
var sm_=bbet;	
var tmpSum=sm_-_self.count_balance;
_self.betRemains0=tmpSum;	


if(_self.address > 0 ){
	
_self.betRemains0=0;		

if(_self.address<tmpSum && _self.address>0){
	
	remains0[0]=tmpSum-_self.address;
	_self.betRemains0=remains0[0];	
	
	}




		
	
}




	
}


}
/*---------------------------------------------*/
/*---------------------------------------------*/
/*---------------------------------------------*/

//////console.log('_self.betRemains0  ',_self.shopPercent,sum,bbet,_self.count_balance,_self.betRemains0,_self.betRemains);


///////////////////////////////////////////////////
if(_self.shopPercent>0){
/*-------------*/

if(sum>0 && slotEvent=='bet'){

			_self.toGameBanks=0;
			_self.toSlotJackBanks=0;
			_self.toSysJackBanks=0;
			_self.betProfit=0;
			prc=_self.shopPercent;


			
			
			
			gameBet = (sum / prc) * 100;
			
			await _self.UpdateLevel('bet',gameBet);

			if(count_balance < gameBet && count_balance > 0 ){
				var firstBid = count_balance;
				var secondBid = gameBet - firstBid;
				
				if(_self.betRemains0!=undefined){
				secondBid=_self.betRemains0;	
				}
				
				bankSum=(firstBid/100)*_self.shopPercent;
                sum=bankSum+ secondBid;
			}

              for (i = 0; i < _self.jpgs.length; i++) {

                if( count_balance < gameBet && count_balance >0){

                     _self.toSlotJackBanks+=(count_balance / 100) * _self.jpgs[i].percent;

                     }else if(count_balance >0){

                    _self.toSlotJackBanks+=(gameBet / 100) * _self.jpgs[i].percent;

                     }

                }

			_self.toGameBanks=sum;
			_self.betProfit=gameBet -_self.toGameBanks-_self.toSlotJackBanks-_self.toSysJackBanks;



if(count_balance<gameBet && count_balance>0){
	
await _self.SetCountBalance(-count_balance,gameBet);	
	
}else if(count_balance>0){
	
await _self.SetCountBalance(-gameBet,gameBet);	

}else{
await _self.SetCountBalance(0,gameBet);		
}


if(count_balance<=0 || (count_balance<gameBet && count_balance>0)){
_self.shopPercent=100;	
}



		}



		if(sum>0 && slotEvent=='bet'){

			_self.toGameBanks=sum;

		}



////////////////////////////////////////////
////////////////////////////////////////////










}else {


/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
			_self.toGameBanks=0;
			_self.toSlotJackBanks=0;
			_self.toSysJackBanks=0;
			_self.betProfit=0;


			
			var gameBet = sum ;
			


if(count_balance<gameBet && count_balance>0){
	
await _self.SetCountBalance(-count_balance,gameBet);	
	
}else if(count_balance>0){
	
await _self.SetCountBalance(-gameBet,gameBet);	

}else {
	
await _self.SetCountBalance(0,gameBet);	

}



	
	
}



/*-----------------*/
if(_self.shopPercent==0 && slotEvent=='bet' &&  _self.betRemains!=undefined){
sum=_self.betRemains;
}
/*----------------*/


if(sum!=0){
	
	
let btype='fish';
let queryStr="UPDATE `"+_self.Config.prefix+"fish_bank` SET "+btype+" = "+btype+"+("+utils.FixNumber(sum)+") WHERE id="+_self.bankId+"; ";

//////console.log(queryStr);

let [rows, fields] = await _self.SendQuery(queryStr);	
}

return true;

};

//get bank 
 this.GetBank = async function(noLimit=false)
{
/*--------------*/
if(conn.connection._closing){
 await _self.EndConnection();
await _self.CreateConnection();	
}
/*-------------*/
let queryStr="SELECT * FROM `"+_self.Config.prefix+"fish_bank` WHERE id="+_self.bankId+"  FOR UPDATE  ;  ";
let [rows, fields] = await _self.SendQuery(queryStr);



/*----------------------*/

_self.gameBank=rows[0]['fish'];

/*----------------------*/





var stat_in=utils.FixNumber(this.ServerStorage(_self.shopId,_self.gameName,'stat_in'));
var stat_out=utils.FixNumber(this.ServerStorage(_self.shopId,_self.gameName,'stat_out'));


if(this.ServerStorage(_self.shopId,_self.gameName,'spinWinLimit')==undefined){
	
this.ServerStorage(_self.shopId,_self.gameName,'spinWinLimit',0);	
this.ServerStorage(_self.shopId,_self.gameName,'spinWinLimit0',0);	
this.ServerStorage(_self.shopId,_self.gameName,'spinWinLimit1',0);	
	
}


	
if(stat_out>(stat_in+this.ServerStorage(_self.shopId,_self.gameName,'spinWinLimit1')) && this.ServerStorage(_self.shopId,_self.gameName,'spinWinLimit')<=0){



this.ServerStorage(_self.shopId,_self.gameName,'spinWinLimit',utils.RandomInt(100,200));
this.ServerStorage(_self.shopId,_self.gameName,'spinWinLimit0',utils.RandomInt(1,5));
this.ServerStorage(_self.shopId,_self.gameName,'spinWinLimit1',utils.RandomInt(2,5));

}





if( this.ServerStorage(_self.shopId,_self.gameName,'spinWinLimit')>0 && !noLimit){
var rbnull=utils.RandomInt(1,3);

if(rbnull!=1){
rows[0]['fish']=0;	
}else if( this.lastBet*this.ServerStorage(_self.shopId,_self.gameName,'spinWinLimit0') < rows[0]['fish']){
rows[0]['fish']=this.lastBet*this.ServerStorage(_self.shopId,_self.gameName,'spinWinLimit0') ;	
}

if(stat_out<=stat_in){
 this.ServerStorage(_self.shopId,_self.gameName,'spinWinLimit', this.ServerStorage(_self.shopId,_self.gameName,'spinWinLimit')-1);	
}



}


/*
*/


/*----------------------*/







return utils.FixNumber(rows[0]['fish']);

};

//get settings 
 this.GetSettings = async function()
{
/*--------------*/
if(conn.connection._closing){
 await _self.EndConnection();
await _self.CreateConnection();	
}
/*-------------*/	
let queryStr0="SELECT * FROM `"+_self.Config.prefix+"shops` WHERE  id="+_self.shopId+" ; ";
let [rows0, fields0] = await _self.SendQuery(queryStr0);	

let queryStrB="SELECT id FROM `"+_self.Config.prefix+"fish_bank` WHERE  shop_id="+_self.shopId+" ; ";
let [rowsB, fieldsB] = await _self.SendQuery(queryStrB);	


_self.bankId=rowsB[0].id;
 _self.shopCurrency = rows0[0].currency;
 _self.shopPercent = rows0[0].percent;
 _self.shopPercentRaw = rows0[0].percent;
 _self.shopBlocked = rows0[0].is_blocked;
_self.MaxWin=rows0[0].max_win;
_self.progress_active=rows0[0].progress_active;

let count_balance = await _self.GetCountBalance();

if(count_balance<=0){
_self.shopPercent=100;	
}

await _self.GetJackpots(false);



let queryStr="SELECT * FROM `"+_self.Config.prefix+"games` WHERE name = '"+_self.gameName+"' AND shop_id="+_self.shopId+" ;  ";
let [rows, fields] = await _self.SendQuery(queryStr);



this.game_id=rows[0].id;


this.stat_in=utils.FixNumber(parseFloat(rows[0].stat_in));
this.stat_out=utils.FixNumber(parseFloat(rows[0].stat_out));

 var qs="SELECT * FROM `"+_self.Config.prefix+"games` WHERE name = '"+_self.gameName+"' AND shop_id=0 ;  ";
 var [r, f] = await _self.SendQuery(qs);

 qs="SELECT * FROM `"+_self.Config.prefix+"game_categories` WHERE game_id = '"+r[0].id+"'  ;  ";
 [r, f] = await _self.SendQuery(qs);

this.game_cat=[];

for(var ri=0; ri<r.length; ri++){
this.game_cat[ri]=r[ri].category_id;	
}



if(this.ServerStorage(_self.shopId,_self.gameName,'stat_in')==undefined){
	
this.ServerStorage(_self.shopId,_self.gameName,'stat_in',this.stat_in);
this.ServerStorage(_self.shopId,_self.gameName,'stat_out',this.stat_out);
	
}


return rows[0];


};


/*Tournaments*/
/*-------------------*/
/*-------------------*/
/*-------------------*/
this.TournamentStat= async function(slotState, user_id, bet, win){

        
		var cTime=_self.ConvertTime(new Date());
		
		
		var tmpUsername=_self.userName.split("");
		tmpUsername[utils.RandomInt(0,tmpUsername.length-1)]="*";
		tmpUsername[utils.RandomInt(0,tmpUsername.length-1)]="*";
		tmpUsername[utils.RandomInt(0,tmpUsername.length-1)]="*";
		tmpUsername[utils.RandomInt(0,tmpUsername.length-1)]="*";
		tmpUsername[utils.RandomInt(0,tmpUsername.length-1)]="*";
		tmpUsername=tmpUsername.join("");
	/*	
		*/
	
		
		var queryStr="SELECT * FROM `"+_self.Config.prefix+"tournaments` WHERE shop_id="+_self.shopId+" ;  ";
		var [rows, fields] = await _self.SendQuery(queryStr);
		var tournament;



        if( rows[0]!=undefined ){
            for (var i=0; i< rows.length; i++){

             tournament=rows[i];




var options = {  year: 'numeric', month: 'numeric', day: 'numeric' ,hour: 'numeric' ,minute: 'numeric' ,second: 'numeric' ,hour12:false};

var cti=_self.ConvertTime0();
var sti=_self.ConvertTime1(tournament.start.toLocaleDateString("en-US",options));
var eti=_self.ConvertTime1(tournament.end.toLocaleDateString("en-US",options));

////console.log(cti<sti,cti>eti,bet < tournament.bet);

if(cti<sti){
continue;	
}

if(cti>eti){
continue;	
}
               

                if( bet < tournament.bet ){
                    continue;
                }

/////////////////////////////

if(tournament.games_selected==1){

var queryStr="SELECT * FROM `"+_self.Config.prefix+"tournament_games` WHERE game_id = '"+_self.game_id+"' AND tournament_id="+tournament.id+" ;  ";
		var [r, f] = await _self.SendQuery(queryStr);
		
		if(r[0]==undefined){
		continue;	
		}
		
	
}else{

var queryStr="SELECT * FROM `"+_self.Config.prefix+"tournament_categories` WHERE category_id IN ("+_self.game_cat.join(',')+") AND tournament_id="+tournament.id+" ;  ";
////console.log(queryStr);
		var [r, f] = await _self.SendQuery(queryStr);
		

		
		if(r[0]==undefined){
		continue;	
		}	
	
}
////////////////////////////
             
			  var queryStr="SELECT * FROM `"+_self.Config.prefix+"tournament_stats` WHERE tournament_id = '"+tournament.id+"' AND is_bot = 0 AND user_id="+user_id+";  ";
              var [rows0, fields0] = await _self.SendQuery(queryStr);
			  var stat = rows0[0];
			  
                if(stat==undefined){
                 
				 
				 
				 var qs="INSERT INTO `"+_self.Config.prefix+"tournament_stats` (`id`, `tournament_id`, `user_id`,`username`, `is_bot`, `spins`, `sum_of_bets`, `sum_of_wins`, `points`, `prize_id`, `created_at`, `updated_at`) VALUES (NULL, '"+tournament.id+"', '"+user_id+"','"+tmpUsername+"', '0', '0', '0.0000', '0.0000', '0.0000', '0', '"+cTime+"', '"+cTime+"');";
				queue.emit('PutQuery',qs); 
				//await _self.SendQuery(qs);
			
				
					stat={
						
					tournament_id :	tournament.id,
					user_id :	user_id,
					is_bot :	0,
					sum_of_bets :	0,
					sum_of_wins :	0,
					spins :	0,
					prize_id :	0,
					points :	0,
					created_at :	cTime,
					updated_at :	cTime
						
					};
					
                }

                stat.sum_of_bets=bet;
                stat.sum_of_wins=win;
                stat.spins++;
var pinc = 0;
                switch (tournament.type){
                    case 'amount_of_bets':
                        pinc+=bet;
                        break;
                    case 'amount_of_winnings':
                       pinc+=win;
                        break;
                    case 'win_to_bet_ratio':
                        pinc+=(win/bet);
                        break;
                    case 'profit':
                        pinc+=(win - bet);
                        break;
                }
				
				/*update tournament stat*/
				
				
				
				  var queryStr="UPDATE `"+_self.Config.prefix+"tournament_stats` SET  `updated_at` = '"+cTime+"', `spins` = `spins`+1 , `sum_of_bets` = `sum_of_bets`+ "+stat.sum_of_bets+", `sum_of_wins` = `sum_of_wins` + "+stat.sum_of_wins+", `points` = `points` + "+pinc+" WHERE  user_id = "+user_id+" AND tournament_id="+tournament.id+" ; ";
                 queue.emit('PutQuery',queryStr); 

            }
        }



    }
/*--------------------------*/
/*--------------------------*/
/*--------------------------*/
//
 this.ClearTicker = async function(){
	 
clearInterval(_self.activeTicker);	 
	 
 };
 
//
 this.CheckActive = async function()
{

if(_self.transactionInProgress){
return;	
}

var queryStr2="SELECT * FROM `"+_self.Config.prefix+"users` WHERE id="+_self.userId+"; ";
var [rows2, fields2] = await _self.SendQuery(queryStr2);	

var userBlocked=rows2[0].is_blocked;
var userStatus=rows2[0].status;



if(rows2[0]==undefined || userBlocked==1 || userStatus=='Banned'){
emitter.emit('CloseSocket');	
return;
}


var queryStr1="SELECT * FROM `"+_self.Config.prefix+"shops` WHERE  id="+_self.shopId+" ; ";
var [rows1, fields1] = await _self.SendQuery(queryStr1);	

_self.progress_active=rows1[0].progress_active;
var shopBlocked=rows1[0].is_blocked;

let queryStr="SELECT active FROM `"+_self.Config.prefix+"subsessions` WHERE user_id = '"+_self.userId+"' AND subsession="+_self.sessionId+" ;  ";
let [rows, fields] = await _self.SendQuery(queryStr);

if(rows[0]==undefined || _self.userId==-1 || shopBlocked==1){
emitter.emit('CloseSocket');	
return;
}

let sessActive=rows[0]['active'];

let queryStr0="SELECT view FROM `"+_self.Config.prefix+"games` WHERE name = '"+_self.gameName+"' AND shop_id="+_self.shopId+" ;  ";
let [rows0, fields0] = await _self.SendQuery(queryStr0);

let gameView=rows0[0]['view'];





if(!sessActive || gameView!=1){
emitter.emit('CloseSocket');	
}
	
}

//get userId and shopId
 this.Auth = function(cookie,gameURL,sessionId)
{



_self.sessionId=sessionId;

let param={
command:"CheckAuth"
};
let request = require('request');
let paramStr=JSON.stringify(param);



let options = {
  method: 'post',
  body: param, 
  json: true, 
  rejectUnauthorized: false,
  requestCert: false,
  agent: false,
  url: gameURL,
  headers: {
	'Connection': 'keep-alive',
	"Content-Type": "application/json",
	'Content-Length': paramStr.length,
    'Cookie': cookie
  }
}


request(options, function (err, res, body) {
 
console.error('AuthResponse',body);
 
try{

if(body.responseEvent=='CheckAuth'){
	
var st=new Date();	
	
_self.userId= body.userId;
_self.shopId= body.shop_id;
_self.userName= body.username;
_self.startTimeSystem= body.startTimeSystem;
_self.startTimeServer= st.getTime();
emitter.emit('AuthAccept');	
}else{
emitter.emit('Error','AuthError');
}

}catch(er){
	
emitter.emit('Error','AuthError');	
	
}



});


};

_self.activeTicker=setInterval(_self.CheckActive,5000);
	
return _self;	
	
}



module.exports = { System }
