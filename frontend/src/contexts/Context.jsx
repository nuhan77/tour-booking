import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [isViewMore, setIsViewMore] = useState(true);

  const [skip, setSkip] = useState(0);

  const [tour, setTour] = useState(null);
  const [tours, setTours] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const [user, setUser] = useState(null);
  const [bookNow, setBookNow] = useState(false);

  const [searchValues, setSearchValues] = useState({
    location: "",
    price: "",
    maxGroupSize: "",
  });

  const [sliced, setSliced] = useState(3);

  const viewMoreNum = 24;

  const navigate = useNavigate();

  const backendURL = "https://tour-booking-backend-p1kb.onrender.com/api";

  const registerUser = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${backendURL}/users/register`, data);
      toast.success(`Welcome back ${res.data.data.user.firstName}`);
      setUser(res.data.data.user);
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("isAdmin", res.data.data.user.isAdmin);
      navigate("/");
    } catch (error) {
      console.log(error);
      return toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loginUser = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${backendURL}/users/login`, data);
      toast.success(`Welcome back ${res.data.data.user.firstName}`);
      setUser(res.data.data.user);
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("isAdmin", res.data.data.user.isAdmin);
      navigate("/");
    } catch (error) {
      console.log(error);
      return toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logOut = () => {
    try {
      setUser(null);
      if (localStorage.getItem("token")) localStorage.removeItem("token");
      if (localStorage.getItem("isAdmin")) localStorage.removeItem("isAdmin");
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const addTour = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${backendURL}/tours/admin/add-tours`,
        data,
        { headers: { token: ` ${localStorage.getItem("token")}` } }
      );
      toast.success(res.data.message);
      return res.data.success;
    } catch (error) {
      console.log(error);
      if (error.response.data.message == "Unauthorized") {
        logOut();
        return navigate("/unauthorized");
      }
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTourById = async (id) => {
    try {
      const res = await axios.delete(`${backendURL}/tours/admin/delete/${id}`, {
        headers: { token: ` ${localStorage.getItem("token")}` },
      });
      toast.success(res.data.message);

      setTours(tours.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
      if (error.response.data.message == "Unauthorized") {
        logOut();
        return navigate("/unauthorized");
      }
      return toast.error(error.response.data.message);
    }
  };

  const updateTour = async (id, data) => {
    setIsLoading(true);
    try {
      const res = await axios.put(
        `${backendURL}/tours/admin/update/${id}`,
        data,
        { headers: { token: ` ${localStorage.getItem("token")}` } }
      );
      toast.success(res.data.message);
      setTour(res.data.data.tour);
    } catch (error) {
      console.log(error);
      if (error.response.data.message == "Unauthorized") {
        logOut();
        return navigate("/unauthorized");
      }
      return toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateImage = async (id, data) => {
    setIsLoading(true);
    try {
      const res = await axios.put(
        `${backendURL}/tours/admin/update-image/${id}`,
        data,
        { headers: { token: ` ${localStorage.getItem("token")}` } }
      );
      toast.success(res.data.message);
      setTour(res.data.data.tour);
      return res.data.success;
    } catch (error) {
      console.log(error);
      if (error.response.data.message == "Unauthorized") {
        logOut();
        return navigate("/unauthorized");
      }
      return toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllTours = async (skip) => {
    if (skip === 0) setIsPageLoading(true);
    else setIsMoreLoading(true);
    try {
      const res = await axios.get(
        `${backendURL}/tours?skip=${skip}&limit=${viewMoreNum}`
      );
      return res.data.data;
    } catch (error) {
      console.log(error);
      return toast.error(error.response.data.message);
    } finally {
      setIsPageLoading(false);
      setIsMoreLoading(false);
    }
  };

  const search = async (data) => {
    setIsPageLoading(true);
    try {
      const { location, price, maxGroupSize } = data;
      const res = await axios.get(
        `${backendURL}/tours/search?location=${location}&price=${price}&maxGroupSize=${maxGroupSize}$skip=${skip}&limit=${viewMoreNum}`
      );
      setIsSearch(true);
      setTours(res.data.data.tours);
    } catch (error) {
      console.log(error);
      return toast.error(error.response.data.message);
    } finally {
      setIsPageLoading(false);
    }
  };

  const getSingleTour = async (id) => {
    setIsPageLoading(true);
    try {
      const res = await axios.get(`${backendURL}/tours/${id}`, {
        headers: { token: ` ${localStorage.getItem("token")}` },
      });
      const userInfo = res.data.data.user;
      return res.data.data.tour;
    } catch (error) {
      console.log(error);
      return toast.error(error.response.data.message);
    } finally {
      setIsPageLoading(false);
    }
  };

  const getFeaturedTour = async () => {
    setIsPageLoading(true);

    try {
      const res = await axios.get(`${backendURL}/tours/featured`);
      return res.data.data;
    } catch (error) {
      console.log(error);
    } finally {
      setIsPageLoading(false);
    }
  };

  const addReview = async (id, data) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${backendURL}/tours/${id}/add-review`,
        data,
        { headers: { token: ` ${localStorage.getItem("token")}` } }
      );
      toast.success(res.data.message);
      const review = res.data.data.review;

      setTour((prev) => ({
        ...prev,
        reviews: [review, ...prev.reviews],
      }));
    } catch (error) {
      console.log(error);
      if (error.response.data.message == "Unauthorized")
        navigate("/unauthorized");
      return toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const bookTour = async (data) => {
    try {
      const res = await axios.post(`${backendURL}/tours/book`, data, {
        headers: { token: ` ${localStorage.getItem("token")}` },
      });
    } catch (error) {
      console.log(error);
      if (error.response.data.message == "Unauthorized")
        navigate("/unauthorized");
      return toast.error(error.response.data.message);
    }
  };

  const getBookingInfo = async () => {
    try {
      if (!localStorage.getItem("token")) return toast.error("Unauthorized");
      const res = await axios.get(`${backendURL}/users/bookings`, {
        headers: { token: ` ${localStorage.getItem("token")}` },
      });
      return res.data.data.bookings;
    } catch (error) {
      console.log(error);
      if (error.response.data.message == "Unauthorized")
        navigate("/unauthorized");
      return toast.error(error.response.data.message);
    }
  };

  const getAllBookings = async () => {
    try {
      const res = await axios.get(`${backendURL}/tours/bookings`, {
        headers: { token: ` ${localStorage.getItem("token")}` },
      });
      return res.data.data.bookings;
    } catch (error) {
      console.log(error);
      if (error.response.data.message == "Unauthorized")
        navigate("/unauthorized");
      return toast.error(error.response.data.message);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.patch(
        `${backendURL}/tours/bookings/update/${id}`,
        { status },
        { headers: { token: ` ${localStorage.getItem("token")}` } }
      );
      return res.data.data.tour;
    } catch (error) {
      console.log(error);
      if (error.response.data.message == "Unauthorized")
        navigate("/unauthorized");
      return toast.error(error.response.data.message);
    }
  };

  const getUser = async () => {
    try {
      const res = await axios.get(`${backendURL}/users/details`, {
        headers: { token: ` ${localStorage.getItem("token")}` },
      });
      if (userInfo) {
        setUser(userInfo);
        return userInfo.isAdmin;
      }
    } catch (error) {}
  };

  const values = {
    sliced,
    setSliced,
    viewMoreNum,
    isViewMore,
    setIsViewMore,
    isLoading,
    isPageLoading,
    isMoreLoading,

    tour,
    setTour,
    tours,
    setTours,
    bookNow,
    getBookingInfo,
    getAllBookings,
    setBookNow,
    updateStatus,
    searchValues,
    setSearchValues,
    isSearch,
    setIsSearch,

    user,
    bookTour,
    getUser,
    registerUser,
    loginUser,
    logOut,
    addTour,
    deleteTourById,
    updateTour,
    updateImage,
    getAllTours,
    getSingleTour,
    getFeaturedTour,
    search,
    skip,
    setSkip,

    addReview,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export const useMyContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
