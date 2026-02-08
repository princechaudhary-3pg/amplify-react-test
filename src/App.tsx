import { generateClient } from "aws-amplify/api";
import { Schema } from "../amplify/data/resource";

const client = generateClient<Schema>();

async function sayHello() {
  const result = await client.queries.sayHello({ name: "world" });
  console.log({result});
}

function App() {

  return (
    <main>
      <button onClick={sayHello}>say hello</button>
    </main>
  );
}

export default App;
