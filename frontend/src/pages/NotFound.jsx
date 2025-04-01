import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl text-center font-bold">404 - Page Not Found</h1>
      <p className="text-2xl">The page you are looking for does not exist.</p>
      <Link
        to="/home"
        className="mt-6 px-6 py-3 text-xl font-semibold text-white bg-blue-500 rounded-md"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
