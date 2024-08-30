import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
    name: 'tech-summit-2024-bucket',
    access: (allow) => ({
        'picture-submissions/*': [
          allow.authenticated.to(['read','write']),
          allow.guest.to(['read', 'write'])
        ],
      })
    });