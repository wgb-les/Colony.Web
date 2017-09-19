/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


var URLProvider=function(_1,_2){
if("false"==="true"){
var _3="";
var _4=document.getElementsByTagName("script");
for(var i=_4.length-1;i>=0;--i){
var _6=_4[i].src;
if(_6.indexOf(_1)!=-1){
_3=_6;
break;
}
}
if(!_3){
_3=_2;
}
var _7=/(?:\/\/)?([^\/]*)\/([^\/]+)/g;
var _8=_7.exec(_3);
this.host=typeof (_8[1])=="undefined"?document.location.host:_8[1];
this.virtualDirectory=_8[2];
this.servicePath="//"+this.host+"/"+this.virtualDirectory;
}
};
var ScaytUrlProvider=new URLProvider("/scayt/","svc.webspellchecker.net/spellcheck31");
(function(){
var _9={dn_host:ScaytUrlProvider.host||"svc.webspellchecker.net",service_host:ScaytUrlProvider.host||"svc.webspellchecker.net",dn_path:ScaytUrlProvider.virtualDirectory?ScaytUrlProvider.virtualDirectory+"/lf/scayt":"scayt26",service_path:ScaytUrlProvider.virtualDirectory||"spellcheck31",isDojoAlreadyLoaded:false,SC_name:"_base",type:"test",protocol:document.location.protocol+"//",module:"scayt._base,scayt.nls.ui".split(","),config:{customerid:"1:ncttD3-fIoSf2-huzwE4-Y5muI2-mD0Tt-kG9Wz-UEDFC-tYu243-1Uq474-d9Z2l3"}};
if(typeof scaytConfig!="undefined"){
for(var x in scaytConfig){
_9.config[x]=scaytConfig[x];
}
}
scaytConfig=_9.config;
scaytConfig.isDojoAlreadyLoaded=_9.isDojoAlreadyLoaded;
var _b={parseOnLoad:true,afterOnLoad:(_9["SC_name"]=="_base"),useXDomain:true,locale:"en",xdWaitSeconds:30,preventCache:false,modulePaths:{"dojo":_9.protocol+(""||_9.dn_host)+"/"+(""||_9.dn_path)+"","scayt":_9.protocol+(""||_9.dn_host)+"/"+(""||_9.dn_path)+"","langURL":_9.protocol+(""||_9.service_host)+"/"+(""||_9.service_path)+"/lf/scayt","imageURL":_9.protocol+(""||_9.dn_host)+"/"+(""||_9.dn_path)+"","scaytURL":_9.protocol+(""||_9.service_host)+"/"+(""||_9.service_path)},require:_9.module,isDebug:false};
if(typeof djConfig!="undefined"){
for(var x in djConfig){
if(djConfig[x].length){
if(typeof _b[x]=="undefined"){
_b[x]=djConfig[x];
}else{
if(_b[x].length){
_b[x].concat(djConfig[x]);
}
}
}else{
_b[x]=djConfig[x];
}
}
}
djConfig=_b;
if(typeof djScaytConfig!="undefined"){
for(var x in djScaytConfig){
djConfig[x]=djScaytConfig[x];
}
}
if(typeof CKEDITOR!="undefined"&&typeof CKEDITOR._djScaytConfig!="undefined"){
for(var x in CKEDITOR._djScaytConfig){
djConfig[x]=CKEDITOR._djScaytConfig[x];
}
}
if(_9["SC_name"]!="_base"){
if(typeof document.createStyleSheet!="undefined"){
try{
document.createStyleSheet(_9.protocol+(""||_9.dn_host)+"/"+(""||_9.dn_path)+"/scayt/css/_base.css");
}
catch(e){
document.styleSheets[0].addImport(_9.protocol+(""||_9.dn_host)+"/"+(""||_9.dn_path)+"/scayt/css/_base.css");
}
}else{
document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\""+_9.protocol+(""||_9.dn_host)+"/"+(""||_9.dn_path)+"/scayt/css/_base.css"+"\" />");
}
}
})();
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

