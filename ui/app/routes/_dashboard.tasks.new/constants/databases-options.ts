const commonDatabaseFields: ConfigField[] = [
  { name: 'host', label: 'Host', type: 'text', placeholder: 'e.g. localhost', required: true },
  { name: 'database', label: 'Database Name', type: 'text', required: true },
  { name: 'user', label: 'User', type: 'text', required: true },
  { name: 'password', label: 'Password', type: 'password', required: true },
];

const databasesOptions: ConfigType[] = [
  {
    type: 'PostgreSQL',
    label: 'PostgreSQL',
    fields: [
      ...commonDatabaseFields,
      { name: 'port', label: 'Port', type: 'number', placeholder: '5432', required: true, defaultValue: '5432' },
    ]
  },
  {
    type: 'MySQL',
    label: 'MySQL',
    fields: [
      ...commonDatabaseFields,
      { name: 'port', label: 'Port', type: 'number', placeholder: '3306', required: true, defaultValue: '3306' },
    ]
  },
  {
    type: 'MariaDB',
    label: 'MariaDB',
    fields: [
      ...commonDatabaseFields,
      { name: 'port', label: 'Port', type: 'number', placeholder: '3306', required: true, defaultValue: '3306' },
    ]
  },
];

export { databasesOptions,  };