/*
 * The MIT License

This is a fork of jquery.flot.grow by Thodoris Greasidis,
that implements the growing animations using requestAnimationFrame
and introduces varius bug fixes and improvements.

Copyright (c) 2013 by Thodoris Greasidis

Copyright (c) 2010,2011,2012, 2013 by Juergen Marsch

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

(function(a){var c="growraf",e="0.4.5";var k={series:{grow:{active:false,duration:1000,valueIndex:1,reanimate:true,growings:[{valueIndex:1,stepMode:"linear",stepDirection:"up",reanimate:"continue"}],debug:{active:false,createDocuTemplate:null}}}};var f={NOT_PLOTTED_YET:0,PLOTTED_SOME_FRAMES:1,PLOTTED_LAST_FRAME:2};var j={none:function(q,m,p,n){if(n===f.NOT_PLOTTED_YET){for(var o=0,l=q.data.length;o<l;o++){q.data[o][p.valueIndex]=q.dataOrg[o][p.valueIndex]}}},linear:function(s,n,r,o){var q=Math.min(n,s.grow.duration);for(var p=0,l=s.data.length;p<l;p++){var m=s.dataOrg[p][r.valueIndex];if(m!==null){if(r.stepDirection==="up"){s.data[p][r.valueIndex]=m/s.grow.duration*q}else{if(r.stepDirection==="down"){s.data[p][r.valueIndex]=m+(s.yaxis.max-m)/s.grow.duration*(s.grow.duration-q)}}}else{s.data[p][r.valueIndex]=null}}},maximum:function(s,n,r,o){var q=Math.min(n,s.grow.duration);for(var p=0,l=s.data.length;p<l;p++){var m=s.dataOrg[p][r.valueIndex];if(m!==null){if(r.stepDirection==="up"){if(m>=0){s.data[p][r.valueIndex]=Math.min(m,s.yaxis.max/s.grow.duration*q)}else{s.data[p][r.valueIndex]=Math.max(m,s.yaxis.min/s.grow.duration*q)}}else{if(r.stepDirection==="down"){if(m>=0){s.data[p][r.valueIndex]=Math.max(m,s.yaxis.max/s.grow.duration*(s.grow.duration-q))}else{s.data[p][r.valueIndex]=Math.min(m,s.yaxis.min/s.grow.duration*(s.grow.duration-q))}}}}else{s.data[p][r.valueIndex]=null}}},delay:function(q,m,p,n){if(m>=q.grow.duration){for(var o=0,l=q.data.length;o<l;o++){q.data[o][p.valueIndex]=q.dataOrg[o][p.valueIndex]}}},reanimate:function(s,t,l,q){var r=Math.min(t,s.grow.duration);for(var o=0,m=s.data.length;o<m;o++){var n=s.dataOrg[o][l.valueIndex];if(n===null){s.data[o][l.valueIndex]=null}else{if(s.dataOld){var p=s.dataOld[o][l.valueIndex];s.data[o][l.valueIndex]=p+(n-p)/s.grow.duration*r}}}}};var d;var b;h();function i(B){var n=false;var z=true;var u=0,D=0,E=f.NOT_PLOTTED_YET;var p=[];var r;var q=B;var F=null;var l=null;var w=null;B.hooks.drawSeries.push(A);B.hooks.draw.push(x);B.hooks.bindEvents.push(s);B.hooks.shutdown.push(v);function C(){var H,G;H=a.plot.JUMExample.docuObjectToTemplate([{name:"data",tree:w.data},{name:"options.series.grow",tree:k.series.grow,takeDefault:true},{name:"options.series.grow",tree:l.series.grow},{name:"options.series.editMode",tree:k.series.editMode,takeDefault:true},{name:"options.series.editMode",tree:l.series.editMode},{name:"options.series.nearBy",tree:k.series.nearBy,takeDefault:true},{name:"options.series.nearBy",tree:l.series.nearBy}],c);a.plot.JUMExample.extendDocuObject(H,c);G=a.plot.JUMExample.docuObjectToEdit(H,"");return{data:H,form:G}}function A(L,N,K){l=L.getOptions();var M=l.series.grow.valueIndex;if(l.series.grow.active===true){if(l.series.grow.debug.active===true){w=K;l.series.grow.debug.createDocuTemplate=C}var H=false;var I=0;if(l.series.grow.reanimate&&E===f.PLOTTED_LAST_FRAME){n=false;E=f.NOT_PLOTTED_YET;u=0;F=L.getData();var G=Math.min(F.length,p.length);for(I=0;I<G;I++){F[I].dataOld=p[I]}H=true;z=true}if(!n){if(!H){F=L.getData()}E=f.NOT_PLOTTED_YET;u=+new Date()|0;p=[];for(I=0;I<F.length;I++){var O=F[I];O.dataOrg=a.extend(true,[],O.data);p.push(O.dataOrg);if(!H){for(var J=0;J<O.data.length;J++){O.data[J][M]=O.dataOrg[J][M]===null?null:0}}}L.setData(F);n=true}}}function x(H,G){if(z===true){y(H)}}function y(G){l=G.getOptions();if(l.series.grow.active===true){t(G.getData(),l);u=+new Date()|0;r=d(m)}z=false}function t(K,I){var J=I.series.grow.duration;for(var H=0,L=K.length;H<L;H++){var G=K[H].grow.duration;if(J<G){J=G}}I.series.grow.duration=J}function s(H,G){if(g("resize")){H.getPlaceholder().resize(o)}}function m(){D=(+new Date())-u|0;for(var H=0,M=F.length;H<M;H++){var L=F[H];var G=L.dataOld&&L.dataOld.length>0;for(var J=0,N=L.grow.growings.length;J<N;J++){var K=L.grow.growings[J];var I;if(G&&K.reanimate!=="reinit"){if(typeof K.reanimate==="function"){I=K.reanimate}if(K.reanimate==="continue"){I=j.reanimate}else{I=j.none}}else{if(typeof K.stepMode==="function"){I=K.stepMode}else{I=j[K.stepMode]||j.none}}I(L,D,K,E)}}q.setData(F);q.draw();if(E===f.NOT_PLOTTED_YET){E=f.PLOTTED_SOME_FRAMES}if(D<l.series.grow.duration){r=d(m)}else{E=f.PLOTTED_LAST_FRAME;r=null;q.getPlaceholder().trigger("growFinished")}}function o(){if(r){for(var G=0;G<F.length;G++){var H=F[G];H.data=a.extend(true,[],H.dataOrg)}B.setData(F);B.setupGrid()}}function v(H,G){H.getPlaceholder().unbind("resize",o);if(r){b(r);r=null}}}function g(p){var n=a.plot.plugins;for(var o=0,m=n.length;o<m;o++){var l=n[o];if(l.name===p){return true}}return false}function h(){var p=window.requestAnimationFrame;var m=window.cancelAnimationFrame;var n=+new Date();var o=["ms","moz","webkit","o"];for(var l=0;l<o.length&&!p;++l){p=window[o[l]+"RequestAnimationFrame"];m=window[o[l]+"CancelAnimationFrame"]||window[o[l]+"CancelRequestAnimationFrame"]}if(!p){p=function(u,r){var q=+new Date();var s=Math.max(0,16-(q-n));var t=window.setTimeout(function(){u(q+s)},s);n=q+s;return t}}if(!m){m=function(q){clearTimeout(q)}}d=p;b=m}a.plot.plugins.push({init:i,options:k,name:c,version:e})})(jQuery);