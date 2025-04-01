import logo from '../assets/images/logo.png'
import {Link} from 'react-router-dom'

import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePhoneEnabled } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";






function Footer() {
  return (
    <div className='p-4 bg-slate-200'> 
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 justify-around'>
          <div>
            <img className='h-24' src={logo} alt="" />
            <p className='text-gray-600'>Travel the world with us. Explore what you've never seen before. Enjoy life!</p>
            <div className='flex gap-4 mt-4'>
            <FaGithub className='text-3xl hover:text-gray-700 duration-300 cursor-pointer'/>
            <FaLinkedin className='text-3xl hover:text-blue-800 duration-300 cursor-pointer'/>
            <FaInstagramSquare className='text-3xl hover:text-pink-600 duration-300 cursor-pointer'/>
            <FaFacebookSquare className='text-3xl hover:text-blue-600 duration-300 cursor-pointer'/>


            </div>
          </div>

          <div className='grid grid-cols-2 '>

          <div className='grid gap-3'>
            <p className='text-black text-xl font-semibold'>Discover</p>
            <div><Link to={'/'} className='hover:underline hover:text-blue-500 duration-150'>Home</Link></div>
            <div><Link to={'/about'} className='hover:underline hover:text-blue-500 duration-150'>About</Link></div>
            <div><Link to={'/tours'} className='hover:underline hover:text-blue-500 duration-150'>Tours</Link></div>
            <div><Link to={'/contact-us'} className='hover:underline hover:text-blue-500 duration-150'>Contact us</Link></div>
          </div>
          <div className='grid gap-3 md:hidden'>
            <p className='text-black text-xl font-semibold'>Quick links</p>
            <div><Link to={'/gallery'} className=' hover:underline hover:text-blue-500 duration-150'>Gallery</Link></div>
            <div><Link to={'/tours'} className=' hover:underline hover:text-blue-500 duration-150'>Book now</Link></div>
            <div><Link to={'/login'} className=' hover:underline hover:text-blue-500 duration-150'>Login</Link></div>
            <div><Link to={'/register'} className=' hover:underline hover:text-blue-500 duration-150'>Register</Link></div>
          </div>
          </div>


          <div className='gap-3 hidden md:grid'>
            <p className='text-black text-xl font-semibold'>Quick links</p>
            <div><Link to={'/gallery'} className=' hover:underline hover:text-blue-500 duration-150'>Gallery</Link></div>
            <div><Link to={'/tours'} className=' hover:underline hover:text-blue-500 duration-150'>Book now</Link></div>
            <div><Link to={'/login'} className=' hover:underline hover:text-blue-500 duration-150'>Login</Link></div>
            <div><Link to={'/register'} className=' hover:underline hover:text-blue-500 duration-150'>Register</Link></div>
          </div>

          <div className='grid gap-3'> 
            <p className='text-black text-xl font-semibold'>Contact:</p>
            
            <div className='flex gap-1 items-center'>
              <IoLocationOutline className='text-main-50 text-xl'/>
              <p className='text-black font-semibold mr-3'>Address:</p>
              <p>Maldives</p>
            </div>

            <div className='flex gap-1 items-center'>
              <MdOutlineEmail  className='text-main-50 text-xl'/>
              <p className='text-black font-semibold mr-3'>Email:</p>
              <p>nawazesh77@gmail.com</p>
            </div>

            <div className='flex gap-1 items-center'>
              <MdOutlinePhoneEnabled className='text-main-50 text-xl'/>
              <p className='text-black font-semibold mr-3'>Phone:</p>
              <p>+123456789</p>
            </div>


          </div>
          <div>

          </div>

        </div>
        <p className='text-center mt-4 text-gray-700 text-sm'>Copyright &copy; 2023 All rights reserved</p>
    </div>
  )
}

export default Footer