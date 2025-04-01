import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
} from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePhoneEnabled } from "react-icons/md";

export default function About() {
  return (
    <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900">About Us</h2>
          <p className="mt-4 text-gray-600">
            At Travel, we believe that travel is more than just visiting new
            places—it's about creating unforgettable experiences. As a trusted
            tour booking platform, we connect adventurers, explorers, and
            travelers with the best-guided tours and activities across the
            world. Whether you’re looking for thrilling outdoor adventures,
            cultural excursions, or relaxing getaways, we make it easy to find
            and book the perfect tour. Our carefully curated selection of
            experiences ensures quality, safety, and value, giving you the
            freedom to explore with confidence. With a passion for travel and
            customer satisfaction, our team is dedicated to helping you discover
            new destinations, meet amazing people, and make memories that last a
            lifetime. Let’s turn your travel dreams into reality—one adventure
            at a time!
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
          <ul className="mt-4 space-y-4">
            <li className="flex items-center">
              <IoLocationOutline className="mr-2" />
              <span>123 Main Street, Anytown, USA 12345</span>
            </li>
            <li className="flex items-center">
              <MdOutlinePhoneEnabled className="mr-2" />
              <span>123-456-7890</span>
            </li>
            <li className="flex items-center">
              <MdOutlineEmail className="mr-2" />
              <span>info@example.com</span>
            </li>
            <li className="flex items-center">
              <FaFacebookSquare className="mr-2" />
              <span>Facebook</span>
            </li>
            <li className="flex items-center">
              <FaInstagramSquare className="mr-2" />
              <span>Instagram</span>
            </li>
            <li className="flex items-center">
              <FaLinkedin className="mr-2" />
              <span>LinkedIn</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
