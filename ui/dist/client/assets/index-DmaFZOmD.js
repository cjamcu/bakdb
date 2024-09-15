import{c as oe}from"./createLucideIcon-luw-QPq7.js";import{r as u,d as me,j as pe}from"./router-0uN5aety.js";import{e as ge,a as G}from"./index-BJT6Mi-p.js";import{u as ye}from"./utils-BAO6HRzK.js";import{P as be}from"./index-CJOOd4Gm.js";/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const St=oe("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wt=oe("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);var Ee=me.useId||(()=>{}),Se=0;function Ct(e){const[t,r]=u.useState(Ee());return ge(()=>{r(n=>n??String(Se++))},[e]),t?`radix-${t}`:""}var j="focusScope.autoFocusOnMount",_="focusScope.autoFocusOnUnmount",Z={bubbles:!1,cancelable:!0},we="FocusScope",Ce=u.forwardRef((e,t)=>{const{loop:r=!1,trapped:n=!1,onMountAutoFocus:c,onUnmountAutoFocus:i,...s}=e,[a,S]=u.useState(null),y=G(c),p=G(i),f=u.useRef(null),v=ye(t,o=>S(o)),h=u.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;u.useEffect(()=>{if(n){let o=function(m){if(h.paused||!a)return;const g=m.target;a.contains(g)?f.current=g:k(f.current,{select:!0})},l=function(m){if(h.paused||!a)return;const g=m.relatedTarget;g!==null&&(a.contains(g)||k(f.current,{select:!0}))},d=function(m){if(document.activeElement===document.body)for(const b of m)b.removedNodes.length>0&&k(a)};document.addEventListener("focusin",o),document.addEventListener("focusout",l);const E=new MutationObserver(d);return a&&E.observe(a,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",o),document.removeEventListener("focusout",l),E.disconnect()}}},[n,a,h.paused]),u.useEffect(()=>{if(a){q.add(h);const o=document.activeElement;if(!a.contains(o)){const d=new CustomEvent(j,Z);a.addEventListener(j,y),a.dispatchEvent(d),d.defaultPrevented||(ke(xe(ce(a)),{select:!0}),document.activeElement===o&&k(a))}return()=>{a.removeEventListener(j,y),setTimeout(()=>{const d=new CustomEvent(_,Z);a.addEventListener(_,p),a.dispatchEvent(d),d.defaultPrevented||k(o??document.body,{select:!0}),a.removeEventListener(_,p),q.remove(h)},0)}}},[a,y,p,h]);const w=u.useCallback(o=>{if(!r&&!n||h.paused)return;const l=o.key==="Tab"&&!o.altKey&&!o.ctrlKey&&!o.metaKey,d=document.activeElement;if(l&&d){const E=o.currentTarget,[m,g]=Ae(E);m&&g?!o.shiftKey&&d===g?(o.preventDefault(),r&&k(m,{select:!0})):o.shiftKey&&d===m&&(o.preventDefault(),r&&k(g,{select:!0})):d===E&&o.preventDefault()}},[r,n,h.paused]);return pe.jsx(be.div,{tabIndex:-1,...s,ref:v,onKeyDown:w})});Ce.displayName=we;function ke(e,{select:t=!1}={}){const r=document.activeElement;for(const n of e)if(k(n,{select:t}),document.activeElement!==r)return}function Ae(e){const t=ce(e),r=$(t,e),n=$(t.reverse(),e);return[r,n]}function ce(e){const t=[],r=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:n=>{const c=n.tagName==="INPUT"&&n.type==="hidden";return n.disabled||n.hidden||c?NodeFilter.FILTER_SKIP:n.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;r.nextNode();)t.push(r.currentNode);return t}function $(e,t){for(const r of e)if(!Re(r,{upTo:t}))return r}function Re(e,{upTo:t}){if(getComputedStyle(e).visibility==="hidden")return!0;for(;e;){if(t!==void 0&&e===t)return!1;if(getComputedStyle(e).display==="none")return!0;e=e.parentElement}return!1}function Te(e){return e instanceof HTMLInputElement&&"select"in e}function k(e,{select:t=!1}={}){if(e&&e.focus){const r=document.activeElement;e.focus({preventScroll:!0}),e!==r&&Te(e)&&t&&e.select()}}var q=Me();function Me(){let e=[];return{add(t){const r=e[0];t!==r&&(r==null||r.pause()),e=Q(e,t),e.unshift(t)},remove(t){var r;e=Q(e,t),(r=e[0])==null||r.resume()}}}function Q(e,t){const r=[...e],n=r.indexOf(t);return n!==-1&&r.splice(n,1),r}function xe(e){return e.filter(t=>t.tagName!=="A")}var U=0;function kt(){u.useEffect(()=>{const e=document.querySelectorAll("[data-radix-focus-guard]");return document.body.insertAdjacentElement("afterbegin",e[0]??J()),document.body.insertAdjacentElement("beforeend",e[1]??J()),U++,()=>{U===1&&document.querySelectorAll("[data-radix-focus-guard]").forEach(t=>t.remove()),U--}},[])}function J(){const e=document.createElement("span");return e.setAttribute("data-radix-focus-guard",""),e.tabIndex=0,e.style.cssText="outline: none; opacity: 0; position: fixed; pointer-events: none",e}var C=function(){return C=Object.assign||function(t){for(var r,n=1,c=arguments.length;n<c;n++){r=arguments[n];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i])}return t},C.apply(this,arguments)};function ue(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var c=0,n=Object.getOwnPropertySymbols(e);c<n.length;c++)t.indexOf(n[c])<0&&Object.prototype.propertyIsEnumerable.call(e,n[c])&&(r[n[c]]=e[n[c]]);return r}function Pe(e,t,r){if(r||arguments.length===2)for(var n=0,c=t.length,i;n<c;n++)(i||!(n in t))&&(i||(i=Array.prototype.slice.call(t,0,n)),i[n]=t[n]);return e.concat(i||Array.prototype.slice.call(t))}var W="right-scroll-bar-position",B="width-before-scroll-bar",Le="with-scroll-bars-hidden",Ne="--removed-body-scroll-bar-size";function H(e,t){return typeof e=="function"?e(t):e&&(e.current=t),e}function Fe(e,t){var r=u.useState(function(){return{value:e,callback:t,facade:{get current(){return r.value},set current(n){var c=r.value;c!==n&&(r.value=n,r.callback(n,c))}}}})[0];return r.callback=t,r.facade}var Ie=typeof window<"u"?u.useLayoutEffect:u.useEffect,ee=new WeakMap;function Oe(e,t){var r=Fe(null,function(n){return e.forEach(function(c){return H(c,n)})});return Ie(function(){var n=ee.get(r);if(n){var c=new Set(n),i=new Set(e),s=r.current;c.forEach(function(a){i.has(a)||H(a,null)}),i.forEach(function(a){c.has(a)||H(a,s)})}ee.set(r,e)},[e]),r}function We(e){return e}function Be(e,t){t===void 0&&(t=We);var r=[],n=!1,c={read:function(){if(n)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return r.length?r[r.length-1]:e},useMedium:function(i){var s=t(i,n);return r.push(s),function(){r=r.filter(function(a){return a!==s})}},assignSyncMedium:function(i){for(n=!0;r.length;){var s=r;r=[],s.forEach(i)}r={push:function(a){return i(a)},filter:function(){return r}}},assignMedium:function(i){n=!0;var s=[];if(r.length){var a=r;r=[],a.forEach(i),s=r}var S=function(){var p=s;s=[],p.forEach(i)},y=function(){return Promise.resolve().then(S)};y(),r={push:function(p){s.push(p),y()},filter:function(p){return s=s.filter(p),r}}}};return c}function De(e){e===void 0&&(e={});var t=Be(null);return t.options=C({async:!0,ssr:!1},e),t}var ie=function(e){var t=e.sideCar,r=ue(e,["sideCar"]);if(!t)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var n=t.read();if(!n)throw new Error("Sidecar medium not found");return u.createElement(n,C({},r))};ie.isSideCarExport=!0;function je(e,t){return e.useMedium(t),ie}var le=De(),V=function(){},D=u.forwardRef(function(e,t){var r=u.useRef(null),n=u.useState({onScrollCapture:V,onWheelCapture:V,onTouchMoveCapture:V}),c=n[0],i=n[1],s=e.forwardProps,a=e.children,S=e.className,y=e.removeScrollBar,p=e.enabled,f=e.shards,v=e.sideCar,h=e.noIsolation,w=e.inert,o=e.allowPinchZoom,l=e.as,d=l===void 0?"div":l,E=e.gapMode,m=ue(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noIsolation","inert","allowPinchZoom","as","gapMode"]),g=v,b=Oe([r,t]),A=C(C({},m),c);return u.createElement(u.Fragment,null,p&&u.createElement(g,{sideCar:le,removeScrollBar:y,shards:f,noIsolation:h,inert:w,setCallbacks:i,allowPinchZoom:!!o,lockRef:r,gapMode:E}),s?u.cloneElement(u.Children.only(a),C(C({},A),{ref:b})):u.createElement(d,C({},A,{className:S,ref:b}),a))});D.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};D.classNames={fullWidth:B,zeroRight:W};var _e=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function Ue(){if(!document)return null;var e=document.createElement("style");e.type="text/css";var t=_e();return t&&e.setAttribute("nonce",t),e}function He(e,t){e.styleSheet?e.styleSheet.cssText=t:e.appendChild(document.createTextNode(t))}function Ve(e){var t=document.head||document.getElementsByTagName("head")[0];t.appendChild(e)}var Ke=function(){var e=0,t=null;return{add:function(r){e==0&&(t=Ue())&&(He(t,r),Ve(t)),e++},remove:function(){e--,!e&&t&&(t.parentNode&&t.parentNode.removeChild(t),t=null)}}},Xe=function(){var e=Ke();return function(t,r){u.useEffect(function(){return e.add(t),function(){e.remove()}},[t&&r])}},se=function(){var e=Xe(),t=function(r){var n=r.styles,c=r.dynamic;return e(n,c),null};return t},Ye={left:0,top:0,right:0,gap:0},K=function(e){return parseInt(e||"",10)||0},ze=function(e){var t=window.getComputedStyle(document.body),r=t[e==="padding"?"paddingLeft":"marginLeft"],n=t[e==="padding"?"paddingTop":"marginTop"],c=t[e==="padding"?"paddingRight":"marginRight"];return[K(r),K(n),K(c)]},Ge=function(e){if(e===void 0&&(e="margin"),typeof window>"u")return Ye;var t=ze(e),r=document.documentElement.clientWidth,n=window.innerWidth;return{left:t[0],top:t[1],right:t[2],gap:Math.max(0,n-r+t[2]-t[0])}},Ze=se(),x="data-scroll-locked",$e=function(e,t,r,n){var c=e.left,i=e.top,s=e.right,a=e.gap;return r===void 0&&(r="margin"),`
  .`.concat(Le,` {
   overflow: hidden `).concat(n,`;
   padding-right: `).concat(a,"px ").concat(n,`;
  }
  body[`).concat(x,`] {
    overflow: hidden `).concat(n,`;
    overscroll-behavior: contain;
    `).concat([t&&"position: relative ".concat(n,";"),r==="margin"&&`
    padding-left: `.concat(c,`px;
    padding-top: `).concat(i,`px;
    padding-right: `).concat(s,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(a,"px ").concat(n,`;
    `),r==="padding"&&"padding-right: ".concat(a,"px ").concat(n,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(W,` {
    right: `).concat(a,"px ").concat(n,`;
  }
  
  .`).concat(B,` {
    margin-right: `).concat(a,"px ").concat(n,`;
  }
  
  .`).concat(W," .").concat(W,` {
    right: 0 `).concat(n,`;
  }
  
  .`).concat(B," .").concat(B,` {
    margin-right: 0 `).concat(n,`;
  }
  
  body[`).concat(x,`] {
    `).concat(Ne,": ").concat(a,`px;
  }
`)},te=function(){var e=parseInt(document.body.getAttribute(x)||"0",10);return isFinite(e)?e:0},qe=function(){u.useEffect(function(){return document.body.setAttribute(x,(te()+1).toString()),function(){var e=te()-1;e<=0?document.body.removeAttribute(x):document.body.setAttribute(x,e.toString())}},[])},Qe=function(e){var t=e.noRelative,r=e.noImportant,n=e.gapMode,c=n===void 0?"margin":n;qe();var i=u.useMemo(function(){return Ge(c)},[c]);return u.createElement(Ze,{styles:$e(i,!t,c,r?"":"!important")})},Y=!1;if(typeof window<"u")try{var N=Object.defineProperty({},"passive",{get:function(){return Y=!0,!0}});window.addEventListener("test",N,N),window.removeEventListener("test",N,N)}catch{Y=!1}var R=Y?{passive:!1}:!1,Je=function(e){return e.tagName==="TEXTAREA"},fe=function(e,t){var r=window.getComputedStyle(e);return r[t]!=="hidden"&&!(r.overflowY===r.overflowX&&!Je(e)&&r[t]==="visible")},et=function(e){return fe(e,"overflowY")},tt=function(e){return fe(e,"overflowX")},re=function(e,t){var r=t.ownerDocument,n=t;do{typeof ShadowRoot<"u"&&n instanceof ShadowRoot&&(n=n.host);var c=de(e,n);if(c){var i=ve(e,n),s=i[1],a=i[2];if(s>a)return!0}n=n.parentNode}while(n&&n!==r.body);return!1},rt=function(e){var t=e.scrollTop,r=e.scrollHeight,n=e.clientHeight;return[t,r,n]},nt=function(e){var t=e.scrollLeft,r=e.scrollWidth,n=e.clientWidth;return[t,r,n]},de=function(e,t){return e==="v"?et(t):tt(t)},ve=function(e,t){return e==="v"?rt(t):nt(t)},at=function(e,t){return e==="h"&&t==="rtl"?-1:1},ot=function(e,t,r,n,c){var i=at(e,window.getComputedStyle(t).direction),s=i*n,a=r.target,S=t.contains(a),y=!1,p=s>0,f=0,v=0;do{var h=ve(e,a),w=h[0],o=h[1],l=h[2],d=o-l-i*w;(w||d)&&de(e,a)&&(f+=d,v+=w),a instanceof ShadowRoot?a=a.host:a=a.parentNode}while(!S&&a!==document.body||S&&(t.contains(a)||t===a));return(p&&(Math.abs(f)<1||!c)||!p&&(Math.abs(v)<1||!c))&&(y=!0),y},F=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},ne=function(e){return[e.deltaX,e.deltaY]},ae=function(e){return e&&"current"in e?e.current:e},ct=function(e,t){return e[0]===t[0]&&e[1]===t[1]},ut=function(e){return`
  .block-interactivity-`.concat(e,` {pointer-events: none;}
  .allow-interactivity-`).concat(e,` {pointer-events: all;}
`)},it=0,T=[];function lt(e){var t=u.useRef([]),r=u.useRef([0,0]),n=u.useRef(),c=u.useState(it++)[0],i=u.useState(se)[0],s=u.useRef(e);u.useEffect(function(){s.current=e},[e]),u.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(c));var o=Pe([e.lockRef.current],(e.shards||[]).map(ae),!0).filter(Boolean);return o.forEach(function(l){return l.classList.add("allow-interactivity-".concat(c))}),function(){document.body.classList.remove("block-interactivity-".concat(c)),o.forEach(function(l){return l.classList.remove("allow-interactivity-".concat(c))})}}},[e.inert,e.lockRef.current,e.shards]);var a=u.useCallback(function(o,l){if("touches"in o&&o.touches.length===2)return!s.current.allowPinchZoom;var d=F(o),E=r.current,m="deltaX"in o?o.deltaX:E[0]-d[0],g="deltaY"in o?o.deltaY:E[1]-d[1],b,A=o.target,P=Math.abs(m)>Math.abs(g)?"h":"v";if("touches"in o&&P==="h"&&A.type==="range")return!1;var L=re(P,A);if(!L)return!0;if(L?b=P:(b=P==="v"?"h":"v",L=re(P,A)),!L)return!1;if(!n.current&&"changedTouches"in o&&(m||g)&&(n.current=b),!b)return!0;var z=n.current||b;return ot(z,l,o,z==="h"?m:g,!0)},[]),S=u.useCallback(function(o){var l=o;if(!(!T.length||T[T.length-1]!==i)){var d="deltaY"in l?ne(l):F(l),E=t.current.filter(function(b){return b.name===l.type&&(b.target===l.target||l.target===b.shadowParent)&&ct(b.delta,d)})[0];if(E&&E.should){l.cancelable&&l.preventDefault();return}if(!E){var m=(s.current.shards||[]).map(ae).filter(Boolean).filter(function(b){return b.contains(l.target)}),g=m.length>0?a(l,m[0]):!s.current.noIsolation;g&&l.cancelable&&l.preventDefault()}}},[]),y=u.useCallback(function(o,l,d,E){var m={name:o,delta:l,target:d,should:E,shadowParent:st(d)};t.current.push(m),setTimeout(function(){t.current=t.current.filter(function(g){return g!==m})},1)},[]),p=u.useCallback(function(o){r.current=F(o),n.current=void 0},[]),f=u.useCallback(function(o){y(o.type,ne(o),o.target,a(o,e.lockRef.current))},[]),v=u.useCallback(function(o){y(o.type,F(o),o.target,a(o,e.lockRef.current))},[]);u.useEffect(function(){return T.push(i),e.setCallbacks({onScrollCapture:f,onWheelCapture:f,onTouchMoveCapture:v}),document.addEventListener("wheel",S,R),document.addEventListener("touchmove",S,R),document.addEventListener("touchstart",p,R),function(){T=T.filter(function(o){return o!==i}),document.removeEventListener("wheel",S,R),document.removeEventListener("touchmove",S,R),document.removeEventListener("touchstart",p,R)}},[]);var h=e.removeScrollBar,w=e.inert;return u.createElement(u.Fragment,null,w?u.createElement(i,{styles:ut(c)}):null,h?u.createElement(Qe,{gapMode:e.gapMode}):null)}function st(e){for(var t=null;e!==null;)e instanceof ShadowRoot&&(t=e.host,e=e.host),e=e.parentNode;return t}const ft=je(le,lt);var dt=u.forwardRef(function(e,t){return u.createElement(D,C({},e,{ref:t,sideCar:ft}))});dt.classNames=D.classNames;var vt=function(e){if(typeof document>"u")return null;var t=Array.isArray(e)?e[0]:e;return t.ownerDocument.body},M=new WeakMap,I=new WeakMap,O={},X=0,he=function(e){return e&&(e.host||he(e.parentNode))},ht=function(e,t){return t.map(function(r){if(e.contains(r))return r;var n=he(r);return n&&e.contains(n)?n:(console.error("aria-hidden",r,"in not contained inside",e,". Doing nothing"),null)}).filter(function(r){return!!r})},mt=function(e,t,r,n){var c=ht(t,Array.isArray(e)?e:[e]);O[r]||(O[r]=new WeakMap);var i=O[r],s=[],a=new Set,S=new Set(c),y=function(f){!f||a.has(f)||(a.add(f),y(f.parentNode))};c.forEach(y);var p=function(f){!f||S.has(f)||Array.prototype.forEach.call(f.children,function(v){if(a.has(v))p(v);else try{var h=v.getAttribute(n),w=h!==null&&h!=="false",o=(M.get(v)||0)+1,l=(i.get(v)||0)+1;M.set(v,o),i.set(v,l),s.push(v),o===1&&w&&I.set(v,!0),l===1&&v.setAttribute(r,"true"),w||v.setAttribute(n,"true")}catch(d){console.error("aria-hidden: cannot operate on ",v,d)}})};return p(t),a.clear(),X++,function(){s.forEach(function(f){var v=M.get(f)-1,h=i.get(f)-1;M.set(f,v),i.set(f,h),v||(I.has(f)||f.removeAttribute(n),I.delete(f)),h||f.removeAttribute(r)}),X--,X||(M=new WeakMap,M=new WeakMap,I=new WeakMap,O={})}},At=function(e,t,r){r===void 0&&(r="data-aria-hidden");var n=Array.from(Array.isArray(e)?e:[e]),c=vt(e);return c?(n.push.apply(n,Array.from(c.querySelectorAll("[aria-live]"))),mt(n,c,r,"aria-hidden")):function(){return null}};export{St as A,Ce as F,dt as R,wt as T,Ct as a,At as h,kt as u};
