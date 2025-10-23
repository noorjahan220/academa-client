import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom"; 
import { CiMenuFries } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import logo from "../../../public/logo.png";
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("User logged out successfully");
        setMobileSidebarOpen(false);
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };


  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/colleges", label: "Colleges" },
    { to: "/admission", label: "Admission" },
    { to: "/my-college", label: "My College" },
  ];

  
  const renderNavLinks = (isMobile = false) =>
    navLinks.map((link) => (
      <li key={link.to}>
        <NavLink
          to={link.to}
         
          className={({ isActive }) =>
            `py-2 transition-colors duration-300 ${
              isActive
                ? "text-green-600 font-semibold" 
                : "text-gray-600 hover:text-green-600" 
            } ${isMobile ? "block w-full text-left text-lg" : ""}`
          }
          onClick={() => setMobileSidebarOpen(false)}
        >
          {link.label}
        </NavLink>
      </li>
    ));

  return (
   
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between w-full bg-white shadow-sm px-4 sm:px-6">
 
      <Link to="/" onClick={() => setMobileSidebarOpen(false)}>
        <img src={logo} alt="logo" className="w-[100px]" />
      </Link>

     
      <ul className="hidden md:flex items-center gap-6 text-[1rem]">
        {renderNavLinks()}
      </ul>


      <div className="flex items-center gap-4">
        
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 font-semibold text-gray-600 hover:text-green-600 transition-colors duration-300"
              >
                <img
                  src={
                    user.photoURL ||
                    `https://ui-avatars.com/api/?name=${user.displayName}&background=random`
                  }
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="hidden sm:block">
                  {user.displayName || "User"}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="font-semibold text-gray-600 hover:text-red-500 transition-colors duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="font-semibold text-gray-600 hover:text-green-600 transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 text-white font-semibold py-2 px-5 rounded-md hover:bg-green-600 transition-colors duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>

        
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="md:hidden text-2xl text-gray-700"
          aria-label="Open menu"
        >
          <CiMenuFries />
        </button>
      </div>

      
     <div
    className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
      mobileSidebarOpen
        ? "opacity-100"
        : "opacity-0 pointer-events-none"
    }`}
    onClick={() => setMobileSidebarOpen(false)}
/>

      <aside
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-xl z-100 transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="font-bold text-xl text-gray-700">Menu</h2>
          <button onClick={() => setMobileSidebarOpen(false)} className="text-2xl" aria-label="Close menu">
            <IoClose />
          </button>
        </div>
        <div className="p-4">
          <ul className="flex flex-col gap-4">{renderNavLinks(true)}</ul>
          <hr className="my-6 border-gray-200" />
          
          {/* User actions are now also inside the mobile menu */}
          <div className="flex flex-col gap-4">
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center gap-3 font-semibold text-gray-600 text-lg w-full text-left"
                >
                  <img
                    src={
                      user.photoURL ||
                      `https://ui-avatars.com/api/?name=${user.displayName}&background=random`
                    }
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span>{user.displayName || "User"}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-lg font-semibold text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="font-semibold text-gray-600 hover:text-green-600 text-lg text-center py-2 px-5 rounded-md border border-gray-300 transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="bg-green-500 text-white font-semibold text-lg text-center py-2 px-5 rounded-md hover:bg-green-600 transition-colors duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </aside>
    </header>
  );
};

export default Navbar;