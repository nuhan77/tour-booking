import { IoLocationOutline } from "react-icons/io5";
import { TbCurrentLocation } from "react-icons/tb";
import { SlPeople } from "react-icons/sl";
import { IoSearchCircle } from "react-icons/io5";
import { useState } from "react";
import { IoPricetagOutline } from "react-icons/io5";
import { useMyContext } from "../contexts/Context";
import { toast } from "react-toastify";


function SearchBar() {

    const { search,searchValues, setSearchValues } = useMyContext();


    const handelSubmit = (e) => {
        e.preventDefault();
        if(searchValues.location === "" && searchValues.price === 0 && searchValues.maxGroupSize === 0) return toast.error('Please fill at least one field');
        search(searchValues);
    }

  return (

    <form onSubmit={handelSubmit} className= "  rounded-xl md:rounded-full shadow-md px-4 py-2 bg-white inline-flex flex-col md:flex-row gap-2" >

        <div className="flex gap-2 items-center md:border-r-2 border-slate-300">
            <IoLocationOutline className="text-2xl text-main-50"/>
            <div >
                <p className="">Location</p>
                <input value={searchValues.location} onChange={(e) => setSearchValues({...searchValues, location: e.target.value})} placeholder="Where you want to go? " className=" outline-none" type="text" />
            </div>
        </div>

        <div className="flex gap-2 items-center md:border-r-2 border-slate-300">
            <IoPricetagOutline  className="text-2xl text-main-50"/>
            <div >
                <p>Price</p>
                <input value={searchValues.price} onChange={(e) => setSearchValues({...searchValues, price: e.target.value})} placeholder="Max price" className=" outline-none w-[8em]" type="number" />
            </div>
        </div>
 
        <div className="flex gap-2 items-center">
            <SlPeople className="text-2xl text-main-50"/>
            <div >
                <p>People</p>
                <input value={searchValues.maxGroupSize} onChange={(e) => setSearchValues({...searchValues, maxGroupSize: e.target.value})} placeholder="Max group" className=" outline-none w-[5em]" type="number" />            
            </div>
        </div>
        
        <button type="submit" onClick={handelSubmit} className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg  bg-main-50 mb-2 md:mb-0 md:bg-white">
            <p className="text-white md:hidden">Search</p>
            <IoSearchCircle className="text-4xl  text-white md:text-main-50"/>
        </button>
 
    </form>
  )
}

export default SearchBar