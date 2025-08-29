import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
    
  },
  groups: ['admin', 'auditor'],
    
  userAttributes: {
    preferredUsername: {
      mutable: true,
      required: false
    }
  }

});


