import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Router from "../router/Router";
import { useEffect } from "react";

function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flexCenter">
      <div className="w-full  max-w-[1920px] ">
        <Header />
        <div className="mt-20">
          <Router />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
