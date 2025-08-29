export const storage = defineStorage({
  name: 'myS3Bucket',
  access: (allow) => ({
    'public/*': [
      allow.authenticated.to(['read']),
    ]
  })
});