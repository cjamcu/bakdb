import { useState } from "react";
import { Form, MetaFunction, redirect, replace, useActionData, useNavigation, useSubmit } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "~/components/ui/card";
import { pb } from "~/lib/pocketbase";



interface ActionData {
  error?: string;
}

export const meta: MetaFunction = () => {
  return [
    { title: "Login" },
  ];
};


export const clientAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {

    await pb.collection('users').authWithPassword(username, password);
     return replace('/');
  } catch (error) {
    return { error: "Invalid username or password" };
  }
};

export default function Login() {

  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const submit = useSubmit();

  const isSubmitting = navigation.state === "submitting";

  

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="post" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="email"
                required
               
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                
              />
            </div>
            {actionData?.error && (
              <p className="text-sm text-red-500">{actionData.error}</p>
            )}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}