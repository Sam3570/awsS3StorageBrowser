import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
    
  },
    
 userAttributes: {
  preferredUsername: {
    dataType: "String",
    mutable: true,
    required: false,
}

  },
  groups: ['admin', 'auditor'],
    
});


