
function Game(emitter,sys,utils) {

var _self = this;   


var fs = require('fs');
_self.gameFishes=JSON.parse(fs.readFileSync('./arcade_server/games/ParadiseCQ9/fishData.json', 'utf8'));
_self.sceneFishes=[];


for(var fgi=0; fgi<_self.gameFishes.Data.length; fgi++){

	
var cfg=_self.gameFishes.Data[fgi].Fishes;	



	for(var g in cfg){
		
		var curFishes=cfg[g];
		
		for(var gi=0; gi<curFishes.length; gi++){
		
		var curFishUID=curFishes[gi].FishID;
        var curFishId=curFishes[gi].FishType;
        var cFishHealth=curFishes[gi].LiveSecs;
        var cFishPay=curFishes[gi].LiveSecs;


_self.sceneFishes['fish_'+curFishUID]={curFishUID:curFishUID,fishId:curFishId,fishHealth:cFishHealth,fishPay:cFishPay,fishTime:0};			
			
		}
		
		
	}
	

	
	
}




///////////////////////////////////////
///////////////////////////////////////


with(BinaryParser = function(e, t) {
    this.bigEndian = e, this.allowExceptions = t;
}, {
    p: BinaryParser.prototype
}) {
    with(p.encodeFloat = function(e, t, i) {
        var n, o, s, a, c, l = [],
            h = Math.pow(2, i - 1) - 1,
            u = 1 - h,
            _ = h,f
            g = u - t,
            d = isNaN(b = parseFloat(e)) || b == -(1 / 0) || b == +(1 / 0) ? b : 0,
            f = 0,
            m = 2 * h + 1 + t + 3,
            p = new Array(m),
            y = (b = 0 !== d ? 0 : b) < 0,
            b = Math.abs(b),
            F = Math.floor(b),
            k = b - F;
        for (n = m; n; p[--n] = 0);
        for (n = h + 2; F && n; p[--n] = F % 2, F = Math.floor(F / 2));
        for (n = h + 1; k > 0 && n;
            (p[++n] = ((k *= 2) >= 1) - 0) && --k);
        for (n = -1; ++n < m && !p[n];);
        if (p[(o = t - 1 + (n = (f = h + 1 - n) >= u && f <= _ ? n + 1 : h + 1 - (f = u - 1))) + 1]) {
            if (!(s = p[o]))
                for (a = o + 2; !s && a < m; s = p[a++]);
            for (a = o + 1; s && --a >= 0;
                (p[a] = !p[a] - 0) && (s = 0));
        }
        for (n = n - 2 < 0 ? -1 : n - 3; ++n < m && !p[n];);
        for ((f = h + 1 - n) >= u && f <= _ ? ++n : f < u && (f != h + 1 - m && f < g && this.warn("encodeFloat::float underflow"), n = h + 1 - (f = u - 1)), (F || 0 !== d) && (this.warn(F ? "encodeFloat::float overflow" : "encodeFloat::" + d), f = _ + 1, n = h + 2, d == -(1 / 0) ? y = 1 : isNaN(d) && (p[n] = 1)), b = Math.abs(f + h), a = i + 1, c = ""; --a; c = b % 2 + c, b = b >>= 1);
        for (b = 0, a = 0, n = (c = (y ? "1" : "0") + c + p.slice(n, n + t).join("")).length, r = []; n; b += (1 << a) * c.charAt(--n), 7 == a && (r[r.length] = String.fromCharCode(b), l[r.length - 1] = b, b = 0), a = (a + 1) % 8);
        return r[r.length] = b ? String.fromCharCode(b) : "", this.bigEndian ? l.reverse() : l
    }, p.encodeInt = function(e, t, i) {
        var n = [],
            o = t / 8,
            s = Math.pow(2, t),
            r = [];
        for ((e >= s || e < -(s / 2)) && this.warn("encodeInt::overflow") && (e = 0), e < 0 && (e += s); e; r[r.length] = String.fromCharCode(e % 256), n[r.length - 1] = e % 256, e = Math.floor(e / 256));
        for (t = -(-t >> 3) - r.length; t--; r[r.length] = "\0");
        for (var a = n.length; a < o; a++) n.push(0);
        return this.bigEndian ? n.reverse() : n
    }, p.decodeFloat = function(e, t, i) {
        var n, o, s, r = ((r = new this.Buffer(this.bigEndian, e)).checkBuffer(t + i + 1), r),
            a = Math.pow(2, i - 1) - 1,
            c = r.readBits(t + i, 1),
            l = r.readBits(t, i),
            h = 0,
            u = 2,
            _ = r.buffer.length + (-t >> 3) - 1;
        do
            for (n = r.buffer[++_], o = t % 8 || 8, s = 1 << o; s >>= 1; n & s && (h += 1 / u), u *= 2); while (t -= o) return l == 1 + (a << 1) ? h ? NaN : c ? -(1 / 0) : +(1 / 0) : (1 + c * -2) * (l || h ? l ? Math.pow(2, l - a) * (1 + h) : Math.pow(2, 1 - a) * h : 0)
    }, p.decodeInt = function(e, t, i) {
        var n = new this.Buffer(this.bigEndian, e),
            o = n.readBits(0, t),
            s = Math.pow(2, t);
        return i && o >= s / 2 ? o - s : o
    }, {
        p: (p.Buffer = function(e, t) {
            this.bigEndian = e || 0, this.buffer = [], this.setBuffer(t)
        }).prototype
    }) p.readBits = function(e, t) {
        if (e < 0 || t <= 0) return 0;
        this.checkBuffer(e + t);
        for (var i, n = e % 8, o = this.buffer.length - (e >> 3) - 1, s = this.buffer.length + (-(e + t) >> 3), r = o - s, a = (this.buffer[o] >> n & (1 << (r ? 8 - n : t)) - 1) + (r && (i = (e + t) % 8) ? (this.buffer[s++] & (1 << i) - 1) << (r-- << 3) - n : 0); r; a += function(e, t) {
                for (++t; --t; e = 1073741824 == (1073741824 & (e %= 2147483648)) ? 2 * e : 2 * (e - 1073741824) + 2147483647 + 1);
                return e
            }(this.buffer[s++], (r-- << 3) - n));
        return a
    }, p.setBuffer = function(e) {
        if (e)
            for (var t, i = t = e.length, n = this.buffer = new Array(t); i; n[t - i] = e[--i]);
    }, p.hasNeededBits = function(e) {
        return this.buffer.length >= -(-e >> 3)
    }, p.checkBuffer = function(e) {
        if (!this.hasNeededBits(e)) throw new Error("checkBuffer::missing bytes")
    };
    p.warn = function(e) {
        if (this.allowExceptions) throw new Error(e);
        return 1
    }, p.fromSmall = function(e) {
        return this.encodeInt(e, 8, !0)
    }, p.fromByte = function(e) {
        return this.encodeInt(e, 8, !1)
    }, p.fromWord = function(e) {
        return this.encodeInt(e, 16, !0)
    }, p.fromShort = function(e) {
        return this.encodeInt(e, 16, !1)
    }, p.fromInt = function(e) {
        return this.encodeInt(e, 32, !0)
    }, p.fromDWord = function(e) {
        return this.encodeInt(e, 32, !1)
    }, p.fromLong = function(e) {
        return this.encodeInt(e, 64, !0)
    }, p.fromFloat = function(e) {
        return this.encodeFloat(e, 23, 8)
    }, p.fromDouble = function(e) {
        return this.encodeFloat(e, 52, 11)
    }, p.toSmall = function(e) {
        return this.decodeInt(e, 8, !0)
    }, p.toByte = function(e) {
        return this.decodeInt(e, 8, !1)
    }, p.toWord = function(e) {
        return this.decodeInt(e, 16, !0)
    }, p.toShort = function(e) {
        return this.decodeInt(e, 16, !1)
    }, p.toInt = function(e) {
        return this.decodeInt(e, 32, !0)
    }, p.toDWord = function(e) {
        return this.decodeInt(e, 32, !1)
    }, p.toLong = function(e) {
        return this.decodeInt(e, 64, !0)
    }, p.toFloat = function(e) {
        return this.decodeFloat(e, 23, 8)
    }, p.toDouble = function(e) {
        return this.decodeFloat(e, 52, 11)
    }
}
MemoryStream = function() {
    this._position = 0, this._buffer = [], this.concatenate = function(e) {
        var t = new Uint8Array(this._buffer.length + e.length);
        t.set(this._buffer, 0), t.set(e, this._buffer.length), this._buffer = t, this._position = this._buffer.length - 1
    }.bind(this), this.initialBuffer = function(e) {
        this._buffer = e, this._position = 0
    }.bind(this), this.getData = function() {
        return this._buffer
    }.bind(this), this.getPosition = function() {
        return this._position
    }.bind(this), this.setPosition = function(e) {
        this._position = e
    }.bind(this), this.getLength = function() {
        return this._buffer.length
    }.bind(this)
}, Uint8Array.prototype.slice = function(e, t) {
    var i = Array.from(this);
    return i = i.slice(e, t)
}, ProtocolBuilder = function() {
    return this._parser = new BinaryParser(!1, !0), this._decode_get_buffer = function(e, t) {
        if (e.getPosition() + t > e.getLength()) throw Error("Invalid Length");
        return e.getData().slice(e.getPosition(), e.getPosition() + t)
    }.bind(this), this.Encode_FromBool = function(e, t) {
        var i = this._parser.fromByte(t ? 1 : 0);
        e.concatenate(i)
    }.bind(this), this.Encode_FromEnum = function(e, t) {
        this.Encode_FromString(e, "u1");
        var i = this._parser.fromByte(t);
        e.concatenate(i)
    }.bind(this), this.Encode_FromByte = function(e, t) {
        var i = this._parser.fromByte(t);
        e.concatenate(i)
    }.bind(this), this.Encode_FromShort = function(e, t) {
        var i = this._parser.fromWord(t);
        e.concatenate(i)
    }.bind(this), this.Encode_FromUShort = function(e, t) {
        var i = this._parser.fromShort(t);
        e.concatenate(i)
    }.bind(this), this.Encode_FromInt = function(e, t) {
        var i = this._parser.fromInt(t);
        e.concatenate(i)
    }.bind(this), this.Encode_FromInt64 = function(e, t) {
        var i = this._parser.fromLong(t);
        e.concatenate(i)
    }.bind(this), this.Encode_FromDouble = function(e, t) {
        var i = this._parser.fromDouble(t);
        e.concatenate(i)
    }.bind(this), this.Encode_FromString = function(e, t) {
		
        for (var i = unescape(encodeURIComponent(t)), n = [], o = 0; o < i.length; o++) n.push(i.charCodeAt(o));
        this.Encode_FromInt(e, n.length), e.concatenate(n)
    }.bind(this), this.Decode_ToBool = function(e) {
        return this.Decode_ToByte(e) > 0
    }.bind(this), this.Decode_ToEnum = function(e) {
        var t = (this.Decode_ToString(e), this._decode_get_buffer(e, 1)),
            i = this._parser.toByte(t);
        return e.setPosition(e.getPosition() + 1), i
    }.bind(this), this.Decode_ToByte = function(e) {
        var t = this._decode_get_buffer(e, 1),
            i = this._parser.toByte(t);
        return e.setPosition(e.getPosition() + 1), i
    }.bind(this), this.Decode_ToShort = function(e) {
        var t = this._decode_get_buffer(e, 2),
            i = this._parser.toWord(t);
        return e.setPosition(e.getPosition() + 2), i
    }.bind(this), this.Decode_ToUShort = function(e) {
        var t = this._decode_get_buffer(e, 2),
            i = this._parser.toShort(t);
        return e.setPosition(e.getPosition() + 2), i
    }.bind(this), this.Decode_ToInt = function(e) {
        var t = this._decode_get_buffer(e, 4),
            i = this._parser.toInt(t);
        return e.setPosition(e.getPosition() + 4), i
    }.bind(this), this.Decode_ToUInt = function(e) {
        var t = this._decode_get_buffer(e, 4),
            i = this._parser.toDWord(t);
        return e.setPosition(e.getPosition() + 4), i
    }.bind(this), this.Decode_ToInt64 = function(e) {
        for (var t = this._decode_get_buffer(e, 8), i = 0, n = t.length - 1; n >= 0; n--) i = 256 * i + t[n];
        return e.setPosition(e.getPosition() + 8), i
    }.bind(this), this.Decode_ToDouble = function(e) {
        var t = this._decode_get_buffer(e, 8),
            i = this._parser.toDouble(t);
        return e.setPosition(e.getPosition() + 8), i
    }.bind(this), this.Decode_ToString = function(e) {
        var t = this.Decode_ToInt(e),
            i = this._decode_get_buffer(e, t),
            n = String.fromCharCode.apply(null, i),
            o = decodeURIComponent(escape(n));
		
        return e.setPosition(e.getPosition() + t), o
    }.bind(this), this.Decode_ValueType = function(e, t, i) {
        return "number" == typeof e[t] && typeof e[t] >= 0 && typeof e[t] <= 255 ? (e[t] = this.Decode_ToByte(i), !0) : "boolean" == typeof e[t] ? (e[t] = this.Decode_ToBool(i), !0) : "number" == typeof e[t] && typeof e[t] >= 0 && typeof e[t] <= 65535 ? (e[t] = this.Decode_ToUShort(i), !0) : "number" == typeof e[t] && typeof e[t] >= -32768 && typeof e[t] <= 32767 ? (e[t] = this.Decode_ToUShort(i), !0) : "number" == typeof e[t] && typeof e[t] >= 0 && typeof e[t] <= Math.pow(2, 32) - 1 ? (e[t] = this.Decode_ToUInt(i), !0) : "number" == typeof e[t] && typeof e[t] >= Math.pow(2, 31) * -1 && typeof e[t] <= Math.pow(2, 31) - 1 ? (e[t] = this.Decode_ToUInt(i), !0) : "number" == typeof e[t] && typeof e[t] >= Math.pow(2, 52) * -1 && typeof e[t] <= Math.pow(2, 53) - 1 ? (e[t] = this.Decode_ToUInt(i), !0) : "number" == typeof e[t] && typeof e[t] >= 0 && typeof e[t] <= Math.pow(2, 53) - 1 ? (e[t] = this.Decode_ToUInt(i), !0) : "float" == typeof e[t] ? (e[t] = this.Decode_ToDouble(i), !0) : "string" == typeof e[t] ? (e[t] = this.Decode_ToString(i), !0) : void 0
    }.bind(this), this.Decode_ToValueStruct = function(e, t) {
        for (var i in e) e.hasOwnProperty(i) && this.Decode_ValueType(e, i, t)
    }.bind(this), {
        Encode_FromBool: this.Encode_FromBool,
        Encode_FromEnum: this.Encode_FromEnum,
        Encode_FromByte: this.Encode_FromByte,
        Encode_FromShort: this.Encode_FromShort,
        Encode_FromUShort: this.Encode_FromUShort,
        Encode_FromInt: this.Encode_FromInt,
        Encode_FromInt64: this.Encode_FromInt64,
        Encode_FromDouble: this.Encode_FromDouble,
        Encode_FromString: this.Encode_FromString,
        Decode_ToBool: this.Decode_ToBool,
        Decode_ToEnum: this.Decode_ToEnum,
        Decode_ToByte: this.Decode_ToByte,
        Decode_ToShort: this.Decode_ToShort,
        Decode_ToUShort: this.Decode_ToUShort,
        Decode_ToInt: this.Decode_ToInt,
        Decode_ToUInt: this.Decode_ToUInt,
        Decode_ToInt64: this.Decode_ToInt64,
        Decode_ToDouble: this.Decode_ToDouble,
        Decode_ToString: this.Decode_ToString
    }
}()




///////////////////////////////////////
///////////////////////////////////////











_self.gameCommand=null;
_self.gameCode=null;
_self.gameSettings=null;
_self.gameBalanceInCents=null;

///////////////////////////
_self.sceneBullets=[];

_self.fishesUpdateInterval=0;

_self.gameData={};

/*---------- fishes paytable ------------*/

var fishPay=[];



fishPay['Fish_1'] = [2,2];
fishPay['Fish_2'] = [2,2];
fishPay['Fish_3'] = [3,3];
fishPay['Fish_4'] = [4,4];
fishPay['Fish_5'] = [5,5];
fishPay['Fish_6'] =  [6,6];
fishPay['Fish_7'] =  [7,7];
fishPay['Fish_8'] =  [9,9];
fishPay['Fish_9'] =  [10,10];
fishPay['Fish_10'] =[12,12];
fishPay['Fish_11'] =[15,15];
fishPay['Fish_12'] = [18,18];
fishPay['Fish_13'] = [20,20];
fishPay['Fish_14'] = [20,20];
fishPay['Fish_15'] = [30,30];
fishPay['Fish_16'] = [40,40];
fishPay['Fish_17'] = [50,50];
fishPay['Fish_18'] = [60,60];
fishPay['Fish_19'] = [80,80];
fishPay['Fish_20'] = [80,80];


fishPay['Fish_201'] = [360,360];
fishPay['Fish_202'] = [400,400];
fishPay['Fish_203'] = [80,300];
fishPay['Fish_204'] = [80,360];

fishPay['Fish_21'] = [100,100];

fishPay['Fish_22'] = [120,120];
fishPay['Fish_23'] = [120,120];
fishPay['Fish_24'] = [150,150];
fishPay['Fish_25'] = [150,150];
fishPay['Fish_26'] = [150,150];
fishPay['Fish_26'] = [150,150];
fishPay['Fish_28'] = [180,180];

fishPay['Fish_31'] = [60,120];
fishPay['Fish_32'] = [100,200];
fishPay['Fish_33'] = [15,15];

fishPay['Fish_401'] = [0,0];
fishPay['Fish_403'] = [0,0];



var fishDamage=[];


fishDamage['Fish_1'] = [1,2];
fishDamage['Fish_2'] = [1,2];
fishDamage['Fish_3'] = [1,3];
fishDamage['Fish_4'] = [1,4];
fishDamage['Fish_5'] = [2,5];
fishDamage['Fish_6'] =  [2,6];
fishDamage['Fish_7'] =  [2,7];
fishDamage['Fish_8'] =  [2,9];
fishDamage['Fish_9'] =  [2,10];
fishDamage['Fish_10'] =[3,12];
fishDamage['Fish_11'] =[3,15];
fishDamage['Fish_12'] = [3,18];
fishDamage['Fish_13'] = [5,20];
fishDamage['Fish_14'] = [5,20];
fishDamage['Fish_15'] = [8,30];
fishDamage['Fish_16'] = [8,40];
fishDamage['Fish_17'] = [10,50];
fishDamage['Fish_18'] = [10,60];
fishDamage['Fish_19'] = [10,80];
fishDamage['Fish_20'] = [10,80];


fishDamage['Fish_201'] = [20,360];
fishDamage['Fish_202'] = [20,400];
fishDamage['Fish_203'] = [10,300];
fishDamage['Fish_204'] = [10,360];

fishDamage['Fish_21'] = [10,100];

fishDamage['Fish_22'] = [10,120];
fishDamage['Fish_23'] = [10,120];
fishDamage['Fish_24'] = [10,150];
fishDamage['Fish_25'] = [10,150];
fishDamage['Fish_26'] = [10,150];
fishDamage['Fish_26'] = [20,180];
fishDamage['Fish_28'] = [20,180];

fishDamage['Fish_31'] = [10,120];
fishDamage['Fish_32'] = [10,200];
fishDamage['Fish_33'] = [2,15];

fishDamage['Fish_401'] = [10,100];
fishDamage['Fish_403'] = [10,100];


/*----------control fishes on scene------------*/


_self.fishesId_=0;

this.FishesUpdate=function(){
	
var curFishOX=-10;	
var curFishOY=-20;	


var curFishUID=utils.RandomInt(1000,10000);	
var curTime  = new Date();

/*
if(_self.fishesId_==20){
	curFishId=104;
}
*/


	
/*------------------------*/
/*------------------------*/	
/*

{"body":{"GamePlaySerialNumber":1000000,"UserInfos":[{"Balance":8989889.4299999997,"PlayerID":"3050000002499","RollOutID":"AT40000000081725"}]},"compressRoute":1,"id":0,"route":"fish.changestatusend","type":4}

*/

//room 1
//  3 , 2 , 4 , 5 , 7 , 6 , 92 , 8 ,  ,  ,  ,  ,  ,  ,  ,             
var r=utils.RandomInt(1,70);
////console.log('R ::: '+r);
var response = new MemoryStream;
ProtocolBuilder.Encode_FromInt(response, 10003);//gameid
ProtocolBuilder.Encode_FromInt(response, 4);//command code
ProtocolBuilder.Encode_FromString(response, '{"body":{"FishLaunchID":'+r+',"GapSecs":2,"SceneType":0,"StartTime":'+Math.round(curTime.getTime()/1000)+'},"compressRoute":1,"id":0,"route":"fish.changestatus","type":4}');//
emitter.emit('outcomingMessage',response.getData(),false);	
	
	
	
//emitter.emit('outcomingMessage',fishPreset,true);		
	
_self.fishesId_++;	
	
////////////////// remove fishes
///////////////////////////////////////////////

	
};

this.StartFishesUpdate=function(){
_self.StopFishesUpdate();	
_self.fishesUpdateInterval=setInterval(_self.FishesUpdate,20000);	
_self.FishesUpdate();
	
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



 this.Login2 = async function(dat)
{
	
var response = new MemoryStream;
ProtocolBuilder.Encode_FromInt(response, 10003);//gameid
ProtocolBuilder.Encode_FromInt(response, 4);//command code
ProtocolBuilder.Encode_FromString(response, '{"body":{"IsPass":true,"LevelList":[{"Denom":"0.01","IsOpen":true,"Level":1},{"Denom":"0.1","IsOpen":true,"Level":2},{"Denom":"0.1","IsOpen":true,"Level":3},{"Denom":"0.2","IsOpen":true,"Level":4},{"Denom":"0.100000","IsOpen":false,"Level":5},{"Denom":"0.100000","IsOpen":false,"Level":6},{"Denom":"0.100000","IsOpen":false,"Level":7},{"Denom":"0.100000","IsOpen":false,"Level":8}],"PlayerID":"610000002271","Version":"2.0.19"},"compressRoute":1,"id":1,"route":"fish.login","type":4}');//
emitter.emit('outcomingMessage',response.getData(),false);	


	
};

 this.Login = async function(dat)
{


var balanceInCents,response;

await sys.CreateConnection();	

var balanceInCents=await sys.GetBalance();
_self.gameBalanceInCents=balanceInCents;

var response = new MemoryStream;
ProtocolBuilder.Encode_FromInt(response, 0);
ProtocolBuilder.Encode_FromByte(response, 1);
ProtocolBuilder.Encode_FromByte(response, 1);


var param='{"Currency":"CNY","DealerID":21923,"Save":{"10002":{},"10003":{"ItemBag":{"1":10,"2":10,"3":10,"4":10,"5":10}},"10004":{},"10005":{},"10003":{},"10101":{},"10102":{}},"UserID":39481,"UserName":"GUESTPASS15"}';

ProtocolBuilder.Encode_FromString(response, param);
emitter.emit('outcomingMessage',response.getData(),false);	

////////////////

var response = new MemoryStream;
ProtocolBuilder.Encode_FromInt(response, 0);
ProtocolBuilder.Encode_FromByte(response, 2);
ProtocolBuilder.Encode_FromByte(response, 1);
ProtocolBuilder.Encode_FromInt(response, 10003);//gameid
emitter.emit('outcomingMessage',response.getData(),false);	

////////////////
////////////////



var response = new MemoryStream;
ProtocolBuilder.Encode_FromInt(response, 10003);//gameid
ProtocolBuilder.Encode_FromInt(response, 1);//command code
ProtocolBuilder.Encode_FromString(response, '{"code":200,"route":"fish.first","sys":{"dict":{"fish.bet":3,"fish.hit":4,"fish.iniconfig":5,"fish.joinroom":7,"fish.leaveroom":8,"fish.login":9,"fish.report":1,"fish.updatebetmultiple":2,"fish.useitem":6,"slot.complete":10,"slot.iniconfig":11,"slot.login":12,"slot.play":13,"fish.boradcast":14},"heartbeat":30,"payLoad":null,"version":"2.0.19"}}');//
emitter.emit('outcomingMessage',response.getData(),false);	







};


 this.Ping = async function(dat)
{

var curTime  = new Date();
	
var response = new MemoryStream;
ProtocolBuilder.Encode_FromInt(response, 0);//system command
ProtocolBuilder.Encode_FromByte(response, 255);//command code
ProtocolBuilder.Encode_FromByte(response, 1);//
ProtocolBuilder.Encode_FromDouble(response, _self.gameBalanceInCents);//balance
emitter.emit('outcomingMessage',response.getData(),false);	

	
/////////////////////////////	
	
	
	
}




 this.ChangeRate = async function(dat)
{
	
var decodeData=[];
var t = new MemoryStream;
t.initialBuffer(dat.fullRequest);
decodeData[0]=ProtocolBuilder.Decode_ToInt(t);
decodeData[1]=ProtocolBuilder.Decode_ToByte(t);
decodeData[2]=ProtocolBuilder.Decode_ToByte(t);

if(decodeData[2]==1){

_self.gameData.CurrentBetMeter++;
	
}else{
	
_self.gameData.CurrentBetMeter--;	
	
} 

	
if(_self.gameData.CurrentBetMeter<0){
_self.gameData.CurrentBetMeter=_self.gameData.Bets.length-1;	
}	
if(_self.gameData.CurrentBetMeter>_self.gameData.Bets.length-1){
_self.gameData.CurrentBetMeter=0;	
}	
	

_self.gameData.CurrentBet=_self.gameData.Bets[_self.gameData.CurrentBetMeter];



var CannonState=0;
var cs0=800000;
var cs1= 160000;

 

if(_self.gameData.CurrentBetMeter>=3){

CannonState=1;
	
 cs0=1000000;
cs1= 200000;		
	 
	
}
if(_self.gameData.CurrentBetMeter>=6){

CannonState=2;
	
 cs0=1200000;
cs1= 200000;	
	
}


/////////////////////////////	
	
var response = new MemoryStream;
ProtocolBuilder.Encode_FromInt(response, 10003);//system command
ProtocolBuilder.Encode_FromByte(response, 11);//command code

ProtocolBuilder.Encode_FromByte(response, 1);//
ProtocolBuilder.Encode_FromByte(response, CannonState);//

ProtocolBuilder.Encode_FromInt64(response, _self.gameData.CurrentBet);//bet
ProtocolBuilder.Encode_FromDouble(response, 90);//

ProtocolBuilder.Encode_FromInt(response, 0);//
ProtocolBuilder.Encode_FromInt(response, cs0);//
ProtocolBuilder.Encode_FromInt(response, cs1);//


emitter.emit('outcomingMessage',response.getData(),false);		


	
}



/*-----------simple hit--------------*/
 this.Hit = async function(dat)
{

/*----------------------*/
/*----------------------*/
//////console.log('!!!!!!!!!!!!!!!!!!!!!START HIT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1');


var hits=dat.data.FishIDs;			


/*----------------------*/
/*----------------------*/


var curTime  = new Date();	
var bet=_self.gameData.CurrentBet*_self.gameData.CurrentDenom;
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

var targetFishes=hits;
var gameBank=await sys.GetBank();	

/*full bomb*/

var fishDmgValue=1;

/*------------------------------*/
var isBomb=false;
var isBombId=0;
var isBombType='';

/*------------------------------*/

for(var fi=0; fi<targetFishes.length; fi++){

var cfish=targetFishes[fi];



if(_self.sceneFishes['fish_'+cfish]!=undefined){


var ftype=_self.sceneFishes['fish_'+cfish].fishId;
	
	
if(fishDamage['Fish_'+ftype]==undefined){
	
fishDamage['Fish_'+ftype]=[1,100];	
fishPay['Fish_'+ftype]=[1,100];	
	
}	
	
var damage=utils.RandomInt(1,fishDamage['Fish_'+ftype][1]);

var tmpWin=utils.RandomInt(fishPay['Fish_'+ftype][0],fishPay['Fish_'+ftype][1])*bet;
var tmpWin0=0;


////console.log('FISH ID :: '+ftype);

/*-----------------------------*/	

//limit control



if(damage==1 && (tmpWin+totalWin+tmpWin0)<=gameBank){

totalWin+=tmpWin;
winsArr.push({fish_id:cfish,kill:1,exp_win:tmpWin0, win:(Math.round(tmpWin/_self.gameData.CurrentDenom)),hp:0,type:_self.sceneFishes['fish_'+cfish].fishId});		
	
delete _self.sceneFishes['fish_'+cfish];	
	
}else{
winsArr.push({fish_id:cfish,kill:0, win:0,exp_win:0,hp:1,type:_self.sceneFishes['fish_'+cfish].fishId});			
}


	
}	
	
}




	
var endBalance=startBalance-bet+totalWin;
_self.gameBalanceInCents=utils.FixNumber(endBalance);
_self.staticBalance=_self.staticBalance+totalWin;
_self.staticBalance=utils.FixNumber(_self.staticBalance);

var response=[];

if(totalWin>0){
	
await sys.SetBalance(totalWin);	
await sys.SetBank(-totalWin,'');	




}else{
	

	
}



/////////////////////////////	


var response = new MemoryStream;
ProtocolBuilder.Encode_FromInt(response, 10003);//system command
ProtocolBuilder.Encode_FromInt(response, 4);//command code

var FishWin=[];

for(var kf=0; kf<winsArr.length; kf++){

              
			   FishWin[kf]='{"FishId":'+winsArr[kf].fish_id+',"KillBy":0,"KillRoot":0,"PeerId":0,"Prize":'+Math.round(winsArr[kf].win)+',"Result":[],"TypeId":'+winsArr[kf].type+',"WeaponSerial":0}';
	
}


var responseStr='{"body":{"Balance":"'+endBalance+'","BetMultiple":'+_self.gameData.CurrentBet+',"BetSerial":'+dat.data.BetSerial+',"FishWin":['+FishWin.join(',')+'],"PlayerID":"610000002271","SpecialAward":[],"TotalWinPrize":0},"compressRoute":1,"id":0,"route":"fish.hit","type":4}';	

ProtocolBuilder.Encode_FromString(response, responseStr);
emitter.emit('outcomingMessage',response.getData(),false);	



/////////////////////////////////////////








 await sys.Commit();	
 sys.SaveLogReport({balance:endBalance,bet:bet,win:totalWin});	




	//////console.log('!!!!!!!!!!!!!!!!!!!!!END HIT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1');



	
};


 this.ExitRoom = async function(dat)
{

_self.StopFishesUpdate();	
////////////


var response = new MemoryStream;
ProtocolBuilder.Encode_FromInt(response, 10003);//gameid
ProtocolBuilder.Encode_FromInt(response, 4);//command code
ProtocolBuilder.Encode_FromString(response, '{"body":{"PlayerID":"610000002271"},"compressRoute":1,"id":0,"route":"fish.leaveroom","type":4}');//
emitter.emit('outcomingMessage',response.getData(),false);		


var response = new MemoryStream;
ProtocolBuilder.Encode_FromInt(response, 0);//system command
ProtocolBuilder.Encode_FromByte(response, 255);//command code
ProtocolBuilder.Encode_FromByte(response, 1);//
ProtocolBuilder.Encode_FromDouble(response, _self.gameBalanceInCents);//balance
emitter.emit('outcomingMessage',response.getData(),false);	



	
}



 this.UseItem = async function(dat)
{


////////////


var response = new MemoryStream;
ProtocolBuilder.Encode_FromInt(response, 10003);//gameid
ProtocolBuilder.Encode_FromInt(response, 4);//command code


var BuffMode=0;

if(dat.data.ItemType==2){
BuffMode=1;	
}

ProtocolBuilder.Encode_FromString(response, '{"body":{"BuffInfos":[{"BuffMode":'+BuffMode+',"BuffType":'+dat.data.ItemType+'}],"BuffSecs":20,"ItemType":'+dat.data.ItemType+',"PlayerID":"610000002271"},"compressRoute":1,"id":0,"route":"fish.buff","type":4}');//

emitter.emit('outcomingMessage',response.getData(),false);		





	
}

 this.Fire = async function(dat)
{


////////////

var cd=JSON.parse(dat.data.ClientData);
var response = new MemoryStream;
ProtocolBuilder.Encode_FromInt(response, 10003);//gameid
ProtocolBuilder.Encode_FromInt(response, 4);//command code


_self.gameData.CurrentBet=dat.data.PlayerBetMultiples[0];

//////console.log('_self.gameData.CurrentBet ::: '+_self.gameData.CurrentBet);

_self.staticBalance-=(_self.gameData.CurrentBet*_self.gameData.CurrentDenom);
_self.staticBalance=utils.FixNumber(_self.staticBalance);

//ProtocolBuilder.Encode_FromString(response, '{"body":{"Balance":"'+_self.gameBalanceInCents+'","BetSerial":3,"BuffTypes":[],"ClientData":"{\"x\":'+cd.x+',\"y\":'+cd.y+',\"betButtonIndex\":'+cd.betButtonIndex+',\"isMobile\":false}","PlayerID":"610000002271"},"compressRoute":1,"id":0,"route":"fish.bet","type":4}');//

ProtocolBuilder.Encode_FromString(response, '{"body":{"Balance":"'+_self.gameBalanceInCents+'","BetSerial":2,"BuffTypes":[],"ClientData":"{\\"x\\":'+cd.x+',\\"y\\":'+cd.y+',\\"betButtonIndex\\":'+cd.betButtonIndex+',\\"isMobile\\":false}","PlayerID":"610000002271"},"compressRoute":1,"id":0,"route":"fish.bet","type":4}');//

emitter.emit('outcomingMessage',response.getData(),false);		





	
}

 this.EnterRoom2 = async function(dat)
{
	


var response = new MemoryStream;
ProtocolBuilder.Encode_FromInt(response, 10003);//gameid
ProtocolBuilder.Encode_FromInt(response, 4);//command code
ProtocolBuilder.Encode_FromString(response, '{"body":{"BetButton":[1,2,3,5,10,20,30,50,80,100,200,300,500,800,1000],"FishLaunchDataString":"","ItemSettings":[{"ColdDownSecs":18,"ItemID":1,"isOpen":true},{"ColdDownSecs":10,"ItemID":2,"isOpen":true},{"ColdDownSecs":20,"ItemID":3,"isOpen":true},{"ColdDownSecs":8,"ItemID":4,"isOpen":true},{"ColdDownSecs":15,"ItemID":5,"isOpen":true}]},"compressRoute":1,"id":2,"route":"fish.iniconfig","type":4}');//
emitter.emit('outcomingMessage',response.getData(),false);		

var response = new MemoryStream;
ProtocolBuilder.Encode_FromInt(response, 10003);//gameid
ProtocolBuilder.Encode_FromInt(response, 4);//command code
ProtocolBuilder.Encode_FromString(response, '{"body":{"BonusList":[],"ItemList":[{"ItemType":1,"Price":0,"Volume":10},{"ItemType":2,"Price":0,"Volume":10},{"ItemType":3,"Price":0,"Volume":10},{"ItemType":4,"Price":0,"Volume":10},{"ItemType":5,"Price":0,"Volume":10}]},"compressRoute":1,"id":0,"route":"fish.updateitem","type":4}');//
emitter.emit('outcomingMessage',response.getData(),false);		
	
setTimeout(function(){_self.StartFishesUpdate();	},2000);

	
	
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
_self.staticBalance=balanceInCents;


/*--------------ENTER ROOM---------------------*/	

var curTime  = new Date();
	



	
/////////////////////////////


_self.gameData.CurrentBetMeter=0;	
_self.gameData.CurrentBet=1;	
_self.gameData.CurrentDenom=0.01;	


if(dat.data.Level==1){
_self.gameData.CurrentBet=1;	
_self.gameData.CurrentDenom=0.01;	


}
if(dat.data.Level==2){
_self.gameData.CurrentBet=1;	
_self.gameData.CurrentDenom=0.10;	


}
if(dat.data.Level==3){
_self.gameData.CurrentBet=1;	
_self.gameData.CurrentDenom=0.10;	

}
if(dat.data.Level==4){
_self.gameData.CurrentBet=1;	
_self.gameData.CurrentDenom=0.20;	

}





////////////
////////////
////////////
var response = new MemoryStream;
ProtocolBuilder.Encode_FromInt(response, 0);//system command
ProtocolBuilder.Encode_FromByte(response, 255);//command code
ProtocolBuilder.Encode_FromByte(response, 1);//
ProtocolBuilder.Encode_FromDouble(response, _self.gameBalanceInCents);//balance
emitter.emit('outcomingMessage',response.getData(),false);	



var response = new MemoryStream;
ProtocolBuilder.Encode_FromInt(response, 10003);//gameid
ProtocolBuilder.Encode_FromInt(response, 4);//command code
ProtocolBuilder.Encode_FromString(response, '{"body":{"Balance":["'+_self.gameBalanceInCents+'"],"FishLaunchDelay":0,"FishLaunchDelayEnd":0,"FishLaunchID":6,"PlayerID":"610000002271","RollOutID":"","SceneType":0,"SeatStatus":["610000002271","","",""],"ServerCurrentTime":'+curTime.getTime()+',"StartTime":'+Math.round(curTime.getTime()/100)+'},"compressRoute":1,"id":0,"route":"fish.joinroom","type":4}');//

emitter.emit('outcomingMessage',response.getData(),false);	

///////////////





//

	
}

 this.IncomingDataHandler = async function(data)
{

var decodeData=[];

if(data.fullRequest!=undefined){
var t = new MemoryStream;
t.initialBuffer(data.fullRequest);
try{
decodeData[0]=ProtocolBuilder.Decode_ToInt(t);
decodeData[1]=ProtocolBuilder.Decode_ToByte(t);
}catch(e){
	
}

}

if(decodeData[0]==10003 ){
	
//try parse json 




var jsnStr=ProtocolBuilder.Decode_ToString(t);
var jsn=JSON.parse(jsnStr);	

if(jsn.route=='fish.bet'){

_self.Fire(jsn);	
	
}else{

_self.msgHandlerStack.push(data);
	
}


}else{

_self.msgHandlerStack.push(data);
	
}



};


 this.MessageCheck = async function(data)
{



if(_self.msgHandler==1 && _self.msgHandlerStack.length>0){
	
//////console.log('_self.msgHandler=0');	
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

	

//////console.log('_self.msgHandler=1');				
}



};

 this.MessageHandler = async function(data)
{



_self.gameCommand='';

try{

var decodeData=[];

var t = new MemoryStream;
t.initialBuffer(data.fullRequest);


decodeData[0]=ProtocolBuilder.Decode_ToInt(t);
decodeData[1]=ProtocolBuilder.Decode_ToByte(t);



if(decodeData[0]==10003 ){
	
//try parse json 




var jsnStr=ProtocolBuilder.Decode_ToString(t);
var jsn=JSON.parse(jsnStr);	

_self.gameCommand=jsn.route;





	
//_self.gameCommand='login2';	
}else if(decodeData[0]==0){
_self.gameCommand='login';	
}


}catch(e){
	
	
}

//////console.log('DATA ',decodeData);





switch(_self.gameCommand){
	
case 'ping':

 _self.Ping(data); 

break;
	
case 'fish.useitem':

 _self.UseItem(jsn); 

break;	
	
case 'login':

 _self.Login(data); 

break;		
case 'fish.hit':

 await   _self.Hit(jsn); 

break;
case 'fish.login':

 _self.Login2(jsn); 

break;	
case 'fish.leaveroom':

 _self.ExitRoom(data); 

break;
case 'fish.iniconfig':

 _self.EnterRoom2(jsn); 

break;
case 'fish.joinroom':

 _self.EnterRoom(jsn); 

break;

default:

//////////console.log('Unknow command :::::: ' ,_self.gameCommand);

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
