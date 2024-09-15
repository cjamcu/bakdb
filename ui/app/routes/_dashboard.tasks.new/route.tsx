import React, { useState, useEffect } from 'react';
import { useNavigate, useSubmit, Form, useActionData, useNavigation, redirect } from "@remix-run/react";
import type { ClientActionFunctionArgs, ClientLoaderFunctionArgs, MetaFunction } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ArrowLeft, Plus, Trash2, Settings, Database, HardDrive } from 'lucide-react';
import { requireAuth } from '~/lib/requireAuth';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { databasesOptions } from './constants/databases-options';
import { storagesOptions } from './constants/storages-options';
import { useToast } from '~/hooks/use-toast';
import { baseApiUrl, pb } from '~/lib/pocketbase';


export const meta: MetaFunction = () => {
  return [{ title: "Create New Backup Task" }];
};

export const clientLoader = async ({
  params,
  request,
}: ClientLoaderFunctionArgs): Promise<any> => {
  await requireAuth();
  return {
    data: null
  } 
}
export const clientAction = async ({ request }: ClientActionFunctionArgs) => {

  const formData = await request.formData();
  const taskData = Object.fromEntries(formData);

  try {
    const parsedTaskData = {
      ...taskData,
      dbConfig: JSON.parse(taskData.dbConfig as string),
      storageConfigs: JSON.parse(taskData.storageConfigs as string),
      retentionDays: parseInt(taskData.retentionDays as string, 10)
    };

    const response = await fetch(`${baseApiUrl}tasks/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedTaskData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error };
    }
    return redirect('/');
  } catch (error) {

    return { error: 'An unexpected error occurred' };
  }
};

export default function NewBackupTaskForm() {
  const navigate = useNavigate();
  const submit = useSubmit();
  const { toast } = useToast();
  const actionData = useActionData<typeof clientAction>();
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [dbType, setDbType] = useState('');
  const [dbConfig, setDbConfig] = useState<Record<string, string>>({});
  const [selectedStorageConfigs, setSelectedStorageConfigs] = useState<Array<{ type: string; config: Record<string, string> }>>([{ type: '', config: {} }]);
  const [cron, setCron] = useState('0 0 * * *');
  const [retentionDays, setRetentionDays] = useState(7);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isLoading = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: actionData.error,
      });
    }
  }, [actionData, toast]);

  const steps = [
    { name: 'General', icon: Settings },
    { name: 'Database', icon: Database },
    { name: 'Storage', icon: HardDrive }
  ];

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!name.trim()) newErrors.name = "Task name is required";
      if (!cron.trim()) newErrors.cron = "Cron schedule is required";
      if (!retentionDays) newErrors.retentionDays = "Retention period is required";
    } else if (step === 1) {
      if (!dbType) newErrors.dbType = "Database type is required";
      databasesOptions.find(db => db.type === dbType)?.fields.forEach(field => {
        if (field.required && !dbConfig[field.name]) {
          newErrors[`db_${field.name}`] = `${field.label} is required`;
        }
      });
    } else if (step === 2) {
      selectedStorageConfigs.forEach((config, index) => {
        if (!config.type) newErrors[`storage_${index}_type`] = "Storage type is required";
        storagesOptions.find(s => s.type === config.type)?.fields.forEach(field => {
          if (field.required && !config.config[field.name]) {
            newErrors[`storage_${index}_${field.name}`] = `${field.label} is required`;
          }
        });
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep(steps.length - 1)) return;


    const formData = new FormData();
    formData.append('name', name);
    formData.append('dbConfig', JSON.stringify({ ...dbConfig, type: dbType, port: parseInt(dbConfig.port, 10) }));
    formData.append('storageConfigs', JSON.stringify(selectedStorageConfigs.map(({ type, config }) => ({ type, ...config }))));
    formData.append('cron', cron);
    formData.append('retentionDays', retentionDays.toString());
    formData.append('user', pb.authStore.model?.id);

    submit(formData, { method: 'post', action: '/tasks/new' });
  };

  const handleDbConfigChange = (e: React.ChangeEvent<HTMLInputElement> | { name: string; value: string }) => {
    const { name, value } = 'target' in e ? e.target : e;
    setDbConfig(prev => {
      const newConfig = { ...prev, [name]: value };
      const selectedDb = databasesOptions.find(db => db.type === dbType);
      if (selectedDb) {
        selectedDb.fields.forEach(field => {
          if (field.computed) {
            newConfig[field.name] = field.computed(newConfig);
          }
        });
      }
      return newConfig;
    });
  };

  const handleStorageConfigChange = (index: number, field: string, value: string) => {
    setSelectedStorageConfigs(prev => {
      const newConfigs = [...prev];
      newConfigs[index].config[field] = value;
      const selectedStorage = storagesOptions.find(s => s.type === newConfigs[index].type);
      if (selectedStorage) {
        selectedStorage.fields.forEach(configField => {
          if (configField.computed) {
            newConfigs[index].config[configField.name] = configField.computed(newConfigs[index].config);
          }
        });
      }
      return newConfigs;
    });
  };

  const addStorageConfig = () => {
    setSelectedStorageConfigs(prev => [...prev, { type: '', config: {} }]);
  };

  const removeStorageConfig = (index: number) => {
    setSelectedStorageConfigs(prev => prev.filter((_, i) => i !== index));
  };

  return (

    <div className="mx-auto">
      <Button variant='ghost' onClick={() => navigate('/')} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Tasks
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create New Backup Task</CardTitle>
        </CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between mb-8">
              {steps.map((step, index) => (
                <div key={step.name} className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${index <= currentStep ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <span className={`mt-2 text-sm ${index <= currentStep ? 'text-primary' : 'text-gray-500'}`}>{step.name}</span>
                  {index < steps.length - 1 && (
                    <div className={`hidden sm:block w-24 h-0.5 mt-6 ${index < currentStep ? 'bg-primary' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>

            {currentStep === 0 && (
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <Label htmlFor="taskName">Task Name</Label>
                  <Input
                    type="text"
                    id="taskName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Daily Production DB Backup"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div className="flex-1 min-w-[200px]">
                  <Label htmlFor="cron">Cron Schedule</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Input
                          type="text"
                          id="cron"
                          value={cron}
                          onChange={(e) => setCron(e.target.value)}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enter a cron expression (e.g., "0 0 * * *" for daily at midnight)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {errors.cron && <p className="text-red-500 text-sm mt-1">{errors.cron}</p>}
                </div>
                <div className="flex-1 min-w-[200px]">
                  <Label htmlFor="retention">Retention Period (days)</Label>
                  <Input
                    type="number"
                    id="retention"
                    value={retentionDays}
                    onChange={(e) => setRetentionDays(Number(e.target.value))}
                    placeholder="30"
                  />
                  {errors.retentionDays && <p className="text-red-500 text-sm mt-1">{errors.retentionDays}</p>}
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <Select value={dbType} onValueChange={(value) => {
                  setDbType(value);
                  setDbConfig({});
                }}>
                  <SelectTrigger id="dbType">
                    <SelectValue placeholder="Select database type" />
                  </SelectTrigger>
                  <SelectContent>
                    {databasesOptions.map((db) => (
                      <SelectItem key={db.type} value={db.type}>{db.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.dbType && <p className="text-red-500 text-sm">{errors.dbType}</p>}

                {dbType && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {databasesOptions.find(db => db.type === dbType)?.fields.map((field) => (
                      !field.hidden && (
                        <div key={field.name} className="space-y-2">
                          <Label htmlFor={field.name}>{field.label}</Label>
                          {field.type === 'select' ? (
                            <Select
                              value={dbConfig[field.name] ?? ''}
                              onValueChange={(value) => handleDbConfigChange({ name: field.name, value })}
                            >
                              <SelectTrigger id={field.name}>
                                <SelectValue placeholder={`Select ${field.label}`} />
                              </SelectTrigger>
                              <SelectContent>
                                {field.options?.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input
                              type={field.type}
                              id={field.name}
                              name={field.name}
                              value={dbConfig[field.name] ?? ''}
                              onChange={handleDbConfigChange}
                              placeholder={field.placeholder}
                              disabled={!!field.computed}
                            />
                          )}
                          {errors[`db_${field.name}`] && <p className="text-red-500 text-sm">{errors[`db_${field.name}`]}</p>}
                        </div>
                      )
                    ))}
                  </div>
                )}
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                {selectedStorageConfigs.map((storageConfig, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Storage Configuration {index + 1}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeStorageConfig(index)}
                        disabled={selectedStorageConfigs.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <Select
                        value={storageConfig.type}
                        onValueChange={(value) => {
                          setSelectedStorageConfigs(prev => {
                            const newConfigs = [...prev];
                            newConfigs[index] = { type: value, config: {} };
                            return newConfigs;
                          });
                        }}
                      >
                        <SelectTrigger id={`storageType-${index}`}>
                          <SelectValue placeholder="Select storage type" />
                        </SelectTrigger>
                        <SelectContent>
                          {storagesOptions.map((storage) => (
                            <SelectItem key={storage.type} value={storage.type}>{storage.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors[`storage_${index}_type`] && <p className="text-red-500 text-sm mt-1">{errors[`storage_${index}_type`]}</p>}

                      {storageConfig.type && (
                        <div className="grid gap-4 sm:grid-cols-2 mt-4">
                          {storagesOptions.find(s => s.type === storageConfig.type)?.fields.map((field) => (
                            !field.hidden && (
                              <div key={field.name} className="space-y-2">
                                <Label htmlFor={`${field.name}-${index}`}>{field.label}</Label>
                                {field.type === 'select' ? (
                                  <Select
                                    value={storageConfig.config[field.name] ?? ''}
                                    onValueChange={(value) => handleStorageConfigChange(index, field.name, value)}
                                  >
                                    <SelectTrigger id={`${field.name}-${index}`}>
                                      <SelectValue placeholder={`Select ${field.label}`} />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {field.options?.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                ) : (
                                  <Input
                                    type={field.type}
                                    id={`${field.name}-${index}`}
                                    value={storageConfig.config[field.name] ?? ''}
                                    onChange={(e) => handleStorageConfigChange(index, field.name, e.target.value)}
                                    placeholder={field.placeholder}
                                    disabled={!!field.computed}
                                  />
                                )}
                                {errors[`storage_${index}_${field.name}`] && <p className="text-red-500 text-sm">{errors[`storage_${index}_${field.name}`]}</p>}
                              </div>
                            )
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}

                <Button variant='outline' onClick={addStorageConfig} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Storage Configuration
                </Button>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <Button type="button" onClick={handlePrevious} disabled={currentStep === 0 || isLoading}>
                Previous
              </Button>
              {currentStep === steps.length - 1 ? (
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Backup Task"}
                </Button>
              ) : (
                <Button type="button" onClick={handleNext} disabled={isLoading}>
                  Next
                </Button>
              )}
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>

  );
}

