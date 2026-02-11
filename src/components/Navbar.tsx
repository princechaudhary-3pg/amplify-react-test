import { NavLink } from 'react-router'

export default function NavBar() {

    return <div className="navbar">
        <NavLink to={"/"}>Home</NavLink>&nbsp;
        <NavLink to={"/drivers"}>Drivers</NavLink>&nbsp;
        <NavLink to={"/drivers/add"}>Add</NavLink>&nbsp;
        <NavLink to={"/auth"} style={{ float: "right" }}>Login</NavLink>
    </div>
}