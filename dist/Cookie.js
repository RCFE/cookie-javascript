!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Cookie=t():e.Cookie=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(n){if(o[n])return o[n].exports;var r=o[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var o={};return t.m=e,t.c=o,t.d=function(e,o,n){t.o(e,o)||Object.defineProperty(e,o,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,o){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(){for(var e={},t=0;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e}function i(e){var t=function(){function t(){n(this,t)}return a(t,[{key:"set",value:function(t,o){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(t&&!/^(?:expires|max\-age|path|domain|secure)$/i.test(t)){var r="",i=n.expires,c=void 0;if(i)switch(i.constructor){case Number:if(i===1/0)r="; expires=Fri, 31 Dec 9999 23:59:59 GMT";else{var a=new Date;a.setMilliseconds(a.getMilliseconds()+864e5*i),r="; expires="+a.toUTCString(),n.maxAge=24*i*60*60}break;case String:r="; expires="+i;break;case Date:r="; expries="+i.toUTCString()}try{c=JSON.stringify(o),/^[\{\[\"]/.test(c)&&(o=c)}catch(e){console.error(e)}o=e.write?e.write(t,o):encodeURIComponent(String(o)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=encodeURIComponent(String(t)),t=t.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),t=t.replace(/[\(\)]/g,escape),document.cookie=t+"="+o+r+(n.maxAge?"; max-age="+n.maxAge:"")+(n.domain?"; domain="+n.domain:"")+(n.path?"; path="+n.path:"")+(!0===n.secure?"; "+n.secure:"")}}},{key:"get",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"__default__cookie__key__",o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{json:!1};"object"===(void 0===t?"undefined":c(t))&&(o=t,t="__default__cookie__key__");for(var n={},r=document.cookie?document.cookie.split("; "):[],i=/(%[0-9A-Z]{2})+/g,a=0,u=r.length;a<u;a++){var f=r[a].split("="),s=f.slice(1).join("=");try{var l=f[0].replace(i,decodeURIComponent);if(s=s.replace(i,decodeURIComponent),s=(e.read?e.read(l,s):e(l,s))||s,o&&o.json||"string"!=typeof s||'"'!==s.charAt(0)||(s=s.slice(1,-1)),o&&o.json)try{s=JSON.parse(s)}catch(e){console.error(e)}if(t===l){n=s;break}"__default__cookie__key__"===t&&(n[l]=s)}catch(e){console.error(e)}}return n}},{key:"remove",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"__default__cookie__key__",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("object"===(void 0===e?"undefined":c(e))&&(t=e,e="__default__cookie__key__"),"__default__cookie__key__"!==e)this.set(e,"",r(t,{expires:-1,maxAge:0}));else for(var o=Object.keys(this.get({json:!0})),n=0,i=o.length;n<i;n++){var a=o[n];this.set(a,"",r(t,{expires:-1,maxAge:0}))}}}]),t}();return t.prototype.withConverter=i,new t}Object.defineProperty(t,"__esModule",{value:!0});var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}();t.default=i(function(){})}]).default});
//# sourceMappingURL=Cookie.js.map