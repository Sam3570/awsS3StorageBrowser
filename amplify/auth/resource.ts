// import { defineAuth } from '@aws-amplify/backend';

// export const auth = defineAuth({
//   loginWith: {
//     email: true,
    
//   },
    
//  userAttributes: {
//     displayName: {   // 👈 custom attribute (you can name it whatever you want)
//       dataType: 'String',   // MUST be 'String' (capital S)
//       mutable: true,
//       required: false,
//     },
//   },
//   groups: ['admin', 'auditor'],
    
// });


import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: true, // login is still via email
  },
  userAttributes: {
    "custom:display_name": {
      dataType: "String",
      mutable: true,
      required: false,
      maxLen: 50,
    },
  },
  groups: ["admin", "auditor"],
});

