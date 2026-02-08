import type { Schema } from "../../data/resource";
import { env } from "$amplify/env/sayHello";

type handlerType = Schema["sayHello"]["functionHandler"];

export const handler: handlerType = async (event) => {
  const region = env.REGION
  const tableName = env.TABLE_NAME
  const { name } = event.arguments;
  return `Hello ${name},  my first function is ready! tableName: ${tableName}, region: ${region}`;
};