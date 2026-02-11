import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";
import Driver from "./Driver";

export type DriverType = Schema["drivers"]['type']

export function Drivers() {

  const client = generateClient<Schema>().models.drivers
  const [drivers, setDrivers] = useState<Array<DriverType>>([])

  useEffect(() => {
    const handleData = async () => {
      const subscription = client.observeQuery().subscribe({
        next: (data) => setDrivers([...data.items])
      })
      return () => subscription.unsubscribe();
    }
    handleData();
  }, []);

  function renderDrivers() {
        const rows: React.JSX.Element[] = []
        for (const driver of drivers) {
            rows.push(<Driver driver={driver} key={driver.id} />)
        }
        return rows
    }

  return <main>
    {/* <button onClick={addDriver}>Add F1 driver</button> */}
    <h3>All F1 drivers:</h3>
    {renderDrivers()}
  </main>
}