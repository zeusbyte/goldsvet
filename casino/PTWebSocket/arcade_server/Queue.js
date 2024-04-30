
  function Queue() {

var _self = this;   
var  fs = require('fs');	
const  mysql = require("mysql2/promise");
var dbConfigStr = fs.readFileSync('../.env', 'utf8');
var EventEmitter = require('events');
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

var conn;
 
 /////////////////
 _self.transactionTimeout=0;
 _self.queueArr=[];
 
_self.emitter = new EventEmitter();	
 
 _self.Config={
  host: dbConfig.DB_HOST,
  user: dbConfig.DB_USERNAME,
  database: dbConfig.DB_DATABASE,
  password: dbConfig.DB_PASSWORD,
  prefix:dbConfig.DB_PREFIX
  
 };


//Create Connection
 this.CreateConnection = async function()
{
	
 conn = await mysql.createConnection({  
  host: _self.Config.host,
  user: _self.Config.user,
  database:  _self.Config.database,
  password:  _self.Config.password
});

 _self.conn=conn;	


}


 this.EndConnection = function()
{
	
conn.end(); 	
	
}


 this.SendQuery = async function(qs)
{



try{

return [rows, fields] = await  _self.conn.query(qs);
}catch(e){

try{
await _self.CreateConnection();		
return  [rows, fields] = await _self.conn.query(qs);	
}catch(e){

return  [[], []];
}

}



}


_self.emitter.on('PutQuery',  function(q){


 _self.queueArr.push(q);	
	
});


 this.MessageCheck = async function(data)
{



if(_self.msgHandler==1 && _self.queueArr.length>0){
	

_self.msgHandler=0;		
	
var dt=_self.queueArr.shift();

await _self.SendQuery(dt);	

_self.msgHandler=1;	
			
}



};


//_self.CreateConnection();

_self.msgHandler=1;
_self.msgHandlerStack=[];
_self.msgHandlerTicker=0;

_self.msgHandlerTicker=setInterval(_self.MessageCheck,20);


	
return _self;	
	
}



module.exports = { Queue }
