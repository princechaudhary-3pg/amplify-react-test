import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

type DriversType = Schema['drivers']['type']

export function Drivers() {

  const driversClient = generateClient<Schema>().models.drivers
  const [drivers, setDrivers] = useState<Array<DriversType>>([])

  useEffect(() => {
    driversClient.observeQuery({ authMode: "apiKey" }).subscribe({
      next: (data) => setDrivers([...data.items])
    });
  }, []);

  // function addDriver() {
  //   const name = globalThis.prompt("Driver's Name")!;
  //   const team = globalThis.prompt("Team Name") || "";
  //   const number = Number(globalThis.prompt("Driver Number") || "0");

  //   driversClient.create({
  //     name,
  //     team,
  //     number
  //   }, { authMode: "apiKey" })
  // }

  return <main>
    {/* <button onClick={addDriver}>Add F1 driver</button> */}
    <h3>All F1 drivers:</h3>
    <ul>
      {drivers.map((driver) => (
        <li key={driver.id}><strong>{driver.name}</strong>({driver.number}) ---- {driver.team}</li>
      ))}
    </ul>
  </main>
}