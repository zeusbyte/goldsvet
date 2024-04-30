
function Utils(emitter) {

var _self = this;   

///////////////


///////////////////
///////////////////

this.DecimalToHex=function(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
        hex = "0" + hex;
    }

    return hex;
}

this.HexToDecimal=function(hex){ 

return parseInt(hex,16); 

}

///////////////////
///////////////////

this.FixNumber=function(num){ 

num=parseFloat(num);
var rnum=(Math.round((num*10000))/10000);

return rnum; 

}

///////////////////
///////////////////
///////////////////
this.hexToArrayBuffer =function (hex) {
  if (typeof hex !== 'string') {
    throw new TypeError('Expected input to be a string')
  }

  if ((hex.length % 2) !== 0) {
    throw new RangeError('Expected string to be an even number of characters')
  }

  var view = new Uint8Array(Math.round(hex.length / 2))

  for (var i = 0; i < hex.length; i += 2) {
    view[i / 2] = parseInt(hex.substring(i, i + 2), 16)
  }

  return view.buffer
}




///////////////
///////////////

this.EncodeMessage=function(str) {
  var buf = new ArrayBuffer(str.length * 1); // 2 bytes for each char
  var bufView = new Uint8Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

///////////

this.DecodeMessage=function(arrayBuffer) {
  var result = "";
  var i = 0;
  var c = 0;
  var c1 = 0;
  var c2 = 0;

  var data = new Uint8Array(arrayBuffer);

  // If we have a BOM skip it
  if (data.length >= 3 && data[0] === 0xef && data[1] === 0xbb && data[2] === 0xbf) {
    i = 3;
  }

  while (i < data.length) {
    c = data[i];

    if (c < 128) {
      result += String.fromCharCode(c);
      i++;
    } else if (c > 191 && c < 224) {
      if( i+1 >= data.length ) {
      //throw "UTF-8 Decode failed. Two byte character was truncated.";
      }
      c2 = data[i+1];
      result += String.fromCharCode( ((c&31)<<6) | (c2&63) );
      i += 2;
    } else {
      if (i+2 >= data.length) {
      //  throw "UTF-8 Decode failed. Multi byte character was truncated.";
      }
      c2 = data[i+1];
      c3 = data[i+2];
      result += String.fromCharCode( ((c&15)<<12) | ((c2&63)<<6) | (c3&63) );
      i += 3;
    }
  }
  return result;
}

//////////////////////////


this.ShuffleArray = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


this.CookieParse = function(cStr) {

let  tmpCArr=cStr.split(";");
let  CArr=[];

for(var i=0; i<tmpCArr.length; i++){

let cta=tmpCArr[i].split("=");
cta[0]= cta[0].replace(/ +/g, ' ').trim();
CArr[cta[0]]=cta[1];
	
}

return CArr;
};


 this.RandomInt = function(min, max)
{

  return Math.floor(Math.random() * (max - min + 1)) + min;

};

 this.RandomFloat = function(dl=1)
{

  return Math.random()*(this.RandomInt(-1*dl,1*dl)+Math.random());

};

	
	
return _self;	
	
}



module.exports = { Utils }
