import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { SyntheticEvent, useEffect, useState } from "react";
import { checkLoginAndGetName } from "../utils/AuthUtils";
import { NavLink, useNavigate } from "react-router";

export function AddDriver() {
  const navigate = useNavigate();
  const driversClient = generateClient<Schema>().models.drivers;
  const [userName, setUserName] = useState<string | undefined>();
  const [driverName, setDriverName] = useState<string>('');
  const [driverTeam, setDriverTeam] = useState<string>('');

  useEffect(() => {
    const handleData = async () => {
      const name = await checkLoginAndGetName();
      if (name) {
        setUserName(name)
      }
    }
    handleData();
  }, [])

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const driver = await driversClient.create({
      name: driverName,
      team: driverTeam
    })
    console.log(driver)
    alert(`Place with id ${driver.data?.id} created`)
navigate('/drivers');
  }

  function renderAddDriverForm() {
    if (userName) {
      return (
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="driverName">Driver name:</label><br />
                    <input value={driverName} onChange={(e) => setDriverName(e.target.value)} /><br />
                    <label htmlFor="driverTeam">Current team:</label><br />
                    <input value={driverTeam} onChange={(e) => setDriverTeam(e.target.value)} /><br />
                    <input type="submit" value='Add driver' />
                </form>
      )
    } else {
      return <div>
        <h2>Login to add drivers:</h2>
        <NavLink to={"/auth"}>Login</NavLink>
      </div>
    }
  }

  return <main>
    {renderAddDriverForm()}
  </main>
}