import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'myS3Bucket',
  access: (allow) => ({
    '/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read']),
    ],
  })
});