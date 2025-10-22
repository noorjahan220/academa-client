import React, { useState, useContext } from "react";

import { Link } from "react-router-dom";

// React Icons
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { CiMenuFries } from "react-icons/ci";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

// Logo
import logo from "../../../public/logo.png"; // <-- Make sure this path is correct
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {
    // NEW: Get user and logOut function from our AuthContext
    const { user, logOut } = useContext(AuthContext);


   const [accountMenuOpen, setAccountMenuOpen] = useState(false)

const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
const [isMegaMenuCollapse, setIsMegaMenuCollapse] = useState(false)
const [megaMenuSubItemsOpen, setMegaMenuSubItemsOpen] = useState("")

    // NEW: Handle user logout
    const handleLogout = () => {
        logOut()
            .then(() => {
                // Sign-out successful.
                console.log("User logged out successfully");
            })
            .catch((error) => {
                // An error happened.
                console.error("Logout error:", error);
            });
    };

    return (
        <nav className="flex items-center justify-between w-full relative">

            {/* Logo */}
            <Link to="/"> {/* CHANGED: Made logo a link to home */}
                <img src={logo} alt="logo" className="w-[100px]" />
            </Link>

            {/* Nav links */}
            <ul className="items-center gap-[20px] text-[1rem] text-[#424242] md:flex hidden">
                <li><Link to="/" className="dark:text-[#abc2d3] hover:text-[#3B9DF8] cursor-pointer">Home</Link></li>
                <li><Link to="/colleges" className="dark:text-[#abc2d3] hover:text-[#3B9DF8] cursor-pointer">Colleges</Link></li>
                <li><Link to="/admission" className="dark:text-[#abc2d3] hover:text-[#3B9DF8] cursor-pointer">Admission</Link></li>
                <li><Link to="/my-college" className="dark:text-[#abc2d3] hover:text-[#3B9DF8] cursor-pointer">My College</Link></li>
            </ul>


            {/* ===== User Account Section - NOW DYNAMIC ===== */}
            <div className="flex items-center gap-[15px]">
                {user ? (
                    // ===== Logged-In User View =====
                    <>
                        <div className="flex items-center gap-[10px] cursor-pointer relative"
                             onClick={() => setAccountMenuOpen(!accountMenuOpen)}>
                            <div className="relative">
                                <img
                                    // CHANGED: Use user's photoURL or a default placeholder
                                    src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`}
                                    alt="avatar" className="w-[35px] h-[35px] rounded-full object-cover" />
                                <div
                                    className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-[0px] right-0 border-2 border-white"></div>
                            </div>

                            <h1 className="text-[1rem] dark:text-[#abc2d3] font-[400] text-gray-600 sm:block hidden">
                                {/* CHANGED: Display user's name */}
                                {user.displayName || "User"}
                            </h1>

                            <div
                                className={`${accountMenuOpen ? "translate-y-0 opacity-100 z-[1]" : "translate-y-[10px] opacity-0 z-[-1]"} bg-white w-max rounded-md absolute dark:bg-slate-800 top-[45px] right-0 p-[10px] flex flex-col transition-all duration-300 shadow-lg`}>

                                <div className="border-t dark:border-slate-700 border-gray-200 pt-[5px]">
                                    {/* CHANGED: Added onClick handler for logout */}
                                    <p onClick={handleLogout} className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] dark:text-red-500 dark:hover:bg-red-500/20 text-red-500 hover:bg-red-50">
                                        <TbLogout2 />
                                        Logout
                                    </p>
                                </div>
                            </div>
                            <IoIosArrowUp
                                className={`${accountMenuOpen ? "rotate-0" : "rotate-[180deg]"} transition-all duration-300 dark:text-[#abc2d3] text-gray-600 sm:block hidden`} />
                        </div>
                        <CiMenuFries onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                             className="text-[1.8rem] dark:text-[#abc2d3] text-[#424242]c cursor-pointer md:hidden flex"/>
                    </>
                ) : (
                    // ===== Logged-Out User View =====
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="font-semibold text-gray-600 hover:text-[#3B9DF8]">
                            Login
                        </Link>
                        <Link to="/register" className="bg-[#3B9DF8] text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
                            Register
                        </Link>
                    </div>
                )}
            </div>

            {/* mobile sidebar (This can also be enhanced with user context if needed) */}
            <aside
                className={` ${mobileSidebarOpen ? "translate-x-0 opacity-100 z-20" : "translate-x-[200px] opacity-0 z-[-1]"} md:hidden bg-white p-4 text-center absolute dark:bg-slate-700 top-[55px] right-0 sm:w-[300px] w-full rounded-md transition-all duration-300`}>
                <ul className="items-start gap-[20px] text-[1rem] text-gray-600 flex flex-col">
                    <li onClick={() => setIsMegaMenuCollapse(!isMegaMenuCollapse)}
                        className="hover:text-[#3B9DF8] group dark:text-[#abc2d3] transition-all duration-500 cursor-pointer capitalize flex items-center gap-[10px]">
                        Products
                        <IoIosArrowDown
                            className={`${isMegaMenuCollapse ? "rotate-0" : "rotate-[180deg]"} text-gray-600 group-hover:text-[#3B9DF8] dark:text-[#abc2d3] transition-all duration-300`} />
                    </li>

                    {/* mobile mega menu remains the same */}
                    <div onClick={() => setMegaMenuSubItemsOpen("more_product")}
                         className={`${isMegaMenuCollapse ? "hidden" : "block"} group font-[500] ml-6`}>
                        <h4 className="text-left flex dark:text-[#abc2d3] items-center gap-[5px]">
                            More Products
                            <MdOutlineKeyboardArrowRight className="text-[1.2rem]" />
                        </h4>

                        <ul className={`${megaMenuSubItemsOpen === "more_product" ? "flex" : "hidden"} pl-6 mt-3 font-[400] items-start flex-col gap-[10px] text-gray-600`}>
                            <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer dark:text-[#abc2d3] capitalize">Demo App</li>
                            <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer dark:text-[#abc2d3] capitalize">CRM</li>
                            <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer dark:text-[#abc2d3] capitalize">CMS</li>
                        </ul>
                    </div>
                    {/* ... other mobile menu items */}
                </ul>
            </aside>
        </nav>
    );
};

export default Navbar;