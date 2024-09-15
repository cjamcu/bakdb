import React from 'react';
import { useLoaderData, Link, redirect } from "@remix-run/react";
import type { ClientLoaderFunctionArgs, MetaFunction } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { PlusCircle, Database, Cloud, Inbox } from "lucide-react";
import { pb } from "~/lib/pocketbase";
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
  
  const data = await pb.collection('tasks').getFullList<Task>();
  return { data };
};

export default function TasksIndexPage() {
  const { data } = useLoaderData<typeof clientLoader>();

  const getStatusVariant = (status: Task['status']): "default" | "secondary" | "destructive" => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Paused':
        return 'secondary';
      case 'Error':
        return 'destructive';
      default:
        return 'default';
    }
  };

  if (data.length === 0) {
    return (
      <div className="container mx-auto p-8 flex flex-col items-center justify-center min-h-screen">
        <Inbox className="h-24 w-24 text-gray-400 mb-6" />
        <h2 className="text-3xl font-bold text-center mb-4">No backup tasks yet</h2>
        <p className="text-xl text-gray-600 text-center mb-8">Start by creating your first backup task</p>
        <Button asChild>
          <Link to='/tasks/new'>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Backup Task
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div >
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Backup Tasks</h2>
        <Button className="mb-4" asChild>
          <Link to='/tasks/new'>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Backup Task
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((task: Task) => (
          <Link key={task.id} to={`/tasks/${task.id}`} className="block" prefetch="intent">
            <Card className="w-full h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-semibold">{task.name}</CardTitle>
                  <Badge variant={getStatusVariant(task.status)}>
                    {task.status}
                  </Badge>
                </div>
                <CardDescription className="flex items-center mt-1 space-x-2">
                  <Database className="mr-2 h-4 w-4" />
                  {task.dbConfig.type}
                
                  {task.storageConfigs.map((config, index) => (
                <span key={index} className="flex items-center">
                  <Cloud className="mr-2 h-4 w-4" />
                  {config.type}
                </span>
              ))}
              
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Last backup</span>
                  <span className="text-sm font-medium">  {task.lastBackup ? new Date(task.lastBackup).toLocaleString() : 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Next backup</span>
                  <span className="text-sm font-medium"> {task.status === 'Active' ? new Date(task.nextBackup).toLocaleString() : 'N/A'}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}