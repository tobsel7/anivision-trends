/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.19.2.
 * Original file: /npm/d3-brush@3.0.0/src/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import{dispatch as t}from"../d3-dispatch@3.0.1/b5f7cdc6.js";import{dragDisable as e,dragEnable as n}from"../d3-drag@3.0.0/b22c5864.js";import{interpolate as r}from"../d3-interpolate@3.0.1/034b7bcb.js";import{select as s,pointer as i}from"../d3-selection@3.0.0/5dcd62f4.js";import{interrupt as u}from"../d3-transition@3.0.1/8debb4ba.js";var o=t=>()=>t;function a(t,{sourceEvent:e,target:n,selection:r,mode:s,dispatch:i}){Object.defineProperties(this,{type:{value:t,enumerable:!0,configurable:!0},sourceEvent:{value:e,enumerable:!0,configurable:!0},target:{value:n,enumerable:!0,configurable:!0},selection:{value:r,enumerable:!0,configurable:!0},mode:{value:s,enumerable:!0,configurable:!0},_:{value:i}})}function l(t){t.preventDefault(),t.stopImmediatePropagation()}var c={name:"drag"},h={name:"space"},f={name:"handle"},p={name:"center"};const{abs:m,max:d,min:v}=Math;function y(t){return[+t[0],+t[1]]}function b(t){return[y(t[0]),y(t[1])]}var w={name:"x",handles:["w","e"].map(K),input:function(t,e){return null==t?null:[[+t[0],e[0][1]],[+t[1],e[1][1]]]},output:function(t){return t&&[t[0][0],t[1][0]]}},g={name:"y",handles:["n","s"].map(K),input:function(t,e){return null==t?null:[[e[0][0],+t[0]],[e[1][0],+t[1]]]},output:function(t){return t&&[t[0][1],t[1][1]]}},_={name:"xy",handles:["n","w","e","s","nw","ne","sw","se"].map(K),input:function(t){return null==t?null:b(t)},output:function(t){return t}},x={overlay:"crosshair",selection:"move",n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},k={e:"w",w:"e",nw:"ne",ne:"nw",se:"sw",sw:"se"},z={n:"s",s:"n",nw:"sw",ne:"se",se:"ne",sw:"nw"},A={overlay:1,selection:1,n:null,e:1,s:null,w:-1,nw:-1,ne:1,se:1,sw:-1},E={overlay:1,selection:1,n:-1,e:null,s:1,w:null,nw:-1,ne:-1,se:1,sw:1};function K(t){return{type:t}}function P(t){return!t.ctrlKey&&!t.button}function T(){var t=this.ownerSVGElement||this;return t.hasAttribute("viewBox")?[[(t=t.viewBox.baseVal).x,t.y],[t.x+t.width,t.y+t.height]]:[[0,0],[t.width.baseVal.value,t.height.baseVal.value]]}function V(){return navigator.maxTouchPoints||"ontouchstart"in this}function B(t){for(;!t.__brush;)if(!(t=t.parentNode))return;return t.__brush}function C(t){var e=t.__brush;return e?e.dim.output(e.selection):null}function I(){return j(w)}function M(){return j(g)}function S(){return j(_)}function j(y){var _,C=T,I=P,M=V,S=!0,j=t("start","brush","end"),D=6;function G(t){var e=t.property("__brush",L).selectAll(".overlay").data([K("overlay")]);e.enter().append("rect").attr("class","overlay").attr("pointer-events","all").attr("cursor",x.overlay).merge(e).each((function(){var t=B(this).extent;s(this).attr("x",t[0][0]).attr("y",t[0][1]).attr("width",t[1][0]-t[0][0]).attr("height",t[1][1]-t[0][1])})),t.selectAll(".selection").data([K("selection")]).enter().append("rect").attr("class","selection").attr("cursor",x.selection).attr("fill","#777").attr("fill-opacity",.3).attr("stroke","#fff").attr("shape-rendering","crispEdges");var n=t.selectAll(".handle").data(y.handles,(function(t){return t.type}));n.exit().remove(),n.enter().append("rect").attr("class",(function(t){return"handle handle--"+t.type})).attr("cursor",(function(t){return x[t.type]})),t.each(N).attr("fill","none").attr("pointer-events","all").on("mousedown.brush",F).filter(M).on("touchstart.brush",F).on("touchmove.brush",H).on("touchend.brush touchcancel.brush",J).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function N(){var t=s(this),e=B(this).selection;e?(t.selectAll(".selection").style("display",null).attr("x",e[0][0]).attr("y",e[0][1]).attr("width",e[1][0]-e[0][0]).attr("height",e[1][1]-e[0][1]),t.selectAll(".handle").style("display",null).attr("x",(function(t){return"e"===t.type[t.type.length-1]?e[1][0]-D/2:e[0][0]-D/2})).attr("y",(function(t){return"s"===t.type[0]?e[1][1]-D/2:e[0][1]-D/2})).attr("width",(function(t){return"n"===t.type||"s"===t.type?e[1][0]-e[0][0]+D:D})).attr("height",(function(t){return"e"===t.type||"w"===t.type?e[1][1]-e[0][1]+D:D}))):t.selectAll(".selection,.handle").style("display","none").attr("x",null).attr("y",null).attr("width",null).attr("height",null)}function O(t,e,n){var r=t.__brush.emitter;return!r||n&&r.clean?new q(t,e,n):r}function q(t,e,n){this.that=t,this.args=e,this.state=t.__brush,this.active=0,this.clean=n}function F(t){if((!_||t.touches)&&I.apply(this,arguments)){var r,o,a,b,K,P,T,V,C,M,j,D=this,G=t.target.__data__.type,q="selection"===(S&&t.metaKey?G="overlay":G)?c:S&&t.altKey?p:f,F=y===g?null:A[G],H=y===w?null:E[G],J=B(D),L=J.extent,Q=J.selection,R=L[0][0],U=L[0][1],W=L[1][0],X=L[1][1],Y=0,Z=0,$=F&&H&&S&&t.shiftKey,tt=Array.from(t.touches||[t],(t=>{const e=t.identifier;return(t=i(t,D)).point0=t.slice(),t.identifier=e,t}));u(D);var et=O(D,arguments,!0).beforestart();if("overlay"===G){Q&&(C=!0);const e=[tt[0],tt[1]||tt[0]];J.selection=Q=[[r=y===g?R:v(e[0][0],e[1][0]),a=y===w?U:v(e[0][1],e[1][1])],[K=y===g?W:d(e[0][0],e[1][0]),T=y===w?X:d(e[0][1],e[1][1])]],tt.length>1&&ut(t)}else r=Q[0][0],a=Q[0][1],K=Q[1][0],T=Q[1][1];o=r,b=a,P=K,V=T;var nt=s(D).attr("pointer-events","none"),rt=nt.selectAll(".overlay").attr("cursor",x[G]);if(t.touches)et.moved=it,et.ended=ot;else{var st=s(t.view).on("mousemove.brush",it,!0).on("mouseup.brush",ot,!0);S&&st.on("keydown.brush",(function(t){switch(t.keyCode){case 16:$=F&&H;break;case 18:q===f&&(F&&(K=P-Y*F,r=o+Y*F),H&&(T=V-Z*H,a=b+Z*H),q=p,ut(t));break;case 32:q!==f&&q!==p||(F<0?K=P-Y:F>0&&(r=o-Y),H<0?T=V-Z:H>0&&(a=b-Z),q=h,rt.attr("cursor",x.selection),ut(t));break;default:return}l(t)}),!0).on("keyup.brush",(function(t){switch(t.keyCode){case 16:$&&(M=j=$=!1,ut(t));break;case 18:q===p&&(F<0?K=P:F>0&&(r=o),H<0?T=V:H>0&&(a=b),q=f,ut(t));break;case 32:q===h&&(t.altKey?(F&&(K=P-Y*F,r=o+Y*F),H&&(T=V-Z*H,a=b+Z*H),q=p):(F<0?K=P:F>0&&(r=o),H<0?T=V:H>0&&(a=b),q=f),rt.attr("cursor",x[G]),ut(t));break;default:return}l(t)}),!0),e(t.view)}N.call(D),et.start(t,q.name)}function it(t){for(const e of t.changedTouches||[t])for(const t of tt)t.identifier===e.identifier&&(t.cur=i(e,D));if($&&!M&&!j&&1===tt.length){const t=tt[0];m(t.cur[0]-t[0])>m(t.cur[1]-t[1])?j=!0:M=!0}for(const t of tt)t.cur&&(t[0]=t.cur[0],t[1]=t.cur[1]);C=!0,l(t),ut(t)}function ut(t){const e=tt[0],n=e.point0;var s;switch(Y=e[0]-n[0],Z=e[1]-n[1],q){case h:case c:F&&(Y=d(R-r,v(W-K,Y)),o=r+Y,P=K+Y),H&&(Z=d(U-a,v(X-T,Z)),b=a+Z,V=T+Z);break;case f:tt[1]?(F&&(o=d(R,v(W,tt[0][0])),P=d(R,v(W,tt[1][0])),F=1),H&&(b=d(U,v(X,tt[0][1])),V=d(U,v(X,tt[1][1])),H=1)):(F<0?(Y=d(R-r,v(W-r,Y)),o=r+Y,P=K):F>0&&(Y=d(R-K,v(W-K,Y)),o=r,P=K+Y),H<0?(Z=d(U-a,v(X-a,Z)),b=a+Z,V=T):H>0&&(Z=d(U-T,v(X-T,Z)),b=a,V=T+Z));break;case p:F&&(o=d(R,v(W,r-Y*F)),P=d(R,v(W,K+Y*F))),H&&(b=d(U,v(X,a-Z*H)),V=d(U,v(X,T+Z*H)))}P<o&&(F*=-1,s=r,r=K,K=s,s=o,o=P,P=s,G in k&&rt.attr("cursor",x[G=k[G]])),V<b&&(H*=-1,s=a,a=T,T=s,s=b,b=V,V=s,G in z&&rt.attr("cursor",x[G=z[G]])),J.selection&&(Q=J.selection),M&&(o=Q[0][0],P=Q[1][0]),j&&(b=Q[0][1],V=Q[1][1]),Q[0][0]===o&&Q[0][1]===b&&Q[1][0]===P&&Q[1][1]===V||(J.selection=[[o,b],[P,V]],N.call(D),et.brush(t,q.name))}function ot(t){if(function(t){t.stopImmediatePropagation()}(t),t.touches){if(t.touches.length)return;_&&clearTimeout(_),_=setTimeout((function(){_=null}),500)}else n(t.view,C),st.on("keydown.brush keyup.brush mousemove.brush mouseup.brush",null);nt.attr("pointer-events","all"),rt.attr("cursor",x.overlay),J.selection&&(Q=J.selection),function(t){return t[0][0]===t[1][0]||t[0][1]===t[1][1]}(Q)&&(J.selection=null,N.call(D)),et.end(t,q.name)}}function H(t){O(this,arguments).moved(t)}function J(t){O(this,arguments).ended(t)}function L(){var t=this.__brush||{selection:null};return t.extent=b(C.apply(this,arguments)),t.dim=y,t}return G.move=function(t,e,n){t.tween?t.on("start.brush",(function(t){O(this,arguments).beforestart().start(t)})).on("interrupt.brush end.brush",(function(t){O(this,arguments).end(t)})).tween("brush",(function(){var t=this,n=t.__brush,s=O(t,arguments),i=n.selection,u=y.input("function"==typeof e?e.apply(this,arguments):e,n.extent),o=r(i,u);function a(e){n.selection=1===e&&null===u?null:o(e),N.call(t),s.brush()}return null!==i&&null!==u?a:a(1)})):t.each((function(){var t=this,r=arguments,s=t.__brush,i=y.input("function"==typeof e?e.apply(t,r):e,s.extent),o=O(t,r).beforestart();u(t),s.selection=null===i?null:i,N.call(t),o.start(n).brush(n).end(n)}))},G.clear=function(t,e){G.move(t,null,e)},q.prototype={beforestart:function(){return 1==++this.active&&(this.state.emitter=this,this.starting=!0),this},start:function(t,e){return this.starting?(this.starting=!1,this.emit("start",t,e)):this.emit("brush",t),this},brush:function(t,e){return this.emit("brush",t,e),this},end:function(t,e){return 0==--this.active&&(delete this.state.emitter,this.emit("end",t,e)),this},emit:function(t,e,n){var r=s(this.that).datum();j.call(t,this.that,new a(t,{sourceEvent:e,target:G,selection:y.output(this.state.selection),mode:n,dispatch:j}),r)}},G.extent=function(t){return arguments.length?(C="function"==typeof t?t:o(b(t)),G):C},G.filter=function(t){return arguments.length?(I="function"==typeof t?t:o(!!t),G):I},G.touchable=function(t){return arguments.length?(M="function"==typeof t?t:o(!!t),G):M},G.handleSize=function(t){return arguments.length?(D=+t,G):D},G.keyModifiers=function(t){return arguments.length?(S=!!t,G):S},G.on=function(){var t=j.on.apply(j,arguments);return t===j?G:t},G}export{S as brush,C as brushSelection,I as brushX,M as brushY};export default null;
