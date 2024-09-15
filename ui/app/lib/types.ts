interface Task {
    id: string;
    name: string;
    provider: string;
    status: 'Active' | 'Paused' | 'Error';
    lastBackup: string;
    nextBackup: string;
    dbConfig: DbConfig;
    storageConfigs: StorageConfig[];
    cron: string;
    retentionDays: number;
    expand: {
        backups: Backup[];
    }
  }

  interface Backup{
    id: string;
    startTime: string;
    endTime: string;
    duration: number;
    status: 'Completed' | 'Failed' | 'In Progress' | 'Failed';
    size: number;
    error: string;
    expand: {
        task: Task;
    }
    filename: string;
  
  }
  
  interface DbConfig {
    name: string;
    host: string;
    port: number;
    user: string;
    password: string;
    type: string;
  }

  interface StorageConfig {
    type: string;
    bucket: string;
    key: string;
    secret: string;
    path: string;
  }
  
  

  interface ConfigField {
    name: string;
    label: string;
    type: 'text' | 'number' | 'password' | 'select';
    placeholder?: string;
    required?: boolean;
    hidden?: boolean;
    computed?: (config: Record<string, string>) => string;
    options?: Array<{ value: string; label: string }>;
    defaultValue?: string;
  }
  
  interface ConfigType {
    type: string;
    label: string;
    fields: Array<ConfigField>;
  }