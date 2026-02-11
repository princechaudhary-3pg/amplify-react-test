
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { Auth } from "./Auth2";
import { Drivers } from "./components/Drivers";
import Home from "./components/Home";
import NavBar from "./components/Navbar";
import DriverDetails from "./components/DriverDetails";
import { AddDriver } from "./components/AddDriver";

function App() {
  const router = createBrowserRouter([{
    element: (
      <>
        <NavBar></NavBar>
        <Outlet></Outlet>
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/drivers",
        element: <Drivers />
      },
      {
        path: "/drivers/add",
        element: <AddDriver />
      },
      {
        path: "/drivers/:id",
        element: <DriverDetails />
      },
      {
        path: "/auth",
        element: <Auth />
      }
    ]
  }])

  return (
    <>
      <RouterProvider router={router} />
      {/* <Auth /> */}
      {/* <Drivers /> */}
    </>
  );
}

export default App;
