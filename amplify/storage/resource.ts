import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'myS3Bucket',
  access: (allow) => ({
    'public/*': [
      allow.group('Users').to(['read']),                  // Users → read
      allow.group('Admins').to(['read', 'write', 'delete']) // Admins → full access
    ],
    'protected/{entity_id}/*': [
      allow.authenticated.to(['read']),
      allow.entity('identity').to(['read', 'write', 'delete'])
    ],
    'private/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete'])
    ]
  }),
});
