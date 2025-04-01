import { FaStar } from "react-icons/fa";



function Rating({tour}) {
    let avgRating = (tour?.reviews?.reduce((acc, item) => acc + item.rating, 0) / tour?.reviews?.length).toFixed(1);
    if(avgRating === "NaN") avgRating = "not rated";
  return (
            <div className='flex gap-2 mt-2 items-start'>
              <FaStar className='text-main-50 text-xl'/>
              <p className="text-nowrap">{avgRating} ({tour?.reviews?.length})</p>
            </div>  )
}

export default Rating