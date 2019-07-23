const baseConvert = require('baseconvert');
var optimist=require('optimist');
var argv=optimist.usage('app.js --hex FF00FF00')
.string('hex')
.describe('hex', "Hex received via serial port")
.boolean('help')
.describe('help','Usage').argv;

if (argv.help){
  optimist.showHelp();
  process.exit(0);
}

var bin=baseConvert.hex2bin(argv.hex).split('');
while ((bin.length % 8)>0){bin.unshift('0')}
var byte=[];
var result=[];
bin.forEach((bit)=>{
  byte.unshift(bit);
  if (byte.length==8) {
    var hex=baseConvert.bin2hex(byte.join(''));
    result.push((['00','0',''])[hex.length]+hex);
    if (result.length==3){
      byte.forEach((bit,idx)=>{
        byte[idx]=(bit=='1')?'0':'1';
      })
      hex=baseConvert.bin2hex(byte.join(''));
      result.push((['00','0',''])[hex.length]+hex);
    }
    byte=[];
  }
});
console.log('Your code is :',result.join(' '));
