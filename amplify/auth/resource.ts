import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
    
  },

   userAttributes: {
    preferred_username: {
      dataType: AuthAttributeDataType.String, // 👈 use enum, not "String"
      mutable: true,
      required: false,
      maxLength: 100,
    },
  },
    
  groups: ['admin', 'auditor'],
    
});


