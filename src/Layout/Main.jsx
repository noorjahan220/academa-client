import { Outlet } from "react-router-dom";
import Navbar from './../Pages/Home/Navbar';


export default function Main() {
  return (
    <div>
      <Navbar/>
        <Outlet/>
    </div>
  )
}
