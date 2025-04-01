import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { useMyContext } from "../../contexts/Context";
import { AiOutlineCloudUpload } from "react-icons/ai";
import LoadingButton from "../../components/LoadingButton";


function AddTour() {

  const {user,addTour,getUser} = useMyContext();

  const {pathname} = useLocation();
  const navigate = useNavigate();



  useEffect(() => {
    if(!localStorage.getItem("isAdmin")) navigate('/unauthorized')
  }, [])


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])




    const tourTemplate = {
      title: "",
      city: "",
      address: "",
      price: 99,
      maxGroupSize: 8,
      desc: '',
      featured : false,
      image: null
    }
    const file = useRef(null);
    const [fileName, setFileName] = useState('');
    const [tourInfo, setTourInfo] = useState(tourTemplate);

    const handelChange = (e) => {
        setTourInfo({...tourInfo, [e.target.name]: e.target.value})
    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        
        // addTour(tourInfo);
        // console.log(tourInfo);


        let formData = new FormData();

        formData.append("title", tourInfo.title);
        formData.append("city", tourInfo.city);
        formData.append("address", tourInfo.address);
        formData.append("price", tourInfo.price);
        formData.append("maxGroupSize", tourInfo.maxGroupSize);
        formData.append("desc", tourInfo.desc);
        formData.append("featured", tourInfo.featured);
        formData.append("image", tourInfo.image);

      const success = await addTour(formData);

      if(success) {
        setTourInfo(tourTemplate);
        setFileName('');
      };
    }

    const handelFileUpload = (e) => {
      const file = e.target.files[0];
      if(!file) return
      setFileName(file.name);
      setTourInfo({...tourInfo, image: file})
    }


    const inputs =[
      {name: "title", placeholder: "Enter Title", type: "text"},
      {name: "city", placeholder: "Enter City", type: "text"},
      {name: "address", placeholder: "Enter Address", type: "text"},
      {name: "price", placeholder: "Enter Price", type: "number"},
      {name: "maxGroupSize", label: "Max Group Size", placeholder: "Enter Max Group Size", type: "number"},
    ]

  return (
    <div className="flexCol items-center gap-6 min-h-[calc(100vh-5em)] py-12">


      {/* <div className="rounded-md shadow-md p-4 bg-white flexCol gap-4 min-w-[20em] md:w-[40em] items-center"> */}
        {/* <h1 className="text-3xl font-bold">Upload an Image</h1> */}
        {/* <div  className=" flexCol items-center w-full border-3 border-slate-300 border-dashed p-4 rounded-md">
          <AiOutlineCloudUpload onClick={() => file.current.click()}  className="cursor-pointer text-7xl text-slate-600"/>         
          <input onChange={handelFileUpload} className="hidden" ref={file} type="file" />
          <p className="text-slate-600">{fileName}</p>
        </div> */}
      {/* </div> */}



        <form action="" method="post" onSubmit={handelSubmit} className=" rounded-md shadow-md p-4 bg-white flexCol gap-4 w-[70%] max:w-[35em] items-center">
      <h1 className="text-3xl font-bold">Add Tour</h1>


      <div  className=" flexCol items-center w-full border-3 border-slate-300 border-dashed p-4 rounded-md">
        <label htmlFor="image">Upload an Image</label>
        <p className="text-center">(Image will be automatically copped in 16:9)</p>

          <AiOutlineCloudUpload onClick={() => file.current.click()}  className="cursor-pointer text-7xl text-slate-600"/>         
          <input onChange={handelFileUpload} className="hidden" ref={file} type="file" />
          <p className="text-slate-600">{fileName}</p>
        </div>


          {
            inputs.map((input) => (
              <div className="flexCol items-start w-full  rounded-md" key={input.name} >
                <div className="grid w-full">
                  <label htmlFor={ input.name} className="capitalize">{ input.label || input.name}</label>
                  <input  
                    required
                    onChange={handelChange} 
                    name={input.name}
                    value={tourInfo[input.name]}
                    placeholder={input.placeholder} type={input.type} 
                    className="border-2 border-slate-300 rounded-md p-2" 
                  />

                </div>
                </div>
            ))
          }

              <div className="flexCol items-start w-full rounded-md">
                <div className="grid w-full">
                  <label htmlFor="featured">Featured</label>
                  <select
                    value={tourInfo?.featured}
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
                  <label >Description</label>
                  <textarea  
                    required
                    onChange={handelChange}
                    value={tourInfo.desc}
                    name='desc' 
                    placeholder="Enter Description" 
                    type='text' 
                    rows={5}
                    className="border-2 border-slate-300 rounded-md p-2" 
                  />

                </div>
                </div>
          

          <LoadingButton text="Add Tour"/>
        </form>

    </div>
  )
}

export default AddTour