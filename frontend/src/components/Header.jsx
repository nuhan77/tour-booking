import { MdLogout } from "react-icons/md";

import { IoReorderThreeOutline } from "react-icons/io5";

import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import logo from "./../assets/images/logo.png";
import { useEffect, useState } from "react";
import { useMyContext } from "../contexts/Context";

function Header() {
  const { logOut } = useMyContext();

  const navigate = useNavigate();

  const [isSidebar, setIsSidebar] = useState(false);
  const links = [
    { text: "Home", path: "/home" },
    { text: "About", path: "/about" },
    { text: "Tours", path: "/tours" },
    { text: "Bookings", path: "/bookings" },
    { text: "Contact Us", path: "/contact-us" },
  ];
  if (localStorage.getItem("isAdmin") === "true") {
    links.push(
      { text: "Add Tour", path: "/admin/add-tour" },
      { text: "Edit Tour", path: "/admin/edit-tour" }
    );
  }

  const displayHeader = () => {
    setIsSidebar(!isSidebar);
  };

  return (
    <div
      id="header"
      className="z-20  bg-blue-50 shadow-md w-full h-[5em] fixed top-0 flex px-4 items-center justify-between font-semibold text-gray-700"
    >
      <img className="h-20 w-auto" src={logo} alt="" />
      <div className="items-center gap-4 lg:gap-8 xl:gap-12 hidden md:flex">
        {links.map((e, index) => (
          <NavLink className="text-nowrap" key={index} to={e.path}>
            {e.text}
          </NavLink>
        ))}
      </div>

      {localStorage.getItem("token") ? (
        <div className="">
          <div
            onClick={logOut}
            className="flex cursor-pointer items-center gap-4 bg-main-50 py-2 px-4 text-white rounded-md"
          >
            <p>Logout</p>
            <MdLogout
              className="text-2xl "
              onClick={() => navigate("/login")}
            />
          </div>
        </div>
      ) : (
        <div className="flex gap-8 md:gap-4 lg:gap-8 xl:gap-12 ">
          <button onClick={() => navigate("/login")}>Login</button>
          <button
            onClick={() => navigate("/register")}
            className="py-2 px-4 text-white rounded-full bg-main-50"
          >
            Register
          </button>
        </div>
      )}

      <div className=" md:hidden px-2 cursor-pointer" onClick={displayHeader}>
        <IoReorderThreeOutline className="text-2xl" />
        <div
          className={`${
            isSidebar ? "" : "hidden"
          } absolute bg-orange-100 shadow-xl right-0 rounded-md`}
        >
          <div className="flex flex-col items-center p-4">
            {links.map((e, index) => (
              <NavLink
                className="text-nowrap py-4 text-xl"
                key={index}
                to={e.path}
              >
                {e.text}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
