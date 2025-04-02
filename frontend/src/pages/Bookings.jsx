import { useEffect, useState } from "react";
import { useMyContext } from "../contexts/Context";

function Bookings() {
  const { getBookingInfo, getAllBookings } = useMyContext();
  const [bookings, setBookings] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getBookings = async () => {
      let data;
      if (localStorage.getItem("isAdmin") === "true") {
        data = await getAllBookings();
        setIsAdmin(true);
      } else {
        data = await getBookingInfo();
      }
      setBookings(data);
    };
    getBookings();
  }, []);
  // console.log(bookings);

  return (
    <div className="min-h-[calc(100vh-5em)] my-24 w-full ">
      <div className="w-[90%] max-w-[60em] m-auto grid gap-4 grid-rows-1 ">
        {bookings?.map((booking) => (
          <SingleBooking
            key={booking._id}
            booking={booking}
            isAdmin={isAdmin}
            bookingStatus={booking?.status}
          />
        ))}
      </div>
    </div>
  );
}

export default Bookings;

const SingleBooking = ({ booking, isAdmin, bookingStatus }) => {
  const { updateStatus } = useMyContext();
  const handleStatusChange = async (e) => {
    const status = e.target.value;
    await updateStatus(booking._id, status);
    setStatus(status);
  };

  const [status, setStatus] = useState(bookingStatus);
  const formattedDate = (createdAt) =>
    new Date(createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  return (
    <div className="bg-white p-2 sm:p-4 shadow-md rounded grid gap-2 ">
      <div className="flex gap-4 justify-between">
        <img className="w-32 rounded " src={booking?.tour?.photo} alt="" />
        <div>
          {isAdmin ? (
            <select
              className={`${
                status === "pending"
                  ? "bg-orange-300"
                  : status === "approved"
                  ? "bg-green-500"
                  : "bg-red-600"
              } text-white font-semibold p-2 h-fit  rounded outline-none`}
              value={status}
              onChange={handleStatusChange}
            >
              <option className="bg-white text-black outline-none" value="pending">Pending</option>
              <option className="bg-white text-black outline-none" value="approved">Approved</option>
              <option className="bg-white text-black outline-none" value="rejected">Rejected</option>
            </select>
          ) : (
            <p
              className={`font-semibold  ${
                booking?.status === "approved"
                  ? "text-green-600"
                  : booking?.status === "rejected"
                  ? "text-red-700"
                  : "text-orange-300"
              }`}
            >
              {status}
            </p>
          )}
        </div>
      </div>
        <p>{booking?.tour?.title}</p>
        <div className="grid gap-2 grid-cols-2 lg:grid-cols-3">
          <p className="font-semibold text-slate-600">{formattedDate(booking?.createdAt)}</p>
          <p>Gusts: {booking?.guests}</p>
          <p>Price: ${(booking?.tour?.price * booking?.guests).toFixed(2)}</p>
          <p>Others: ${(booking?.serviceCharge + booking?.tax).toFixed(2)}</p>
          <p>Total: ${(booking?.totalPrice).toFixed(2)}</p>
          {isAdmin && <p>Name: {booking?.fullName}</p>}
          {isAdmin && <p>Email: {booking?.email}</p>}
          {isAdmin && <p>Phone: {booking?.phone}</p>}
        </div>
    </div>
  );
};
