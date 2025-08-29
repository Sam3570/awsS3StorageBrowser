import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'myS3Bucket',
  access: (allow) => ({
    '/*': [
      allow.authenticated.to(['read','write']),
    ],
  })
});