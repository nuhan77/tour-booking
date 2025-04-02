import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useMyContext } from "../contexts/Context";
import LoadingButton from "../components/LoadingButton";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Rating from "./Rating";

const BookNow = ({ tour }) => {
  const { user, getUser, bookTour } = useMyContext();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  let fullName = "";
  let email = "";
  if (user) {
    fullName = `${user?.firstName} ${user?.lastName}`;
    email = user.email;
  }
  const [bookingInfo, setBookingInfo] = useState({
    fullName,
    email,
    phone: "",
    date: "",
    guests: 1,
  });

  const submitBookingForm = async () => {
    if (
      !bookingInfo.fullName ||
      !bookingInfo.email ||
      !bookingInfo.phone ||
      !bookingInfo.date ||
      !bookingInfo.guests
    ) {
      toast.error("All fields are required");
      return;
    }
    if (bookingInfo.guests < 1) {
      toast.error("guests must be greater than 0");
      return;
    }
    if (bookingInfo.guests > tour.maxGroupSize) {
      toast.error("guests must be less than or equal to max group size");
      return;
    }
    setIsOpen(true);
  };

  const handelTourBooking = async () => {
    await bookTour({
      ...bookingInfo,
      tour: tour._id,
      price: tour.price,
      tax: (tour?.price * bookingInfo.guests * 0.03).toFixed(2),
      serviceCharge: (tour?.price * 0.1).toFixed(2),
      totalPrice: (
        tour?.price * bookingInfo.guests +
        tour?.price * 0.1 +
        tour?.price * bookingInfo.guests * 0.03
      ).toFixed(2),
    });
    setIsOpen2(true);
  };

  const handelInputChange = (e) => {
    setBookingInfo({ ...bookingInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-[25em] w-full sm:w-[25em] m-auto ">
      <div className="inline-flex flex-col overflow-hidden border-2 relative w-full  border-slate-300 rounded-xl">
        <div className="p-2 sm:p-4">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold">
              ${tour?.price}
              <span className="text-gray-600 text-lg font-normal">
                /per person
              </span>{" "}
            </h1>
            <Rating tour={tour} />
          </div>

          <div>
            <p className="font-semibold text-xl mt-7">Information</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              action="POST"
              className="grid gap-1 mt-4"
            >
              <input
                required
                name="fullName"
                value={bookingInfo.fullName}
                onChange={handelInputChange}
                className="bg-white w-full p-2 rounded-sm outline-none border border-slate-300  "
                placeholder="Full Name"
                type="text"
              />
              <input
                required
                name="email"
                value={bookingInfo.email}
                onChange={handelInputChange}
                className="bg-white w-full p-2 rounded-sm outline-none border border-slate-300  "
                placeholder="Email"
                type="text"
              />
              <input
                required
                name="phone"
                value={bookingInfo.phone}
                onChange={handelInputChange}
                className="bg-white w-full p-2 rounded-sm outline-none border border-slate-300  "
                placeholder="Phone"
                type="number"
              />
              <div className="flex gap-2">
                <input
                  required
                  name="date"
                  value={bookingInfo.date}
                  onChange={handelInputChange}
                  className="bg-white w-full p-2 rounded-sm outline-none border border-slate-300  "
                  placeholder="mm/dd/yyyy"
                  type="date"
                />
                <input
                  required
                  name="guests"
                  value={bookingInfo.guests}
                  onChange={handelInputChange}
                  className="bg-white w-full p-2 rounded-sm outline-none border border-slate-300  "
                  placeholder="guests"
                  type="number"
                />
              </div>

              <div className="mt-4 text-slate-700">
                <div className="flex  justify-between items-center ">
                  <p>
                    ${tour?.price} x {bookingInfo.guests || 0} guestss
                  </p>
                  <p>${tour?.price * bookingInfo.guests}</p>
                </div>
                <div className="flex  justify-between items-center ">
                  <p>Service charge</p>
                  <p>${(tour?.price * 0.1).toFixed(2)}</p>
                </div>
                <div className="flex  justify-between items-center ">
                  <p>Tax</p>
                  <p>${(tour?.price * bookingInfo.guests * 0.03).toFixed(2)}</p>
                </div>
                <div className="flex  justify-between items-center text-black text-xl font-semibold ">
                  <p>Total</p>
                  <p>
                    $
                    {(
                      tour?.price * bookingInfo.guests +
                      tour?.price * 0.1 +
                      tour?.price * bookingInfo.guests * 0.03
                    ).toFixed(2)}
                  </p>
                </div>
              </div>

              <LoadingButton onClick={submitBookingForm} text="Book Now" />

              <Popup
                open={isOpen}
                onClose={() => setIsOpen(false)}
                modal
                contentStyle={{
                  position: "relative",
                  padding: "1.5em",
                  borderRadius: "10px",
                  maxWidth: "20em",
                  minWidth: "15em",
                }}
              >
                <IoMdClose
                  onClick={() => setIsOpen(false)}
                  className="absolute top-0 right-0 text-2xl cursor-pointer"
                />

                {isOpen2 ? (
                  <div className="flexCol items-center gap-1">
                    <p className="font-semibold text-xl">Thanks for booking</p>
                    <p className="font-semibold text-xl">
                      We will contact you soon
                    </p>
                    <button
                      onClick={() => {
                        setIsOpen2(false);
                        setIsOpen(false);
                      }}
                      className="bg-red-600 mt-4 text-white font-bold py-2 px-4 rounded"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <div className="flexCol items-center gap-1">
                    <p className="font-semibold text-xl">
                      Are you sure to book this tour?
                    </p>
                    <div className="flex justify-end gap-2 w-full">
                      <LoadingButton
                        onClick={handelTourBooking}
                        buttonClass="bg-main-50 mt-4 text-white font-bold rounded"
                        text={"Book Now"}
                      />

                      <button
                        onClick={() => setIsOpen(false)}
                        className="bg-red-600 mt-4 text-white font-bold py-2 px-4 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
