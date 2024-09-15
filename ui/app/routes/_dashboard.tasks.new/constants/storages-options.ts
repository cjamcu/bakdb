

const commonStorageFields: ConfigField[] = [
  { name: 'key', label: 'Access Key', type: 'text', required: true },
  { name: 'secret', label: 'Secret Key', type: 'password', required: true },
  { name: 'bucket', label: 'Bucket Name', type: 'text', required: true },
];

const storagesOptions: ConfigType[] = [
  {
    type: 'S3',
    label: 'AWS S3',
    fields: [
      ...commonStorageFields,
      {
        name: 'region', label: 'Region', type: 'select', required: true, options: [
          { value: 'us-east-1', label: 'us-east-1' },
          { value: 'us-west-2', label: 'us-west-2' },
        ]
      }
    ],
  },
  {
    type: 'R2',
    label: 'Cloudflare R2',
    fields: [
      ...commonStorageFields,
      { name: 'accountId', label: 'Account ID', type: 'text', required: true },
      { name: 'region', label: 'Region', type: 'text', required: true, defaultValue: 'auto',hidden:false },
      { name: 'endpoint', label: 'Endpoint', type: 'text', hidden: true, computed: (config) => `https://${config.accountId}.r2.cloudflarestorage.com` },
      { name: 'path', label: 'Path', type: 'text', required: true, },
    ],
  },
  {
    type: 'B2',
    label: 'Backblaze B2',
    fields: [
      ...commonStorageFields,
      { name: 'region', label: 'Region', type: 'text', placeholder: 'us-east-005', required: true, defaultValue: 'us-east-005' },
      { name: 'endpoint', label: 'Endpoint', type: 'text', hidden: true, computed: (config) => `https://s3.${config.region}.backblazeb2.com` },
    ],
  },
  {
    type: 'Spaces',
    label: 'DigitalOcean Spaces',
    fields: [
      ...commonStorageFields,
      {
        name: 'region', label: 'Region', type: 'select', required: true, options: [
          { value: 'nyc3', label: 'nyc3' },
          { value: 'ams3', label: 'ams3' },
          { value: 'sgp1', label: 'sgp1' },
        ]
      },
      { name: 'endpoint', label: 'Endpoint', type: 'text', hidden: true, computed: (config) => `https://${config.region}.digitaloceanspaces.com` },
    ],
  },
  {
    type: 'Local',
    label: 'Local',
    fields: [
      { name: 'path', label: 'Local Path', type: 'text', placeholder: '/path/to/backups', required: true },
    ],
  },
];

export { storagesOptions };