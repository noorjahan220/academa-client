import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

// React Icons
import { IoIosArrowDown } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

// Logo
import logo from "../../../public/logo.png"; // <-- Make sure this path is correct
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {
    // Get user and logOut function from our AuthContext
    const { user, logOut } = useContext(AuthContext);

    // State for the mobile menu (dropdown state is no longer needed)
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [isMegaMenuCollapse, setIsMegaMenuCollapse] = useState(false);
    const [megaMenuSubItemsOpen, setMegaMenuSubItemsOpen] = useState("");

    // Handle user logout
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
            <Link to="/">
                <img src={logo} alt="logo" className="w-[100px]" />
            </Link>

            {/* Nav links */}
            <ul className="items-center gap-[20px] text-[1rem] text-[#424242] md:flex hidden">
                <li><Link to="/" className="dark:text-[#abc2d3] hover:text-[#3B9DF8] cursor-pointer">Home</Link></li>
                <li><Link to="/colleges" className="dark:text-[#abc2d3] hover:text-[#3B9DF8] cursor-pointer">Colleges</Link></li>
                <li><Link to="/admission" className="dark:text-[#abc2d3] hover:text-[#3B9DF8] cursor-pointer">Admission</Link></li>
                <li><Link to="/my-college" className="dark:text-[#abc2d3] hover:text-[#3B9DF8] cursor-pointer">My College</Link></li>
            </ul>

            {/* ===== User Account Section - MODIFIED AS REQUESTED ===== */}
            <div className="flex items-center gap-4">
                {user ? (
                    // =======================================================
                    // ===== Logged-In User View (New Simplified Design) =====
                    // =======================================================
                    <>
                        <Link to="/profile" className="flex items-center gap-2 font-semibold text-gray-600 hover:text-[#3B9DF8]">
                            <img
                                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`}
                                alt="avatar"
                                className="w-[35px] h-[35px] rounded-full object-cover"
                            />
                            <span className="sm:block hidden">{user.displayName || "User"}</span>
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="font-semibold text-gray-600 hover:text-red-500"
                        >
                            Logout
                        </button>
                        
                        <CiMenuFries 
                            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                            className="text-[1.8rem] dark:text-[#abc2d3] text-[#424242] cursor-pointer md:hidden flex"
                        />
                    </>
                ) : (
                    // ===================================
                    // ===== Logged-Out User View ========
                    // ===================================
                    <>
                        <Link to="/login" className="font-semibold text-gray-600 hover:text-[#3B9DF8]">
                            Login
                        </Link>
                        <Link to="/register" className="bg-[#3B9DF8] text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
                            Register
                        </Link>
                    </>
                )}
            </div>

            {/* mobile sidebar (This remains unchanged) */}
            <aside
                className={` ${mobileSidebarOpen ? "translate-x-0 opacity-100 z-20" : "translate-x-[200px] opacity-0 z-[-1]"} md:hidden bg-white p-4 text-center absolute dark:bg-slate-700 top-[55px] right-0 sm:w-[300px] w-full rounded-md transition-all duration-300`}>
                <ul className="items-start gap-[20px] text-[1rem] text-gray-600 flex flex-col">
                    <li onClick={() => setIsMegaMenuCollapse(!isMegaMenuCollapse)}
                        className="hover:text-[#3B9DF8] group dark:text-[#abc2d3] transition-all duration-500 cursor-pointer capitalize flex items-center gap-[10px]">
                        Products
                        <IoIosArrowDown
                            className={`${isMegaMenuCollapse ? "rotate-0" : "rotate-[180deg]"} text-gray-600 group-hover:text-[#3B9DF8] dark:text-[#abc2d3] transition-all duration-300`} />
                    </li>

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