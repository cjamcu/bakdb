import{j as s}from"./router-0uN5aety.js";import{B as o}from"./button-B296d654.js";import{L as t,I as n}from"./label-gcoyWlSz.js";import{C as m,a as c,b as d,d as l}from"./card-BUhaSKxx.js";import{p as u}from"./pocketbase-BwiBgDV-.js";import{t as p,v as x,q as h,F as j}from"./components-BFRM7CUx.js";import{a as f}from"./responses-BDgPukry.js";import"./utils-BAO6HRzK.js";import"./index-CJOOd4Gm.js";const S=()=>[{title:"Login"}],q=async({request:e})=>{const r=await e.formData(),a=r.get("username"),i=r.get("password");try{return await u.collection("users").authWithPassword(a,i),f("/")}catch{return{error:"Invalid username or password"}}};function A(){const e=p(),r=x();h();const a=r.state==="submitting";return s.jsx("div",{className:"flex items-center justify-center min-h-screen bg-background p-4",children:s.jsxs(m,{className:"w-full max-w-md",children:[s.jsx(c,{children:s.jsx(d,{className:"text-2xl font-bold text-center",children:"Login"})}),s.jsx(l,{children:s.jsxs(j,{method:"post",className:"space-y-4",children:[s.jsxs("div",{className:"space-y-2",children:[s.jsx(t,{htmlFor:"username",children:"Username"}),s.jsx(n,{id:"username",name:"username",type:"email",required:!0})]}),s.jsxs("div",{className:"space-y-2",children:[s.jsx(t,{htmlFor:"password",children:"Password"}),s.jsx(n,{id:"password",name:"password",type:"password",required:!0})]}),(e==null?void 0:e.error)&&s.jsx("p",{className:"text-sm text-red-500",children:e.error}),s.jsx(o,{type:"submit",className:"w-full",disabled:a,children:a?"Signing In...":"Sign In"})]})})]})})}export{q as clientAction,A as default,S as meta};
