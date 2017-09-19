/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is a compiled version of Dojo, built for deployment and not for
	development. To get an editable version, please visit:

		http://dojotoolkit.org

	for documentation and information on getting the source.
*/

sc_dojo._xdResourceLoaded(function(_1,_2,_3){
return {depends:[["provide","scayt._base"],["provide","dojox.collections._base"],["provide","dojox.collections.Dictionary"],["provide","dojo.regexp"],["provide","dojo.cookie"],["provide","dojo.date.stamp"],["provide","dojo.parser"],["provide","dojo.io.script"],["provide","dijit._base.focus"],["provide","dijit._base.manager"],["provide","dojo.AdapterRegistry"],["provide","dijit._base.place"],["provide","dijit._base.window"],["provide","dijit._base.popup"],["provide","dijit._base.scroll"],["provide","dijit._base.sniff"],["provide","dijit._base.typematic"],["provide","dijit._base.wai"],["provide","dijit._base"],["provide","dijit._Widget"],["require","dijit._base"],["provide","dojo.string"],["provide","dijit._Templated"],["provide","dijit._Container"],["provide","dijit._Contained"],["provide","dijit.layout._LayoutWidget"],["provide","dijit.form._FormWidget"],["provide","dijit.dijit"],["provide","dijit._editor.range"],["provide","scayt"],["provide","scayt.banner"]],defineResource:function(_4,_5,_6){
_4.provide("scayt._base");
if(!_4._hasResource["dojox.collections._base"]){
_4._hasResource["dojox.collections._base"]=true;
_4.provide("dojox.collections._base");
_6.collections.DictionaryEntry=function(k,v){
this.key=k;
this.value=v;
this.valueOf=function(){
return this.value;
};
this.toString=function(){
return String(this.value);
};
};
_6.collections.Iterator=function(_9){
var a=_9;
var _b=0;
this.element=a[_b]||null;
this.atEnd=function(){
return (_b>=a.length);
};
this.get=function(){
if(this.atEnd()){
return null;
}
this.element=a[_b++];
return this.element;
};
this.map=function(fn,_d){
return _4.map(a,fn,_d);
};
this.reset=function(){
_b=0;
this.element=a[_b];
};
};
_6.collections.DictionaryIterator=function(_e){
var a=[];
var _10={};
for(var p in _e){
if(!_10[p]){
a.push(_e[p]);
}
}
var _12=0;
this.element=a[_12]||null;
this.atEnd=function(){
return (_12>=a.length);
};
this.get=function(){
if(this.atEnd()){
return null;
}
this.element=a[_12++];
return this.element;
};
this.map=function(fn,_14){
return _4.map(a,fn,_14);
};
this.reset=function(){
_12=0;
this.element=a[_12];
};
};
}
if(!_4._hasResource["dojox.collections.Dictionary"]){
_4._hasResource["dojox.collections.Dictionary"]=true;
_4.provide("dojox.collections.Dictionary");
_6.collections.Dictionary=function(_15){
var _16={};
this.count=0;
var _17={};
this.add=function(k,v){
var b=(k in _16);
_16[k]=new _6.collections.DictionaryEntry(k,v);
if(!b){
this.count++;
}
};
this.clear=function(){
_16={};
this.count=0;
};
this.clone=function(){
return new _6.collections.Dictionary(this);
};
this.contains=this.containsKey=function(k){
if(_17[k]){
return false;
}
return (_16[k]!=null);
};
this.containsValue=function(v){
var e=this.getIterator();
while(e.get()){
if(e.element.value==v){
return true;
}
}
return false;
};
this.entry=function(k){
return _16[k];
};
this.forEach=function(fn,_20){
var a=[];
for(var p in _16){
if(!_17[p]){
a.push(_16[p]);
}
}
_4.forEach(a,fn,_20);
};
this.getKeyList=function(){
return (this.getIterator()).map(function(_23){
return _23.key;
});
};
this.getValueList=function(){
return (this.getIterator()).map(function(_24){
return _24.value;
});
};
this.item=function(k){
if(k in _16){
return _16[k].valueOf();
}
return undefined;
};
this.getIterator=function(){
return new _6.collections.DictionaryIterator(_16);
};
this.remove=function(k){
if(k in _16&&!_17[k]){
delete _16[k];
this.count--;
return true;
}
return false;
};
if(_15){
var e=_15.getIterator();
while(e.get()){
this.add(e.element.key,e.element.value);
}
}
};
}
if(!_4._hasResource["dojo.regexp"]){
_4._hasResource["dojo.regexp"]=true;
_4.provide("dojo.regexp");
_4.regexp.escapeString=function(str,_29){
return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,function(ch){
if(_29&&_29.indexOf(ch)!=-1){
return ch;
}
return "\\"+ch;
});
};
_4.regexp.buildGroupRE=function(arr,re,_2d){
if(!(arr instanceof Array)){
return re(arr);
}
var b=[];
for(var i=0;i<arr.length;i++){
b.push(re(arr[i]));
}
return _4.regexp.group(b.join("|"),_2d);
};
_4.regexp.group=function(_30,_31){
return "("+(_31?"?:":"")+_30+")";
};
}
if(!_4._hasResource["dojo.cookie"]){
_4._hasResource["dojo.cookie"]=true;
_4.provide("dojo.cookie");
_4.cookie=function(_32,_33,_34){
var c=document.cookie;
if(arguments.length==1){
var _36=c.match(new RegExp("(?:^|; )"+_4.regexp.escapeString(_32)+"=([^;]*)"));
return _36?decodeURIComponent(_36[1]):undefined;
}else{
_34=_34||{};
var exp=_34.expires;
if(typeof exp=="number"){
var d=new Date();
d.setTime(d.getTime()+exp*24*60*60*1000);
exp=_34.expires=d;
}
if(exp&&exp.toUTCString){
_34.expires=exp.toUTCString();
}
_33=encodeURIComponent(_33);
var _39=_32+"="+_33,_3a;
for(_3a in _34){
_39+="; "+_3a;
var _3b=_34[_3a];
if(_3b!==true){
_39+="="+_3b;
}
}
document.cookie=_39;
}
};
_4.cookie.isSupported=function(){
if(!("cookieEnabled" in navigator)){
this("__djCookieTest__","CookiesAllowed");
navigator.cookieEnabled=this("__djCookieTest__")=="CookiesAllowed";
if(navigator.cookieEnabled){
this("__djCookieTest__","",{expires:-1});
}
}
return navigator.cookieEnabled;
};
}
if(!_4._hasResource["dojo.date.stamp"]){
_4._hasResource["dojo.date.stamp"]=true;
_4.provide("dojo.date.stamp");
_4.date.stamp.fromISOString=function(_3c,_3d){
if(!_4.date.stamp._isoRegExp){
_4.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
}
var _3e=_4.date.stamp._isoRegExp.exec(_3c);
var _3f=null;
if(_3e){
_3e.shift();
if(_3e[1]){
_3e[1]--;
}
if(_3e[6]){
_3e[6]*=1000;
}
if(_3d){
_3d=new Date(_3d);
_4.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(_40){
return _3d["get"+_40]();
}).forEach(function(_41,_42){
if(_3e[_42]===undefined){
_3e[_42]=_41;
}
});
}
_3f=new Date(_3e[0]||1970,_3e[1]||0,_3e[2]||1,_3e[3]||0,_3e[4]||0,_3e[5]||0,_3e[6]||0);
var _43=0;
var _44=_3e[7]&&_3e[7].charAt(0);
if(_44!="Z"){
_43=((_3e[8]||0)*60)+(Number(_3e[9])||0);
if(_44!="-"){
_43*=-1;
}
}
if(_44){
_43-=_3f.getTimezoneOffset();
}
if(_43){
_3f.setTime(_3f.getTime()+_43*60000);
}
}
return _3f;
};
_4.date.stamp.toISOString=function(_45,_46){
var _=function(n){
return (n<10)?"0"+n:n;
};
_46=_46||{};
var _49=[];
var _4a=_46.zulu?"getUTC":"get";
var _4b="";
if(_46.selector!="time"){
var _4c=_45[_4a+"FullYear"]();
_4b=["0000".substr((_4c+"").length)+_4c,_(_45[_4a+"Month"]()+1),_(_45[_4a+"Date"]())].join("-");
}
_49.push(_4b);
if(_46.selector!="date"){
var _4d=[_(_45[_4a+"Hours"]()),_(_45[_4a+"Minutes"]()),_(_45[_4a+"Seconds"]())].join(":");
var _4e=_45[_4a+"Milliseconds"]();
if(_46.milliseconds){
_4d+="."+(_4e<100?"0":"")+_(_4e);
}
if(_46.zulu){
_4d+="Z";
}else{
if(_46.selector!="time"){
var _4f=_45.getTimezoneOffset();
var _50=Math.abs(_4f);
_4d+=(_4f>0?"-":"+")+_(Math.floor(_50/60))+":"+_(_50%60);
}
}
_49.push(_4d);
}
return _49.join("T");
};
}
if(!_4._hasResource["dojo.parser"]){
_4._hasResource["dojo.parser"]=true;
_4.provide("dojo.parser");
_4.parser=new function(){
var d=_4;
var _52=d._scopeName+"Type";
var a=scaytConfig&&!scaytConfig.isDojoAlreadyLoaded&&d._scopeName!="dojo";
var qry=_4.config["dojoParserExtention"]?"["+_52+"]":"["+_52+"]"+(a?",[dojoType]":"");
var _55=0,_56={};
var _57=function(_58,_59){
var nso=_59||_56;
if(_4.isIE){
var cn=_58["__dojoNameCache"];
if(cn&&nso[cn]===_58){
return cn;
}
}
var _5c;
do{
_5c="__"+_55++;
}while(_5c in nso);
nso[_5c]=_58;
return _5c;
};
function _5d(_5e){
if(d.isString(_5e)){
return "string";
}
if(typeof _5e=="number"){
return "number";
}
if(typeof _5e=="boolean"){
return "boolean";
}
if(d.isFunction(_5e)){
return "function";
}
if(d.isArray(_5e)){
return "array";
}
if(_5e instanceof Date){
return "date";
}
if(_5e instanceof d._Url){
return "url";
}
return "object";
};
function _5f(_60,_61){
switch(_61){
case "string":
return _60;
case "number":
return _60.length?Number(_60):NaN;
case "boolean":
return typeof _60=="boolean"?_60:!(_60.toLowerCase()=="false");
case "function":
if(d.isFunction(_60)){
_60=_60.toString();
_60=d.trim(_60.substring(_60.indexOf("{")+1,_60.length-1));
}
try{
if(_60.search(/[^\w\.]+/i)!=-1){
_60=_57(new Function(_60),this);
}
return d.getObject(_60,false);
}
catch(e){
return new Function();
}
case "array":
return _60?_60.split(/\s*,\s*/):[];
case "date":
switch(_60){
case "":
return new Date("");
case "now":
return new Date();
default:
return d.date.stamp.fromISOString(_60);
}
case "url":
return d.baseUrl+_60;
default:
return d.fromJson(_60);
}
};
var _62={};
function _63(_64){
if(!_62[_64]){
var cls=d.getObject(_64);
if(!d.isFunction(cls)){
throw new Error("Could not load class '"+_64+"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?");
}
var _66=cls.prototype;
var _67={},_68={};
for(var _69 in _66){
if(_69.charAt(0)=="_"){
continue;
}
if(_69 in _68){
continue;
}
var _6a=_66[_69];
_67[_69]=_5d(_6a);
}
_62[_64]={cls:cls,params:_67};
}
return _62[_64];
};
this._functionFromScript=function(_6b){
var _6c="";
var _6d="";
var _6e=_6b.getAttribute("args");
if(_6e){
d.forEach(_6e.split(/\s*,\s*/),function(_6f,idx){
_6c+="var "+_6f+" = arguments["+idx+"]; ";
});
}
var _71=_6b.getAttribute("with");
if(_71&&_71.length){
d.forEach(_71.split(/\s*,\s*/),function(_72){
_6c+="with("+_72+"){";
_6d+="}";
});
}
return new Function(_6c+_6b.innerHTML+_6d);
};
this.instantiate=function(_73,_74){
var _75=[];
_74=_74||{};
d.forEach(_73,function(_76){
if(!_76){
return;
}
var _77=_52 in _74?_74[_52]:_76.getAttribute(_52);
if(!_77||!_77.length){
return;
}
var _78=_63(_77),_79=_78.cls,ps=_79._noScript||_79.prototype._noScript;
var _7b={},_7c=_76.attributes;
for(var _7d in _78.params){
var _7e=_7d in _74?{value:_74[_7d],specified:true}:_7c.getNamedItem(_7d);
if(!_7e||(!_7e.specified&&(!_4.isIE||_7d.toLowerCase()!="value"))){
continue;
}
var _7f=_7e.value;
switch(_7d){
case "class":
_7f="className" in _74?_74.className:_76.className;
break;
case "style":
_7f="style" in _74?_74.style:(_76.style&&_76.style.cssText);
}
var _80=_78.params[_7d];
if(typeof _7f=="string"){
_7b[_7d]=_5f(_7f,_80);
}else{
_7b[_7d]=_7f;
}
}
if(!ps){
var _81=[],_82=[];
d.query("> script[type^='dojo/']",_76).orphan().forEach(function(_83){
var _84=_83.getAttribute("event"),_77=_83.getAttribute("type"),nf=d.parser._functionFromScript(_83);
if(_84){
if(_77=="dojo/connect"){
_81.push({event:_84,func:nf});
}else{
_7b[_84]=nf;
}
}else{
_82.push(nf);
}
});
}
var _86=_79["markupFactory"];
if(!_86&&_79["prototype"]){
_86=_79.prototype["markupFactory"];
}
var _87=_86?_86(_7b,_76,_79):new _79(_7b,_76);
_75.push(_87);
var _88=_76.getAttribute("jsId");
if(_88){
d.setObject(_88,_87);
}
if(!ps){
d.forEach(_81,function(_89){
d.connect(_87,_89.event,null,_89.func);
});
d.forEach(_82,function(_8a){
_8a.call(_87);
});
}
});
d.forEach(_75,function(_8b){
if(_8b&&_8b.startup&&!_8b._started&&(!_8b.getParent||!_8b.getParent())){
_8b.startup();
}
});
return _75;
};
this.parse=function(_8c){
var _8d=d.query(qry,_8c);
if(a){
_8d.forEach(function(_8e){
if(!_4.hasAttr(_8e,String(_52))){
var _8f=_4.attr(_8e,"dojoType");
var obj={};
obj[_52]=_8f;
_4.attr(_8e,obj);
}
});
}
var _91=this.instantiate(_8d);
return _91;
};
}();
(function(){
var _92=function(){
if(_4.config["parseOnLoad"]==true){
_4.parser.parse();
}
};
if(_4.exists("dijit.wai.onload")&&(_5.wai.onload===_4._loaders[0])){
_4._loaders.splice(1,0,_92);
}else{
_4._loaders.unshift(_92);
}
})();
}
if(!_4._hasResource["dojo.io.script"]){
_4._hasResource["dojo.io.script"]=true;
_4.provide("dojo.io.script");
_4.io.script={get:function(_93){
var dfd=this._makeScriptDeferred(_93);
var _95=dfd.ioArgs;
_4._ioAddQueryToUrl(_95);
if(this._canAttach(_95)){
this.attach(_95.id,_95.url,_93.frameDoc);
}
_4._ioWatch(dfd,this._validCheck,this._ioCheck,this._resHandle);
return dfd;
},attach:function(id,url,_98){
var doc=(_98||_4.doc);
var _9a=doc.createElement("script");
_9a.type="text/javascript";
_9a.src=url;
_9a.id=id;
_9a.charset="utf-8";
doc.getElementsByTagName("head")[0].appendChild(_9a);
},remove:function(id,_9c){
_4.destroy(_4.byId(id,_9c));
if(this["jsonp_"+id]){
delete this["jsonp_"+id];
}
},_makeScriptDeferred:function(_9d){
var dfd=_4._ioSetArgs(_9d,this._deferredCancel,this._deferredOk,this._deferredError);
var _9f=dfd.ioArgs;
_9f.id=_4._scopeName+"IoScript"+(this._counter++);
_9f.canDelete=false;
if(_9d.callbackParamName){
_9f.query=_9f.query||"";
if(_9f.query.length>0){
_9f.query+="&";
}
_9f.query+=_9d.callbackParamName+"="+(_9d.frameDoc?"parent.":"")+_4._scopeName+".io.script.jsonp_"+_9f.id+"._jsonpCallback";
_9f.frameDoc=_9d.frameDoc;
_9f.canDelete=true;
dfd._jsonpCallback=this._jsonpCallback;
this["jsonp_"+_9f.id]=dfd;
}
return dfd;
},_deferredCancel:function(dfd){
dfd.canceled=true;
if(dfd.ioArgs.canDelete){
_4.io.script._addDeadScript(dfd.ioArgs);
}
},_deferredOk:function(dfd){
if(dfd.ioArgs.canDelete){
_4.io.script._addDeadScript(dfd.ioArgs);
}
if(dfd.ioArgs.json){
return dfd.ioArgs.json;
}else{
return dfd.ioArgs;
}
},_deferredError:function(_a2,dfd){
if(dfd.ioArgs.canDelete){
if(_a2.dojoType=="timeout"){
_4.io.script.remove(dfd.ioArgs.id,dfd.ioArgs.frameDoc);
}else{
_4.io.script._addDeadScript(dfd.ioArgs);
}
}
return _a2;
},_deadScripts:[],_counter:1,_addDeadScript:function(_a4){
_4.io.script._deadScripts.push({id:_a4.id,frameDoc:_a4.frameDoc});
_a4.frameDoc=null;
},_validCheck:function(dfd){
var _a6=_4.io.script;
var _a7=_a6._deadScripts;
if(_a7&&_a7.length>0){
for(var i=0;i<_a7.length;i++){
_a6.remove(_a7[i].id,_a7[i].frameDoc);
_a7[i].frameDoc=null;
}
_4.io.script._deadScripts=[];
}
return true;
},_ioCheck:function(dfd){
if(dfd.ioArgs.json){
return true;
}
var _aa=dfd.ioArgs.args.checkString;
if(_aa&&eval("typeof("+_aa+") != 'undefined'")){
return true;
}
return false;
},_resHandle:function(dfd){
if(_4.io.script._ioCheck(dfd)){
dfd.callback(dfd);
}else{
dfd.errback(new Error("inconceivable dojo.io.script._resHandle error"));
}
},_canAttach:function(_ac){
return true;
},_jsonpCallback:function(_ad){
this.ioArgs.json=_ad;
}};
}
if(!_4._hasResource["dijit._base.focus"]){
_4._hasResource["dijit._base.focus"]=true;
_4.provide("dijit._base.focus");
_4.mixin(_5,{_curFocus:null,_prevFocus:null,isCollapsed:function(){
var _ae=_4.doc;
if(_ae.selection){
var s=_ae.selection;
if(s.type=="Text"){
return !s.createRange().htmlText.length;
}else{
return !s.createRange().length;
}
}else{
var _b0=_4.global;
var _b1=_b0.getSelection();
if(_4.isString(_b1)){
return !_b1;
}else{
return !_b1||_b1.isCollapsed||!_b1.toString();
}
}
},getBookmark:function(){
var _b2,_b3=_4.doc.selection;
if(_b3){
var _b4=_b3.createRange();
if(_b3.type.toUpperCase()=="CONTROL"){
if(_b4.length){
_b2=[];
var i=0,len=_b4.length;
while(i<len){
_b2.push(_b4.item(i++));
}
}else{
_b2=null;
}
}else{
_b2=_b4.getBookmark();
}
}else{
if(window.getSelection){
_b3=_4.global.getSelection();
if(_b3){
_b4=_b3.getRangeAt(0);
_b2=_b4.cloneRange();
}
}else{
console.warn("No idea how to store the current selection for this browser!");
}
}
return _b2;
},moveToBookmark:function(_b7){
var _b8=_4.doc;
if(_b8.selection){
var _b9;
if(_4.isArray(_b7)){
_b9=_b8.body.createControlRange();
_4.forEach(_b7,function(n){
_b9.addElement(n);
});
}else{
_b9=_b8.selection.createRange();
_b9.moveToBookmark(_b7);
}
_b9.select();
}else{
var _bb=_4.global.getSelection&&_4.global.getSelection();
if(_bb&&_bb.removeAllRanges){
_bb.removeAllRanges();
_bb.addRange(_b7);
}else{
console.warn("No idea how to restore selection for this browser!");
}
}
},getFocus:function(_bc,_bd){
return {node:_bc&&_4.isDescendant(_5._curFocus,_bc.domNode)?_5._prevFocus:_5._curFocus,bookmark:!_4.withGlobal(_bd||_4.global,_5.isCollapsed)?_4.withGlobal(_bd||_4.global,_5.getBookmark):null,openedForWindow:_bd};
},focus:function(_be){
if(!_be){
return;
}
var _bf="node" in _be?_be.node:_be,_c0=_be.bookmark,_c1=_be.openedForWindow;
if(_bf){
var _c2=(_bf.tagName.toLowerCase()=="iframe")?_bf.contentWindow:_bf;
if(_c2&&_c2.focus){
try{
_c2.focus();
}
catch(e){
}
}
_5._onFocusNode(_bf);
}
if(_c0&&_4.withGlobal(_c1||_4.global,_5.isCollapsed)){
if(_c1){
_c1.focus();
}
try{
_4.withGlobal(_c1||_4.global,_5.moveToBookmark,null,[_c0]);
}
catch(e){
}
}
},_activeStack:[],registerIframe:function(_c3){
_5.registerWin(_c3.contentWindow,_c3);
},registerWin:function(_c4,_c5){
_4.connect(_c4.document,"onmousedown",function(evt){
_5._justMouseDowned=true;
setTimeout(function(){
_5._justMouseDowned=false;
},0);
_5._onTouchNode(_c5||evt.target||evt.srcElement);
});
var doc=_c4.document;
if(doc){
if(_4.isIE){
doc.attachEvent("onactivate",function(evt){
if(evt.srcElement.tagName.toLowerCase()!="#document"){
_5._onFocusNode(_c5||evt.srcElement);
}
});
doc.attachEvent("ondeactivate",function(evt){
_5._onBlurNode(_c5||evt.srcElement);
});
}else{
doc.addEventListener("focus",function(evt){
_5._onFocusNode(_c5||evt.target);
},true);
doc.addEventListener("blur",function(evt){
_5._onBlurNode(_c5||evt.target);
},true);
doc.addEventListener("contextmenu",function(evt){
scayt.contextX=evt.clientX;
scayt.contextY=evt.clientY;
},true);
}
}
doc=null;
},_onBlurNode:function(_cd){
_5._prevFocus=_5._curFocus;
_5._curFocus=null;
if(_5._justMouseDowned){
return;
}
if(_5._clearActiveWidgetsTimer){
clearTimeout(_5._clearActiveWidgetsTimer);
}
_5._clearActiveWidgetsTimer=setTimeout(function(){
delete _5._clearActiveWidgetsTimer;
_5._setStack([]);
_5._prevFocus=null;
},100);
},_onTouchNode:function(_ce){
if(_5._clearActiveWidgetsTimer){
clearTimeout(_5._clearActiveWidgetsTimer);
delete _5._clearActiveWidgetsTimer;
}
var _cf=[];
try{
while(_ce){
if(_ce.dijitPopupParent){
_ce=_5.byId(_ce.dijitPopupParent).domNode;
}else{
if(_ce.tagName&&_ce.tagName.toLowerCase()=="body"){
if(_ce===_4.body()){
break;
}
_ce=_5.getDocumentWindow(_ce.ownerDocument).frameElement;
}else{
var id=_ce.getAttribute&&_ce.getAttribute("widgetId");
if(id){
_cf.unshift(id);
}
_ce=_ce.parentNode;
}
}
}
}
catch(e){
}
_5._setStack(_cf);
},_onFocusNode:function(_d1){
if(!_d1){
return;
}
if(_d1.nodeType==9){
return;
}
_5._onTouchNode(_d1);
if(_d1==_5._curFocus){
return;
}
if(_5._curFocus){
_5._prevFocus=_5._curFocus;
}
_5._curFocus=_d1;
_4.publish("focusNode",[_d1]);
},_setStack:function(_d2){
var _d3=_5._activeStack;
_5._activeStack=_d2;
for(var _d4=0;_d4<Math.min(_d3.length,_d2.length);_d4++){
if(_d3[_d4]!=_d2[_d4]){
break;
}
}
for(var i=_d3.length-1;i>=_d4;i--){
var _d6=_5.byId(_d3[i]);
if(_d6){
_d6._focused=false;
_d6._hasBeenBlurred=true;
if(_d6._onBlur){
_d6._onBlur();
}
if(_d6._setStateClass){
_d6._setStateClass();
}
_4.publish("widgetBlur",[_d6]);
}
}
for(i=_d4;i<_d2.length;i++){
_d6=_5.byId(_d2[i]);
if(_d6){
_d6._focused=true;
if(_d6._onFocus){
_d6._onFocus();
}
if(_d6._setStateClass){
_d6._setStateClass();
}
_4.publish("widgetFocus",[_d6]);
}
}
}});
_4.addOnLoad(function(){
_5.registerWin(window);
});
}
if(!_4._hasResource["dijit._base.manager"]){
_4._hasResource["dijit._base.manager"]=true;
_4.provide("dijit._base.manager");
_4.declare("dijit.WidgetSet",null,{constructor:function(){
this._hash={};
},add:function(_d7){
if(this._hash[_d7.id]){
throw new Error("Tried to register widget with id=="+_d7.id+" but that id is already registered");
}
this._hash[_d7.id]=_d7;
},remove:function(id){
delete this._hash[id];
},forEach:function(_d9){
for(var id in this._hash){
_d9(this._hash[id]);
}
},filter:function(_db){
var res=new _5.WidgetSet();
this.forEach(function(_dd){
if(_db(_dd)){
res.add(_dd);
}
});
return res;
},byId:function(id){
return this._hash[id];
},byClass:function(cls){
return this.filter(function(_e0){
return _e0.declaredClass==cls;
});
}});
_5.registry=new _5.WidgetSet();
_5._widgetTypeCtr={};
_5.getUniqueId=function(_e1){
var id;
do{
id=_e1+"_"+(_e1 in _5._widgetTypeCtr?++_5._widgetTypeCtr[_e1]:_5._widgetTypeCtr[_e1]=0);
}while(_5.byId(id));
return id;
};
_5.findWidgets=function(_e3){
var _e4=[];
function _e5(_e6){
var _e7=_4.isIE?_e6.children:_e6.childNodes,i=0,_e9;
while(_e9=_e7[i++]){
if(_e9.nodeType!=1){
continue;
}
var _ea=_e9.getAttribute("widgetId");
if(_ea){
var _eb=_5.byId(_ea);
_e4.push(_eb);
}else{
_e5(_e9);
}
}
};
_e5(_e3);
return _e4;
};
if(_4.isIE){
_4.addOnWindowUnload(function(){
_4.forEach(_5.findWidgets(_4.body()),function(_ec){
if(_ec.destroyRecursive){
_ec.destroyRecursive();
}else{
if(_ec.destroy){
_ec.destroy();
}
}
});
});
}
_5.byId=function(id){
return (_4.isString(id))?_5.registry.byId(id):id;
};
_5.byNode=function(_ee){
return _5.registry.byId(_ee.getAttribute("widgetId"));
};
_5.getEnclosingWidget=function(_ef){
while(_ef){
if(_ef.getAttribute&&_ef.getAttribute("widgetId")){
return _5.registry.byId(_ef.getAttribute("widgetId"));
}
_ef=_ef.parentNode;
}
return null;
};
_5._tabElements={area:true,button:true,input:true,object:true,select:true,textarea:true};
_5._isElementShown=function(_f0){
var _f1=_4.style(_f0);
return (_f1.visibility!="hidden")&&(_f1.visibility!="collapsed")&&(_f1.display!="none")&&(_4.attr(_f0,"type")!="hidden");
};
_5.isTabNavigable=function(_f2){
if(_4.hasAttr(_f2,"disabled")){
return false;
}
var _f3=_4.hasAttr(_f2,"tabindex");
var _f4=_4.attr(_f2,"tabindex");
if(_f3&&_f4>=0){
return true;
}
var _f5=_f2.nodeName.toLowerCase();
if(((_f5=="a"&&_4.hasAttr(_f2,"href"))||_5._tabElements[_f5])&&(!_f3||_f4>=0)){
return true;
}
return false;
};
_5._getTabNavigable=function(_f6){
var _f7,_f8,_f9,_fa,_fb,_fc;
var _fd=function(_fe){
_4.query("> *",_fe).forEach(function(_ff){
var _100=_5._isElementShown(_ff);
if(_100&&_5.isTabNavigable(_ff)){
var _101=_4.attr(_ff,"tabindex");
if(!_4.hasAttr(_ff,"tabindex")||_101==0){
if(!_f7){
_f7=_ff;
}
_f8=_ff;
}else{
if(_101>0){
if(!_f9||_101<_fa){
_fa=_101;
_f9=_ff;
}
if(!_fb||_101>=_fc){
_fc=_101;
_fb=_ff;
}
}
}
}
if(_100&&_ff.nodeName.toUpperCase()!="SELECT"){
_fd(_ff);
}
});
};
if(_5._isElementShown(_f6)){
_fd(_f6);
}
return {first:_f7,last:_f8,lowest:_f9,highest:_fb};
};
_5.getFirstInTabbingOrder=function(root){
var _103=_5._getTabNavigable(_4.byId(root));
return _103.lowest?_103.lowest:_103.first;
};
_5.getLastInTabbingOrder=function(root){
var _105=_5._getTabNavigable(_4.byId(root));
return _105.last?_105.last:_105.highest;
};
_5.defaultDuration=_4.config["defaultDuration"]||200;
}
if(!_4._hasResource["dojo.AdapterRegistry"]){
_4._hasResource["dojo.AdapterRegistry"]=true;
_4.provide("dojo.AdapterRegistry");
_4.AdapterRegistry=function(_106){
this.pairs=[];
this.returnWrappers=_106||false;
};
_4.extend(_4.AdapterRegistry,{register:function(name,_108,wrap,_10a,_10b){
this.pairs[((_10b)?"unshift":"push")]([name,_108,wrap,_10a]);
},match:function(){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[1].apply(this,arguments)){
if((pair[3])||(this.returnWrappers)){
return pair[2];
}else{
return pair[2].apply(this,arguments);
}
}
}
throw new Error("No match found");
},unregister:function(name){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[0]==name){
this.pairs.splice(i,1);
return true;
}
}
return false;
}});
}
if(!_4._hasResource["dijit._base.place"]){
_4._hasResource["dijit._base.place"]=true;
_4.provide("dijit._base.place");
_5.getViewport=function(){
var _111=(_4.doc.compatMode=="BackCompat")?_4.body():_4.doc.documentElement;
var _112=_4._docScroll();
return {w:_111.clientWidth,h:_111.clientHeight,l:_112.x,t:_112.y};
};
_5.placeOnScreen=function(node,pos,_115,_116){
var _117=_4.map(_115,function(_118){
var c={corner:_118,pos:{x:pos.x,y:pos.y}};
if(_116){
c.pos.x+=_118.charAt(1)=="L"?_116.x:-_116.x;
c.pos.y+=_118.charAt(0)=="T"?_116.y:-_116.y;
}
return c;
});
return _5._place(node,_117);
};
_5._place=function(node,_11b,_11c){
var view=_5.getViewport();
if(!node.parentNode||String(node.parentNode.tagName).toLowerCase()!="body"){
_4.body().appendChild(node);
}
var best=null;
_4.some(_11b,function(_11f){
var _120=_11f.corner;
var pos=_11f.pos;
if(_11c){
_11c(node,_11f.aroundCorner,_120);
}
var _122=node.style;
var _123=_122.display;
var _124=_122.visibility;
_122.visibility="hidden";
_122.display="";
var mb=_4.marginBox(node);
_122.display=_123;
_122.visibility=_124;
var _126=(_120.charAt(1)=="L"?pos.x:Math.max(view.l,pos.x-mb.w)),_127=(_120.charAt(0)=="T"?pos.y:Math.max(view.t,pos.y-mb.h)),endX=(_120.charAt(1)=="L"?Math.min(view.l+view.w,_126+mb.w):pos.x),endY=(_120.charAt(0)=="T"?Math.min(view.t+view.h,_127+mb.h):pos.y),_12a=endX-_126,_12b=endY-_127,_12c=(mb.w-_12a)+(mb.h-_12b);
if(best==null||_12c<best.overflow){
best={corner:_120,aroundCorner:_11f.aroundCorner,x:_126,y:_127,w:_12a,h:_12b,overflow:_12c};
}
return !_12c;
});
node.style.left=best.x+"px";
node.style.top=best.y+"px";
if(best.overflow&&_11c){
_11c(node,best.aroundCorner,best.corner);
}
return best;
};
_5.placeOnScreenAroundNode=function(node,_12e,_12f,_130){
_12e=_4.byId(_12e);
var _131=_12e.style.display;
_12e.style.display="";
var _132=_12e.offsetWidth;
var _133=_12e.offsetHeight;
var _134=_4.coords(_12e,true);
_12e.style.display=_131;
return _5._placeOnScreenAroundRect(node,_134.x,_134.y,_132,_133,_12f,_130);
};
_5.placeOnScreenAroundRectangle=function(node,_136,_137,_138){
return _5._placeOnScreenAroundRect(node,_136.x,_136.y,_136.width,_136.height,_137,_138);
};
_5._placeOnScreenAroundRect=function(node,x,y,_13c,_13d,_13e,_13f){
var _140=[];
for(var _141 in _13e){
_140.push({aroundCorner:_141,corner:_13e[_141],pos:{x:x+(_141.charAt(1)=="L"?0:_13c),y:y+(_141.charAt(0)=="T"?0:_13d)}});
}
return _5._place(node,_140,_13f);
};
_5.placementRegistry=new _4.AdapterRegistry();
_5.placementRegistry.register("node",function(n,x){
return typeof x=="object"&&typeof x.offsetWidth!="undefined"&&typeof x.offsetHeight!="undefined";
},_5.placeOnScreenAroundNode);
_5.placementRegistry.register("rect",function(n,x){
return typeof x=="object"&&"x" in x&&"y" in x&&"width" in x&&"height" in x;
},_5.placeOnScreenAroundRectangle);
_5.placeOnScreenAroundElement=function(node,_147,_148,_149){
return _5.placementRegistry.match.apply(_5.placementRegistry,arguments);
};
}
if(!_4._hasResource["dijit._base.window"]){
_4._hasResource["dijit._base.window"]=true;
_4.provide("dijit._base.window");
_5.getDocumentWindow=function(doc){
if(_4.isIE6&&window!==document.parentWindow&&!doc._parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc._parentWindow||doc.parentWindow||doc.defaultView;
};
}
if(!_4._hasResource["dijit._base.popup"]){
_4._hasResource["dijit._base.popup"]=true;
_4.provide("dijit._base.popup");
_5.popup=new function(){
var _14c=[],_14d=1000,_14e=1;
this.prepare=function(node){
var s=node.style;
s.visibility="hidden";
s.position="absolute";
s.top="-9999px";
if(s.display=="none"){
s.display="";
}
_4.body().appendChild(node);
};
this.open=function(args){
var _152=args.popup,_153=args.orient||{"BL":"TL","TL":"BL"},_154=args.around,id=(args.around&&args.around.id)?(args.around.id+"_dropdown"):("popup_"+_14e++);
var _156=_4.create("div",{id:id,"class":"dijitPopup",style:{zIndex:_14d+_14c.length,visibility:"hidden"}},_4.body());
_5.setWaiRole(_156,"presentation");
_156.style.left=_156.style.top="0px";
if(args.parent){
_156.dijitPopupParent=args.parent.id;
}
var s=_152.domNode.style;
s.display="";
s.visibility="";
s.position="";
s.top="0px";
_156.appendChild(_152.domNode);
var _158=new _5.BackgroundIframe(_156);
var best=_154?_5.placeOnScreenAroundElement(_156,_154,_153,_152.orient?_4.hitch(_152,"orient"):null):_5.placeOnScreen(_156,args,_153=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"],args.padding);
_156.style.visibility="visible";
var _15a=[];
var _15b=function(){
for(var pi=_14c.length-1;pi>0&&_14c[pi].parent===_14c[pi-1].widget;pi--){
}
return _14c[pi];
};
_15a.push(_4.connect(_156,"onkeypress",this,function(evt){
if(evt.charOrCode==_4.keys.ESCAPE&&args.onCancel){
_4.stopEvent(evt);
args.onCancel();
}else{
if(evt.charOrCode===_4.keys.TAB){
_4.stopEvent(evt);
var _15e=_15b();
if(_15e&&_15e.onCancel){
_15e.onCancel();
}
}
}
}));
if(_152.onCancel){
_15a.push(_4.connect(_152,"onCancel",null,args.onCancel));
}
_15a.push(_4.connect(_152,_152.onExecute?"onExecute":"onChange",null,function(){
var _15f=_15b();
if(_15f&&_15f.onExecute){
_15f.onExecute();
}
}));
_14c.push({wrapper:_156,iframe:_158,widget:_152,parent:args.parent,onExecute:args.onExecute,onCancel:args.onCancel,onClose:args.onClose,handlers:_15a});
if(_152.onOpen){
_152.onOpen(best);
}
return best;
};
this.close=function(_160){
while(_4.some(_14c,function(elem){
return elem.widget==_160;
})){
var top=_14c.pop(),_163=top.wrapper,_164=top.iframe,_165=top.widget,_166=top.onClose;
if(_165.onClose){
_165.onClose();
}
_4.forEach(top.handlers,_4.disconnect);
if(!_165||!_165.domNode){
return;
}
this.prepare(_165.domNode);
_164.destroy();
_4.destroy(_163);
if(_166){
_166();
}
}
};
}();
_5._frames=new function(){
var _167=[];
this.pop=function(){
var _168;
if(_167.length){
_168=_167.pop();
_168.style.display="";
}else{
if(_4.isIE){
var burl=_4.config["dojoBlankHtmlUrl"]||(_4.moduleUrl("dojo","resources/blank.html")+"")||"javascript:\"\"";
var html="<iframe src='"+burl+"'"+" style='position: absolute; left: 0px; top: 0px;"+"z-index: -1; filter:Alpha(Opacity=\"0\");'>";
_168=_4.doc.createElement(html);
}else{
_168=_4.create("iframe");
_168.src="javascript:\"\"";
_168.className="dijitBackgroundIframe";
}
_168.tabIndex=-1;
_4.body().appendChild(_168);
}
return _168;
};
this.push=function(_16b){
_16b.style.display="none";
if(_4.isIE){
_16b.style.removeExpression("width");
_16b.style.removeExpression("height");
}
_167.push(_16b);
};
}();
_5.BackgroundIframe=function(node){
if(!node.id){
throw new Error("no id");
}
if(_4.isIE<7||(_4.isFF<3&&_4.hasClass(_4.body(),"dijit_a11y"))){
var _16d=_5._frames.pop();
node.appendChild(_16d);
if(_4.isIE){
_16d.style.setExpression("width",_4._scopeName+".doc.getElementById('"+node.id+"').offsetWidth");
_16d.style.setExpression("height",_4._scopeName+".doc.getElementById('"+node.id+"').offsetHeight");
}
this.iframe=_16d;
}
};
_4.extend(_5.BackgroundIframe,{destroy:function(){
if(this.iframe){
_5._frames.push(this.iframe);
delete this.iframe;
}
}});
}
if(!_4._hasResource["dijit._base.scroll"]){
_4._hasResource["dijit._base.scroll"]=true;
_4.provide("dijit._base.scroll");
_5.scrollIntoView=function(node){
try{
node=_4.byId(node);
var doc=_4.doc;
var body=_4.body();
var html=body.parentNode;
if((!(_4.isFF>=3||_4.isIE||_4.isWebKit)||node==body||node==html)&&(typeof node.scrollIntoView=="function")){
node.scrollIntoView(false);
return;
}
var ltr=_4._isBodyLtr();
var _173=_4.isIE>=8&&!_174;
var rtl=!ltr&&!_173;
var _176=body;
var _174=doc.compatMode=="BackCompat";
if(_174){
html._offsetWidth=html._clientWidth=body._offsetWidth=body.clientWidth;
html._offsetHeight=html._clientHeight=body._offsetHeight=body.clientHeight;
}else{
if(_4.isWebKit){
body._offsetWidth=body._clientWidth=html.clientWidth;
body._offsetHeight=body._clientHeight=html.clientHeight;
}else{
_176=html;
}
html._offsetHeight=html.clientHeight;
html._offsetWidth=html.clientWidth;
}
function _177(_178){
var ie=_4.isIE;
return ((ie<=6||(ie>=7&&_174))?false:(_4.style(_178,"position").toLowerCase()=="fixed"));
};
function _17a(_17b){
var _17c=_17b.parentNode;
var _17d=_17b.offsetParent;
if(_17d==null||_177(_17b)){
_17d=html;
_17c=(_17b==body)?html:null;
}
_17b._offsetParent=_17d;
_17b._parent=_17c;
var bp=_4._getBorderExtents(_17b);
_17b._borderStart={H:(_173&&!ltr)?(bp.w-bp.l):bp.l,V:bp.t};
_17b._borderSize={H:bp.w,V:bp.h};
_17b._scrolledAmount={H:_17b.scrollLeft,V:_17b.scrollTop};
_17b._offsetSize={H:_17b._offsetWidth||_17b.offsetWidth,V:_17b._offsetHeight||_17b.offsetHeight};
_17b._offsetStart={H:(_173&&!ltr)?_17d.clientWidth-_17b.offsetLeft-_17b._offsetSize.H:_17b.offsetLeft,V:_17b.offsetTop};
_17b._clientSize={H:_17b._clientWidth||_17b.clientWidth,V:_17b._clientHeight||_17b.clientHeight};
if(_17b!=body&&_17b!=html&&_17b!=node){
for(var dir in _17b._offsetSize){
var _180=_17b._offsetSize[dir]-_17b._clientSize[dir]-_17b._borderSize[dir];
var _181=_17b._clientSize[dir]>0&&_180>0;
if(_181){
_17b._offsetSize[dir]-=_180;
if(_4.isIE&&rtl&&dir=="H"){
_17b._offsetStart[dir]+=_180;
}
}
}
}
};
var _182=node;
while(_182!=null){
if(_177(_182)){
node.scrollIntoView(false);
return;
}
_17a(_182);
_182=_182._parent;
}
if(_4.isIE&&node._parent){
var _183=node._offsetParent;
node._offsetStart.H+=_183._borderStart.H;
node._offsetStart.V+=_183._borderStart.V;
}
if(_4.isIE>=7&&_176==html&&rtl&&body._offsetStart&&body._offsetStart.H==0){
var _184=html.scrollWidth-html._offsetSize.H;
if(_184>0){
body._offsetStart.H=-_184;
}
}
if(_4.isIE<=6&&!_174){
html._offsetSize.H+=html._borderSize.H;
html._offsetSize.V+=html._borderSize.V;
}
if(rtl&&body._offsetStart&&_176==html&&html._scrolledAmount){
var ofs=body._offsetStart.H;
if(ofs<0){
html._scrolledAmount.H+=ofs;
body._offsetStart.H=0;
}
}
_182=node;
while(_182){
var _186=_182._parent;
if(!_186){
break;
}
if(_186.tagName=="TD"){
var _187=_186._parent._parent._parent;
if(_186!=_182._offsetParent&&_186._offsetParent!=_182._offsetParent){
_186=_187;
}
}
var _188=_182._offsetParent==_186;
for(var dir in _182._offsetStart){
var _18a=dir=="H"?"V":"H";
if(rtl&&dir=="H"&&(_186!=html)&&(_186!=body)&&(_4.isIE||_4.isWebKit)&&_186._clientSize.H>0&&_186.scrollWidth>_186._clientSize.H){
var _18b=_186.scrollWidth-_186._clientSize.H;
if(_18b>0){
_186._scrolledAmount.H-=_18b;
}
}
if(_186._offsetParent.tagName=="TABLE"){
if(_4.isIE){
_186._offsetStart[dir]-=_186._offsetParent._borderStart[dir];
_186._borderStart[dir]=_186._borderSize[dir]=0;
}else{
_186._offsetStart[dir]+=_186._offsetParent._borderStart[dir];
}
}
if(_4.isIE){
_186._offsetStart[dir]+=_186._offsetParent._borderStart[dir];
}
var _18c=_182._offsetStart[dir]-_186._scrolledAmount[dir]-(_188?0:_186._offsetStart[dir])-_186._borderStart[dir];
var _18d=_18c+_182._offsetSize[dir]-_186._offsetSize[dir]+_186._borderSize[dir];
var _18e=(dir=="H")?"scrollLeft":"scrollTop";
var _18f=dir=="H"&&rtl;
var _190=_18f?-_18d:_18c;
var _191=_18f?-_18c:_18d;
var _192=(_190*_191<=0)?0:Math[(_190<0)?"max":"min"](_190,_191);
if(_192!=0){
var _193=_186[_18e];
_186[_18e]+=(_18f)?-_192:_192;
var _194=_186[_18e]-_193;
}
if(_188){
_182._offsetStart[dir]+=_186._offsetStart[dir];
}
_182._offsetStart[dir]-=_186[_18e];
}
_182._parent=_186._parent;
_182._offsetParent=_186._offsetParent;
}
_186=node;
var next;
while(_186&&_186.removeAttribute){
next=_186.parentNode;
_186.removeAttribute("_offsetParent");
_186.removeAttribute("_parent");
_186=next;
}
}
catch(error){
console.error("scrollIntoView: "+error);
node.scrollIntoView(false);
}
};
}
if(!_4._hasResource["dijit._base.sniff"]){
_4._hasResource["dijit._base.sniff"]=true;
_4.provide("dijit._base.sniff");
(function(){
var d=_4,html=d.doc.documentElement,ie=d.isIE,_199=d.isOpera,maj=Math.floor,ff=d.isFF,_19c=d.boxModel.replace(/-/,""),_19d={dj_ie:ie,dj_ie6:maj(ie)==6,dj_ie7:maj(ie)==7,dj_iequirks:ie&&d.isQuirks,dj_opera:_199,dj_opera8:maj(_199)==8,dj_opera9:maj(_199)==9,dj_khtml:d.isKhtml,dj_webkit:d.isWebKit,dj_safari:d.isSafari,dj_gecko:d.isMozilla,dj_ff2:maj(ff)==2,dj_ff3:maj(ff)==3};
_19d["dj_"+_19c]=true;
for(var p in _19d){
if(_19d[p]){
if(html.className){
html.className+=" "+p;
}else{
html.className=p;
}
}
}
_4._loaders.unshift(function(){
if(!_4._isBodyLtr()){
html.className+=" dijitRtl";
for(var p in _19d){
if(_19d[p]){
html.className+=" "+p+"-rtl";
}
}
}
});
})();
}
if(!_4._hasResource["dijit._base.typematic"]){
_4._hasResource["dijit._base.typematic"]=true;
_4.provide("dijit._base.typematic");
_5.typematic={_fireEventAndReload:function(){
this._timer=null;
this._callback(++this._count,this._node,this._evt);
this._currentTimeout=(this._currentTimeout<0)?this._initialDelay:((this._subsequentDelay>1)?this._subsequentDelay:Math.round(this._currentTimeout*this._subsequentDelay));
this._timer=setTimeout(_4.hitch(this,"_fireEventAndReload"),this._currentTimeout);
},trigger:function(evt,_1a1,node,_1a3,obj,_1a5,_1a6){
if(obj!=this._obj){
this.stop();
this._initialDelay=_1a6||500;
this._subsequentDelay=_1a5||0.9;
this._obj=obj;
this._evt=evt;
this._node=node;
this._currentTimeout=-1;
this._count=-1;
this._callback=_4.hitch(_1a1,_1a3);
this._fireEventAndReload();
}
},stop:function(){
if(this._timer){
clearTimeout(this._timer);
this._timer=null;
}
if(this._obj){
this._callback(-1,this._node,this._evt);
this._obj=null;
}
},addKeyListener:function(node,_1a8,_1a9,_1aa,_1ab,_1ac){
if(_1a8.keyCode){
_1a8.charOrCode=_1a8.keyCode;
_4.deprecated("keyCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}else{
if(_1a8.charCode){
_1a8.charOrCode=String.fromCharCode(_1a8.charCode);
_4.deprecated("charCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}
}
return [_4.connect(node,"onkeypress",this,function(evt){
if(evt.charOrCode==_1a8.charOrCode&&(_1a8.ctrlKey===undefined||_1a8.ctrlKey==evt.ctrlKey)&&(_1a8.altKey===undefined||_1a8.altKey==evt.ctrlKey)&&(_1a8.shiftKey===undefined||_1a8.shiftKey==evt.ctrlKey)){
_4.stopEvent(evt);
_5.typematic.trigger(_1a8,_1a9,node,_1aa,_1a8,_1ab,_1ac);
}else{
if(_5.typematic._obj==_1a8){
_5.typematic.stop();
}
}
}),_4.connect(node,"onkeyup",this,function(evt){
if(_5.typematic._obj==_1a8){
_5.typematic.stop();
}
})];
},addMouseListener:function(node,_1b0,_1b1,_1b2,_1b3){
var dc=_4.connect;
return [dc(node,"mousedown",this,function(evt){
_4.stopEvent(evt);
_5.typematic.trigger(evt,_1b0,node,_1b1,node,_1b2,_1b3);
}),dc(node,"mouseup",this,function(evt){
_4.stopEvent(evt);
_5.typematic.stop();
}),dc(node,"mouseout",this,function(evt){
_4.stopEvent(evt);
_5.typematic.stop();
}),dc(node,"mousemove",this,function(evt){
_4.stopEvent(evt);
}),dc(node,"dblclick",this,function(evt){
_4.stopEvent(evt);
if(_4.isIE){
_5.typematic.trigger(evt,_1b0,node,_1b1,node,_1b2,_1b3);
setTimeout(_4.hitch(this,_5.typematic.stop),50);
}
})];
},addListener:function(_1ba,_1bb,_1bc,_1bd,_1be,_1bf,_1c0){
return this.addKeyListener(_1bb,_1bc,_1bd,_1be,_1bf,_1c0).concat(this.addMouseListener(_1ba,_1bd,_1be,_1bf,_1c0));
}};
}
if(!_4._hasResource["dijit._base.wai"]){
_4._hasResource["dijit._base.wai"]=true;
_4.provide("dijit._base.wai");
_5.wai={onload:function(){
var div=_4.create("div",{id:"a11yTestNode",style:{cssText:"border: 1px solid;"+"border-color:red green;"+"position: absolute;"+"height: 5px;"+"top: -999px;"+"background-image: url(\""+(_4.config.blankGif||_4.moduleUrl("dojo","resources/blank.gif"))+"\");"}},_4.body());
var cs=_4.getComputedStyle(div);
if(cs){
var _1c3=cs.backgroundImage;
var _1c4=(cs.borderTopColor==cs.borderRightColor)||(_1c3!=null&&(_1c3=="none"||_1c3=="url(invalid-url:)"));
_4[_1c4?"addClass":"removeClass"](_4.body(),"dijit_a11y");
if(_4.isIE){
div.outerHTML="";
}else{
_4.body().removeChild(div);
}
}
}};
if(_4.isIE||_4.isMoz){
_4._loaders.unshift(_5.wai.onload);
}
_4.mixin(_5,{_XhtmlRoles:/banner|contentinfo|definition|main|navigation|search|note|secondary|seealso/,hasWaiRole:function(elem,role){
var _1c7=this.getWaiRole(elem);
return role?(_1c7.indexOf(role)>-1):(_1c7.length>0);
},getWaiRole:function(elem){
return _4.trim((_4.attr(elem,"role")||"").replace(this._XhtmlRoles,"").replace("wairole:",""));
},setWaiRole:function(elem,role){
var _1cb=_4.attr(elem,"role")||"";
if(_4.isFF<3||!this._XhtmlRoles.test(_1cb)){
_4.attr(elem,"role",_4.isFF<3?"wairole:"+role:role);
}else{
if((" "+_1cb+" ").indexOf(" "+role+" ")<0){
var _1cc=_4.trim(_1cb.replace(this._XhtmlRoles,""));
var _1cd=_4.trim(_1cb.replace(_1cc,""));
_4.attr(elem,"role",_1cd+(_1cd?" ":"")+role);
}
}
},removeWaiRole:function(elem,role){
var _1d0=_4.attr(elem,"role");
if(!_1d0){
return;
}
if(role){
var _1d1=_4.isFF<3?"wairole:"+role:role;
var t=_4.trim((" "+_1d0+" ").replace(" "+_1d1+" "," "));
_4.attr(elem,"role",t);
}else{
elem.removeAttribute("role");
}
},hasWaiState:function(elem,_1d4){
if(_4.isFF<3){
return elem.hasAttributeNS("http://www.w3.org/2005/07/aaa",_1d4);
}
return elem.hasAttribute?elem.hasAttribute("aria-"+_1d4):!!elem.getAttribute("aria-"+_1d4);
},getWaiState:function(elem,_1d6){
if(_4.isFF<3){
return elem.getAttributeNS("http://www.w3.org/2005/07/aaa",_1d6);
}
return elem.getAttribute("aria-"+_1d6)||"";
},setWaiState:function(elem,_1d8,_1d9){
if(_4.isFF<3){
elem.setAttributeNS("http://www.w3.org/2005/07/aaa","aaa:"+_1d8,_1d9);
}else{
elem.setAttribute("aria-"+_1d8,_1d9);
}
},removeWaiState:function(elem,_1db){
if(_4.isFF<3){
elem.removeAttributeNS("http://www.w3.org/2005/07/aaa",_1db);
}else{
elem.removeAttribute("aria-"+_1db);
}
}});
}
if(!_4._hasResource["dijit._base"]){
_4._hasResource["dijit._base"]=true;
_4.provide("dijit._base");
}
if(!_4._hasResource["dijit._Widget"]){
_4._hasResource["dijit._Widget"]=true;
_4.provide("dijit._Widget");
_4.require("dijit._base");
_4.connect(_4,"connect",function(_1dc,_1dd){
if(_1dc&&_4.isFunction(_1dc._onConnect)){
_1dc._onConnect(_1dd);
}
});
_5._connectOnUseEventHandler=function(_1de){
};
(function(){
var _1df={};
var _1e0=function(dc){
if(!_1df[dc]){
var r=[];
var _1e3;
var _1e4=_4.getObject(dc).prototype;
for(var _1e5 in _1e4){
if(_4.isFunction(_1e4[_1e5])&&(_1e3=_1e5.match(/^_set([a-zA-Z]*)Attr$/))&&_1e3[1]){
r.push(_1e3[1].charAt(0).toLowerCase()+_1e3[1].substr(1));
}
}
_1df[dc]=r;
}
return _1df[dc]||[];
};
_4.declare("dijit._Widget",null,{id:"",lang:"",dir:"","class":"",style:"",title:"",srcNodeRef:null,domNode:null,containerNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},_deferredConnects:{onClick:"",onDblClick:"",onKeyDown:"",onKeyPress:"",onKeyUp:"",onMouseMove:"",onMouseDown:"",onMouseOut:"",onMouseOver:"",onMouseLeave:"",onMouseEnter:"",onMouseUp:""},onClick:_5._connectOnUseEventHandler,onDblClick:_5._connectOnUseEventHandler,onKeyDown:_5._connectOnUseEventHandler,onKeyPress:_5._connectOnUseEventHandler,onKeyUp:_5._connectOnUseEventHandler,onMouseDown:_5._connectOnUseEventHandler,onMouseMove:_5._connectOnUseEventHandler,onMouseOut:_5._connectOnUseEventHandler,onMouseOver:_5._connectOnUseEventHandler,onMouseLeave:_5._connectOnUseEventHandler,onMouseEnter:_5._connectOnUseEventHandler,onMouseUp:_5._connectOnUseEventHandler,_blankGif:(_4.config.blankGif||_4.moduleUrl("dojo","resources/blank.gif")),postscript:function(_1e6,_1e7){
this.create(_1e6,_1e7);
},create:function(_1e8,_1e9){
this.srcNodeRef=_4.byId(_1e9);
this._connects=[];
this._deferredConnects=_4.clone(this._deferredConnects);
for(var attr in this.attributeMap){
delete this._deferredConnects[attr];
}
for(attr in this._deferredConnects){
if(this[attr]!==_5._connectOnUseEventHandler){
delete this._deferredConnects[attr];
}
}
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){
this.id=this.srcNodeRef.id;
}
if(_1e8){
this.params=_1e8;
_4.mixin(this,_1e8);
}
if(_1e8&&_1e8.scaytuiconfig){
this.params.scaytuiconfig=_1e8.scaytuiconfig;
}
this.postMixInProperties();
if(!this.id){
this.id=_5.getUniqueId(this.declaredClass.replace(/\./g,"_"));
}
_5.registry.add(this);
this.buildRendering();
if(this.domNode){
this._applyAttributes();
var _1eb=this.srcNodeRef;
if(_1eb&&_1eb.parentNode){
_1eb.parentNode.replaceChild(this.domNode,_1eb);
}
for(attr in this.params){
this._onConnect(attr);
}
}
if(this.domNode){
this.domNode.setAttribute("widgetId",this.id);
}
this.postCreate();
if(this.srcNodeRef&&!this.srcNodeRef.parentNode){
delete this.srcNodeRef;
}
this._created=true;
},_applyAttributes:function(){
var _1ec=function(attr,_1ee){
if((_1ee.params&&attr in _1ee.params)||_1ee[attr]){
_1ee.attr(attr,_1ee[attr]);
}
};
for(var attr in this.attributeMap){
_1ec(attr,this);
}
_4.forEach(_1e0(this.declaredClass),function(a){
if(!(a in this.attributeMap)){
_1ec(a,this);
}
},this);
},postMixInProperties:function(){
},buildRendering:function(){
this.domNode=this.srcNodeRef||_4.create("div");
},postCreate:function(){
},startup:function(){
this._started=true;
},destroyRecursive:function(_1f1){
this.destroyDescendants(_1f1);
this.destroy(_1f1);
},destroy:function(_1f2){
this.uninitialize();
_4.forEach(this._connects,function(_1f3){
_4.forEach(_1f3,_4.disconnect);
});
this.destroyRendering(_1f2);
_5.registry.remove(this.id);
},destroyRendering:function(_1f4){
if(this.bgIframe){
this.bgIframe.destroy(_1f4);
delete this.bgIframe;
}
if(this.domNode){
if(_1f4){
_4.removeAttr(this.domNode,"widgetId");
}else{
_4.destroy(this.domNode);
}
delete this.domNode;
}
if(this.srcNodeRef){
if(!_1f4){
_4.destroy(this.srcNodeRef);
}
delete this.srcNodeRef;
}
},destroyDescendants:function(_1f5){
_4.forEach(this.getChildren(),function(_1f6){
if(_1f6.destroyRecursive){
_1f6.destroyRecursive(_1f5);
}
});
},uninitialize:function(){
return false;
},onFocus:function(){
if(this.domNode&&_4.query(this.domNode).style("display")=="block"&&_4.isIE){
this.domNode.focus();
}else{
if(this.focus&&_4.query(this).style("display")=="block"){
this.focus();
}
}
},onBlur:function(){
},_onFocus:function(e){
this.onFocus();
},_onBlur:function(){
this.onBlur();
},_onConnect:function(_1f8){
if(_1f8 in this._deferredConnects){
var _1f9=this[this._deferredConnects[_1f8]||"domNode"];
_4.connect(this.formValueNode,_1f8.toLowerCase(),this.formValueNode,this[_1f8]);
delete this._deferredConnects[_1f8];
}
},_setClassAttr:function(_1fa){
var _1fb=this[this.attributeMap["class"]||"domNode"];
_4.removeClass(_1fb,this["class"]);
this["class"]=_1fa;
_4.addClass(_1fb,_1fa);
},_setStyleAttr:function(_1fc){
var _1fd=this[this.attributeMap["style"]||"domNode"];
if(_4.isObject(_1fc)){
_4.style(_1fd,_1fc);
}else{
if(_1fd.style.cssText){
_1fd.style.cssText+="; "+_1fc;
}else{
_1fd.style.cssText=_1fc;
}
}
this["style"]=_1fc;
},setAttribute:function(attr,_1ff){
_4.deprecated(this.declaredClass+"::setAttribute() is deprecated. Use attr() instead.","","2.0");
this.attr(attr,_1ff);
},_attrToDom:function(attr,_201){
var _202=this.attributeMap[attr];
_4.forEach(_4.isArray(_202)?_202:[_202],function(_203){
var _204=this[_203.node||_203||"domNode"];
var type=_203.type||"attribute";
switch(type){
case "attribute":
if(_4.isFunction(_201)){
_201=_4.hitch(this,_201);
}
if(/^on[A-Z][a-zA-Z]*$/.test(attr)){
attr=attr.toLowerCase();
}
_4.attr(_204,attr,_201);
break;
case "innerHTML":
_204.innerHTML=_201;
break;
case "class":
_4.removeClass(_204,this[attr]);
_4.addClass(_204,_201);
break;
}
},this);
this[attr]=_201;
},attr:function(name,_207){
var args=arguments.length;
if(args==1&&!_4.isString(name)){
for(var x in name){
this.attr(x,name[x]);
}
return this;
}
var _20a=this._getAttrNames(name);
if(args==2){
if(this[_20a.s]){
return this[_20a.s](_207)||this;
}else{
if(name in this.attributeMap){
this._attrToDom(name,_207);
}
this[name]=_207;
}
return this;
}else{
if(this[_20a.g]){
return this[_20a.g]();
}else{
return this[name];
}
}
},_attrPairNames:{},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
var uc=name.charAt(0).toUpperCase()+name.substr(1);
return apn[name]={n:name+"Node",s:"_set"+uc+"Attr",g:"_get"+uc+"Attr"};
},toString:function(){
return "[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]";
},getDescendants:function(){
if(this.containerNode){
var list=_4.query("[widgetId]",this.containerNode);
return list.map(_5.byNode);
}else{
return [];
}
},getChildren:function(){
if(this.containerNode){
return _5.findWidgets(this.containerNode);
}else{
return [];
}
},nodesWithKeyClick:["input","button"],connect:function(obj,_210,_211){
var d=_4;
var dc=_4.connect;
var _214=[];
if(_210=="ondijitclick"){
if(!this.nodesWithKeyClick[obj.nodeName]){
var m=d.hitch(this,_211);
_214.push(dc(obj,"onkeydown",this,function(e){
if(!d.isFF&&e.keyCode==d.keys.ENTER&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey){
return m(e);
}else{
if(e.keyCode==d.keys.SPACE){
d.stopEvent(e);
}
}
}),dc(obj,"onkeyup",this,function(e){
if(e.keyCode==d.keys.SPACE&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey){
return m(e);
}
}));
if(d.isFF){
_214.push(dc(obj,"onkeypress",this,function(e){
if(e.keyCode==d.keys.ENTER&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey){
return m(e);
}
}));
}
}
_210="onclick";
}
_214.push(dc(obj,_210,this,_211));
this._connects.push(_214);
return _214;
},disconnect:function(_219){
for(var i=0;i<this._connects.length;i++){
if(this._connects[i]==_219){
_4.forEach(_219,_4.disconnect);
this._connects.splice(i,1);
return;
}
}
},isLeftToRight:function(){
return _4._isBodyLtr();
},isFocusable:function(){
return this.focus&&(_4.style(this.domNode,"display")!="none");
},placeAt:function(_21b,_21c){
if(_21b["declaredClass"]&&_21b["addChild"]){
_21b.addChild(this,_21c);
}else{
_4.place(this.domNode,_21b,_21c);
}
return this;
}});
})();
}
if(!_4._hasResource["dojo.string"]){
_4._hasResource["dojo.string"]=true;
_4.provide("dojo.string");
_4.string.rep=function(str,num){
if(num<=0||!str){
return "";
}
var buf=[];
for(;;){
if(num&1){
buf.push(str);
}
if(!(num>>=1)){
break;
}
str+=str;
}
return buf.join("");
};
_4.string.pad=function(text,size,ch,end){
if(!ch){
ch="0";
}
var out=String(text),pad=_4.string.rep(ch,Math.ceil((size-out.length)/ch.length));
return end?out+pad:pad+out;
};
_4.string.substitute=function(_226,map,_228,_229){
_229=_229||_4.global;
_228=(!_228)?function(v){
return v;
}:_4.hitch(_229,_228);
return _226.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(_22b,key,_22d){
var _22e=_4.getObject(key,false,map);
if(_22d){
_22e=_4.getObject(_22d,false,_229).call(_229,_22e,key);
}
return _228(_22e,key).toString();
});
};
_4.string.trim=String.prototype.trim?_4.trim:function(str){
str=str.replace(/^\s+/,"");
for(var i=str.length-1;i>=0;i--){
if(/\S/.test(str.charAt(i))){
str=str.substring(0,i+1);
break;
}
}
return str;
};
}
if(!_4._hasResource["dijit._Templated"]){
_4._hasResource["dijit._Templated"]=true;
_4.provide("dijit._Templated");
_4.declare("dijit._Templated",null,{templateString:null,templatePath:null,widgetsInTemplate:false,_skipNodeCache:false,_stringRepl:function(tmpl){
var _232=this.declaredClass,_233=this;
return _4.string.substitute(tmpl,this,function(_234,key){
if(key.charAt(0)=="!"){
_234=_4.getObject(key.substr(1),false,_233);
}
if(typeof _234=="undefined"){
throw new Error(_232+" template:"+key);
}
if(_234==null){
return "";
}
return key.charAt(0)=="!"?_234:_234.toString().replace(/"/g,"&quot;");
},this);
},buildRendering:function(){
var _236=_5._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var node;
if(_4.isString(_236)){
node=_4._toDom(this._stringRepl(_236));
}else{
node=_236.cloneNode(true);
}
this.domNode=node;
this._attachTemplateNodes(node);
if(this.widgetsInTemplate){
var cw=(this._supportingWidgets=_4.parser.parse(node));
this._attachTemplateNodes(cw,function(n,p){
return n[p];
});
}
this._fillContent(this.srcNodeRef);
},_fillContent:function(_23b){
var dest=this.containerNode;
if(_23b&&dest){
while(_23b.hasChildNodes()){
dest.appendChild(_23b.firstChild);
}
}
},_attachTemplateNodes:function(_23d,_23e){
_23e=_23e||function(n,p){
return n.getAttribute(p);
};
var _241=_4.isArray(_23d)?_23d:(_23d.all||_23d.getElementsByTagName("*"));
var x=_4.isArray(_23d)?0:-1;
for(;x<_241.length;x++){
var _243=(x==-1)?_23d:_241[x];
if(this.widgetsInTemplate&&_23e(_243,"dojoType")){
continue;
}
var _244=_23e(_243,"dojoAttachPoint");
if(_244){
var _245,_246=_244.split(/\s*,\s*/);
while((_245=_246.shift())){
if(_4.isArray(this[_245])){
this[_245].push(_243);
}else{
this[_245]=_243;
}
}
}
var _247=_23e(_243,"dojoAttachEvent");
if(_247){
var _248,_249=_247.split(/\s*,\s*/);
var trim=_4.trim;
while((_248=_249.shift())){
if(_248){
var _24b=null;
if(_248.indexOf(":")!=-1){
var _24c=_248.split(":");
_248=trim(_24c[0]);
_24b=trim(_24c[1]);
}else{
_248=trim(_248);
}
if(!_24b){
_24b=_248;
}
this.connect(_243,_248,_24b);
}
}
}
var role=_23e(_243,"waiRole");
if(role){
_5.setWaiRole(_243,role);
}
var _24e=_23e(_243,"waiState");
if(_24e){
_4.forEach(_24e.split(/\s*,\s*/),function(_24f){
if(_24f.indexOf("-")!=-1){
var pair=_24f.split("-");
_5.setWaiState(_243,pair[0],pair[1]);
}
});
}
}
}});
_5._Templated._templateCache={};
_5._Templated.getCachedTemplate=function(_251,_252,_253){
var _254=_5._Templated._templateCache;
var key=_252||_251;
var _256=_254[key];
if(_256){
if(!_256.ownerDocument||_256.ownerDocument==_4.doc){
return _256;
}
_4.destroy(_256);
}
if(!_252){
_252=_5._Templated._sanitizeTemplateString(_4.trim(_4._getText(_251)));
}
_252=_4.string.trim(_252);
if(_253||_252.match(/\$\{([^\}]+)\}/g)){
return (_254[key]=_252);
}else{
return (_254[key]=_4._toDom(_252));
}
};
_5._Templated._sanitizeTemplateString=function(_257){
if(_257){
_257=_257.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _258=_257.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_258){
_257=_258[1];
}
}else{
_257="";
}
return _257;
};
if(_4.isIE){
_4.addOnWindowUnload(function(){
var _259=_5._Templated._templateCache;
for(var key in _259){
var _25b=_259[key];
if(!isNaN(_25b.nodeType)){
_4.destroy(_25b);
}
delete _259[key];
}
});
}
_4.extend(_5._Widget,{dojoAttachEvent:"",dojoAttachPoint:"",waiRole:"",waiState:""});
}
if(!_4._hasResource["dijit._Container"]){
_4._hasResource["dijit._Container"]=true;
_4.provide("dijit._Container");
_4.declare("dijit._Container",null,{isContainer:true,buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},addChild:function(_25c,_25d){
var _25e=this.containerNode;
if(_25d&&typeof _25d=="number"){
var _25f=this.getChildren();
if(_25f&&_25f.length>=_25d){
_25e=_25f[_25d-1].domNode;
_25d="after";
}
}
_4.place(_25c.domNode,_25e,_25d);
if(this._started&&!_25c._started){
_25c.startup();
}
},removeChild:function(_260){
if(typeof _260=="number"&&_260>0){
_260=this.getChildren()[_260];
}
if(!_260||!_260.domNode){
return;
}
var node=_260.domNode;
node.parentNode.removeChild(node);
},_nextElement:function(node){
do{
node=node.nextSibling;
}while(node&&node.nodeType!=1);
return node;
},_firstElement:function(node){
node=node.firstChild;
if(node&&node.nodeType!=1){
node=this._nextElement(node);
}
return node;
},getChildren:function(){
return _4.query("> [widgetId]",this.containerNode).map(_5.byNode);
},hasChildren:function(){
return !!this._firstElement(this.containerNode);
},destroyDescendants:function(_264){
_4.forEach(this.getChildren(),function(_265){
_265.destroyRecursive(_264);
});
},_getSiblingOfChild:function(_266,dir){
var node=_266.domNode;
var _269=(dir>0?"nextSibling":"previousSibling");
do{
node=node[_269];
}while(node&&(node.nodeType!=1||!_5.byNode(node)));
return node?_5.byNode(node):null;
},getIndexOfChild:function(_26a){
var _26b=this.getChildren();
for(var i=0,c;c=_26b[i];i++){
if(c==_26a){
return i;
}
}
return -1;
}});
}
if(!_4._hasResource["dijit._Contained"]){
_4._hasResource["dijit._Contained"]=true;
_4.provide("dijit._Contained");
_4.declare("dijit._Contained",null,{getParent:function(){
for(var p=this.domNode.parentNode;p;p=p.parentNode){
var id=p.getAttribute&&p.getAttribute("widgetId");
if(id){
var _270=_5.byId(id);
return _270.isContainer?_270:null;
}
}
return null;
},_getSibling:function(_271){
var node=this.domNode;
do{
node=node[_271+"Sibling"];
}while(node&&node.nodeType!=1);
if(!node){
return null;
}
var id=node.getAttribute("widgetId");
return _5.byId(id);
},getPreviousSibling:function(){
return this._getSibling("previous");
},getNextSibling:function(){
return this._getSibling("next");
},getIndexInParent:function(){
var p=this.getParent();
if(!p||!p.getIndexOfChild){
return -1;
}
return p.getIndexOfChild(this);
}});
}
if(!_4._hasResource["dijit.layout._LayoutWidget"]){
_4._hasResource["dijit.layout._LayoutWidget"]=true;
_4.provide("dijit.layout._LayoutWidget");
_4.declare("dijit.layout._LayoutWidget",[_5._Widget,_5._Container,_5._Contained],{baseClass:"dijitLayoutContainer",isLayoutContainer:true,postCreate:function(){
_4.addClass(this.domNode,"dijitContainer");
_4.addClass(this.domNode,this.baseClass);
},startup:function(){
if(this._started){
return;
}
_4.forEach(this.getChildren(),function(_275){
_275.startup();
});
if(!this.getParent||!this.getParent()){
this.resize();
this._viewport=_5.getViewport();
this.connect(_4.global,"onresize",function(){
var _276=_5.getViewport();
if(_276.w!=this._viewport.w||_276.h!=this._viewport.h){
this._viewport=_276;
this.resize();
}
});
}
this.inherited(arguments);
},resize:function(_277,_278){
var node=this.domNode;
if(_277){
_4.marginBox(node,_277);
if(_277.t){
node.style.top=_277.t+"px";
}
if(_277.l){
node.style.left=_277.l+"px";
}
}
var mb=_278||{};
_4.mixin(mb,_277||{});
if(!("h" in mb)||!("w" in mb)){
mb=_4.mixin(_4.marginBox(node),mb);
}
var cs=_4.getComputedStyle(node);
var me=_4._getMarginExtents(node,cs);
var be=_4._getBorderExtents(node,cs);
var bb=(this._borderBox={w:mb.w-(me.w+be.w),h:mb.h-(me.h+be.h)});
var pe=_4._getPadExtents(node,cs);
this._contentBox={l:_4._toPixelValue(node,cs.paddingLeft),t:_4._toPixelValue(node,cs.paddingTop),w:bb.w-pe.w,h:bb.h-pe.h};
this.layout();
},layout:function(){
},_setupChild:function(_280){
_4.addClass(_280.domNode,this.baseClass+"-child");
if(_280.baseClass){
_4.addClass(_280.domNode,this.baseClass+"-"+_280.baseClass);
}
},addChild:function(_281,_282){
this.inherited(arguments);
if(this._started){
this._setupChild(_281);
}
},removeChild:function(_283){
_4.removeClass(_283.domNode,this.baseClass+"-child");
if(_283.baseClass){
_4.removeClass(_283.domNode,this.baseClass+"-"+_283.baseClass);
}
this.inherited(arguments);
}});
_5.layout.marginBox2contentBox=function(node,mb){
var cs=_4.getComputedStyle(node);
var me=_4._getMarginExtents(node,cs);
var pb=_4._getPadBorderExtents(node,cs);
return {l:_4._toPixelValue(node,cs.paddingLeft),t:_4._toPixelValue(node,cs.paddingTop),w:mb.w-(me.w+pb.w),h:mb.h-(me.h+pb.h)};
};
(function(){
var _289=function(word){
return word.substring(0,1).toUpperCase()+word.substring(1);
};
var size=function(_28c,dim){
_28c.resize?_28c.resize(dim):_4.marginBox(_28c.domNode,dim);
_4.mixin(_28c,_4.marginBox(_28c.domNode));
_4.mixin(_28c,dim);
};
_5.layout.layoutChildren=function(_28e,dim,_290){
dim=_4.mixin({},dim);
_4.addClass(_28e,"dijitLayoutContainer");
_290=_4.filter(_290,function(item){
return item.layoutAlign!="client";
}).concat(_4.filter(_290,function(item){
return item.layoutAlign=="client";
}));
_4.forEach(_290,function(_293){
var elm=_293.domNode,pos=_293.layoutAlign;
var _296=elm.style;
_296.left=dim.l+"px";
_296.top=dim.t+"px";
_296.bottom=_296.right="auto";
_4.addClass(elm,"dijitAlign"+_289(pos));
if(pos=="top"||pos=="bottom"){
size(_293,{w:dim.w});
dim.h-=_293.h;
if(pos=="top"){
dim.t+=_293.h;
}else{
_296.top=dim.t+dim.h+"px";
}
}else{
if(pos=="left"||pos=="right"){
size(_293,{h:dim.h});
dim.w-=_293.w;
if(pos=="left"){
dim.l+=_293.w;
}else{
_296.left=dim.l+dim.w+"px";
}
}else{
if(pos=="client"){
size(_293,dim);
}
}
}
});
};
})();
}
if(!_4._hasResource["dijit.form._FormWidget"]){
_4._hasResource["dijit.form._FormWidget"]=true;
_4.provide("dijit.form._FormWidget");
_4.declare("dijit.form._FormWidget",[_5._Widget,_5._Templated],{baseClass:"",name:"",alt:"",value:"",type:"text",tabIndex:"0",disabled:false,readOnly:false,intermediateChanges:false,scrollOnFocus:true,attributeMap:_4.delegate(_5._Widget.prototype.attributeMap,{value:"focusNode",disabled:"focusNode",readOnly:"focusNode",id:"focusNode",tabIndex:"focusNode",alt:"focusNode"}),postMixInProperties:function(){
this.nameAttrSetting=this.name?("name='"+this.name+"'"):"";
this.inherited(arguments);
},_setDisabledAttr:function(_297){
this.disabled=_297;
_4.attr(this.focusNode,"disabled",_297);
_5.setWaiState(this.focusNode,"disabled",_297);
if(_297){
this._hovering=false;
this._active=false;
this.focusNode.removeAttribute("tabIndex");
}else{
this.focusNode.setAttribute("tabIndex",this.tabIndex);
}
this._setStateClass();
},setDisabled:function(_298){
t=this;
if(_298){
this.attr("disabled",_298);
this.formValueNode.removeAttribute("maxlength");
this.formValueNode.removeAttribute("disabled");
t.scayt.isTextSizeBig=false;
t.scayt.inFlight=false;
t.scayt.inFlightSendSerialize=false;
t.scayt.markupWord=[];
t.scayt.unknowWord=[];
t.scayt._serializeUnknowWord=[];
t.scayt.s.clear();
t.scayt.reset();
_4.forEach(t.scayt._connects,function(_299){
_4.forEach(_299,_4.disconnect);
});
}else{
if(t.editNode){
t.editNode.innerHTML=t.formValueNode.value;
}
this.attr("disabled",_298);
this.formValueNode.removeAttribute("maxlength");
this.formValueNode.removeAttribute("disabled");
t.scayt.reset();
t.scayt.dispatchEvent();
t.scayt.refresh();
}
t.scayt.state=_298?scayt.STATE_DISABLED:scayt.STATE_ENABLED;
t.scayt._onSetDisabled(_298);
_4.publish(this.id+"::setDisabled",[this]);
},_onFocus:function(e){
if(this.scrollOnFocus){
_5.scrollIntoView(this.domNode);
}
this.inherited(arguments);
},_onMouse:function(_29b){
var _29c=_29b.currentTarget;
if(_29c&&_29c.getAttribute){
this.stateModifier=_29c.getAttribute("stateModifier")||"";
}
if(!this.disabled){
switch(_29b.type){
case "mouseenter":
case "mouseover":
this._hovering=true;
this._active=this._mouseDown;
break;
case "mouseout":
case "mouseleave":
this._hovering=false;
this._active=false;
break;
case "mousedown":
this._active=true;
this._mouseDown=true;
var _29d=this.connect(_4.body(),"onmouseup",function(){
if(this._mouseDown&&this.isFocusable()){
this.focus();
}
this._active=false;
this._mouseDown=false;
this._setStateClass();
this.disconnect(_29d);
});
break;
}
this._setStateClass();
}
},isFocusable:function(){
return !this.disabled&&!this.readOnly&&this.focusNode&&(_4.style(this.domNode,"display")!="none");
},focus:function(){
_5.focus(this.focusNode);
},_setStateClass:function(){
var _29e=this.baseClass.split(" ");
function _29f(_2a0){
_29e=_29e.concat(_4.map(_29e,function(c){
return c+_2a0;
}),"dijit"+_2a0);
};
if(this.checked){
_29f("Checked");
}
if(this.state){
_29f(this.state);
}
if(this.selected){
_29f("Selected");
}
if(this.disabled){
_29f("Disabled");
}else{
if(this.readOnly){
_29f("ReadOnly");
}else{
if(this._active){
_29f(this.stateModifier+"Active");
}else{
if(this._focused){
_29f("Focused");
}
if(this._hovering){
_29f(this.stateModifier+"Hover");
}
}
}
}
var tn=this.stateNode||this.domNode,_2a3={};
_4.forEach(tn.className.split(" "),function(c){
_2a3[c]=true;
});
if("_stateClasses" in this){
_4.forEach(this._stateClasses,function(c){
delete _2a3[c];
});
}
_4.forEach(_29e,function(c){
_2a3[c]=true;
});
var _2a7=[];
for(var c in _2a3){
_2a7.push(c);
}
tn.className=_2a7.join(" ");
this._stateClasses=_29e;
},compare:function(val1,val2){
if((typeof val1=="number")&&(typeof val2=="number")){
return (isNaN(val1)&&isNaN(val2))?0:(val1-val2);
}else{
if(val1>val2){
return 1;
}else{
if(val1<val2){
return -1;
}else{
return 0;
}
}
}
},onChange:function(_2ab){
},_onChangeActive:false,_handleOnChange:function(_2ac,_2ad){
this._lastValue=_2ac;
if(this._lastValueReported==undefined&&(_2ad===null||!this._onChangeActive)){
this._resetValue=this._lastValueReported=_2ac;
}
if((this.intermediateChanges||_2ad||_2ad===undefined)&&((typeof _2ac!=typeof this._lastValueReported)||this.compare(_2ac,this._lastValueReported)!=0)){
this._lastValueReported=_2ac;
if(this._onChangeActive){
this.onChange(_2ac);
}
}
},create:function(){
if(this.baseClass=="scaytInput"||this.baseClass=="scaytTextArea"){
var _2ae=arguments[0].srcNodeRef;
if(_2ae){
this.maxLength=_2ae.getAttribute("maxLength");
}
}
this.inherited(arguments);
this._onChangeActive=true;
this._setStateClass();
},destroy:function(){
if(this._layoutHackHandle){
clearTimeout(this._layoutHackHandle);
}
this.inherited(arguments);
},setValue:function(_2af){
_4.deprecated("dijit.form._FormWidget:setValue("+_2af+") is deprecated.  Use attr('value',"+_2af+") instead.","","2.0");
this.attr("value",_2af);
},getValue:function(){
_4.deprecated(this.declaredClass+"::getValue() is deprecated. Use attr('value') instead.","","2.0");
return this.attr("value");
},_layoutHack:function(){
if(_4.isFF==2&&!this._layoutHackHandle){
var node=this.domNode;
var old=node.style.opacity;
node.style.opacity="0.999";
this._layoutHackHandle=setTimeout(_4.hitch(this,function(){
this._layoutHackHandle=null;
node.style.opacity=old;
}),0);
}
}});
_4.declare("dijit.form._FormValueWidget",_5.form._FormWidget,{attributeMap:_4.delegate(_5.form._FormWidget.prototype.attributeMap,{value:""}),postCreate:function(){
if(_4.isIE||_4.isWebKit){
this.connect(this.focusNode||this.domNode,"onkeydown",this._onKeyDown);
}
if(this._resetValue===undefined){
this._resetValue=this.value;
}
},_setValueAttr:function(_2b2,_2b3){
this.value=_2b2;
this._handleOnChange(_2b2,_2b3);
},_getValueAttr:function(_2b4){
return this._lastValue;
},undo:function(){
this._setValueAttr(this._lastValueReported,false);
},reset:function(){
this._hasBeenBlurred=false;
this._setValueAttr(this._resetValue,true);
},_onKeyDown:function(e){
if(e.keyCode==_4.keys.ESCAPE&&!e.ctrlKey&&!e.altKey){
var te;
if(_4.isIE){
e.preventDefault();
te=document.createEventObject();
te.keyCode=_4.keys.ESCAPE;
te.shiftKey=e.shiftKey;
e.srcElement.fireEvent("onkeypress",te);
}else{
if(_4.isWebKit){
te=document.createEvent("Events");
te.initEvent("keypress",true,true);
te.keyCode=_4.keys.ESCAPE;
te.shiftKey=e.shiftKey;
e.target.dispatchEvent(te);
}
}
}
}});
}
if(!_4._hasResource["dijit.dijit"]){
_4._hasResource["dijit.dijit"]=true;
_4.provide("dijit.dijit");
}
if(!_4._hasResource["dijit._editor.range"]){
_4._hasResource["dijit._editor.range"]=true;
_4.provide("dijit._editor.range");
_5.range={};
_5.range.getIndex=function(node,_2b8){
var ret=[],retR=[];
var stop=_2b8;
var _2bc=node;
var _2bd,n;
while(node!=stop){
var i=0;
_2bd=node.parentNode;
while((n=_2bd.childNodes[i++])){
if(n===node){
--i;
break;
}
}
if(i>=_2bd.childNodes.length){
_4.debug("Error finding index of a node in dijit.range.getIndex");
}
ret.unshift(i);
retR.unshift(i-_2bd.childNodes.length);
node=_2bd;
}
if(ret.length>0&&_2bc.nodeType==3){
n=_2bc.previousSibling;
while(n&&n.nodeType==3){
ret[ret.length-1]--;
n=n.previousSibling;
}
n=_2bc.nextSibling;
while(n&&n.nodeType==3){
retR[retR.length-1]++;
n=n.nextSibling;
}
}
return {o:ret,r:retR};
};
_5.range.getNode=function(_2c0,_2c1){
if(!_4.isArray(_2c0)||_2c0.length==0){
return _2c1;
}
var node=_2c1;
_4.every(_2c0,function(i){
if(i>=0&&i<node.childNodes.length){
node=node.childNodes[i];
}else{
node=null;
return false;
}
return true;
});
return node;
};
_5.range.getCommonAncestor=function(n1,n2){
var _2c6=function(n){
var as=[];
while(n){
as.unshift(n);
if(n.nodeName!="BODY"){
n=n.parentNode;
}else{
break;
}
}
return as;
};
var n1as=_2c6(n1);
var n2as=_2c6(n2);
var m=Math.min(n1as.length,n2as.length);
var com=n1as[0];
for(var i=1;i<m;i++){
if(n1as[i]===n2as[i]){
com=n1as[i];
}else{
break;
}
}
return com;
};
_5.range.getAncestor=function(node,_2cf,root){
root=root||node.ownerDocument.body;
while(node&&node!==root){
var name=node.nodeName.toUpperCase();
if(_2cf.test(name)){
return node;
}
node=node.parentNode;
}
return null;
};
_5.range.BlockTagNames=/^(?:P|DIV|H1|H2|H3|H4|H5|H6|ADDRESS|PRE|OL|UL|LI|DT|DE)$/;
_5.range.getBlockAncestor=function(node,_2d3,root){
root=root||node.ownerDocument.body;
_2d3=_2d3||_5.range.BlockTagNames;
var _2d5=null,_2d6;
while(node&&node!==root){
var name=node.nodeName.toUpperCase();
if(!_2d5&&_2d3.test(name)){
_2d5=node;
}
if(!_2d6&&(/^(?:BODY|TD|TH|CAPTION)$/).test(name)){
_2d6=node;
}
node=node.parentNode;
}
return {blockNode:_2d5,blockContainer:_2d6||node.ownerDocument.body};
};
_5.range.atBeginningOfContainer=function(_2d8,node,_2da){
var _2db=false;
var _2dc=(_2da==0);
if(!_2dc&&node.nodeType==3){
if(_4.trim(node.nodeValue.substr(0,_2da))==0){
_2dc=true;
}
}
if(_2dc){
var _2dd=node;
_2db=true;
while(_2dd&&_2dd!==_2d8){
if(_2dd.previousSibling){
_2db=false;
break;
}
_2dd=_2dd.parentNode;
}
}
return _2db;
};
_5.range.atEndOfContainer=function(_2de,node,_2e0){
var _2e1=false;
var _2e2=(_2e0==(node.length||node.childNodes.length));
if(!_2e2&&node.nodeType==3){
if(_4.trim(node.nodeValue.substr(_2e0))==0){
_2e2=true;
}
}
if(_2e2){
var _2e3=node;
_2e1=true;
while(_2e3&&_2e3!==_2de){
if(_2e3.nextSibling){
_2e1=false;
break;
}
_2e3=_2e3.parentNode;
}
}
return _2e1;
};
_5.range.adjacentNoneTextNode=function(_2e4,next){
var node=_2e4;
var len=(0-_2e4.length)||0;
var prop=next?"nextSibling":"previousSibling";
while(node){
if(node.nodeType!=3){
break;
}
len+=node.length;
node=node[prop];
}
return [node,len];
};
_5.range._w3c=Boolean(window["getSelection"]);
_5.range.create=function(){
if(_5.range._w3c){
return _4.doc.createRange();
}else{
return new _5.range.W3CRange;
}
};
_5.range.getSelection=function(win,_2ea){
if(_5.range._w3c){
return win.getSelection();
}else{
var s=new _5.range.ie.selection(win);
if(!_2ea){
s._getCurrentSelection();
}
return s;
}
};
if(!_5.range._w3c){
_5.range.ie={cachedSelection:{},selection:function(win){
this._ranges=[];
this.addRange=function(r,_2ee){
this._ranges.push(r);
if(!_2ee){
r._select();
}
this.rangeCount=this._ranges.length;
};
this.removeAllRanges=function(){
this._ranges=[];
this.rangeCount=0;
};
var _2ef=function(){
var r=win.document.selection.createRange();
var type=win.document.selection.type.toUpperCase();
if(type=="CONTROL"){
return new _5.range.W3CRange(_5.range.ie.decomposeControlRange(r));
}else{
return new _5.range.W3CRange(_5.range.ie.decomposeTextRange(r));
}
};
this.getRangeAt=function(i){
return this._ranges[i];
};
this._getCurrentSelection=function(){
this.removeAllRanges();
var r=_2ef();
if(r){
this.addRange(r,true);
}
};
},decomposeControlRange:function(_2f4){
var _2f5=_2f4.item(0),_2f6=_2f4.item(_2f4.length-1);
var _2f7=_2f5.parentNode,_2f8=_2f6.parentNode;
var _2f9=_5.range.getIndex(_2f5,_2f7).o;
var _2fa=_5.range.getIndex(_2f6,_2f8).o+1;
return [_2f7,_2f9,_2f8,_2fa];
},getEndPoint:function(_2fb,end){
var _2fd=_2fb.duplicate();
_2fd.collapse(!end);
var _2fe="EndTo"+(end?"End":"Start");
var _2ff=_2fd.parentElement();
var _300,_301,_302;
if(_2ff.childNodes.length>0){
_4.every(_2ff.childNodes,function(node,i){
var _305;
if(node.nodeType!=3){
_2fd.moveToElementText(node);
if(_2fd.compareEndPoints(_2fe,_2fb)>0){
_300=node.previousSibling;
if(_302&&_302.nodeType==3){
_300=_302;
_305=true;
}else{
_300=_2ff;
_301=i;
return false;
}
}else{
if(i==_2ff.childNodes.length-1){
_300=_2ff;
_301=_2ff.childNodes.length;
return false;
}
}
}else{
if(i==_2ff.childNodes.length-1){
_300=node;
_305=true;
}
}
if(_305&&_300){
var _306=_5.range.adjacentNoneTextNode(_300)[0];
if(_306){
_300=_306.nextSibling;
}else{
_300=_2ff.firstChild;
}
var _307=_5.range.adjacentNoneTextNode(_300);
_306=_307[0];
var _308=_307[1];
if(_306){
_2fd.moveToElementText(_306);
_2fd.collapse(false);
}else{
_2fd.moveToElementText(_2ff);
}
_2fd.setEndPoint(_2fe,_2fb);
_301=_2fd.text.length-_308;
return false;
}
_302=node;
return true;
});
}else{
_300=_2ff;
_301=0;
}
if(!end&&_300.nodeType!=3&&_301==_300.childNodes.length){
if(_300.nextSibling&&_300.nextSibling.nodeType==3){
_300=_300.nextSibling;
_301=0;
}
}
return [_300,_301];
},setEndPoint:function(_309,_30a,_30b){
var _30c=_309.duplicate(),node,len;
if(_30a.nodeType!=3){
if(_30b>0){
node=_30a.childNodes[_30b-1];
if(node.nodeType==3){
_30a=node;
_30b=node.length;
}else{
if(node.nextSibling&&node.nextSibling.nodeType==3){
_30a=node.nextSibling;
_30b=0;
}else{
_30c.moveToElementText(node.nextSibling?node:_30a);
var _30f=node.parentNode.insertBefore(document.createTextNode(" "),node.nextSibling);
_30c.collapse(false);
_30f.parentNode.removeChild(_30f);
}
}
}else{
_30c.moveToElementText(_30a);
_30c.collapse(true);
}
}
if(_30a.nodeType==3){
var _310=_5.range.adjacentNoneTextNode(_30a);
var _311=_310[0];
len=_310[1];
if(_311){
_30c.moveToElementText(_311);
_30c.collapse(false);
if(_311.contentEditable!="inherit"){
len++;
}
}else{
_30c.moveToElementText(_30a.parentNode);
_30c.collapse(true);
}
_30b+=len;
if(_30b>0){
if(_30c.move("character",_30b)!=_30b){
console.error("Error when moving!");
}
}
}
return _30c;
},decomposeTextRange:function(_312){
var _313=_5.range.ie.getEndPoint(_312);
var _314=_313[0],_315=_313[1];
var _316=_313[0],_317=_313[1];
if(_312.htmlText.length){
if(_312.htmlText==_312.text){
_317=_315+_312.text.length;
}else{
_313=_5.range.ie.getEndPoint(_312,true);
_316=_313[0],_317=_313[1];
}
}
return [_314,_315,_316,_317];
},setRange:function(_318,_319,_31a,_31b,_31c,_31d){
var _31e=_5.range.ie.setEndPoint(_318,_319,_31a);
_318.setEndPoint("StartToStart",_31e);
if(!_31d){
var end=_5.range.ie.setEndPoint(_318,_31b,_31c);
}
_318.setEndPoint("EndToEnd",end||_31e);
return _318;
}};
_4.declare("dijit.range.W3CRange",null,{constructor:function(){
if(arguments.length>0){
this.setStart(arguments[0][0],arguments[0][1]);
this.setEnd(arguments[0][2],arguments[0][3]);
}else{
this.commonAncestorContainer=null;
this.startContainer=null;
this.startOffset=0;
this.endContainer=null;
this.endOffset=0;
this.collapsed=true;
}
},_updateInternal:function(){
if(this.startContainer!==this.endContainer){
this.commonAncestorContainer=_5.range.getCommonAncestor(this.startContainer,this.endContainer);
}else{
this.commonAncestorContainer=this.startContainer;
}
this.collapsed=(this.startContainer===this.endContainer)&&(this.startOffset==this.endOffset);
},setStart:function(node,_321){
_321=parseInt(_321);
if(this.startContainer===node&&this.startOffset==_321){
return;
}
delete this._cachedBookmark;
this.startContainer=node;
this.startOffset=_321;
if(!this.endContainer){
this.setEnd(node,_321);
}else{
this._updateInternal();
}
},setEnd:function(node,_323){
_323=parseInt(_323);
if(this.endContainer===node&&this.endOffset==_323){
return;
}
delete this._cachedBookmark;
this.endContainer=node;
this.endOffset=_323;
if(!this.startContainer){
this.setStart(node,_323);
}else{
this._updateInternal();
}
},setStartAfter:function(node,_325){
this._setPoint("setStart",node,_325,1);
},setStartBefore:function(node,_327){
this._setPoint("setStart",node,_327,0);
},setEndAfter:function(node,_329){
this._setPoint("setEnd",node,_329,1);
},setEndBefore:function(node,_32b){
this._setPoint("setEnd",node,_32b,0);
},_setPoint:function(what,node,_32e,ext){
var _330=_5.range.getIndex(node,node.parentNode).o;
this[what](node.parentNode,_330.pop()+ext);
},_getIERange:function(){
var r=(this._body||this.endContainer.ownerDocument.body).createTextRange();
_5.range.ie.setRange(r,this.startContainer,this.startOffset,this.endContainer,this.endOffset,this.collapsed);
return r;
},getBookmark:function(body){
this._getIERange();
return this._cachedBookmark;
},_select:function(){
var r=this._getIERange();
r.select();
},deleteContents:function(){
var r=this._getIERange();
r.pasteHTML("");
this.endContainer=this.startContainer;
this.endOffset=this.startOffset;
this.collapsed=true;
},cloneRange:function(){
var r=new _5.range.W3CRange([this.startContainer,this.startOffset,this.endContainer,this.endOffset]);
r._body=this._body;
return r;
},detach:function(){
this._body=null;
this.commonAncestorContainer=null;
this.startContainer=null;
this.startOffset=0;
this.endContainer=null;
this.endOffset=0;
this.collapsed=true;
}});
}
}
if(!_4._hasResource["scayt"]){
_4._hasResource["scayt"]=true;
_4.provide("scayt");
_4.declare("scayt",_5._Widget,{baseClass:"scayt",time:1500,destroyCalled:false,_errorTime:5000,_afterErrorTime:100,_focused:false,_content:"",_options:"",assocApp:"vasya",sLang:"",_paused:false,disabled:false,_ignored:false,init:false,initSent:false,alwaysSend:true,block:"P|BUTTON|TEXTAREA|SELECT|DIV|H[1-6]|ADDRESS|PRE|OL|UL|LI|TABLE|TBODY|DT|DE|T[DHR]|CAPTION|SUB|SUP",form:"SELECT|BUTTON|TEXTAREA",_blankGif:"",_optionNames:{allCaps:"",mixedCase:"",mixedWithDigits:"",ignoreDomainNames:""},allCaps:false,mixedCase:false,mixedWithDigits:false,ignoreDomainNames:true,domainNameList:"http|https|ftp",_userDictionaryName:"",_customDictionaryIds:[],configUI:{contextMenuItems:{undo:{state:true,label:"Select All"},suggestions:{state:true,label:"Suggestions",numberof:5},moreSuggestions:{state:true,label:"More",numberof:10},dictionaryItems:{add_word:{state:true},ignore:{state:true},ignore_all:{state:true}},editItems:{Cut:{label:"Cut",state:true},Copy:{label:"Copy",state:true},Paste:{label:"Paste",state:true}},dialogUiItems:{options:{state:true,label:"Options"},language:{state:true,label:"Language"},dictionary:{state:true,label:"Dictionary"},about:{state:true,label:"About"}},selectAll:{state:true,label:"Select All"},disable:{state:true,label:"Select All"},help:{state:true,label:"Select All"}},itemsOrder:["Undo","Suggestions","MoreSuggestions","ignore","ignore_all","add_word","Separator","Paste","Cut","Copy","SelectAll","Separator","options","langs","dictionary","about","DisableButton","Help"],dialogItems:["options","langs","dictionary","about"],additionalItems:{}},afterMarkupInsert:[],afterMarkupRemove:[],isNormalizeEmptyParagraph:false,coordsX:123,coordsY:345,constructor:function(o){
var t=this;
if(typeof o.customerid!="undefined"&&o.customerid!="1:11111111111111111111111111111111111111"){
scayt.customerid=o.customerid;
}
if(o&&o.window&&o.window.frameElement&&o.window.frameElement.nodeName.toUpperCase()=="IFRAME"){
this.iframe=o.window.frameElement;
}
if(o.customDictionaryName&&o.customDictionaryName.length){
this._customDictionaryIds=_4.isString(o.customDictionaryName)?o.customDictionaryName.split(","):o.customDictionaryName;
}
if(o.customDictionaryIds&&o.customDictionaryIds.toString().length){
this._customDictionaryIds=_4.isString(o.customDictionaryIds)?o.customDictionaryIds.split(","):o.customDictionaryIds;
}
if(o.userDictionaryName){
this._userDictionaryName=o.userDictionaryName;
}
o.sLang=o.sLang||o.defLang||scayt.defaultLang;
_4.mixin(t.attributeMap,t._optionNames,{sLang:"",userDictionaryName:"",customDictionaryIds:""});
},create:function(_338,_339){
this.srcNodeRef=_4.byId(_339);
if(typeof this.srcNodeRef=="undefined"&&_338&&_338.srcNodeRef){
this.srcNodeRef=_4.byId(_338.srcNodeRef);
delete _338.srcNodeRef;
}
this._connects=[];
this._deferredConnects=_4.clone(this._deferredConnects);
for(var attr in this.attributeMap){
delete this._deferredConnects[attr];
}
for(attr in this._deferredConnects){
if(this[attr]!==_5._connectOnUseEventHandler){
delete this._deferredConnects[attr];
}
}
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){
this.id=this.srcNodeRef.id;
}
if(_338){
this.params=_338;
_4.mixin(this,_338);
}
if(_338&&_338.scaytuiconfig){
this.params.scaytuiconfig=_338.scaytuiconfig;
}
this.postMixInProperties();
if(!this.id){
this.id=_5.getUniqueId(this.declaredClass.replace(/\./g,"_"));
}
_5.registry.add(this);
this.buildRendering();
if(this.domNode){
this._applyAttributes();
var _33b=this.srcNodeRef;
if(_33b&&_33b.parentNode){
_33b.parentNode.replaceChild(this.domNode,_33b);
}
for(attr in this.params){
this._onConnect(attr);
}
}
if(this.domNode){
this.domNode.setAttribute("widgetId",this.id);
}
this.postCreate();
if(this.srcNodeRef&&!this.srcNodeRef.parentNode){
delete this.srcNodeRef;
}
this._created=true;
},buildRendering:function(){
this.domNode=this.srcNodeRef;
if(this.srcNodeRef.id){
this.oldIdValue=this.srcNodeRef.id;
}
this._applyAttributes();
for(var attr in this.params){
this._onConnect(attr);
}
this.srcNodeRef.setAttribute("widgetId",this.id);
this.domNode=null;
},postCreate:function(){
var t=this;
t.domNode=t.srcNodeRef;
if(this.domNode.nodeName=="IFRAME"){
this.iframe=this.domNode;
t.open();
}else{
if(this.iframe){
this.domNode=this.iframe;
t.open();
}else{
this.document=this.domNode.ownerDocument;
this.window=_5.getDocumentWindow(this.document);
this.window=window;
this.containerNode=this.containerNode||this.domNode;
this.containerNode.innerHTML=this.containerNode.innerHTML.replace(/\t\t/g," ");
if(_4.isIE){
this.containerNode.style.zoom=1;
}
this._onLoad();
}
}
},open:function(){
this.destroyCalled=false;
var h=null,ifr=this.domNode,_340=_4.hitch(this,function(){
if(this._loaded){
return;
}
if(h){
_4.disconnect(h);
h=null;
}
this.window=ifr.contentWindow;
var d=this.document=this.window.document;
this.containerNode=this.document.body;
this._onLoad();
});
if(_4.isIE&&_4.isIE<=7){
if(ifr.contentWindow.document.body){
_340();
}
}else{
if(!(/CKEDITOR/i.test(this.assocApp))&&((_4.isOpera&&!ifr.contentWindow)||(ifr.contentDocument&&ifr.contentDocument.URL=="about:blank")||(_4.isIE&&!ifr.contentWindow.document.body))){
h=_4.connect(((_4.isIE&&!_4.isIE>=9)?ifr.contentWindow:ifr),"onload",_340);
}else{
_340();
}
}
},_onLoad:function(e){
var t=this;
if(!t.window.__registeredWindow){
t.window.__registeredWindow=true;
_5.registerWin(t.window);
}
t.focusNode=t.containerNode;
t.sLang=t.sLang||scayt.defaultLang;
t.state=scayt.STATE_ENABLED;
if(scayt.persist){
scayt._restoreState(t,["_options","sLang"]);
var tmp=_4.clone(t._optionNames),str=String(t._options),i=0;
t._options=t._serializeOptions();
str?str:str=t._options;
for(var x in tmp){
tmp[x]=Number(str.charAt(i));
i++;
}
t._option(tmp);
}
if(!t.is(scayt.dictionary[t.sLang])){
t.dictionary=scayt.dictionary[t.sLang]=new _6.collections.Dictionary();
}
_4.subscribe("scayt::call",t,"call");
_4.subscribe("scayt::actionUserDictionary",t,"actionUserDictionary");
_4.subscribe("scayt::error",t,"setDisabled");
_4.subscribe("scayt::afterError",t,"refresh");
_4.subscribe("scayt::errorDisabled",t,function(_348){
if(_4.indexOf(_348,t.sLang)!=-1){
t.setDisabled(true);
}
});
_4.subscribe(t.id+":startScaytInstanceDestroing",t,function(_349){
var _34a=false;
delete scayt.scaytCtrls.controls[_349];
for(var i=0;i<scayt._hash.length;i++){
if(scayt._hash["id"]==_349){
delete scayt._hash[i];
_34a=i;
break;
}
}
_34a&&scayt._hash.splice(_34a,1);
});
t.regexp=t._getRegExp();
t.s=t.s();
t.nextNode=t.nextNode();
t.EventProxy=t.EventProxy();
t.DataProcessor=t.DataProcessor();
if(_4.isIE>=9){
t.document.execCommand("AutoUrlDetect",false,false);
}
t.span=this.document.createElement("span");
if(t.addClass){
_4.addClass(t.span,t.baseClass+"-misspell");
}
var html=t.document.getElementsByTagName("html")[0],_34d=document.getElementsByTagName("html")[0];
if(scayt._hash.length==0){
_4.hasAttr(_34d,"spellcheck")&&(scayt.defaultSpellcheck=_4.attr(_34d,"spellcheck"));
_4.attr(_34d,{"spellcheck":"false"});
}
if(t.srcNodeRef.nodeName!="IFRAME"){
_4.hasAttr(html,"spellcheck")&&(t.defaultSpellcheck=_4.attr(html,"spellcheck"));
}
if(_4.isIE){
t.addDataUrl=false;
}
if(!scayt.cssStyleNode.item(t.document)){
scayt.cssStyleNode.push({"doc":t.document,"css":[t.addCss(".scayt-enabled  "+t.selectorCss(),t.declarationCss()),t.addCss(".scayt-enabled .scayt-ignore","border:0px; background: inherit !important"),t.addCss(".scayt-enabled pre "+t.selectorCss(),"white-space: pre !important")]});
if(_4.isIE==7){
scayt.cssStyleNode.push({"doc":t.document,"css":[t.addCss(".cke_show_borders.scayt-enabled","margin: 0;padding: 15px 10px;")]});
}
}
if(typeof scayt.scaytCtrls.controls["sc_"+t.domNode.id]=="undefined"){
scayt.scaytCtrls.controls[t.domNode.id]=t;
}
scayt._hash.push(t);
_4.mixin(t,scayt._mixin);
if(_4.isFF<3){
t.disabled=true;
}
if(!t.disabled){
t.dispatchEvent();
}
if(!t.disabled){
_4.addClass(t.containerNode,"scayt-enabled");
if(t._getText(t.containerNode)){
t.reset();
t.nextNode.next(true);
}
}else{
_4.addClass(t.containerNode,"scayt-disabled");
}
t.postLoad();
t.onLoad();
_4.publish(this.id+"::onLoad",[this]);
this.isLoaded=true;
},hasTextNode:false,timerBlock:false,cssStyleNode:[],nextBlockInterval:500,postLoad:function(){
},onLoad:function(){
},focus:function(){
this[!_4.isIE&&this.iframe?"window":"containerNode"][_4.isIE?"setActive":"focus"]();
this._focused++;
},dispatchEvent:function(){
var t=this,ap=t.iframe?t.document:t.containerNode,x;
if(_4.isWebKit){
var evt={"onkeydown":"onBeforeEvt","onkeyup":"onAfterEvt","onmousedown":"onMouseDown"};
}else{
var evt={"onkeypress":"onBeforeEvt","onkeyup":"onAfterEvt","onmousedown":"onMouseDown"};
}
if(_4.isMoz||_4.isWebKit||_4.isIE){
evt.onpaste="onAfterEvt";
evt.oncut="onAfterEvt";
}
if(_4.isIE){
evt["onkeydown"]="onBeforeEvtIe";
for(x in evt){
t.connect(t.containerNode,x,t[evt[x]]);
}
}else{
for(x in evt){
t.connect(ap,x,t[evt[x]]);
}
}
},_serializeUnknowWord:[],nextNode:function(){
var t=this;
var i=0;
var sum=0;
var _355=null;
var _356=[];
var _357=[];
function _358(){
i=0;
sum=t.containerNode.childNodes.length-1;
};
function _359(_35a){
this.blockSize=_35a||5;
this.nodeList=[];
this.nodes=0;
this.text="";
this.items=[];
this.markers=[];
};
_359.prototype.splitNode=function(node,type){
var reg=new RegExp(/\B/);
var _35e=this.nodeList.length>0?this.nodeList[this.nodeList.length-1]:null;
if(this.text.length>=this.blockSize&&!_4.attr(node.parentNode,"data-scayt_word")){
if(_35e.nodeType==3&&reg.test(_35e.nodeValue.charAt(node.nodeValue.length-1))==true){
this.run();
}else{
if(type.display=="block"||type.nodeName=="BR"||type.nodeName=="P"){
if(node.parentNode.firstChild!=node){
if(reg.test(node.nodeValue.charAt(0))){
this.run();
}
}else{
this.run();
}
}
}
}
this.nodeList.push(node);
this.text+=node.nodeValue;
};
_359.prototype.run=function(){
if(this.nodeList.length==0){
return;
}
var _35f=t.getRng();
var _360=_35f.cloneRange?_35f.cloneRange():_35f.duplicate();
if(_4.isIE){
if(this.markers.length==0){
var _361=_4.clone(t.span);
_4.attr(_361,"data-marker-id",this.markers.length);
_4.attr(_361,"style","display:none;");
_4.attr(_361,"data-scayt_word",".");
_4.attr(_361,"data-scaytid",".");
this.nodeList[0].parentNode.insertBefore(_361,this.nodeList[0]);
this.markers.push(_361);
}
var _361=_4.clone(t.span);
_4.attr(_361,"data-marker-id",this.markers.length);
_4.attr(_361,"style","display:none;");
_4.attr(_361,"data-scayt_word",".");
_4.attr(_361,"data-scaytid",".");
var _362=this.nodeList[this.nodeList.length-1].parentNode;
_362.insertBefore(_361,this.nodeList[this.nodeList.length-1].nextSibling);
this.markers.push(_361);
var _360=t.document.body.createTextRange().duplicate();
var _363=t.document.body.createTextRange().duplicate();
var _364=t.document.body.createTextRange().duplicate();
var _365=_4.clone(t.span);
this.nodeList[0].parentNode.insertBefore(_365,this.nodeList[0]);
_363.moveToElementText(_365);
_363.collapse(true);
var _366=_4.clone(t.span);
var _367=this.nodeList[this.nodeList.length-1];
_367.parentNode.insertBefore(_366,_367.nextSibling);
_364.moveToElementText(_366);
_364.collapse(false);
_360.setEndPoint("StartToStart",_363);
_360.setEndPoint("EndToEnd",_364);
_365.parentNode.removeChild(_365);
_366.parentNode.removeChild(_366);
}else{
_360.setStartBefore(this.nodeList[0]);
_360.setEndAfter(this.nodeList[this.nodeList.length-1]);
}
node=_360.cloneContents?_360.cloneContents():_360.commonAncestorContainer;
var _368=this.nodeList.length;
var _369=0;
while(this.nodeList.length>0){
var _36a=this.nodeList.shift();
if(_36a.nodeType==3){
var ign=t.getProp(_36a.nodeValue),ig=t.isIgnore(ign);
if(_4.attr(_36a.parentNode,"data-scayt_word")&&ig==false){
_369++;
}
}
}
if(_369!=_368){
this.items.push({node:node,text:this.text,range:_360.cloneRange?_360.cloneRange():_360.duplicate()});
}
this.text="";
};
_359.prototype.traverse=function(_36d){
var node=_36d.firstChild;
var _36f=_36d.currentStyle||t.window.getComputedStyle(_36d,"");
var type={display:_36f?_36f.display:"inline",nodeName:_36d.nodeName};
if(node){
this.nodes++;
}
while(node){
if(!node.nodeName.match(t.nextNode.ignoreElementsRegex)){
if(node.nodeType==3){
this.splitNode(node,type);
}else{
if(node.nodeType==1){
if(node.nodeName.match(t.nextNode.blockElementsRegex)&&this.text.replace(/\s/,"").length!=0){
this.text+=" ";
}
arguments.callee.call(this,node);
}
}
}else{
this.run();
}
if(node.nodeName.match(t.nextNode.blockElementsRegex)&&this.text!=""){
this.text+=" ";
}
node=node.nextSibling;
if(!node){
this.nodes--;
}
}
if(this.nodes==0){
this.run();
}
return this.items;
};
return {blockElementsRegex:/^(br|caption|button|address|blockquote|body|center|dir|div|dl|fieldset|form|h[1-6]|hr|isindex|menu|noframes|noscript|ol|p|pre|table|ul|dd|dt|frameset|li|tbody|td|tfoot|th|thead|tr|html)$/i,ignoreElementsRegex:/^(select|option|textarea|input|style)$/i,ready:true,createIterator:function(_371){
_355=new _359(_371);
_356=[];
if(t.timerBlock){
clearTimeout(t.timerBlock);
}
_356=_355.traverse(t.containerNode);
_357=_355.markers;
},next:function(_372){
t.nextNode.ready=false;
t.s.clear();
this.createIterator(100);
t.finishCheck=function(){
if(t.timerBlock){
clearTimeout(t.timerBlock);
}
if(_356.length>0){
t.timerBlock=setTimeout(function(){
var _373=_356.shift();
if(_4.isIE){
var _374=t.document.body.createTextRange().duplicate();
var _375=t.document.body.createTextRange().duplicate();
var _376=t.document.body.createTextRange().duplicate();
var m1=_357.shift();
try{
_375.moveToElementText(m1);
_375.collapse(true);
_376.moveToElementText(_357[0]);
_376.collapse(false);
_374.setEndPoint("StartToStart",_375);
_374.setEndPoint("EndToStart",_376);
_373.range.setEndPoint("StartToStart",_375);
_373.range.setEndPoint("EndToStart",_376);
}
catch(e){
}
}
if(_373){
t.s.add(_373.node,{full:1},_373.range,_373.text,true);
t._m();
}
if(_356.length==0){
t.nextNode.ready=true;
}
try{
m1.parentNode.removeChild(m1);
if(_357.length==1){
m1=_357.shift();
m1.parentNode.removeChild(m1);
}
}
catch(e){
}
},t.nextBlockInterval);
}
};
t.finishCheck();
}};
},finishCheck:false,onBlockComplete:false,pauseForSend:4000,DataProcessor:function(){
var t=this;
var _379="";
var _37a,_37b,_37c,_37d;
var _37e={"1":function(){
return "<div>"+this+"</div>";
},"2":{find:new RegExp("()(?=\r\n$)","g"),rep:"<br>"},"3":{find:new RegExp("(.+)\r\n|\r\n","g"),rep:"$1<br>"},"4":{find:new RegExp("((?:\n|.)+)"),rep:"<div>$1</div>"},"5":{find:new RegExp("\r\n","gi"),rep:""},"6":{find:new RegExp("<br.*?>","gi"),rep:"\r\n"},"7":{find:new RegExp("(^<div.*?s>|</div>$)|(</div>(?=(?:(?:\\r\\n)+$)))","gi"),rep:""},"8":{find:new RegExp("(^<p>|</p>$)|(</p>(?=(?:(?:\\r\\n)+$)))","gi"),rep:""},"9":{find:new RegExp("(<div>&nbsp;</div>)","gi"),rep:"\r\n"},"10":{find:new RegExp("(<p>&nbsp;</p>)","gi"),rep:"\r\n"},"11":{find:new RegExp("(<div.*?>)","gi"),rep:""},"12":{find:new RegExp("(<p>)","gi"),rep:""},"13":{find:new RegExp("(</div>)","gi"),rep:"\r\n"},"14":{find:new RegExp("(</p>)","gi"),rep:"\r\n"},"15":{find:new RegExp("&nbsp;","gi"),rep:" "},"16":{find:new RegExp("()(?=\n$)","g"),rep:"<br>"},"17":{find:new RegExp("(?:\n)|(?:([^\n]+)(?:\n)?)","g"),rep:"<div>$1</div>"},"20":{find:new RegExp("<div></div>","gi"),rep:"<div><br></div>"},"22":{find:new RegExp("(.+)\n|\n","g"),rep:"$1<br>"},"23":{find:new RegExp("<span.*?>(.*?)</span>","gi"),rep:"$1"},"24":{find:new RegExp("(<div><br></div>)","gi"),rep:"\r\n"},"25":function(){
return this.indexOf("<div>")>0?this.replace(/(<div>)/,"\r\n$1"):this;
},"26":{find:new RegExp("<div>(.*)</div>"),rep:"$1"},"27":{find:new RegExp("<div>(.*)</div>"),rep:"$1"},"29":{find:new RegExp("(\r\n)$"),rep:""},"30":{find:/\s\s/g,rep:"&nbsp;&nbsp;"},"31":function(){
return this.replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&");
},"39":function(){
return this.replace(/>/g,"&gt;").replace(/</g,"&lt;");
},"32":{find:/<a.*?>(.*?)<\/a>/gi,rep:"$1"},"33":{find:/<div>&nbsp;<\/div>$|<p>&nbsp;<\/p>$/gi,rep:"<div></div>"},"34":{find:new RegExp("(?:\r\n)|(?:([^\r\n]+)(?:\r\n)?)","g"),rep:"$1\r\n"},"35":{find:/\t/g,rep:"&nbsp;&nbsp;&nbsp;&nbsp;"},"36":{find:/<strong>|<em>|<b>|<u>|<i>|<\/strong>|<\/em>|<\/b>|<\/u>|<\/i>/gi,rep:""},"37":{find:new RegExp("<div>|<p>|</div>$|</p>$","gim"),rep:""},"38":{find:new RegExp("(</div>|</p>)","gi"),rep:"$1<br />"},"40":function(){
return this+"<br style=\"display:inline;\"/>";
}};
var _37f=function(args){
return typeof (args)=="function"?args:function(){
return this.replace(args.find,args.rep);
};
};
var _381=(function(){
var _382,_383,i;
if(_4.isIE<9){
_382=[35];
_383=[23,5,6,33,7,8,9,10,11,12,13,14,15,31,23,32,36];
}else{
if(_4.isIE>=9){
_382=[39,16,17,35,30];
_383=[23,5,6,9,10,7,8,11,12,13,14,15,31,23,32,36];
}else{
if(_4.isWebKit){
_382=[39,17,20,35,30];
_383=[23,24,6,25,11,13,15,23,31,29,36];
}else{
_382=[39,16,22,35,30,40];
_383=[23,26,6,15,27,23,31,29];
}
}
}
var _385={flushback:[],flush:[]};
for(i=0;i<_382.length;i++){
_385.flushback.push(new _37f(_37e[_382[i]]));
}
for(i=0;i<_383.length;i++){
_385.flush.push(new _37f(_37e[_383[i]]));
}
return {flushback:function(text){
for(var i=0;i<_382.length;i++){
text=_385.flushback[i].apply(text);
}
return text;
},flush:function(text){
for(var i=0;i<_383.length;i++){
text=_385.flush[i].apply(text);
}
return text;
}};
})();
var _38a=document.getElementById(t.id);
var _38b=t.containerNode.parentNode.childNodes[t.containerNode.parentNode.childNodes.length-1];
return {toEditable:function(){
_379=_38b.value;
_379=_381.flushback(_379);
if(_4.isIE<9){
_38a.innerText=_379.replace(/<br \/>/gi,"\r\n").replace(/&nbsp;/gi," ");
}else{
_38a.innerHTML=_379;
_38a.innerHTML=_38a.innerHTML.replace(/<div><\/div>/g,"<div class=\"scayt-empty-line\">|</div>");
}
_4.withGlobal(t.window,"query",_4,["div.scayt-empty-line",t.containerNode]).forEach(function(node){
try{
node.innerHTML="";
}
catch(e){
}
});
t.s.clear();
setTimeout(function(){
t.refresh();
},0);
},toSource:function(){
_379=_38a.innerHTML.replace(/<div class="scayt-empty-line">&nbsp;<\/div>/g,"<div></div>");
_379=_381.flush(_379);
_379=(_38a.innerText==""&&_4.isIE)?_38a.innerText:_379;
_38b.value=_379;
},maxLength:0,checkMaxLength:function(){
return (_38b.value.length<this.maxLength||this.maxLength==0)?true:false;
},init:function(){
this.maxLength=_38b.getAttribute("maxLength")||0;
}};
},isMouse:true,EventProxy:function(){
var t=this;
return {addEventHandler:(function(){
var _38e;
if(window.addEventListener){
_38e=function(el,ev,fn){
el.addEventListener(ev,fn,false);
};
}else{
if(window.attachEvent){
_38e=function(el,ev,fn){
el.attachEvent("on"+ev,function(e){
fn.handleEvent.call(fn,e);
});
};
}else{
_38e=function(el,ev,fn){
el["on"+ev]=function(e){
fn.handleEvent.call(fn,e);
};
};
}
}
return _38e;
}()),dispatchEvent:(function(){
var _39a;
if(document.createEvent){
_39a=function(el,e){
var _39d=document.createEvent("Event");
if(e.type=="blur"&&this.controlValues[el.id]!=el.value){
_39d.initEvent("change",true,true);
arguments.callee.call(this,el,_39d);
}
_39d.initEvent(e.type,true,true);
for(var p in e){
if(typeof _39d[p]==="undefined"){
_39d[p]=e[p];
}
}
this.dispatchEventThroughAttrHandler(el,e);
if(!el.dispatchEvent(_39d)){
e.preventDefault();
}
};
}else{
if(document.createEventObject){
_39a=function(el,e){
var _3a1=document.createEventObject(e);
if(e.type=="blur"&&this.controlValues[el.id]!=el.value){
if(!el.fireEvent("onchange",_3a1)){
e.returnValue=false;
}
}
this.dispatchEventThroughAttrHandler(el,e);
if(!el.fireEvent("on"+e.type,_3a1)){
e.returnValue=false;
}
};
}
}
return _39a;
}()),dispatchEventThroughAttrHandler:function(el,ev){
if(!el.id){
return;
}
var dic={focus:scayt.scaytCtrls.getSCAYTControlById(el.id).onFocus,blur:scayt.scaytCtrls.getSCAYTControlById(el.id).onBlur};
for(var i in dic){
if(ev.type==i&&el==el.parentNode.childNodes[el.parentNode.childNodes.length-1]){
dic[i].call(el);
}
}
},controlValues:{},init:function(_3a6){
var _3a7=["click","focus","keypress","keydown","keyup","blur","mouseout","change","dblclick","mousedown","mousemove","mouseover","mouseup","select","paste","cut","copy"];
var _3a6=document.getElementById(t.id);
for(var i=0;i<_3a7.length;i++){
this.addEventHandler(_3a6,_3a7[i],this);
}
var _3a9=_3a6.parentNode.childNodes[_3a6.parentNode.childNodes.length-1];
this.controlValues[_3a9.id]=_3a9.value;
this.addEventHandler(t.document,"mouseup",{handleEvent:function(e){
t.isMouse=true;
}});
this.addEventHandler(t.document,"keydown",{handleEvent:function(e){
t.isMouse=false;
}});
},handleEvent:function(e){
if(e.type=="focus"&&!t.blockFocusProcessing){
clearTimeout(t.focusTimer);
t.focusTimer=setTimeout(function(){
if(t.isMouse==true){
return;
}
t.blockFocusProcessing=true;
var _3ad=t.containerNode.parentNode.childNodes[t.containerNode.parentNode.childNodes.length-1];
t.bookmark.toggleBookmark(t);
var _3ae=t.bookmark.getBookmark(t);
if(_3ad.nodeName=="INPUT"){
_3ae.start=0;
_3ae.end=t.containerNode.textContent!=undefined?t.containerNode.textContent.length:t.containerNode.innerText.replace(/\r\n/g,"\r").length;
_3ae.length=_3ae.end-_3ae.start;
_3ae.collapse=false;
}else{
if(_3ad.nodeName=="TEXTAREA"){
if(_4.isIE>=9){
_3ae.start=t.containerNode.innerText.replace(/\r\n\r\n/g,"\r").length;
}else{
_3ae.start=t.containerNode.textContent!=undefined?t.containerNode.textContent.length:t.containerNode.innerText.replace(/\r\n/g,"\r").length;
}
_3ae.end=_3ae.start;
_3ae.length=_3ae.end-_3ae.start;
_3ae.collapse=true;
}
}
t.bookmark.setBookmark(_3ae);
t.bookmark.moveToBookmark(t);
if(_4.isIE){
setTimeout(function(){
t.blockFocusProcessing=false;
},0);
}else{
t.blockFocusProcessing=false;
}
},100);
}
if(e.custom==true){
return;
}
var _3af=t.containerNode.parentNode.childNodes[t.containerNode.parentNode.childNodes.length-1];
if(e.keyCode){
var code=e.keyCode;
}else{
if(e.which){
var code=e.which;
}
}
var _3b1=code?String.fromCharCode(code):null;
if(e.ctrlKey){
_3b1="-";
}
var _3b2=t.getSel();
var _3b3=_4.isIE?_3b2.type=="Text"?false:true:_3b2.isCollapsed;
var _3b4=function(){
e=_4.isIE?window.event:e;
if(e.preventDefault){
e.preventDefault();
}else{
e.returnValue=false;
}
};
if(/[^#$!""-.(&%'\t']/.test(_3b1)&&code!=8&&code!=1&&code!=3&&_3b3==true){
if(t.DataProcessor.checkMaxLength()){
this.dispatchEvent(_3af,e);
}else{
_3b4();
}
}else{
var _3b5=t.DataProcessor.checkMaxLength();
if(_3b5==false&&e.type=="keypress"&&_3b3==false&&/[^#$!""-.(&%'\t']/.test(_3b1)){
if(_4.isIE){
_3b2.clear();
}else{
_3b2.deleteFromDocument();
}
_3b4();
}else{
this.dispatchEvent(_3af,e);
}
}
if(e.type=="blur"){
this.controlValues[_3af.id]=_3af.value;
}
if(e.type=="focus"&&!_4.isIE){
e.custom=true;
this.dispatchEvent(document.getElementById(t.id),e);
}
var _3b6=/paste/;
if(_3b6.test(e.type)&&(_4.isIE||_4.isFF)){
t.execCommand(e.type);
_3b4();
return;
}
t.DataProcessor.toSource();
if(code==13&&_4.isIE<9&&e.type=="keydown"){
var html=t.containerNode.innerHTML;
html=html.replace(/<p>(<br>?.+)?&nbsp;<\/p>/gi,"$1");
html=html.replace(/<p>&nbsp;<\/p>|<div>&nbsp;<\/div>|<p>|<\/p>|<div>|<\/div>/gi,"");
html=html.replace(/\r\n/,"<BR />");
t.bookmark.toggleBookmark(t);
t.containerNode.innerHTML=html;
t.bookmark.moveToBookmark(t);
}
var _3b8="Unknown OS";
if(navigator.appVersion.indexOf("Win")!=-1){
_3b8="Windows";
}
if(navigator.appVersion.indexOf("Mac")!=-1){
_3b8="MacOS";
}
if(e.type=="paste"||(e.ctrlKey&&e.keyCode==86&&e.type=="keydown"&&_3b8!="MacOS")||(e.shiftKey&&e.keyCode==45&&e.type=="keydown"&&_3b8!="MacOS")||(e.which==86&&e.metaKey&&e.type=="keydown"&&_3b8=="MacOS")){
var _t=t;
t.bookmark.toggleBookmark(t);
var _bm=t.bookmark.getBookmark();
var _3bb=_3af.nodeName.toLowerCase()=="input"?"input":"textarea";
var _inp=document.createElement(_3bb);
_inp.style.position="absolute";
_inp.style.left="-99999px";
_3af.parentNode.appendChild(_inp);
var _3bd={start:_bm.start,end:_bm.start+_bm.length,offset:0};
if(!_4.isIE){
var sel=t.window.getSelection();
var rng=sel.getRangeAt(0);
_3bd=t.bookmark.getCharacterOffsetWithIn(rng,t.containerNode,_bm.block);
}
var _3c0=t.getRng();
_inp.focus();
setTimeout(function(){
var _3c1=t.DataProcessor.maxLength-_3af.value.replace(/\r\n/gi,"\n").length+(_3bd.end-_3bd.start);
_inp.value=_4.isIE?_inp.value.replace(/\n\n(?=.)/g,"\n").replace(/\n$/,""):_inp.value;
var _3c2=t.DataProcessor.maxLength!=0?_inp.value.substr(0,_3c1):_inp.value.replace(/\n\n/g,"\n");
var _3c3=_3af.value.replace(/\r\n/gi,"\n");
_3af.value=_3c3.slice(0,_3bd.start);
_3af.value=_3af.value+_3c2;
_3af.value=_3af.value+_3c3.slice(_3bd.end);
t.bookmark.toggleBookmark(t);
var _bm2=t.bookmark.getBookmark();
_t.DataProcessor.toEditable();
_bm2.start=_3bd.start-_3bd.offset+_3c2.replace(/\r\n|\n/g,"").length;
_bm2.end=_bm2.start;
if(_4.isWebKit){
var _3c5=t.document.createTreeWalker(node=t.containerNode,NodeFilter.SHOW_TEXT,null,false);
var _3c6=0,_3c7=0,_3c8=0;
while(_3c5.nextNode()&&_3c6<_bm2.start){
_3c6+=_3c5.currentNode.length;
node=_3c5.currentNode;
_3c7=_3c5.currentNode.length-(_3c6-_bm2.start);
}
_bm2.start=_3c7;
_bm2.block=node==t.containerNode?node:node.parentNode;
}else{
_bm2.start=!_4.isFF?_bm2.start-_3c2.replace(/\n/g,"").length+_3c2.length:_bm2.start;
_bm2.block=t.containerNode;
}
_3af.parentNode.removeChild(_inp);
t.isMouse=true;
document.getElementById(t.id).focus();
_bm2.br=undefined;
t.bookmark.moveToBookmark(t);
t._focused=true;
},0);
}
}};
},deffMarkup:function(res,_3ca){
var t=this,ap=0,arr;
if(t.markupWord.length){
if(t._clearActiveTimer){
clearTimeout(t._clearActiveTimer);
delete (t._clearActiveTimer);
if(_3ca){
ap=3;
}
}
t.inFlight=true;
if(t.markupWord.length>21){
arr=t.markupWord.splice(0,20);
}else{
arr=_4.clone(t.markupWord);
t.markupWord=[];
}
t._m(arr,ap);
t.inFlight=false;
if(t.markupWord.length){
t.inFlight=true;
t._clearDeffMarkupTimer=setTimeout(function(){
if(t.disabled){
return;
}
t.deffMarkup(res);
},t.pauseForSend);
}else{
if(_4.isIE&&!t.is(t._clearActiveTimer1)){
t._clearActiveTimer1=setTimeout(function(){
if(t._clearActiveTimer1){
clearTimeout(t._clearActiveTimer1);
delete (t._clearActiveTimer1);
}
t._setActive=true;
t._m(null,3);
if(t.stackUnknowWord.length){
scayt.send({words:t.filterWords(t.stackUnknowWord),slang:t.sLang},null,t);
}
t.stackUnknowWord=[];
t._setActive=false;
},t.time);
}
if(t.finishCheck){
if(t.onBlockComplete){
t.onBlockComplete();
}
t.finishCheck();
}
}
}else{
if(t.finishCheck){
if(t.onBlockComplete){
t.onBlockComplete();
}
t.finishCheck();
}
}
return res;
},filterWords:function(arr){
var a="";
for(var i=0;i<arr.length;i++){
if(_4.isString(arr[i])){
a=(i==0?"":",")+arr[i];
}
}
return a;
},sendSerializeWord:function(res){
var t=this;
t.inFlightSendSerialize=true;
if(t._serializeUnknowWord.length){
scayt.send({words:t._serializeUnknowWord.shift(),slang:t.sLang},null,t);
if(t._serializeUnknowWord.length){
t._clearSendSerializeTimer=setTimeout(function(){
t.sendSerializeWord(res);
},4000);
}else{
t.inFlightSendSerialize=false;
}
return res;
}
},_option:function(_3d3,_3d4){
var args=arguments.length,t=this,tmp=_4.clone(t._optionNames),opt=false,x;
if(args==2&&t.is(t._optionNames[_3d3])){
opt=t[_3d3]=Number(_3d4);
}
if(args==1){
if(!_4.isString(_3d3)){
opt={};
for(x in _3d3){
if(t.is(_3d3[x])){
opt[x]=t[x]=Number(_3d3[x]);
}
opt[x]=t[x];
}
}else{
if(_4.isString(_3d3)){
if(!t.is(t._optionNames[_3d3])){
throw new Error("This option not found: "+_3d3);
}
opt=t[_3d3];
}
}
}
if(!args){
opt={};
for(x in tmp){
opt[x]=t[x];
}
}
var ser=t._serializeOptions();
if(t._options!=ser){
t._options=ser;
if(scayt.persist){
scayt._saveState(t,["_options"]);
}
scayt._io.options=t._options;
t._onOptionChange(_3d3,_3d4);
}
return opt;
},option:function(_3db,_3dc){
var t=this,tmp,args=arguments;
if(typeof _3dc!="undefined"||_4.isObject(_3db)){
tmp=t._option.apply(t,args);
if(t._paused){
t.afterPausedCall.push(function(){
t._setContent(function(){
t.refresh(null,true);
});
});
}else{
t._setContent(function(){
t.refresh(null,true);
});
}
return tmp;
}else{
return t._option.apply(t,args);
}
},setPaused:function(_3e0){
this._paused=_3e0;
var n=(_3e0?"before":"after")+"PausedCall";
for(var i=0;i<this[n].length;i++){
this[n][i].apply(this);
}
this[n]=[];
this.onSetPaused(_3e0);
},afterPausedCall:[],beforePausedCall:[],onSetPaused:function(_3e3){
this.hideMarkup(_3e3);
},hideMarkup:function(_3e4){
var t=this;
for(var i=0;i<t.document.styleSheets.length;i++){
var _3e7=false;
if(_4.isIE<9){
_3e7=t.document.styleSheets.item(i).ownerNode?t.document.styleSheets.item(i).ownerNode.scayt:t.document.styleSheets.item(i).scayt;
}else{
_3e7=t.document.styleSheets.item(i).ownerNode.scayt||t.document.styleSheets.item(i).scayt;
}
if(_3e7){
t.document.styleSheets.item(i).disabled=_3e4;
}
}
},setDisabled:function(_3e8,_3e9){
var t=this;
if(_4.isFF<3){
return;
}
if(t.disabled==_3e8){
return;
}
t.disabled=_3e8;
_4.toggleClass(t.containerNode,"scayt-disabled");
_4.toggleClass(t.containerNode,"scayt-enabled");
if(_3e8){
if(t._clearSendSerializeTimer){
clearTimeout(t._clearSendSerializeTimer);
delete (t._clearSendSerializeTimer);
}
if(t._clearDeffMarkupSerializeTimer){
clearTimeout(t._clearDeffMarkupSerializeTimer);
delete (t._clearDeffMarkupSerializeTimer);
}
if(t._clearDeffMarkupTimer){
clearTimeout(t._clearDeffMarkupTimer);
delete (t._clearDeffMarkupTimer);
}
if(t._clearActiveTimer){
clearTimeout(t._clearActiveTimer);
delete (t._clearActiveTimer);
}
t.isTextSizeBig=false;
t.inFlight=false;
t.inFlightSendSerialize=false;
t.markupWord=[];
t.unknowWord=[];
t._serializeUnknowWord=[];
t.s.clear();
t.reset();
_4.forEach(t._connects,function(_3eb){
_4.forEach(_3eb,_4.disconnect);
});
}else{
t.reset();
t.dispatchEvent();
t.refresh();
}
t.state=_3e8?scayt.STATE_DISABLED:scayt.STATE_ENABLED;
t._onSetDisabled(_3e8);
_4.publish(this.id+"::setDisabled",[this]);
},pause:function(){
var t=this;
t._paused=!t._paused;
t.setDisabled(t._paused,true);
_4.publish(this.id+"::pause",[this]);
},setLang:function(lang,_3ee){
var t=this;
if(t.disabled||(t.sLang==lang&&!_3ee)){
return;
}
t.attr("sLang",lang);
if(scayt.persist){
scayt._saveState(t,["sLang"]);
}
var f=function(){
t._setContent(function(){
t.reset();
if(!t.is(scayt.dictionary[t.sLang])){
t.dictionary=scayt.dictionary[t.sLang]=new _6.collections.Dictionary();
}
t.refresh();
_4.publish(t.id+"::setLang",[t]);
});
};
if(t._paused){
t.afterPausedCall.unshift(function(){
f.apply(t);
});
}else{
f();
}
t._onLangChange(lang);
},reset:function(str){
var t=this;
if(str&&_4.isString(str)&&t.window.document){
var node=_4.withGlobal(t.window,"create",_4,["div"]);
if(_4.isWebKit){
_4.style(node,"display","none");
t.document.body.appendChild(node);
}
node.innerHTML=str;
t._containerNode=t.containerNode;
t.containerNode=node;
t.remove(t.query(),t.containerNode,true);
str=t.containerNode.innerHTML;
t.containerNode=t._containerNode;
if(_4.isWebKit){
_4.destroy(node);
}
return str;
}
if(!t.destroyCalled){
t._setContent(function(){
t.remove(t.query());
});
}else{
t.remove(t.query());
}
t._innerHTML="";
_4.publish(t.id+"::reset",[t]);
},getScaytNode:function(node){
var t=this;
if(!arguments.length){
try{
node=_4.isIE?t.getRng().parentElement():t.getSel().anchorNode;
}
catch(e){
return null;
}
}
node=t.getParent(node,null,{"data-scayt_word":null});
return _4.hasClass(node,"scayt-ignore")?null:node;
},getWord:function(node){
if(!node){
return null;
}
return _4.hasClass(node,"scayt-ignore")?null:_4.attr(node,"data-scayt_word");
},getLang:function(){
return this.sLang;
},refresh:function(_3f7,_3f8){
var t=this;
if(t.disabled||t._paused){
return;
}
_3f7=_3f7||t.containerNode;
if(!_3f7){
return;
}
if(!_3f8&&_3f7==t.containerNode&&t._innerHTML==t.containerNode.innerHTML){
return;
}
if(_3f7==t.containerNode){
t.nextNode.next(true);
}else{
t.s.add(_3f7);
t._m();
}
},ignore:function(node){
this._onIgnore();
_4.removeClass(node,"scayt-misspell");
_4.addClass(node,"scayt-ignore");
var _3fb=_4.attr(node,"data-scayt_word");
if(_3fb){
this.postToLogs(scayt,"scayt","ignore",this.sLang,_3fb," ");
}
},ignoreAll:function(word){
this._onIgnoreAll(word);
if(!_4.isString(word)){
try{
word=_4.attr(word,"data-scayt_word");
}
catch(e){
}
}
if(!word){
throw new Error("Incorrect node");
return;
}
scayt.ignoreDictionary.add(word);
var nl=this.query(word);
nl.removeClass("scayt-misspell");
nl.addClass("scayt-ignore");
this.postToLogs(scayt,"scayt","ignoreAll",this.sLang,word," ");
},addClass:false,addDataUrl:true,misspellingDecorator:0,declarationCss:function(){
if(this.misspellingDecorator==0){
return "background: url("+(this.addDataUrl?scayt.imageDataURL:scayt.imageURL)+") transparent bottom repeat-x !important; padding-bottom: 0 !important; text-decoration: none !important; white-space: break-word !important;";
}else{
return "border-bottom: 1px dotted red; padding-bottom: 0 !important; text-decoration: none !important;";
}
},selectorCss:function(){
return _4.isIE||this.addClass?"."+this.baseClass+"-misspell":"[data-"+this.baseClass+"_word]";
},addStyle:function(_3fe,_3ff){
var t=this;
scayt.cssStyleNode.item(t.document)["css"].push(t.addCss(_3fe,_3ff));
},addCss:function(_401,_402){
var t=this,ss=scayt.dynamicStyleMap[name],_405=_401+" {"+_402+"}",_406="data-cke-temp",_407=false;
if(/^CKEDITOR/i.test(t.assocApp)){
var _408=window.CKEDITOR.version.split(".");
if(_408[0]<=3&&_408[1]<=4){
_406="cke_temp";
}
}
if(!ss){
if(this.document.createStyleSheet){
try{
ss=t.document.createStyleSheet();
ss._indicies=[];
}
catch(e){
_407=true;
}
}else{
ss=t.document.createElement("style");
_4.attr(ss,_406,"2");
ss.setAttribute("type","text/css");
t.document.getElementsByTagName("head")[0].appendChild(ss);
ss._indicies=[];
}
}
if(_4.isIE&&!_407){
ss.cssText+=_405;
_4.attr(ss.owningElement,_406,"2");
}else{
if(_4.isIE&&_407){
var _409=t.document.styleSheets[document.styleSheets.length-1];
_409.cssText+="\r\n"+_405;
ss={};
ss["_indicies"]=[];
}else{
if(ss.sheet){
ss.sheet.insertRule(_405,ss._indicies.length);
}else{
ss.appendChild(t.document.createTextNode(_405));
}
}
}
ss._indicies.push(_401+" "+_402);
ss.scayt=true;
return ss;
},normalize:function(){
var t=this;
if(t.containerNode.normalize&&!_4.isIE&&!_4.isOpera&&!_4.isSafari){
t.selection.saveSelection(t);
t.containerNode.normalize();
t.selection.collapseToStart(t);
}
},selection:function(){
var _40b;
return {saveSelection:function(t){
var _40d=t.getSel();
_40b=_40d?_40d.isCollapsed:"undefined";
},collapseToStart:function(t){
var _40f=t.getSel();
if(_40f&&_40f.isCollapsed!=_40b){
_40f.collapseToStart();
}
}};
}(),bookmark:function(){
var _410,_411,_412=[];
return {getCharacterOffsetWithIn:function(_413,node,_415){
var _416=function(node,_418){
var _419=0,_41a=0;
var _41b=true;
var _41c=function(_41d){
var _41e=_41d.firstChild;
_41b=_41e!=_418.node;
while(_41e&&_41b){
if(_41e.nodeType==1){
_419+=(_419>0&&_41e.nodeName==_418.nodeName)?1:0;
_41a+=(_419>0&&_41e.nodeName==_418.nodeName)?1:0;
arguments.callee.call(this,_41e);
}else{
if(_41e.nodeType==3){
_419+=_41e.length;
}
}
_41e=_41e.nextSibling;
_41b=_41b?(_41e!=_418.node):false;
}
};
_41c(node);
_419+=_418.offset;
_419+=_418.node.nodeName=="DIV"?1:0;
_41a+=_418.node.nodeName=="DIV"?1:0;
return {"charCount":_419,"offset":_41a};
};
var _41f={};
_41f.nodeName=_4.isFF?"BR":"DIV";
if(_413.startContainer==_411.containerNode){
_41f.node=_411.containerNode.childNodes[_413.startOffset]||_411.containerNode.firstChild||_411.containerNode;
_41f.offset=0;
}else{
_41f.node=_413.startContainer;
_41f.offset=_413.startOffset;
}
var _420=_416(node,_41f);
if(_413.endContainer==_411.containerNode){
_41f.node=_411.containerNode.childNodes[_413.endOffset]||_411.containerNode.lastChild||_411.containerNode;
_41f.offset=0;
}else{
_41f.node=_413.endContainer;
_41f.offset=_413.endOffset;
}
var _421=_416(node,_41f);
return {start:_420.charCount,end:_421.charCount,offset:_420.offset};
},getCharacterOffsetWithOut:function(_422,_423){
var _424=_411.document.createTreeWalker(node=_411.containerNode,NodeFilter.SHOW_TEXT,null,false);
var _425=0,_426=0;
while(_424.nextNode()&&_425<=_423){
_425+=_424.currentNode.length;
node=_424.currentNode;
_426=_424.currentNode.length-(_425-_423);
}
return {offset:_426,node:node};
},pasteCursorSpan:function(){
var _427=_411.document.getElementById("scayt_bookmark");
if(!_427){
if(!_411.iframe){
return;
}
var _428=_411.getRng();
_428.collapse(true);
_428.move("character",-1);
}else{
this.removeCursorSpan();
this.pasteCursorSpan();
}
},removeCursorSpan:function(){
var _429=_411.document.getElementById("scayt_bookmark");
if(_429){
_429.parentNode.removeChild(_429);
}
},clearEmptyNodes:function(){
while(_412.length>0){
_412.shift().innerHTML="";
}
},restoreSelection:function(){
var b=this.getBookmark();
if(b&&!_4.isIE){
var sel=_411.getSel();
sel.removeAllRanges();
sel.addRange(b.selection);
}
},getBookmark:function(){
return _410;
},setBookmark:function(b){
if(_4.isIE){
this.pasteCursorSpan();
}else{
var sel=_411.getSel();
b.selection=sel.rangeCount>0?sel.getRangeAt(0):null;
if(!b.start){
b.start=0;
}
}
_410=b;
},toggleBookmark:function(_42e,si){
_411=_42e;
var t=_42e,d=_4,ch=-16777215,_433=t.getRng(),c=t.containerNode,vp=(t.containerNode.nodeName=="BODY"?_4.withGlobal(t.window,"getViewport",_5,[]):{l:c.scrollLeft,t:c.scrollTop}),o={scrollX:vp.l,scrollY:vp.t,collapse:0,start:0},sp,nv,sel=t.getSel();
t.asd=null;
t.asd1=null;
if(si=="simple"){
return this.setBookmark(d.mixin(o,{rng:_433}));
}
if(_4.isIE){
_4.withGlobal(t.window,"query",_4,["span:empty",t.containerNode]).forEach(function(node){
if(_4.attr(node,"data-scayt_word")){
node.parentNode.removeChild(node);
}
});
if(t.isNormalizeEmptyParagraph){
_4.withGlobal(t.window,"query",_4,["p:empty",t.containerNode]).forEach(function(node){
try{
node.innerHTML="&nbsp;";
_412.push(node);
}
catch(e){
}
});
}
if(t.document.selection&&t.document.selection.type&&t.document.selection.createRange().item){
_433=t.document.selection.createRange();
var e=_433.item(0);
d.query(e.nodeName,c).forEach(function(node,i){
if(e==node){
return this.setBookmark(!(sp=i));
}
});
return this.setBookmark(d.mixin(o,{tag:e.nodeName,index:sp}));
}
var tr,bp,tr1;
tr=_433.duplicate();
try{
tr.moveToElementText(c);
var _442=tr.text.split("\r\n");
_442=_442.length-1;
}
catch(e){
tr=t.document.body.createTextRange();
}
tr.collapse(true);
bp=Math.abs(tr.move("character",ch));
tr=_433.duplicate();
tr.collapse(true);
sp=Math.abs(tr.move("character",ch));
tr=_433.duplicate();
tr.collapse(false);
var _443=0;
tr1=tr.duplicate();
tr1.moveEnd("character",1);
tr1.collapse(false);
var parN=tr1.parentElement();
tr1.moveEnd("character",2);
if((new RegExp("^(?:"+t.block+")$")).test(parN.nodeName)){
if(/^\r\n<TR>/i.test(tr1.htmlText)){
t.asd1=1;
}
var _445=t.getParent(tr.parentElement(),t.block,null,t.containerNode);
}
var _446=Math.abs(tr.move("character",ch))-sp;
return this.setBookmark(d.mixin(o,{start:sp-bp-_443,length:_446,collapse:!_446,bmLengthCorrectionByNewLine:_442}));
}
var p=_4.withGlobal(t.window,"getParentElement",t,[]);
if(p&&p.nodeName=="IMG"){
return this.setBookmark(o);
}
if(!sel){
return this.setBookmark(null);
}
var sc=_433.startContainer,an=sel.anchorNode,n,w;
sp=t.getScaytNode(an);
if(sel.isCollapsed&&an){
o.collapse=1;
var _44c=t.getParent(an,t.block)||c;
if(an.nodeType==3){
w=t.document.createTreeWalker(_44c,NodeFilter.SHOW_TEXT,null,false);
while((n=w.nextNode())){
if(n==an){
o.start=o.start+sel.anchorOffset;
break;
}
o.start+=t._trimNl(n.nodeValue||"").length;
}
}else{
if(an!=_44c){
w=t.document.createTreeWalker(_44c,NodeFilter.SHOW_ALL,null,false);
while((n=w.nextNode())){
if(n==an){
break;
}
o.start+=t._trimNl(n.nodeValue||"").length;
}
}
if(sc.nodeType!=8){
for(var i=0;i<_433.startOffset;i++){
o.start+=parseInt(String(sc.childNodes[i].textContent).length,10);
}
}
}
o.end=o.start;
var tc=sc.textContent!="undefined"?sc.textContent:sc.innerHTML;
if(!sp){
o.content=tc;
try{
if(_433.startOffset==0&&sc.previousSibling&&(/IMG|BR|INPUT/.test(sc.previousSibling.nodeName))){
o.br=sc.previousSibling;
}
if(sc.childNodes[_433.startOffset-1]&&(/IMG|BR|INPUT/.test(sc.childNodes[_433.startOffset-1].nodeName))){
o.br=sc.childNodes[_433.startOffset-1];
}else{
if(_4.isWebKit){
if(sc.childNodes[_433.startOffset]&&(/IMG|BR|INPUT/.test(sc.childNodes[_433.startOffset].nodeName))){
o.br=sc.childNodes[_433.startOffset];
}
}
}
}
catch(e){
}
}else{
if(tc==""){
_4.attr(sc,"scaytbookmark","true");
o.empty=true;
}
try{
if(_4.isWebKit){
if(_433.startOffset==0&&sc.previousSibling&&(/IMG|BR|INPUT/.test(sc.previousSibling.nodeName))){
o.br=sc.previousSibling;
}
if(sc.childNodes[_433.startOffset-1]&&(/IMG|BR|INPUT/.test(sc.childNodes[_433.startOffset-1].nodeName))){
o.br=sc.childNodes[_433.startOffset-1];
}else{
if(sc.childNodes[_433.startOffset]&&(/IMG|BR|INPUT/.test(sc.childNodes[_433.startOffset].nodeName))){
o.br=sc.childNodes[_433.startOffset];
}
}
}
}
catch(e){
}
}
if(!_4.isIE&&sp&&_433.startContainer==sp&&_433.startOffset>0&&(n=sp.childNodes[_433.startOffset-1])&&/IMG|BR|INPUT/.test(n.nodeName)){
_4.attr(n,"scaytbookmark","true");
o.img=true;
}
if(sp&&_433.startOffset==0){
n=sp.previousSibling;
while(n&&((n.nodeType==3&&n.textContent=="")||(n.nodeType!=3&&n.innerHTML==""))){
if(n&&(/IMG|BR|INPUT/.test(n.nodeName))){
o.br=n;
o.br2=n.nextSibling;
break;
}
n=n.previousSibling;
}
}
d.mixin(o,{block:_44c,node:sc,offset:_433.startOffset});
return this.setBookmark(o);
}
var s=[];
p=0;
w=t.document.createTreeWalker(c,NodeFilter.SHOW_TEXT,null,false);
while((n=w.nextNode())!=null){
if(n==sc){
s[0]=p;
}
if(n==_433.endContainer){
s[1]=p;
break;
}
p+=t._trimNl(n.nodeValue||"").length;
}
d.mixin(o,{start:s[0]+_433.startOffset,end:typeof s[1]!="undefined"?s[1]+_433.endOffset:s[0]+t._trimNl(_433.startContainer.nodeValue||"").length,block:c});
return this.setBookmark(o);
},moveToBookmark:function(_450){
_411=_450;
var b=_410;
var t=_450,sel=t.getSel(),c=t.containerNode,rng=t.getRng(),_456,_457;
_457=document.activeElement||t.containerNode;
if(_457.contentWindow){
_457=_457.contentWindow.document.activeElement;
}
function _458(sp,ep){
var n,p=0,d={},o,par,k=-1,nv,nvl,w=t.document.createTreeWalker(b.block,NodeFilter.SHOW_TEXT,null,false);
while((n=w.nextNode())){
nv=n.nodeValue||"";
nvl=t._trimNl(nv).length;
p+=nvl;
if(b.collapse){
if(p>=sp){
par=t.getParent(n,t.block)||c;
}
if(p==sp){
k=par==b.block?1:0;
}
if(k==-1&&p>sp||k==1){
d.endNode=d.startNode=n;
d.endOffset=d.startOffset=sp-(p-nvl);
return d;
}
}else{
if(p>sp&&!d.startNode){
o=sp-(p-nvl);
d.startNode=n;
d.startOffset=sp-(p-nvl);
}
if(p>=ep){
d.endNode=n;
d.endOffset=ep-(p-nvl);
return d;
}
}
}
return null;
};
if(!b){
return false;
}
if(_4.isIE){
if((_456=b.rng)){
try{
_456.select();
}
catch(ex){
}
return true;
}
if(b.tag){
_456=t.containerNode.createControlRange();
_4.query(b.tag,c).forEach(function(n,i){
if(i==b.index){
_456.addElement(n);
}
});
}else{
if(b.start<0){
return true;
}
_456=t.getRng();
try{
if(t.asd){
_456.moveToElementText(t.asd);
_456.moveStart("character",-2);
_456.expand("word");
_456.collapse(true);
_456.move("word",1);
}else{
if(!t.asd1){
var _466=t.document.getElementById("scayt_bookmark");
if(_466){
_456.moveToElementText(_466);
_456.moveStart("character",1);
_456.moveEnd("character",b.length);
this.removeCursorSpan();
}else{
_456.moveToElementText(t.containerNode);
_456.collapse(true);
_456.moveStart("character",b.start);
_456.moveEnd("character",b.length);
}
}
}
}
catch(e){
_456=t.getRng();
}
}
if(t.iframe){
var vp=_5.getViewport(),_468=_4.coords(t.iframe);
if(t.ignoreFormElement||_456.boundingTop<0||_456.boundingTop>0&&_468.y<0&&_456.boundingTop<_468.y*-1||_456.boundingTop>(_468.h-_456.boundingHeight)||_456.boundingTop>(vp.h-_468.y)||_456.boundingLeft<0||_456.boundingLeft>0&&_468.x<0&&_456.boundingLeft<_468.x*-1||_456.boundingLeft>(_468.w-_456.boundingWidth)||_456.boundingLeft>(vp.w-_468.x)){
}else{
if(typeof _456.boundingHeight=="undefined"||(_456.boundingHeight+_456.boundingWidth)){
_456.select();
}
}
}else{
if(!t.ignoreFormElement){
_456.select();
}
}
if(!t.iframe){
setTimeout(function(){
t.containerNode.scrollLeft=b.scrollX;
t.containerNode.scrollTop=b.scrollY;
},0);
}
try{
if(_4.isIE&&_4.isIE!=9){
if(_450.activateEditableBlockOnMouseClick){
t.getParentEditBlock(_456.parentElement()).setActive();
}
t._focused=true;
}else{
_457.focus();
}
}
catch(ex){
}
this.clearEmptyNodes();
this.removeCursorSpan();
return true;
}
if(!sel){
return false;
}
_456=rng.cloneRange();
if(b.rng){
sel.removeAllRanges();
sel.addRange(b.rng);
}else{
if(t.is(b.node)&&!(_4.isWebKit&&b.node.nodeType==3)){
var a=false;
try{
if((b.node.nodeType==3&&b.node.parentNode!=null&&b.node.textContent==b.content)||(b.node.nodeType!=3&&b.node.innerHTML==b.content)){
_456.setStart(b.node,b.offset);
if(_456.toString()){
_456.collapse(true);
a=true;
}
}
if(b.empty||b.img){
var nn=_4.withGlobal(t.window,"query",_4,["[scaytbookmark]",t.containerNode]);
_4.removeAttr(nn[0],"scaytbookmark");
if(b.img){
_456.selectNode(nn[0]);
_456.collapse(false);
}else{
_456.setStart(nn[0],0);
_456.collapse(true);
}
a=true;
}
if(t.is(b.br)&&(/IMG|BR|INPUT/.test(b.br.nodeName))){
if(b.br.nextSibling){
if(!_4.isWebKit){
_456.selectNode(b.br.nextSibling);
_456.collapse(true);
}
}else{
_456.selectNode(b.br);
_456.collapse(false);
}
a=true;
}
}
catch(ex){
}
if(a){
if(!_4.isOpera){
sel.removeAllRanges();
}
sel.addRange(_456);
_457.focus();
return;
}
}else{
try{
if(_4.isWebKit&&t.is(b.br)&&b.br.nextSibling){
if((/IMG|BR|INPUT/.test(b.br))){
if(b.offset==0){
if(b.node.parentNode&&b.node.parentNode.parentNode){
if((b.node.parentNode.tagName=="SPAN")&&(b.node.parentNode.parentNode.tagName=="SPAN")){
t.remove(b.node.parentNode);
}
}
_456.selectNode(b.br.nextSibling);
_456.collapse(true);
sel.addRange(_456);
_457.focus();
}
return;
}
}else{
if(_4.isWebKit){
if(t.is(b.node)&&(b.node.parentNode)&&(b.node.parentNode.tagName=="SPAN")){
_456.selectNode(b.node);
_456.collapse(true);
var _46b=t.containerNode.scrollTop;
_457.focus();
t.containerNode.scrollTop=_46b;
}else{
if((b.offset==0)&&(b.node.previousSibling)){
return;
}
}
}
}
}
catch(ex){
}
}
if(t.is(b.start)&&t.is(b.end)){
try{
var sd=_458(b.start,b.end);
var _46d=b.selection?b.selection.toString():"";
if(sd){
_456.setStart(sd.startNode,sd.startOffset);
_456.setEnd(sd.endNode,sd.endOffset);
if(!_4.isOpera){
sel.removeAllRanges();
}
sel.addRange(_456);
}else{
if(b.selection){
t.bookmark.restoreSelection();
}
}
}
catch(ex){
}
}
return;
}
}};
}(),getKeyMoving:function(){
var dk=_4.keys;
return [dk.HOME,dk.UP_ARROW,dk.DOWN_ARROW,dk.LEFT_ARROW,dk.RIGHT_ARROW,dk.END,dk.PAGE_UP,dk.PAGE_DOWN,93];
},_c:{},onMouseDown:function(evt){
if(_4.isFF&&evt.which==3){
this.containerNode.focus();
}
if(_4.isIE&&_4.isIE!=9){
evt=_4.fixEvent(evt);
if(scayt.activateEditableBlockOnMouseClick||this.assocApp=="vasya"){
this.getParentEditBlock(evt.target).setActive();
}
}
},ignoreFormElement:false,onBeforeEvtIe:function(evt){
var t=this;
if(evt.keyCode==13){
t._cc=t.getParentEx();
if(t._cc.isScayt){
t._setContent(function(){
t.remove(t._cc.scayt);
t.s.item(t._cc.block,0).html=t._cc.block.innerHTML;
});
}
}
},onBeforeEvt:function(evt){
var t=this,sel;
t.ignoreFormElement=false;
t._focused=true;
t._currNode={};
evt=_4.fixEvent(evt);
if(_4.isIE){
var peb=this.getParentEditBlock(evt.target);
if(_4.isIE<9){
peb.setActive();
}
t._focused=true;
if(peb.nodeName=="INPUT"){
t.ignoreFormElement=true;
}
}else{
}
var _476=evt.keyCode||evt.charCode,_477=t.getKeyMoving();
if((evt.ctrlKey&&evt.keyCode!=86)||evt.altKey||(!_4.isMoz&&evt.shiftKey&&!evt.charCode)){
return;
}
if((!_4.IsMoz&&evt.altKey&&_476==18)||_4.indexOf(_477,evt.keyCode)!=-1||t.disabled||evt.keyCode==9){
return;
}
if(_4.isOpera){
sel=t.getRng();
if(!sel.isCollapsed){
sel.deleteContents();
}
}
t._c=t.getParentEx();
if(t._c.isIgnore||t.ignoreFormElement){
return;
}
if(!t.s.item(t.containerNode,1)){
if(_4.isIE){
var _478=function(){
var rng=t.getRng(),_47a=rng.duplicate();
_47a.moveToElementText(t.containerNode);
rng.expand("word");
rng.moveStart("word",-10);
if(rng.compareEndPoints("StartToStart",_47a)==-1){
rng.setEndPoint("StartToStart",_47a);
}
var _47b=[];
t.s.forEach(function(item,i){
if(item.isNextBlock!=true){
_47b.push(i);
}
});
while(_47b.length>0){
t.s.remove(_47b.pop());
}
if(t.nextNode.ready==true){
t.s.clear();
}
t.s.add(null,{full:1},rng,"");
};
if(_4.isIE<9){
_478();
}else{
setTimeout(function(){
_478();
},100);
}
}else{
t.s.add(t._c.block,{full:0});
}
if(evt.ctrlKey&&evt.keyCode==86){
t.nextNode.next(true);
}
}
if(0&&_4.isFF&&t._c.isScayt){
var rr=t.getRng(),rr2=rr.cloneRange();
sel=t.getSel();
rr2.setStart(t._c.scayt[0],0);
if(rr2.toString()==_4.attr(t._c.scayt[0],"data-scayt_word")){
rr2.selectNode(t._c.scayt[0]);
rr2.collapse(false);
sel.removeAllRanges();
sel.addRange(rr2);
return;
}
}
if((_4.isWebKit)&&(t.getSelectionNode())&&(t.getSelectionNode().nextSibling)&&t.nextSbl){
var _nd=t.getSelectionNode().nextSibling;
if(_nd.nodeName=="SPAN"&&_4.attr(_nd,"data-scayt_word")&&(t.getSelectionNode().nodeName!="SPAN")){
}
}
var _481=false;
var _482=true;
if(_4.isIE){
try{
var r=t.getRng();
if(!(r.parentElement().innerText)){
_482=false;
}else{
r.moveStart("character",-1);
r.collapse(true);
_481=t.getScaytNode(r.parentElement());
}
}
catch(e){
}
}
var span=t._c.scayt||_481;
if(_482&&t._c.isScayt){
t._setContent(function(){
t.remove(span);
t.s.item(t._c.block,0).html=(_4.isFF&&evt.keyCode==13)?null:t._c.block.innerHTML;
});
}
},onAfterEvt:function(evt){
evt=_4.fixEvent(evt);
var t=this,_487=evt.keyCode||evt.charCode,_488=t.getKeyMoving();
if(t.ignoreFormElement&&_4.isIE){
return;
}
if(_4.isIE&&t._c.block&&!t._c.block.innerHTML){
var ieB=t.getParentEx().block;
t.s.add(ieB,{full:0});
}
if(evt.type=="cut"||evt.type=="paste"||(evt.keyCode==86&&evt.ctrlKey)||(evt.shiftKey&&evt.keyCode==45)){
setTimeout(function(){
_4.query("script,link,style,meta",t.containerNode).forEach(_4.destroy);
},0);
t._cc=t.getParentEx();
if(t._cc.isScayt){
t._setContent(function(){
t.remove(t._cc.scayt);
t.s.item(t._cc.block,0).html=t._cc.block.innerHTML;
});
}
if(t._cc.isIgnore){
return;
}
if(!t.s.item(t.containerNode,1)){
if(evt.type=="paste"||(evt.keyCode==86&&evt.ctrlKey)||(evt.shiftKey&&evt.keyCode==45)){
t.s.clear();
if(!t.refreshTimeout){
t.refreshTimeout=setTimeout(function(){
t.refresh(null,true);
},1000);
}else{
clearTimeout(t.refreshTimeout);
t.refreshTimeout=setTimeout(function(){
t.refresh(null,true);
},1000);
}
}else{
t.s.add(t._cc.block,{full:0,correct:1});
}
}
}
if(evt.keyCode==17||evt.ctrlKey||evt.altKey||((_4.isIE||_4.Chrome)&&evt.shiftKey)){
return;
}
if((!_4.IsMoz&&evt.altKey&&_487==18)||_4.indexOf(_488,evt.keyCode)!=-1){
return;
}
if(evt.keyCode==13){
var sel=t.getRng(),_48b=new RegExp("^(?:"+t.block+")$","i"),node=t.getSelectionNode();
t.normalize();
while(node&&node!=_48b.test(node.nodeName)&&!node.previousSibling){
node=node.parentNode;
}
if(node&&node.nodeName!="BODY"){
_4.forEach([node,node.previousSibling],function(node){
if(node.nodeType==3||node.nodeName=="BR"){
return;
}
if(!t.s.item(t.containerNode,1)&&!t.s.item(node,0)){
t.s.add(node,{full:0});
}
});
}
}
if(evt.keyCode!=13&&(!t.is(t._c)||evt.keyCode==9||(t.is(t._c)&&t.is(t._c.block)&&t._c.block.innerHTML==t.s.item(t._c.block,0).html)||t._paused||t.disabled||t._c.isIgnore)){
return;
}
if(t._clearActiveTimer){
return;
}
if(t._clearActiveTimer1){
clearTimeout(t._clearActiveTimer1);
delete (t._clearActiveTimer1);
}
t._clearActiveTimer=setTimeout(function(){
if(t.disabled){
return;
}
t._clearActiveTimer1=setTimeout(function(){
if(t._clearActiveTimer1){
clearTimeout(t._clearActiveTimer1);
delete (t._clearActiveTimer1);
}
t._setActive=true;
t._m(null,3);
if(t.stackUnknowWord.length){
scayt.send({words:t.filterWords(t.stackUnknowWord),slang:t.sLang},null,t);
}
t.stackUnknowWord=[];
t._setActive=false;
},scayt.time);
try{
t._m(null,_4.isIE?1:0);
}
catch(e){
}
if(t._clearActiveTimer){
clearTimeout(t._clearActiveTimer);
delete (t._clearActiveTimer);
}
},scayt.time);
},stackUnknowWord:[],_setContent:function(func){
var t=this;
if(t._focused){
try{
if(0&&_4.isIE){
_4.withGlobal(t.window,"query",_4,["p:empty",t.containerNode]).forEach(function(node){
_4.destroy(node);
});
}
t.bookmark.toggleBookmark(t);
t._markup=true;
}
catch(ex){
}
}
func.apply(t,[]);
try{
t._innerHTML=t.containerNode.innerHTML;
}
catch(e){
}
if(t._markup){
t.bookmark.moveToBookmark(t);
t._markup=false;
}else{
}
},actionUserDictionary:function(_491,o){
var t=this;
if(_491=="addword"){
this._setContent(function(){
t.remove(t.query(o));
});
this.postToLogs(scayt,"scayt","add",this.sLang,o," ");
}
for(var k in scayt.dictionary){
var dic=scayt.dictionary[k];
if(dic.contains(o)){
dic.item(o).status=1;
}
}
if(_491=="delete"||_491=="restore"){
t.setLang(t.sLang,true);
}
},inFlight:false,call:function(o){
var t=this;
if(o.errorLang&&o.errorLang==t.sLang){
t.sLang=o.sLang;
}
if(o.sLang&&o.sLang!=t.sLang){
return;
}
if(typeof o.correct!="undefined"){
t.checkMisspellings(o.words.length,o.words.length-o.correct.length,scayt.minCheckIncorrectWordInQuery,scayt.maxPercentIncorrectWordInQuery);
}
_4.filter(o.words,function(word){
var hh;
if((hh=_4.indexOf(t.unknowWord,word))!=-1){
t.unknowWord.splice(hh,1);
return true;
}
return false;
});
_4.forEach(o.correct,function(word){
var hh;
if((hh=_4.indexOf(t.unknowWord,word))!=-1){
t.unknowWord.splice(hh,1);
}
});
t.markupWord=t.markupWord.concat(o.words);
if(!t.inFlight){
if(t.markupWord.length>0){
t.deffMarkup(true,true);
}else{
setTimeout(function(){
t.deffMarkup(true,true);
},300);
}
}
return;
},unknowWord:[],markupWord:[],onInputText:function(){
},sizeTextBig:function(){
},isTextSizeBig:false,checkMisspellings:function(all,_49d,_49e,_49f){
},isTooManyMisspellings:false,_m:function(_4a0,_4a1){
var t=this,dic=scayt.dictionary[t.sLang],_4a4=false,_4a5=false,_4a6=false,_4a7=false,_4a8=false,_4a9={},n=[],arr=[],trr,_4ad=[];
if(t.disabled||t._paused){
return;
}
t.sizeTextBig();
if(t.disabled){
return;
}
t.onInputText();
t.s.forEach(function(item,i){
var text="",r={},nr=Number(item.correct),arr=[],rem=[];
item.n={all:0,correct:0,incorrect:0};
if(item.word.length&&_4a0){
var _4b4=true;
_4.forEach(_4a0,function(word){
if(_4.indexOf(item.word,word)!=-1){
_4b4=false;
}
});
if(_4b4){
return;
}
}
_4.forEach(_4a0,function(word){
if(item.unknow[word]){
_4a5=true;
item.wrap[word]=item.unknow[word];
item.word.splice(_4.indexOf(item.word,word),1);
delete (item.unknow[word]);
}
});
arr=_4.clone(item.word);
_4.forEach(arr,function(word){
if(dic.contains(word)&&dic.item(word).status==1){
item.word.splice(_4.indexOf(item.word,word),1);
delete (item.unknow[word]);
}
});
if(item.node!=undefined&&item.node.nodeName.toUpperCase()!="BODY"){
if(_4a1!=3&&item.node.innerHTML==item.html&&(!_4.isIE||_4a1!=3)){
}
}
item.wrap={};
if(_4.isIE){
var _4b8=t.getRng(),par2=_4b8.parentElement(),bl2=t.getParentEx(_4b8.parentElement(),t.containerNode).blockList;
}
if(_4.isIE&&(par2==item.node||(bl2&&bl2[0]==item.node))&&_4a1==1){
_4b8.moveStart("word",-7);
_4b8.moveEnd("word",2);
text=_4b8.htmlText;
}else{
if(_4.isIE>=9){
text=item.range?item.range.text:t._textContent(item.node);
}else{
rangeText=item.range?item.range.toString?item.range.toString():item.range.text:t._textContent(item.node);
itemText=item.text;
if(itemText!=undefined){
text=rangeText.length>itemText.length?rangeText:itemText;
}else{
text=rangeText;
}
}
text=text.replace(/\u200B/g,"");
}
if(!item.full&&_4.isIE){
text=text.replace(/<(?:UL|OL)[^>]*>(((?!<\/?(?:UL|OL)[^>]*>).)*)<\/(?:UL|OL)>/gi,"<+> </+>");
}
text=t._process(text,"0-13");
text=t._clean(text,item.full||_4.isIE?"-":"+-");
while(t.regexp[18][0].exec(text)){
r={$1:RegExp.$1,$2:RegExp.$2,$3:RegExp.$3,$4:RegExp.$4,$5:RegExp.$5,leftContext:RegExp.leftContext,rightContext:RegExp.rightContext,lastMatch:RegExp.lastMatch};
text=r.leftContext+r.lastMatch.replace(/<[^>]+>/g,"")+r.rightContext;
for(var y=1;y<=5;y++){
if(!r["$"+y]){
continue;
}
_4a6=true;
rem.push(r["$"+y]);
}
}
text=" "+text+" ";
while(t.regexp[19][nr].exec(text)){
r={$1:RegExp.$1,$2:RegExp.$2,$3:RegExp.$3,$4:RegExp.$4,$5:RegExp.$5,leftContext:RegExp.leftContext};
var ttui=r.$3.match(/^([']*)?(.*)/),w1=ttui[2];
if(!w1){
continue;
}
var ttuy=w1.match(/([.'\-]*)?$/),_4bf=ttui[1]?String(ttui[1]).length:0,_4c0=ttuy[1]?String(ttuy[1]).length:0,w=_4c0?w1.slice(0,-_4c0):w1;
if(!w){
continue;
}
var ign=t.getProp(w),ig=t.isIgnore(ign),w2=r.$3;
item.n.all++;
if(r.$2&&/\d+/.test(r.$2)){
var sl=scayt.scaytList[r.$2];
if(typeof sl!="undefined"&&(w!=sl.word||sl.lang!=t.sLang)){
if(dic.contains(w)&&dic.item(w).status==0&&!ig){
item.n.incorrect++;
_4.withGlobal(t.window,"query",_4,["[data-scaytid="+r.$2+"]",item.node]).forEach(function(n){
if(t._getText(n)==w){
_4.attr(n,"data-scaytid",++scayt.i);
_4.attr(n,"data-scayt_word",w);
scayt.scaytList[scayt.i]=t.getProp(w);
}
});
if(item.wrap[w]){
item.wrap[w].amount++;
}else{
_4a5=true;
item.wrap[w]={amount:1,ig:ign,pos:[],ie:[],offs:[]};
}
if(item.wrap[w].ie&&_4.indexOf(item.wrap[w].ie,w2)==-1){
item.wrap[w].ie.push(w2);
item.wrap[w].offs.push({l:_4bf,r:_4c0});
}
continue;
}else{
_4a6=true;
rem.push(r.$2);
}
}else{
if(ig){
_4a6=true;
rem.push(r.$2);
}else{
}
}
}
if(_4a9[w]){
continue;
}
if(/^[\d\-.]+$/.test(w)||(new RegExp("^"+String.fromCharCode(8211)+"+$","")).test(w)||ig){
rem.push(w);
continue;
}
var _4c7=_4.isIE?0:_4bf+t._process(t._trimNl(r.leftContext+r.$1),[14]).length-1;
if(dic.contains(w)){
var _4c8=dic.item(w).status;
switch(_4c8){
case -1:
if(_4.indexOf(item.word,w)==-1){
item.word.push(w);
}
if(item.unknow[w]&&item.unknow[w].pos){
item.unknow[w].amount++;
item.unknow[w].pos.push(_4c7);
}else{
item.unknow[w]={amount:1,ig:ign,pos:[_4c7],ie:[],offs:[]};
}
if(item.unknow[w].ie&&_4.indexOf(item.unknow[w].ie,w2)==-1){
item.unknow[w].ie.push(w2);
item.unknow[w].offs.push({l:_4bf,r:_4c0});
}
break;
case 0:
item.n.incorrect++;
if(item.wrap[w]&&item.wrap[w].pos){
item.wrap[w].amount++;
item.wrap[w].pos.push(_4c7);
}else{
_4a5=true;
item.wrap[w]={amount:1,ig:ign,pos:[_4c7],ie:[],offs:[]};
}
if(item.wrap[w].ie&&_4.indexOf(item.wrap[w].ie,w2)==-1){
item.wrap[w].ie.push(w2);
item.wrap[w].offs.push({l:_4bf,r:_4c0});
}
break;
}
continue;
}
if(_4.indexOf(n,w)==-1){
if(/[^.]+\.+/.test(w)){
_4a5=true;
item.n.incorrect++;
item.wrap[w]={amount:1,ig:ign,pos:[_4c7],ie:[],offs:[]};
if(item.wrap[w].ie&&_4.indexOf(item.wrap[w].ie,w2)==-1){
item.wrap[w].ie.push(w2);
item.wrap[w].offs.push({l:_4bf,r:_4c0});
}
var gh=_4.indexOf(item.word,w);
if(gh!=-1){
item.word.splice(gh,1);
}
item.unknow[w]={};
delete (item.unknow[w]);
dic.add(w,{sugg:[w.replace(/(\.+)/g,". ")],status:0});
continue;
}else{
if(scayt._errorPaused){
continue;
}
if(_4.indexOf(t.unknowWord,w)==-1){
t.unknowWord.push(w);
}
n.push(w);
if(!scayt.off){
dic.add(w,{sugg:[],status:-1});
}
}
}
if(scayt._errorPaused){
continue;
}
if(_4.indexOf(item.word,w)==-1){
item.word.push(w);
}
if(item.unknow[w]&&item.unknow[w].pos){
item.unknow[w].amount++;
item.unknow[w].pos.push(_4c7);
}else{
item.unknow[w]={amount:1,ig:ign,pos:[_4c7],ie:[],offs:[]};
}
if(item.unknow[w].ie&&_4.indexOf(item.unknow[w].ie,w2)==-1){
item.unknow[w].ie.push(w2);
item.unknow[w].offs.push({l:_4bf,r:_4c0});
}
}
t.checkMisspellings(item.n.all,item.n.incorrect,scayt.minCheckIncorrectWord,scayt.maxPercentIncorrectWord);
if(t.window.document){
_4.forEach(rem,function(_4ca){
_4.withGlobal(t.window,"query",_4,["[data-scayt_word="+_4ca+"]",t.containerNode]).forEach(function(n){
item.remove.push(n);
});
});
}
});
if(!scayt.off&&!t._errorPaused){
if(n.length&&(n.length>scayt.minSendWords||t.alwaysSend)){
var _4cc="",_4cd="";
for(var k=0;k<n.length;k++){
if(!_4.isString(n[k])){
break;
}
_4cd=_4cd+(_4cd?",":"")+encodeURIComponent(n[k]);
if(_4cd.length<scayt["sizeRequest"+(_4.isIE?"IE":"")]){
_4cc=_4cc+(_4cc?",":"")+n[k];
}else{
arr.push(_4cc);
_4cc=n[k];
_4cd="";
}
}
arr.push(_4cc);
var str=arr[0];
if(t._serializeUnknowWord.length){
trr=t._serializeUnknowWord[t._serializeUnknowWord.length-1]+","+arr[arr.length-1];
if(trr.length<1200){
t._serializeUnknowWord[t._serializeUnknowWord.length-1]=trr;
arr.pop();
}
t._serializeUnknowWord=t._serializeUnknowWord.concat(arr);
}else{
t._serializeUnknowWord=arr;
}
t.sendSerializeWord(true);
}else{
if(n.length&&n.length<=scayt.minSendWords){
if(t._setActive){
_4a8=true;
if(t._serializeUnknowWord.length){
trr=t._serializeUnknowWord[t._serializeUnknowWord.length-1]+","+t.filterWords(n);
if(trr.length<1200){
t._serializeUnknowWord[t._serializeUnknowWord.length-1]=trr;
}else{
t._serializeUnknowWord.push(t.filterWords(n));
}
}else{
_4.forEach(n,function(word){
var num;
if((num=_4.indexOf(t.stackUnknowWord,word))!=-1){
t.stackUnknowWord.splice(num,1);
}
});
scayt.send({words:t.filterWords(n),slang:t.sLang},null,t);
}
}else{
if(t._serializeUnknowWord.length){
trr=t._serializeUnknowWord[t._serializeUnknowWord.length-1]+","+t.filterWords(n);
if(trr.length<1200){
t._serializeUnknowWord[t._serializeUnknowWord.length-1]=trr;
}else{
t._serializeUnknowWord.push(t.filterWords(n));
}
}else{
_4a7=true;
t.stackUnknowWord=t.stackUnknowWord.concat(n);
_4.forEach(n,function(word){
dic.remove(word);
});
}
}
}
}
}
arr=[];
t._setContent(function(){
t.s.forEach(function(item,i){
if(item.remove.length){
t.remove(item.remove);
item.remove=[];
}
if(_4a7){
_4.forEach(n,function(word){
if(item.unknow[word]){
item.word.splice(_4.indexOf(item.word,word),1);
delete (item.unknow[word]);
}
});
}
var _4d6=[],_4d7={},_4d8=false,g1=0;
for(var g in item.wrap){
if(g1<5000){
_4d7[g]=item.wrap[g];
delete (item.wrap[g]);
_4d8=true;
}else{
_4d6.push(g);
}
g1++;
}
if(_4d8){
try{
t.wrap(_4d7,item.node,item.full,false,item.range);
}
catch(e){
t.wrap(_4d7,item.node,item.full,true,item.range);
}
if(!_4d6.length){
item.wrap={};
if(t.finishCheck&&!t.inFlight){
if(t.onBlockComplete){
t.onBlockComplete();
}
t.finishCheck();
}
}else{
_4.forEach(_4d6,function(word){
if(_4.indexOf(t.markupWord,word)==-1){
t.markupWord.push(word);
}
});
if(!t.inFlight){
setTimeout(function(){
t.deffMarkup(true);
},2000);
}
}
}else{
if(t.finishCheck&&!t.inFlight){
if(t.onBlockComplete){
t.onBlockComplete();
}
t.finishCheck();
}
}
var bb=_4.isIE?_4a1:0;
if(item.full==0&&bb==1){
item.full=0;
item.correct=1;
item.html=item.node.innerHTML;
arr.push(item);
return;
}
if(_4a7||_4a8||(item.word.length||_4d6.length)){
if(item.node!=undefined){
item.html=item.node.innerHTML;
}
arr.push(item);
}
});
});
t.nextSbl=true;
if(!_4a7){
t.s._s=arr;
}
},_setActive:false,isIgnore:function(word){
var prop=_4.isString(word)?this.getProp(word):word;
for(var k in prop.attr){
if(this[k]&&prop.attr[k]){
return true;
}
}
return false;
},getProp:function(word){
var t=this,l=!(String(word).length==1),uc=word.toUpperCase(),lc=word.toLowerCase(),obj={word:word,lang:t.sLang,ignoreDictionary:scayt.ignoreDictionary.contains(word),attr:{}},tmp={allCaps:uc==word,mixedCase:(uc.slice(1)!=word.slice(1)&&lc.slice(1)!=word.slice(1)),mixedWithDigits:/\d+/.test(word),ignoreDomainNames:(/\.+/.test(word)||(new RegExp("^(?:"+t.domainNameList+")$")).test(word))};
for(var k in tmp){
obj.attr[k]=tmp[k]&&l?1:0;
}
return obj;
},wrap:function(_4e8,_4e9,full,_4eb,_4ec){
var t=this,rng=t.getRng(),_4ef=false,_4f0,par,x,_4f3;
function _4f4(node,word){
_4.attr(node,"data-scaytid",++scayt.i);
_4.attr(node,"data-scayt_word",word);
if(_4.isIE){
_4.addClass(node,"scayt-misspell");
}
};
if(_4.isIE){
if(t.document.body.setActive){
if(_4eb){
t.document.body.setActive();
}
}
for(x in _4e8){
_4f0=rng.duplicate();
try{
if(_4ec){
_4f0=_4ec.duplicate();
}else{
_4f0.moveToElementText(_4e9);
}
}
catch(e){
_4f0=t.document.body.createTextRange();
}
var _4f7=t.document.getElementById("scayt_bookmark");
var rc1=null,rc2=null,_4fa="",_4fb="",_4fc=null;
if(_4f7&&_4f0.htmlText.indexOf("scayt_bookmark")!=-1){
var _4fd=_4f0.duplicate();
_4fd.moveToElementText(_4f7);
rc1=_4fd.duplicate();
rc2=_4fd.duplicate();
rc1.collapse(true);
rc1.moveStart("word",-1);
_4fa=rc1.text;
rc2.collapse(false);
rc2.moveEnd("word",1);
if(rc2.text.indexOf(" ")!=-1){
rc2.moveEnd("character",-1);
}
_4fb=rc2.text;
_4fc=_4fa+_4fb;
}
var rd=_4f0.duplicate();
for(var j=0;j<_4e8[x].ie.length;j++){
var xx=_4e8[x].ie[j],offs=_4e8[x].offs[j];
if(_4fa!=""&&_4fb!=""){
if(_4e8[x].ie[j]==_4fc){
var _4fd=_4f0.duplicate();
_4fd.setEndPoint("StartToStart",rc1);
_4fd.setEndPoint("EndToEnd",rc2);
var html=rc1.text+"<span id=\"scayt_bookmark\" style=\"display:none;\">&nbsp;</span>"+rc2.text;
_4fd.pasteHTML("<span class=\"scayt-misspell\" data-scaytid=\""+(scayt.i++)+"\" data-scayt_word=\""+x+"\">"+html+"</span>");
}
}
for(var i=0;_4f0.findText(xx,1000000,2)&&_4f0.compareEndPoints("StartToStart",rd)>-1&&_4f0.compareEndPoints("EndToEnd",rd)<1;i++){
_4f0.moveStart("character",offs.l);
_4f0.moveEnd("character",-offs.r);
var rss=_4f0.duplicate();
rss.moveEnd("character",1);
var _505=String(rss.text).charAt(String(rss.text).length-1);
var tx=rss.text;
rss.expand("word");
var rss1=rss.duplicate();
rss1.moveEnd("word",1);
if(/[.-]/.test(_505)&&!(rss.text!=tx)&&rss.text!=rss1.text.replace(/\r\n\s+/g,"")){
_4f0.collapse(false);
continue;
}
rss=_4f0.duplicate();
rss.moveStart("character",-2);
var _508=String(rss.text).charAt(0);
var _509=String(rss.text).charAt(1);
tx=rss.text;
rss.expand("word");
if(/[.-]/.test(_509)&&(!(rss.text!=tx)||!/[.-]/.test(_508))){
_4f0.collapse(false);
continue;
}
if(_4f0.text!=x||/.*<(SUP|SUB)>/.test(_4f0.htmlText)||/<\/?(SUP|SUB)>.*/.test(_4f0.htmlText)){
_4f0.collapse(false);
continue;
}
if(_4ec){
par=t.getParentEx(_4f0.parentElement(),_4ec.parentElement());
}else{
par=t.getParentEx(_4f0.parentElement(),_4e9);
}
if(full==1){
par.block=null;
}else{
par.block=_4e9!=par.block?par.block:null;
}
var ig=par.block||par.scayt[0];
if(ig){
_4f0.moveToElementText(ig);
_4f0.collapse(false);
continue;
}else{
var sp=_4.clone(t.span);
_4f4(sp,x);
scayt.scaytList[scayt.i]=_4e8[x].ig;
var html=_4f0.htmlText.replace(/\r\n/g,""),r=_4f0.duplicate(),rp=r.parentElement(),rw=_4f0.htmlText.replace(/<[^A].*>/gi,"");
if(!_4ef){
t._onBeforeMark();
_4ef=true;
}
if(rp.nodeName=="P"&&r.htmlText.replace(/\r\n/g,"").toLowerCase()==rp.outerHTML.toLowerCase()){
sp.innerHTML=rp.innerHTML;
rp.appendChild(sp);
_4f0.text="";
_4f0.moveToElementText(sp);
}else{
if(/<\/A>((<[^>]*>)*)?$/gi.test(_4f0.htmlText)&&/^((<[^>]*>)*)?<A/gi.test(_4f0.htmlText)){
_4f3=String(_4f0.text).length;
while(rp.nodeName!="A"&&rp.nodeName!="BODY"){
rp=rp.parentNode;
}
try{
sp.innerHTML=_4f0.htmlText.match(/<A[^>]*>(.*)<\/A>/i)[1];
}
catch(e){
sp.innerHTML=_4f0.htmlText;
}
_4f0.text="";
if(rp.firstChild){
_4.withGlobal(t.window,"place",_4,[sp,rp.firstChild,"before"]);
}else{
rp.appendChild(sp);
}
_4f0.moveToElementText(sp);
_4f0.collapse(false);
_4f0.moveEnd("character",_4f3);
}else{
r.collapse(true);
var rl;
rl=r.parentElement();
sp.innerHTML=html;
var _510=new RegExp("^(?:"+t.block+")$","i");
if(!(_510.test(rl.nodeName))&&rl!=rp){
while(!(_510.test(rl.nodeName))&&rl!=t.containerNode&&rl.parentNode.lastChild==rl){
rl=rl.parentNode;
}
_4f0.text="";
_4.withGlobal(t.window,"place",_4,[sp,rl,"after"]);
_4f0.moveToElementText(sp);
_4f0.collapse(false);
}else{
var div=_4.create("div",{innerHTML:html});
while(div.childNodes.length==1&&div.firstChild.nodeType!=3){
div=div.firstChild;
}
html=div.innerHTML;
_4f0.pasteHTML("<span class=\"scayt-misspell\" data-scaytid=\""+(scayt.i++)+"\" data-scayt_word=\""+x+"\">"+html+"</span>");
}
}
}
}
_4f0.collapse(false);
}
}
}
}else{
for(x in _4e8){
var pos=_4e8[x].pos,span=_4.clone(t.span),_514=t.getProp(x);
_4f3=String(x).length;
_4.forEach(pos,function(pos){
var _516=[];
var _517=0;
if(_4ec){
var _518=_4ec.startContainer.childNodes[_4ec.startOffset]||_4ec.startContainer;
var sp=_4.clone(span),sd=t._getPos(pos,pos+_4f3,_518,false);
}else{
var sp=_4.clone(span),sd=t._getPos(pos,pos+_4f3,_4e9,true);
}
if(!sd){
return;
}
_4f0=_4ec?_4ec.cloneRange():rng.cloneRange();
_4f4(sp,x);
scayt.scaytList[scayt.i]=_4e8[x].ig;
var sn,en;
if(!sd.startNode||!sd.endNode){
return;
}
if((sn=sd.startNode.parentNode)!=(en=sd.endNode.parentNode)){
var par=_5.range.getCommonAncestor(sd.startNode.parentNode,sd.endNode.parentNode);
var node=sd.startNode;
if(sd.startOffset===0){
while(node!=par&&node.nodeName!="A"&&node.parentNode.firstChild==node){
node=node.parentNode;
}
}
sd.startNode=node;
node=sd.endNode;
if(node.length==sd.endOffset){
while(node.parentNode!=par&&node.nodeName!="A"&&node.parentNode.lastChild==node){
node=node.parentNode;
}
sd.endAfterNode=node;
}
}
par=t.getParentEx(sd.startNode,_4e9);
if(par.isScayt){
return;
}
try{
_4f0.setStart(sd.startNode,sd.startOffset);
_4f0.setEnd(sd.endNode,sd.endOffset);
if(sd.endAfterNode){
_4f0.setEndAfter(sd.endAfterNode);
}
if(_4f0.toString()!=x){
return;
}
if(!_4ef){
t._onBeforeMark();
_4ef=true;
}
sp.appendChild(_4f0.extractContents());
_4f0.insertNode(sp);
}
catch(e){
}
});
}
}
t.normalize();
if(_4ef){
t._onMark();
}
},remove:function(node,_520,_521){
if(!arguments.length){
return;
}
if(!_4.isArray(node)){
node=[node];
}
if(this.window.closed){
return;
}
var t=this,rng=t.getRng(),_524,_525,_526=[];
if(!_521){
t._onBeforeUnMark();
}
if(node.length<500){
_4.forEach(node,function(node){
if(_4.isIE){
_524=t.document.createDocumentFragment();
for(var i=0;i<node.childNodes.length;i++){
_524.appendChild(_4.clone(node.childNodes[i]));
}
if(_524.firstChild&&_524.firstChild.nodeType!=3){
_526.push(_524.firstChild);
}
if(_524.firstChild&&_524.lastChild.nodeType!=3&&_524.lastChild!=_524.firstChild){
_526.push(_524.lastChild);
}
if(node.parentNode){
node.parentNode.replaceChild(_524,node);
}
}else{
_525=rng.cloneRange();
try{
_525.selectNode(node);
_524=_525.createContextualFragment(node.innerHTML);
if(_524.firstChild&&_524.firstChild.nodeType!=3){
_526.push(_524.firstChild);
}
if(_524.firstChild&&_524.lastChild.nodeType!=3&&_524.lastChild!=_524.firstChild){
_526.push(_524.lastChild);
}
_525.deleteContents();
_525.insertNode(_524);
}
catch(ex){
}
}
for(var i=0;i<t.afterMarkupRemove.length;i++){
for(var j=0;j<_526.length;j++){
t.afterMarkupRemove[i](_526[j]);
}
}
});
}else{
if(_520==undefined){
var _52a=t.containerNode;
}else{
var _52a=_520;
}
var temp=_52a.innerHTML;
var str="";
if(_4.isIE){
var _52d="<SPAN class=scayt-";
var _52e="</SPAN>";
var _52f="<SPAN";
}else{
var _52d="<span data-scayt";
var _52e="</span>";
var _52f="<span";
}
var last=0;
var t1=0,t2=0;
var _533;
var _534=0;
var _535=temp.indexOf(_52d,_534);
function _536(){
var _537=temp.indexOf(_52f,_534);
var _538=0;
if(_537!=-1){
while(_537<_535&&_537!=-1){
_538++;
_537=temp.indexOf(_52f,_537+_52f.length);
}
}
return _538;
};
_524=t.document.createElement("div");
while(_535>=0){
t1=0;
t2=0;
str+=temp.substring(_534,_535);
_534=temp.indexOf(">",(_535+_52d.length))+1;
t1=_534;
_535=temp.indexOf(_52e,_534);
last=0;
_533=_535;
do{
last=_536();
_535=_533;
for(var i=0;i<_536();i++){
_535=temp.indexOf(_52e,_535+_52e.length);
}
}while(last!=_536());
t2=_535-1;
if(temp[t2]==">"||temp[t1]=="<"){
_524.innerHTML=temp.substring(t1,t2+1);
if(_524.firstChild&&_524.firstChild.nodeType!=3){
_524.firstChild.setAttribute("data-temp","true");
}
if(_524.firstChild&&_524.lastChild.nodeType!=3&&_524.lastChild!=_524.firstChild){
_524.lastChild.setAttribute("data-temp","true");
}
str+=_524.innerHTML;
}else{
str+=temp.substring(_534,_535);
}
_534=_535+_52e.length;
_535=temp.indexOf(_52d,_534);
}
str+=temp.substring(_534);
if(_4.isIE){
_524=t.document.createDocumentFragment(str);
var div=t.document.createElement("div");
_524.appendChild(div);
div.outerHTML=str;
}else{
_525=rng.cloneRange();
try{
_525.selectNode(t.containerNode);
_524=_525.createContextualFragment(str);
}
catch(ex){
}
}
while(_52a.firstChild){
_52a.removeChild(_52a.firstChild);
}
_52a.appendChild(_524);
_526=_4.query("*[data-temp]",_52a);
for(var i=0;i<t.afterMarkupRemove.length;i++){
for(var j=0;j<_526.length;j++){
_526[j].removeAttribute("data-temp");
t.afterMarkupRemove[i](_526[j]);
}
}
}
t.normalize();
if(!_521){
t._onUnMark();
}
},_onBeforeUnMark:function(){
this._onBeforeChange();
this.onBeforeUnMark();
},_onBeforeMark:function(){
this._onBeforeChange();
this.onBeforeMark();
},_onBeforeChange:function(){
this.onBeforeChange();
},_onBeforeReplace:function(node,word){
this.onBeforeReplace();
},onBeforeUnMark:function(){
},onBeforeMark:function(){
},onBeforeChange:function(){
},onBeforeReplace:function(node,word){
},_onUnMark:function(){
this._onChange();
this.onUnMark();
},_onMark:function(){
this._onChange();
this.onMark();
},_onChange:function(){
this.onChange();
},onUnMark:function(){
},onMark:function(){
},onChange:function(){
},_onReplace:function(_540,word){
this.onReplace();
this._onChange();
},onReplace:function(_542,word){
},_onIgnore:function(node){
this.onIgnore();
this._onFocus();
this._onChange();
this._onBeforeChange();
},_onIgnoreAll:function(word){
this.onIgnoreAll();
this._onFocus();
this._onChange();
this._onBeforeChange();
},onIgnore:function(node){
},onIgnoreAll:function(word){
},_onSetDisabled:function(_548){
this.onSetDisabled(_548);
},onSetDisabled:function(_549){
},_onLangChange:function(lang){
this.onLangChange(lang);
},onLangChange:function(lang){
},_onOptionChange:function(_54c,_54d){
this.onOptionChange(_54c,_54d);
},onOptionChange:function(_54e,_54f){
},_onSizeTextBig:function(){
this.onSizeTextBig();
},_onSizeTextNormal:function(){
this.onSizeTextNormal();
},onSizeTextBig:function(){
},_onTooManyMisspellings:function(){
this.onTooManyMisspellings();
},_onNormalMisspellings:function(){
this.onNormalMisspellings();
},onNormalMisspellings:function(){
},onTooManyMisspellings:function(){
},onSizeTextNormal:function(){
},onBeforeStateChange:function(_550){
},onStateChange:function(_551){
},stateChange:function(_552){
var t=this,_554=t.state;
if(_554==_552){
return;
}
t.state=_552;
if(_552=t.onBeforeStateChange(_552)){
t.state=_552;
}
if(_554==t.state){
return;
}
if(t.state==scayt.STATE_DISABLED){
t.setDisabled(true);
}
if(t.state==scayt.STATE_ENABLED){
t.setDisabled(false);
}
if(_554!=t.state){
t.onStateChange(t.state);
}
},replace:function(node,word){
var t=this;
if(t._paused){
return;
}
if(!arguments.length){
return null;
}
if(!_4.isArray(node)){
node=new _4.NodeList(node);
}
var _558=t.getWord(node[0]);
var _559=word.length;
var b=(new RegExp(". ","g")).test(word);
var _55b=word;
word=this.document.createTextNode(word);
var _55c=[];
t._onBeforeReplace(node,word);
node.forEach(function(node){
if(b){
var _55e=t.getParentEx(node).block;
if(t.s.contains(_55e)==-1){
t.s.add(_55e,{full:0});
}
}
var w=_4.clone(word);
_55c.push(w);
_4.withGlobal(t.window,"place",_4,[w,node,"after"]);
_4.withGlobal(t.window,"_destroyElement",_4,[node]);
});
if(!_4.isIE){
var sel=t.getSel(),_561=t.getRng();
_561.setStart(_55c[0],_559);
_561.collapse(true);
if(!_4.isOpera){
sel.removeAllRanges();
}
sel.addRange(_561);
t.domNode.focus();
}else{
var _561=t.getRng();
t.containerNode.setActive();
if(this.iframe&&!/^cke_/.test(this.iframe.className)&&_4.isIE==9){
_561.moveEnd("character",_559);
}else{
_561.move("character",_559);
_561.select();
}
}
if(b){
t._m();
}
t._onReplace(_558,word);
if(_55b){
this.postToLogs(scayt,"scayt","replaceWord",this.sLang,_558,_55b);
}
},getSel:function(){
return _4.isIE||!this.window.getSelection?this.document.selection:this.window.getSelection();
},getRng:function(){
var t=this,_563,sel=t.getSel();
try{
if(sel){
_563=sel.rangeCount>0?sel.getRangeAt(0):(sel.createRange?sel.createRange():t.document.createRange());
}
}
catch(ex){
}
if(!_563||(_4.isIE&&typeof _563.text=="undefined")){
if(_4.isIE){
try{
_563=t.containerNode.createTextRange();
}
catch(e){
_563=t.document.body.createTextRange();
}
}else{
_563=t.document.createRange();
}
}
return _563;
},getParentElement:function(){
var _565=_4.global.getSelection();
if(_565){
var node=_565.anchorNode;
while(node&&(node.nodeType!=1)){
node=node.parentNode;
}
return node;
}
},getParent:function(node,_568,attr,root){
var t=this;
root=root||this.containerNode;
_568=_568?new RegExp("^(?:"+_568+")$"):null;
while(node&&node!=root){
if(_568&&_568.test(node.nodeName.toUpperCase())){
return node;
}
if(attr){
for(var k in attr){
if(_4.attr(node,k)!==null&&attr[k]===null){
return node;
}
if((attr[k]!==null&&_4.attr(node,k)!==null&&!(_4.attr(node,k)===false))?!attr[k]:attr[k]){
return node;
}
}
}
node=node.parentNode;
}
return false;
},getSelectionNode:function(){
var node;
try{
if(_4.isIE){
var rng=this.getRng();
if(this.iframe){
rng.move("character",-1);
}
if(rng.parentElement){
node=rng.parentElement();
}else{
node=null;
}
}else{
node=this.getSel().anchorNode;
}
}
catch(e){
node=null;
}
return node;
},getParentEx:function(node,root){
var t=this,o={isBlock:false,block:null,blockList:[],isIgnore:false,ignore:[],isScayt:false,scayt:[]},_573="",_574=new RegExp("^(?:"+t.block+")$","i"),form=new RegExp("^(?:"+t.form+")$","i");
root=root||t.containerNode;
node=node||t.getSelectionNode();
while(node&&node!=root){
_573=node.nodeName.toUpperCase();
if(_573=="SPAN"&&_4.attr(node,"data-scayt_word")){
o.scayt.push(node);
o.isScayt=true;
}
if(_573.toUpperCase()=="STYLE"||form.test(_573)||_4.attr(node,"scayt")=="false"||_4.attr(node,"widgetId")){
o.ignore.push(node);
o.isIgnore=true;
}else{
if(_574.test(_573)){
o.blockList.push(node);
o.isBlock=true;
}
}
node=node.parentNode;
}
o.blockList.push(root);
o.block=o.blockList[0];
return o;
},getParentEditBlock:function(node,root){
var t=this,_579="";
root=root||t.containerNode;
node=node||t.getSelectionNode();
while(node&&node!=root){
_579=node.nodeName.toUpperCase();
if(_4.style(node,"zoom")!="normal"||_4.style(node,"position")=="absolute"||node.nodeName=="INPUT"||node.nodeName=="TEXTAREA"){
return node;
}
node=node.parentNode;
}
return node;
},_getPos:function(sp,ep,root,_57d){
var t=this,nv,nvl,p=0,n,d={},r=root||t.containerNode,w=t.document.createTreeWalker(r,NodeFilter.SHOW_TEXT,function(node){
node=node.parentNode?node.parentNode:node;
return node.nodeName.match(t.nextNode.ignoreElementsRegex)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT;
},false),_587=false;
if(_57d){
while(n=w.nextNode()){
nv=n.nodeValue||"";
nvl=t._trimNl(nv).length;
_587=n.nodeType===3&&nv.charCodeAt(0)===8203&&nv.length>1;
if(nv.charCodeAt(0)!==8203||n.parentNode.id==="scayt_bookmark"||_587){
p+=nvl-(_587?1:0);
}
if(p>sp&&!d.startNode){
d.startNode=n;
d.startOffset=sp-(p-nvl);
}
if(p>=ep){
d.endNode=n;
d.endOffset=ep-(p-nvl);
return d;
}
}
}else{
n=root;
var end=false;
var _589=false;
function _58a(n){
var node=n;
node=node.firstChild;
while(node&&!end){
if(node==root){
_589=true;
p=0;
nvl=0;
}
if(!node.nodeName.match(t.nextNode.ignoreElementsRegex)){
if(node.nodeType==3&&_589){
nv=node.textContent||"";
nvl=t._trimNl(nv).length;
if(nv.charCodeAt(0)!==8203||node.parentNode.id==="scayt_bookmark"){
p+=nvl;
}
if(p>sp&&!d.startNode){
d.startNode=node;
d.startOffset=sp-(p-nvl);
}
if(p>=ep){
d.endNode=node;
d.endOffset=ep-(p-nvl);
end=true;
return d;
}
}else{
if(node.nodeType==1){
if(node.nodeName.match(t.nextNode.blockElementsRegex)&&p!=0){
p+=1;
}
arguments.callee.call(this,node);
}
}
}
if(node.nodeName.match(t.nextNode.blockElementsRegex)){
p+=1;
}
node=node.nextSibling;
}
};
_58a(t.containerNode);
return d;
}
return null;
},_trimNl:function(str){
return (_4.isOpera||_4.isIE)?str:str.replace(/\r\n/g," ");
},_getText:function(node){
return String(_4.isIE?node.nodeType==3?node.nodeValue:node.innerText:node.textContent).replace(/[<>]/g," ");
},_getHtml:function(node){
return String(node.nodeType==3?String(_4.isIE?node.nodeValue:node.textContent).replace(/[<>]/g," "):node.innerHTML);
},_inline:"BR|IMG|HR|INPUT",_textContent:function(node,o){
var t=this,_593=new RegExp("^(?:"+t.block+")$","i"),_594=new RegExp("^(?:"+t.form+")$","i"),_595=new RegExp("^(?:"+t._inline+")$","i"),text="",cn,sp=0,str="";
if(!node.nodeName.match(t.nextNode.ignoreElementsRegex)){
for(var i=0;i<node.childNodes.length;i++){
cn=node.childNodes[i];
if(!cn.nodeName.match(t.nextNode.ignoreElementsRegex)){
if(_594.test(cn.nodeName)){
str+="<->"+(_4.isIE?"":t._trimNl(t._getText(cn)).replace(/./gi," "))+"</->";
}else{
if(_593.test(cn.nodeName)){
str+="<+>"+(_4.isIE?"":t._trimNl(t._getText(cn)).replace(/./gi," "))+"</+>";
}else{
if(_595.test(cn.nodeName)){
str+="<>";
}else{
if(cn.nodeName=="SPAN"&&(sp=_4.attr(cn,"data-scaytid"))){
str+="<"+sp+">"+t._trimNl(t._getHtml(cn))+"</>";
}else{
str+=t._trimNl(t._getHtml(cn));
}
}
}
}
}
}
}
return str;
},regexp:[],separator:"\\s!\"#$&%()*+,/`~:;=?[]^{|} "+(function(){
var arr=["8212","8364","0167","0169","0171","0174","0177","0182","0183","0184","0187","0191","0215","0247","0164","FFFD","2013","201d","201e","201c","00a0","3000","3001","3002","3003"];
var s="";
for(var i=0;i<arr.length;i++){
s+=String.fromCharCode(arr[i]);
}
return s;
})(),_getRegExp:function(str){
var t=this,re="",sep=t.separator;
for(var i=0;i<sep.length;i++){
re+=(sep.charAt(i)!="-"?"\\":"")+sep.charAt(i);
}
return [[/&[^;]+;/g," "],[/<(IMG|BR|HR|INPUT)[^>]*>/gi,"<>"],[/<SPAN[^>]*data-scaytid=[\'"]{0,1}(\d+)[\'"]{0,1}[^>]*>/gi,"<$1>"],[/<(\/?)SPAN[^>]*>/gi,"<$1=>"],[new RegExp("<(/?)(?:"+t.form+")[^>]*>","gi"),"<$1->"],[new RegExp("<(/?)(?:"+t.block+")[^>]*>","gi"),"<$1+>"],[new RegExp("</?(?!(?:[+-=]|\\d+))[^>]+>","gi"),""],[[/<(\d+)>(((?!<\/?=>).)*)<\/=>/gi,"<$1>$2</>"],[/<=>(((?!<\/?=>).)*)<\/=>/gi,"$1"]],[new RegExp("(?!/)["+re+"](?!>)","gi")," "],[/[ ]\//g,"  "],[],[],[],[],[/<[^>]*>/gi,""],[/(?:<(\d+|=)>|<\/=?>)/gi,""],[/<[^>]*>/gi," "],[/[ ]+/g," "],[new RegExp("(?:[^ <>.']<(\\d*)>[^<]*</>|<(\\d*)>[^<]*</>[^ <>.']|<(\\d*)>[^<]*</><(\\d*)>[^<]*</>|<(\\d*)>[^<]*<>[^<]*</>)","gi")],[new RegExp("(?:([ ])|<([^>\\d]*)>)([^<> ]+)(?=(?:([ ])|<([^>\\d]*)>))","g"),new RegExp("(?:([ ])|<([^>]*)>)([^<> ]+)(?=(?:([ ])|<([^>]*)>))","g")]];
},_process:function(str,arr){
var t=this,str1="";
str=t.is(str)?str:t.containerNode;
if(!_4.isString(str)){
str=str.innerHTML;
}
if(_4.isString(arr)){
var tmp=arr.split("-");
arr=[];
for(var i=tmp[0];i<=tmp[1];i++){
arr.push(i*1);
}
}
function _5a9(r,str){
_4.forEach(r,function(k){
str=str.replace(k[0],k[1]);
});
return str;
};
_4.forEach(arr,function(item,j){
if(_4.isArray(t.regexp[item][0])){
var i=0,k=0,text=str,r={},bb=false;
str="";
var str1=text;
while((new RegExp("(<([\\d]+)>|<(/?)=>)","g")).exec(text)){
bb=true;
r={$1:RegExp.$1,$2:RegExp.$2,$3:RegExp.$3,$4:RegExp.$4,$5:RegExp.$5,leftContext:RegExp.leftContext,rightContext:RegExp.rightContext};
if(r.$2){
str+=r.leftContext+"<"+r.$2+">";
k++;
}else{
if(k){
if(r.$3){
if(!i){
str+=r.leftContext+"</>";
k--;
}else{
str+=r.leftContext;
i--;
}
}else{
str+=r.leftContext;
i++;
}
}else{
str+=r.leftContext;
}
}
text=r.rightContext;
}
str+=bb?r.rightContext:str1;
str=str.replace(/([^<])\//g,"$1 ");
}else{
str=_5a9([t.regexp[item]],str);
}
});
return str;
},s:function(b){
var t=this;
return {_s:[],count:0,contains:function(node,_5b8,full){
var b=-1,tmp=false;
full=full||0;
_4.forEach(this._s,function(item,i){
if(item.range==_5b8&&item.full==full&&item.node==node){
b=i;
}
});
return b;
},add:function(node,o,_5c0,text,_5c2){
o=o||{};
_5c0=_5c0||null;
if(this.contains(node,_5c0,o.full)==-1){
this.count++;
return this._s.push(_4.mixin({node:node,correct:1,full:1,html:null,s:null,wrap:{},unknow:{},remove:[],word:[],n:{},range:_5c0,text:text,isNextBlock:_5c2},o));
}
return false;
},clear:function(){
this._s=[];
this.count=0;
},getAttr:function(o){
if(!_4.isObject(o)){
throw ("incorrect arguments");
}
return _4.filter(this._s,function(item,i){
for(var k in o){
if(item[k]===null||Boolean(o[k])!=Boolean(item[k])){
return false;
}
}
return true;
});
},forEach:function(_5c7,_5c8,o){
_4.forEach((o?this.getAttr(o):this._s),_5c7,_5c8);
},item:function(_5ca,full){
if(typeof _5ca!="number"){
_5ca=this.contains(_5ca,full);
}
if(_5ca==-1){
return false;
}
return this._s[_5ca];
},remove:function(_5cc,full){
if(typeof _5cc!="number"){
_5cc=this.contains(_5cc,full);
}
if(_5cc==-1){
return false;
}
this._s.splice(_5cc,1);
this.count--;
}};
},_clean:function(str,c){
var text="",tag1,tag2,s=str,_5d4="",_5d5="",_5d6=new RegExp("(</?["+c+"]>)(((?!</?["+c+"]>).)*)(</?["+c+"]>)","gi"),r,i=0,_5d9,_5da;
c=c||"+-";
while(_5d6.exec(str)){
tag1=String(RegExp.$1);
_5d9=String(RegExp.$2);
tag2=String(RegExp.$4);
_5d4=RegExp.leftContext;
_5d5=RegExp.rightContext;
if(tag1.length==3){
i++;
}else{
i--;
}
if(i==1&&tag2.length==4){
str=_5d5;
i--;
_5da=tag2;
}else{
str=tag2+_5d5;
_5da="";
}
_5d6.lastIndex=0;
text+=_5d4+tag1+_5d9.replace(/<[^>]*>/gi,"").replace(/./gi," ")+_5da;
}
text+=_5d5;
return text||s;
},is:function(o,t){
var n=typeof (o);
if(!t){
return n!="undefined";
}
if(t=="array"&&(o instanceof Array)){
return true;
}
return n==t;
},query:function(word){
if(_4.isString(word)){
word=[word];
}
if(!word){
word="*";
}
var t=this,nl=new _4.NodeList();
_4.forEach(word,function(word){
_4.withGlobal(t.window,"query",_4,["[data-scayt_word"+(word=="*"?"":"=\""+word+"\"")+"]",t.containerNode]).forEach(function(item){
nl.push(item);
});
});
return nl;
},_serializeOptions:function(){
var str="";
for(var x in this._optionNames){
str+=String(this[x]*1);
}
return str;
},destroy:function(){
_4.publish(this.id+":startScaytInstanceDestroing",[this.id]);
this.destroyCalled=true;
this.uninitialize();
this.oldIdValue?this.srcNodeRef.setAttribute("id",this.oldIdValue):this.srcNodeRef.removeAttribute("id");
_4.forEach(this._connects,function(_5e5){
_4.forEach(_5e5,_4.disconnect);
});
if(this.iframe){
scayt.cssStyleNode.remove(this.document);
}else{
scayt.cssStyleNode.remove(this.srcNodeRef);
}
_4.forEach(this._supportingWidgets||[],function(w){
if(w.destroy){
w.destroy();
}
});
this.destroyRendering(true);
_5.registry.remove(this.id);
},destroyRecursive:function(_5e7){
},uninitialize:function(_5e8){
this.setDisabled(true);
var html=this.document.getElementsByTagName("html")[0],_5ea=document.getElementsByTagName("html")[0];
if(this.srcNodeRef.nodeName=="IFRAME"){
(this.defaultSpellcheck==null||this.defaultSpellcheck=="undefined")?_4.removeAttr(html,"spellcheck"):_4.attr(html,{"spellcheck":this.defaultSpellcheck});
}
if(scayt._hash.length==1){
(scayt.defaultSpellcheck==null||scayt.defaultSpellcheck=="undefined")?_4.removeAttr(_5ea,"spellcheck"):_4.attr(_5ea,{"spellcheck":scayt.defaultSpellcheck});
}
_4.removeClass(this.containerNode,"scayt-disabled");
_4.removeClass(this.containerNode,"scayt-enabled");
var num;
if((num=_4.indexOf(scayt._hash,this))!=-1){
scayt._hash.splice(num,1);
}
},postToLogs:function(obj,_5ed,_5ee,_5ef,_5f0,_5f1,_5f2,_5f3,_url){
var _5f5={cmd:"log",type:_5ed?_5ed:"undefined",v:obj.versionProtocol?obj.versionProtocol:"none",format:"json",verLang:obj.verLang?obj.verLang:"none",customerid:obj.customerid?obj.customerid:"none",sid:obj.sessionId?obj.sessionId:"none",option1:_5f2?_5f2:"none",option2:_5f3?_5f3:"none",action:_5ee?_5ee:"none",slang:_5ef,incoming_word:_5f0?_5f0:"none",result:_5f1?_5f1:"none"};
var _req={callbackParamName:"c",timeout:obj.timeout?obj.timeout:30000,url:obj.scaytURL?obj.scaytURL:_url,content:_5f5,handleAs:"jsonp",frameDoc:"",handle:function(_5f7,_5f8){
}};
var td=_4.io.script.get(_req);
}});
_4.mixin(scayt,{STATE_DISABLED:0,STATE_ENABLED:1,STATE_OFFLINE:2,STATE_BIG_TEXT:3,maxSizeMarkup:6000,persist:true,off:false,time:3000,minTime:3000,minCheckIncorrectWord:10,maxPercentIncorrectWord:1,minCheckIncorrectWordInQuery:60,maxPercentIncorrectWordInQuery:0.8,sizeRequest:4200,sizeRequestIE:1200,disabled:false,i:0,dictionary:{},ignoreDictionary:new _6.collections.Dictionary(),dynamicStyleMap:{},defaultLang:"en_US",_defaultLang:"en_US",verLang:0,timeout:30000,manager:500,langURL:_4.moduleUrl("scaytURL","script/ssrv.cgi?cmd=get_lang_list&callback=scayt.opt").toString(),langList:[],scaytURL:_4.moduleUrl("scaytURL","script/ssrv.cgi").toString(),imageDataURL:"data:image/gif;base64,R0lGODlhBAADAIABAPAAAP///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjEgNjQuMTQwOTQ5LCAyMDEwLzEyLzA3LTEwOjU3OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgV2luZG93cyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyODU0OEE5ODdGMDUxMUUxQjJBRDkzODU0QzQ2QjFBMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyODU0OEE5OTdGMDUxMUUxQjJBRDkzODU0QzQ2QjFBMCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI4NTQ4QTk2N0YwNTExRTFCMkFEOTM4NTRDNDZCMUEwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjI4NTQ4QTk3N0YwNTExRTFCMkFEOTM4NTRDNDZCMUEwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAAQAsAAAAAAQAAwAAAgVEHmYZBQA7",imageURL:_4.moduleUrl("imageURL","i/waveline.gif").toString(),imageHelpURL:_4.moduleUrl("imageURL","i/help.png").toString(),siteURL:"http://www.webspellchecker.net/",logoURL:_4.moduleUrl("imageURL","i/logo.gif").toString(),scaytList:[],_hash:[],sessionId:"",userDictionaryName:"",customDictionaryIds:[],uiTags:[1,1,1,1],_io:{},amountError:4,_currError:0,version:{scaytMajor:2,scaytMinor:8,scaytPatch:0,scaytFlag:"",scaytRevision:"$Revision: 4910 $".match(/\d+/),toString:function(){
with(scayt.version){
return scaytMajor+"."+scaytMinor+"."+scaytPatch+scaytFlag+" ("+scaytRevision+")";
}
}},getAboutInfo:function(){
return {version:scayt.version,siteURL:scayt.siteURL,logoURL:scayt.logoURL};
},_getCookieName:function(name,i){
return (_4.isIE?("["+(window.location.pathname.match(/([^\/]*)$/g)[0]||"")+"]"):"")+(name||"scayt")+"_"+i;
},_restoreState:function(obj,key){
_4.forEach(key,function(item){
var _5ff=scayt._getCookieName(obj.id,item);
var _600=_4.cookie(_5ff);
if(_600){
obj[item]=_4.fromJson(_600);
}
});
},_saveState:function(obj,key){
_4.forEach(key,function(item){
_4.cookie(this._getCookieName(obj.id,item),_4.toJson(obj[item]),{expires:365,path:(_4.isIE?window.location.pathname.replace(/\/[^\/]*$/,"/"):window.location.pathname)});
},this);
},_errorTime:10000,_countAfterError:0,_maxAfterError:3,_maxDicWords:100,minSendWords:3,maxCritSendWords:600,_responseTimeList:[],customerid:"1:ncttD3-fIoSf2-huzwE4-Y5muI2-mD0Tt-kG9Wz-UEDFC-tYu243-1Uq474-d9Z2l3",init:false,versionProtocol:"2.1",_errorPaused:false,_errorCallbackName:false,activateEditableBlockOnMouseClick:false,send:function(_604,_605,obj){
var t=this;
if(scayt.isIframeLoaded){
return t._send(_604,_605,obj);
}else{
scayt._iframeLoaders.push(function(){
t._send(_604,_605,obj);
});
}
},_send:function(_608,_609,obj){
var self=this;
var _60c={cmd:"sc",v:scayt.versionProtocol,format:"json",verLang:scayt.verLang,customerid:scayt.customerid,sid:scayt.sessionId};
_4.mixin(_60c,_4.clone(scayt._io));
scayt._io={};
_4.mixin(_60c,_608);
_609=_609||{};
var tmp={callbackParamName:"c",timeout:scayt.timeout,url:(scayt.scaytURL),content:_60c,handleAs:"json",frameDoc:scayt.frameDoc,handle:function(_60e,_60f){
if(_60e.error){
scayt.err(_60e);
return _4.mixin(new Error("Error"),_60e);
}
if(_60f.args.content&&_60f.args.content.words&&_60f.args.content.words.split(",").length<13){
scayt._responseTimeList.push((new Date).getTime()-td.startTime);
var s=0,k=0;
for(var i=0;i<scayt._responseTimeList.length;i++){
s+=scayt._responseTimeList[i];
}
s=Math.round(s/scayt._responseTimeList.length);
s=s>scayt.maxCritSendWords?s-scayt.maxCritSendWords:0;
scayt.time=scayt.minTime+s;
}
return _60e;
}};
_4.mixin(tmp,_609);
if(scayt.customDictionaryIds.length){
_4.mixin(tmp.content,{"cust_dic_ids":scayt.customDictionaryIds.join(",")});
}
if(!scayt.init){
_4.mixin(tmp.content,{"adds_info":1});
if(scayt.userDictionaryName){
_4.mixin(tmp.content,{"udn":scayt.userDictionaryName});
}
scayt.init=true;
}
if(obj){
if(!obj.init){
if(obj._userDictionaryName){
_4.mixin(tmp.content,{"udn":obj._userDictionaryName});
}
if(scayt.ads&&scayt.ads.params&&!scayt.ads.params[obj.assocApp]){
_4.mixin(tmp.content,{"product":obj.assocApp});
}
obj.init=true;
}
if(obj._customDictionaryIds&&obj._customDictionaryIds.length){
_4.mixin(tmp.content,{"cust_dic_ids":obj._customDictionaryIds.join(",")});
}else{
if(typeof obj._customDictionaryIds=="number"){
_4.mixin(tmp.content,{"cust_dic_ids":obj._customDictionaryIds});
}
}
}
var td=_4.io.script.get(tmp);
td.addCallbacks(function(_614){
scayt.call(_614);
if(scayt._errorPaused){
scayt._errorCallbackName=false;
scayt._errorPaused=false;
_4.forEach(scayt._hash,function(_615){
_615._setContent(function(){
_615.s.add(_615.containerNode);
_615._m(null,3);
});
});
}else{
}
return _614;
},function(_616){
if(typeof self.errorCallback=="function"){
self.errorCallback(obj);
}
if(_616.error){
if(_616.is_critical==1){
alert(_616.text);
_4.forEach(scayt._hash,function(_617){
_617.setDisabled(true);
});
return;
}else{
}
}
if(!scayt._errorPaused){
var args=td.ioArgs.args,dic=scayt.dictionary;
scayt._errorPaused=true;
td.ioArgs.args.scaytErr=true;
for(var i in dic){
dic[i].forEach(function(item){
if(item.value.status==-1){
dic[i].remove(item.key);
}
});
}
scayt._errorCallbackName=td.ioArgs.id;
}
if(td.ioArgs.id==scayt._errorCallbackName){
setTimeout(function(){
var _61c=scayt._send(td.ioArgs.args.content);
scayt._errorCallbackName=_61c.ioArgs.id;
},_616.error?scayt.timeout:0);
}
if(_616.dname){
return;
}
return _616;
});
return td;
},_sendUserDictionary:function(name,_61e,_61f){
var _620=function(_621,_622){
if(!scaytConfig.prefixUserDictionary||!scaytConfig.prefixUserDictionary["use"]){
return _621;
}
var name=_621||"",_624="_"+scaytConfig.prefixUserDictionary.name;
if(scaytConfig.prefixUserDictionary&&scaytConfig.prefixUserDictionary["use"]&&_622!="addword"){
name+=_624;
}
return name;
};
var _625=function(_626){
if(!scaytConfig.prefixUserDictionary||!scaytConfig.prefixUserDictionary["use"]){
return _626;
}
var _627="_"+scaytConfig.prefixUserDictionary.name,reg=new RegExp(_627+"$"),_629=_626||{};
if(_629.action==["getname"]&&reg.test(_629.dname)){
_629.dname=_629.dname.replace(_627,"");
}
return _629;
};
if(!_4.isString(name)){
console.error("Incorrect name");
return false;
}
return function(type){
scayt._io={cmd:"dictionary",action:type};
if(name&&type!="addword"){
_4.mixin(scayt._io,{dname:_620(name,type)});
}else{
if(type=="addword"){
_4.mixin(scayt._io,{word:name});
}
}
var td=scayt._send(scayt._io,{timeout:scayt.timeout,handleAs:"json",callbackParamName:"callback",handle:function(_62c,_62d){
var _62e=_625(_62c);
scayt.opt({dictionary:_62e});
if(_62e.error){
return _4.mixin(new Error("Error User Dictionary"),_62e);
}else{
return _62e;
}
}});
_61f=_61f||null;
td.addCallbacks(_61e,function(_62f){
return _61f(_62f,td);
});
return td;
};
},byId:function(id){
if(!_4.isString(id)){
return;
}
var _631=_5.registry.byId(id);
return _631;
},byNode:function(node){
if(!node){
return null;
}
return _5.registry.byId(node.getAttribute("widgetId"));
},getNameUserDictionary:function(){
return scayt._sendUserDictionary.apply(this,[""].concat(_4._toArray(arguments)))("getname");
},getUserDictionaryName:function(){
return scayt._sendUserDictionary.apply(this,[""].concat(_4._toArray(arguments)))("getname");
},addWordToUserDictionary:function(word,_634,_635){
if(!_4.isString(word)){
var pre=[_4.attr(word,"data-scayt_word")].concat(_4._toArray(arguments,1));
}
return scayt._sendUserDictionary.apply(this,pre||arguments)("addword");
},deleteWordFromUserDictionary:function(word,_638,_639){
},createUserDictionary:function(name,_63b,_63c){
return scayt._sendUserDictionary.apply(this,arguments)("create");
},deleteUserDictionary:function(_63d,_63e){
return scayt._sendUserDictionary.apply(this,[""].concat(_4._toArray(arguments)))("delete");
},renameUserDictionary:function(name,_640,_641){
return scayt._sendUserDictionary.apply(this,arguments)("rename");
},restoreUserDictionary:function(name,_643,_644){
return scayt._sendUserDictionary.apply(this,arguments)("restore");
},getUserDictionaryContent:function(){
},setUserDictionaryContent:function(){
},_mixin:null,props:function(o){
_4.mixin(scayt._mixin,o);
if(o["ads"]&&!scayt.ads){
scayt.ads={};
}
if(o["ads"]&&(typeof (o["ads"].active)!="undefined")&&!(o["ads"].active)){
scayt.ads.active=o["ads"].active;
}
if(o["ads"]&&o["ads"].params){
for(var x in o["ads"].params){
if(!scayt.ads.inputParams){
scayt.ads.inputParams={};
}
scayt.ads.inputParams[x]=_4.mixin(o["ads"].params[x],scayt.ads.inputParams["default"]);
}
}
if(o["uiTags"]){
scayt.uiTags=o["uiTags"];
}
if(o["userDictionaryName"]){
scayt.userDictionaryName=o["userDictionaryName"];
}
if(o["customDictionaryIds"]){
scayt.customDictionaryIds=o["customDictionaryIds"];
}
_4.extend(scayt,o);
},err:function(_647){
if(_647&&_647.disabled&&!scayt.disabled){
scayt.disabled=true;
_4.forEach(scayt._hash,function(_648){
_648.destroy();
});
}
},getLangList:function(){
return _4.clone(scayt.langList);
},opt:function(o){
for(var x in o){
switch(x){
case "verLang":
if(o[x]!=scayt[x]&&!o.langList){
_4.io.script.get({url:(scayt.langURL+"&slang="+(scayt.sLang?scayt.sLang:scayt._defaultLang)+"&customerid="+scayt.customerid),content:{verLang:o[x]}});
scayt[x]=_4.clone(o[x]);
}else{
if(o.langList){
scayt[x]=_4.clone(o[x]);
if(scayt.persist){
scayt._saveState(scayt,["verLang"]);
}
}
}
break;
case "dictionary":
if(o[x].action=="delete"||o[x].action=="restore"){
scayt.dictionary={};
}
_4.publish("scayt::actionUserDictionary",[o[x].action,o[x].word]);
break;
default:
scayt[x]=_4.clone(o[x]);
}
}
},nls:{},manager:[],getCaption:function(_64b,_64c){
var mn="scayt",bn="ui",str=[];
_4.forEach(["ltr","rtl"],function(item){
var arr=scayt.langList[item];
for(var k in arr){
str.push(k);
}
});
var _653=str.join(",").replace(/_/g,"-").toLowerCase();
_64b="ROOT";
var l=_64b.replace(/-/g,"_");
if(scayt.nls&&scayt.nls[bn]&&scayt.nls[bn][l]){
_64c(scayt.nls[bn][l]);
}else{
_4._xdReset();
_4._loadNotifying=false;
_4["require"+"Localization"](mn,bn,_64b,_653);
_4.addOnLoad(function(){
if(scayt.clearTimeoutLocalization){
clearTimeout(scayt.clearTimeoutLocalization);
delete (scayt.clearTimeoutLocalization);
}
_64c(_4.i18n["get"+"Localization"](mn,bn,_64b));
});
scayt.clearTimeoutLocalization=setTimeout(function(){
try{
_64c(_4.i18n["get"+"Localization"](mn,bn,"root"));
_4._loaders=[];
scayt.nls[bn][_64b]=_4.i18n["get"+"Localization"](mn,bn,"root");
}
catch(e){
_64c(scayt.nls[bn]["ROOT"]);
}
_4._xdReset();
},scayt.timeout/2);
}
},call:function(o){
var lang=scayt._defaultLang,_657=o.incorrect,_658=o.correct;
o=o.o;
if(o&&_4.isObject(o)&&o.errorLang){
delete (scayt.dictionary[o.errorLang]);
if(typeof scayt.dictionary[o.lang]=="undefined"){
scayt.dictionary[o.lang]=new _6.collections.Dictionary();
}
lang=o.lang;
}else{
if(o&&o.lang){
lang=o.lang;
}
}
var dic=scayt.dictionary[lang],tmp=[],corr=[],d;
_4.forEach(_657,function(item){
if(typeof item=="undefined"){
return;
}
d=dic.item(item[0]);
if(typeof d=="undefined"){
dic.add(item[0],{sugg:item[1],amount:0,status:0});
d=dic.item(item[0]);
}else{
d.sugg=item[1];
d.status=0;
}
corr=corr.concat(d.sugg);
tmp.push(item[0]);
});
_4.forEach(_658,function(item){
d=dic.item(item);
if(typeof d=="undefined"){
dic.add(item,{status:1});
}else{
d.status=1;
}
});
_4.forEach(corr,function(item){
dic.add(item,{amount:0,status:1});
});
_4.publish("scayt::call",[{words:tmp,"sLang":lang,errorLang:((o&&o.errorLang)||null),status:0,correct:_658}]);
},getSuggestion:function(word,lang){
return scayt.dictionary[(lang||scayt._defaultLang)].item(word).sugg;
},cssStyleNode:{arr:[],item:function(doc){
var b=false;
for(var i=0;i<scayt.cssStyleNode.arr.length;i++){
if(scayt.cssStyleNode.arr[i]["doc"]==doc){
b=scayt.cssStyleNode.arr[i];
}
}
return b;
},push:function(_665){
if(!scayt.cssStyleNode.item(_665.doc)){
scayt.cssStyleNode.arr.push(_665);
}
},remove:function(doc){
var b=false,_668=-1;
for(var i=0;i<scayt.cssStyleNode.arr.length;i++){
if(scayt.cssStyleNode.arr[i]["doc"]==doc){
b=scayt.cssStyleNode.arr[i]["css"];
_668=i;
}
}
if(_668==-1){
return false;
}
if(!_4.isIE){
for(i=0;i<b.length;i++){
_4.destroy(b[i]);
}
}
scayt.cssStyleNode.arr.splice(_668,1);
}}});
(function(){
if(typeof scaytConfig!="undefined"){
for(var opt in scaytConfig){
scayt[opt]=scaytConfig[opt];
}
}
scayt._restoreState(scayt,["verLang"]);
scayt.sessionId=document.domain+"|"+(new Date()).getTime()+Math.random();
_4.subscribe("widgetBlur",this,function(w){
if(w.baseClass==="scayt"){
w._focused==true;
}
});
_4.subscribe("widgetFocus",this,function(w){
if(w.baseClass==="scayt"){
w._focused==false;
}
});
scayt.scaytControls=function(){
this.controls=[];
this.init();
};
scayt.scaytControls.prototype={controls:[],init:function(){
},options:{controlPrefix:"sc_"},CreateSCAYTControlByID:function(id,_66e){
var elem=document.getElementById(id),_670={};
if(typeof _66e=="object"){
_670=_66e;
}
if(elem){
_670.srcNodeRef=elem;
if(elem.tagName.toUpperCase()=="TEXTAREA"){
this.controls[id]=new scayt.Textarea(_670);
}else{
if(elem.tagName.toUpperCase()=="INPUT"){
this.controls[id]=new scayt.Input(_670);
}else{
try{
this.controls[id]=new scayt.ui(_670);
this.controls[id].scayt.prototype=this.controls[id];
this.controls[id].scayt=new this.controls[id].scayt();
}
catch(e){
throw new Error("This element isn't supported");
}
}
}
}else{
throw new Error("No elements with this Id found.");
}
},setSCAYTCssSheets:function(node,_672){
if(node.nextSibling&&(node.nextSibling.nodeName=="TEXTAREA"||node.nextSibling.nodeName=="INPUT")){
var _673=node.parentNode;
_4.style(_673,_672);
if(_672.height||_672.width){
var _674=Object();
if(_672.height){
_674.height=_672.height;
}
if(_672.width){
_674.width=_672.width;
}
_4.style(node,_674);
}
}else{
if(node.nodeName&&node.nodeName=="BODY"){
_4.style(node,_672);
if(_672.height||_672.width){
var _673=node.parentNode.parentNode;
var _674={};
if(_672.height){
_674.height=_672.height;
}
if(_672.width){
_674.width=_672.width;
}
var _675=document.getElementsByTagName("IFRAME");
for(var _i in _675){
if(node.parentElement.parentNode.baseURI==_675[_i].contentDocument.baseURI){
_4.style(_675[_i],_674);
}
}
}
}else{
_4.style(node,_672);
}
}
return true;
},getSCAYTControlById:function(id){
if(this.controls[id]!==undefined){
return this.controls[id];
}else{
if(id.substr(0,3)==this.options.controlPrefix&&this.controls[id.substring(3)]!=="undefined"){
return this.controls[id.substring(3)];
}else{
return false;
}
}
},getSCAYTElementById:function(id){
if(this.controls[id].containerNode){
return this.controls[id].containerNode;
}else{
return this.controls[id].editNode;
}
},connections:[],scaytAddEvent:function(_679,_67a,func){
var _67c=_67a=="change"?"blur":_67a;
var _67d=this.getSCAYTElementById(_679);
var _67e=document.getElementById(_679);
if(_67e){
var _67f=this.getSCAYTControlById(_679).value;
this.controls[_679].value=_67e.value;
this.connections.push(sc_dojo.connect(_67d,_67c,null,function(e){
if(e.type=="blur"&&_67a=="change"){
if(_67f!=_67e.value){
func.call(_67e,e);
_67f=_67e.value;
}
}else{
func.call(_67e,e);
}
}));
}else{
this.connections.push(sc_dojo.connect(_67d,_67c,null,function(e){
func.call(_67e,e);
}));
}
},scaytRemoveAllEvent:function(){
_4.forEach(this.connections,sc_dojo.disconnect);
},scaytRemoveEvent:function(_682,_683){
var _684=this.getSCAYTElementById(_682);
for(var i=0;i<this.connections.length;i++){
if(this.connections[i][1]===_683&&this.connections[i][0]===_684){
sc_dojo.disconnect(this.connections[i]);
}
}
},getSuggestion:function(word,lang){
return scayt.getSuggestion(word,lang);
},getScaytNode:function(_688,node){
if(typeof _688.getScaytNode=="function"){
if(node){
return _688.getScaytNode(node);
}else{
return _688.getScaytNode();
}
}else{
if(node){
return _688.scayt.getScaytNode(node);
}else{
return _688.scayt.getScaytNode();
}
}
},getWord:function(_68a,node){
if(typeof _68a.getWord=="function"){
return _68a.getWord(node);
}else{
return _68a.scayt.getWord(node);
}
},ignore:function(_68c,node){
if(typeof _68c.ignore=="function"){
return _68c.ignore(node);
}else{
return _68c.scayt.ignore(node);
}
},ignoreAll:function(_68e,node){
if(typeof _68e.ignoreAll=="function"){
return _68e.ignoreAll(node);
}else{
return _68e.scayt.ignoreAll(node);
}
},refresh:function(_690,node){
if(typeof _690.refresh=="function"){
return _690.refresh();
}else{
return _690.scayt.refresh();
}
},replace:function(_692,el,word){
if(typeof _692.replace=="function"){
return _692.replace(el,word);
}else{
return _692.scayt.replace(el,word);
}
},setDisabled:function(_695,_696){
if(typeof _695.setDisabled=="function"){
return _695.setDisabled(_696);
}else{
return _695.scayt.setDisabled(_696);
}
},setLang:function(_697,lang){
if(typeof _697.setLang=="function"){
return _697.setLang(lang);
}else{
return _697.scayt.setLang(lang);
}
}};
scayt.scaytCtrls=new scayt.scaytControls();
if(scayt.node){
function func(){
var sn=scayt.node;
if(_4.isString(sn)){
var node=_4.byId(sn);
sn=node?[node]:[];
}
if(!_4.isArray(sn)){
sn=[sn];
}
_4.forEach(sn,function(node,i){
scayt.manager[i]=new scayt({srcNodeRef:node,id:node.id});
});
};
func();
}
scayt.isIframeLoaded=false;
scayt._iframeLoaders=[];
scayt._started=true;
if(_4.isOpera){
var _69e={};
if(scayt.verLang){
_4.mixin(_69e,{verLang:scayt.verLang,sid:scayt.sessionId});
}
_4.io.script.get({url:(scayt.langURL+"&slang="+(scayt.sLang?scayt.sLang:scayt._defaultLang)+"&customerid="+scayt.customerid),content:_69e});
scayt.frameDoc=document;
scayt.isIframeLoaded=true;
}
})();
if(!_4.isOpera){
scayt.addLoad=function(){
scayt.iframeOnLoad=function(){
var _69f={};
if(scayt.verLang){
_4.mixin(_69f,{verLang:scayt.verLang,sid:scayt.sessionId});
}
if(!scayt.init&&!scayt.initSent){
_4.mixin(_69f,{init:1});
scayt.initSent=!scayt.initSent;
}
_4.io.script.get({url:(scayt.langURL+"&slang="+(scayt.sLang?scayt.sLang:scayt._defaultLang)+"&customerid="+scayt.customerid),content:_69f,frameDoc:scayt.frameDoc});
scayt.isIframeLoaded=true;
for(var x=0;x<scayt._iframeLoaders.length;x++){
scayt._iframeLoaders[x]();
}
};
if(!scayt.frameDoc){
var html="javascript:void(0)";
var _6a2=_4.doc.createElement("iframe");
if(!_4.isIE){
_4.connect(_6a2.contentWindow,"onload",scayt.iframeOnLoad);
}
_4.attr(_6a2,{hidefocus:"true",frameborder:"0",src:html});
_4.style(_6a2,{position:"absolute",left:"-10000px",top:"-10000px",width:"0",height:"0",display:"none"});
_4.body().appendChild(_6a2);
_6a2.contentWindow.document.open();
_6a2.contentWindow.document.write("<html><head></head><body><script type=\"text/javascript\">scayt=parent.scayt;scayt.iframeOnLoad()</script></body></html>");
_6a2.contentWindow.document.close();
_6a2.contentWindow.scayt=scayt;
scayt.frameDoc=_6a2.contentWindow.document;
}
if(_4.isSafari&&_4.isSafari<5){
scayt.iframeOnLoad();
}
};
if(_4._loaders.length){
_4._loaders.unshift(scayt.addLoad);
}else{
scayt.addLoad();
}
}
}
({tab_options:"Options",tab_langs:"Languages",tab_dictionary:"User Dictionary",tab_about:"About Us",label_allCaps:"Ignore All-Caps Words",label_ignoreDomainNames:"Ignore Domain Names",label_mixedCase:"Ignore Words with Mixed Case",label_mixedWithDigits:"Ignore Words with Numbers",label_more_suggestion:"More suggestions",label_no_suggestion:"No suggestions",label_ignore:"Ignore",label_ignore_all:"Ignore all",label_add_word:"Add word",label_disabled:"Disabled",label_dname:"Dictionary Name:",button_dic_create:"Create",button_dic_delete:"Delete",button_dic_rename:"Rename",button_dic_restore:"Restore",dic_info:"Initially the User Dictionary is stored in a Cookie. However, Cookies are limited in size. When the User Dictionary grows to a point where it cannot be stored in a Cookie, then the dictionary may be stored on our server. To store your personal dictionary on our server you should specify a name for your dictionary. If you already have a stored dictionary, please type it's name and click the Restore button.",err_dic_create:"Dictionary %s cannot be created.",err_dic_delete:"Dictionary %s cannot be deleted.",err_dic_rename:"Dictionary %s cannot be renamed.",err_dic_restore:"Dictionary %s cannot be restored.",succ_dic_create:"Dictionary %s successfully created.",succ_dic_delete:"Dictionary %s successfully deleted.",succ_dic_rename:"Dictionary %s successfully renamed.",succ_dic_restore:"Dictionary %s successfully restored.",err_dic_emptyname:"Dictionary name should not be empty.",curr_dic:"Current dictionary",version:"Version",about_throwt_copy:" &copy;<a  style='text-decoration: underline;cursor:pointer;color:#00f' href='http://www.webspellchecker.net' target='_blank'>1999-2014 SpellChecker.net, Inc.</a><br /> &copy;2005-2014, The Dojo Foundation<br />All Rights Reserved.",button_ok:"Ok",button_cancel:"Cancel",buttonSave:"Save",itemClose:"Close",loadingState:"Loading...",errorState:"Sorry, an error occurred",copy:"Copy",cut:"Cut",paste:"Paste","delete":"Delete",select_all:"Select All",redo:"Redo",undo:"Undo",help:"Help",instructions:"instructions",set_SCAYT_Disable:"Set your SCAYT disabled",enter_menu:"Enter SCAYT menu",replaced_with:"is replaced with",systemShortcut:"The \"${0}\" action is only available in your browser using a keyboard shortcut. Use ${1}.",ctrlKey:"ctrl+${0}",appleKey:"⌘${0}"});
if(!_4._hasResource["scayt.banner"]){
_4._hasResource["scayt.banner"]=true;
_4.provide("scayt.banner");
_4.mixin(scayt,{ads:{inputParams:{"default":{pleft:3,vscroll:0,nshow:3}},active:true,clickOverClAds:false,iframeId:"spellads",divId:"adsBlock",adsbuttonId:"scayt_banner_close",jsonDataUrl:location.protocol+"//www.webspellchecker.net/images/fck/json.php",divIsCreated:false,getAbsPosition:function(_6a3){
var x=y=0;
var elem=typeof _6a3=="string"?document.getElementById(_6a3):_6a3;
var w=elem.offsetWidth;
var h=elem.offsetHeight;
while(elem){
x+=elem.offsetLeft;
y+=elem.offsetTop;
elem=elem.offsetParent;
}
return {x:x,y:y,w:w,h:h};
},createAdsDiv:function(_6a8){
var _6a9=document.createElement("div");
_6a9.id=_6a8;
document.body.appendChild(_6a9);
return document.getElementById(_6a8);
},buildAdsDiv:function(_6aa,_6ab){
_6aa.innerHTML=_6ab.mainSettings.InnerHtml;
var _6ac="";
_6aa.style.border=_6ab.mainSettings.border;
_6aa.style.position=_6ab.mainSettings.position;
_6aa.style.width=_6ab.mainSettings.width+"px";
_6aa.style.height=_6ab.mainSettings.height+"px";
_6aa.style.zIndex=_6ab.mainSettings.zIndex;
_6aa.style.background=_6ab.mainSettings.background;
_6aa.style.textAlign="center";
_6aa.style.lineHeight="1";
var _6ad=document.getElementById("addslinkclose");
_6ad.style.background=_6ab.closeButtonSettings.background;
_6ad.style.cursor=_6ab.closeButtonSettings.cursor;
_6ad.style.zIndex=_6ab.closeButtonSettings.zIndex;
_6ad.title=_6ab.closeButtonSettings.title;
return _6aa;
},setCoordsAdsDiv:function(_6ae,_6af){
_6ae.style.top=_6af.y+"px";
_6ae.style.left=_6af.x+"px";
return _6ae;
},getRMBinfo:function(env,args){
var _6b2=this.get_rmb[env]||null;
if(!_6b2){
return null;
}
return _6b2.apply(this,[args]);
},get_rmb:{scayt_ui:function(){
return null;
},ck_editor:function(_6b3){
try{
if(!_6b3){
return null;
}
var _6b4=_6b3;
var el=null;
var xy={};
var adsp=this.params;
var _6b8;
if(typeof _6b4.contextMenu._.menu!="undefined"){
var d=_6b4.contextMenu._.menu.id.split("_");
var num=new Number(d[1]);
_6b8=d[0]+"_"+(num+3);
}else{
if(_4.query(".cke_menu_panel")[0]){
_6b8=_4.query(".cke_menu_panel")[0].id;
}else{
_6b8=_4.query(".cke_contextmenu")[0].id;
}
}
el=document.getElementById(_6b8);
if(!el){
_6b8=d[0]+"_"+(num+1);
el=document.getElementById(_6b8);
}
if(!el){
el=_4.query(".cke_contextmenu");
if(el&&el.length>0){
el=el[0];
}else{
el=null;
}
}
if(!el){
return null;
}
if(el.parentNode.style.left){
el.parentNode.style.left=(parseInt(el.parentNode.style.left)).toString()+"px";
}
if(el.parentNode.style.top){
el.parentNode.style.top=(parseInt(el.parentNode.style.top)).toString()+"px";
}
var _6bb=_4.coords(el,true);
if(_6bb.x<=0||_6bb.y<=0){
return null;
}
xy.x=_6bb.x+_6bb.w+adsp.pleft;
xy.y=_6bb.y+(_6bb.h*adsp.vscroll);
return xy;
}
catch(err){
return null;
}
},fck_menu:function(_6bc){
try{
if(!_6bc||!_6bc._Panel){
return null;
}
var xy={};
var adsp=this.params;
if(_6bc._Panel._Popup){
var _6bf={x:_6bc._Panel._PopupArgs[0],y:_6bc._Panel._PopupArgs[1],w:_6bc._Panel._PopupArgs[2],h:_6bc._Panel._PopupArgs[3]};
var px=new Number((document.documentElement&&document.documentElement.scrollLeft)||(document.body.parentNode&&document.body.parentNode.scrollLeft))||0;
var py=new Number((document.documentElement&&document.documentElement.scrollTop)||(document.body.parentNode&&document.body.parentNode.scrollTop))||0;
xy.x=_6bf.x-window.screenLeft+px+_6bf.w+adsp.pleft;
xy.y=_6bf.y-window.screenTop+py+_6bf.h*adsp.vscroll;
}else{
if(_6bc._Panel._IFrame){
var _6bf=this.getAbsPosition(_6bc._Panel._IFrame);
xy.x=_6bf.x+_6bf.w+adsp.pleft;
xy.y=_6bf.y+(_6bf.h*adsp.vscroll);
}
}
if(_6bf.x<=0||_6bf.y<=0){
return null;
}
return xy;
}
catch(err){
return null;
}
},tiny_mce:function(_6c2){
try{
var xy={};
var adsp=this.params;
var el=document.getElementById("menu_"+_6c2.id+"_contextmenu")||null;
if(!el){
return null;
}
var _6c6=_4.coords(el,true);
xy.x=_6c6.x+_6c6.w+3;
xy.y=_6c6.y+(_6c6.h*0);
return xy;
}
catch(err){
return null;
}
}},_hideAdsInDOM:function(time,_6c8){
var that=this;
time=(that.clickOverClAds==false&&_6c8==false)?0:time>0?time:1500;
_6c8=_6c8||false;
window.setTimeout(function(){
document.getElementById("adsBlock").style.display="none";
},130);
},_hideAdsInDOMMoment:function(){
document.getElementById("adsBlock").style.display="none";
},hide_rmb:{scayt_ui:function(){
return null;
},ck_editor:function(_6ca,_6cb,cl){
try{
var that=this;
var _6ce=scayt.ads.clickOverClAds;
var _6cf=false;
document.getElementById(scayt.ads.divId).onmouseover=function(ev){
_6cf=true;
};
document.getElementById(scayt.ads.divId).onmouseout=function(ev){
_6cf=false;
};
if(typeof _6ca.contextMenu._.menu!="undefined"){
var _6d2=_6ca.contextMenu._.menu.onHide;
_6ca.contextMenu._.menu.onHide=function(){
scayt.ads._hideAdsInDOM(500,_6cf);
if(_6d2){
_6d2.apply(_6ca.contextMenu._.menu,[_6ca]);
}
};
}else{
var _6d2=_6ca.contextMenu._.onHide;
_6ca.contextMenu._.onHide=function(){
scayt.ads._hideAdsInDOM(500,_6cf);
if(_6d2){
_6d2.apply(_6ca.contextMenu._,[_6ca]);
}
};
}
}
catch(err){
return null;
}
},fck_menu:function(_6d3,_6d4){
try{
if(_6d4==1){
document.getElementById(scayt.ads.divId).style.display="none";
}
if(_4.isSafari){
if(new String(_6d3._Panel._IFrame.style.height).indexOf("0")==0){
scayt.ads._hideAdsInDOMMoment();
}
}
var that=this;
var _6d6=false;
var _6d7;
var _6d8=null;
document.getElementById(scayt.ads.divId).onmouseover=function(ev){
_6d6=true;
};
document.getElementById(scayt.ads.divId).onmouseout=function(ev){
_6d6=false;
};
if(_6d3._Panel._Popup){
_6d7=window.setInterval(function(){
if(!_6d3._Panel._Popup.isOpen){
scayt.ads._hideAdsInDOM(500,_6d6);
window.clearInterval(_6d7);
}
},100);
}else{
if(_6d3._Panel._IFrame){
_6d7=window.setInterval(function(){
if(new String(_6d3._Panel._IFrame.style.height).indexOf("0")==0){
scayt.ads._hideAdsInDOM(500,_6d6);
window.clearInterval(_6d7);
}
},100);
}
}
}
catch(err){
return null;
}
},tiny_mce:function(_6db){
try{
var _6dc="menu_"+_6db.editorId+"_contextmenu";
var that=this;
var _6de=false;
document.getElementById(scayt.ads.divId).onmouseover=function(ev){
_6de=true;
};
document.getElementById(scayt.ads.divId).onmouseout=function(ev){
_6de=false;
};
var hide=function(){
scayt.ads._hideAdsInDOM(500,_6de);
};
var _6e2=function(){
if(scayt._adsShown%3!=1){
scayt.ads._hideAdsInDOM(500,_6de);
}
};
if(_4.isSafari){
_6db.onClick.add(hide);
document.getElementById(_6dc).onclick=function(){
scayt.ads._hideAdsInDOM(500,_6de);
};
_6db.onContextMenu.add(_6e2);
}else{
_6db.onMouseDown.add(hide);
_6db.onKeyDown.add(hide);
document.getElementById(_6dc).onclick=function(){
scayt.ads._hideAdsInDOM(500,_6de);
};
}
}
catch(err){
return null;
}
}}},_adsHidden:false,counter_view:0,_adsShown:0,rmbLayer:"",showads:function(){
arguments=Array.prototype.slice.call(arguments);
var that=scayt;
var adsp=scayt.ads.inputParams[arguments.shift()]||scayt.ads.inputParams["default"];
if(!scayt.ads.active){
return;
}
if(scayt._adsHidden){
return;
}
that._adsShown++;
adsp.nshow=adsp.nshow||1;
that.ads.params=adsp;
var ads=that.ads;
var args={};
args.ck_editor=null;
args.fck_menu=null;
args.tiny_mce=null;
that.rmbLayer="scayt_ui";
if(arguments[0]!==null&&arguments[0]){
args.ck_editor=arguments[0];
that.rmbLayer="ck_editor";
}else{
if(arguments[1]!==null&&arguments[1]){
args.fck_menu=arguments[1];
that.rmbLayer="fck_menu";
}else{
if(arguments[2]!==null&&arguments[2]){
args.tiny_mce=arguments[2];
that.rmbLayer="tiny_mce";
}
}
}
if((that._adsShown==1?adsp.nshow:that._adsShown-1)%adsp.nshow!=0){
that.runHideBannerListener(that.rmbLayer,args[that.rmbLayer],1);
return;
}
var _6e7=_4.isSafari?150:100;
var _6e8=window.setInterval(function(){
var _6e9=ads.getRMBinfo(that.rmbLayer,args[that.rmbLayer],1);
if(_6e9){
if(!scayt.ads.divIsCreated){
if(typeof tinymce!="undefined"){
scayt.ads.jsonDataUrl=location.protocol+"//www.webspellchecker.net/images/fck/jsontiny.php";
}
var _6ea=that.ads.createAdsDiv(scayt.ads.divId);
var _req={callbackParamName:"callback",url:scayt.ads.jsonDataUrl,handleAs:"jsonp",frameDoc:"",load:function(data){
that.ads.buildAdsDiv(_6ea,data);
_6ea.style.left=_6e9.x+"px";
_6ea.style.top=_6e9.y+"px";
_6ea.style.display="block";
}};
var td=_4.io.script.get(_req);
scayt.ads.divIsCreated=true;
}else{
_6ea=document.getElementById("adsBlock");
that.ads.setCoordsAdsDiv(_6ea,_6e9);
_6ea.style.display="block";
}
that.runHideBannerListener(that.rmbLayer,args[that.rmbLayer],0);
window.clearInterval(_6e8);
}
},_6e7);
},runHideBannerListener:function(_6ee,_6ef,pos){
var that=scayt;
var _6f2=that.ads.hide_rmb[_6ee]||null;
var _6f3=document.getElementById(scayt.ads.iframeId);
var _6f4=document.getElementById(scayt.ads.adsbuttonId);
if(!_6f2){
return null;
}
scayt._hideFunc={foo:_6f2,args:[_6ef,_6f3]};
return _6f2.apply(scayt,[_6ef,pos]);
},hideBanner:function(){
try{
scayt._adsHidden=true;
scayt._hideFunc.foo.apply(scayt,scayt._hideFunc.args);
}
catch(err){
}
return;
},hideDivBanner:function(){
try{
scayt._adsHidden=true;
document.getElementById(scayt.ads.divId).style.display="none";
}
catch(err){
}
return;
},hidetinBanner:function(){
if(!scayt.ads.active){
return null;
}
try{
document.getElementById(scayt.ads.divId).style.display="none";
}
catch(err){
}
}});
_4.extend(scayt,{showads:function(){
return scayt.showads.apply(scayt,[this.assocApp].concat(_4._toArray(arguments)));
},hidetinBanner:function(){
return scayt.hidetinBanner.apply(scayt,arguments);
},fireOnContextMenu:function(){
return scayt.showads.apply(scayt,[this.assocApp].concat(_4._toArray(arguments)));
}});
}
}};
});
