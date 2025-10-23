import { Outlet } from "react-router-dom";
import Navbar from './../Pages/Home/Navbar';
import Footer from "../Footer/Footer";


export default function Main() {
  return (
    <div>
    <div><Navbar/></div>
        <div className="max-w-7xl mx-auto"><Outlet/></div>
        <div><Footer/></div>
    </div>
  )
}
