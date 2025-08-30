import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
    
  },
    
 userAttributes: {
    preferred_username: {
      dataType: "String",
      mutable: true,
      required: false,
    },
  },
  groups: ['admin', 'auditor'],
    
});


