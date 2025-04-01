import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <h1 className="text-5xl font-bold text-center text-red-600 mb-4">
        Unauthorized Access
      </h1>
      <p className="text-lg text-center text-gray-700 mb-6">
        This happens when you do not have permission to view this page or login
        session has expired.
      </p>
      <Link
        to="/login"
        className="mt-6 px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default Unauthorized;
