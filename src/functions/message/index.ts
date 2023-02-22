import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export const message =  {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'message',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};

export const getData =  {
  handler: `${handlerPath(__dirname)}/handler.getProfessors`,
  events: [
    {
      http: {
        method: 'get',
        path: 'professors',
      },
    },
  ],
};