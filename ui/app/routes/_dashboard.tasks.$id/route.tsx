import { redirect, useLoaderData, useNavigate, useSubmit, Link } from "@remix-run/react";
import type { ClientLoaderFunctionArgs, ClientActionFunctionArgs, MetaFunction } from "@remix-run/react";
import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { ArrowLeft, Database, Cloud, Edit, Pause, Play, Trash2, Download, ChevronLeft, ChevronRight, AlertCircle, XCircle, Settings } from "lucide-react";
import { pb } from "~/lib/pocketbase";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from "~/components/ui/alert-dialog";
import { requireAuth } from "~/lib/requireAuth";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import FileSaver from 'file-saver';

const { saveAs } = FileSaver;

type LoaderData = {
  task: Task;
  backups: {
    items: Backup[];
    totalPages: number;
  };
};


export const meta: MetaFunction = () => {
  return [
    { title: "Backup Task Details" },
  ];
};


export const clientLoader = async ({
  params,
  request,
}: ClientLoaderFunctionArgs): Promise<LoaderData> => {
  await requireAuth();
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const perPage = 10;

  const taskId = params.id as string;

  var task = null


  const backupHistoryResult = await pb.collection('backups').getList<Backup>(page, perPage, {
    filter: `task = "${taskId}"`,
    sort: '-created',
    expand: 'task',
  });

  if (backupHistoryResult.items.length > 0) {
    task = backupHistoryResult.items[0].expand?.task;
  } else {
    task = await pb.collection('tasks').getOne<Task>(taskId);
  }
  return {
    task: task,
    backups: {
      items: backupHistoryResult.items,
      totalPages: backupHistoryResult.totalPages
    }
  };
};

export const clientAction = async ({ params, request }: ClientActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "deleteTask") {
    await pb.collection('tasks').delete(params.id as string);
    return redirect('/');
  } else if (intent === "deleteBackup") {
    const backupId = formData.get("backupId") as string;
    await pb.collection('backups').delete(backupId);
    return { success: true, message: "Backup deleted successfully" };
  } else if (intent === "toggleTaskStatus") {
    const taskId = params.id as string;
    const currentStatus = formData.get("currentStatus") as Task['status'];
    const newStatus = currentStatus === 'Active' ? 'Paused' : 'Active';
    
    await pb.collection('tasks').update(taskId, { status: newStatus });
    return { success: true, message: `Task ${newStatus.toLowerCase()} successfully` };
  } else if (intent === "updateTaskSettings") {
    const taskId = params.id as string;
    const cron = formData.get("cron") as string;
    
    await pb.collection('tasks').update(taskId, { cron });
    return { success: true, message: "Task settings updated successfully" };
  } else if (intent === "downloadBackup") {
    const backupId = formData.get("backupId") as string;
    const backupFilename = formData.get("backupFilename") as string;
    
    const response = await fetch(`${import.meta.env.VITE_POCKETBASE_URL}/api/backups/${backupId}/download`, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || 'Failed to download backup' };
    }

    const blob = await response.blob();
    const fileName = backupFilename || 'backup.sql';

    saveAs(blob, fileName);

    return { success: true, message: "Backup downloaded successfully" };
  } else if (intent === "runBackupNow") {
    const taskId = params.id as string;
    const response = await fetch(`${import.meta.env.VITE_POCKETBASE_URL}/api/tasks/${taskId}/run`, {
      method: 'POST',
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || 'Failed to run backup' };
    }

    return { success: true, message: "Backup started successfully" };
  }

  return { success: false };
};

