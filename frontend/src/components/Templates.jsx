import { IoLocationOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useMyContext } from "../contexts/Context";
import { useState } from "react";
import Popup from "reactjs-popup";
import { IoMdClose } from "react-icons/io";

export function TourCard({ tour, edit }) {
  const { deleteTourById, setBookNow, bookNow } = useMyContext();

  const [isModal, setIsModal] = useState(false);

  const deleteTour = () => {
    deleteTourById(tour?._id);
    window.scrollBy({ top: -21 * 16 });
    setIsModal(false);
  };
  let avgRating = (
    tour.reviews.reduce((acc, item) => acc + item.rating, 0) /
    tour.reviews.length
  ).toFixed(1);
  if (avgRating === "NaN") avgRating = "not rated";

  return (
    <div
      className={`flexCol shadow-md rounded-md max-w-[20em] overflow-hidden hover:scale-105 transition-all duration-300 text-gray-600`}
    >
      <div className="relative">
        <img className="rounded-t-md w-full" src={tour.photo} alt="" />
        {tour.featured && (
          <span className="absolute bottom-0 right-0 bg-main-50 text-white px-2 py-1 text-sm">
            Featured
          </span>
        )}
      </div>

      <div className="flexCol gap-2 p-2 bg-white rounded-b-md">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <IoLocationOutline className="text-main-50 text-xl" />
            <p>{tour.city}</p>
          </div>
          <div className="flex gap-2 items-center">
            <FaStar className="text-main-50 text-xl" />
            <p>
              {avgRating} ({tour.reviews.length})
            </p>
          </div>
        </div>

        <div>
          <Link
            onClick={() => setBookNow(false)}
            to={`/tours/${tour._id.toString()}`}
            className="text-xl line-clamp-1 w-fit text-black font-semibold capitalize hover:underline hover:text-blue-700"
          >
            {tour.title}
          </Link>
        </div>

        <div className="flex justify-between items-center">
          <p>
            <span className="text-main-50 font-bold">${tour.price}</span>/person
          </p>
          <div className="flex gap-4">
            {edit && (
              <button
                onClick={() => setIsModal(true)}
                className=" py-2 px-4 text-white rounded-lg cursor-pointer bg-red-500"
              >
                Delete
              </button>
            )}
            {edit ? (
              <Link
                to={`/admin/update-tour/${tour._id.toString()}`}
                className=" py-2 px-4 text-white rounded-lg cursor-pointer bg-main-50"
              >
                Edit
              </Link>
            ) : (
              <Link
                to={`/tours/${tour._id.toString()}`}
                onClick={() => setBookNow(true)}
                className=" py-2 px-4 text-white rounded-lg cursor-pointer bg-main-50"
              >
                Book Now
              </Link>
            )}
          </div>
        </div>

        <Popup
          open={isModal}
          modal
          contentStyle={{
            position: "relative",
            padding: "1.5em",
            borderRadius: "10px",
            maxWidth: "20em",
          }}
        >
          <IoMdClose
            onClick={() => setIsModal(false)}
            className="absolute top-0 right-0 text-2xl cursor-pointer"
          />
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">
              Are you sure you want to delete this tour?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModal(false)}
                className="py-2 px-4 rounded-lg bg-blue-400 text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={deleteTour}
                className="py-2 px-4 rounded-lg bg-red-500 text-white cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
}
