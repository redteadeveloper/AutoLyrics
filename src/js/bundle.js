(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).ID3Writer=t()}(this,function(){"use strict";function a(e){return String(e).split("").map(function(e){return e.charCodeAt(0)})}function o(e){return new Uint8Array(a(e))}function u(e){var t=new Uint8Array(2*e.length);return new Uint16Array(t.buffer).set(a(e)),t}return function(){var e=t.prototype;function t(e){if(!(e&&"object"==typeof e&&"byteLength"in e))throw new Error("First argument should be an instance of ArrayBuffer or Buffer");this.arrayBuffer=e,this.padding=4096,this.frames=[],this.url=""}return e._setIntegerFrame=function(e,t){var a=parseInt(t,10);this.frames.push({name:e,value:a,size:11+a.toString().length})},e._setStringFrame=function(e,t){var a=t.toString();this.frames.push({name:e,value:a,size:13+2*a.length})},e._setPictureFrame=function(e,t,a,r){var n,s,i,c=function(e){if(!e||!e.length)return null;if(255===e[0]&&216===e[1]&&255===e[2])return"image/jpeg";if(137===e[0]&&80===e[1]&&78===e[2]&&71===e[3])return"image/png";if(71===e[0]&&73===e[1]&&70===e[2])return"image/gif";if(87===e[8]&&69===e[9]&&66===e[10]&&80===e[11])return"image/webp";var t=73===e[0]&&73===e[1]&&42===e[2]&&0===e[3],a=77===e[0]&&77===e[1]&&0===e[2]&&42===e[3];return t||a?"image/tiff":66===e[0]&&77===e[1]?"image/bmp":0===e[0]&&0===e[1]&&1===e[2]&&0===e[3]?"image/x-icon":null}(new Uint8Array(t)),o=a.toString();if(!c)throw new Error("Unknown picture MIME type");a||(r=!1),this.frames.push({name:"APIC",value:t,pictureType:e,mimeType:c,useUnicodeEncoding:r,description:o,size:(n=t.byteLength,s=c.length,i=o.length,11+s+1+1+(r?2+2*(i+1):i+1)+n)})},e._setLyricsFrame=function(e,t,a){var r,n,s=e.split("").map(function(e){return e.charCodeAt(0)}),i=t.toString(),c=a.toString();this.frames.push({name:"USLT",value:c,language:s,description:i,size:(r=i.length,n=c.length,16+2*r+2+2+2*n)})},e._setCommentFrame=function(e,t,a){var r,n,s=e.split("").map(function(e){return e.charCodeAt(0)}),i=t.toString(),c=a.toString();this.frames.push({name:"COMM",value:c,language:s,description:i,size:(r=i.length,n=c.length,16+2*r+2+2+2*n)})},e._setPrivateFrame=function(e,t){var a,r,n=e.toString();this.frames.push({name:"PRIV",value:t,id:n,size:(a=n.length,r=t.byteLength,10+a+1+r)})},e._setUserStringFrame=function(e,t){var a,r,n=e.toString(),s=t.toString();this.frames.push({name:"TXXX",description:n,value:s,size:(a=n.length,r=s.length,13+2*a+2+2+2*r)})},e._setUrlLinkFrame=function(e,t){var a=t.toString();this.frames.push({name:e,value:a,size:10+a.length})},e.setFrame=function(e,t){switch(e){case"TPE1":case"TCOM":case"TCON":if(!Array.isArray(t))throw new Error(e+" frame value should be an array of strings");var a="TCON"===e?";":"/",r=t.join(a);this._setStringFrame(e,r);break;case"TLAN":case"TIT1":case"TIT2":case"TIT3":case"TALB":case"TPE2":case"TPE3":case"TPE4":case"TRCK":case"TPOS":case"TMED":case"TPUB":case"TCOP":case"TKEY":case"TEXT":case"TSRC":this._setStringFrame(e,t);break;case"TBPM":case"TLEN":case"TDAT":case"TYER":this._setIntegerFrame(e,t);break;case"USLT":if(t.language=t.language||"eng",!("object"==typeof t&&"description"in t&&"lyrics"in t))throw new Error("USLT frame value should be an object with keys description and lyrics");if(t.language&&!t.language.match(/[a-z]{3}/i))throw new Error("Language must be coded following the ISO 639-2 standards");this._setLyricsFrame(t.language,t.description,t.lyrics);break;case"APIC":if(!("object"==typeof t&&"type"in t&&"data"in t&&"description"in t))throw new Error("APIC frame value should be an object with keys type, data and description");if(t.type<0||20<t.type)throw new Error("Incorrect APIC frame picture type");this._setPictureFrame(t.type,t.data,t.description,!!t.useUnicodeEncoding);break;case"TXXX":if(!("object"==typeof t&&"description"in t&&"value"in t))throw new Error("TXXX frame value should be an object with keys description and value");this._setUserStringFrame(t.description,t.value);break;case"WCOM":case"WCOP":case"WOAF":case"WOAR":case"WOAS":case"WORS":case"WPAY":case"WPUB":this._setUrlLinkFrame(e,t);break;case"COMM":if(t.language=t.language||"eng",!("object"==typeof t&&"description"in t&&"text"in t))throw new Error("COMM frame value should be an object with keys description and text");if(t.language&&!t.language.match(/[a-z]{3}/i))throw new Error("Language must be coded following the ISO 639-2 standards");this._setCommentFrame(t.language,t.description,t.text);break;case"PRIV":if(!("object"==typeof t&&"id"in t&&"data"in t))throw new Error("PRIV frame value should be an object with keys id and data");this._setPrivateFrame(t.id,t.data);break;default:throw new Error("Unsupported frame "+e)}return this},e.removeTag=function(){if(!(this.arrayBuffer.byteLength<10)){var e,t,a=new Uint8Array(this.arrayBuffer),r=a[3],n=((e=[a[6],a[7],a[8],a[9]])[0]<<21)+(e[1]<<14)+(e[2]<<7)+e[3]+10;if(!(73!==(t=a)[0]||68!==t[1]||51!==t[2]||r<2||4<r))this.arrayBuffer=new Uint8Array(a.subarray(n)).buffer}},e.addTag=function(){this.removeTag();var e,t,r=[255,254],a=10+this.frames.reduce(function(e,t){return e+t.size},0)+this.padding,n=new ArrayBuffer(this.arrayBuffer.byteLength+a),s=new Uint8Array(n),i=0,c=[];return c=[73,68,51,3],s.set(c,i),i+=c.length,i++,i++,c=[(e=a-10)>>>21&(t=127),e>>>14&t,e>>>7&t,e&t],s.set(c,i),i+=c.length,this.frames.forEach(function(e){var t,a;switch(c=o(e.name),s.set(c,i),i+=c.length,t=e.size-10,c=[t>>>24&(a=255),t>>>16&a,t>>>8&a,t&a],s.set(c,i),i+=c.length,i+=2,e.name){case"WCOM":case"WCOP":case"WOAF":case"WOAR":case"WOAS":case"WORS":case"WPAY":case"WPUB":c=o(e.value),s.set(c,i),i+=c.length;break;case"TPE1":case"TCOM":case"TCON":case"TLAN":case"TIT1":case"TIT2":case"TIT3":case"TALB":case"TPE2":case"TPE3":case"TPE4":case"TRCK":case"TPOS":case"TKEY":case"TMED":case"TPUB":case"TCOP":case"TEXT":case"TSRC":c=[1].concat(r),s.set(c,i),i+=c.length,c=u(e.value),s.set(c,i),i+=c.length;break;case"TXXX":case"USLT":case"COMM":c=[1],"USLT"!==e.name&&"COMM"!==e.name||(c=c.concat(e.language)),c=c.concat(r),s.set(c,i),i+=c.length,c=u(e.description),s.set(c,i),i+=c.length,c=[0,0].concat(r),s.set(c,i),i+=c.length,c=u(e.value),s.set(c,i),i+=c.length;break;case"TBPM":case"TLEN":case"TDAT":case"TYER":i++,c=o(e.value),s.set(c,i),i+=c.length;break;case"PRIV":c=o(e.id),s.set(c,i),i+=c.length,i++,s.set(new Uint8Array(e.value),i),i+=e.value.byteLength;break;case"APIC":c=[e.useUnicodeEncoding?1:0],s.set(c,i),i+=c.length,c=o(e.mimeType),s.set(c,i),i+=c.length,c=[0,e.pictureType],s.set(c,i),i+=c.length,e.useUnicodeEncoding?(c=[].concat(r),s.set(c,i),i+=c.length,c=u(e.description),s.set(c,i),i+=c.length,i+=2):(c=o(e.description),s.set(c,i),i+=c.length,i++),s.set(new Uint8Array(e.value),i),i+=e.value.byteLength}}),i+=this.padding,s.set(new Uint8Array(this.arrayBuffer),i),this.arrayBuffer=n},e.getBlob=function(){return new Blob([this.arrayBuffer],{type:"audio/mpeg"})},e.getURL=function(){return this.url||(this.url=URL.createObjectURL(this.getBlob())),this.url},e.revokeURL=function(){URL.revokeObjectURL(this.url)},t}()});
},{}],2:[function(require,module,exports){
(function (global){(function (){
(function(a,b){if("function"==typeof define&&define.amd)define([],b);else if("undefined"!=typeof exports)b();else{b(),a.FileSaver={exports:{}}.exports}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c)},d.onerror=function(){console.error("could not download file")},d.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null},k.readAsDataURL(b)}else{var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m)},4E4)}});f.saveAs=g.saveAs=g,"undefined"!=typeof module&&(module.exports=g)});


}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){(function (){
"use strict";

// ref: https://github.com/tc39/proposal-global
var getGlobal = function () {
	// the only reliable means to get the global object is
	// `Function('return this')()`
	// However, this causes CSP violations in Chrome apps.
	if (typeof self !== 'undefined') { return self; }
	if (typeof window !== 'undefined') { return window; }
	if (typeof global !== 'undefined') { return global; }
	throw new Error('unable to locate global object');
}

var global = getGlobal();

module.exports = exports = global.fetch;

// Needed for TypeScript and Webpack.
if (global.fetch) {
	exports.default = global.fetch.bind(global);
}

exports.Headers = global.Headers;
exports.Request = global.Request;
exports.Response = global.Response;
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
const ID3Writer = require("browser-id3-writer")
const filesaver = require("file-saver")
const fetch = require('node-fetch')

window.onload = function() {

    document.getElementById("file").onchange = function() {
        document.getElementById('filepath').style.color = "#000000"
        document.getElementById('filepath').value = document.getElementById('file').files[0].path
    }

    document.getElementById("submit").onclick = async function() {
        
        try {
            let filename = document.getElementById('file').files[0].path.split("\\")[document.getElementById('file').files[0].path.split("\\").length-1]
            let title = document.getElementById("title").value
            let artist = document.getElementById("artist").value

            if (!title) return document.getElementById("status").value = "Please enter title."
            if (!artist) return document.getElementById("status").value = "Please enter artist."

            document.getElementById("status").value = "Please wait a moment..."

            let res = await fetch(`https://some-random-api.ml/lyrics/?title=${encodeURI(artist)}_${encodeURI(title)}`)
            res = await res.json()
            let lyrics = res.lyrics

            if(!lyrics) return document.getElementById("status").value = "Couldn't find lyrics of " + title

            const reader = new FileReader();
            reader.onload = function () {
                const arrayBuffer = reader.result;
                const writer = new ID3Writer(arrayBuffer);
                writer.setFrame('USLT', {
                    description: '-',
                    lyrics: lyrics,
                    language: 'eng'
                });
                writer.addTag();
                document.getElementById("status").value = "Success!"
                const blob = writer.getBlob();
                filesaver.saveAs(blob, '(with lyrics) ' + filename);
            };
            reader.onerror = function () {
                // handle error
                console.error('Reader error', reader.error);
            };
            reader.readAsArrayBuffer(document.getElementById('file').files[0]);
        } catch (error) {
            document.getElementById("status").value = error
        }
        
    }
    
} 

},{"browser-id3-writer":1,"file-saver":2,"node-fetch":3}]},{},[4]);
