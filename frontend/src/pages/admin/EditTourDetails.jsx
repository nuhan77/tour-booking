import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMyContext } from "../../contexts/Context";
import { AiOutlineCloudUpload } from "react-icons/ai";
import LoadingButton from "../../components/LoadingButton";
import Popup from "reactjs-popup";
import { IoMdClose } from "react-icons/io";
import Lottie from "lottie-react";
import loadingAnimation from "./../../assets/loading.json";

function EditTourDetails() {
  const {
    updateImage,
    getSingleTour,
    tour,
    setTour,
    updateTour,
    isPageLoading,
  } = useMyContext();

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);

  const { id } = useParams();

  const getData = async () => {
    const data = await getSingleTour(id);
    setTour(data);
  };

  useEffect(() => {
    if (!localStorage.getItem("isAdmin")) navigate("/unauthorized");
    getData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const file = useRef(null);
  const [fileName, setFileName] = useState("");

  const handelChange = (e) => {
    setTour({ ...tour, [e.target.name]: e.target.value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    updateTour(id, tour);
  };

  const changeImage = async () => {
    const data = new FormData();
    data.append("image", image);

    const success = await updateImage(id, data);

    if (success === true) {
      setIsOpen(false);
      setImage(null);
    }
  };

  const handelFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setImage(file);
  };

  const inputs = [
    { name: "title", placeholder: "Enter Title", type: "text" },
    { name: "city", placeholder: "Enter City", type: "text" },
    { name: "address", placeholder: "Enter Address", type: "text" },
    { name: "price", placeholder: "Enter Price", type: "number" },
    {
      name: "maxGroupSize",
      label: "Max Group Size",
      placeholder: "Enter Max Group Size",
      type: "number",
    },
  ];

  return (
    <div className="flexCol items-center gap-6 min-h-[calc(100vh-5em)] py-12">
      {isPageLoading ? (
        <div className="flexCenter h-full w-full">
          <Lottie animationData={loadingAnimation} loop={true} />
        </div>
      ) : (
        <>
          <Popup
            open={isOpen}
            onClose={() => setIsOpen(false)}
            modal
            contentStyle={{
              position: "relative",
              padding: "1.5em",
              borderRadius: "10px",
              width: "70%",
              maxWidth: "20em",
            }}
          >
            <IoMdClose
              onClick={() => setIsOpen(false)}
              className="absolute top-0 right-0 text-2xl cursor-pointer"
            />
            <div className="flexCol gap-2">
              <div className=" flexCol items-center w-full border-3 border-slate-300 border-dashed p-4 rounded-md">
                <label htmlFor="image">Select an Image</label>
                <p className="text-center">
                  (Image will be automatically copped in 16:9)
                </p>
                <AiOutlineCloudUpload
                  onClick={() => file.current.click()}
                  className="cursor-pointer text-7xl text-slate-600"
                />
                <input
                  onChange={handelFileUpload}
                  className="hidden"
                  ref={file}
                  type="file"
                />

                <p className="text-slate-600">{fileName}</p>
              </div>
              <LoadingButton onClick={changeImage} text="Change" />
            </div>
          </Popup>

          <img
            className="w-[70%] max:w-[35em] rounded-md"
            src={tour?.photo}
            alt=""
          />
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-500 px-4 rounded-md py-2 inline-flex text-white"
          >
            Change Image
          </button>

          <form
            action=""
            method="post"
            onSubmit={handelSubmit}
            className=" rounded-md shadow-md p-4 bg-white flexCol gap-4 w-[70%] max:w-[35em] items-center"
          >
            <h1 className="text-3xl font-bold">Edit Tour</h1>

            {inputs.map((input) => (
              <div
                className="flexCol items-start w-full  rounded-md"
                key={input.name}
              >
                <div className="grid w-full">
                  <label htmlFor={input.name} className="capitalize">
                    {input.label || input.name}
                  </label>
                  <input
                    required
                    onChange={handelChange}
                    name={input.name}
                    value={tour?.[input.name]}
                    placeholder={input.placeholder}
                    type={input.type}
                    className="border-2 border-slate-300 rounded-md p-2"
                  />
                </div>
              </div>
            ))}

            <div className="flexCol items-start w-full rounded-md">
              <div className="grid w-full">
                <label htmlFor="featured">Featured</label>
                <select
                  value={tour?.featured}
                  onChange={handelChange}
                  name="featured"
                  className="border-2 border-slate-300 rounded-md p-2"
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
            </div>

            <div className="flexCol items-start w-full  rounded-md">
              <div className="grid w-full">
                <label>Description</label>
                <textarea
                  required
                  value={tour?.desc}
                  onChange={handelChange}
                  name="desc"
                  placeholder="Enter Description"
                  type="text"
                  rows={5}
                  className="border-2 border-slate-300 rounded-md p-2"
                />
              </div>
            </div>

            <LoadingButton text="Update Tour" />
          </form>
        </>
      )}
    </div>
  );
}

export default EditTourDetails;
