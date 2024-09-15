import{r as o,j as s}from"./router-0uN5aety.js";import{B as e}from"./button-B296d654.js";import{p as f}from"./pocketbase-BwiBgDV-.js";import{p as y,o as x,O as N}from"./components-BFRM7CUx.js";import{c as t}from"./createLucideIcon-luw-QPq7.js";import"./utils-BAO6HRzK.js";/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=t("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=t("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=t("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=t("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);function C(){var m;const u=y(),[n,j]=o.useState(!1),[a,i]=o.useState(!1),l=((m=f.authStore.model)==null?void 0:m.email)||"";function r(){localStorage.removeItem("pocketbase_auth"),u("/login")}const c=(l==null?void 0:l.split("@")[0])||"User";return s.jsxs("div",{className:"min-h-screen bg-background fixed top-0 w-screen",children:[s.jsxs("nav",{className:"bg-background border-b fixed w-full top-0 z-10 ",children:[s.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:s.jsxs("div",{className:"flex justify-between h-16",children:[s.jsxs("div",{className:"flex items-center",children:[s.jsx("div",{className:"flex-shrink-0 flex items-center",children:s.jsx("span",{className:"text-2xl font-bold text-primary",children:"Bakdb"})}),s.jsx("div",{className:"hidden sm:ml-6 sm:flex sm:space-x-8",children:s.jsxs(x,{to:"/",className:"inline-flex items-center px-1 pt-1 text-sm font-medium text-foreground",children:[s.jsx(d,{className:"mr-2 h-4 w-4"}),"Tasks"]})})]}),s.jsx("div",{className:"hidden sm:ml-6 sm:flex sm:items-center",children:s.jsxs("div",{className:"relative",children:[s.jsxs(e,{variant:"ghost",onClick:()=>i(!a),className:"flex items-center",children:[s.jsx(p,{className:"mr-2 h-4 w-4"}),c]}),a&&s.jsx("div",{className:"absolute right-0 mt-2 w-48 bg-background border rounded-md shadow-lg",children:s.jsxs(e,{variant:"ghost",onClick:r,className:"w-full justify-start px-4 py-2",children:[s.jsx(h,{className:"mr-2 h-4 w-4"}),"Cerrar sesión"]})})]})}),s.jsx("div",{className:"flex items-center sm:hidden",children:s.jsx(e,{variant:"ghost",onClick:()=>j(!n),children:s.jsx(k,{className:"h-6 w-6"})})})]})}),n&&s.jsx("div",{className:"sm:hidden",children:s.jsxs("div",{className:"pt-2 pb-3 space-y-1",children:[s.jsxs(x,{to:"/",className:"block px-3 py-2 text-base font-medium text-foreground",children:[s.jsx(d,{className:"inline-block mr-2 h-4 w-4"}),"Tasks"]}),s.jsxs("div",{className:"px-3 py-2",children:[s.jsxs(e,{variant:"ghost",onClick:()=>i(!a),className:"flex items-center w-full justify-start",children:[s.jsx(p,{className:"mr-2 h-4 w-4"}),c]}),a&&s.jsxs(e,{variant:"ghost",onClick:r,className:"w-full justify-start pl-8 py-2",children:[s.jsx(h,{className:"mr-2 h-4 w-4"}),"Cerrar sesión"]})]})]})})]}),s.jsx("main",{className:"max-w-7xl mx-auto p-8 mt-12",children:s.jsx(N,{})})]})}export{C as default};
