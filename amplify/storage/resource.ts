import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'myS3Bucket',
  access: (allow) => ({
    'public/*': [
      allow.authenticated.to(['read']),                      // all signed-in users → read only
      allow.group('Admins').to(['read', 'write', 'delete']), // Admins → full access
    ],
    'protected/{entity_id}/*': [
      allow.authenticated.to(['read']),                      // all signed-in users can read protected
      allow.entity('identity').to(['read', 'write', 'delete']) // owner (entity) can full access
    ],
    'private/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete']) // only owner has access
    ]
  }),
});
