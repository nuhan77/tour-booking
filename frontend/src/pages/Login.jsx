import { useState } from "react";
import { Link } from "react-router-dom";
import { useMyContext } from "../contexts/Context";
import { toast } from "react-toastify";
import LoadingButton from "../components/LoadingButton";

function Login() {
  const { loginUser } = useMyContext();

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
    termsAndConditions: false,
  });
  const handelInputChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (!loginInfo.termsAndConditions)
      return toast.error("Please accept the terms and conditions");
    if (loginInfo.password.length < 5)
      return toast.error("Password must be at least 5 characters long");
    loginUser(loginInfo);
  };

  return (
    <div className="min-h-[calc(100vh-5em)] flexCenter mx-4">
      <form
        onSubmit={handelSubmit}
        action=""
        method="post"
        className="flexCol gap-4 bg-white p-4 rounded shadow-xl w-full max-w-[20em]"
      >
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          required
          name="email"
          value={loginInfo.email}
          onChange={handelInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          required
          name="password"
          value={loginInfo.password}
          onChange={handelInputChange}
        />

        <div className="flex ">
          <input
            type="checkbox"
            className="mr-2 mt-1"
            name="termsAndConditions"
            checked={loginInfo.termsAndConditions}
            onChange={(e) =>
              setLoginInfo({
                ...loginInfo,
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

        <LoadingButton text="Login" />

        <p>
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-color-main font-semibold text-main-50"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
