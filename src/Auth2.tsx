import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import { generateClient } from "aws-amplify/api";
import { Schema } from "../amplify/data/resource";
import { useEffect, useState } from "react";
import { fetchUserAttributes } from "aws-amplify/auth";
import { Wrestlers } from "./components/Wrestlers";

const client = generateClient<Schema>();

async function sayHello() {
  const result = await client.queries.sayHello({ name: "world" });
  console.log({ result });
}

export function Auth() {

  return <div>
    <Authenticator signUpAttributes={['nickname']}>
      {({ signOut }) => (
        <main>
          <UserDetails />
          <button onClick={sayHello}>say hello</button>
          <br />
          <button onClick={signOut}>Sign out</button>
          <Wrestlers />
        </main>
      )}
    </Authenticator>
  </div>;
};

function UserDetails() {
  const [nickName, setNickName] = useState<string>();

  useEffect(() => {
    async function getUserData() {
      const userData = await fetchUserAttributes()
      setNickName(userData.nickname);
    }
    getUserData();
  }, [])
  return <h1>Hello {nickName}</h1>
}