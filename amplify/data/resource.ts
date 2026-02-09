import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { sayHello } from "../functions/hello/resource";

const schema = a.schema({
  sayHello: a
    .query()
    .arguments({ name: a.string() })
    .returns(a.string())
    .handler(a.handler.function(sayHello))
    .authorization((allow) => [allow.publicApiKey()]),
  drivers: a
    .model({
      name: a.string().required(),
      team: a.string(),
      number: a.integer()
    })
    .authorization((allow) => [allow.publicApiKey()]),
  wrestlers: a
    .model({
      name: a.string().required(),
      finisher: a.string()
    })
    .authorization((allow) => [
      allow.owner(),
      allow.group('admins').to(['read'])
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
