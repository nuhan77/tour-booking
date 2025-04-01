import Lottie from "lottie-react";
import loadingAnimation from '../assets/loadingButton.json'
import { useMyContext } from "../contexts/Context";


function LoadingButton({text,containerClass,buttonClass,onClick, notFullWidth}) {

  const {isLoading} = useMyContext();

  return (
    <div className={`${notFullWidth ? '' : 'w-full'} ${containerClass}`}>
      <button onClick={onClick} type="submit" disabled={isLoading} className={`bg-main-50 h-10  flexCenter  text-white rounded-md w-full px-8 ${buttonClass}`}>
        {isLoading?
        <Lottie className="w-6" animationData={loadingAnimation} loop={true} />
        :
        text
        }

      </button>
    </div>
  )
}

export default LoadingButton