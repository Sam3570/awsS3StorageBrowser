import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
    
  },
    
  userAttributes: {
    preferredUsername: {
      dataType: 'string',  // ✅ required
      mutable: true,
      required: false,
    },
  },
  groups: ['admin', 'auditor'],
    
});


