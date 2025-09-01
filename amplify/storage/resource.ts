// import { defineStorage } from '@aws-amplify/backend';

// export const storage = defineStorage({
//   name: 'myS3Bucket',
//   access: (allow) => ({
//     'media/*': [
//       allow.groups(['auditor', 'admin']).to(['read', 'write'])
//     ]
//   })
// });



import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'myS3Bucket',
  access: (allow) => ({
    'media/*': [
      allow.groups(['auditor']).to(['read']),          // auditors can only read
      allow.groups(['admin']).to(['read', 'write','delete']),  // admins can read + write
    ],
  }),
});