(function(){
var _1=[["dojo","sc_dojo"],["dijit","sc_dijit"],["dojox","sc_dojox"]];
if((_1||(typeof djConfig!="undefined"&&djConfig.scopeMap))&&(typeof window!="undefined")){
var _2="",_3="",_4="",_5={},_6={};
_1=_1||djConfig.scopeMap;
for(var i=0;i<_1.length;i++){
var _8=_1[i];
_2+="var "+_8[0]+" = {}; "+_8[1]+" = "+_8[0]+";"+_8[1]+"._scopeName = '"+_8[1]+"';";
_3+=(i==0?"":",")+_8[0];
_4+=(i==0?"":",")+_8[1];
_5[_8[0]]=_8[1];
_6[_8[1]]=_8[0];
}
eval(_2+"dojo._scopeArgs = ["+_4+"];");
dojo._scopePrefixArgs=_3;
dojo._scopePrefix="(function("+_3+"){";
dojo._scopeSuffix="})("+_4+")";
dojo._scopeMap=_5;
dojo._scopeMapRev=_6;
}
(function(){
if(typeof this["loadFirebugConsole"]=="function"){
this["loadFirebugConsole"]();
}else{
this.console=this.console||{};
var cn=["assert","count","debug","dir","dirxml","error","group","groupEnd","info","profile","profileEnd","time","timeEnd","trace","warn","log"];
var i=0,tn;
while((tn=cn[i++])){
if(!console[tn]){
(function(){
var _c=tn+"";
console[_c]=("log" in console)?function(){
var a=Array.apply({},arguments);
a.unshift(_c+":");
console["log"](a.join(" "));
}:function(){
};
})();
}
}
}
if(typeof dojo=="undefined"){
this.dojo={_scopeName:"dojo",_scopePrefix:"",_scopePrefixArgs:"",_scopeSuffix:"",_scopeMap:{},_scopeMapRev:{}};
}
var d=dojo;
if(typeof dijit=="undefined"){
this.dijit={_scopeName:"dijit"};
}
if(typeof dojox=="undefined"){
this.dojox={_scopeName:"dojox"};
}
if(!d._scopeArgs){
d._scopeArgs=[dojo,dijit,dojox];
}
d.global=this;
d.config={isDebug:false,debugAtAllCosts:false};
if(typeof djConfig!="undefined"){
for(var _f in djConfig){
d.config[_f]=djConfig[_f];
}
}
dojo.locale=d.config.locale;
var rev="$Rev: 18832 $".match(/\d+/);
dojo.version={major:0,minor:0,patch:0,flag:"build",revision:rev?+rev[0]:NaN,toString:function(){
with(d.version){
return major+"."+minor+"."+patch+flag+" ("+revision+")";
}
}};
if(typeof OpenAjax!="undefined"){
OpenAjax.hub.registerLibrary(dojo._scopeName,"http://dojotoolkit.org",d.version.toString());
}
var _11={};
dojo._mixin=function(obj,_13){
for(var x in _13){
if(_11[x]===undefined||_11[x]!=_13[x]){
obj[x]=_13[x];
}
}
if(d.isIE&&_13){
var p=_13.toString;
if(typeof p=="function"&&p!=obj.toString&&p!=_11.toString&&p!="\nfunction toString() {\n    [native code]\n}\n"){
obj.toString=_13.toString;
}
}
return obj;
};
dojo.mixin=function(obj,_17){
if(!obj){
obj={};
}
for(var i=1,l=arguments.length;i<l;i++){
d._mixin(obj,arguments[i]);
}
return obj;
};
dojo._getProp=function(_1a,_1b,_1c){
var obj=_1c||d.global;
for(var i=0,p;obj&&(p=_1a[i]);i++){
if(i==0&&this._scopeMap[p]){
p=this._scopeMap[p];
}
obj=(p in obj?obj[p]:(_1b?obj[p]={}:undefined));
}
return obj;
};
dojo.setObject=function(_20,_21,_22){
var _23=_20.split("."),p=_23.pop(),obj=d._getProp(_23,true,_22);
return obj&&p?(obj[p]=_21):undefined;
};
dojo.getObject=function(_26,_27,_28){
return d._getProp(_26.split("."),_27,_28);
};
dojo.exists=function(_29,obj){
return !!d.getObject(_29,false,obj);
};
dojo["eval"]=function(_2b){
return d.global.eval?d.global.eval(_2b):eval(_2b);
};
d.deprecated=d.experimental=function(){
};
})();
(function(){
var d=dojo;
d.mixin(d,{_loadedModules:{},_inFlightCount:0,_hasResource:{},_modulePrefixes:{dojo:{name:"dojo",value:"."},doh:{name:"doh",value:"../util/doh"},tests:{name:"tests",value:"tests"}},_moduleHasPrefix:function(_2d){
var mp=this._modulePrefixes;
return !!(mp[_2d]&&mp[_2d].value);
},_getModulePrefix:function(_2f){
var mp=this._modulePrefixes;
if(this._moduleHasPrefix(_2f)){
return mp[_2f].value;
}
return _2f;
},_loadedUrls:[],_postLoad:false,_loaders:[],_unloaders:[],_loadNotifying:false});
dojo._loadUriAndCheck=function(uri,_32,cb){
var ok=false;
try{
ok=this._loadUri(uri,cb);
}
catch(e){
console.error("failed loading "+uri+" with error: "+e);
}
return !!(ok&&this._loadedModules[_32]);
};
dojo.loaded=function(){
this._loadNotifying=true;
this._postLoad=true;
var mll=d._loaders;
this._loaders=[];
for(var x=0;x<mll.length;x++){
mll[x]();
}
this._loadNotifying=false;
if(d._postLoad&&d._inFlightCount==0&&mll.length){
d._callLoaded();
}
};
dojo.unloaded=function(){
var mll=d._unloaders;
while(mll.length){
(mll.pop())();
}
};
d._onto=function(arr,obj,fn){
if(!fn){
arr.push(obj);
}else{
if(fn){
var _3b=(typeof fn=="string")?obj[fn]:fn;
arr.push(function(){
_3b.call(obj);
});
}
}
};
dojo.addOnLoad=function(obj,_3d){
d._onto(d._loaders,obj,_3d);
if(d._postLoad&&d._inFlightCount==0&&!d._loadNotifying){
d._callLoaded();
}
};
var dca=d.config.addOnLoad;
if(dca){
d.addOnLoad[(dca instanceof Array?"apply":"call")](d,dca);
}
dojo._modulesLoaded=function(){
if(d._postLoad){
return;
}
if(d._inFlightCount>0){
console.warn("files still in flight!");
return;
}
d._callLoaded();
};
dojo._callLoaded=function(){
if(typeof setTimeout=="object"||(dojo.config.useXDomain&&d.isOpera)){
if(dojo.isAIR){
setTimeout(function(){
dojo.loaded();
},0);
}else{
setTimeout(dojo._scopeName+".loaded();",0);
}
}else{
d.loaded();
}
};
dojo._getModuleSymbols=function(_3f){
var _40=_3f.split(".");
for(var i=_40.length;i>0;i--){
var _42=_40.slice(0,i).join(".");
if((i==1)&&!this._moduleHasPrefix(_42)){
_40[0]="../"+_40[0];
}else{
var _43=this._getModulePrefix(_42);
if(_43!=_42){
_40.splice(0,i,_43);
break;
}
}
}
return _40;
};
dojo._global_omit_module_check=false;
dojo.loadInit=function(_44){
_44();
};
dojo._loadModule=dojo.require=function(_45,_46){
_46=this._global_omit_module_check||_46;
var _47=this._loadedModules[_45];
if(_47){
return _47;
}
var _48=this._getModuleSymbols(_45).join("/")+".js";
var _49=(!_46)?_45:null;
var ok=this._loadPath(_48,_49);
if(!ok&&!_46){
throw new Error("Could not load '"+_45+"'; last tried '"+_48+"'");
}
if(!_46&&!this._isXDomain){
_47=this._loadedModules[_45];
if(!_47){
throw new Error("symbol '"+_45+"' is not defined after loading '"+_48+"'");
}
}
return _47;
};
dojo.provide=function(_4b){
_4b=_4b+"";
return (d._loadedModules[_4b]=d.getObject(_4b,true));
};
dojo.platformRequire=function(_4c){
var _4d=_4c.common||[];
var _4e=_4d.concat(_4c[d._name]||_4c["default"]||[]);
for(var x=0;x<_4e.length;x++){
var _50=_4e[x];
if(_50.constructor==Array){
d._loadModule.apply(d,_50);
}else{
d._loadModule(_50);
}
}
};
dojo.requireIf=function(_51,_52){
if(_51===true){
var _53=[];
for(var i=1;i<arguments.length;i++){
_53.push(arguments[i]);
}
d.require.apply(d,_53);
}
};
dojo.requireAfterIf=d.requireIf;
dojo.registerModulePath=function(_55,_56){
d._modulePrefixes[_55]={name:_55,value:_56};
};
if(typeof dojo.config["useXDomain"]=="undefined"){
dojo.config.useXDomain=true;
}
dojo.registerModulePath("dojo","protocol://host_name/scayt_path/dojo");
dojo.registerModulePath("dijit","protocol://host_name/scayt_path/dijit");
dojo.registerModulePath("dojox","protocol://host_name/scayt_path/dojox");
dojo.requireLocalization=function(_57,_58,_59,_5a){
d.require("dojo.i18n");
d.i18n._requireLocalization.apply(d.hostenv,arguments);
};
var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$");
var ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$");
dojo._Url=function(){
var n=null;
var _a=arguments;
var uri=[_a[0]];
for(var i=1;i<_a.length;i++){
if(!_a[i]){
continue;
}
var _61=new d._Url(_a[i]+"");
var _62=new d._Url(uri[0]+"");
if(_61.path==""&&!_61.scheme&&!_61.authority&&!_61.query){
if(_61.fragment!=n){
_62.fragment=_61.fragment;
}
_61=_62;
}else{
if(!_61.scheme){
_61.scheme=_62.scheme;
if(!_61.authority){
_61.authority=_62.authority;
if(_61.path.charAt(0)!="/"){
var _63=_62.path.substring(0,_62.path.lastIndexOf("/")+1)+_61.path;
var _64=_63.split("/");
for(var j=0;j<_64.length;j++){
if(_64[j]=="."){
if(j==_64.length-1){
_64[j]="";
}else{
_64.splice(j,1);
j--;
}
}else{
if(j>0&&!(j==1&&_64[0]=="")&&_64[j]==".."&&_64[j-1]!=".."){
if(j==(_64.length-1)){
_64.splice(j,1);
_64[j-1]="";
}else{
_64.splice(j-1,2);
j-=2;
}
}
}
}
_61.path=_64.join("/");
}
}
}
}
uri=[];
if(_61.scheme){
uri.push(_61.scheme,":");
}
if(_61.authority){
uri.push("//",_61.authority);
}
uri.push(_61.path);
if(_61.query){
uri.push("?",_61.query);
}
if(_61.fragment){
uri.push("#",_61.fragment);
}
}
this.uri=uri.join("");
var r=this.uri.match(ore);
this.scheme=r[2]||(r[1]?"":n);
this.authority=r[4]||(r[3]?"":n);
this.path=r[5];
this.query=r[7]||(r[6]?"":n);
this.fragment=r[9]||(r[8]?"":n);
if(this.authority!=n){
r=this.authority.match(ire);
this.user=r[3]||n;
this.password=r[4]||n;
this.host=r[6]||r[7];
this.port=r[9]||n;
}
};
dojo._Url.prototype.toString=function(){
return this.uri;
};
dojo.moduleUrl=function(_67,url){
var loc=d._getModuleSymbols(_67).join("/");
if(!loc){
return null;
}
if(loc.lastIndexOf("/")!=loc.length-1){
loc+="/";
}
var _6a=loc.indexOf(":");
if(loc.charAt(0)!="/"&&(_6a==-1||_6a>loc.indexOf("/"))){
loc=d.baseUrl+loc;
}
return new d._Url(loc,url);
};
})();
dojo.provide("dojo._base._loader.loader_xd");
dojo._xdReset=function(){
this._isXDomain=dojo.config.useXDomain||false;
this._xdTimer=0;
this._xdInFlight={};
this._xdOrderedReqs=[];
this._xdDepMap={};
this._xdContents=[];
this._xdDefList=[];
};
dojo._xdReset();
dojo._xdCreateResource=function(_6b,_6c,_6d){
var _6e=_6b.replace(/(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/mg,"");
var _6f=[];
var _70=/dojo.(require|requireIf|provide|requireAfterIf|platformRequire|requireLocalization)\s*\(([\w\W]*?)\)/mg;
var _71;
while((_71=_70.exec(_6e))!=null){
if(_71[1]=="requireLocalization"){
eval(_71[0]);
}else{
_6f.push("\""+_71[1]+"\", "+_71[2]);
}
}
var _72=[];
_72.push(dojo._scopeName+"._xdResourceLoaded(function("+dojo._scopePrefixArgs+"){\n");
var _73=dojo._xdExtractLoadInits(_6b);
if(_73){
_6b=_73[0];
for(var i=1;i<_73.length;i++){
_72.push(_73[i]+";\n");
}
}
_72.push("return {");
if(_6f.length>0){
_72.push("depends: [");
for(i=0;i<_6f.length;i++){
if(i>0){
_72.push(",\n");
}
_72.push("["+_6f[i]+"]");
}
_72.push("],");
}
_72.push("\ndefineResource: function("+dojo._scopePrefixArgs+"){");
if(!dojo.config["debugAtAllCosts"]||_6c=="dojo._base._loader.loader_debug"){
_72.push(_6b);
}
_72.push("\n}, resourceName: '"+_6c+"', resourcePath: '"+_6d+"'};});");
return _72.join("");
};
dojo._xdExtractLoadInits=function(_75){
var _76=/dojo.loadInit\s*\(/g;
_76.lastIndex=0;
var _77=/[\(\)]/g;
_77.lastIndex=0;
var _78=[];
var _79;
while((_79=_76.exec(_75))){
_77.lastIndex=_76.lastIndex;
var _7a=1;
var _7b;
while((_7b=_77.exec(_75))){
if(_7b[0]==")"){
_7a-=1;
}else{
_7a+=1;
}
if(_7a==0){
break;
}
}
if(_7a!=0){
throw "unmatched paren around character "+_77.lastIndex+" in: "+_75;
}
var _7c=_76.lastIndex-_79[0].length;
_78.push(_75.substring(_7c,_77.lastIndex));
var _7d=_77.lastIndex-_7c;
_75=_75.substring(0,_7c)+_75.substring(_77.lastIndex,_75.length);
_76.lastIndex=_77.lastIndex-_7d;
_76.lastIndex=_77.lastIndex;
}
if(_78.length>0){
_78.unshift(_75);
}
return (_78.length?_78:null);
};
dojo._xdIsXDomainPath=function(_7e){
var _7f=_7e.indexOf(":");
var _80=_7e.indexOf("/");
if(_7f>0&&_7f<_80){
return true;
}else{
var url=this.baseUrl;
_7f=url.indexOf(":");
_80=url.indexOf("/");
if(_7f>0&&_7f<_80&&(!location.host||url.indexOf("http://"+location.host)!=0)){
return true;
}
}
return false;
};
dojo._loadPath=function(_82,_83,cb){
var _85=this._xdIsXDomainPath(_82);
this._isXDomain|=_85;
var uri=((_82.charAt(0)=="/"||_82.match(/^\w+:/))?"":this.baseUrl)+_82;
try{
return ((!_83||this._isXDomain)?this._loadUri(uri,cb,_85,_83):this._loadUriAndCheck(uri,_83,cb));
}
catch(e){
console.error(e);
return false;
}
};
dojo._loadUri=function(uri,cb,_89,_8a){
if(this._loadedUrls[uri]){
return 1;
}
if(this._isXDomain&&_8a&&_8a!="dojo.i18n"){
this._xdOrderedReqs.push(_8a);
if(_89||uri.indexOf("/nls/")==-1){
this._xdInFlight[_8a]=true;
this._inFlightCount++;
}
if(!this._xdTimer){
if(dojo.isAIR){
this._xdTimer=setInterval(function(){
dojo._xdWatchInFlight();
},100);
}else{
this._xdTimer=setInterval(dojo._scopeName+"._xdWatchInFlight();",100);
}
}
this._xdStartTime=(new Date()).getTime();
}
if(_89){
var _8b=uri.lastIndexOf(".");
if(_8b<=0){
_8b=uri.length-1;
}
var _8c=uri.substring(0,_8b)+".xd";
if(_8b!=uri.length-1){
_8c+=uri.substring(_8b,uri.length);
}
if(dojo.isAIR){
_8c=_8c.replace("app:/","/");
}
var _8d=document.createElement("script");
_8d.type="text/javascript";
_8d.src=_8c+"?";
if(!this.headElement){
this._headElement=document.getElementsByTagName("head")[0];
if(!this._headElement){
this._headElement=document.getElementsByTagName("html")[0];
}
}
this._headElement.appendChild(_8d);
}else{
var _8e=this._getText(uri,null,true);
if(_8e==null){
return 0;
}
if(this._isXDomain&&uri.indexOf("/nls/")==-1&&_8a!="dojo.i18n"){
var res=this._xdCreateResource(_8e,_8a,uri);
dojo.eval(res);
}else{
if(cb){
_8e="("+_8e+")";
}else{
_8e=this._scopePrefix+_8e+this._scopeSuffix;
}
var _90=dojo["eval"](_8e+"\r\n//@ sourceURL="+uri);
if(cb){
cb(_90);
}
}
}
this._loadedUrls[uri]=true;
this._loadedUrls.push(uri);
return true;
};
dojo._xdResourceLoaded=function(res){
res=res.apply(dojo.global,dojo._scopeArgs);
var _92=res.depends;
var _93=null;
var _94=null;
var _95=[];
if(_92&&_92.length>0){
var dep=null;
var _97=0;
var _98=false;
for(var i=0;i<_92.length;i++){
dep=_92[i];
if(dep[0]=="provide"){
_95.push(dep[1]);
}else{
if(!_93){
_93=[];
}
if(!_94){
_94=[];
}
var _9a=this._xdUnpackDependency(dep);
if(_9a.requires){
_93=_93.concat(_9a.requires);
}
if(_9a.requiresAfter){
_94=_94.concat(_9a.requiresAfter);
}
}
var _9b=dep[0];
var _9c=_9b.split(".");
if(_9c.length==2){
dojo[_9c[0]][_9c[1]].apply(dojo[_9c[0]],dep.slice(1));
}else{
dojo[_9b].apply(dojo,dep.slice(1));
}
}
if(_95.length==1&&_95[0]=="dojo._base._loader.loader_debug"){
res.defineResource(dojo);
}else{
var _9d=this._xdContents.push({content:res.defineResource,resourceName:res["resourceName"],resourcePath:res["resourcePath"],isDefined:false})-1;
for(i=0;i<_95.length;i++){
this._xdDepMap[_95[i]]={requires:_93,requiresAfter:_94,contentIndex:_9d};
}
}
for(i=0;i<_95.length;i++){
this._xdInFlight[_95[i]]=false;
}
}
};
dojo._xdLoadFlattenedBundle=function(_9e,_9f,_a0,_a1){
_a0=_a0||"root";
var _a2=dojo.i18n.normalizeLocale(_a0).replace("-","_");
var _a3=[_9e,"nls",_9f].join(".");
var _a4=dojo["provide"](_a3);
_a4[_a2]=_a1;
var _a5=[_9e,_a2,_9f].join(".");
var _a6=dojo._xdBundleMap[_a5];
if(_a6){
for(var _a7 in _a6){
_a4[_a7]=_a1;
}
}
};
dojo._xdInitExtraLocales=function(){
var _a8=dojo.config.extraLocale;
if(_a8){
if(!_a8 instanceof Array){
_a8=[_a8];
}
dojo._xdReqLoc=dojo.xdRequireLocalization;
dojo.xdRequireLocalization=function(m,b,_ab,_ac){
dojo._xdReqLoc(m,b,_ab,_ac);
if(_ab){
return;
}
for(var i=0;i<_a8.length;i++){
dojo._xdReqLoc(m,b,_a8[i],_ac);
}
};
}
};
dojo._xdBundleMap={};
dojo.xdRequireLocalization=function(_ae,_af,_b0,_b1){
if(dojo._xdInitExtraLocales){
dojo._xdInitExtraLocales();
dojo._xdInitExtraLocales=null;
dojo.xdRequireLocalization.apply(dojo,arguments);
return;
}
var _b2=_b1.split(",");
var _b3=dojo.i18n.normalizeLocale(_b0);
var _b4=_b3;
var _b5=_b4.replace("-","_");
var _b6=dojo.getObject([_ae,"nls",_af].join("."));
if(_b6&&_b6[_b5]){
_b7[_b3.replace("-","_")]=_b6[_b5];
}else{
var _b8=[_ae,(_b5||"root"),_af].join(".");
var _b7=dojo._xdBundleMap[_b8];
if(!_b7){
_b7=dojo._xdBundleMap[_b8]={};
}
_b7[_b3.replace("-","_")]=true;
dojo.require(_ae+".nls"+(_b4?"."+_b4:"")+"."+_af);
}
};
dojo._xdRealRequireLocalization=dojo.requireLocalization;
dojo.requireLocalization=function(_b9,_ba,_bb,_bc){
var _bd=this.moduleUrl(_b9).toString();
if(this._xdIsXDomainPath(_bd)){
return dojo.xdRequireLocalization.apply(dojo,arguments);
}else{
return dojo._xdRealRequireLocalization.apply(dojo,arguments);
}
};
dojo._xdUnpackDependency=function(dep){
var _bf=null;
var _c0=null;
switch(dep[0]){
case "requireIf":
case "requireAfterIf":
if(dep[1]===true){
_bf=[{name:dep[2],content:null}];
}
break;
case "platformRequire":
var _c1=dep[1];
var _c2=_c1["common"]||[];
_bf=(_c1[dojo.hostenv.name_])?_c2.concat(_c1[dojo.hostenv.name_]||[]):_c2.concat(_c1["default"]||[]);
if(_bf){
for(var i=0;i<_bf.length;i++){
if(_bf[i] instanceof Array){
_bf[i]={name:_bf[i][0],content:null};
}else{
_bf[i]={name:_bf[i],content:null};
}
}
}
break;
case "require":
_bf=[{name:dep[1],content:null}];
break;
case "i18n._preloadLocalizations":
dojo.i18n._preloadLocalizations.apply(dojo.i18n._preloadLocalizations,dep.slice(1));
break;
}
if(dep[0]=="requireAfterIf"||dep[0]=="requireIf"){
_c0=_bf;
_bf=null;
}
return {requires:_bf,requiresAfter:_c0};
};
dojo._xdWalkReqs=function(){
var _c4=null;
var req;
for(var i=0;i<this._xdOrderedReqs.length;i++){
req=this._xdOrderedReqs[i];
if(this._xdDepMap[req]){
_c4=[req];
_c4[req]=true;
this._xdEvalReqs(_c4);
}
}
};
dojo._xdEvalReqs=function(_c7){
while(_c7.length>0){
var req=_c7[_c7.length-1];
var res=this._xdDepMap[req];
var i,_cb,_cc;
if(res){
_cb=res.requires;
if(_cb&&_cb.length>0){
for(i=0;i<_cb.length;i++){
_cc=_cb[i].name;
if(_cc&&!_c7[_cc]){
_c7.push(_cc);
_c7[_cc]=true;
this._xdEvalReqs(_c7);
}
}
}
var _cd=this._xdContents[res.contentIndex];
if(!_cd.isDefined){
var _ce=_cd.content;
_ce["resourceName"]=_cd["resourceName"];
_ce["resourcePath"]=_cd["resourcePath"];
this._xdDefList.push(_ce);
_cd.isDefined=true;
}
this._xdDepMap[req]=null;
_cb=res.requiresAfter;
if(_cb&&_cb.length>0){
for(i=0;i<_cb.length;i++){
_cc=_cb[i].name;
if(_cc&&!_c7[_cc]){
_c7.push(_cc);
_c7[_cc]=true;
this._xdEvalReqs(_c7);
}
}
}
}
_c7.pop();
}
};
dojo._xdClearInterval=function(){
clearInterval(this._xdTimer);
this._xdTimer=0;
};
dojo._xdWatchInFlight=function(){
var _cf="";
var _d0=(dojo.config.xdWaitSeconds||15)*1000;
var _d1=(this._xdStartTime+_d0)<(new Date()).getTime();
for(var _d2 in this._xdInFlight){
if(this._xdInFlight[_d2]===true){
if(_d1){
_cf+=_d2+" ";
}else{
return;
}
}
}
this._xdClearInterval();
if(_d1){
throw "Could not load cross-domain resources: "+_cf;
}
this._xdWalkReqs();
var _d3=this._xdDefList.length;
for(var i=0;i<_d3;i++){
var _d5=dojo._xdDefList[i];
if(dojo.config["debugAtAllCosts"]&&_d5["resourceName"]){
if(!this["_xdDebugQueue"]){
this._xdDebugQueue=[];
}
this._xdDebugQueue.push({resourceName:_d5.resourceName,resourcePath:_d5.resourcePath});
}else{
_d5.apply(dojo.global,dojo._scopeArgs);
}
}
for(i=0;i<this._xdContents.length;i++){
var _d6=this._xdContents[i];
if(_d6.content&&!_d6.isDefined){
_d6.content.apply(dojo.global,dojo._scopeArgs);
}
}
this._xdReset();
if(this["_xdDebugQueue"]&&this._xdDebugQueue.length>0){
this._xdDebugFileLoaded();
}else{
this._xdNotifyLoaded();
}
};
dojo._xdNotifyLoaded=function(){
this._inFlightCount=0;
if(this._initFired&&!this._loadNotifying){
this._callLoaded();
}
};
if(typeof window!="undefined"){
dojo.isBrowser=true;
dojo._name="browser";
(function(){
var d=dojo;
if(document&&document.getElementsByTagName){
var _d8=document.getElementsByTagName("script");
var _d9=/dojo(\.xd)?\.js(\W|$)/i;
for(var i=0;i<_d8.length;i++){
var src=_d8[i].getAttribute("src");
if(!src){
continue;
}
var m=src.match(_d9);
if(m){
if(!d.config.baseUrl){
d.config.baseUrl=src.substring(0,m.index);
}
var cfg=_d8[i].getAttribute("djConfig");
if(cfg){
var _de=eval("({ "+cfg+" })");
for(var x in _de){
dojo.config[x]=_de[x];
}
}
break;
}
}
}
d.baseUrl=d.config.baseUrl;
var n=navigator;
var dua=n.userAgent,dav=n.appVersion,tv=parseFloat(dav);
if(dua.indexOf("Opera")>=0){
d.isOpera=tv;
}
if(dua.indexOf("AdobeAIR")>=0){
d.isAIR=1;
}
d.isKhtml=(dav.indexOf("Konqueror")>=0)?tv:0;
d.isWebKit=parseFloat(dua.split("WebKit/")[1])||undefined;
d.isChrome=parseFloat(dua.split("Chrome/")[1])||undefined;
var _e4=Math.max(dav.indexOf("WebKit"),dav.indexOf("Safari"),0);
if(_e4&&!dojo.isChrome){
d.isSafari=parseFloat(dav.split("Version/")[1]);
if(!d.isSafari||parseFloat(dav.substr(_e4+7))<=419.3){
d.isSafari=2;
}
}
if(dua.indexOf("Gecko")>=0&&!d.isKhtml&&!d.isWebKit){
d.isMozilla=d.isMoz=tv;
}
if(d.isMoz){
d.isFF=parseFloat(dua.split("Firefox/")[1]||dua.split("Minefield/")[1]||dua.split("Shiretoko/")[1])||undefined;
}
if(document.all&&!d.isOpera){
d.isIE=parseFloat(dav.split("MSIE ")[1])||undefined;
if(d.isIE>=8&&document.documentMode!=5){
d.isIE=document.documentMode;
}
}
if(dojo.isIE&&window.location.protocol==="file:"){
dojo.config.ieForceActiveXXhr=true;
}
var cm=document.compatMode;
d.isQuirks=cm=="BackCompat"||cm=="QuirksMode"||d.isIE<6;
d.locale=dojo.config.locale||(d.isIE?n.userLanguage:n.language).toLowerCase();
d._XMLHTTP_PROGIDS=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];
d._xhrObj=function(){
var _e6,_e7;
if(!dojo.isIE||!dojo.config.ieForceActiveXXhr){
try{
_e6=new XMLHttpRequest();
}
catch(e){
}
}
if(!_e6){
for(var i=0;i<3;++i){
var _e9=d._XMLHTTP_PROGIDS[i];
try{
_e6=new ActiveXObject(_e9);
}
catch(e){
_e7=e;
}
if(_e6){
d._XMLHTTP_PROGIDS=[_e9];
break;
}
}
}
if(!_e6){
throw new Error("XMLHTTP not available: "+_e7);
}
return _e6;
};
d._isDocumentOk=function(_ea){
var _eb=_ea.status||0;
return (_eb>=200&&_eb<300)||_eb==304||_eb==1223||(!_eb&&(location.protocol=="file:"||location.protocol=="chrome:"));
};
var _ec=window.location+"";
var _ed=document.getElementsByTagName("base");
var _ee=(_ed&&_ed.length>0);
d._getText=function(uri,_f0){
var _f1=this._xhrObj();
if(!_ee&&dojo._Url){
uri=(new dojo._Url(_ec,uri)).toString();
}
if(d.config.cacheBust){
uri+="";
uri+=(uri.indexOf("?")==-1?"?":"&")+String(d.config.cacheBust).replace(/\W+/g,"");
}
_f1.open("GET",uri,false);
try{
_f1.send(null);
if(!d._isDocumentOk(_f1)){
var err=Error("Unable to load "+uri+" status:"+_f1.status);
err.status=_f1.status;
err.responseText=_f1.responseText;
throw err;
}
}
catch(e){
if(_f0){
return null;
}
throw e;
}
return _f1.responseText;
};
var _w=window;
var _f4=function(_f5,fp){
var _f7=_w[_f5]||function(){
};
_w[_f5]=function(){
fp.apply(_w,arguments);
_f7.apply(_w,arguments);
};
};
d._windowUnloaders=[];
d.windowUnloaded=function(){
var mll=d._windowUnloaders;
while(mll.length){
(mll.pop())();
}
};
var _f9=0;
d.addOnWindowUnload=function(obj,_fb){
d._onto(d._windowUnloaders,obj,_fb);
if(!_f9){
_f9=1;
_f4("onunload",d.windowUnloaded);
}
};
var _fc=0;
d.addOnUnload=function(obj,_fe){
d._onto(d._unloaders,obj,_fe);
if(!_fc){
_fc=1;
_f4("onbeforeunload",dojo.unloaded);
}
};
})();
dojo._initFired=false;
dojo._loadInit=function(e){
dojo._initFired=true;
var type=e&&e.type?e.type.toLowerCase():"load";
if(arguments.callee.initialized||(type!="domcontentloaded"&&type!="load")){
return;
}
arguments.callee.initialized=true;
if("_khtmlTimer" in dojo){
clearInterval(dojo._khtmlTimer);
delete dojo._khtmlTimer;
}
if(dojo._inFlightCount==0){
dojo._modulesLoaded();
}
};
if(!dojo.config.afterOnLoad){
if(document.addEventListener){
if(dojo.isWebKit>525||dojo.isOpera||dojo.isFF>=3||(dojo.isMoz&&dojo.config.enableMozDomContentLoaded===true)){
document.addEventListener("DOMContentLoaded",dojo._loadInit,null);
}
window.addEventListener("load",dojo._loadInit,null);
}
if(dojo.isAIR){
window.addEventListener("load",dojo._loadInit,null);
}else{
if((dojo.isWebKit<525)||dojo.isKhtml){
dojo._khtmlTimer=setInterval(function(){
if(/loaded|complete/.test(document.readyState)){
dojo._loadInit();
}
},10);
}
}
}
if(dojo.isIE){
if(!dojo.config.afterOnLoad){
document.write("<scr"+"ipt defer src=\"//:\" "+"onreadystatechange=\"if(this.readyState=='complete'){"+dojo._scopeName+"._loadInit();}\">"+"</scr"+"ipt>");
}
try{
document.namespaces.add("v","urn:schemas-microsoft-com:vml");
document.createStyleSheet().addRule("v\\:*","behavior:url(#default#VML);  display:inline-block");
}
catch(e){
}
}
}
(function(){
var mp=dojo.config["modulePaths"];
if(mp){
for(var _102 in mp){
dojo.registerModulePath(_102,mp[_102]);
}
}
})();
if(dojo.config.isDebug){
dojo.require("dojo._firebug.firebug");
}
if(dojo.config.debugAtAllCosts){
dojo.config.useXDomain=true;
dojo.require("dojo._base._loader.loader_xd");
dojo.require("dojo._base._loader.loader_debug");
}
if(!dojo._hasResource["dojo._base.lang"]){
dojo._hasResource["dojo._base.lang"]=true;
dojo.provide("dojo._base.lang");
dojo.isString=function(it){
return !!arguments.length&&it!=null&&(typeof it=="string"||it instanceof String);
};
dojo.isArray=function(it){
return it&&(it instanceof Array||typeof it=="array");
};
dojo.isFunction=(function(){
var _105=function(it){
var t=typeof it;
return it&&(t=="function"||it instanceof Function);
};
return dojo.isSafari?function(it){
if(typeof it=="function"&&it=="[object NodeList]"){
return false;
}
return _105(it);
}:_105;
})();
dojo.isObject=function(it){
return it!==undefined&&(it===null||typeof it=="object"||dojo.isArray(it)||dojo.isFunction(it));
};
dojo.isArrayLike=function(it){
var d=dojo;
return it&&it!==undefined&&!d.isString(it)&&!d.isFunction(it)&&!(it.tagName&&it.tagName.toLowerCase()=="form")&&(d.isArray(it)||isFinite(it.length));
};
dojo.isAlien=function(it){
return it&&!dojo.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));
};
dojo.extend=function(_10d,_10e){
for(var i=1,l=arguments.length;i<l;i++){
dojo._mixin(_10d.prototype,arguments[i]);
}
return _10d;
};
dojo._hitchArgs=function(_111,_112){
var pre=dojo._toArray(arguments,2);
var _114=dojo.isString(_112);
return function(){
var args=dojo._toArray(arguments);
var f=_114?(_111||dojo.global)[_112]:_112;
return f&&f.apply(_111||this,pre.concat(args));
};
};
dojo.hitch=function(_117,_118){
if(arguments.length>2){
return dojo._hitchArgs.apply(dojo,arguments);
}
if(!_118){
_118=_117;
_117=null;
}
if(dojo.isString(_118)){
_117=_117||dojo.global;
if(!_117[_118]){
throw (["dojo.hitch: scope[\"",_118,"\"] is null (scope=\"",_117,"\")"].join(""));
}
return function(){
return _117[_118].apply(_117,arguments||[]);
};
}
return !_117?_118:function(){
return _118.apply(_117,arguments||[]);
};
};
dojo.delegate=dojo._delegate=(function(){
function TMP(){
};
return function(obj,_11b){
TMP.prototype=obj;
var tmp=new TMP();
if(_11b){
dojo._mixin(tmp,_11b);
}
return tmp;
};
})();
(function(){
var _11d=function(obj,_11f,_120){
return (_120||[]).concat(Array.prototype.slice.call(obj,_11f||0));
};
var slow=function(obj,_123,_124){
var arr=_124||[];
for(var x=_123||0;x<obj.length;x++){
arr.push(obj[x]);
}
return arr;
};
dojo._toArray=dojo.isIE?function(obj){
return ((obj.item)?slow:_11d).apply(this,arguments);
}:_11d;
})();
dojo.partial=function(_128){
var arr=[null];
return dojo.hitch.apply(dojo,arr.concat(dojo._toArray(arguments)));
};
dojo.clone=function(o){
if(!o){
return o;
}
if(dojo.isArray(o)){
var r=[];
for(var i=0;i<o.length;++i){
r.push(dojo.clone(o[i]));
}
return r;
}
if(!dojo.isObject(o)){
return o;
}
if(o.nodeType&&o.cloneNode){
return o.cloneNode(true);
}
if(o instanceof Date){
return new Date(o.getTime());
}
r=new o.constructor();
for(i in o){
if(!(i in r)||r[i]!=o[i]){
r[i]=dojo.clone(o[i]);
}
}
return r;
};
dojo.trim=String.prototype.trim?function(str){
return str.trim();
}:function(str){
return str.replace(/^\s\s*/,"").replace(/\s\s*$/,"");
};
}
if(!dojo._hasResource["dojo._base.declare"]){
dojo._hasResource["dojo._base.declare"]=true;
dojo.provide("dojo._base.declare");
dojo.declare=function(_12f,_130,_131){
var dd=arguments.callee,_133;
if(dojo.isArray(_130)){
_133=_130;
_130=_133.shift();
}
if(_133){
dojo.forEach(_133,function(m,i){
if(!m){
throw (_12f+": mixin #"+i+" is null");
}
_130=dd._delegate(_130,m);
});
}
var ctor=dd._delegate(_130);
_131=_131||{};
ctor.extend(_131);
dojo.extend(ctor,{declaredClass:_12f,_constructor:_131.constructor});
ctor.prototype.constructor=ctor;
return dojo.setObject(_12f,ctor);
};
dojo.mixin(dojo.declare,{_delegate:function(base,_138){
var bp=(base||0).prototype,mp=(_138||0).prototype,dd=dojo.declare;
var ctor=dd._makeCtor();
dojo.mixin(ctor,{superclass:bp,mixin:mp,extend:dd._extend});
if(base){
ctor.prototype=dojo._delegate(bp);
}
dojo.extend(ctor,dd._core,mp||0,{_constructor:null,preamble:null});
ctor.prototype.constructor=ctor;
ctor.prototype.declaredClass=(bp||0).declaredClass+"_"+(mp||0).declaredClass;
return ctor;
},_extend:function(_13d){
var i,fn;
for(i in _13d){
if(dojo.isFunction(fn=_13d[i])&&!0[i]){
fn.nom=i;
fn.ctor=this;
}
}
dojo.extend(this,_13d);
},_makeCtor:function(){
return function(){
this._construct(arguments);
};
},_core:{_construct:function(args){
var c=args.callee,s=c.superclass,ct=s&&s.constructor,m=c.mixin,mct=m&&m.constructor,a=args,ii,fn;
if(a[0]){
if(((fn=a[0].preamble))){
a=fn.apply(this,a)||a;
}
}
if((fn=c.prototype.preamble)){
a=fn.apply(this,a)||a;
}
if(ct&&ct.apply){
ct.apply(this,a);
}
if(mct&&mct.apply){
mct.apply(this,a);
}
if((ii=c.prototype._constructor)){
ii.apply(this,args);
}
if(this.constructor.prototype==c.prototype&&(ct=this.postscript)){
ct.apply(this,args);
}
},_findMixin:function(_149){
var c=this.constructor,p,m;
while(c){
p=c.superclass;
m=c.mixin;
if(m==_149||(m instanceof _149.constructor)){
return p;
}
if(m&&m._findMixin&&(m=m._findMixin(_149))){
return m;
}
c=p&&p.constructor;
}
},_findMethod:function(name,_14e,_14f,has){
var p=_14f,c,m,f;
do{
c=p.constructor;
m=c.mixin;
if(m&&(m=this._findMethod(name,_14e,m,has))){
return m;
}
if((f=p[name])&&(has==(f==_14e))){
return p;
}
p=c.superclass;
}while(p);
return !has&&(p=this._findMixin(_14f))&&this._findMethod(name,_14e,p,has);
},inherited:function(name,args,_157){
var a=arguments;
if(!dojo.isString(a[0])){
_157=args;
args=name;
name=args.callee.nom;
}
a=_157||args;
var c=args.callee,p=this.constructor.prototype,fn,mp;
if(this[name]!=c||p[name]==c){
mp=(c.ctor||0).superclass||this._findMethod(name,c,p,true);
if(!mp){
throw (this.declaredClass+": inherited method \""+name+"\" mismatch");
}
p=this._findMethod(name,c,mp,false);
}
fn=p&&p[name];
if(!fn){
throw (mp.declaredClass+": inherited method \""+name+"\" not found");
}
return fn.apply(this,a);
}}});
}
if(!dojo._hasResource["dojo._base.connect"]){
dojo._hasResource["dojo._base.connect"]=true;
dojo.provide("dojo._base.connect");
dojo._listener={getDispatcher:function(){
return function(){
var ap=Array.prototype,c=arguments.callee,ls=c._listeners,t=c.target;
var r=t&&t.apply(this,arguments);
var lls;
lls=[].concat(ls);
for(var i in lls){
if(!(i in ap)){
lls[i].apply(this,arguments);
}
}
return r;
};
},add:function(_164,_165,_166){
_164=_164||dojo.global;
var f=_164[_165];
if(!f||!f._listeners){
var d=dojo._listener.getDispatcher();
d.target=f;
d._listeners=[];
f=_164[_165]=d;
}
return f._listeners.push(_166);
},remove:function(_169,_16a,_16b){
var f=(_169||dojo.global)[_16a];
if(f&&f._listeners&&_16b--){
delete f._listeners[_16b];
}
}};
dojo.connect=function(obj,_16e,_16f,_170,_171){
var a=arguments,args=[],i=0;
args.push(dojo.isString(a[0])?null:a[i++],a[i++]);
var a1=a[i+1];
args.push(dojo.isString(a1)||dojo.isFunction(a1)?a[i++]:null,a[i++]);
for(var l=a.length;i<l;i++){
args.push(a[i]);
}
return dojo._connect.apply(this,args);
};
dojo._connect=function(obj,_177,_178,_179){
var l=dojo._listener,h=l.add(obj,_177,dojo.hitch(_178,_179));
return [obj,_177,h,l];
};
dojo.disconnect=function(_17c){
if(_17c&&_17c[0]!==undefined){
dojo._disconnect.apply(this,_17c);
delete _17c[0];
}
};
dojo._disconnect=function(obj,_17e,_17f,_180){
_180.remove(obj,_17e,_17f);
};
dojo._topics={};
dojo.subscribe=function(_181,_182,_183){
return [_181,dojo._listener.add(dojo._topics,_181,dojo.hitch(_182,_183))];
};
dojo.unsubscribe=function(_184){
if(_184){
dojo._listener.remove(dojo._topics,_184[0],_184[1]);
}
};
dojo.publish=function(_185,args){
var f=dojo._topics[_185];
if(f){
f.apply(this,args||[]);
}
};
dojo.connectPublisher=function(_188,obj,_18a){
var pf=function(){
dojo.publish(_188,arguments);
};
return (_18a)?dojo.connect(obj,_18a,pf):dojo.connect(obj,pf);
};
}
if(!dojo._hasResource["dojo._base.Deferred"]){
dojo._hasResource["dojo._base.Deferred"]=true;
dojo.provide("dojo._base.Deferred");
dojo.Deferred=function(_18c){
this.chain=[];
this.id=this._nextId();
this.fired=-1;
this.paused=0;
this.results=[null,null];
this.canceller=_18c;
this.silentlyCancelled=false;
};
dojo.extend(dojo.Deferred,{_nextId:(function(){
var n=1;
return function(){
return n++;
};
})(),cancel:function(){
var err;
if(this.fired==-1){
if(this.canceller){
err=this.canceller(this);
}else{
this.silentlyCancelled=true;
}
if(this.fired==-1){
if(!(err instanceof Error)){
var res=err;
var msg="Deferred Cancelled";
if(err&&err.toString){
msg+=": "+err.toString();
}
err=new Error(msg);
err.dojoType="cancel";
err.cancelResult=res;
}
this.errback(err);
}
}else{
if((this.fired==0)&&(this.results[0] instanceof dojo.Deferred)){
this.results[0].cancel();
}
}
},_resback:function(res){
this.fired=((res instanceof Error)?1:0);
this.results[this.fired]=res;
this._fire();
},_check:function(){
if(this.fired!=-1){
if(!this.silentlyCancelled){
throw new Error("already called!");
}
this.silentlyCancelled=false;
return;
}
},callback:function(res){
this._check();
this._resback(res);
},errback:function(res){
this._check();
if(!(res instanceof Error)){
res=new Error(res);
}
this._resback(res);
},addBoth:function(cb,cbfn){
var _196=dojo.hitch.apply(dojo,arguments);
return this.addCallbacks(_196,_196);
},addCallback:function(cb,cbfn){
return this.addCallbacks(dojo.hitch.apply(dojo,arguments));
},addErrback:function(cb,cbfn){
return this.addCallbacks(null,dojo.hitch.apply(dojo,arguments));
},addCallbacks:function(cb,eb){
this.chain.push([cb,eb]);
if(this.fired>=0){
this._fire();
}
return this;
},_fire:function(){
var _19d=this.chain;
var _19e=this.fired;
var res=this.results[_19e];
var self=this;
var cb=null;
while((_19d.length>0)&&(this.paused==0)){
var f=_19d.shift()[_19e];
if(!f){
continue;
}
var func=function(){
var ret=f(res);
if(typeof ret!="undefined"){
res=ret;
}
_19e=((res instanceof Error)?1:0);
if(res instanceof dojo.Deferred){
cb=function(res){
self._resback(res);
self.paused--;
if((self.paused==0)&&(self.fired>=0)){
self._fire();
}
};
this.paused++;
}
};
if(dojo.config.debugAtAllCosts){
func.call(this);
}else{
try{
func.call(this);
}
catch(err){
_19e=1;
res=err;
}
}
}
this.fired=_19e;
this.results[_19e]=res;
if((cb)&&(this.paused)){
res.addBoth(cb);
}
}});
}
if(!dojo._hasResource["dojo._base.json"]){
dojo._hasResource["dojo._base.json"]=true;
dojo.provide("dojo._base.json");
dojo.fromJson=function(json){
return eval("("+json+")");
};
dojo._escapeString=function(str){
return ("\""+str.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");
};
dojo.toJsonIndentStr="\t";
dojo.toJson=function(it,_1a9,_1aa){
if(it===undefined){
return "undefined";
}
var _1ab=typeof it;
if(_1ab=="number"||_1ab=="boolean"){
return it+"";
}
if(it===null){
return "null";
}
if(dojo.isString(it)){
return dojo._escapeString(it);
}
var _1ac=arguments.callee;
var _1ad;
_1aa=_1aa||"";
var _1ae=_1a9?_1aa+dojo.toJsonIndentStr:"";
var tf=it.__json__||it.json;
if(dojo.isFunction(tf)){
_1ad=tf.call(it);
if(it!==_1ad){
return _1ac(_1ad,_1a9,_1ae);
}
}
if(it.nodeType&&it.cloneNode){
throw new Error("Can't serialize DOM nodes");
}
var sep=_1a9?" ":"";
var _1b1=_1a9?"\n":"";
if(dojo.isArray(it)){
var res=dojo.map(it,function(obj){
var val=_1ac(obj,_1a9,_1ae);
if(typeof val!="string"){
val="undefined";
}
return _1b1+_1ae+val;
});
return "["+res.join(","+sep)+_1b1+_1aa+"]";
}
if(_1ab=="function"){
return null;
}
var _1b5=[],key;
for(key in it){
var _1b7,val;
if(typeof key=="number"){
_1b7="\""+key+"\"";
}else{
if(typeof key=="string"){
_1b7=dojo._escapeString(key);
}else{
continue;
}
}
val=_1ac(it[key],_1a9,_1ae);
if(typeof val!="string"){
continue;
}
_1b5.push(_1b1+_1ae+_1b7+":"+sep+val);
}
return "{"+_1b5.join(","+sep)+_1b1+_1aa+"}";
};
}
if(!dojo._hasResource["dojo._base.array"]){
dojo._hasResource["dojo._base.array"]=true;
dojo.provide("dojo._base.array");
(function(){
var _1b9=function(arr,obj,cb){
return [dojo.isString(arr)?arr.split(""):arr,obj||dojo.global,dojo.isString(cb)?new Function("item","index","array",cb):cb];
};
dojo.mixin(dojo,{indexOf:function(_1bd,_1be,_1bf,_1c0){
var step=1,end=_1bd.length||0,i=0;
if(_1c0){
i=end-1;
step=end=-1;
}
if(_1bf!=undefined){
i=_1bf;
}
if((_1c0&&i>end)||i<end){
for(;i!=end;i+=step){
if(_1bd[i]==_1be){
return i;
}
}
}
return -1;
},lastIndexOf:function(_1c3,_1c4,_1c5){
return dojo.indexOf(_1c3,_1c4,_1c5,true);
},forEach:function(arr,_1c7,_1c8){
if(!arr||!arr.length){
return;
}
var _p=_1b9(arr,_1c8,_1c7);
arr=_p[0];
for(var i=0,l=arr.length;i<l;++i){
_p[2].call(_p[1],arr[i],i,arr);
}
},_everyOrSome:function(_1cc,arr,_1ce,_1cf){
var _p=_1b9(arr,_1cf,_1ce);
arr=_p[0];
for(var i=0,l=arr.length;i<l;++i){
var _1d3=!!_p[2].call(_p[1],arr[i],i,arr);
if(_1cc^_1d3){
return _1d3;
}
}
return _1cc;
},every:function(arr,_1d5,_1d6){
return dojo._everyOrSome(true,arr,_1d5,_1d6);
},some:function(arr,_1d8,_1d9){
return dojo._everyOrSome(false,arr,_1d8,_1d9);
},map:function(arr,_1db,_1dc){
var _p=_1b9(arr,_1dc,_1db);
arr=_p[0];
var _1de=(arguments[3]?(new arguments[3]()):[]);
for(var i=0,l=arr.length;i<l;++i){
_1de.push(_p[2].call(_p[1],arr[i],i,arr));
}
return _1de;
},filter:function(arr,_1e2,_1e3){
var _p=_1b9(arr,_1e3,_1e2);
arr=_p[0];
var _1e5=[];
for(var i=0,l=arr.length;i<l;++i){
if(_p[2].call(_p[1],arr[i],i,arr)){
_1e5.push(arr[i]);
}
}
return _1e5;
}});
})();
}
if(!dojo._hasResource["dojo._base.Color"]){
dojo._hasResource["dojo._base.Color"]=true;
dojo.provide("dojo._base.Color");
(function(){
var d=dojo;
dojo.Color=function(_1e9){
if(_1e9){
this.setColor(_1e9);
}
};
dojo.Color.named={black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255]};
dojo.extend(dojo.Color,{r:255,g:255,b:255,a:1,_set:function(r,g,b,a){
var t=this;
t.r=r;
t.g=g;
t.b=b;
t.a=a;
},setColor:function(_1ef){
if(d.isString(_1ef)){
d.colorFromString(_1ef,this);
}else{
if(d.isArray(_1ef)){
d.colorFromArray(_1ef,this);
}else{
this._set(_1ef.r,_1ef.g,_1ef.b,_1ef.a);
if(!(_1ef instanceof d.Color)){
this.sanitize();
}
}
}
return this;
},sanitize:function(){
return this;
},toRgb:function(){
var t=this;
return [t.r,t.g,t.b];
},toRgba:function(){
var t=this;
return [t.r,t.g,t.b,t.a];
},toHex:function(){
var arr=d.map(["r","g","b"],function(x){
var s=this[x].toString(16);
return s.length<2?"0"+s:s;
},this);
return "#"+arr.join("");
},toCss:function(_1f5){
var t=this,rgb=t.r+", "+t.g+", "+t.b;
return (_1f5?"rgba("+rgb+", "+t.a:"rgb("+rgb)+")";
},toString:function(){
return this.toCss(true);
}});
dojo.blendColors=function(_1f8,end,_1fa,obj){
var t=obj||new d.Color();
d.forEach(["r","g","b","a"],function(x){
t[x]=_1f8[x]+(end[x]-_1f8[x])*_1fa;
if(x!="a"){
t[x]=Math.round(t[x]);
}
});
return t.sanitize();
};
dojo.colorFromRgb=function(_1fe,obj){
var m=_1fe.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);
return m&&dojo.colorFromArray(m[1].split(/\s*,\s*/),obj);
};
dojo.colorFromHex=function(_201,obj){
var t=obj||new d.Color(),bits=(_201.length==4)?4:8,mask=(1<<bits)-1;
_201=Number("0x"+_201.substr(1));
if(isNaN(_201)){
return null;
}
d.forEach(["b","g","r"],function(x){
var c=_201&mask;
_201>>=bits;
t[x]=bits==4?17*c:c;
});
t.a=1;
return t;
};
dojo.colorFromArray=function(a,obj){
var t=obj||new d.Color();
t._set(Number(a[0]),Number(a[1]),Number(a[2]),Number(a[3]));
if(isNaN(t.a)){
t.a=1;
}
return t.sanitize();
};
dojo.colorFromString=function(str,obj){
var a=d.Color.named[str];
return a&&d.colorFromArray(a,obj)||d.colorFromRgb(str,obj)||d.colorFromHex(str,obj);
};
})();
}
if(!dojo._hasResource["dojo._base"]){
dojo._hasResource["dojo._base"]=true;
dojo.provide("dojo._base");
}
if(!dojo._hasResource["dojo._base.window"]){
dojo._hasResource["dojo._base.window"]=true;
dojo.provide("dojo._base.window");
dojo.doc=window["document"]||null;
dojo.body=function(){
return dojo.doc.body||dojo.doc.getElementsByTagName("body")[0];
};
dojo.setContext=function(_20e,_20f){
dojo.global=_20e;
dojo.doc=_20f;
};
dojo.withGlobal=function(_210,_211,_212,_213){
var _214=dojo.global;
try{
dojo.global=_210;
return dojo.withDoc.call(null,_210.document,_211,_212,_213);
}
finally{
dojo.global=_214;
}
};
dojo.withDoc=function(_215,_216,_217,_218){
var _219=dojo.doc,_21a=dojo._bodyLtr;
try{
dojo.doc=_215;
delete dojo._bodyLtr;
if(_217&&dojo.isString(_216)){
_216=_217[_216];
}
return _216.apply(_217,_218||[]);
}
finally{
dojo.doc=_219;
if(_21a!==undefined){
dojo._bodyLtr=_21a;
}
}
};
}
if(!dojo._hasResource["dojo._base.event"]){
dojo._hasResource["dojo._base.event"]=true;
dojo.provide("dojo._base.event");
(function(){
var del=(dojo._event_listener={add:function(node,name,fp){
if(!node){
return;
}
name=del._normalizeEventName(name);
fp=del._fixCallback(name,fp);
var _21f=name;
if(!dojo.isIE&&(name=="mouseenter"||name=="mouseleave")){
var ofp=fp;
name=(name=="mouseenter")?"mouseover":"mouseout";
fp=function(e){
if(dojo.isFF<=2){
try{
e.relatedTarget.tagName;
}
catch(e2){
return;
}
}
if(!dojo.isDescendant(e.relatedTarget,node)){
return ofp.call(this,e);
}
};
}
node.addEventListener(name,fp,false);
return fp;
},remove:function(node,_223,_224){
if(node){
_223=del._normalizeEventName(_223);
if(!dojo.isIE&&(_223=="mouseenter"||_223=="mouseleave")){
_223=(_223=="mouseenter")?"mouseover":"mouseout";
}
node.removeEventListener(_223,_224,false);
}
},_normalizeEventName:function(name){
return name.slice(0,2)=="on"?name.slice(2):name;
},_fixCallback:function(name,fp){
return name!="keypress"?fp:function(e){
return fp.call(this,del._fixEvent(e,this));
};
},_fixEvent:function(evt,_22a){
switch(evt.type){
case "keypress":
del._setKeyChar(evt);
break;
}
return evt;
},_setKeyChar:function(evt){
evt.keyChar=evt.charCode?String.fromCharCode(evt.charCode):"";
evt.charOrCode=evt.keyChar||evt.keyCode;
},_punctMap:{106:42,111:47,186:59,187:43,188:44,189:45,190:46,191:47,192:96,219:91,220:92,221:93,222:39}});
dojo.fixEvent=function(evt,_22d){
return del._fixEvent(evt,_22d);
};
dojo.stopEvent=function(evt){
evt.preventDefault();
evt.stopPropagation();
};
var _22f=dojo._listener;
dojo._connect=function(obj,_231,_232,_233,_234){
var _235=obj&&(obj.nodeType||obj.attachEvent||obj.addEventListener);
var lid=_235?(_234?2:1):0,l=[dojo._listener,del,_22f][lid];
var h=l.add(obj,_231,dojo.hitch(_232,_233));
return [obj,_231,h,lid];
};
dojo._disconnect=function(obj,_23a,_23b,_23c){
([dojo._listener,del,_22f][_23c]).remove(obj,_23a,_23b);
};
dojo.keys={BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,INSERT:45,DELETE:46,HELP:47,LEFT_WINDOW:91,RIGHT_WINDOW:92,SELECT:93,NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_PLUS:107,NUMPAD_ENTER:108,NUMPAD_MINUS:109,NUMPAD_PERIOD:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NUM_LOCK:144,SCROLL_LOCK:145};
if(dojo.isIE){
var _23d=function(e,code){
try{
return (e.keyCode=code);
}
catch(e){
return 0;
}
};
var iel=dojo._listener;
var _241=(dojo._ieListenersName="_"+dojo._scopeName+"_listeners");
if(!dojo.config._allow_leaks){
_22f=iel=dojo._ie_listener={handlers:[],add:function(_242,_243,_244){
_242=_242||dojo.global;
var f=_242[_243];
if(!f||!f[_241]){
var d=dojo._getIeDispatcher();
d.target=f&&(ieh.push(f)-1);
d[_241]=[];
f=_242[_243]=d;
}
return f[_241].push(ieh.push(_244)-1);
},remove:function(_248,_249,_24a){
var f=(_248||dojo.global)[_249],l=f&&f[_241];
if(f&&l&&_24a--){
delete ieh[l[_24a]];
delete l[_24a];
}
}};
var ieh=iel.handlers;
}
dojo.mixin(del,{add:function(node,_24e,fp){
if(!node){
return;
}
_24e=del._normalizeEventName(_24e);
if(_24e=="onkeypress"){
var kd=node.onkeydown;
if(!kd||!kd[_241]||!kd._stealthKeydownHandle){
var h=del.add(node,"onkeydown",del._stealthKeyDown);
kd=node.onkeydown;
kd._stealthKeydownHandle=h;
kd._stealthKeydownRefs=1;
}else{
kd._stealthKeydownRefs++;
}
}
return iel.add(node,_24e,del._fixCallback(fp));
},remove:function(node,_253,_254){
_253=del._normalizeEventName(_253);
iel.remove(node,_253,_254);
if(_253=="onkeypress"){
var kd=node.onkeydown;
if(--kd._stealthKeydownRefs<=0){
iel.remove(node,"onkeydown",kd._stealthKeydownHandle);
delete kd._stealthKeydownHandle;
}
}
},_normalizeEventName:function(_256){
return _256.slice(0,2)!="on"?"on"+_256:_256;
},_nop:function(){
},_fixEvent:function(evt,_258){
if(!evt){
var w=_258&&(_258.ownerDocument||_258.document||_258).parentWindow||window;
evt=w.event;
}
if(!evt){
return (evt);
}
evt.target=evt.srcElement;
evt.currentTarget=(_258||evt.srcElement);
evt.layerX=evt.offsetX;
evt.layerY=evt.offsetY;
var se=evt.srcElement,doc=(se&&se.ownerDocument)||document;
var _25c=((dojo.isIE<6)||(doc["compatMode"]=="BackCompat"))?doc.body:doc.documentElement;
var _25d=dojo._getIeDocumentElementOffset();
evt.pageX=evt.clientX+dojo._fixIeBiDiScrollLeft(_25c.scrollLeft||0)-_25d.x;
evt.pageY=evt.clientY+(_25c.scrollTop||0)-_25d.y;
if(evt.type=="mouseover"){
evt.relatedTarget=evt.fromElement;
}
if(evt.type=="mouseout"){
evt.relatedTarget=evt.toElement;
}
if(dojo.isIE<9||dojo.isQuirks){
evt.stopPropagation=del._stopPropagation;
evt.preventDefault=del._preventDefault;
}
return del._fixKeys(evt);
},_fixKeys:function(evt){
switch(evt.type){
case "keypress":
var c=("charCode" in evt?evt.charCode:evt.keyCode);
if(c==10){
c=0;
evt.keyCode=13;
}else{
if(c==13||c==27){
c=0;
}else{
if(c==3){
c=99;
}
}
}
evt.charCode=c;
del._setKeyChar(evt);
break;
}
return evt;
},_stealthKeyDown:function(evt){
var kp=evt.currentTarget.onkeypress;
if(!kp||!kp[_241]){
return;
}
var k=evt.keyCode;
var _263=k!=13&&k!=32&&k!=27&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);
if(_263||evt.ctrlKey){
var c=_263?0:k;
if(evt.ctrlKey){
if(k==3||k==13){
return;
}else{
if(c>95&&c<106){
c-=48;
}else{
if((!evt.shiftKey)&&(c>=65&&c<=90)){
c+=32;
}else{
c=del._punctMap[c]||c;
}
}
}
}
var faux=del._synthesizeEvent(evt,{type:"keypress",faux:true,charCode:c});
kp.call(evt.currentTarget,faux);
evt.cancelBubble=faux.cancelBubble;
evt.returnValue=faux.returnValue;
_23d(evt,faux.keyCode);
}
},_stopPropagation:function(){
this.cancelBubble=true;
},_preventDefault:function(){
this.bubbledKeyCode=this.keyCode;
if(this.ctrlKey){
_23d(this,0);
}
this.returnValue=false;
}});
dojo.stopEvent=(dojo.isIE<9||dojo.isQuirks)?function(evt){
evt=evt||window.event;
del._stopPropagation.call(evt);
del._preventDefault.call(evt);
}:dojo.stopEvent;
}
del._synthesizeEvent=function(evt,_268){
var faux=dojo.mixin({},evt,_268);
del._setKeyChar(faux);
faux.preventDefault=function(){
evt.preventDefault();
};
faux.stopPropagation=function(){
evt.stopPropagation();
};
return faux;
};
if(dojo.isOpera){
dojo.mixin(del,{_fixEvent:function(evt,_26b){
switch(evt.type){
case "keypress":
var c=evt.which;
if(c==3){
c=99;
}
c=c<41&&!evt.shiftKey?0:c;
if(evt.ctrlKey&&!evt.shiftKey&&c>=65&&c<=90){
c+=32;
}
return del._synthesizeEvent(evt,{charCode:c});
}
return evt;
}});
}
if(dojo.isWebKit){
del._add=del.add;
del._remove=del.remove;
dojo.mixin(del,{add:function(node,_26e,fp){
if(!node){
return;
}
var _270=del._add(node,_26e,fp);
if(del._normalizeEventName(_26e)=="keypress"){
_270._stealthKeyDownHandle=del._add(node,"keydown",function(evt){
var k=evt.keyCode;
var _273=k!=13&&k!=32&&k!=27&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);
if(_273||evt.ctrlKey){
var c=_273?0:k;
if(evt.ctrlKey){
if(k==3||k==13){
return;
}else{
if(c>95&&c<106){
c-=48;
}else{
if(!evt.shiftKey&&c>=65&&c<=90){
c+=32;
}else{
c=del._punctMap[c]||c;
}
}
}
}
var faux=del._synthesizeEvent(evt,{type:"keypress",faux:true,charCode:c});
fp.call(evt.currentTarget,faux);
}
});
}
return _270;
},remove:function(node,_277,_278){
if(node){
if(_278._stealthKeyDownHandle){
del._remove(node,"keydown",_278._stealthKeyDownHandle);
}
del._remove(node,_277,_278);
}
},_fixEvent:function(evt,_27a){
switch(evt.type){
case "keypress":
if(evt.faux){
return evt;
}
var c=evt.charCode;
c=c>=32?c:0;
return del._synthesizeEvent(evt,{charCode:c,faux:true});
}
return evt;
}});
}
})();
if(dojo.isIE){
dojo._ieDispatcher=function(args,_27d){
var ap=Array.prototype,h=dojo._ie_listener.handlers,c=args.callee,ls=c[dojo._ieListenersName],t=h[c.target];
var r=t&&t.apply(_27d,args);
var lls=[].concat(ls);
for(var i in lls){
var f=h[lls[i]];
if(!(i in ap)&&f){
f.apply(_27d,args);
}
}
return r;
};
dojo._getIeDispatcher=function(){
return new Function(dojo._scopeName+"._ieDispatcher(arguments, this)");
};
dojo._event_listener._fixCallback=function(fp){
var f=dojo._event_listener._fixEvent;
return function(e){
return fp.call(this,f(e,this));
};
};
}
}
if(!dojo._hasResource["dojo._base.html"]){
dojo._hasResource["dojo._base.html"]=true;
dojo.provide("dojo._base.html");
try{
document.execCommand("BackgroundImageCache",false,true);
}
catch(e){
}
if(dojo.isIE||dojo.isOpera){
dojo.byId=function(id,doc){
if(dojo.isString(id)){
var _d=doc||dojo.doc;
var te=_d.getElementById(id);
if(te&&(te.attributes.id.value==id||te.id==id)){
return te;
}else{
var eles=_d.all[id];
if(!eles||eles.nodeName){
eles=[eles];
}
var i=0;
while((te=eles[i++])){
if((te.attributes&&te.attributes.id&&te.attributes.id.value==id)||te.id==id){
return te;
}
}
}
}else{
return id;
}
};
}else{
dojo.byId=function(id,doc){
return dojo.isString(id)?(doc||dojo.doc).getElementById(id):id;
};
}
(function(){
var d=dojo;
var _293=null;
d.addOnWindowUnload(function(){
_293=null;
});
dojo._destroyElement=dojo.destroy=function(node){
node=d.byId(node);
try{
if(!_293||_293.ownerDocument!=node.ownerDocument){
_293=node.ownerDocument.createElement("div");
}
_293.appendChild(node.parentNode?node.parentNode.removeChild(node):node);
_293.innerHTML="";
}
catch(e){
}
};
dojo.isDescendant=function(node,_296){
try{
node=d.byId(node);
_296=d.byId(_296);
while(node){
if(node===_296){
return true;
}
node=node.parentNode;
}
}
catch(e){
}
return false;
};
dojo.setSelectable=function(node,_298){
node=d.byId(node);
if(d.isMozilla){
node.style.MozUserSelect=_298?"":"none";
}else{
if(d.isKhtml||d.isWebKit){
node.style.KhtmlUserSelect=_298?"auto":"none";
}else{
if(d.isIE){
var v=(node.unselectable=_298?"":"on");
d.query("*",node).forEach("item.unselectable = '"+v+"'");
}
}
}
};
var _29a=function(node,ref){
var _29d=ref.parentNode;
if(_29d){
_29d.insertBefore(node,ref);
}
};
var _29e=function(node,ref){
var _2a1=ref.parentNode;
if(_2a1){
if(_2a1.lastChild==ref){
_2a1.appendChild(node);
}else{
_2a1.insertBefore(node,ref.nextSibling);
}
}
};
dojo.place=function(node,_2a3,_2a4){
_2a3=d.byId(_2a3);
if(d.isString(node)){
node=node.charAt(0)=="<"?d._toDom(node,_2a3.ownerDocument):d.byId(node);
}
if(typeof _2a4=="number"){
var cn=_2a3.childNodes;
if(!cn.length||cn.length<=_2a4){
_2a3.appendChild(node);
}else{
_29a(node,cn[_2a4<0?0:_2a4]);
}
}else{
switch(_2a4){
case "before":
_29a(node,_2a3);
break;
case "after":
_29e(node,_2a3);
break;
case "replace":
_2a3.parentNode.replaceChild(node,_2a3);
break;
case "only":
d.empty(_2a3);
_2a3.appendChild(node);
break;
case "first":
if(_2a3.firstChild){
_29a(node,_2a3.firstChild);
break;
}
default:
_2a3.appendChild(node);
}
}
return node;
};
dojo.boxModel="content-box";
if(d.isIE){
var _dcm=document.compatMode;
d.boxModel=_dcm=="BackCompat"||_dcm=="QuirksMode"||d.isIE<6?"border-box":"content-box";
}
var gcs;
if(d.isWebKit){
gcs=function(node){
var s;
if(node.nodeType==1){
var dv=node.ownerDocument.defaultView;
s=dv.getComputedStyle(node,null);
if(!s&&node.style){
node.style.display="";
s=dv.getComputedStyle(node,null);
}
}
return s||{};
};
}else{
if(d.isIE){
gcs=function(node){
return node.nodeType==1?node.currentStyle:{};
};
}else{
gcs=function(node){
return node.nodeType==1?node.ownerDocument.defaultView.getComputedStyle(node,null):{};
};
}
}
dojo.getComputedStyle=gcs;
if(!d.isIE){
d._toPixelValue=function(_2ad,_2ae){
return parseFloat(_2ae)||0;
};
}else{
d._toPixelValue=function(_2af,_2b0){
if(!_2b0){
return 0;
}
if(_2b0=="medium"){
return 4;
}
if(_2b0.slice&&_2b0.slice(-2)=="px"){
return parseFloat(_2b0);
}
with(_2af){
var _2b1=style.left;
var _2b2=runtimeStyle.left;
runtimeStyle.left=currentStyle.left;
try{
style.left=_2b0;
_2b0=style.pixelLeft;
}
catch(e){
_2b0=0;
}
style.left=_2b1;
runtimeStyle.left=_2b2;
}
return _2b0;
};
}
var px=d._toPixelValue;
var astr="DXImageTransform.Microsoft.Alpha";
var af=function(n,f){
try{
return n.filters.item(astr);
}
catch(e){
return f?{}:null;
}
};
dojo._getOpacity=d.isIE?function(node){
try{
return af(node).Opacity/100;
}
catch(e){
return 1;
}
}:function(node){
return gcs(node).opacity;
};
dojo._setOpacity=d.isIE?function(node,_2bb){
var ov=_2bb*100;
node.style.zoom=1;
af(node,1).Enabled=!(_2bb==1);
if(!af(node)){
node.style.filter+=" progid:"+astr+"(Opacity="+ov+")";
}else{
af(node,1).Opacity=ov;
}
if(node.nodeName.toLowerCase()=="tr"){
d.query("> td",node).forEach(function(i){
d._setOpacity(i,_2bb);
});
}
return _2bb;
}:function(node,_2bf){
return node.style.opacity=_2bf;
};
var _2c0={left:true,top:true};
var _2c1=/margin|padding|width|height|max|min|offset/;
var _2c2=function(node,type,_2c5){
type=type.toLowerCase();
if(d.isIE){
if(_2c5=="auto"){
if(type=="height"){
return node.offsetHeight;
}
if(type=="width"){
return node.offsetWidth;
}
}
if(type=="fontweight"){
switch(_2c5){
case 700:
return "bold";
case 400:
default:
return "normal";
}
}
}
if(!(type in _2c0)){
_2c0[type]=_2c1.test(type);
}
return _2c0[type]?px(node,_2c5):_2c5;
};
var _2c6=d.isIE?"styleFloat":"cssFloat",_2c7={"cssFloat":_2c6,"styleFloat":_2c6,"float":_2c6};
dojo.style=function(node,_2c9,_2ca){
var n=d.byId(node),args=arguments.length,op=(_2c9=="opacity");
_2c9=_2c7[_2c9]||_2c9;
if(args==3){
return op?d._setOpacity(n,_2ca):n.style[_2c9]=_2ca;
}
if(args==2&&op){
return d._getOpacity(n);
}
var s=gcs(n);
if(args==2&&!d.isString(_2c9)){
for(var x in _2c9){
d.style(node,x,_2c9[x]);
}
return s;
}
return (args==1)?s:_2c2(n,_2c9,s[_2c9]||n.style[_2c9]);
};
dojo._getPadExtents=function(n,_2d1){
var s=_2d1||gcs(n),l=px(n,s.paddingLeft),t=px(n,s.paddingTop);
return {l:l,t:t,w:l+px(n,s.paddingRight),h:t+px(n,s.paddingBottom)};
};
dojo._getBorderExtents=function(n,_2d6){
var ne="none",s=_2d6||gcs(n),bl=(s.borderLeftStyle!=ne?px(n,s.borderLeftWidth):0),bt=(s.borderTopStyle!=ne?px(n,s.borderTopWidth):0);
return {l:bl,t:bt,w:bl+(s.borderRightStyle!=ne?px(n,s.borderRightWidth):0),h:bt+(s.borderBottomStyle!=ne?px(n,s.borderBottomWidth):0)};
};
dojo._getPadBorderExtents=function(n,_2dc){
var s=_2dc||gcs(n),p=d._getPadExtents(n,s),b=d._getBorderExtents(n,s);
return {l:p.l+b.l,t:p.t+b.t,w:p.w+b.w,h:p.h+b.h};
};
dojo._getMarginExtents=function(n,_2e1){
var s=_2e1||gcs(n),l=px(n,s.marginLeft),t=px(n,s.marginTop),r=px(n,s.marginRight),b=px(n,s.marginBottom);
if(d.isWebKit&&(s.position!="absolute")){
r=l;
}
return {l:l,t:t,w:l+r,h:t+b};
};
dojo._getMarginBox=function(node,_2e8){
var s=_2e8||gcs(node),me=d._getMarginExtents(node,s);
var l=node.offsetLeft-me.l,t=node.offsetTop-me.t,p=node.parentNode;
if(d.isMoz){
var sl=parseFloat(s.left),st=parseFloat(s.top);
if(!isNaN(sl)&&!isNaN(st)){
l=sl,t=st;
}else{
if(p&&p.style){
var pcs=gcs(p);
if(pcs.overflow!="visible"){
var be=d._getBorderExtents(p,pcs);
l+=be.l,t+=be.t;
}
}
}
}else{
if(d.isOpera||(d.isIE>7&&!d.isQuirks)){
if(p){
be=d._getBorderExtents(p);
l-=be.l;
t-=be.t;
}
}
}
return {l:l,t:t,w:node.offsetWidth+me.w,h:node.offsetHeight+me.h};
};
dojo._getContentBox=function(node,_2f3){
var s=_2f3||gcs(node),pe=d._getPadExtents(node,s),be=d._getBorderExtents(node,s),w=node.clientWidth,h;
if(!w){
w=node.offsetWidth,h=node.offsetHeight;
}else{
h=node.clientHeight,be.w=be.h=0;
}
if(d.isOpera){
pe.l+=be.l;
pe.t+=be.t;
}
return {l:pe.l,t:pe.t,w:w-pe.w-be.w,h:h-pe.h-be.h};
};
dojo._getBorderBox=function(node,_2fa){
var s=_2fa||gcs(node),pe=d._getPadExtents(node,s),cb=d._getContentBox(node,s);
return {l:cb.l-pe.l,t:cb.t-pe.t,w:cb.w+pe.w,h:cb.h+pe.h};
};
dojo._setBox=function(node,l,t,w,h,u){
u=u||"px";
var s=node.style;
if(!isNaN(l)){
s.left=l+u;
}
if(!isNaN(t)){
s.top=t+u;
}
if(w>=0){
s.width=w+u;
}
if(h>=0){
s.height=h+u;
}
};
dojo._isButtonTag=function(node){
return node.tagName=="BUTTON"||node.tagName=="INPUT"&&node.getAttribute("type").toUpperCase()=="BUTTON";
};
dojo._usesBorderBox=function(node){
var n=node.tagName;
return d.boxModel=="border-box"||n=="TABLE"||d._isButtonTag(node);
};
dojo._setContentSize=function(node,_309,_30a,_30b){
if(d._usesBorderBox(node)){
var pb=d._getPadBorderExtents(node,_30b);
if(_309>=0){
_309+=pb.w;
}
if(_30a>=0){
_30a+=pb.h;
}
}
d._setBox(node,NaN,NaN,_309,_30a);
};
dojo._setMarginBox=function(node,_30e,_30f,_310,_311,_312){
var s=_312||gcs(node),bb=d._usesBorderBox(node),pb=bb?_316:d._getPadBorderExtents(node,s);
if(d.isWebKit){
if(d._isButtonTag(node)){
var ns=node.style;
if(_310>=0&&!ns.width){
ns.width="4px";
}
if(_311>=0&&!ns.height){
ns.height="4px";
}
}
}
var mb=d._getMarginExtents(node,s);
if(_310>=0){
_310=Math.max(_310-pb.w-mb.w,0);
}
if(_311>=0){
_311=Math.max(_311-pb.h-mb.h,0);
}
d._setBox(node,_30e,_30f,_310,_311);
};
var _316={l:0,t:0,w:0,h:0};
dojo.marginBox=function(node,box){
var n=d.byId(node),s=gcs(n),b=box;
return !b?d._getMarginBox(n,s):d._setMarginBox(n,b.l,b.t,b.w,b.h,s);
};
dojo.contentBox=function(node,box){
var n=d.byId(node),s=gcs(n),b=box;
return !b?d._getContentBox(n,s):d._setContentSize(n,b.w,b.h,s);
};
var _323=function(node,prop){
if(!(node=(node||0).parentNode)){
return 0;
}
var val,_327=0,_b=d.body();
while(node&&node.style){
if(gcs(node).position=="fixed"){
return 0;
}
val=node[prop];
if(val){
_327+=val-0;
if(node==_b){
break;
}
}
node=node.parentNode;
}
return _327;
};
dojo._docScroll=function(){
var _b=d.body(),_w=d.global,de=d.doc.documentElement;
return {y:(_w.pageYOffset||de.scrollTop||_b.scrollTop||0),x:(_w.pageXOffset||d._fixIeBiDiScrollLeft(de.scrollLeft)||_b.scrollLeft||0)};
};
dojo._isBodyLtr=function(){
return ("_bodyLtr" in d)?d._bodyLtr:d._bodyLtr=gcs(d.body()).direction=="ltr";
};
dojo._getIeDocumentElementOffset=function(){
var de=d.doc.documentElement;
if(d.isIE<7){
return {x:d._isBodyLtr()||window.parent==window?de.clientLeft:de.offsetWidth-de.clientWidth-de.clientLeft,y:de.clientTop};
}else{
if(d.isIE<8){
return {x:de.getBoundingClientRect().left,y:de.getBoundingClientRect().top};
}else{
return {x:0,y:0};
}
}
};
dojo._fixIeBiDiScrollLeft=function(_32d){
var dd=d.doc;
if(d.isIE<8&&!d._isBodyLtr()){
var de=dd.compatMode=="BackCompat"?dd.body:dd.documentElement;
return _32d+de.clientWidth-de.scrollWidth;
}
return _32d;
};
dojo._abs=dojo.position=function(node,_331){
var db=d.body(),dh=db.parentNode,ret;
node=d.byId(node);
if(node["getBoundingClientRect"]){
ret=node.getBoundingClientRect();
ret={x:ret.left,y:ret.top,w:ret.right-ret.left,h:ret.bottom-ret.top};
if(d.isIE){
var _335=d._getIeDocumentElementOffset();
ret.x-=_335.x+(d.isQuirks?db.clientLeft+db.offsetLeft:0);
ret.y-=_335.y+(d.isQuirks?db.clientTop+db.offsetTop:0);
}else{
if(d.isFF==3){
var cs=gcs(dh);
ret.x-=px(dh,cs.marginLeft)+px(dh,cs.borderLeftWidth);
ret.y-=px(dh,cs.marginTop)+px(dh,cs.borderTopWidth);
}
}
}else{
ret={x:0,y:0,w:node.offsetWidth,h:node.offsetHeight};
if(node["offsetParent"]){
ret.x-=_323(node,"scrollLeft");
ret.y-=_323(node,"scrollTop");
var _337=node;
do{
var n=_337.offsetLeft,t=_337.offsetTop;
ret.x+=isNaN(n)?0:n;
ret.y+=isNaN(t)?0:t;
cs=gcs(_337);
if(_337!=node){
if(d.isMoz){
ret.x+=2*px(_337,cs.borderLeftWidth);
ret.y+=2*px(_337,cs.borderTopWidth);
}else{
ret.x+=px(_337,cs.borderLeftWidth);
ret.y+=px(_337,cs.borderTopWidth);
}
}
if(d.isMoz&&cs.position=="static"){
var _33a=_337.parentNode;
while(_33a!=_337.offsetParent){
var pcs=gcs(_33a);
if(pcs.position=="static"){
ret.x+=px(_337,pcs.borderLeftWidth);
ret.y+=px(_337,pcs.borderTopWidth);
}
_33a=_33a.parentNode;
}
}
_337=_337.offsetParent;
}while((_337!=dh)&&_337);
}else{
if(node.x&&node.y){
ret.x+=isNaN(node.x)?0:node.x;
ret.y+=isNaN(node.y)?0:node.y;
}
}
}
if(_331){
var _33c=d._docScroll();
ret.x+=_33c.x;
ret.y+=_33c.y;
}
return ret;
};
dojo.coords=function(node,_33e){
var n=d.byId(node),s=gcs(n),mb=d._getMarginBox(n,s);
var abs=d._abs(n,_33e);
mb.x=abs.x;
mb.y=abs.y;
return mb;
};
var _343=d.isIE<8;
var _344=function(name){
switch(name.toLowerCase()){
case "tabindex":
return _343?"tabIndex":"tabindex";
case "readonly":
return "readOnly";
case "class":
return "className";
case "for":
case "htmlfor":
return _343?"htmlFor":"for";
default:
return name;
}
};
var _346={colspan:"colSpan",enctype:"enctype",frameborder:"frameborder",method:"method",rowspan:"rowSpan",scrolling:"scrolling",shape:"shape",span:"span",type:"type",valuetype:"valueType",classname:"className",innerhtml:"innerHTML"};
dojo.hasAttr=function(node,name){
node=d.byId(node);
var _349=_344(name);
_349=_349=="htmlFor"?"for":_349;
var attr=node.getAttributeNode&&node.getAttributeNode(_349);
return attr?attr.specified:false;
};
var _34b={},_ctr=0,_34d=dojo._scopeName+"attrid",_34e={col:1,colgroup:1,table:1,tbody:1,tfoot:1,thead:1,tr:1,title:1};
dojo.attr=function(node,name,_351){
node=d.byId(node);
var args=arguments.length;
if(args==2&&!d.isString(name)){
for(var x in name){
d.attr(node,x,name[x]);
}
return;
}
name=_344(name);
if(args==3){
if(d.isFunction(_351)){
var _354=d.attr(node,_34d);
if(!_354){
_354=_ctr++;
d.attr(node,_34d,_354);
}
if(!_34b[_354]){
_34b[_354]={};
}
var h=_34b[_354][name];
if(h){
d.disconnect(h);
}else{
try{
delete node[name];
}
catch(e){
}
}
_34b[_354][name]=d.connect(node,name,_351);
}else{
if(typeof _351=="boolean"){
node[name]=_351;
}else{
if(name==="style"&&!d.isString(_351)){
d.style(node,_351);
}else{
if(name=="className"){
node.className=_351;
}else{
if(name==="innerHTML"){
if(d.isIE&&node.tagName.toLowerCase() in _34e){
d.empty(node);
node.appendChild(d._toDom(_351,node.ownerDocument));
}else{
node[name]=_351;
}
}else{
node.setAttribute(name,_351);
}
}
}
}
}
}else{
var prop=_346[name.toLowerCase()];
if(prop){
return node[prop];
}
var _357=node[name];
return (typeof _357=="boolean"||typeof _357=="function")?_357:(d.hasAttr(node,name)?node.getAttribute(name):null);
}
};
dojo.removeAttr=function(node,name){
d.byId(node).removeAttribute(_344(name));
};
dojo.create=function(tag,_35b,_35c,pos){
var doc=d.doc;
if(_35c){
_35c=d.byId(_35c);
doc=_35c.ownerDocument;
}
if(d.isString(tag)){
tag=doc.createElement(tag);
}
if(_35b){
d.attr(tag,_35b);
}
if(_35c){
d.place(tag,_35c,pos);
}
return tag;
};
d.empty=d.isIE?function(node){
node=d.byId(node);
for(var c;c=node.lastChild;){
d.destroy(c);
}
}:function(node){
d.byId(node).innerHTML="";
};
var _362={option:["select"],tbody:["table"],thead:["table"],tfoot:["table"],tr:["table","tbody"],td:["table","tbody","tr"],th:["table","thead","tr"],legend:["fieldset"],caption:["table"],colgroup:["table"],col:["table","colgroup"],li:["ul"]},_363=/<\s*([\w\:]+)/,_364={},_365=0,_366="__"+d._scopeName+"ToDomId";
for(var _367 in _362){
var tw=_362[_367];
tw.pre=_367=="option"?"<select multiple=\"multiple\">":"<"+tw.join("><")+">";
tw.post="</"+tw.reverse().join("></")+">";
}
d._toDom=function(frag,doc){
doc=doc||d.doc;
var _36b=doc[_366];
if(!_36b){
doc[_366]=_36b=++_365+"";
_364[_36b]=doc.createElement("div");
}
frag+="";
var _36c=frag.match(_363),tag=_36c?_36c[1].toLowerCase():"",_36e=_364[_36b],wrap,i,fc,df;
if(_36c&&_362[tag]){
wrap=_362[tag];
_36e.innerHTML=wrap.pre+frag+wrap.post;
for(i=wrap.length;i;--i){
_36e=_36e.firstChild;
}
}else{
_36e.innerHTML=frag;
}
if(_36e.childNodes.length==1){
return _36e.removeChild(_36e.firstChild);
}
df=doc.createDocumentFragment();
while(fc=_36e.firstChild){
df.appendChild(fc);
}
return df;
};
var _372="className";
dojo.hasClass=function(node,_374){
return ((" "+d.byId(node)[_372]+" ").indexOf(" "+_374+" ")>=0);
};
dojo.addClass=function(node,_376){
node=d.byId(node);
var cls=node[_372];
if((" "+cls+" ").indexOf(" "+_376+" ")<0){
node[_372]=cls+(cls?" ":"")+_376;
}
};
dojo.removeClass=function(node,_379){
node=d.byId(node);
var t=d.trim((" "+node[_372]+" ").replace(" "+_379+" "," "));
if(node[_372]!=t){
node[_372]=t;
}
};
dojo.toggleClass=function(node,_37c,_37d){
if(_37d===undefined){
_37d=!d.hasClass(node,_37c);
}
d[_37d?"addClass":"removeClass"](node,_37c);
};
})();
}
if(!dojo._hasResource["dojo._base.NodeList"]){
dojo._hasResource["dojo._base.NodeList"]=true;
dojo.provide("dojo._base.NodeList");
(function(){
var d=dojo;
var ap=Array.prototype,aps=ap.slice,apc=ap.concat;
var tnl=function(a){
a.constructor=d.NodeList;
dojo._mixin(a,d.NodeList.prototype);
return a;
};
var _384=function(f,a,o){
a=[0].concat(aps.call(a,0));
if(!a.sort){
a=aps.call(a,0);
}
o=o||d.global;
return function(node){
a[0]=node;
return f.apply(o,a);
};
};
var _389=function(f,o){
return function(){
this.forEach(_384(f,arguments,o));
return this;
};
};
var _38c=function(f,o){
return function(){
return this.map(_384(f,arguments,o));
};
};
var _38f=function(f,o){
return function(){
return this.filter(_384(f,arguments,o));
};
};
var _392=function(f,g,o){
return function(){
var a=arguments,body=_384(f,a,o);
if(g.call(o||d.global,a)){
return this.map(body);
}
this.forEach(body);
return this;
};
};
var _398=function(a){
return a.length==1&&d.isString(a[0]);
};
var _39a=function(node){
var p=node.parentNode;
if(p){
p.removeChild(node);
}
};
dojo.NodeList=function(){
return tnl(Array.apply(null,arguments));
};
var nl=d.NodeList,nlp=nl.prototype;
nl._wrap=tnl;
nl._adaptAsMap=_38c;
nl._adaptAsForEach=_389;
nl._adaptAsFilter=_38f;
nl._adaptWithCondition=_392;
d.forEach(["slice","splice"],function(name){
var f=ap[name];
nlp[name]=function(){
return tnl(f.apply(this,arguments));
};
});
d.forEach(["indexOf","lastIndexOf","every","some"],function(name){
var f=d[name];
nlp[name]=function(){
return f.apply(d,[this].concat(aps.call(arguments,0)));
};
});
d.forEach(["attr","style"],function(name){
nlp[name]=_392(d[name],_398);
});
d.forEach(["connect","addClass","removeClass","toggleClass","empty"],function(name){
nlp[name]=_389(d[name]);
});
dojo.extend(dojo.NodeList,{concat:function(item){
var t=d.isArray(this)?this:aps.call(this,0),m=d.map(arguments,function(a){
return a&&!d.isArray(a)&&(a.constructor===NodeList||a.constructor==nl)?aps.call(a,0):a;
});
return tnl(apc.apply(t,m));
},map:function(func,obj){
return tnl(d.map(this,func,obj));
},forEach:function(_3ab,_3ac){
d.forEach(this,_3ab,_3ac);
return this;
},coords:_38c(d.coords),place:function(_3ad,_3ae){
var item=d.query(_3ad)[0];
return this.forEach(function(node){
d.place(node,item,_3ae);
});
},orphan:function(_3b1){
return (_3b1?d._filterQueryResult(this,_3b1):this).forEach(_39a);
},adopt:function(_3b2,_3b3){
return d.query(_3b2).place(this[0],_3b3);
},query:function(_3b4){
if(!_3b4){
return this;
}
var ret=this.map(function(node){
return d.query(_3b4,node).filter(function(_3b7){
return _3b7!==undefined;
});
});
return tnl(apc.apply([],ret));
},filter:function(_3b8){
var a=arguments,_3ba=this,_3bb=0;
if(d.isString(_3b8)){
_3ba=d._filterQueryResult(this,a[0]);
if(a.length==1){
return _3ba;
}
_3bb=1;
}
return tnl(d.filter(_3ba,a[_3bb],a[_3bb+1]));
},addContent:function(_3bc,_3bd){
var c=d.isString(_3bc)?d._toDom(_3bc,this[0]&&this[0].ownerDocument):_3bc,i,l=this.length-1;
for(i=0;i<l;++i){
d.place(c.cloneNode(true),this[i],_3bd);
}
if(l>=0){
d.place(c,this[l],_3bd);
}
return this;
},instantiate:function(_3c0,_3c1){
var c=d.isFunction(_3c0)?_3c0:d.getObject(_3c0);
_3c1=_3c1||{};
return this.forEach(function(node){
new c(_3c1,node);
});
},at:function(){
var t=new dojo.NodeList();
d.forEach(arguments,function(i){
if(this[i]){
t.push(this[i]);
}
},this);
return t;
}});
d.forEach(["blur","focus","change","click","error","keydown","keypress","keyup","load","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","submit"],function(evt){
var _oe="on"+evt;
nlp[_oe]=function(a,b){
return this.connect(_oe,a,b);
};
});
})();
}
if(!dojo._hasResource["dojo._base.query"]){
dojo._hasResource["dojo._base.query"]=true;
if(typeof dojo!="undefined"){
dojo.provide("dojo._base.query");
}
(function(d){
var trim=d.trim;
var each=d.forEach;
var qlc=d._queryListCtor=d.NodeList;
var _3ce=d.isString;
var _3cf=function(){
return d.doc;
};
var _3d0=((d.isWebKit||d.isMozilla)&&((_3cf().compatMode)=="BackCompat"));
var _3d1=!!_3cf().firstChild["children"]?"children":"childNodes";
var _3d2=">~+";
var _3d3=false;
var _3d4=function(){
return true;
};
var _3d5=function(_3d6){
if(_3d2.indexOf(_3d6.slice(-1))>=0){
_3d6+=" * ";
}else{
_3d6+=" ";
}
var ts=function(s,e){
return trim(_3d6.slice(s,e));
};
var _3da=[];
var _3db=-1,_3dc=-1,_3dd=-1,_3de=-1,_3df=-1,inId=-1,_3e1=-1,lc="",cc="",_3e4;
var x=0,ql=_3d6.length,_3e7=null,_cp=null;
var _3e9=function(){
if(_3e1>=0){
var tv=(_3e1==x)?null:ts(_3e1,x);
_3e7[(_3d2.indexOf(tv)<0)?"tag":"oper"]=tv;
_3e1=-1;
}
};
var _3eb=function(){
if(inId>=0){
_3e7.id=ts(inId,x).replace(/\\/g,"");
inId=-1;
}
};
var _3ec=function(){
if(_3df>=0){
_3e7.classes.push(ts(_3df+1,x).replace(/\\/g,""));
_3df=-1;
}
};
var _3ed=function(){
_3eb();
_3e9();
_3ec();
};
var _3ee=function(){
_3ed();
if(_3de>=0){
_3e7.pseudos.push({name:ts(_3de+1,x)});
}
_3e7.loops=(_3e7.pseudos.length||_3e7.attrs.length||_3e7.classes.length);
_3e7.oquery=_3e7.query=ts(_3e4,x);
_3e7.otag=_3e7.tag=(_3e7["oper"])?null:(_3e7.tag||"*");
if(_3e7.tag){
_3e7.tag=_3e7.tag.toUpperCase();
}
if(_3da.length&&(_3da[_3da.length-1].oper)){
_3e7.infixOper=_3da.pop();
_3e7.query=_3e7.infixOper.query+" "+_3e7.query;
}
_3da.push(_3e7);
_3e7=null;
};
for(;lc=cc,cc=_3d6.charAt(x),x<ql;x++){
if(lc=="\\"){
continue;
}
if(!_3e7){
_3e4=x;
_3e7={query:null,pseudos:[],attrs:[],classes:[],tag:null,oper:null,id:null,getTag:function(){
return (_3d3)?this.otag:this.tag;
}};
_3e1=x;
}
if(_3db>=0){
if(cc=="]"){
if(!_cp.attr){
_cp.attr=ts(_3db+1,x);
}else{
_cp.matchFor=ts((_3dd||_3db+1),x);
}
var cmf=_cp.matchFor;
if(cmf){
if((cmf.charAt(0)=="\"")||(cmf.charAt(0)=="'")){
_cp.matchFor=cmf.slice(1,-1);
}
}
_3e7.attrs.push(_cp);
_cp=null;
_3db=_3dd=-1;
}else{
if(cc=="="){
var _3f0=("|~^$*".indexOf(lc)>=0)?lc:"";
_cp.type=_3f0+cc;
_cp.attr=ts(_3db+1,x-_3f0.length);
_3dd=x+1;
}
}
}else{
if(_3dc>=0){
if(cc==")"){
if(_3de>=0){
_cp.value=ts(_3dc+1,x);
}
_3de=_3dc=-1;
}
}else{
if(cc=="#"){
_3ed();
inId=x+1;
}else{
if(cc=="."){
_3ed();
_3df=x;
}else{
if(cc==":"){
_3ed();
_3de=x;
}else{
if(cc=="["){
_3ed();
_3db=x;
_cp={};
}else{
if(cc=="("){
if(_3de>=0){
_cp={name:ts(_3de+1,x),value:null};
_3e7.pseudos.push(_cp);
}
_3dc=x;
}else{
if((cc==" ")&&(lc!=cc)){
_3ee();
}
}
}
}
}
}
}
}
}
return _3da;
};
var _3f1=function(_3f2,_3f3){
if(!_3f2){
return _3f3;
}
if(!_3f3){
return _3f2;
}
return function(){
return _3f2.apply(window,arguments)&&_3f3.apply(window,arguments);
};
};
var _3f4=function(i,arr){
var r=arr||[];
if(i){
r.push(i);
}
return r;
};
var _3f8=function(n){
return (1==n.nodeType);
};
var _3fa="";
var _3fb=function(elem,attr){
if(!elem){
return _3fa;
}
if(attr=="class"){
return elem.className||_3fa;
}
if(attr=="for"){
return elem.htmlFor||_3fa;
}
if(attr=="style"){
return elem.style.cssText||_3fa;
}
return (_3d3?elem.getAttribute(attr):elem.getAttribute(attr,2))||_3fa;
};
var _3fe={"*=":function(attr,_400){
return function(elem){
return (_3fb(elem,attr).indexOf(_400)>=0);
};
},"^=":function(attr,_403){
return function(elem){
return (_3fb(elem,attr).indexOf(_403)==0);
};
},"$=":function(attr,_406){
var tval=" "+_406;
return function(elem){
var ea=" "+_3fb(elem,attr);
return (ea.lastIndexOf(_406)==(ea.length-_406.length));
};
},"~=":function(attr,_40b){
var tval=" "+_40b+" ";
return function(elem){
var ea=" "+_3fb(elem,attr)+" ";
return (ea.indexOf(tval)>=0);
};
},"|=":function(attr,_410){
var _411=" "+_410+"-";
return function(elem){
var ea=" "+_3fb(elem,attr);
return ((ea==_410)||(ea.indexOf(_411)==0));
};
},"=":function(attr,_415){
return function(elem){
return (_3fb(elem,attr)==_415);
};
}};
var _417=(typeof _3cf().firstChild.nextElementSibling=="undefined");
var _ns=!_417?"nextElementSibling":"nextSibling";
var _ps=!_417?"previousElementSibling":"previousSibling";
var _41a=(_417?_3f8:_3d4);
var _41b=function(node){
while(node=node[_ps]){
if(_41a(node)){
return false;
}
}
return true;
};
var _41d=function(node){
while(node=node[_ns]){
if(_41a(node)){
return false;
}
}
return true;
};
var _41f=function(node){
var root=node.parentNode;
var i=0,tret=root[_3d1],ci=(node["_i"]||-1),cl=(root["_l"]||-1);
if(!tret){
return -1;
}
var l=tret.length;
if(cl==l&&ci>=0&&cl>=0){
return ci;
}
root["_l"]=l;
ci=-1;
for(var te=root["firstElementChild"]||root["firstChild"];te;te=te[_ns]){
if(_41a(te)){
te["_i"]=++i;
if(node===te){
ci=i;
}
}
}
return ci;
};
var _428=function(elem){
return !((_41f(elem))%2);
};
var _42a=function(elem){
return ((_41f(elem))%2);
};
var _42c={"checked":function(name,_42e){
return function(elem){
return !!d.attr(elem,"checked");
};
},"first-child":function(){
return _41b;
},"last-child":function(){
return _41d;
},"only-child":function(name,_431){
return function(node){
if(!_41b(node)){
return false;
}
if(!_41d(node)){
return false;
}
return true;
};
},"empty":function(name,_434){
return function(elem){
var cn=elem.childNodes;
var cnl=elem.childNodes.length;
for(var x=cnl-1;x>=0;x--){
var nt=cn[x].nodeType;
if((nt===1)||(nt==3)){
return false;
}
}
return true;
};
},"contains":function(name,_43b){
var cz=_43b.charAt(0);
if(cz=="\""||cz=="'"){
_43b=_43b.slice(1,-1);
}
return function(elem){
return (elem.innerHTML.indexOf(_43b)>=0);
};
},"not":function(name,_43f){
var p=_3d5(_43f)[0];
var _441={el:1};
if(p.tag!="*"){
_441.tag=1;
}
if(!p.classes.length){
_441.classes=1;
}
var ntf=_443(p,_441);
return function(elem){
return (!ntf(elem));
};
},"nth-child":function(name,_446){
var pi=parseInt;
if(_446=="odd"){
return _42a;
}else{
if(_446=="even"){
return _428;
}
}
if(_446.indexOf("n")!=-1){
var _448=_446.split("n",2);
var pred=_448[0]?((_448[0]=="-")?-1:pi(_448[0])):1;
var idx=_448[1]?pi(_448[1]):0;
var lb=0,ub=-1;
if(pred>0){
if(idx<0){
idx=(idx%pred)&&(pred+(idx%pred));
}else{
if(idx>0){
if(idx>=pred){
lb=idx-idx%pred;
}
idx=idx%pred;
}
}
}else{
if(pred<0){
pred*=-1;
if(idx>0){
ub=idx;
idx=idx%pred;
}
}
}
if(pred>0){
return function(elem){
var i=_41f(elem);
return (i>=lb)&&(ub<0||i<=ub)&&((i%pred)==idx);
};
}else{
_446=idx;
}
}
var _44f=pi(_446);
return function(elem){
return (_41f(elem)==_44f);
};
}};
var _451=(dojo.isIE&&(dojo.isIE<9||dojo.isQuirks))?function(cond){
var clc=cond.toLowerCase();
if(clc=="class"){
cond="className";
}
return function(elem){
return (_3d3?elem.getAttribute(cond):elem[cond]||elem[clc]);
};
}:function(cond){
return function(elem){
return (elem&&elem.getAttribute&&elem.hasAttribute(cond));
};
};
var _443=function(_457,_458){
if(!_457){
return _3d4;
}
_458=_458||{};
var ff=null;
if(!("el" in _458)){
ff=_3f1(ff,_3f8);
}
if(!("tag" in _458)){
if(_457.tag!="*"){
ff=_3f1(ff,function(elem){
return (elem&&(elem.tagName==_457.getTag()));
});
}
}
if(!("classes" in _458)){
each(_457.classes,function(_45b,idx,arr){
var re=new RegExp("(?:^|\\s)"+_45b+"(?:\\s|$)");
ff=_3f1(ff,function(elem){
return re.test(elem.className);
});
ff.count=idx;
});
}
if(!("pseudos" in _458)){
each(_457.pseudos,function(_460){
var pn=_460.name;
if(_42c[pn]){
ff=_3f1(ff,_42c[pn](pn,_460.value));
}
});
}
if(!("attrs" in _458)){
each(_457.attrs,function(attr){
var _463;
var a=attr.attr;
if(attr.type&&_3fe[attr.type]){
_463=_3fe[attr.type](a,attr.matchFor);
}else{
if(a.length){
_463=_451(a);
}
}
if(_463){
ff=_3f1(ff,_463);
}
});
}
if(!("id" in _458)){
if(_457.id){
ff=_3f1(ff,function(elem){
return (!!elem&&(elem.id==_457.id));
});
}
}
if(!ff){
if(!("default" in _458)){
ff=_3d4;
}
}
return ff;
};
var _466=function(_467){
return function(node,ret,bag){
while(node=node[_ns]){
if(_417&&(!_3f8(node))){
continue;
}
if((!bag||_46b(node,bag))&&_467(node)){
ret.push(node);
}
break;
}
return ret;
};
};
var _46c=function(_46d){
return function(root,ret,bag){
var te=root[_ns];
while(te){
if(_41a(te)){
if(bag&&!_46b(te,bag)){
break;
}
if(_46d(te)){
ret.push(te);
}
}
te=te[_ns];
}
return ret;
};
};
var _472=function(_473){
_473=_473||_3d4;
return function(root,ret,bag){
var te,x=0,tret=root[_3d1];
while(te=tret[x++]){
if(_41a(te)&&(!bag||_46b(te,bag))&&(_473(te,x))){
ret.push(te);
}
}
return ret;
};
};
var _47a=function(node,root){
var pn=node.parentNode;
while(pn){
if(pn==root){
break;
}
pn=pn.parentNode;
}
return !!pn;
};
var _47e={};
var _47f=function(_480){
var _481=_47e[_480.query];
if(_481){
return _481;
}
var io=_480.infixOper;
var oper=(io?io.oper:"");
var _484=_443(_480,{el:1});
var qt=_480.tag;
var _486=("*"==qt);
var ecs=_3cf()["getElementsByClassName"];
if(!oper){
if(_480.id){
_484=(!_480.loops&&_486)?_3d4:_443(_480,{el:1,id:1});
_481=function(root,arr){
var te=d.byId(_480.id,(root.ownerDocument||root));
if(!te||!_484(te)){
return;
}
if(9==root.nodeType){
return _3f4(te,arr);
}else{
if(_47a(te,root)){
return _3f4(te,arr);
}
}
};
}else{
if(ecs&&/\{\s*\[native code\]\s*\}/.test(String(ecs))&&_480.classes.length&&!_3d0){
_484=_443(_480,{el:1,classes:1,id:1});
var _48b=_480.classes.join(" ");
_481=function(root,arr,bag){
var ret=_3f4(0,arr),te,x=0;
var tret=root.getElementsByClassName(_48b);
while((te=tret[x++])){
if(_484(te,root)&&_46b(te,bag)){
ret.push(te);
}
}
return ret;
};
}else{
if(!_486&&!_480.loops){
_481=function(root,arr,bag){
var ret=_3f4(0,arr),te,x=0;
var tret=root.getElementsByTagName(_480.getTag());
while((te=tret[x++])){
if(_46b(te,bag)){
ret.push(te);
}
}
return ret;
};
}else{
_484=_443(_480,{el:1,tag:1,id:1});
_481=function(root,arr,bag){
var ret=_3f4(0,arr),te,x=0;
var tret=root.getElementsByTagName(_480.getTag());
while((te=tret[x++])){
if(_484(te,root)&&_46b(te,bag)){
ret.push(te);
}
}
return ret;
};
}
}
}
}else{
var _4a1={el:1};
if(_486){
_4a1.tag=1;
}
_484=_443(_480,_4a1);
if("+"==oper){
_481=_466(_484);
}else{
if("~"==oper){
_481=_46c(_484);
}else{
if(">"==oper){
_481=_472(_484);
}
}
}
}
return _47e[_480.query]=_481;
};
var _4a2=function(root,_4a4){
var _4a5=_3f4(root),qp,x,te,qpl=_4a4.length,bag,ret;
for(var i=0;i<qpl;i++){
ret=[];
qp=_4a4[i];
x=_4a5.length-1;
if(x>0){
bag={};
ret.nozip=true;
}
var gef=_47f(qp);
while(te=_4a5[x--]){
gef(te,ret,bag);
}
if(!ret.length){
break;
}
_4a5=ret;
}
return ret;
};
var _4ae={},_4af={};
var _4b0=function(_4b1){
var _4b2=_3d5(trim(_4b1));
if(_4b2.length==1){
var tef=_47f(_4b2[0]);
return function(root){
var r=tef(root,new qlc());
if(r){
r.nozip=true;
}
return r;
};
}
return function(root){
return _4a2(root,_4b2);
};
};
var nua=navigator.userAgent;
var wk="WebKit/";
var _4b9=(d.isWebKit&&(nua.indexOf(wk)>0)&&(parseFloat(nua.split(wk)[1])>528));
var _4ba=d.isIE?"commentStrip":"nozip";
var qsa="querySelectorAll";
var _4bc=(!!_3cf()[qsa]&&(!d.isSafari||(d.isSafari>3.1)||_4b9));
var _4bd=function(_4be,_4bf){
if(_4bc){
var _4c0=_4af[_4be];
if(_4c0&&!_4bf){
return _4c0;
}
}
var _4c1=_4ae[_4be];
if(_4c1){
return _4c1;
}
var qcz=_4be.charAt(0);
var _4c3=(-1==_4be.indexOf(" "));
if((_4be.indexOf("#")>=0)&&(_4c3)){
_4bf=true;
}
var _4c4=(_4bc&&(!_4bf)&&(_3d2.indexOf(qcz)==-1)&&(!d.isIE||(_4be.indexOf(":")==-1))&&(!(_3d0&&(_4be.indexOf(".")>=0)))&&(_4be.indexOf(":contains")==-1)&&(_4be.indexOf("|=")==-1));
if(_4c4){
var tq=(_3d2.indexOf(_4be.charAt(_4be.length-1))>=0)?(_4be+" *"):_4be;
return _4af[_4be]=function(root){
try{
if(!((9==root.nodeType)||_4c3)){
throw "";
}
var r=root[qsa](tq);
r[_4ba]=true;
return r;
}
catch(e){
return _4bd(_4be,true)(root);
}
};
}else{
var _4c8=_4be.split(/\s*,\s*/);
return _4ae[_4be]=((_4c8.length<2)?_4b0(_4be):function(root){
var _4ca=0,ret=[],tp;
while((tp=_4c8[_4ca++])){
ret=ret.concat(_4b0(tp)(root));
}
return ret;
});
}
};
var _4cd=0;
var _4ce=d.isIE?function(node){
if(_3d3){
return (node.getAttribute("_uid")||node.setAttribute("_uid",++_4cd)||_4cd);
}else{
return node.uniqueID;
}
}:function(node){
return (node._uid||(node._uid=++_4cd));
};
var _46b=function(node,bag){
if(!bag){
return 1;
}
var id=_4ce(node);
if(!bag[id]){
return bag[id]=1;
}
return 0;
};
var _4d4="_zipIdx";
var _zip=function(arr){
if(arr&&arr.nozip){
return (qlc._wrap)?qlc._wrap(arr):arr;
}
var ret=new qlc();
if(!arr||!arr.length){
return ret;
}
if(arr[0]){
ret.push(arr[0]);
}
if(arr.length<2){
return ret;
}
_4cd++;
if(d.isIE&&_3d3){
var _4d8=_4cd+"";
arr[0].setAttribute(_4d4,_4d8);
for(var x=1,te;te=arr[x];x++){
if(arr[x].getAttribute(_4d4)!=_4d8){
ret.push(te);
}
te.setAttribute(_4d4,_4d8);
}
}else{
if(d.isIE&&arr.commentStrip){
try{
for(var x=1,te;te=arr[x];x++){
if(_3f8(te)){
ret.push(te);
}
}
}
catch(e){
}
}else{
if(arr[0]){
arr[0][_4d4]=_4cd;
}
for(var x=1,te;te=arr[x];x++){
if(arr[x][_4d4]!=_4cd){
ret.push(te);
}
te[_4d4]=_4cd;
}
}
}
return ret;
};
d.query=function(_4db,root){
qlc=d._queryListCtor;
if(!_4db){
return new qlc();
}
if(_4db.constructor==qlc){
return _4db;
}
if(!_3ce(_4db)){
return new qlc(_4db);
}
if(_3ce(root)){
root=d.byId(root);
if(!root){
return new qlc();
}
}
root=root||_3cf();
var od=root.ownerDocument||root.documentElement;
_3d3=(root.contentType&&root.contentType=="application/xml")||(d.isOpera&&(root.doctype||od.toString()=="[object XMLDocument]"))||(!!od)&&(d.isIE?od.xml:(root.xmlVersion||od.xmlVersion));
var r=_4bd(_4db)(root);
if(r&&r.nozip&&!qlc._wrap){
return r;
}
return _zip(r);
};
d.query.pseudos=_42c;
d._filterQueryResult=function(_4df,_4e0){
var _4e1=new d._queryListCtor();
var _4e2=_443(_3d5(_4e0)[0]);
for(var x=0,te;te=_4df[x];x++){
if(_4e2(te)){
_4e1.push(te);
}
}
return _4e1;
};
})(this["queryPortability"]||this["acme"]||dojo);
}
if(!dojo._hasResource["dojo._base.xhr"]){
dojo._hasResource["dojo._base.xhr"]=true;
dojo.provide("dojo._base.xhr");
(function(){
var _d=dojo;
function _4e6(obj,name,_4e9){
var val=obj[name];
if(_d.isString(val)){
obj[name]=[val,_4e9];
}else{
if(_d.isArray(val)){
val.push(_4e9);
}else{
obj[name]=_4e9;
}
}
};
dojo.formToObject=function(_4eb){
var ret={};
var _4ed="file|submit|image|reset|button|";
_d.forEach(dojo.byId(_4eb).elements,function(item){
var _in=item.name;
var type=(item.type||"").toLowerCase();
if(_in&&type&&_4ed.indexOf(type)==-1&&!item.disabled){
if(type=="radio"||type=="checkbox"){
if(item.checked){
_4e6(ret,_in,item.value);
}
}else{
if(item.multiple){
ret[_in]=[];
_d.query("option",item).forEach(function(opt){
if(opt.selected){
_4e6(ret,_in,opt.value);
}
});
}else{
_4e6(ret,_in,item.value);
if(type=="image"){
ret[_in+".x"]=ret[_in+".y"]=ret[_in].x=ret[_in].y=0;
}
}
}
}
});
return ret;
};
dojo.objectToQuery=function(map){
var enc=encodeURIComponent;
var _4f4=[];
var _4f5={};
for(var name in map){
var _4f7=map[name];
if(_4f7!=_4f5[name]){
var _4f8=enc(name)+"=";
if(_d.isArray(_4f7)){
for(var i=0;i<_4f7.length;i++){
_4f4.push(_4f8+enc(_4f7[i]));
}
}else{
_4f4.push(_4f8+enc(_4f7));
}
}
}
return _4f4.join("&");
};
dojo.formToQuery=function(_4fa){
return _d.objectToQuery(_d.formToObject(_4fa));
};
dojo.formToJson=function(_4fb,_4fc){
return _d.toJson(_d.formToObject(_4fb),_4fc);
};
dojo.queryToObject=function(str){
var ret={};
var qp=str.split("&");
var dec=decodeURIComponent;
_d.forEach(qp,function(item){
if(item.length){
var _502=item.split("=");
var name=dec(_502.shift());
var val=dec(_502.join("="));
if(_d.isString(ret[name])){
ret[name]=[ret[name]];
}
if(_d.isArray(ret[name])){
ret[name].push(val);
}else{
ret[name]=val;
}
}
});
return ret;
};
dojo._blockAsync=false;
dojo._contentHandlers={text:function(xhr){
return xhr.responseText;
},json:function(xhr){
return _d.fromJson(xhr.responseText||null);
},"json-comment-filtered":function(xhr){
if(!dojo.config.useCommentedJson){
console.warn("Consider using the standard mimetype:application/json."+" json-commenting can introduce security issues. To"+" decrease the chances of hijacking, use the standard the 'json' handler and"+" prefix your json with: {}&&\n"+"Use djConfig.useCommentedJson=true to turn off this message.");
}
var _508=xhr.responseText;
var _509=_508.indexOf("/*");
var _50a=_508.lastIndexOf("*/");
if(_509==-1||_50a==-1){
throw new Error("JSON was not comment filtered");
}
return _d.fromJson(_508.substring(_509+2,_50a));
},javascript:function(xhr){
return _d.eval(xhr.responseText);
},xml:function(xhr){
var _50d=xhr.responseXML;
if(_d.isIE&&(!_50d||!_50d.documentElement)){
var ms=function(n){
return "MSXML"+n+".DOMDocument";
};
var dp=["Microsoft.XMLDOM",ms(6),ms(4),ms(3),ms(2)];
_d.some(dp,function(p){
try{
var dom=new ActiveXObject(p);
dom.async=false;
dom.loadXML(xhr.responseText);
_50d=dom;
}
catch(e){
return false;
}
return true;
});
}
return _50d;
}};
dojo._contentHandlers["json-comment-optional"]=function(xhr){
var _514=_d._contentHandlers;
if(xhr.responseText&&xhr.responseText.indexOf("/*")!=-1){
return _514["json-comment-filtered"](xhr);
}else{
return _514["json"](xhr);
}
};
dojo._ioSetArgs=function(args,_516,_517,_518){
var _519={args:args,url:args.url};
var _51a=null;
if(args.form){
var form=_d.byId(args.form);
var _51c=form.getAttributeNode("action");
_519.url=_519.url||(_51c?_51c.value:null);
_51a=_d.formToObject(form);
}
var _51d=[{}];
if(_51a){
_51d.push(_51a);
}
if(args.content){
_51d.push(args.content);
}
if(args.preventCache){
_51d.push({"dojo.preventCache":new Date().valueOf()});
}
_519.query=_d.objectToQuery(_d.mixin.apply(null,_51d));
_519.handleAs=args.handleAs||"text";
var d=new _d.Deferred(_516);
d.addCallbacks(_517,function(_51f){
return _518(_51f,d);
});
var ld=args.load;
if(ld&&_d.isFunction(ld)){
d.addCallback(function(_521){
return ld.call(args,_521,_519);
});
}
var err=args.error;
if(err&&_d.isFunction(err)){
d.addErrback(function(_523){
return err.call(args,_523,_519);
});
}
var _524=args.handle;
if(_524&&_d.isFunction(_524)){
d.addBoth(function(_525){
return _524.call(args,_525,_519);
});
}
d.ioArgs=_519;
return d;
};
var _526=function(dfd){
dfd.canceled=true;
var xhr=dfd.ioArgs.xhr;
var _at=typeof xhr.abort;
if(_at=="function"||_at=="object"||_at=="unknown"){
xhr.abort();
}
var err=dfd.ioArgs.error;
if(!err){
err=new Error("xhr cancelled");
err.dojoType="cancel";
}
return err;
};
var _52b=function(dfd){
var ret=_d._contentHandlers[dfd.ioArgs.handleAs](dfd.ioArgs.xhr);
return ret===undefined?null:ret;
};
var _52e=function(_52f,dfd){
console.error(_52f);
return _52f;
};
var _531=null;
var _532=[];
var _533=function(){
var now=(new Date()).getTime();
if(!_d._blockAsync){
for(var i=0,tif;i<_532.length&&(tif=_532[i]);i++){
var dfd=tif.dfd;
var func=function(){
if(!dfd||dfd.canceled||!tif.validCheck(dfd)){
_532.splice(i--,1);
}else{
if(tif.ioCheck(dfd)){
_532.splice(i--,1);
tif.resHandle(dfd);
}else{
if(dfd.startTime){
if(dfd.startTime+(dfd.ioArgs.args.timeout||0)<now){
_532.splice(i--,1);
var err=new Error("timeout exceeded");
err.dojoType="timeout";
dfd.errback(err);
dfd.cancel();
}
}
}
}
};
if(dojo.config.debugAtAllCosts){
func.call(this);
}else{
try{
func.call(this);
}
catch(e){
dfd.errback(e);
}
}
}
}
if(!_532.length){
clearInterval(_531);
_531=null;
return;
}
};
dojo._ioCancelAll=function(){
try{
_d.forEach(_532,function(i){
try{
i.dfd.cancel();
}
catch(e){
}
});
}
catch(e){
}
};
if(_d.isIE){
_d.addOnWindowUnload(_d._ioCancelAll);
}
_d._ioWatch=function(dfd,_53c,_53d,_53e){
var args=dfd.ioArgs.args;
if(args.timeout){
dfd.startTime=(new Date()).getTime();
}
_532.push({dfd:dfd,validCheck:_53c,ioCheck:_53d,resHandle:_53e});
if(!_531){
_531=setInterval(_533,50);
}
if(args.sync){
_533();
}
};
var _540="application/x-www-form-urlencoded";
var _541=function(dfd){
return dfd.ioArgs.xhr.readyState;
};
var _543=function(dfd){
return 4==dfd.ioArgs.xhr.readyState;
};
var _545=function(dfd){
var xhr=dfd.ioArgs.xhr;
if(_d._isDocumentOk(xhr)){
dfd.callback(dfd);
}else{
var err=new Error("Unable to load "+dfd.ioArgs.url+" status:"+xhr.status);
err.status=xhr.status;
err.responseText=xhr.responseText;
dfd.errback(err);
}
};
dojo._ioAddQueryToUrl=function(_549){
if(_549.query.length){
_549.url+=(_549.url.indexOf("?")==-1?"?":"&")+_549.query;
_549.query=null;
}
};
dojo.xhr=function(_54a,args,_54c){
var dfd=_d._ioSetArgs(args,_526,_52b,_52e);
dfd.ioArgs.xhr=_d._xhrObj(dfd.ioArgs.args);
if(_54c){
if("postData" in args){
dfd.ioArgs.query=args.postData;
}else{
if("putData" in args){
dfd.ioArgs.query=args.putData;
}
}
}else{
_d._ioAddQueryToUrl(dfd.ioArgs);
}
var _54e=dfd.ioArgs;
var xhr=_54e.xhr;
xhr.open(_54a,_54e.url,args.sync!==true,args.user||undefined,args.password||undefined);
if(args.headers){
for(var hdr in args.headers){
if(hdr.toLowerCase()==="content-type"&&!args.contentType){
args.contentType=args.headers[hdr];
}else{
xhr.setRequestHeader(hdr,args.headers[hdr]);
}
}
}
xhr.setRequestHeader("Content-Type",args.contentType||_540);
if(!args.headers||!args.headers["X-Requested-With"]){
xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
}
if(dojo.config.debugAtAllCosts){
xhr.send(_54e.query);
}else{
try{
xhr.send(_54e.query);
}
catch(e){
dfd.ioArgs.error=e;
dfd.cancel();
}
}
_d._ioWatch(dfd,_541,_543,_545);
xhr=null;
return dfd;
};
dojo.xhrGet=function(args){
return _d.xhr("GET",args);
};
dojo.rawXhrPost=dojo.xhrPost=function(args){
return _d.xhr("POST",args,true);
};
dojo.rawXhrPut=dojo.xhrPut=function(args){
return _d.xhr("PUT",args,true);
};
dojo.xhrDelete=function(args){
return _d.xhr("DELETE",args);
};
})();
}
if(!dojo._hasResource["dojo._base.fx"]){
dojo._hasResource["dojo._base.fx"]=true;
dojo.provide("dojo._base.fx");
(function(){
var d=dojo;
var _556=d.mixin;
dojo._Line=function(_557,end){
this.start=_557;
this.end=end;
};
dojo._Line.prototype.getValue=function(n){
return ((this.end-this.start)*n)+this.start;
};
d.declare("dojo._Animation",null,{constructor:function(args){
_556(this,args);
if(d.isArray(this.curve)){
this.curve=new d._Line(this.curve[0],this.curve[1]);
}
},duration:350,repeat:0,rate:10,_percent:0,_startRepeatCount:0,_fire:function(evt,args){
if(this[evt]){
if(dojo.config.debugAtAllCosts){
this[evt].apply(this,args||[]);
}else{
try{
this[evt].apply(this,args||[]);
}
catch(e){
console.error("exception in animation handler for:",evt);
console.error(e);
}
}
}
return this;
},play:function(_55d,_55e){
var _t=this;
if(_t._delayTimer){
_t._clearTimer();
}
if(_55e){
_t._stopTimer();
_t._active=_t._paused=false;
_t._percent=0;
}else{
if(_t._active&&!_t._paused){
return _t;
}
}
_t._fire("beforeBegin");
var de=_55d||_t.delay,_p=dojo.hitch(_t,"_play",_55e);
if(de>0){
_t._delayTimer=setTimeout(_p,de);
return _t;
}
_p();
return _t;
},_play:function(_562){
var _t=this;
if(_t._delayTimer){
_t._clearTimer();
}
_t._startTime=new Date().valueOf();
if(_t._paused){
_t._startTime-=_t.duration*_t._percent;
}
_t._endTime=_t._startTime+_t.duration;
_t._active=true;
_t._paused=false;
var _564=_t.curve.getValue(_t._percent);
if(!_t._percent){
if(!_t._startRepeatCount){
_t._startRepeatCount=_t.repeat;
}
_t._fire("onBegin",[_564]);
}
_t._fire("onPlay",[_564]);
_t._cycle();
return _t;
},pause:function(){
var _t=this;
if(_t._delayTimer){
_t._clearTimer();
}
_t._stopTimer();
if(!_t._active){
return _t;
}
_t._paused=true;
_t._fire("onPause",[_t.curve.getValue(_t._percent)]);
return _t;
},gotoPercent:function(_566,_567){
var _t=this;
_t._stopTimer();
_t._active=_t._paused=true;
_t._percent=_566;
if(_567){
_t.play();
}
return _t;
},stop:function(_569){
var _t=this;
if(_t._delayTimer){
_t._clearTimer();
}
if(!_t._timer){
return _t;
}
_t._stopTimer();
if(_569){
_t._percent=1;
}
_t._fire("onStop",[_t.curve.getValue(_t._percent)]);
_t._active=_t._paused=false;
return _t;
},status:function(){
if(this._active){
return this._paused?"paused":"playing";
}
return "stopped";
},_cycle:function(){
var _t=this;
if(_t._active){
var curr=new Date().valueOf();
var step=(curr-_t._startTime)/(_t._endTime-_t._startTime);
if(step>=1){
step=1;
}
_t._percent=step;
if(_t.easing){
step=_t.easing(step);
}
_t._fire("onAnimate",[_t.curve.getValue(step)]);
if(_t._percent<1){
_t._startTimer();
}else{
_t._active=false;
if(_t.repeat>0){
_t.repeat--;
_t.play(null,true);
}else{
if(_t.repeat==-1){
_t.play(null,true);
}else{
if(_t._startRepeatCount){
_t.repeat=_t._startRepeatCount;
_t._startRepeatCount=0;
}
}
}
_t._percent=0;
_t._fire("onEnd");
_t._stopTimer();
}
}
return _t;
},_clearTimer:function(){
clearTimeout(this._delayTimer);
delete this._delayTimer;
}});
var ctr=0,_56f=[],_570=null,_571={run:function(){
}};
dojo._Animation.prototype._startTimer=function(){
if(!this._timer){
this._timer=d.connect(_571,"run",this,"_cycle");
ctr++;
}
if(!_570){
_570=setInterval(d.hitch(_571,"run"),this.rate);
}
};
dojo._Animation.prototype._stopTimer=function(){
if(this._timer){
d.disconnect(this._timer);
this._timer=null;
ctr--;
}
if(ctr<=0){
clearInterval(_570);
_570=null;
ctr=0;
}
};
var _572=d.isIE?function(node){
var ns=node.style;
if(!ns.width.length&&d.style(node,"width")=="auto"){
ns.width="auto";
}
}:function(){
};
dojo._fade=function(args){
args.node=d.byId(args.node);
var _576=_556({properties:{}},args),_577=(_576.properties.opacity={});
_577.start=!("start" in _576)?function(){
return +d.style(_576.node,"opacity")||0;
}:_576.start;
_577.end=_576.end;
var anim=d.animateProperty(_576);
d.connect(anim,"beforeBegin",d.partial(_572,_576.node));
return anim;
};
dojo.fadeIn=function(args){
return d._fade(_556({end:1},args));
};
dojo.fadeOut=function(args){
return d._fade(_556({end:0},args));
};
dojo._defaultEasing=function(n){
return 0.5+((Math.sin((n+1.5)*Math.PI))/2);
};
var _57c=function(_57d){
this._properties=_57d;
for(var p in _57d){
var prop=_57d[p];
if(prop.start instanceof d.Color){
prop.tempColor=new d.Color();
}
}
};
_57c.prototype.getValue=function(r){
var ret={};
for(var p in this._properties){
var prop=this._properties[p],_584=prop.start;
if(_584 instanceof d.Color){
ret[p]=d.blendColors(_584,prop.end,r,prop.tempColor).toCss();
}else{
if(!d.isArray(_584)){
ret[p]=((prop.end-_584)*r)+_584+(p!="opacity"?prop.units||"px":0);
}
}
}
return ret;
};
dojo.animateProperty=function(args){
args.node=d.byId(args.node);
if(!args.easing){
args.easing=d._defaultEasing;
}
var anim=new d._Animation(args);
d.connect(anim,"beforeBegin",anim,function(){
var pm={};
for(var p in this.properties){
if(p=="width"||p=="height"){
this.node.display="block";
}
var prop=this.properties[p];
prop=pm[p]=_556({},(d.isObject(prop)?prop:{end:prop}));
if(d.isFunction(prop.start)){
prop.start=prop.start();
}
if(d.isFunction(prop.end)){
prop.end=prop.end();
}
var _58a=(p.toLowerCase().indexOf("color")>=0);
function _58b(node,p){
var v={height:node.offsetHeight,width:node.offsetWidth}[p];
if(v!==undefined){
return v;
}
v=d.style(node,p);
return (p=="opacity")?+v:(_58a?v:parseFloat(v));
};
if(!("end" in prop)){
prop.end=_58b(this.node,p);
}else{
if(!("start" in prop)){
prop.start=_58b(this.node,p);
}
}
if(_58a){
prop.start=new d.Color(prop.start);
prop.end=new d.Color(prop.end);
}else{
prop.start=(p=="opacity")?+prop.start:parseFloat(prop.start);
}
}
this.curve=new _57c(pm);
});
d.connect(anim,"onAnimate",d.hitch(d,"style",anim.node));
return anim;
};
dojo.anim=function(node,_590,_591,_592,_593,_594){
return d.animateProperty({node:node,duration:_591||d._Animation.prototype.duration,properties:_590,easing:_592,onEnd:_593}).play(_594||0);
};
})();
}
if(!dojo._hasResource["dojo.i18n"]){
dojo._hasResource["dojo.i18n"]=true;
dojo.provide("dojo.i18n");
dojo.i18n.getLocalization=function(_595,_596,_597){
_597=dojo.i18n.normalizeLocale(_597);
var _598=_597.split("-");
var _599=[_595,"nls",_596].join(".");
var _59a=dojo._loadedModules[_599];
if(_59a){
var _59b;
for(var i=_598.length;i>0;i--){
var loc=_598.slice(0,i).join("_");
if(_59a[loc]){
_59b=_59a[loc];
break;
}
}
if(!_59b){
_59b=_59a.ROOT;
}
if(_59b){
var _59e=function(){
};
_59e.prototype=_59b;
return new _59e();
}
}
throw new Error("Bundle not found: "+_596+" in "+_595+" , locale="+_597);
};
dojo.i18n.normalizeLocale=function(_59f){
var _5a0=_59f?_59f.toLowerCase():dojo.locale;
if(_5a0=="root"){
_5a0="ROOT";
}
return _5a0;
};
dojo.i18n._requireLocalization=function(_5a1,_5a2,_5a3,_5a4){
var _5a5=dojo.i18n.normalizeLocale(_5a3);
var _5a6=[_5a1,"nls",_5a2].join(".");
var _5a7="";
if(_5a4){
var _5a8=_5a4.split(",");
for(var i=0;i<_5a8.length;i++){
if(_5a5["indexOf"](_5a8[i])==0){
if(_5a8[i].length>_5a7.length){
_5a7=_5a8[i];
}
}
}
if(!_5a7){
_5a7="ROOT";
}
}
var _5aa=_5a4?_5a7:_5a5;
var _5ab=dojo._loadedModules[_5a6];
var _5ac=null;
if(_5ab){
if(dojo.config.localizationComplete&&_5ab._built){
return;
}
var _5ad=_5aa.replace(/-/g,"_");
var _5ae=_5a6+"."+_5ad;
_5ac=dojo._loadedModules[_5ae];
}
if(!_5ac){
_5ab=dojo["provide"](_5a6);
var syms=dojo._getModuleSymbols(_5a1);
var _5b0=syms.concat("nls").join("/");
var _5b1;
dojo.i18n._searchLocalePath(_5aa,_5a4,function(loc){
var _5b3=loc.replace(/-/g,"_");
var _5b4=_5a6+"."+_5b3;
var _5b5=false;
if(!dojo._loadedModules[_5b4]){
dojo["provide"](_5b4);
var _5b6=[_5b0];
if(loc!="ROOT"){
_5b6.push(loc);
}
_5b6.push(_5a2);
var _5b7=_5b6.join("/")+".js";
_5b5=dojo._loadPath(_5b7,null,function(hash){
var _5b9=function(){
};
_5b9.prototype=_5b1;
_5ab[_5b3]=new _5b9();
for(var j in hash){
_5ab[_5b3][j]=hash[j];
}
});
}else{
_5b5=true;
}
if(_5b5&&_5ab[_5b3]){
_5b1=_5ab[_5b3];
}else{
_5ab[_5b3]=_5b1;
}
if(_5a4){
return true;
}
});
}
if(_5a4&&_5a5!=_5a7){
_5ab[_5a5.replace(/-/g,"_")]=_5ab[_5a7.replace(/-/g,"_")];
}
};
(function(){
var _5bb=dojo.config.extraLocale;
if(_5bb){
if(!_5bb instanceof Array){
_5bb=[_5bb];
}
var req=dojo.i18n._requireLocalization;
dojo.i18n._requireLocalization=function(m,b,_5bf,_5c0){
req(m,b,_5bf,_5c0);
if(_5bf){
return;
}
for(var i=0;i<_5bb.length;i++){
req(m,b,_5bb[i],_5c0);
}
};
}
})();
dojo.i18n._searchLocalePath=function(_5c2,down,_5c4){
_5c2=dojo.i18n.normalizeLocale(_5c2);
var _5c5=_5c2.split("-");
var _5c6=[];
for(var i=_5c5.length;i>0;i--){
_5c6.push(_5c5.slice(0,i).join("-"));
}
_5c6.push(false);
if(down){
_5c6.reverse();
}
for(var j=_5c6.length-1;j>=0;j--){
var loc=_5c6[j]||"ROOT";
var stop=_5c4(loc);
if(stop){
break;
}
}
};
dojo.i18n._preloadLocalizations=function(_5cb,_5cc){
function _5cd(_5ce){
_5ce=dojo.i18n.normalizeLocale(_5ce);
dojo.i18n._searchLocalePath(_5ce,true,function(loc){
for(var i=0;i<_5cc.length;i++){
if(_5cc[i]==loc){
dojo["require"](_5cb+"_"+loc);
return true;
}
}
return false;
});
};
_5cd();
var _5d1=dojo.config.extraLocale||[];
for(var i=0;i<_5d1.length;i++){
_5cd(_5d1[i]);
}
};
}
if(!dojo._hasResource["dojo._base.browser"]){
dojo._hasResource["dojo._base.browser"]=true;
dojo.provide("dojo._base.browser");
dojo.forEach(dojo.config.require,function(i){
dojo["require"](i);
});
}
if(dojo.config.afterOnLoad&&dojo.isBrowser){
window.setTimeout(dojo._loadInit,1000);
}
})();
/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


