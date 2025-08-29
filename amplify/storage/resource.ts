import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'myS3Bucket',
  access: (allow) => ({
    'media/*': [
      allow.groups(['auditor', 'admin']).to(['read', 'write'])
    ]
  })
});


