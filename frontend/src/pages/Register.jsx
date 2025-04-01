import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useMyContext } from "../contexts/Context";

export default function Register() {
  const { registerUser } = useMyContext();

  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    termsAndConditions: false,
  });
  const handelInputChange = (e) => {
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    if (registerInfo.password !== registerInfo.confirmPassword)
      return toast.error("Passwords do not match");
    if (!registerInfo.termsAndConditions)
      return toast.error("Please accept the terms and conditions");
    if (registerInfo.password.length < 5)
      return toast.error("Password must be at least 5 characters long");

    registerUser(registerInfo);
  };

  return (
    <div className="min-h-[calc(100vh-5em)] flexCenter">
      <form
        onSubmit={handelSubmit}
        action=""
        method="post"
        className="flexCol gap-4 bg-white p-4 rounded shadow-xl w-[20em]"
      >
        <h1 className="text-3xl font-bold text-center">Register</h1>
        <input
          type="text"
          placeholder="First Name"
          className="border p-2 rounded"
          required
          name="firstName"
          value={registerInfo.firstName}
          onChange={handelInputChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="border p-2 rounded"
          required
          name="lastName"
          value={registerInfo.lastName}
          onChange={handelInputChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          required
          name="email"
          value={registerInfo.email}
          onChange={handelInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          required
          name="password"
          value={registerInfo.password}
          onChange={handelInputChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="border p-2 rounded"
          required
          name="confirmPassword"
          value={registerInfo.confirmPassword}
          onChange={handelInputChange}
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-2 mt-1"
            name="termsAndConditions"
            checked={registerInfo.termsAndConditions}
            onChange={(e) =>
              setRegisterInfo({
                ...registerInfo,
                termsAndConditions: e.target.checked,
              })
            }
          />
          <label>
            Accept our{" "}
            <Link
              to="/terms-and-conditions"
              className="text-main-50 font-semibold"
            >
              terms and conditions
            </Link>
          </label>
        </div>

        <button type="submit" className="bg-color-main text-white p-2 rounded">
          Register
        </button>

        <p>
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-color-main font-semibold text-main-50"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
