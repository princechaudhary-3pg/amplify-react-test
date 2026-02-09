import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

type WrestlersType = Schema['wrestlers']['type']

export function Wrestlers() {

  const WrestlersClient = generateClient<Schema>().models.wrestlers
  const [wrestlers, setWrestlers] = useState<Array<WrestlersType>>([])

  useEffect(() => {
    WrestlersClient.observeQuery({ authMode: "userPool" }).subscribe({
      next: (data) => setWrestlers([...data.items])
    });
  }, []);

  function addWrestler() {
    const name = globalThis.prompt("Wrestler's Name")!;
    const finisher = globalThis.prompt("Finishing Move") || "";

    WrestlersClient.create({
      name,
      finisher
    }, { authMode: "userPool" })
  }

  return <main>
    <button onClick={addWrestler}>Add WWE Wrestler</button>
    <h3>All WWE Wrestlers:</h3>
    <ul>
      {wrestlers.map((wrestler) => (
        <li key={wrestler.id}><strong>{wrestler.name}</strong> ---------- ({wrestler.finisher})</li>
      ))}
    </ul>
  </main>
}