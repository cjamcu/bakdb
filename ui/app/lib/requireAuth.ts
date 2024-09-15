import { redirect } from "@remix-run/react";
import { pb } from "~/lib/pocketbase";

export async function requireAuth() {
 try{
  await pb.collection('users').authRefresh();
 }catch(e){
  localStorage.removeItem('pocketbase_auth');
  throw redirect('/login');
 }
}