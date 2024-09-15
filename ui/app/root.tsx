import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import { Skeleton } from "~/components/ui/skeleton"
import { Loader2 } from "lucide-react";
import { pb } from "./lib/pocketbase";
import { redirect, } from "@remix-run/react";
import { Toaster } from "./components/ui/toaster";
 
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="w-screen overflow-x-hidden">
        {children}
        <Toaster />

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function HydrateFallback() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
    <p className="mt-2 text-sm text-muted-foreground">Cargando...</p>
  </div>
  );

}
