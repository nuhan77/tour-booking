import { ToastContainer } from "react-toastify";
import "./App.css";
import Layout from "./layouts/Layout";

function App() {
return (
    <div className="bg-main ">
      <Layout />
      <ToastContainer />
    </div>
  );
}

export default App;