export default function TaskDetailPage() {
  const navigate = useNavigate();
  const submit = useSubmit();

  const { task, backups } = useLoaderData<typeof clientLoader>();
  const [currentPage, setCurrentPage] = useState(1);
  const [errorBackup, setErrorBackup] = useState<Backup | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [cronSetting, setCronSetting] = useState(task.cron);

  const getStatusVariant = (status: Task['status']): "default" | "secondary" | "destructive" => {
    switch (status) {
      case 'Active': return 'default';
      case 'Paused': return 'secondary';
      case 'Error': return 'destructive';
      default: return 'default';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  const formatDuration = (seconds: number): string => {

    if (seconds < 60) return `${seconds} sec`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min`;
    return `${Math.floor(seconds / 3600)} hour${seconds >= 7200 ? 's' : ''}`;
  };

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    navigate(`?page=${newPage}`);
  };

  const handleDeleteTask = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      submit(
        { intent: "deleteTask" },
        { method: "post", action: `/tasks/${task.id}`, replace: true }
      );
  
    }
  };

  const handleDeleteBackup = async (backupId: string) => {
    if (window.confirm("Are you sure you want to delete this backup?")) {
      submit(
        { intent: "deleteBackup", backupId },
        { method: "post", action: `/tasks/${task.id}` }
      );
    
    }
  };

  const showBackupError = (backup: Backup) => {
    setErrorBackup(backup);
  };

  const handleToggleTaskStatus = async () => {
    submit(
      { intent: "toggleTaskStatus", currentStatus: task.status },
      { method: "post", action: `/tasks/${task.id}` }
    );
  };

  const handleUpdateSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(
      { intent: "updateTaskSettings", cron: cronSetting },
      { method: "post", action: `/tasks/${task.id}` }
    );
    setIsSettingsOpen(false);
  };

  const handleDownloadBackup = (backup: Backup) => {
    submit(
      { 
        intent: "downloadBackup", 
        backupId: backup.id,
        backupFilename: backup.filename
      },
      { method: "post", action: `/tasks/${task.id}` }
    );
  };




  if (!task) {
    return (
      <div className="container mx-auto p-8 flex flex-col items-center justify-center min-h-screen">
        <XCircle className="h-24 w-24 text-gray-400 mb-6" />
        <h2 className="text-3xl font-bold text-center mb-4">Task not found</h2>
        <p className="text-xl text-gray-600 text-center mb-8">The backup task you're looking for doesn't exist or has been deleted.</p>
        <Button asChild>
          <Link to='/'>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tasks
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Button className="mb-4" variant="ghost" onClick={() => navigate('/')}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Tasks
      </Button>

      <Card className="w-full">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <CardTitle className="text-2xl font-bold">{task.name}</CardTitle>
            <Badge variant={getStatusVariant(task.status)}>{task.status}</Badge>
            <div className="flex items-center mt-2 space-x-4">

              <span className="flex items-center">
                <Database className="mr-2 h-4 w-4" />
                {task.dbConfig.type}
              </span>
              {task.storageConfigs.map((config, index) => (
                <span key={index} className="flex items-center">
                  <Cloud className="mr-2 h-4 w-4" />
                  {config.type}
                </span>
              ))}
            </div>
          </div>
          <div className="flex space-x-2">
            <Button  size="sm" onClick={handleToggleTaskStatus}>
              {task.status === 'Active' ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
              {task.status === 'Active' ? 'Pause' : 'Resume'}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsSettingsOpen(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDeleteTask}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </CardHeader>

        <CardContent className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-secondary/20 rounded-lg ">
            <div>
              <h3 className="font-semibold">Schedule</h3>
              <p>{task.cron || 'Not configured'}</p>
            </div>
            <div>
              <h3 className="font-semibold">Last Backup</h3>
              <p>{task.lastBackup ? formatDate(task.lastBackup) : 'Not performed'}</p>
            </div>
            <div>
              <h3 className="font-semibold">Next Backup</h3>
              <p>
                {task.status === 'Active'
                  ? (task.nextBackup ? formatDate(task.nextBackup) : 'Not scheduled')
                  : 'Paused'}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Retention Policy</h3>
              <p>{task.retentionDays ? `${task.retentionDays} days` : 'Not configured'}</p>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-bold mb-4">Backup History</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>End Time</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {backups.items.length > 0 ? (
                    backups.items.map((backup) => (
                      <TableRow key={backup.id}>
                        <TableCell>
                          <Badge variant={backup.status === 'Completed' ? 'default' : 'destructive'}>
                            {backup.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{backup.size ? formatSize(backup.size) : 'N/A'}</TableCell>
                        <TableCell>{backup.duration ? formatDuration(Number(backup.duration.toFixed(0))) : 'N/A'}</TableCell>
                        <TableCell>{formatDate(backup.startTime)}</TableCell>
                        <TableCell>{backup.endTime ? formatDate(backup.endTime) : 'In progress'}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {backup.status === 'Failed' && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => showBackupError(backup)}
                              >
                                <AlertCircle className="h-4 w-4 mr-2" />
                                View Error
                              </Button>
                            )}
                            {
                              backup.status === 'Completed' && (
                                <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDownloadBackup(backup)}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                  Download
                                </Button>
                              )
                            }
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteBackup(backup.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">No backups recorded</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-center items-center mt-4">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                variant="outline"
                size="sm"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <span className="mx-4">
                Page {currentPage} of {backups.totalPages}
              </span>
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === backups.totalPages}
                variant="outline"
                size="sm"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

        </CardContent>
      </Card>

      <AlertDialog open={!!errorBackup} onOpenChange={() => setErrorBackup(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Backup Error</AlertDialogTitle>
            <AlertDialogDescription>
              {errorBackup?.error || 'The backup could not be completed.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Task</AlertDialogTitle>
          </AlertDialogHeader>
          <form onSubmit={handleUpdateSettings}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cron">Cron Schedule</Label>
                <Input
                  id="cron"
                  value={cronSetting}
                  onChange={(e) => setCronSetting(e.target.value)}
                  placeholder="0 0 * * *"
                />
              </div>
              {/* Aquí puedes agregar más campos de edición en el futuro */}
            </div>
            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
              <Button type="submit">Save Changes</Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}