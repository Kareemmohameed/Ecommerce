import React, { useContext } from "react";
import logo from "../../assets/images/logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import DarkModeToggle from "../DarkMode/DarkModeToggle";
import { CartContext } from "../Context/CartContext";

const links = [
  { to: "", label: "Home" },
  { to: "Cart", label: "Cart" },
  { to: "WishList", label: "WishList" },
  { to: "Products", label: "Products" },
  { to: "Catrgories", label: "Catrgories" },
  { to: "Brands", label: "Brands" },
];

export default function Navbar() {
  const { CartDetails } = useContext(CartContext);
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  function LogOut() {
    localStorage.clear();
    setToken(null);
    navigate("LogIn"); // ✅ بيحوّل بشكل صحيح للصفحة داخل /Ecommerce
  }

  return (
    <nav className="sticky top-0 z-50 shadow-md bg-zinc-100 dark:bg-gray-900">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between py-5 px-5">
        
        {/* 🟢 Logo & Links */}
        <div className="flex items-center gap-4">
          <NavLink to="">
            <img src={logo} alt="FreshCart Logo" />
          </NavLink>

          {token && (
            <ul className="flex gap-6 text-gray-700">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === ""} // ✅ يحل مشكلة Home دايمًا Active
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-700 dark:text-green-700 font-semibold"
                        : "text-gray-700 hover:text-green-900 dark:text-gray-300 dark:hover:text-green-700 font-semibold"
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 🟢 Right Section */}
        <div className="flex items-center gap-5">
          {/* Dark Mode + Cart */}
          <div className="flex justify-center items-center gap-1">
            <DarkModeToggle />
            <Link to="Cart">
              <ul>
                <li className="relative">
                  <i className="fa-solid fa-cart-shopping text-2xl hover:text-green-800"></i>
                  {CartDetails?.numOfCartItems ? (
                    <span
                      className="w-4 h-4 bg-green-700 rounded-full 
                      absolute -top-3.5 left-2 
                      text-white text-xs 
                      flex items-center justify-center"
                    >
                      {CartDetails?.numOfCartItems}
                    </span>
                  ) : null}
                </li>
              </ul>
            </Link>
          </div>

          {/* Social Icons */}
          <ul className="flex items-center gap-3 text-gray-600">
            <li>
              <i className="fa-brands fa-facebook-f cursor-pointer dark:text-white hover:text-blue-700"></i>
            </li>
            <li>
              <i className="fa-brands fa-twitter cursor-pointer dark:text-white hover:text-blue-400"></i>
            </li>
            <li>
              <i className="fa-brands fa-instagram cursor-pointer dark:text-white hover:text-orange-800"></i>
            </li>
            <li>
              <i className="fa-brands fa-linkedin cursor-pointer dark:text-white hover:text-blue-500"></i>
            </li>
            <li>
              <i className="fa-brands fa-youtube cursor-pointer dark:text-white hover:text-red-800"></i>
            </li>
          </ul>

          {/* Auth Buttons */}
          <ul className="flex items-center gap-4 text-gray-700">
            {token ? (
              <li
                className="hover:text-black cursor-pointer dark:text-white dark:hover:text-green-700"
                onClick={LogOut}
              >
                Sign Out
              </li>
            ) : (
              <>
                <li>
                  <NavLink
                    to="LogIn"
                    className="hover:text-black dark:text-white dark:hover:text-green-700"
                  >
                    Log In
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="Register"
                    className="hover:text-black dark:text-white dark:hover:text-green-700"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
