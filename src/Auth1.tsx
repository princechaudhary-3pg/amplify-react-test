import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import { generateClient } from "aws-amplify/api";
import { Schema } from "../amplify/data/resource";

const client = generateClient<Schema>();

async function sayHello() {
  const result = await client.queries.sayHello({ name: "world" });
  console.log({ result });
}

export function Auth() {

  return <div>
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user?.username}</h1>
          <button onClick={sayHello}>say hello</button>
          <br />  
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  </div>;
};