var Wt=Object.defineProperty;var o=(e,t)=>Wt(e,"name",{value:t,configurable:!0});var oe,le,ue,se;import{html as h}from"../../_npm/htl@0.3.1/063eb405.js";import{AbstractFile as Zt}from"../stdlib.95bfbf7e.js";var Gt=Object.defineProperty,Oe=o((e,t)=>Gt(e,"name",{value:t,configurable:!0}),"i");function Ge(e,t){if(e instanceof Date||(e=new Date(+e)),isNaN(e))return typeof t=="function"?t(e):t;const n=e.getUTCHours(),i=e.getUTCMinutes(),r=e.getUTCSeconds(),l=e.getUTCMilliseconds();return`${Je(e.getUTCFullYear())}-${C(e.getUTCMonth()+1,2)}-${C(e.getUTCDate(),2)}${n||i||r||l?`T${C(n,2)}:${C(i,2)}${r||l?`:${C(r,2)}${l?`.${C(l,3)}`:""}`:""}Z`:""}`}o(Ge,"c"),Oe(Ge,"format");function Je(e){return e<0?`-${C(-e,6)}`:e>9999?`+${C(e,6)}`:C(e,4)}o(Je,"f"),Oe(Je,"formatYear");function C(e,t){return`${e}`.padStart(t,"0")}o(C,"t$1"),Oe(C,"pad");var Jt=Object.defineProperty,Qt=o((e,t)=>Jt(e,"name",{value:t,configurable:!0}),"t");const Yt=/^(?:[-+]\d{2})?\d{4}(?:-\d{2}(?:-\d{2})?)?(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d{3})?)?(?:Z|[-+]\d{2}:?\d{2})?)?$/;function Qe(e,t){return Yt.test(e+="")?new Date(e):typeof t=="function"?t(e):t}o(Qe,"r"),Qt(Qe,"parse");var Xt=Object.defineProperty,a=o((e,t)=>Xt(e,"name",{value:t,configurable:!0}),"o$1");function U(e){return e==null?null:typeof e=="number"?`${e}px`:`${e}`}o(U,"H"),a(U,"length");function _(e){return{"--input-width":U(e)}}o(_,"_"),a(_,"maybeWidth");const Ae={bubbles:!0};function G(e){e.preventDefault()}o(G,"G"),a(G,"preventDefault");function ne({currentTarget:e}){(e.form||e).dispatchEvent(new Event("input",Ae))}o(ne,"re"),a(ne,"dispatchInput");function Se(e){return e.checkValidity()}o(Se,"xe"),a(Se,"checkValidity");function F(e){return e}o(F,"P"),a(F,"identity");let en=0;function re(){return`inputs-3a86ea-${++en}`}o(re,"ie"),a(re,"newId");function L(e,t){if(e)return e=h`<label>${e}`,t!==void 0&&(e.htmlFor=t.id=re()),e}o(L,"j"),a(L,"maybeLabel");function Ye(e="\u2261",{label:t="",value:n,reduce:i,disabled:r,required:l=!1,width:c}={}){const p=typeof e=="string"||e instanceof Node;p?(!l&&n===void 0&&(n=0),i===void 0&&(i=a((v=0)=>v+1,"reduce")),r=new Set(r?[e]:[]),e=[[e,i]]):(!l&&n===void 0&&(n=null),r=new Set(r===!0?Array.from(e,([v])=>v):r||void 0));const m=h`<form class=inputs-3a86ea>`;m.addEventListener("submit",G);const s={width:U(c)},b=Array.from(e,([v,k=F])=>{if(typeof k!="function")throw new TypeError("reduce is not a function");return h`<button disabled=${r.has(v)} style=${s} onclick=${$=>{m.value=k(m.value),ne($)}}>${v}`});return(t=L(t,p?b[0]:void 0))&&m.append(t),m.append(...b),m.value=n,m}o(Ye,"en"),a(Ye,"button");function K(e){return Array.isArray(e)?e:Array.from(e)}o(K,"q$1"),a(K,"arrayify");function Te(e){return e?typeof e[Symbol.iterator]=="function":!1}o(Te,"Ee"),a(Te,"iterable");function Ee(e){if(Te(e.columns))return e.columns;if(e.schema&&Te(e.schema.fields))return Array.from(e.schema.fields,t=>t.name);if(typeof e.columnNames=="function")return e.columnNames()}o(Ee,"Te"),a(Ee,"maybeColumns");function H(e){return e==null?"":`${e}`}o(H,"W"),a(H,"stringify");const pe=ae(e=>{const t=ie(e);return n=>n==null?"":typeof n=="number"?t(n):n instanceof Date?me(n):`${n}`}),ie=ae(e=>t=>t===0?"0":t.toLocaleString(e)),tn=pe(),nn=ie();function je(e){const t=e.toString(),n=t.length;let i=-1,r;e:for(let l=1;l<n;++l)switch(t[l]){case".":i=r=l;break;case"0":i===0&&(i=l),r=l;break;default:if(!+t[l])break e;i>0&&(i=0);break}return i>0?t.slice(0,i)+t.slice(r+1):t}o(je,"De"),a(je,"formatTrim");function me(e){return Ge(e,"Invalid Date")}o(me,"le"),a(me,"formatDate$1");function ae(e){let t=ae,n;return(i="en")=>i===t?n:n=e(t=i)}o(ae,"ue"),a(ae,"localize");function ve(e,t){return J(t)-J(e)||(e<t?-1:e>t?1:e>=t?0:NaN)}o(ve,"ae"),a(ve,"ascending");function ze(e,t){return J(t)-J(e)||(t<e?-1:t>e?1:t>=e?0:NaN)}o(ze,"Le"),a(ze,"descending");function J(e){return e!=null&&!Number.isNaN(e)}o(J,"Q"),a(J,"defined");const rn=a(([e])=>e,"first"),Xe=a(([,e])=>e,"second");function Le({multiple:e,render:t,selectedIndexes:n,select:i}){return a(function(r,{locale:l,keyof:c=r instanceof Map?rn:F,valueof:p=r instanceof Map?Xe:F,format:m=(A=>(x,y,E)=>A(c(x,y,E)))(pe(l)),multiple:s,key:b,value:v,disabled:k=!1,sort:$,unique:g,...j}={}){if(typeof c!="function")throw new TypeError("keyof is not a function");if(typeof p!="function")throw new TypeError("valueof is not a function");if(typeof m!="function")throw new TypeError("format is not a function");e!==void 0&&(s=e),$=nt($);let A=+s;v===void 0&&(v=b!==void 0&&r instanceof Map?A>0?Array.from(b,S=>r.get(S)):r.get(b):void 0),g=!!g,r=K(r);let x=r.map((S,O)=>[c(S,O,r),O]);$!==void 0&&x.sort(([S],[O])=>$(S,O)),g&&(x=[...new Map(x.map(S=>[it(S[0]),S])).values()]);const y=x.map(Xe);s===!0?A=Math.max(1,Math.min(10,y.length)):A>0?s=!0:(s=!1,A=void 0);const[E,d]=t(r,y,et(r,y,v,s,p),tt(r,y,k,p),{...j,format:m,multiple:s,size:A});E.addEventListener("input",N),E.addEventListener("change",ne),E.addEventListener("submit",G);function N(S){if(S&&S.isTrusted&&E.removeEventListener("change",ne),s)v=n(d).map(O=>p(r[O],O,r));else{const O=rt(d);v=O<0?null:p(r[O],O,r)}}return o(N,"z"),a(N,"oninput"),N(),Object.defineProperty(E,"value",{get(){return v},set(S){if(s){const O=new Set(S);for(const M of d){const D=+M.value;i(M,O.has(p(r[D],D,r)))}}else d.value=y.find(O=>S===p(r[O],O,r));N()}})},"chooser")}o(Le,"Oe"),a(Le,"createChooser");function et(e,t,n,i,r){const l=new Set(n===void 0?[]:i?K(n):[n]);if(!l.size)return()=>!1;const c=new Set;for(const p of t)l.has(r(e[p],p,e))&&c.add(p);return p=>c.has(p)}o(et,"on"),a(et,"maybeSelection");function tt(e,t,n,i){if(typeof n=="boolean")return n;const r=new Set(K(n)),l=new Set;for(const c of t)r.has(i(e[c],c,e))&&l.add(c);return c=>l.has(c)}o(tt,"un"),a(tt,"maybeDisabled");function nt(e){if(!(e===void 0||e===!1)){if(e===!0||e==="ascending")return ve;if(e==="descending")return ze;if(typeof e=="function")return e;throw new TypeError("sort is not a function")}}o(nt,"fn"),a(nt,"maybeSort");function rt(e){return e.value?+e.value:-1}o(rt,"sn"),a(rt,"selectedIndex");function it(e){return e!==null&&typeof e=="object"?e.valueOf():e}o(it,"cn"),a(it,"intern");function De(e,t){return Le({multiple:e,render(n,i,r,l,{format:c,label:p}){const m=h`<form class="inputs-3a86ea inputs-3a86ea-checkbox">
      ${L(p)}<div>
        ${i.map(s=>h`<label><input type=${t} disabled=${typeof l=="function"?l(s):l} name=input value=${s} checked=${r(s)}>${c(n[s],s,n)}`)}
      </div>
    </form>`;return[m,ot(m.elements.input,e)]},selectedIndexes(n){return Array.from(n).filter(i=>i.checked).map(i=>+i.value)},select(n,i){n.checked=i}})}o(De,"je"),a(De,"createCheckbox");const an=De(!1,"radio"),on=De(!0,"checkbox");function at({label:e,value:t,values:n,disabled:i}={}){const r=h`<input class=inputs-3a86ea-input type=checkbox name=input disabled=${i}>`,l=h`<form class="inputs-3a86ea inputs-3a86ea-toggle">${L(e,r)}${r}`;return Object.defineProperty(l,"value",{get(){return n===void 0?r.checked:n[r.checked?0:1]},set(c){r.checked=n===void 0?!!c:c===n[0]}}),t!==void 0&&(l.value=t),l}o(at,"dn"),a(at,"toggle");function ot(e,t){return e===void 0?new ln(t?[]:null):typeof e.length>"u"?new(t?sn:un)(e):e}o(ot,"pn"),a(ot,"inputof$1");const lt=(oe=class{constructor(t){this._value=t}get value(){return this._value}set value(t){}*[Symbol.iterator](){}},o(oe,"we"),oe);a(lt,"OptionZero");let ln=lt;const ut=(le=class{constructor(t){this._input=t}get value(){const{_input:t}=this;return t.checked?t.value:""}set value(t){const{_input:n}=this;n.checked||(n.checked=H(t)===n.value)}*[Symbol.iterator](){yield this._input}},o(le,"ve"),le);a(ut,"OptionOne");let un=ut;const st=(ue=class{constructor(t){this._input=t,this._value=t.checked?[t.value]:[]}get value(){return this._value}set value(t){const{_input:n}=this;n.checked||(n.checked=H(t)===n.value,this._value=n.checked?[n.value]:[])}*[Symbol.iterator](){yield this._input}},o(ue,"ke"),ue);a(st,"MultipleOptionOne");let sn=st;function he(e){if(e===void 0)return[null,null];const t=re();return[h`<datalist id=${t}>${Array.from(e,n=>h`<option value=${H(n)}>`)}`,t]}o(he,"$e"),a(he,"maybeDatalist");function Q(e,t,n,{validate:i=Se,submit:r}={},{get:l=a(s=>s.value,"get"),set:c=a((s,b)=>s.value=H(b),"set"),same:p=a((s,b)=>s.value===b,"same"),after:m=a(s=>t.after(s),"after")}={}){r=r===!0?"Submit":r||null;const s=r?h`<button type=submit disabled>${r}`:null;r&&m(s),c(t,n),n=i(t)?l(t):void 0,e.addEventListener("submit",v),t.oninput=k;function b(){if(i(t))return n=l(t),!0}o(b,"$"),a(b,"update");function v($){G($),r&&(b()?(s.disabled=!0,ne($)):t.reportValidity())}o(v,"d"),a(v,"onsubmit");function k($){r?(s.disabled=p(t,n),$.stopPropagation()):b()||$.stopPropagation()}return o(k,"w"),a(k,"oninput"),Object.defineProperty(e,"value",{get(){return n},set($){c(t,$),b()}})}o(Q,"V"),a(Q,"createText");function Y({label:e,value:t="",type:n="text",placeholder:i,pattern:r,spellcheck:l,autocomplete:c,autocapitalize:p,min:m,max:s,minlength:b,maxlength:v,required:k=b>0,datalist:$,readonly:g,disabled:j,width:A,...x}={}){const[y,E]=he($),d=h`<input
    type=${n}
    name=text
    list=${E}
    readonly=${g}
    disabled=${j}
    required=${k}
    min=${m}
    max=${s}
    minlength=${b}
    maxlength=${v}
    pattern=${r}
    spellcheck=${be(l)}
    autocomplete=${B(c)}
    autocapitalize=${B(p)}
    placeholder=${i}
  >`,N=h`<form class=inputs-3a86ea style=${_(A)}>
    ${L(e,d)}<div class=inputs-3a86ea-input>
      ${d}
    </div>${y}
  </form>`;return Q(N,d,t,x)}o(Y,"X"),a(Y,"text");function ct(e){return Y({...e,type:"email"})}o(ct,"hn"),a(ct,"email");function ft(e){return Y({...e,type:"tel"})}o(ft,"$n"),a(ft,"tel");function dt(e){return Y({...e,type:"url"})}o(dt,"mn"),a(dt,"url");function pt(e){return Y({...e,type:"password"})}o(pt,"yn"),a(pt,"password");function be(e){return e==null?null:`${e}`}o(be,"me"),a(be,"truefalse");function B(e){return e==null?null:`${e===!1?"off":e===!0?"on":e}`}o(B,"U"),a(B,"onoff");function mt({label:e,value:t,required:n,datalist:i,readonly:r,disabled:l,width:c,...p}={}){const[m,s]=he(i),b=re(),v=h`<input
    type=color
    name=text
    value=${t}
    id=${b}
    list=${s}
    readonly=${r}
    disabled=${l}
    required=${n}
  >`,k=h`<output
    for=${b}
  >`;k.value=v.value,v.addEventListener("input",()=>k.value=v.value);const $=h`<form class=inputs-3a86ea style=${_(c)}>
    ${L(e,v)}<div class=inputs-3a86ea-input>
      <div class=inputs-3a86ea-input>${v}${k}</div>
    </div>${m}
  </form>`;return Q($,v,t,p,{after:g=>v.parentNode.after(g)})}o(mt,"bn"),a(mt,"color");const cn={type:"date",get:e=>e.valueAsDate,set:(e,t)=>e.value=qe(t),same:(e,t)=>+e.valueAsDate==+t,format:qe},fn={type:"datetime-local",get:e=>e.value?new Date(e.value):null,set:(e,t)=>e.value=Ce(t),same:(e,t)=>+new Date(e.value)==+t,format:Ce};function Me({label:e,min:t,max:n,required:i,readonly:r,disabled:l,width:c,value:p,...m}={},{type:s,format:b,...v}){const k=h`<input type=${s} name=date readonly=${r} disabled=${l} required=${i} min=${b(t)} max=${b(n)}>`,$=h`<form class=inputs-3a86ea style=${_(c)}>
    ${L(e,k)}<div class=inputs-3a86ea-input>
      ${k}
    </div>
  </form>`;return Q($,k,$e(p),m,v)}o(Me,"Fe"),a(Me,"createDate");function vt(e){return Me(e,cn)}o(vt,"vn"),a(vt,"date");function ht(e){return Me(e,fn)}o(ht,"kn"),a(ht,"datetime");function $e(e){return e instanceof Date&&!isNaN(e)?e:typeof e=="string"?Qe(e,null):e==null||isNaN(e=+e)?null:new Date(+e)}o($e,"ye"),a($e,"coerce");function qe(e){return(e=$e(e))?e.toISOString().slice(0,10):e}o(qe,"Ie"),a(qe,"formatDate");function Ce(e){return(e=$e(e))?new Date(+e-e.getTimezoneOffset()*1e3*60).toISOString().slice(0,16):e}o(Ce,"Me"),a(Ce,"formatDatetime");function bt(e,t){return(Array.isArray(e)?yt:wt)(e,t)}o(bt,"Nn"),a(bt,"form");function $t(e){return h`<div>${e}`}o($t,"An"),a($t,"arrayTemplate");function yt(e,{template:t=$t}={}){e=[...e];let n=e.map(({value:i})=>i);return Object.defineProperty(t(e),"value",{get(){for(let i=0,r=e.length;i<r;++i){const l=e[i].value;Object.is(l,n[i])||(n=[...n],n[i]=l)}return n},set(i=[]){for(let r=0,l=e.length;r<l;++r)e[r].value=i[r]}})}o(yt,"Sn"),a(yt,"arrayForm");function gt(e){return h`<div>${Object.values(e)}`}o(gt,"xn"),a(gt,"objectTemplate");function wt(e,{template:t=gt}={}){e={...e};let n=Object.fromEntries(Object.entries(e).map(([i,{value:r}])=>[i,r]));return Object.defineProperty(t(e),"value",{get(){for(const i in n){const r=e[i].value;Object.is(r,n[i])||(n={...n},n[i]=r)}return n},set(i={}){for(const r in e)e[r].value=i[r]}})}o(wt,"En"),a(wt,"objectForm");function kt({label:e,required:t,accept:n,capture:i,multiple:r,disabled:l,width:c,value:p,submit:m,transform:s=a(v=>v,"transform"),...b}={}){const v=h`<input
    type=file
    name=file
    disabled=${l}
    required=${t}
    accept=${n}
    capture=${i}
    multiple=${r}
  >`,k=h`<form class=inputs-3a86ea style=${_(c)}>
    ${L(e,v)}<div class=inputs-3a86ea-input>
      ${v}
    </div>
  </form>`;return Q(k,v,void 0,b,{get:$=>r?Array.from($.files,g=>s(g)):$.files.length?s($.files[0]):null,set:()=>{},same:()=>!1})}o(kt,"Tn"),a(kt,"file");const ye=1e-6;function xt(e,t){return arguments.length<2&&(t=e,e=void 0),e===void 0&&(e=[]),Fe({extent:e},t)}o(xt,"Dn"),a(xt,"number");function Nt(e=[0,1],t){return Fe({extent:e,range:!0},t)}o(Nt,"Ln"),a(Nt,"range");function Fe({extent:[e,t],range:n},{format:i=je,transform:r,invert:l,label:c="",value:p,step:m,disabled:s,placeholder:b,validate:v=Se,width:k}={}){let $;if(typeof i!="function")throw new TypeError("format is not a function");(e==null||isNaN(e=+e))&&(e=-1/0),(t==null||isNaN(t=+t))&&(t=1/0),e>t&&([e,t]=[t,e],r===void 0&&(r=ge)),m!==void 0&&(m=+m);const g=h`<input type=number min=${isFinite(e)?e:null} max=${isFinite(t)?t:null} step=${m??"any"} name=number required placeholder=${b} oninput=${E} disabled=${s}>`;let j;if(n){if(r===void 0&&(r=F),typeof r!="function")throw new TypeError("transform is not a function");if(l===void 0&&(l=r.invert===void 0?At(r):r.invert),typeof l!="function")throw new TypeError("invert is not a function");let d=+r(e),N=+r(t);d>N&&([d,N]=[N,d]),n=h`<input type=range min=${isFinite(d)?d:null} max=${isFinite(N)?N:null} step=${m===void 0||r!==F&&r!==ge?"any":m} name=range oninput=${y} disabled=${s}>`,j=r===F?n:h`<input type=range min=${e} max=${t} step=${m===void 0?"any":m} name=range disabled=${s}>`}else n=null,r=l=F;const A=h`<form class=inputs-3a86ea style=${_(k)}>
    ${L(c,g)}<div class=inputs-3a86ea-input>
      ${g}${n}
    </div>
  </form>`;A.addEventListener("submit",G);function x(d){return j?(d=Math.max(e,Math.min(t,d)),isFinite(d)?(j.valueAsNumber=d,j.valueAsNumber):d):+d}o(x,"k"),a(x,"coerce");function y(d){const N=x(l(n.valueAsNumber));if(isFinite(N)&&(g.valueAsNumber=Math.max(e,Math.min(t,N)),v(g))){$=g.valueAsNumber,g.value=i($);return}d&&d.stopPropagation()}o(y,"g"),a(y,"onrange");function E(d){const N=x(g.valueAsNumber);if(isFinite(N)&&(n&&(n.valueAsNumber=r(N)),v(g))){$=N;return}d&&d.stopPropagation()}return o(E,"T"),a(E,"onnumber"),Object.defineProperty(A,"value",{get(){return $},set(d){d=x(d),isFinite(d)&&(g.valueAsNumber=d,n&&(n.valueAsNumber=r(d)),v(g)&&($=d,g.value=i($)))}}),p===void 0&&j&&(p=j.valueAsNumber),p!==void 0&&(A.value=p),A}o(Fe,"Pe"),a(Fe,"createRange");function ge(e){return-e}o(ge,"be"),a(ge,"negate");function Ot(e){return e*e}o(Ot,"zn"),a(Ot,"square");function At(e){return e===F||e===ge?e:e===Math.sqrt?Ot:e===Math.log?Math.exp:e===Math.exp?Math.log:t=>St(e,t,t)}o(At,"On"),a(At,"solver");function St(e,t,n){let i=100,r,l,c;n=n===void 0?0:+n,t=+t;do l=e(n),c=e(n+ye),l===c&&(c=l+ye),n-=r=-1*ye*(l-t)/(l-c);while(i-- >0&&Math.abs(r)>ye);return i<0?NaN:n}o(St,"jn"),a(St,"solve");function Tt(e,{locale:t,format:n=dn(t),label:i,query:r="",placeholder:l="Search",columns:c=Ee(e),spellcheck:p,autocomplete:m,autocapitalize:s,filter:b=c===void 0?Pe:Et(c),datalist:v,disabled:k,required:$=!0,width:g}={}){let j=[];e=K(e),$=!!$;const[A,x]=he(v),y=h`<input
    name=input
    type=search
    list=${x}
    disabled=${k}
    spellcheck=${be(p)}
    autocomplete=${B(m)}
    autocapitalize=${B(s)}
    placeholder=${l}
    value=${r}
    oninput=${N}
  >`,E=h`<output name=output>`,d=h`<form class=inputs-3a86ea style=${_(g)}>
    ${L(i,y)}<div class=inputs-3a86ea-input>
      ${y}${E}
    </div>${A}
  </form>`;d.addEventListener("submit",G);function N(){j=y.value||$?e.filter(b(y.value)):[],c!==void 0&&(j.columns=c),E.value=n(j.length)}return o(N,"N"),a(N,"oninput"),N(),Object.defineProperties(d,{value:{get(){return j}},query:{get(){return r},set(S){r=y.value=H(S),N()}}})}o(Tt,"Fn"),a(Tt,"search");function Pe(e){const t=`${e}`.split(/\s+/g).filter(n=>n).map(_e);return n=>{if(n==null)return!1;if(typeof n=="object")e:for(const i of t){for(const r of jt(n))if(i.test(r))continue e;return!1}else for(const i of t)if(!i.test(n))return!1;return!0}}o(Pe,"Ce"),a(Pe,"searchFilter");function Et(e){return t=>{const n=`${t}`.split(/\s+/g).filter(i=>i).map(_e);return i=>{e:for(const r of n){for(const l of e)if(r.test(i[l]))continue e;return!1}return!0}}}o(Et,"In"),a(Et,"columnFilter");function*jt(e){for(const t in e)yield e[t]}o(jt,"Mn"),a(jt,"valuesof");function _e(e){return new RegExp(`(?:^|[^\\p{L}-])${zt(e)}`,"iu")}o(_e,"_e"),a(_e,"termFilter");function zt(e){return e.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&")}o(zt,"Pn"),a(zt,"escapeRegExp");const dn=ae(e=>{const t=ie(e);return n=>`${t(n)} result${n===1?"":"s"}`}),pn=Le({render(e,t,n,i,{format:r,multiple:l,size:c,label:p,width:m}){const s=h`<select class=inputs-3a86ea-input disabled=${i===!0} multiple=${l} size=${c} name=input>
      ${t.map(b=>h`<option value=${b} disabled=${typeof i=="function"?i(b):!1} selected=${n(b)}>${H(r(e[b],b,e))}`)}
    </select>`;return[h`<form class=inputs-3a86ea style=${_(m)}>${L(p,s)}${s}`,s]},selectedIndexes(e){return Array.from(e.selectedOptions,t=>+t.value)},select(e,t){e.selected=t}}),Lt=22;function Dt(e,t={}){const{rows:n=11.5,height:i,maxHeight:r=i===void 0?(n+1)*Lt-1:void 0,width:l={},maxWidth:c}=t,p=re(),m=h`<form class="inputs-3a86ea inputs-3a86ea-table" id=${p} style=${{height:U(i),maxHeight:U(r),width:typeof l=="string"||typeof l=="number"?U(l):void 0,maxWidth:U(c)}}>`;return e&&typeof e.then=="function"?(Object.defineProperty(m,"value",{configurable:!0,set(){throw new Error("cannot set value while data is unresolved")}}),Promise.resolve(e).then(s=>Ie({root:m,id:p},s,t))):Ie({root:m,id:p},e,t),m}o(Dt,"Rn"),a(Dt,"table");function Ie({root:e,id:t},n,{columns:i=Ee(n),value:r,required:l=!0,sort:c,reverse:p=!1,format:m,locale:s,align:b,header:v,rows:k=11.5,width:$={},multiple:g=!0,select:j=!0,layout:A}={}){i=i===void 0?_t(n):K(i),A===void 0&&(A=i.length>=12?"auto":"fixed"),m=Mt(m,n,i,s),b=qt(b,n,i);let x=[],y=[],E=n[Symbol.iterator](),d=0,N=Pt(n),S=M(k*2);function O(){d>=0&&(d=E=void 0,y=Uint32Array.from(x=K(n),(u,f)=>f),N=y.length)}o(O,"A"),a(O,"materialize");function M(u){if(u=Math.floor(u),N!==void 0)return Math.min(N,u);if(u<=d)return u;for(;u>d;){const{done:f,value:w}=E.next();if(f)return N=d;y.push(d++),x.push(w)}return d}o(M,"E"),a(M,"minlengthof");let D=null,V=!1,T=new Set,I=null,R=null;const q=h`<tbody>`,Vt=h`<tr><td>${j?h`<input type=${g?"checkbox":"radio"} name=${g?null:"radio"}>`:null}</td>${i.map(()=>h`<td>`)}`,ce=h`<tr><th>${j?h`<input type=checkbox onclick=${We} disabled=${!g}>`:null}</th>${i.map(u=>h`<th title=${u} onclick=${f=>Ne(f,u)}><span></span>${v&&u in v?v[u]:u}</th>`)}</tr>`;e.appendChild(h.fragment`<table style=${{tableLayout:A}}>
  <thead>${M(1)||i.length?ce:null}</thead>
  ${q}
</table>
<style>${i.map((u,f)=>{const w=[];if(b[u]!=null&&w.push(`text-align:${b[u]}`),$[u]!=null&&w.push(`width:${U($[u])}`),w.length)return`#${t} tr>:nth-child(${f+2}){${w.join(";")}}`}).filter(F).join(`
`)}</style>`);function fe(u,f){if(d===u){for(;u<f;++u)ke(E.next().value,u);d=f}else for(let w;u<f;++u)w=y[u],ke(x[w],w)}o(fe,"se"),a(fe,"appendRows");function ke(u,f){const w=Vt.cloneNode(!0),z=X(w);if(z!=null&&(z.onclick=Ze,z.checked=T.has(f),z.value=f),u!=null)for(let Z=0;Z<i.length;++Z){let de=i[Z],P=u[de];J(P)&&(P=m[de](P,f,n),P instanceof Node||(P=document.createTextNode(P)),w.childNodes[Z+1].appendChild(P))}q.append(w)}o(ke,"Ne"),a(ke,"appendRow");function W(u){O();let f=y.indexOf(u);if(f<q.childNodes.length){const w=q.childNodes[f];X(w).checked=!1}T.delete(u)}o(W,"B"),a(W,"unselect");function ee(u){O();let f=y.indexOf(u);if(f<q.childNodes.length){const w=q.childNodes[f];X(w).checked=!0}T.add(u)}o(ee,"ee"),a(ee,"select");function*xe(u,f){if(O(),u=y.indexOf(u),f=y.indexOf(f),u<f)for(;u<=f;)yield y[u++];else for(;f<=u;)yield y[f++]}o(xe,"Ae"),a(xe,"range");function Ve(u){return u[Symbol.iterator]().next().value}o(Ve,"Ge"),a(Ve,"first");function We(u){if(O(),this.checked){T=new Set(y);for(const f of q.childNodes)X(f).checked=!0}else{for(let f of T)W(f);I=R=null,u.detail&&u.currentTarget.blur()}te()}o(We,"Je"),a(We,"reselectAll");function Ze(u){O();let f=+this.value;if(g)if(u.shiftKey){if(I===null)I=T.size?Ve(T):y[0];else for(let w of xe(I,R))W(w);R=f;for(let w of xe(I,R))ee(w)}else I=R=f,T.has(f)?(W(f),I=R=null,u.detail&&u.currentTarget.blur()):ee(f);else{for(let w of T)W(w);ee(f)}te()}o(Ze,"Qe"),a(Ze,"reselect");function Ne(u,f){O();const w=u.currentTarget;let z;if(D===w&&u.metaKey)we(D).textContent="",D=null,V=!1,z=ve;else{D===w?V=!V:(D&&(we(D).textContent=""),D=w,V=u.altKey);const Z=V?ze:ve;z=a((de,P)=>Z(x[de][f],x[P][f]),"compare"),we(w).textContent=V?"\u25BE":"\u25B4"}for(y.sort(z),T=new Set(Array.from(T).sort(z)),e.scrollTo(e.scrollLeft,0);q.firstChild;)q.firstChild.remove();fe(0,S=M(k*2)),I=R=null,te()}o(Ne,"Se"),a(Ne,"resort");function te(){const u=X(ce);u!=null&&(u.disabled=!g&&!T.size,u.indeterminate=g&&T.size&&T.size!==N,u.checked=T.size,r=void 0)}if(o(te,"ne"),a(te,"reinput"),e.addEventListener("scroll",()=>{e.scrollHeight-e.scrollTop<k*Lt*1.5&&S<M(S+1)&&fe(S,S=M(S+k))}),c===void 0&&p&&(O(),y.reverse()),r!==void 0){if(O(),g){const u=new Set(r);T=new Set(y.filter(f=>u.has(x[f])))}else{const u=x.indexOf(r);T=u<0?new Set:new Set([u])}te()}if(M(1)?fe(0,S):q.append(h`<tr>${i.length?h`<td>`:null}<td rowspan=${i.length} style="padding-left: var(--length3); font-style: italic;">No results.</td></tr>`),c!==void 0){let u=i.indexOf(c);u>=0&&(p&&(D=ce.childNodes[u+1]),Ne({currentTarget:ce.childNodes[u+1]},i[u]))}return Object.defineProperty(e,"value",{get(){if(r===void 0)if(O(),g)r=Array.from(l&&T.size===0?y:T,u=>x[u]),r.columns=i;else if(T.size){const[u]=T;r=x[u]}else r=null;return r},set(u){if(O(),g){const f=new Set(u),w=new Set(y.filter(z=>f.has(x[z])));for(const z of T)w.has(z)||W(z);for(const z of w)T.has(z)||ee(z)}else{const f=x.indexOf(u);T=f<0?new Set:new Set([f])}r=void 0}})}o(Ie,"He"),a(Ie,"initialize");function X(e){return e.firstChild.firstChild}o(X,"Y"),a(X,"inputof");function we(e){return e.firstChild}o(we,"ge"),a(we,"orderof");function Mt(e={},t,n,i){const r=Object.create(null);for(const l of n){if(l in e){r[l]=e[l];continue}switch(Ue(t,l)){case"number":r[l]=ie(i);break;case"date":r[l]=me;break;default:r[l]=pe(i);break}}return r}o(Mt,"Hn"),a(Mt,"formatof");function qt(e={},t,n){const i=Object.create(null);for(const r of n)r in e?i[r]=e[r]:Ue(t,r)==="number"&&(i[r]="right");return i}o(qt,"Kn"),a(qt,"alignof");function Ue(e,t){if(Ct(e))return Ft(e,t);for(const n of e){if(n==null)continue;const i=n[t];if(i!=null)return typeof i=="number"?"number":i instanceof Date?"date":void 0}}o(Ue,"Ke"),a(Ue,"type");function Ct(e){return typeof e.getChild=="function"&&typeof e.toArray=="function"&&e.schema&&Array.isArray(e.schema.fields)}o(Ct,"qn"),a(Ct,"isArrowTable");function Ft(e,t){const n=e.schema.fields.find(i=>i.name===t);switch(n?.type.typeId){case 8:case 10:return n.type.unit===1?"date":"number";case 2:case 3:case 7:case 9:return"number"}}o(Ft,"Wn"),a(Ft,"getArrowType");function Pt(e){if(typeof e.length=="number")return e.length;if(typeof e.size=="number")return e.size;if(typeof e.numRows=="function")return e.numRows()}o(Pt,"Un"),a(Pt,"lengthof");function _t(e){const t=new Set;for(const n of e)for(const i in n)t.add(i);return Array.from(t)}o(_t,"Bn"),a(_t,"columnsof");function It({value:e="",label:t,placeholder:n,spellcheck:i,autocomplete:r,autocapitalize:l,rows:c=3,minlength:p,maxlength:m,required:s=p>0,readonly:b,disabled:v,monospace:k=!1,resize:$=c<12,width:g,...j}={}){const A=h`<textarea
    name=text
    readonly=${b}
    disabled=${v}
    required=${s}
    rows=${c}
    minlength=${p}
    maxlength=${m}
    spellcheck=${be(i)}
    autocomplete=${B(r)}
    autocapitalize=${B(l)}
    placeholder=${n}
    onkeydown=${y}
    style=${{width:g,fontFamily:k?"var(--monospace, monospace)":null,resize:$?null:"none"}}
  >`,x=h`<form class="inputs-3a86ea inputs-3a86ea-textarea" style=${_(g)}>
    ${L(t,A)}<div>
      ${A}
    </div>
  </form>`;function y(E){if(j.submit&&E.key==="Enter"&&(E.metaKey||E.ctrlKey))return x.dispatchEvent(new Event("submit",Ae))}return o(y,"g"),a(y,"onkeydown"),Q(x,A,e,j)}o(It,"Gn"),a(It,"textarea");function Ut(e){const t=new EventTarget;return t.value=e,t}o(Ut,"Jn"),a(Ut,"input");function Re(e){return new Promise(t=>{requestAnimationFrame(()=>{const n=e.closest(".observablehq");if(!n)return t();const i=new MutationObserver(()=>{n.contains(e)||(i.disconnect(),t())});i.observe(n,{childList:!0})})})}o(Re,"qe"),a(Re,"disposal");function Rt(e,t,n=Re(e)){const i=He(t),r=a(()=>Ke(e,t),"onsource"),l=a(()=>(Ke(t,e),t.dispatchEvent(new Event(i,Ae))),"ontarget");return r(),e.addEventListener(He(e),l),t.addEventListener(i,r),n.then(()=>t.removeEventListener(i,r)),e}o(Rt,"Qn"),a(Rt,"bind");function Kt(e){switch(e.type){case"range":case"number":return e.valueAsNumber;case"date":return e.valueAsDate;case"checkbox":return e.checked;case"file":return e.multiple?e.files:e.files[0];default:return e.value}}o(Kt,"Vn"),a(Kt,"get");function Ke(e,t){const n=Kt(t);switch(e.type){case"range":case"number":e.valueAsNumber=n;break;case"date":e.valueAsDate=n;break;case"checkbox":e.checked=n;break;case"file":e.multiple?e.files=n:e.files=[n];break;default:e.value=n;break}}o(Ke,"We"),a(Ke,"set");function He(e){switch(e.type){case"button":case"submit":return"click";case"file":return"change";default:return"input"}}o(He,"Ue"),a(He,"eventof");var mn=Object.defineProperty,Be=o((e,t)=>mn(e,"name",{value:t,configurable:!0}),"e");const vn=Be(e=>kt({...e,transform:Ht}),"file");function Ht(e){return new hn(e)}o(Ht,"B"),Be(Ht,"localFile");const Bt=(se=class extends Zt{constructor(t){super(t.name,t.type,t.lastModified,t.size),Object.defineProperty(this,"_",{value:t}),Object.defineProperty(this,"_url",{writable:!0})}get href(){return this._url??=URL.createObjectURL(this._)}async url(){return this.href}async blob(){return this._}async stream(){return this._.stream()}},o(se,"o"),se);Be(Bt,"LocalFile");let hn=Bt;export{Rt as bind,Ye as button,on as checkbox,mt as color,vt as date,ht as datetime,Re as disposal,ct as email,vn as file,bt as form,tn as formatAuto,me as formatDate,pe as formatLocaleAuto,ie as formatLocaleNumber,nn as formatNumber,je as formatTrim,Ut as input,xt as number,pt as password,an as radio,Nt as range,Tt as search,Pe as searchFilter,pn as select,Dt as table,ft as tel,Y as text,It as textarea,at as toggle,dt as url};
