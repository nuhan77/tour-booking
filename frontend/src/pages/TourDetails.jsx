import { useNavigate, useParams } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";

import { IoLocationOutline } from "react-icons/io5";
import { SlPeople } from "react-icons/sl";
import { FaStar } from "react-icons/fa";
import { IoPricetagOutline } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
import Rating from "../components/Rating";
import { BiCurrentLocation } from "react-icons/bi";
import BookNow from "../components/BookNow";

import { useLocation } from "react-router-dom";
import { useMyContext } from "../contexts/Context";
import LoadingButton from "../components/LoadingButton";

function TourDetails() {
  const {
    getSingleTour,
    user,
    isPageLoading,
    addReview,
    tour,
    setTour,
    bookNow,
  } = useMyContext();

  const { id } = useParams();

  const location = useLocation();
  const { pathname } = useNavigate();
  const targetRef = useRef(null);

  if (!isPageLoading && bookNow === true) {
    targetRef?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  const getData = async () => {
    const data = await getSingleTour(id);
    setTour(data);
  };

  useEffect(() => {
    getData();
    if (!isPageLoading && bookNow === true) {
      targetRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: "",
  });

  const submitReview = async () => {
    addReview(id, reviewData);
  };

  return (
    <div className="p-2 sm:p-4">
      {/* {isPageLoading ? (
        <div className="flexCenter h-[calc(100vh-5em)]">
          <Lottie className="" animationData={loadingAnimation} loop={true} />
        </div>
      ) : ( */}
        <div className="flex flex-col md:flex-row gap-4 w-auto">
          <div>
            <img className="rounded-md shadow-md" src={tour?.photo} alt="" />

            <div className=" grid w-full gap-4">
              <div className="border-2 p-2 sm:p-4 mt-12 border-slate-300 rounded-xl">
                <div className="flex gap-2 justify-between">
                  <h1 className="text-2xl sm:text-3xl font-semibold">{tour?.title}</h1>
                  <Rating tour={tour} />
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-2">
                    <IoLocationOutline className="text-main-50 text-xl" />
                    <p>{tour?.city}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <BiCurrentLocation className="text-main-50 text-xl" />
                    <p>{tour?.address}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <SlPeople className="text-main-50 text-xl" />
                    <p>{tour?.maxGroupSize}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <IoPricetagOutline className="text-main-50 text-xl" />
                    <p className="font-semibold">
                      ${tour?.price}
                      <span className="font-normal text-gray-700">/person</span>
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 mt-4">
                  <p className="font-semibold text-xl">Description:</p>
                  <p className="">{tour?.desc}</p>
                </div>
              </div>

              <div ref={targetRef} className="lg:hidden">
                <BookNow tour={tour} />
              </div>
              </div>

              {/* ............................REVIEWS START................... */}

              <div
                className={`border-2 mt-4 border-slate-300 rounded-xl overflow-hidden relative`}
              >
                {!localStorage.getItem("token") && (
                  <div className="h-full w-full flexCenter absolute bg-[rgba(0,0,0,0.6)] z-10">
                    <h1 className="text-3xl font-bold text-white">
                      Login First
                    </h1>
                  </div>
                )}

                <div className="mb-8 p-2 sm:p-4 grid gap-3 mt-4 drop-shadow-2xl ">
                  <div>
                    <p className="font-semibold text-xl">
                      Give us your feedback :
                    </p>
                    <div className="flexCol gap-2 items-start">
                      <div className="grid grid-cols-5  justify-around w-[12em] h-8 items-center">
                        {reviewData.rating < 1 ? (
                          <CiStar
                            onClick={(e) => {
                              e.preventDefault();
                              setReviewData({ ...reviewData, rating: 1 });
                            }}
                            className="text-main-50 text-3xl cursor-pointer"
                          />
                        ) : (
                          <FaStar
                            onClick={(e) => {
                              e.preventDefault();
                              setReviewData({ ...reviewData, rating: 1 });
                            }}
                            className="text-main-50 text-2xl cursor-pointer"
                          />
                        )}
                        {reviewData.rating < 2 ? (
                          <CiStar
                            onClick={(e) => {
                              e.preventDefault();
                              setReviewData({ ...reviewData, rating: 2 });
                            }}
                            className="text-main-50 text-3xl cursor-pointer"
                          />
                        ) : (
                          <FaStar
                            onClick={(e) => {
                              e.preventDefault();
                              setReviewData({ ...reviewData, rating: 2 });
                            }}
                            className="text-main-50 text-2xl cursor-pointer"
                          />
                        )}
                        {reviewData.rating < 3 ? (
                          <CiStar
                            onClick={(e) => {
                              e.preventDefault();
                              setReviewData({ ...reviewData, rating: 3 });
                            }}
                            className="text-main-50 text-3xl cursor-pointer"
                          />
                        ) : (
                          <FaStar
                            onClick={(e) => {
                              e.preventDefault();
                              setReviewData({ ...reviewData, rating: 3 });
                            }}
                            className="text-main-50 text-2xl cursor-pointer"
                          />
                        )}
                        {reviewData.rating < 4 ? (
                          <CiStar
                            onClick={(e) => {
                              e.preventDefault();
                              setReviewData({ ...reviewData, rating: 4 });
                            }}
                            className="text-main-50 text-3xl cursor-pointer"
                          />
                        ) : (
                          <FaStar
                            onClick={(e) => {
                              e.preventDefault();
                              setReviewData({ ...reviewData, rating: 4 });
                            }}
                            className="text-main-50 text-2xl cursor-pointer"
                          />
                        )}
                        {reviewData.rating < 5 ? (
                          <CiStar
                            onClick={(e) => {
                              e.preventDefault();
                              setReviewData({ ...reviewData, rating: 5 });
                            }}
                            className="text-main-50 text-3xl cursor-pointer"
                          />
                        ) : (
                          <FaStar
                            onClick={(e) => {
                              e.preventDefault();
                              setReviewData({ ...reviewData, rating: 5 });
                            }}
                            className="text-main-50 text-2xl cursor-pointer"
                          />
                        )}
                      </div>

                      <textarea
                        value={reviewData.comment}
                        onChange={(e) =>
                          setReviewData({
                            ...reviewData,
                            comment: e.target.value,
                          })
                        }
                        placeholder="Write your review here..."
                        type="text"
                        rows="5"
                        className="bg-white w-full p-2 rounded-lg outline-none"
                      />
                      <LoadingButton
                        notFullWidth
                        onClick={submitReview}
                        text="Submit"
                      />
                    </div>
                  </div>
                </div>
              </div>
            <div
              className={`border-2 p-4 mt-4 border-slate-300 rounded-xl overflow-hidden`}
            >
              <div className="">
                <p className="font-semibold text-xl ">
                  Reviews ({tour?.reviews?.length} reviews) :
                </p>
                <div className="grid gap-4 mt-4">
                  {tour?.reviews?.map((review, index) => (
                    <div className="p-2 sm:p-4 shadow-md bg-white rounded" key={index}>
                      <div className="flex justify-between gap-2 items-center">
                        <div className="flex gap-2 justify-between">
                          <RxAvatar className=" text-5xl text-slate-600" />
                          <div className="grid">
                            <p className="capitalize font-semibold">
                              {review.name}
                            </p>
                            <p className="text-gray-600 text-sm ">
                              {review.date || "01 January 2025"}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center">
                          <FaStar className="text-main-50 text-xl" />
                          <p>{review.rating}</p>
                        </div>
                      </div>
                      <div>
                        <p>{review.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
              {/* ............................REVIEWS END................... */}


          </div>

          <div className="">
            <div className="hidden  top-24 sticky   lg:block">
              <BookNow tour={tour} />
            </div>
          </div>
        </div>
      {/* )} */}
    </div>
  );
}

export default TourDetails;
