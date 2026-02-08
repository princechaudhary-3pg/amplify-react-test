import type { Schema } from "../../data/resource";
import { TABLE_NAME } from "./resource";
// import { env } from "$amplify/env/sayHello";

type handlerType = Schema["sayHello"]["functionHandler"];
const env = { AWS_REGION: 'us-east-5', TABLE_NAME }
export const handler: handlerType = async (event) => {
  const region = env.AWS_REGION
  const tableName = env.TABLE_NAME
  const { name } = event.arguments;
  return `Hello ${name},  my first function is ready! table name: ${tableName}, region: ${region}`;
};