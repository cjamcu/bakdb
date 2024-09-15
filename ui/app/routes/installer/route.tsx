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
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;

  if (password !== passwordConfirm) {
    return { error: "Passwords do not match" };
  }

  try {
    await pb.admins.create({
      email,
      password,
      passwordConfirm,
    });

    await pb.collection('users').create({
      email,
      password,
      passwordConfirm,
    });

    await  pb.collection('users').authWithPassword(email, password);
    return replace('/');
  } catch (error) {
    console.log(error);
    return { error: "Error creating admin account" };
  }
};

export default function Installer() {

  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();


  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create Admin Account</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-4">Create your first admin account to continue</p>
          <Form method="post" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
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
                minLength={10}
              />
              <p className="text-sm text-gray-500">Minimum 10 characters.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="passwordConfirm">Confirm Password</Label>
              <Input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                required
                minLength={10}
              />
            </div>
            {actionData?.error && (
              <p className="text-sm text-red-500">{actionData.error}</p>
            )}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : "Create And Login"}
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}