import { redirect } from "@remix-run/react";
import type { ClientLoaderFunctionArgs, MetaFunction } from "@remix-run/react";
import { requireAuth } from '~/lib/requireAuth';

type LoaderData = {
  data: Task[];
};

export const meta: MetaFunction = () => {
  return [
    { title: "Backup Tasks" },
  ];
};

export const clientLoader = async ({
  request,
}: ClientLoaderFunctionArgs): Promise<LoaderData | Response> => {
  await requireAuth();
  
  return redirect('/tasks');
};

export default function TasksIndexPage() {
  return <></>;
}