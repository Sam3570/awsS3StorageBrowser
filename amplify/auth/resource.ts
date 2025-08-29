import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
    
  },
  groups: ['admin', 'auditor'],
    
  userAttributes: {
    preferredUsername: {
      mutable: false,
      required: true
    }
  }

});


