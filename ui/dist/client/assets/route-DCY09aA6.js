import{j as s}from"./router-0uN5aety.js";import{B as d}from"./button-B296d654.js";import{L as o,I as n}from"./label-gcoyWlSz.js";import{C as l,a as p,b as u,d as x}from"./card-BUhaSKxx.js";import{p as c}from"./pocketbase-BwiBgDV-.js";import{t as h,v as f,F as w}from"./components-BFRM7CUx.js";import{a as j}from"./responses-BDgPukry.js";import"./utils-BAO6HRzK.js";import"./index-CJOOd4Gm.js";const P=()=>[{title:"Login"}],q=async({request:r})=>{const a=await r.formData(),e=a.get("email"),t=a.get("password"),i=a.get("passwordConfirm");if(t!==i)return{error:"Passwords do not match"};try{return await c.admins.create({email:e,password:t,passwordConfirm:i}),await c.collection("users").create({email:e,password:t,passwordConfirm:i}),await c.collection("users").authWithPassword(e,t),j("/")}catch(m){return console.log(m),{error:"Error creating admin account"}}};function E(){const r=h(),e=f().state==="submitting";return s.jsx("div",{className:"flex items-center justify-center min-h-screen bg-background p-4",children:s.jsxs(l,{className:"w-full max-w-md",children:[s.jsx(p,{children:s.jsx(u,{className:"text-2xl font-bold text-center",children:"Create Admin Account"})}),s.jsxs(x,{children:[s.jsx("p",{className:"text-center mb-4",children:"Create your first admin account to continue"}),s.jsxs(w,{method:"post",className:"space-y-4",children:[s.jsxs("div",{className:"space-y-2",children:[s.jsx(o,{htmlFor:"email",children:"Email"}),s.jsx(n,{id:"email",name:"email",type:"email",required:!0})]}),s.jsxs("div",{className:"space-y-2",children:[s.jsx(o,{htmlFor:"password",children:"Password"}),s.jsx(n,{id:"password",name:"password",type:"password",required:!0,minLength:10}),s.jsx("p",{className:"text-sm text-gray-500",children:"Minimum 10 characters."})]}),s.jsxs("div",{className:"space-y-2",children:[s.jsx(o,{htmlFor:"passwordConfirm",children:"Confirm Password"}),s.jsx(n,{id:"passwordConfirm",name:"passwordConfirm",type:"password",required:!0,minLength:10})]}),(r==null?void 0:r.error)&&s.jsx("p",{className:"text-sm text-red-500",children:r.error}),s.jsx(d,{type:"submit",className:"w-full",disabled:e,children:e?"Creating Account...":"Create And Login"})]})]})]})})}export{q as clientAction,E as default,P as meta};
