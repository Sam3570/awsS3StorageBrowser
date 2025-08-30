import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
    
  },
    
userAttributes: {
    preferredUsername: {
      dataType: "String",   // 👈 missing in your case
      mutable: true,
      required: false,
      maxLength: 100        // you can choose any reasonable number
    }
  },
  groups: ['admin', 'auditor'],
    
});


