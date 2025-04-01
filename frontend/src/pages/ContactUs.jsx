import React from "react";
import {
  IoLocationOutline,
  IoMailOutline,
  IoCallOutline,
  IoLogoGithub,
} from "react-icons/io5";
import { useState } from "react";
import { useMyContext } from "../contexts/Context";

const ContactUs = () => {
  const { user } = useMyContext();

  let name = "";
  let email = "";
  if (user) name = `${user.firstName} ${user.lastName}`;
  if (user) email = user.email;
  const [data, setData] = useState({
    name,
    email,
    message: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const templateParams = {
      from_name: name,
      to_name: "Travel Agency",
      from_email: email,
      message: message,
    };
  };

  return (
    <div className="flexCenter">
      <div className="flex flex-col p-4 gap-10 w-[25em] md:w-[30em] lg:w-[35em] xl:w-[40em]">
        <div className=" flex flex-col bg-white p-4 rounded-lg shadow-lg gap-5">
          <div className="flex items-center gap-3">
            <IoLocationOutline className="text-3xl text-gray-600" />
            <p className="text-xl text-gray-600">123 Street, New York, USA</p>
          </div>
          <div className="flex items-center gap-3">
            <IoMailOutline className="text-3xl text-gray-600" />
            <p className="text-xl text-gray-600">info@travelagency.com</p>
          </div>
          <div className="flex items-center gap-3">
            <IoCallOutline className="text-3xl text-gray-600" />
            <p className="text-xl text-gray-600">+1234567890</p>
          </div>
          <div className="flex items-center gap-3">
            <IoLogoGithub className="text-3xl text-gray-600" />
            <p className="text-xl text-gray-600">
              <a
                href="https://github.com/nuhan77"
                target="_blank"
                rel="noreferrer"
              >
                https://github.com/nuhan77
              </a>
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded-lg shadow-lg flex flex-col gap-5"
        >
          <h1 className="text-2xl font-bold text-center">Send Us Email</h1>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handelChange}
            placeholder="Name"
            className="p-2 border-2 border-gray-300 rounded-md"
          />
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handelChange}
            placeholder="Email"
            className="p-2 border-2 border-gray-300 rounded-md"
          />
          <textarea
            value={data.message}
            name="message"
            rows={5}
            onChange={handelChange}
            placeholder="Message"
            className="p-2 border-2 border-gray-300 rounded-md"
          />
          <button className="bg-orange-400 text-white p-2 rounded-md">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
