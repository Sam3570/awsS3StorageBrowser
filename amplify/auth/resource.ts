import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
    
  },
    
  userAttributes: {
    displayName: {
      mutable: true,
      required: false
    }
  },
  groups: ['admin', 'auditor'],
    
});


