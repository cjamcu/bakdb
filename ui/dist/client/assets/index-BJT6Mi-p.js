import{r as o,j as h}from"./router-0uN5aety.js";import{P as L,d as $}from"./index-CJOOd4Gm.js";import{u as S}from"./utils-BAO6HRzK.js";import{w as z,r as K}from"./components-BFRM7CUx.js";function g(e,t,{checkForDefaultPrevented:n=!0}={}){return function(s){if(e==null||e(s),n===!1||!s.defaultPrevented)return t==null?void 0:t(s)}}function de(e,t){const n=o.createContext(t);function r(i){const{children:u,...c}=i,d=o.useMemo(()=>c,Object.values(c));return h.jsx(n.Provider,{value:d,children:u})}function s(i){const u=o.useContext(n);if(u)return u;if(t!==void 0)return t;throw new Error(`\`${i}\` must be used within \`${e}\``)}return r.displayName=e+"Provider",[r,s]}function fe(e,t=[]){let n=[];function r(i,u){const c=o.createContext(u),d=n.length;n=[...n,u];function a(v){const{scope:l,children:E,...p}=v,y=(l==null?void 0:l[e][d])||c,N=o.useMemo(()=>p,Object.values(p));return h.jsx(y.Provider,{value:N,children:E})}function f(v,l){const E=(l==null?void 0:l[e][d])||c,p=o.useContext(E);if(p)return p;if(u!==void 0)return u;throw new Error(`\`${v}\` must be used within \`${i}\``)}return a.displayName=i+"Provider",[a,f]}const s=()=>{const i=n.map(u=>o.createContext(u));return function(c){const d=(c==null?void 0:c[e])||i;return o.useMemo(()=>({[`__scope${e}`]:{...c,[e]:d}}),[c,d])}};return s.scopeName=e,[r,X(s,...t)]}function X(...e){const t=e[0];if(e.length===1)return t;const n=()=>{const r=e.map(s=>({useScope:s(),scopeName:s.scopeName}));return function(i){const u=r.reduce((c,{useScope:d,scopeName:a})=>{const v=d(i)[`__scope${a}`];return{...c,...v}},{});return o.useMemo(()=>({[`__scope${t.scopeName}`]:u}),[u])}};return n.scopeName=t.scopeName,n}function P(e){const t=o.useRef(e);return o.useEffect(()=>{t.current=e}),o.useMemo(()=>(...n)=>{var r;return(r=t.current)==null?void 0:r.call(t,...n)},[])}function Y(e,t=globalThis==null?void 0:globalThis.document){const n=P(e);o.useEffect(()=>{const r=s=>{s.key==="Escape"&&n(s)};return t.addEventListener("keydown",r,{capture:!0}),()=>t.removeEventListener("keydown",r,{capture:!0})},[n,t])}var q="DismissableLayer",x="dismissableLayer.update",G="dismissableLayer.pointerDownOutside",J="dismissableLayer.focusOutside",M,_=o.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),I=o.forwardRef((e,t)=>{const{disableOutsidePointerEvents:n=!1,onEscapeKeyDown:r,onPointerDownOutside:s,onFocusOutside:i,onInteractOutside:u,onDismiss:c,...d}=e,a=o.useContext(_),[f,v]=o.useState(null),l=(f==null?void 0:f.ownerDocument)??(globalThis==null?void 0:globalThis.document),[,E]=o.useState({}),p=S(t,m=>v(m)),y=Array.from(a.layers),[N]=[...a.layersWithOutsidePointerEventsDisabled].slice(-1),j=y.indexOf(N),D=f?y.indexOf(f):-1,k=a.layersWithOutsidePointerEventsDisabled.size>0,A=D>=j,F=Z(m=>{const b=m.target,w=[...a.branches].some(O=>O.contains(b));!A||w||(s==null||s(m),u==null||u(m),m.defaultPrevented||c==null||c())},l),T=V(m=>{const b=m.target;[...a.branches].some(O=>O.contains(b))||(i==null||i(m),u==null||u(m),m.defaultPrevented||c==null||c())},l);return Y(m=>{D===a.layers.size-1&&(r==null||r(m),!m.defaultPrevented&&c&&(m.preventDefault(),c()))},l),o.useEffect(()=>{if(f)return n&&(a.layersWithOutsidePointerEventsDisabled.size===0&&(M=l.body.style.pointerEvents,l.body.style.pointerEvents="none"),a.layersWithOutsidePointerEventsDisabled.add(f)),a.layers.add(f),U(),()=>{n&&a.layersWithOutsidePointerEventsDisabled.size===1&&(l.body.style.pointerEvents=M)}},[f,l,n,a]),o.useEffect(()=>()=>{f&&(a.layers.delete(f),a.layersWithOutsidePointerEventsDisabled.delete(f),U())},[f,a]),o.useEffect(()=>{const m=()=>E({});return document.addEventListener(x,m),()=>document.removeEventListener(x,m)},[]),h.jsx(L.div,{...d,ref:p,style:{pointerEvents:k?A?"auto":"none":void 0,...e.style},onFocusCapture:g(e.onFocusCapture,T.onFocusCapture),onBlurCapture:g(e.onBlurCapture,T.onBlurCapture),onPointerDownCapture:g(e.onPointerDownCapture,F.onPointerDownCapture)})});I.displayName=q;var Q="DismissableLayerBranch",B=o.forwardRef((e,t)=>{const n=o.useContext(_),r=o.useRef(null),s=S(t,r);return o.useEffect(()=>{const i=r.current;if(i)return n.branches.add(i),()=>{n.branches.delete(i)}},[n.branches]),h.jsx(L.div,{...e,ref:s})});B.displayName=Q;function Z(e,t=globalThis==null?void 0:globalThis.document){const n=P(e),r=o.useRef(!1),s=o.useRef(()=>{});return o.useEffect(()=>{const i=c=>{if(c.target&&!r.current){let d=function(){W(G,n,a,{discrete:!0})};const a={originalEvent:c};c.pointerType==="touch"?(t.removeEventListener("click",s.current),s.current=d,t.addEventListener("click",s.current,{once:!0})):d()}else t.removeEventListener("click",s.current);r.current=!1},u=window.setTimeout(()=>{t.addEventListener("pointerdown",i)},0);return()=>{window.clearTimeout(u),t.removeEventListener("pointerdown",i),t.removeEventListener("click",s.current)}},[t,n]),{onPointerDownCapture:()=>r.current=!0}}function V(e,t=globalThis==null?void 0:globalThis.document){const n=P(e),r=o.useRef(!1);return o.useEffect(()=>{const s=i=>{i.target&&!r.current&&W(J,n,{originalEvent:i},{discrete:!1})};return t.addEventListener("focusin",s),()=>t.removeEventListener("focusin",s)},[t,n]),{onFocusCapture:()=>r.current=!0,onBlurCapture:()=>r.current=!1}}function U(){const e=new CustomEvent(x);document.dispatchEvent(e)}function W(e,t,n,{discrete:r}){const s=n.originalEvent.target,i=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:n});t&&s.addEventListener(e,t,{once:!0}),r?$(s,i):s.dispatchEvent(i)}var le=I,me=B,R=globalThis!=null&&globalThis.document?o.useLayoutEffect:()=>{},H="Portal",ee=o.forwardRef((e,t)=>{var c;const{container:n,...r}=e,[s,i]=o.useState(!1);R(()=>i(!0),[]);const u=n||s&&((c=globalThis==null?void 0:globalThis.document)==null?void 0:c.body);return u?z.createPortal(h.jsx(L.div,{...r,ref:t}),u):null});ee.displayName=H;function te(e,t){return o.useReducer((n,r)=>t[n][r]??n,e)}var ne=e=>{const{present:t,children:n}=e,r=re(t),s=typeof n=="function"?n({present:r.isPresent}):o.Children.only(n),i=S(r.ref,se(s));return typeof n=="function"||r.isPresent?o.cloneElement(s,{ref:i}):null};ne.displayName="Presence";function re(e){const[t,n]=o.useState(),r=o.useRef({}),s=o.useRef(e),i=o.useRef("none"),u=e?"mounted":"unmounted",[c,d]=te(u,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return o.useEffect(()=>{const a=C(r.current);i.current=c==="mounted"?a:"none"},[c]),R(()=>{const a=r.current,f=s.current;if(f!==e){const l=i.current,E=C(a);e?d("MOUNT"):E==="none"||(a==null?void 0:a.display)==="none"?d("UNMOUNT"):d(f&&l!==E?"ANIMATION_OUT":"UNMOUNT"),s.current=e}},[e,d]),R(()=>{if(t){const a=v=>{const E=C(r.current).includes(v.animationName);v.target===t&&E&&K.flushSync(()=>d("ANIMATION_END"))},f=v=>{v.target===t&&(i.current=C(r.current))};return t.addEventListener("animationstart",f),t.addEventListener("animationcancel",a),t.addEventListener("animationend",a),()=>{t.removeEventListener("animationstart",f),t.removeEventListener("animationcancel",a),t.removeEventListener("animationend",a)}}else d("ANIMATION_END")},[t,d]),{isPresent:["mounted","unmountSuspended"].includes(c),ref:o.useCallback(a=>{a&&(r.current=getComputedStyle(a)),n(a)},[])}}function C(e){return(e==null?void 0:e.animationName)||"none"}function se(e){var r,s;let t=(r=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:r.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(t=(s=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:s.get,n=t&&"isReactWarning"in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}function ve({prop:e,defaultProp:t,onChange:n=()=>{}}){const[r,s]=oe({defaultProp:t,onChange:n}),i=e!==void 0,u=i?e:r,c=P(n),d=o.useCallback(a=>{if(i){const v=typeof a=="function"?a(e):a;v!==e&&c(v)}else s(a)},[i,e,s,c]);return[u,d]}function oe({defaultProp:e,onChange:t}){const n=o.useState(e),[r]=n,s=o.useRef(r),i=P(t);return o.useEffect(()=>{s.current!==r&&(i(r),s.current=r)},[r,s,i]),n}export{me as B,I as D,ne as P,le as R,P as a,g as b,fe as c,ee as d,R as e,de as f,ve as u};
