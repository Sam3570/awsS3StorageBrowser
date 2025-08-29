import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'myS3Bucket',
  access: (allow) => ({
    'public/*': [
      allow.authenticated.to(['read']),               // normal users → read only
      allow.group('Admins').to(['read', 'write', 'delete']), // admins → full access
    ],
  }),
});
