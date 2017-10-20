/**
* jPList - jQuery Data Grid Controls 5.2.0.11 - http://jplist.com 
* Copyright 2016 Miriam Zusin
*/
(function(){var b=function(d,f){d&&d.panel&&d.controller&&(d.panel.addControl(f.$control),d.controller.addPaths(d.panel.paths))},c=function(d){d.observer.on(d.observer.events.knownStatusesChanged,function(f,e){var a;if(e&&(a=d.panel.mergeStatuses(e))&&0<a.length&&(d.storage.save(a),d.controller.renderStatuses(a,d.history.getLastStatus()),a=!1,e)){for(var c=0;c<e.length;c++)if(e[c].isAnimateToTop){a=!0;break}a&&(a=jQuery(d.options.animateToTop).offset().top,jQuery("html, body").animate({scrollTop:a},
d.options.animateToTopDuration))}});d.observer.on(d.observer.events.unknownStatusesChanged,function(f,e){var a;a=d.panel.getStatuses(e);0<a.length&&(d.storage.save(a),d.controller.renderStatuses(a,d.history.getLastStatus()))});d.observer.on(d.observer.events.statusesAppliedToList,function(f,e,a){d.panel.setStatuses(a);jQuery.fn.jplist.DeepLinksService.updateUrlPerControls(d.options,d.panel.getDeepLinksURLPerControls())});d.observer.on(d.observer.events.statusesChangedByDeepLinks,function(f,e,a){d.panel.statusesChangedByDeepLinks(e,
a)});d.$root.find(d.options.iosBtnPath).on("click",function(){jQuery(this).next(d.options.panelPath).toggleClass("jplist-ios-show")})},a=function(a,f){var e={observer:null,panel:null,controller:null,storage:null,$root:f};e.options=jQuery.extend(!0,{debug:!1,command:"init",commandData:{},itemsBox:".list",itemPath:".list-item",panelPath:".panel",noResults:".jplist-no-results",redrawCallback:"",iosBtnPath:".jplist-ios-button",animateToTop:"html, body",animateToTopDuration:0,effect:"",duration:300,fps:24,
storage:"",storageName:"jplist",cookiesExpiration:-1,deepLinking:!1,hashStart:"#",delimiter0:":",delimiter1:"|",delimiter2:"~",delimiter3:"!",historyLength:10,dataSource:{server:{ajax:{url:"server.php",dataType:"html",type:"POST"},serverOkCallback:null,serverErrorCallback:null},render:null}},a);e.observer=new jQuery.fn.jplist.PubSub(e.$root,e.options);e.history=new jQuery.fn.jplist.History(e.$root,e.options,e.observer);e.panel=new jQuery.fn.jplist.PanelController(f,e.options,e.history,e.observer);
e.storage=new jQuery.fn.jplist.Storage(e.options.storage,e.options.storageName,e.options.cookiesExpiration);e.controller=new jQuery.fn.jplist.ServerController(e.$root,e.options,e.observer,e.history);c(e);e.options.deepLinking?e.panel.setStatusesByDeepLink():e.panel.setStatusesFromStorage();return jQuery.extend(this,e)};jQuery.fn.jplist=function(d){if(d.command&&"init"!==d.command){var f;if(f=this.data("jplist"))switch(d.command){case "addControl":b(f,d.commandData)}}else return this.each(function(){var e,
f=jQuery(this);e=new a(d,f);f.data("jplist",e)})};jQuery.jplist={};jQuery.fn.jplist.controls=jQuery.fn.jplist.controls||{};jQuery.fn.jplist.itemControls=jQuery.fn.jplist.itemControls||{};jQuery.fn.jplist.controlTypes={};jQuery.fn.jplist.itemControlTypes={};jQuery.fn.jplist.settings={}})();(function(){var b=function(c){var a=jQuery.fn.trigger;c.options.debug&&(jQuery.fn.trigger=function(d){for(var f in c.events)if(c.events[f]==d){console.log(f,arguments);break}return a.apply(this,arguments)})};jQuery.fn.jplist.PubSub=function(c,a){var d={options:a,$root:c,events:{unknownStatusesChanged:"1",knownStatusesChanged:"2",statusesChangedByDeepLinks:"3",statusesAppliedToList:"4",animationStartEvent:"5",animationStepEvent:"6",animationCompleteEvent:"7"}};b(d);return jQuery.extend(!0,jQuery({}),
this,d)}})();(function(){jQuery.fn.jplist.History=function(b,c,a){this.options=c;this.observer=a;this.$root=b;this.statusesQueue=[];this.listStatusesQueue=[]};jQuery.fn.jplist.History.prototype.addStatuses=function(b){for(var c=0;c<b.length;c++)this.statusesQueue.push(b[c]),this.statusesQueue.length>this.options.historyLength&&this.statusesQueue.shift()};jQuery.fn.jplist.History.prototype.getLastStatus=function(){var b=null;0<this.statusesQueue.length&&(b=this.statusesQueue[this.statusesQueue.length-1]);return b};
jQuery.fn.jplist.History.prototype.getLastList=function(){var b=null;0<this.listStatusesQueue.length&&(b=this.listStatusesQueue[this.listStatusesQueue.length-1]);return b};jQuery.fn.jplist.History.prototype.addList=function(b){this.listStatusesQueue.push(b);this.listStatusesQueue.length>this.options.historyLength&&this.listStatusesQueue.shift()};jQuery.fn.jplist.History.prototype.popList=function(){var b=null;0<this.listStatusesQueue.length&&(b=this.listStatusesQueue.pop());return b}})();(function(){jQuery.fn.jplist.StatusDTO=function(b,c,a,d,f,e,h,g){this.action=c;this.name=b;this.type=a;this.data=d;this.inStorage=f;this.inAnimation=e;this.isAnimateToTop=h;this.inDeepLinking=g}})();(function(){jQuery.fn.jplist.StatusesService=jQuery.fn.jplist.StatusesService||{};jQuery.fn.jplist.StatusesService.getStatusesByAction=function(c,a){for(var d=[],f,e=0;e<a.length;e++)f=a[e],f.action===c&&d.push(f);return d};jQuery.fn.jplist.StatusesService.getSortStatuses=function(c){var a,d=[],f;c=jQuery.fn.jplist.StatusesService.getStatusesByAction("sort",c);if(jQuery.isArray(c))for(var e=0;e<c.length;e++)if((a=c[e])&&a.data&&a.data.sortGroup&&jQuery.isArray(a.data.sortGroup)&&0<a.data.sortGroup.length)for(var b=
0;b<a.data.sortGroup.length;b++)f=new jQuery.fn.jplist.StatusDTO(a.name,a.action,a.type,a.data.sortGroup[b],a.inStorage,a.inAnimation,a.isAnimateToTop,a.inDeepLinking),d.push(f);else d.push(a);return d};jQuery.fn.jplist.StatusesService.getFilterStatuses=function(c){var a,d,f=[];c=jQuery.fn.jplist.StatusesService.getStatusesByAction("filter",c);if(jQuery.isArray(c))for(var e=0;e<c.length;e++)(a=c[e])&&a.data&&a.data.filterType&&(d=jQuery.fn.jplist.DTOMapperService.filters[a.data.filterType],jQuery.isFunction(d)&&
f.push(a));return f};var b=function(c,a,d,f){for(var e=[],b,g=0;g<c.length;g++)b=c[g],b[a]===d&&(f&&(b.initialIndex=g),e.push(b));return e};jQuery.fn.jplist.StatusesService.add=function(c,a,d){var f,e,h;if(0===c.length)c.push(a);else if(f=b(c,"action",a.action,!0),0===f.length)c.push(a);else if(e=b(f,"name",a.name,!1),0===e.length)c.push(a);else{h=!1;for(var g=0;g<e.length;g++)f=e[g],f.type===a.type&&(h=!0,d&&(c[f.initialIndex]=a));h||c.push(a)}}})();(function(){jQuery.fn.jplist.DeepLinksService={};jQuery.fn.jplist.DeepLinksService.getUrlParams=function(b){var c=[],a,d=[],f,c=window.decodeURIComponent(jQuery.trim(window.location.hash.replace(b.hashStart,"")));if(b.deepLinking&&""!==jQuery.trim(c))for(var c=c.split(b.delimiter1),e=0;e<c.length;e++)a=c[e],f=a.split("="),2===f.length&&(a=f[0],f=f[1],a=a.split(b.delimiter0),2===a.length&&(a={controlName:a[0],propName:a[1],propValue:f},d.push(a)));return d};jQuery.fn.jplist.DeepLinksService.updateUrlPerControls=
function(b,c){if(b.deepLinking){var a=jQuery.trim(c.replace(b.hashStart,"")),d,a=""===a?b.hashStart:b.hashStart+a;window.location.hash!==a&&(d=window.location.href.indexOf(b.hashStart),a=-1==d?window.location.href+a:window.location.href.substring(0,d)+a,"replaceState"in window.history?window.history.replaceState("","",a):window.location.replace(a))}}})();(function(){jQuery.fn.jplist.PathModel=function(b,c){this.jqPath=b;this.dataType=c};jQuery.fn.jplist.PathModel.prototype.isEqual=function(b,c){var a=!1;c?this.jqPath===b.jqPath&&(a=!0):this.jqPath===b.jqPath&&this.dataType===b.dataType&&(a=!0);return a}})();(function(){jQuery.fn.jplist.PaginationService=function(b,c,a){a=Number(a);isNaN(a)&&(a=0);a=this.itemsNumber=a;jQuery.isNumeric(c)?(c=Number(c),isNaN(c)&&(c=a)):c=a;this.itemsOnPage=c;c=(c=this.itemsOnPage)?Math.ceil(this.itemsNumber/c):0;c=this.pagesNumber=c;b=Number(b);isNaN(b)&&(b=0);b>c-1&&(b=0);this.currentPage=b;this.start=this.currentPage*this.itemsOnPage;b=this.itemsNumber;c=this.start+this.itemsOnPage;c>b&&(c=b);this.end=c;b=this.currentPage;this.prevPage=0>=b?0:b-1;b=this.currentPage;c=
this.pagesNumber;this.nextPage=0===c?0:b>=c-1?c-1:b+1}})();(function(){jQuery.fn.jplist.DomainDataItemServerModel=function(b,c,a){this.content="";this.dataType=c;this.count=0;this.responseText=a;this.dataType||(this.dataType="html");switch(this.dataType){case "html":c=jQuery(b);0<c.length&&(this.content=c.html(),this.count=Number(c.attr("data-count"))||0);break;case "json":this.content=b.data;this.count=b.count;break;case "xml":c=jQuery(b).find("root"),this.count=Number(c.attr("count"))||0,this.content=0<this.count?b:""}}})();(function(){var b=function(c,a,d){var f="html";c.options.dataSource&&c.options.dataSource.server&&c.options.dataSource.server.ajax&&((f=c.options.dataSource.server.ajax.dataType)||(f="html"));jQuery.fn.jplist.URIService.get(a,c.options,function(a,d,b,k){a=new jQuery.fn.jplist.DomainDataItemServerModel(a,f,k.responseText);var l=0,m=0;b=jQuery.fn.jplist.StatusesService.getStatusesByAction("paging",d);if(0<b.length){for(var n=0;n<b.length;n++)if(k=b[n],k.data&&(jQuery.isNumeric(k.data.currentPage)&&
(l=k.data.currentPage),jQuery.isNumeric(k.data.number)||"all"===k.data.number))m=k.data.number;k=new jQuery.fn.jplist.PaginationService(l,m,a.count);for(l=0;l<b.length;l++)b[l].data&&(b[l].data.paging=k)}c.observer.trigger(c.observer.events.statusesAppliedToList,[null,d]);c.model.set(a,d)},function(a){},function(a){})};jQuery.fn.jplist.ServerController=function(c,a,d,f){this.options=a;this.observer=d;this.history=f;f=jQuery({});f.$root=null;f.events={modelChanged:"modelChanged"};this.scopeObserver=
f;this.$root=c;this.model=this.view=null;this.model=new jQuery.fn.jplist.DataItemServerModel(null,null,this.scopeObserver);this.view=new jQuery.fn.jplist.ServerView(c,a,d,this.scopeObserver,this.model,this.history)};jQuery.fn.jplist.ServerController.prototype.renderStatuses=function(c,a){b(this,c,a)}})();(function(){var b=function(a,d,f){var e=!1,c,b=jQuery.extend(!0,{},a.options,{duration:0});d.content&&""!==jQuery.trim(d.content)?(a.$noResults.addClass("jplist-hidden"),a.$itemsBox.removeClass("jplist-hidden")):(a.$noResults.removeClass("jplist-hidden"),a.$itemsBox.addClass("jplist-hidden"));a.options.effect?(a.history&&(c=a.history.getLastStatus())&&!c.inAnimation&&(e=!0),e=e?b:a.options,jQuery.fn.jplist.animation.drawItems(e,a.$itemsBox,null,jQuery(d.content),a.options.effect,a.timeline,function(){jQuery.isFunction(a.options.redrawCallback)&&
a.options.redrawCallback(d.content,f)},a.observer)):(a.options.dataSource&&jQuery.isFunction(a.options.dataSource.render)?a.options.dataSource.render(d,f):a.$itemsBox.html(d.content),jQuery.isFunction(a.options.redrawCallback)&&a.options.redrawCallback(d.content,f))},c=function(a){a.scopeObserver.on(a.scopeObserver.events.modelChanged,function(d,f,e){a.$preloader&&a.$preloader.addClass("jplist-hidden");a.$itemsBox.removeClass("jplist-hidden");b(a,f,e)})};jQuery.fn.jplist.ServerView=function(a,d,f,
e,b,g){this.options=d;this.observer=f;this.scopeObserver=e;this.model=b;this.history=g;this.$itemsBox=a.find(d.itemsBox).eq(0);this.$noResults=a.find(d.noResults);this.options.effect&&(this.timeline=new jQuery.fn.jplist.animation.Timeline(this.options.fps,this.observer));c(this)}})();(function(){jQuery.fn.jplist.DataItemServerModel=function(b,c,a){this.dataItem=b;this.statuses=c;this.scopeObserver=a};jQuery.fn.jplist.DataItemServerModel.prototype.set=function(b,c){this.dataItem=b;this.statuses=c;this.scopeObserver.trigger(this.scopeObserver.events.modelChanged,[b,c])}})();(function(){var b=function(a){var d=jQuery(window).scrollTop(),c;c=Number(a.data("top"));isNaN(c)||(d>c?a.addClass("jplist-sticky"):a.removeClass("jplist-sticky"))},c=function(a,d){d.each(function(){var a=jQuery(this),d=a.offset().top;a.data("top",d);b(a)});jQuery(window).scroll(function(){d.each(function(){b(jQuery(this))})})},a=function(a){var e=[];if("cookies"===a.options.storage||"localstorage"===a.options.storage&&jQuery.fn.jplist.LocalStorageService.supported())if("cookies"===a.options.storage&&
(e=jQuery.fn.jplist.CookiesService.restoreCookies(a.options.storageName)),"localstorage"===a.options.storage&&jQuery.fn.jplist.LocalStorageService.supported()&&(e=jQuery.fn.jplist.LocalStorageService.restore(a.options.storageName)),0<e.length){for(var c=[],b=0;b<e.length;b++)e[b].inStorage&&c.push(e[b]);0<c.length&&(a.controls.setStatuses(c,!0),a.observer.trigger(a.observer.events.knownStatusesChanged,[c]))}else d(a,!0);else d(a,!0)},d=function(a,d){var c;c=a.controls.getStatuses(d);0<c.length&&a.observer.trigger(a.observer.events.knownStatusesChanged,
[c])};jQuery.fn.jplist.PanelController=function(a,d,b,g){this.options=d;this.$root=a;this.history=b;this.observer=g;this.controls=this.paths=this.$sticky=null;d=this.$root.find(this.options.panelPath).find("[data-control-type]");this.controls=new jQuery.fn.jplist.ControlsCollection;this.controls.addList(d,this.history,this.$root,this.options,this.observer);this.paths=this.controls.getPaths();this.$sticky=a.find('[data-sticky="true"]');0<this.$sticky.length&&c(this,this.$sticky)};jQuery.fn.jplist.PanelController.prototype.addControl=
function(a){this.controls.add(a,this.history,this.$root,this.options,this.observer);this.paths=this.controls.getPaths()};jQuery.fn.jplist.PanelController.prototype.setStatusesByDeepLink=function(){var d;d=jQuery.fn.jplist.DeepLinksService.getUrlParams(this.options);0>=d.length?a(this):this.controls.setDeepLinks(d,this.observer)};jQuery.fn.jplist.PanelController.prototype.setStatusesFromStorage=function(){a(this)};jQuery.fn.jplist.PanelController.prototype.setStatuses=function(a){this.history.addStatuses(a);
this.controls.setStatuses(a,!1);this.history.addList(a)};jQuery.fn.jplist.PanelController.prototype.getStatuses=function(a){return this.controls.getStatuses(a)};jQuery.fn.jplist.PanelController.prototype.mergeStatuses=function(a){return this.controls.merge(!1,a)};jQuery.fn.jplist.PanelController.prototype.statusesChangedByDeepLinks=function(a,d){this.controls&&this.controls.statusesChangedByDeepLinks(d)};jQuery.fn.jplist.PanelController.prototype.getDeepLinksURLPerControls=function(){return this.controls.getDeepLinksUrl(this.options.delimiter1)}})();(function(){jQuery.fn.jplist.ControlFactory=function(b,c,a,d){this.options=b;this.observer=c;this.history=a;this.$root=d};jQuery.fn.jplist.ControlFactory.prototype.create=function(b,c){var a=null,d,f,e,h,g,k,l,m;d=b.attr("data-control-type");g=h=e=!0;k=!1;m=l=null;(f=b.attr("data-control-deep-link"))&&"false"===f.toString()&&(e=!1);(f=b.attr("data-control-storage"))&&"false"===f.toString()&&(h=!1);(f=b.attr("data-control-animation"))&&"false"===f.toString()&&(g=!1);(f=b.attr("data-control-animate-to-top"))&&
"true"===f.toString()&&(k=!0);f={};jQuery.fn.jplist.controlTypes[d]&&(f=jQuery.extend(!0,{},f,jQuery.fn.jplist.controlTypes[d]));this.options.controlTypes&&this.options.controlTypes[d]&&(f=jQuery.extend(!0,{},f,this.options.controlTypes[d]));f&&(f.className&&(l=jQuery.fn.jplist.controls[f.className]),f.options&&(m=f.options));d={type:d,action:b.attr("data-control-action"),name:b.attr("data-control-name"),inDeepLinking:e,inStorage:h,inAnimation:g,isAnimateToTop:k,controlType:f,controlTypeClass:l,controlOptions:m,
paths:[]};d=jQuery.extend(!0,d,{$control:b,history:this.history,observer:this.observer,options:this.options,$root:this.$root,controlsCollection:c});d.controlTypeClass&&jQuery.isFunction(d.controlTypeClass)&&(a=new d.controlTypeClass(d));return a};jQuery.fn.jplist.ControlFactory.prototype.getStatus=function(b){return null};jQuery.fn.jplist.ControlFactory.prototype.setStatus=function(b,c){};jQuery.fn.jplist.ControlFactory.prototype.getDeepLink=function(){return""};jQuery.fn.jplist.ControlFactory.prototype.getStatusByDeepLink=
function(b,c){return null};jQuery.fn.jplist.ControlFactory.prototype.getPaths=function(b){return[]};jQuery.fn.jplist.ControlFactory.prototype.setByDeepLink=function(b){};jQuery.fn.jplist.ControlFactory.getProp=function(b,c){var a=[],d=new RegExp("^"+c+"[0-9]*$");jQuery.each(b.data(),function(c,e){d.test(c)&&a.push(e)});return 0==a.length?"":1==a.length?a[0]:a};jQuery.fn.jplist.ControlFactory.getPropPath=function(b,c){var a="";if(jQuery.isArray(b))for(var d=0;d<b.length;d++){var f="";0!==d&&(f=""+
d);a+="[data-"+c+f+'="'+b[d]+'"]'}else a+="[data-"+c+'="'+b+'"]';return a}})();(function(){var b=function(a,c){for(var e=[],b,g=0;g<a.controls.length;g++)b=a.controls[g],jQuery.isFunction(b.getStatus)&&(b=b.getStatus(c))&&jQuery.fn.jplist.StatusesService.add(e,b,!1);return e},c=function(a,c,b,h,g,k){(c=(new jQuery.fn.jplist.ControlFactory(g,k,b,h)).create(c,a))&&a.controls.push(c);return c},a=function(a,b,e,h,g,k){b.each(function(){c(a,jQuery(this),e,h,g,k)})};jQuery.fn.jplist.ControlsCollection=function(){this.controls=[]};jQuery.fn.jplist.ControlsCollection.prototype.merge=
function(a,c){var e,h;h=[];e=b(this,a);for(var g=0;g<e.length;g++)jQuery.fn.jplist.StatusesService.add(h,e[g],!1);if(c)for(e=0;e<c.length;e++)jQuery.fn.jplist.StatusesService.add(h,c[e],!0);return h};jQuery.fn.jplist.ControlsCollection.prototype.statusesChangedByDeepLinks=function(a){for(var c,b=0;b<this.controls.length;b++)c=this.controls[b],jQuery.isFunction(c.setByDeepLink)&&c.setByDeepLink(a)};jQuery.fn.jplist.ControlsCollection.prototype.setDeepLinks=function(a,c){var b,h,g,k=[],l;for(l=0;l<
a.length;l++){b=a[l];h=b.controlName;var m=[];g=void 0;for(var n=0;n<this.controls.length;n++)g=this.controls[n],g.name===h&&m.push(g);h=m;for(m=0;m<h.length;m++)g=h[m],jQuery.isFunction(g.getStatusByDeepLink)&&(g=g.getStatusByDeepLink(b.propName,b.propValue))&&jQuery.fn.jplist.StatusesService.add(k,g,!1)}c.trigger(c.events.knownStatusesChanged,[k]);c.trigger(c.events.statusesChangedByDeepLinks,[,k,a])};jQuery.fn.jplist.ControlsCollection.prototype.setStatuses=function(a,c){for(var b,h,g=[],k=0;k<
a.length;k++){b=a[k];h=!1;for(var l=0;l<g.length;l++)g[l].name===b.name&&g[l].action===b.action&&(h=!0,g[l].statuses.push(b));h||g.push({name:b.name,action:b.action,statuses:[b]})}for(l=0;l<g.length;l++)if(b=g[l],b.statuses&&0<b.statuses.length){h=b.statuses[0].name;for(var k=b.statuses[0].action,m=[],n=void 0,p=0;p<this.controls.length;p++)n=this.controls[p],n.name===h&&n.action===k&&m.push(n);h=m;for(k=0;k<h.length;k++)jQuery.isFunction(h[k].setStatus)&&(1<b.statuses.length?h[k].setStatus(b.statuses,
c):h[k].setStatus(b.statuses[0],c))}};jQuery.fn.jplist.ControlsCollection.prototype.getDeepLinksUrl=function(a){var b;b="";var c=[],h="",g;g=this.controls;for(var k=0;k<g.length;k++)b=g[k],jQuery.isFunction(b.getDeepLink)&&(h=jQuery.trim(b.getDeepLink())),""!==h&&-1===jQuery.inArray(h,c)&&c.push(h);return b=c.join(a)};jQuery.fn.jplist.ControlsCollection.prototype.getStatuses=function(a){return b(this,a)};jQuery.fn.jplist.ControlsCollection.prototype.getPaths=function(){for(var a,b=[],c=[],h=0;h<this.controls.length;h++)if(a=
this.controls[h],jQuery.isFunction(a.getPaths))for(a.getPaths(b),a=0;a<b.length;a++){for(var g=c,k=b[a],l=void 0,m=!1,n=0;n<g.length;n++)if(l=g[n],l.isEqual(k,!0)){m=!0;break}m||c.push(b[a])}return c};jQuery.fn.jplist.ControlsCollection.prototype.add=function(a,b,e,h,g){c(this,a,b,e,h,g)};jQuery.fn.jplist.ControlsCollection.prototype.addList=function(b,c,e,h,g){a(this,b,c,e,h,g)}})();(function(){var b=function(a){var b=[];a=jQuery();jQuery(document).find("[data-control-type]").each(function(){var a=jQuery(this),c=a.attr("data-control-type");c&&jQuery.fn.jplist.controlTypes[c]&&jQuery.fn.jplist.controlTypes[c].dropdown&&b.push(a)});for(var c=0;c<b.length;c++)a=a.add(b[c]);return a},c=function(a){var c=b(a);0<c.length&&(jQuery(document).click(function(){c.find("ul").hide()}),jQuery(document).off(a.DROPDOWN_CLOSE_EVENT).on(a.DROPDOWN_CLOSE_EVENT,function(a,b){c.each(function(){jQuery(this).is(b)||
jQuery(this).find("ul").hide()})}));a.$control.find(".jplist-dd-panel").off().on("click",function(b){var c;b.stopPropagation();b=jQuery(this).parents("[data-control-type]");c=b.find("ul");jQuery(document).trigger(a.DROPDOWN_CLOSE_EVENT,[b]);c.toggle(0)})},a=function(a,b,e,h){a={options:a,observer:b,history:e,$control:h,DROPDOWN_CLOSE_EVENT:"dropdown-close-event"};b=a.$control.find("li:eq(0)");b.addClass("active");b=b.find("span");0>=a.$control.find(".jplist-dd-panel").length&&a.$control.prepend('<div class="jplist-dd-panel">'+
b.text()+"</div>");c(a);return jQuery.extend(this,a)};jQuery.fn.jplist.DropdownControl=function(b,c,e,h){return new a(b,c,e,h)}})();(function(){jQuery.fn.jplist.Storage=function(b,c,a){this.storageType=b;this.storageName=c;this.cookiesExpiration=a;this.isStorageEnabled="cookies"===b||"localstorage"===b&&jQuery.fn.jplist.LocalStorageService.supported()};jQuery.fn.jplist.Storage.prototype.save=function(b){var c=[],a;if(b&&this.isStorageEnabled){for(var d=0;d<b.length;d++)a=b[d],a.inStorage&&c.push(a);"cookies"===this.storageType&&jQuery.fn.jplist.CookiesService.saveCookies(c,this.storageName,this.cookiesExpiration);"localstorage"===
this.storageType&&jQuery.fn.jplist.LocalStorageService.supported()&&jQuery.fn.jplist.LocalStorageService.save(c,this.storageName)}}})();(function(){jQuery.fn.jplist.CookiesService={};jQuery.fn.jplist.CookiesService.setCookie=function(b,c,a){c=escape(c);var d=new Date;a=Number(a);-1==a||isNaN(a)?document.cookie=b+"="+c+";path=/;":(d.setMinutes(d.getMinutes()+a),document.cookie=b+"="+c+";path=/; expires="+d.toUTCString())};jQuery.fn.jplist.CookiesService.getCookie=function(b){var c,a,d,f=null;d=document.cookie.split(";");for(var e=0;e<d.length;e++)if(c=d[e].substr(0,d[e].indexOf("=")),a=d[e].substr(d[e].indexOf("=")+1),c=c.replace(/^\s+|\s+$/g,
""),c==b){f=unescape(a);break}return f};jQuery.fn.jplist.CookiesService.saveCookies=function(b,c,a){b=JSON.stringify(b);jQuery.fn.jplist.CookiesService.setCookie(c,b,a)};jQuery.fn.jplist.CookiesService.restoreCookies=function(b){var c=[];(b=jQuery.fn.jplist.CookiesService.getCookie(b))&&(c=jQuery.parseJSON(b));c||(c=[]);return c}})();(function(){jQuery.fn.jplist.LocalStorageService={};jQuery.fn.jplist.LocalStorageService.supported=function(){try{return"localStorage"in window&&null!==window.localStorage}catch(b){return!1}};jQuery.fn.jplist.LocalStorageService.save=function(b,c){var a;a=JSON.stringify(b);window.localStorage[c]=a};jQuery.fn.jplist.LocalStorageService.restore=function(b){var c=[];(b=window.localStorage[b])&&(c=jQuery.parseJSON(b));c||(c=[]);return c}})();(function(){jQuery.fn.jplist.URIService={};jQuery.fn.jplist.URIService.get=function(b,c,a,d,f){var e=c.dataSource.server;e.ajax.data||(e.ajax.data={});e.ajax.data.statuses=encodeURIComponent(JSON.stringify(b,function(a,b){return b&&b.nodeType?null:b}));jQuery.ajax(e.ajax).done(function(c,d,f){jQuery.isFunction(a)&&a(c,b,d,f);jQuery.isFunction(e.serverOkCallback)&&e.serverOkCallback(c,b,d,f)}).fail(function(){jQuery.isFunction(d)&&d(b);jQuery.isFunction(e.serverErrorCallback)&&e.serverErrorCallback(b)}).always(function(){jQuery.isFunction(f)&&
f(b)})}})();
