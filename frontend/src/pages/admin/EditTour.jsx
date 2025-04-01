import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMyContext } from "../../contexts/Context";
import { TourCard } from "../../components/Templates";
import SearchBar from "../../components/SearchBar";

import Lottie from "lottie-react";
import loadingAnimation from "./../../assets/loading.json";

function EditTour() {
  const { isPageLoading, getAllTours, tours, setTours } = useMyContext();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("isAdmin")) navigate("/unauthorized");
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const getData = async () => {
    const data = await getAllTours();
    setTours(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flexCol gap-8">
      <div id="allToursBg" className="h-[10em] w-full flexCenter">
        <h1 className="text-3xl font-bold">All Tours</h1>
      </div>
      <div className="flexCenter">
        <SearchBar />
      </div>
      <div className="flexCenter flex-col mb-12">
        {isPageLoading ? (
          <div className="flexCenter w-screen">
            <Lottie animationData={loadingAnimation} loop={true} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {tours?.map((tour) => (
              <TourCard edit key={tour._id} tour={tour} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EditTour;
