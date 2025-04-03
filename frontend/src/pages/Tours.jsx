import { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { TourCard } from "../components/Templates";
import { useMyContext } from "../contexts/Context";

import Lottie from "lottie-react";
import loadingAnimation from "./../assets/loading.json";
import { useLocation } from "react-router-dom";

function Tours({ edit }) {
  const {
    isPageLoading,
    skip,
    isViewMore,
    setIsViewMore,
    setSkip,
    isMoreLoading,
    viewMoreNum,
    getAllTours,
    tours,
    setTours,
    isSearch,
  } = useMyContext();

  const { pathname } = useLocation();

  const handelScroll = () => {
    const { offsetHeight, scrollTop, scrollHeight, search } = e.target;

    if (offsetHeight + scrollTop + 1 >= scrollHeight) {
      console.log("first");
    }
  };

  const getData = async () => {
    if (isSearch || !isViewMore) return;
    const { tours: data, length: docLength } = await getAllTours(skip);
    setTours((prevUsers) => {
      const safeUsers = Array.isArray(prevUsers) ? prevUsers : [];
      return [...safeUsers, ...data];
    });
    if (skip + viewMoreNum >= docLength) setIsViewMore(false);
  };

  useEffect(() => {
    getData();
  }, [skip]);

  return (
    <div className="flexCol gap-8">
      <div id="allToursBg" className="h-[10em] w-full flexCenter">
        <h1 className="text-3xl font-bold">All Tours</h1>
      </div>
      <div className="flexCenter">
        <SearchBar />
      </div>
      <div className="flexCenter  mx-4 flex-col mb-12">
        {isPageLoading ? (
          <div className="flexCenter w-full">
            <Lottie animationData={loadingAnimation} loop={true} />
          </div>
        ) : (
          <div
            onScroll={handelScroll}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            {tours?.map((tour,index) => (
              <TourCard edit={edit} key={`${tour._id}-${index}`} tour={tour} />
            ))}
          </div>
        )}
        {isViewMore && !isMoreLoading && !isSearch && (
          <p
            onClick={() => setSkip(skip + viewMoreNum)}
            className="text-main-50 hover:underline cursor-pointer mt-4 hover:text-blue-500 font-semibold"
          >
            View More
          </p>
        )}
        {isMoreLoading && (
          <div className="flexCenter w-screen">
            <Lottie animationData={loadingAnimation} loop={true} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Tours;