sc_dojo._xdResourceLoaded(function(_1,_2,_3){
return {depends:[["provide","dojo.i18n"]],defineResource:function(_4,_5,_6){
if(!_4._hasResource["dojo.i18n"]){
_4._hasResource["dojo.i18n"]=true;
_4.provide("dojo.i18n");
_4.i18n.getLocalization=function(_7,_8,_9){
_9=_4.i18n.normalizeLocale(_9);
var _a=_9.split("-");
var _b=[_7,"nls",_8].join(".");
var _c=_4._loadedModules[_b];
if(_c){
var _d;
for(var i=_a.length;i>0;i--){
var _f=_a.slice(0,i).join("_");
if(_c[_f]){
_d=_c[_f];
break;
}
}
if(!_d){
_d=_c.ROOT;
}
if(_d){
var _10=function(){
};
_10.prototype=_d;
return new _10();
}
}
throw new Error("Bundle not found: "+_8+" in "+_7+" , locale="+_9);
};
_4.i18n.normalizeLocale=function(_11){
var _12=_11?_11.toLowerCase():_4.locale;
if(_12=="root"){
_12="ROOT";
}
return _12;
};
_4.i18n._requireLocalization=function(_13,_14,_15,_16){
var _17=_4.i18n.normalizeLocale(_15);
var _18=[_13,"nls",_14].join(".");
var _19="";
if(_16){
var _1a=_16.split(",");
for(var i=0;i<_1a.length;i++){
if(_17["indexOf"](_1a[i])==0){
if(_1a[i].length>_19.length){
_19=_1a[i];
}
}
}
if(!_19){
_19="ROOT";
}
}
var _1c=_16?_19:_17;
var _1d=_4._loadedModules[_18];
var _1e=null;
if(_1d){
if(_4.config.localizationComplete&&_1d._built){
return;
}
var _1f=_1c.replace(/-/g,"_");
var _20=_18+"."+_1f;
_1e=_4._loadedModules[_20];
}
if(!_1e){
_1d=_4["provide"](_18);
var _21=_4._getModuleSymbols(_13);
var _22=_21.concat("nls").join("/");
var _23;
_4.i18n._searchLocalePath(_1c,_16,function(loc){
var _25=loc.replace(/-/g,"_");
var _26=_18+"."+_25;
var _27=false;
if(!_4._loadedModules[_26]){
_4["provide"](_26);
var _28=[_22];
if(loc!="ROOT"){
_28.push(loc);
}
_28.push(_14);
var _29=_28.join("/")+".js";
_27=_4._loadPath(_29,null,function(_2a){
var _2b=function(){
};
_2b.prototype=_23;
_1d[_25]=new _2b();
for(var j in _2a){
_1d[_25][j]=_2a[j];
}
});
}else{
_27=true;
}
if(_27&&_1d[_25]){
_23=_1d[_25];
}else{
_1d[_25]=_23;
}
if(_16){
return true;
}
});
}
if(_16&&_17!=_19){
_1d[_17.replace(/-/g,"_")]=_1d[_19.replace(/-/g,"_")];
}
};
(function(){
var _2d=_4.config.extraLocale;
if(_2d){
if(!_2d instanceof Array){
_2d=[_2d];
}
var req=_4.i18n._requireLocalization;
_4.i18n._requireLocalization=function(m,b,_31,_32){
req(m,b,_31,_32);
if(_31){
return;
}
for(var i=0;i<_2d.length;i++){
req(m,b,_2d[i],_32);
}
};
}
})();
_4.i18n._searchLocalePath=function(_34,_35,_36){
_34=_4.i18n.normalizeLocale(_34);
var _37=_34.split("-");
var _38=[];
for(var i=_37.length;i>0;i--){
_38.push(_37.slice(0,i).join("-"));
}
_38.push(false);
if(_35){
_38.reverse();
}
for(var j=_38.length-1;j>=0;j--){
var loc=_38[j]||"ROOT";
var _3c=_36(loc);
if(_3c){
break;
}
}
};
_4.i18n._preloadLocalizations=function(_3d,_3e){
function _3f(_40){
_40=_4.i18n.normalizeLocale(_40);
_4.i18n._searchLocalePath(_40,true,function(loc){
for(var i=0;i<_3e.length;i++){
if(_3e[i]==loc){
_4["require"](_3d+"_"+loc);
return true;
}
}
return false;
});
};
_3f();
var _43=_4.config.extraLocale||[];
for(var i=0;i<_43.length;i++){
_3f(_43[i]);
}
};
}
}};
});
