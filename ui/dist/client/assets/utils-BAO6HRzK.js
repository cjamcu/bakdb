import{r as x,j as W}from"./router-0uN5aety.js";function ue(e,r){typeof e=="function"?e(r):e!=null&&(e.current=r)}function oe(...e){return r=>e.forEach(t=>ue(t,r))}function Ye(...e){return x.useCallback(oe(...e),e)}var pe=x.forwardRef((e,r)=>{const{children:t,...o}=e,s=x.Children.toArray(t),n=s.find(fe);if(n){const i=n.props.children,l=s.map(d=>d===n?x.Children.count(i)>1?x.Children.only(null):x.isValidElement(i)?i.props.children:null:d);return W.jsx(U,{...o,ref:r,children:x.isValidElement(i)?x.cloneElement(i,void 0,l):null})}return W.jsx(U,{...o,ref:r,children:t})});pe.displayName="Slot";var U=x.forwardRef((e,r)=>{const{children:t,...o}=e;if(x.isValidElement(t)){const s=me(t);return x.cloneElement(t,{...ge(o,t.props),ref:r?oe(r,s):s})}return x.Children.count(t)>1?x.Children.only(null):null});U.displayName="SlotClone";var be=({children:e})=>W.jsx(W.Fragment,{children:e});function fe(e){return x.isValidElement(e)&&e.type===be}function ge(e,r){const t={...r};for(const o in r){const s=e[o],n=r[o];/^on[A-Z]/.test(o)?s&&n?t[o]=(...l)=>{n(...l),s(...l)}:s&&(t[o]=s):o==="style"?t[o]={...s,...n}:o==="className"&&(t[o]=[s,n].filter(Boolean).join(" "))}return{...e,...t}}function me(e){var o,s;let r=(o=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:o.get,t=r&&"isReactWarning"in r&&r.isReactWarning;return t?e.ref:(r=(s=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:s.get,t=r&&"isReactWarning"in r&&r.isReactWarning,t?e.props.ref:e.props.ref||e.ref)}function ne(e){var r,t,o="";if(typeof e=="string"||typeof e=="number")o+=e;else if(typeof e=="object")if(Array.isArray(e))for(r=0;r<e.length;r++)e[r]&&(t=ne(e[r]))&&(o&&(o+=" "),o+=t);else for(r in e)e[r]&&(o&&(o+=" "),o+=r);return o}function he(){for(var e,r,t=0,o="";t<arguments.length;)(e=arguments[t++])&&(r=ne(e))&&(o&&(o+=" "),o+=r);return o}const D=e=>typeof e=="boolean"?"".concat(e):e===0?"0":e,ee=he,De=(e,r)=>t=>{var o;if((r==null?void 0:r.variants)==null)return ee(e,t==null?void 0:t.class,t==null?void 0:t.className);const{variants:s,defaultVariants:n}=r,i=Object.keys(s).map(c=>{const f=t==null?void 0:t[c],h=n==null?void 0:n[c];if(f===null)return null;const m=D(f)||D(h);return s[c][m]}),l=t&&Object.entries(t).reduce((c,f)=>{let[h,m]=f;return m===void 0||(c[h]=m),c},{}),d=r==null||(o=r.compoundVariants)===null||o===void 0?void 0:o.reduce((c,f)=>{let{class:h,className:m,...C}=f;return Object.entries(C).every(v=>{let[g,u]=v;return Array.isArray(u)?u.includes({...n,...l}[g]):{...n,...l}[g]===u})?[...c,h,m]:c},[]);return ee(e,i,d,t==null?void 0:t.class,t==null?void 0:t.className)};function se(e){var r,t,o="";if(typeof e=="string"||typeof e=="number")o+=e;else if(typeof e=="object")if(Array.isArray(e)){var s=e.length;for(r=0;r<s;r++)e[r]&&(t=se(e[r]))&&(o&&(o+=" "),o+=t)}else for(t in e)e[t]&&(o&&(o+=" "),o+=t);return o}function ye(){for(var e,r,t=0,o="",s=arguments.length;t<s;t++)(e=arguments[t])&&(r=se(e))&&(o&&(o+=" "),o+=r);return o}const q="-",xe=e=>{const r=we(e),{conflictingClassGroups:t,conflictingClassGroupModifiers:o}=e;return{getClassGroupId:i=>{const l=i.split(q);return l[0]===""&&l.length!==1&&l.shift(),le(l,r)||ve(i)},getConflictingClassGroupIds:(i,l)=>{const d=t[i]||[];return l&&o[i]?[...d,...o[i]]:d}}},le=(e,r)=>{var i;if(e.length===0)return r.classGroupId;const t=e[0],o=r.nextPart.get(t),s=o?le(e.slice(1),o):void 0;if(s)return s;if(r.validators.length===0)return;const n=e.join(q);return(i=r.validators.find(({validator:l})=>l(n)))==null?void 0:i.classGroupId},re=/^\[(.+)\]$/,ve=e=>{if(re.test(e)){const r=re.exec(e)[1],t=r==null?void 0:r.substring(0,r.indexOf(":"));if(t)return"arbitrary.."+t}},we=e=>{const{theme:r,prefix:t}=e,o={nextPart:new Map,validators:[]};return ke(Object.entries(e.classGroups),t).forEach(([n,i])=>{F(i,o,n,r)}),o},F=(e,r,t,o)=>{e.forEach(s=>{if(typeof s=="string"){const n=s===""?r:te(r,s);n.classGroupId=t;return}if(typeof s=="function"){if(Ce(s)){F(s(o),r,t,o);return}r.validators.push({validator:s,classGroupId:t});return}Object.entries(s).forEach(([n,i])=>{F(i,te(r,n),t,o)})})},te=(e,r)=>{let t=e;return r.split(q).forEach(o=>{t.nextPart.has(o)||t.nextPart.set(o,{nextPart:new Map,validators:[]}),t=t.nextPart.get(o)}),t},Ce=e=>e.isThemeGetter,ke=(e,r)=>r?e.map(([t,o])=>{const s=o.map(n=>typeof n=="string"?r+n:typeof n=="object"?Object.fromEntries(Object.entries(n).map(([i,l])=>[r+i,l])):n);return[t,s]}):e,ze=e=>{if(e<1)return{get:()=>{},set:()=>{}};let r=0,t=new Map,o=new Map;const s=(n,i)=>{t.set(n,i),r++,r>e&&(r=0,o=t,t=new Map)};return{get(n){let i=t.get(n);if(i!==void 0)return i;if((i=o.get(n))!==void 0)return s(n,i),i},set(n,i){t.has(n)?t.set(n,i):s(n,i)}}},ie="!",Se=e=>{const{separator:r,experimentalParseClassName:t}=e,o=r.length===1,s=r[0],n=r.length,i=l=>{const d=[];let c=0,f=0,h;for(let u=0;u<l.length;u++){let y=l[u];if(c===0){if(y===s&&(o||l.slice(u,u+n)===r)){d.push(l.slice(f,u)),f=u+n;continue}if(y==="/"){h=u;continue}}y==="["?c++:y==="]"&&c--}const m=d.length===0?l:l.substring(f),C=m.startsWith(ie),v=C?m.substring(1):m,g=h&&h>f?h-f:void 0;return{modifiers:d,hasImportantModifier:C,baseClassName:v,maybePostfixModifierPosition:g}};return t?l=>t({className:l,parseClassName:i}):i},Ae=e=>{if(e.length<=1)return e;const r=[];let t=[];return e.forEach(o=>{o[0]==="["?(r.push(...t.sort(),o),t=[]):t.push(o)}),r.push(...t.sort()),r},Re=e=>({cache:ze(e.cacheSize),parseClassName:Se(e),...xe(e)}),je=/\s+/,Me=(e,r)=>{const{parseClassName:t,getClassGroupId:o,getConflictingClassGroupIds:s}=r,n=[],i=e.trim().split(je);let l="";for(let d=i.length-1;d>=0;d-=1){const c=i[d],{modifiers:f,hasImportantModifier:h,baseClassName:m,maybePostfixModifierPosition:C}=t(c);let v=!!C,g=o(v?m.substring(0,C):m);if(!g){if(!v){l=c+(l.length>0?" "+l:l);continue}if(g=o(m),!g){l=c+(l.length>0?" "+l:l);continue}v=!1}const u=Ae(f).join(":"),y=h?u+ie:u,w=y+g;if(n.includes(w))continue;n.push(w);const P=s(g,v);for(let R=0;R<P.length;++R){const I=P[R];n.push(y+I)}l=c+(l.length>0?" "+l:l)}return l};function Pe(){let e=0,r,t,o="";for(;e<arguments.length;)(r=arguments[e++])&&(t=ae(r))&&(o&&(o+=" "),o+=t);return o}const ae=e=>{if(typeof e=="string")return e;let r,t="";for(let o=0;o<e.length;o++)e[o]&&(r=ae(e[o]))&&(t&&(t+=" "),t+=r);return t};function Ee(e,...r){let t,o,s,n=i;function i(d){const c=r.reduce((f,h)=>h(f),e());return t=Re(c),o=t.cache.get,s=t.cache.set,n=l,l(d)}function l(d){const c=o(d);if(c)return c;const f=Me(d,t);return s(d,f),f}return function(){return n(Pe.apply(null,arguments))}}const p=e=>{const r=t=>t[e]||[];return r.isThemeGetter=!0,r},ce=/^\[(?:([a-z-]+):)?(.+)\]$/i,Ge=/^\d+\/\d+$/,Ne=new Set(["px","full","screen"]),Ie=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Ve=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,Te=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,We=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,Oe=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,z=e=>j(e)||Ne.has(e)||Ge.test(e),S=e=>M(e,"length",He),j=e=>!!e&&!Number.isNaN(Number(e)),B=e=>M(e,"number",j),G=e=>!!e&&Number.isInteger(Number(e)),Le=e=>e.endsWith("%")&&j(e.slice(0,-1)),a=e=>ce.test(e),A=e=>Ie.test(e),$e=new Set(["length","size","percentage"]),_e=e=>M(e,$e,de),Be=e=>M(e,"position",de),Ue=new Set(["image","url"]),Fe=e=>M(e,Ue,Je),qe=e=>M(e,"",Ze),N=()=>!0,M=(e,r,t)=>{const o=ce.exec(e);return o?o[1]?typeof r=="string"?o[1]===r:r.has(o[1]):t(o[2]):!1},He=e=>Ve.test(e)&&!Te.test(e),de=()=>!1,Ze=e=>We.test(e),Je=e=>Oe.test(e),Ke=()=>{const e=p("colors"),r=p("spacing"),t=p("blur"),o=p("brightness"),s=p("borderColor"),n=p("borderRadius"),i=p("borderSpacing"),l=p("borderWidth"),d=p("contrast"),c=p("grayscale"),f=p("hueRotate"),h=p("invert"),m=p("gap"),C=p("gradientColorStops"),v=p("gradientColorStopPositions"),g=p("inset"),u=p("margin"),y=p("opacity"),w=p("padding"),P=p("saturate"),R=p("scale"),I=p("sepia"),H=p("skew"),Z=p("space"),J=p("translate"),O=()=>["auto","contain","none"],L=()=>["auto","hidden","clip","visible","scroll"],$=()=>["auto",a,r],b=()=>[a,r],K=()=>["",z,S],V=()=>["auto",j,a],X=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],T=()=>["solid","dashed","dotted","double","none"],Q=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],_=()=>["start","end","center","between","around","evenly","stretch"],E=()=>["","0",a],Y=()=>["auto","avoid","all","avoid-page","page","left","right","column"],k=()=>[j,a];return{cacheSize:500,separator:":",theme:{colors:[N],spacing:[z,S],blur:["none","",A,a],brightness:k(),borderColor:[e],borderRadius:["none","","full",A,a],borderSpacing:b(),borderWidth:K(),contrast:k(),grayscale:E(),hueRotate:k(),invert:E(),gap:b(),gradientColorStops:[e],gradientColorStopPositions:[Le,S],inset:$(),margin:$(),opacity:k(),padding:b(),saturate:k(),scale:k(),sepia:E(),skew:k(),space:b(),translate:b()},classGroups:{aspect:[{aspect:["auto","square","video",a]}],container:["container"],columns:[{columns:[A]}],"break-after":[{"break-after":Y()}],"break-before":[{"break-before":Y()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...X(),a]}],overflow:[{overflow:L()}],"overflow-x":[{"overflow-x":L()}],"overflow-y":[{"overflow-y":L()}],overscroll:[{overscroll:O()}],"overscroll-x":[{"overscroll-x":O()}],"overscroll-y":[{"overscroll-y":O()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[g]}],"inset-x":[{"inset-x":[g]}],"inset-y":[{"inset-y":[g]}],start:[{start:[g]}],end:[{end:[g]}],top:[{top:[g]}],right:[{right:[g]}],bottom:[{bottom:[g]}],left:[{left:[g]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",G,a]}],basis:[{basis:$()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",a]}],grow:[{grow:E()}],shrink:[{shrink:E()}],order:[{order:["first","last","none",G,a]}],"grid-cols":[{"grid-cols":[N]}],"col-start-end":[{col:["auto",{span:["full",G,a]},a]}],"col-start":[{"col-start":V()}],"col-end":[{"col-end":V()}],"grid-rows":[{"grid-rows":[N]}],"row-start-end":[{row:["auto",{span:[G,a]},a]}],"row-start":[{"row-start":V()}],"row-end":[{"row-end":V()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",a]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",a]}],gap:[{gap:[m]}],"gap-x":[{"gap-x":[m]}],"gap-y":[{"gap-y":[m]}],"justify-content":[{justify:["normal",..._()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",..._(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[..._(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[w]}],px:[{px:[w]}],py:[{py:[w]}],ps:[{ps:[w]}],pe:[{pe:[w]}],pt:[{pt:[w]}],pr:[{pr:[w]}],pb:[{pb:[w]}],pl:[{pl:[w]}],m:[{m:[u]}],mx:[{mx:[u]}],my:[{my:[u]}],ms:[{ms:[u]}],me:[{me:[u]}],mt:[{mt:[u]}],mr:[{mr:[u]}],mb:[{mb:[u]}],ml:[{ml:[u]}],"space-x":[{"space-x":[Z]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[Z]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",a,r]}],"min-w":[{"min-w":[a,r,"min","max","fit"]}],"max-w":[{"max-w":[a,r,"none","full","min","max","fit","prose",{screen:[A]},A]}],h:[{h:[a,r,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[a,r,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[a,r,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[a,r,"auto","min","max","fit"]}],"font-size":[{text:["base",A,S]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",B]}],"font-family":[{font:[N]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractons"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",a]}],"line-clamp":[{"line-clamp":["none",j,B]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",z,a]}],"list-image":[{"list-image":["none",a]}],"list-style-type":[{list:["none","disc","decimal",a]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[y]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[y]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...T(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",z,S]}],"underline-offset":[{"underline-offset":["auto",z,a]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:b()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",a]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",a]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[y]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...X(),Be]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",_e]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},Fe]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[v]}],"gradient-via-pos":[{via:[v]}],"gradient-to-pos":[{to:[v]}],"gradient-from":[{from:[C]}],"gradient-via":[{via:[C]}],"gradient-to":[{to:[C]}],rounded:[{rounded:[n]}],"rounded-s":[{"rounded-s":[n]}],"rounded-e":[{"rounded-e":[n]}],"rounded-t":[{"rounded-t":[n]}],"rounded-r":[{"rounded-r":[n]}],"rounded-b":[{"rounded-b":[n]}],"rounded-l":[{"rounded-l":[n]}],"rounded-ss":[{"rounded-ss":[n]}],"rounded-se":[{"rounded-se":[n]}],"rounded-ee":[{"rounded-ee":[n]}],"rounded-es":[{"rounded-es":[n]}],"rounded-tl":[{"rounded-tl":[n]}],"rounded-tr":[{"rounded-tr":[n]}],"rounded-br":[{"rounded-br":[n]}],"rounded-bl":[{"rounded-bl":[n]}],"border-w":[{border:[l]}],"border-w-x":[{"border-x":[l]}],"border-w-y":[{"border-y":[l]}],"border-w-s":[{"border-s":[l]}],"border-w-e":[{"border-e":[l]}],"border-w-t":[{"border-t":[l]}],"border-w-r":[{"border-r":[l]}],"border-w-b":[{"border-b":[l]}],"border-w-l":[{"border-l":[l]}],"border-opacity":[{"border-opacity":[y]}],"border-style":[{border:[...T(),"hidden"]}],"divide-x":[{"divide-x":[l]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[l]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[y]}],"divide-style":[{divide:T()}],"border-color":[{border:[s]}],"border-color-x":[{"border-x":[s]}],"border-color-y":[{"border-y":[s]}],"border-color-t":[{"border-t":[s]}],"border-color-r":[{"border-r":[s]}],"border-color-b":[{"border-b":[s]}],"border-color-l":[{"border-l":[s]}],"divide-color":[{divide:[s]}],"outline-style":[{outline:["",...T()]}],"outline-offset":[{"outline-offset":[z,a]}],"outline-w":[{outline:[z,S]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:K()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[y]}],"ring-offset-w":[{"ring-offset":[z,S]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",A,qe]}],"shadow-color":[{shadow:[N]}],opacity:[{opacity:[y]}],"mix-blend":[{"mix-blend":[...Q(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":Q()}],filter:[{filter:["","none"]}],blur:[{blur:[t]}],brightness:[{brightness:[o]}],contrast:[{contrast:[d]}],"drop-shadow":[{"drop-shadow":["","none",A,a]}],grayscale:[{grayscale:[c]}],"hue-rotate":[{"hue-rotate":[f]}],invert:[{invert:[h]}],saturate:[{saturate:[P]}],sepia:[{sepia:[I]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[t]}],"backdrop-brightness":[{"backdrop-brightness":[o]}],"backdrop-contrast":[{"backdrop-contrast":[d]}],"backdrop-grayscale":[{"backdrop-grayscale":[c]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[f]}],"backdrop-invert":[{"backdrop-invert":[h]}],"backdrop-opacity":[{"backdrop-opacity":[y]}],"backdrop-saturate":[{"backdrop-saturate":[P]}],"backdrop-sepia":[{"backdrop-sepia":[I]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[i]}],"border-spacing-x":[{"border-spacing-x":[i]}],"border-spacing-y":[{"border-spacing-y":[i]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",a]}],duration:[{duration:k()}],ease:[{ease:["linear","in","out","in-out",a]}],delay:[{delay:k()}],animate:[{animate:["none","spin","ping","pulse","bounce",a]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[R]}],"scale-x":[{"scale-x":[R]}],"scale-y":[{"scale-y":[R]}],rotate:[{rotate:[G,a]}],"translate-x":[{"translate-x":[J]}],"translate-y":[{"translate-y":[J]}],"skew-x":[{"skew-x":[H]}],"skew-y":[{"skew-y":[H]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",a]}],accent:[{accent:["auto",e]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",a]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":b()}],"scroll-mx":[{"scroll-mx":b()}],"scroll-my":[{"scroll-my":b()}],"scroll-ms":[{"scroll-ms":b()}],"scroll-me":[{"scroll-me":b()}],"scroll-mt":[{"scroll-mt":b()}],"scroll-mr":[{"scroll-mr":b()}],"scroll-mb":[{"scroll-mb":b()}],"scroll-ml":[{"scroll-ml":b()}],"scroll-p":[{"scroll-p":b()}],"scroll-px":[{"scroll-px":b()}],"scroll-py":[{"scroll-py":b()}],"scroll-ps":[{"scroll-ps":b()}],"scroll-pe":[{"scroll-pe":b()}],"scroll-pt":[{"scroll-pt":b()}],"scroll-pr":[{"scroll-pr":b()}],"scroll-pb":[{"scroll-pb":b()}],"scroll-pl":[{"scroll-pl":b()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",a]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[z,S,B]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}},Xe=Ee(Ke);function er(...e){return Xe(ye(e))}export{pe as S,De as a,be as b,er as c,Ye as u};
