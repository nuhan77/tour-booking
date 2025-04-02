import Swiper from "react-id-swiper";
import { useMyContext } from "../contexts/Context";
import { FaArrowRightLong } from "react-icons/fa6";
import planet from "./../assets/images/planet-earth.png";
import img1 from "./../assets/images/hero-1.jpg";
import img2 from "./../assets/images/hero-2.jpg";
import img3 from "./../assets/images/hero-3.jpg";
import experience from "./../assets/images/experience.png";

import gallery1 from "./../assets/images/gallery-01.jpg";
import gallery2 from "./../assets/images/gallery-02.jpg";
import gallery3 from "./../assets/images/gallery-03.jpg";
import gallery4 from "./../assets/images/gallery-04.jpg";
import gallery5 from "./../assets/images/gallery-05.jpg";
import gallery6 from "./../assets/images/gallery-06.jpg";
import gallery7 from "./../assets/images/gallery-07.jpg";
import gallery8 from "./../assets/images/gallery-08.jpg";
import ava1 from "./../assets/images/ava-1.jpg";
import ava2 from "./../assets/images/ava-2.jpg";
import ava3 from "./../assets/images/ava-3.jpg";
import tourist from "./../assets/images/male-tourist.png";

import SearchBar from "../components/SearchBar";
import { TourCard } from "../components/Templates";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { TbArrowGuide } from "react-icons/tb";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { RoundedFull } from "../components/Subtitles";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Popup from "reactjs-popup";
import { IoMdClose } from "react-icons/io";
import Lottie from "lottie-react";
import loadingAnimation from "./../assets/loading.json";

function Home() {
  const { user, isPageLoading, getFeaturedTour } = useMyContext();
  const [featuredTours, setFeaturedTours] = useState([]);

  const getData = async () => {
    const data = await getFeaturedTour();
    setFeaturedTours(data);
  };

  useEffect(() => {
    getData();
  }, []);

  let myEmail = "";
  if (user) myEmail = user.email;

  const [email, setEmail] = useState(myEmail || "");
  const [popupMessage, setPopupMessage] = useState("");
  const [isModal, setIsModal] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsModal(true);
    if (email === "") return setPopupMessage("Please fill all the fields");
    let ifValid = email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (!ifValid) return setPopupMessage("Please enter a valid email");
    return setPopupMessage(
      `Thanks for subscribing. Notification will be sent to ${email}`
    );
  };

  return (
    <div className="min-h-screen flexCenter">
      <div className="">
        {/* HERO SECTION START */}

        <div className="flex p-4 gap-4">
          <RoundedFull text="explore the world with us" />
          <img id="planet" className="h-10" src={planet} alt="" />
        </div>

        <div className="flex px-4 flex-col lg:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold leading-10 sm:leading-12 text-center sm:text-start py-4 capitalize">
              traveling opens the door <br /> to create{" "}
              <span className="text-main-50">memories</span>
            </h1>
            <p className="text-md font-thin">
              Traveling the world is a transformative experience that exposes us
              to new cultures, people, and landscapes. It broadens our
              perspectives and offers opportunities to learn about history,
              traditions, and diverse ways of life. From wandering through
              ancient cities to exploring natural wonders, every destination
              provides unique memories and insights. Travel also encourages
              personal growth, pushing us out of our comfort zones and allowing
              us to embrace new challenges. Whether it's savoring local cuisine
              or navigating unfamiliar streets, the experiences gained from
              traveling the world stay with us, shaping our understanding of the
              world and ourselves.
            </p>
          </div>

          <div className="flexCenter mt-4 min-w-1/2">
            <div className="flex gap-4">
              <div>
                <img className="w-[9em] rounded-xl" src={img1} alt="" />
              </div>
              <div className="mt-8">
                <img className="w-[9em] rounded-xl " src={img2} alt="" />
              </div>
              <div>
                <img className="w-[9em] rounded-xl" src={img3} alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* HERO SECTION END */}

        <div className="flex justify-center px-4 mt-8 md:justify-start w-full">
          <SearchBar />
        </div>

        {/*/..................SERVICES START.............../*/}

        <div className="flex flex-col px-4 mt-12 items-center">
          <p className="font-stylish text-2xl text-main-50 font-extrabold">
            What We Serve
          </p>
          <p className="text-3xl text-center font-bold">
            We offer best services
          </p>
        </div>
        <div className="flexCenter px-4 lg:flex-row flex-col gap-4 mt-8">
          <div className="bg-white p-4 rounded-md shadow-md max-w-[20em] min-h-[17em]">
            <div className="bg-main-50 rounded-full w-12 h-12 flexCenter">
              <TiWeatherPartlySunny className="text-3xl text-white" />
            </div>
            <p className="text-gray-600 text-xl font-semibold mt-4">
              Calculate The Weather
            </p>
            <p className="text-gray-600 mt-2">
              We provide accurate weather calculations, offering detailed
              forecasts, temperature updates, humidity levels, wind speeds, and
              precipitation predictions to help you plan your day effectively.
            </p>
          </div>

          <div className="bg-white p-4 rounded-md shadow-md max-w-[20em] min-h-[17em]">
            <div className="bg-main-50 rounded-full w-12 h-12 flexCenter">
              <TbArrowGuide className="text-3xl text-white" />
            </div>
            <p className="text-gray-600 text-xl font-semibold mt-4">
              Best Tour Guide
            </p>
            <p className="text-gray-600 mt-2">
              We offer expert tour guides with in-depth knowledge, personalized
              itineraries, and exceptional customer service, ensuring an
              unforgettable and enriching travel experience tailored to your
              preferences.
            </p>
          </div>

          <div className="bg-white p-4 rounded-md shadow-md max-w-[20em] min-h-[17em]">
            <div className="bg-main-50 rounded-full w-12 h-12 flexCenter">
              <MdOutlineDashboardCustomize className="text-3xl text-white" />
            </div>
            <p className="text-gray-600 text-xl font-semibold mt-4">
              Customization
            </p>
            <p className="text-gray-600 mt-2">
              We offer personalized customization options, allowing you to
              tailor products, services, and experiences to your specific needs,
              preferences, and unique requirements for optimal satisfaction.
            </p>
          </div>
        </div>
        {/*/..................SERVICES END.............../*/}

        {/*/..................FEATURED TOURS START.............../*/}

        <div className="flex flex-col px-4 mt-12 items-center">
          <p className="font-stylish text-2xl text-main-50 font-extrabold">
            Featured
          </p>
          <p className="text-3xl text-center mb-6 font-bold ">
            Our featured tours
          </p>

          {isPageLoading ? (
            <div className="flexCenter w-screen">
              <Lottie animationData={loadingAnimation} loop={true} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {featuredTours?.map((tour) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>
          )}
        </div>
        {/*/..................FEATURED TOURS END.............../*/}

        {/*/..................EXPERIENCE START.............../*/}

        <div className="mt-12 px-4 text-start flex flex-col md:flex-row gap-8 mx-auto">
          <div>
            <RoundedFull text="Experience" />
            <h1 className="text-3xl mt-2 font-bold">
              With all our experience we will serve you
            </h1>
            <p className="font-thin text-gray-600 mt-2">
              At Travel, we believe that the best journeys are the ones shared
              with experienced guides who understand the nuances of every
              destination. With years of expertise and a passion for exploring
              the world, we are committed to providing you with unforgettable
              experiences. Whether you're seeking an adventure off the beaten
              path or a deep dive into local culture, our team is dedicated to
              tailoring every tour to your interests and needs. From the moment
              you book to the final farewell, we’re here to ensure that your
              journey is seamless, enjoyable, and enriching.
            </p>

            <div className="flex gap-8 mt-8">
              <ExperienceCard number="12k+" text="Successful trips" />
              <ExperienceCard number="2k+" text="Regular clients" />
              <ExperienceCard number="15" text="Years of experience" />
            </div>
          </div>
          <div className="flexCenter">
            <img
              className="max-w-[23em] w-full sm:min-w-[23em]"
              src={experience}
              alt=""
            />
          </div>
        </div>

        {/*/..................EXPERIENCE END.............../*/}

        {/*/..................GALLERY START.............../*/}

        <div className="mt-16 px-4">
          <RoundedFull text="Gallery" />
          <h1 className="mb-4 text-3xl mt-2 font-bold">See our tour gallery</h1>
          <GalleryCard />
          <div className="flexCenter mt-4">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 duration-100 text-main-50 text-lg font-semibold hover:underline hover:text-blue-700"
            >
              <p>See more</p>
              <FaArrowRightLong />
            </Link>
          </div>
        </div>

        {/*/..................GALLERY END.............../*/}

        {/*/..................REVIEWS START.............../*/}

        <div className="mt-16 px-4">
          <RoundedFull text="Reviews" />
          <h1 className="mb-4 text-3xl mt-2 font-bold">What our clients say</h1>
          <ReviewCard />
        </div>

        {/*/..................REVIEWS END.............../*/}

        {/*/..................NEWSLETTER START.............../*/}

        <div className=" bg-cyan-500 flex flex-col lg:flex-row justify-between items-center py-13 px-4 mt-12">
          <div className="max-w-[45em]">
            <p className="text-3xl font-bold text-white">
              Subscribe to our newsletter
            </p>
            <p className="text-2xl font-bold text-white">
              Get the latest updates and offers
            </p>
            <form
              onSubmit={handleSubscribe}
              style={{ gridTemplateColumns: "1fr auto" }}
              className="bg-white w-full max-w-[34em] grid justify-between rounded-md items-center mt-4"
            >
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Enter your email"
                className="bg-white rounded-md m-1 w-full px-2 sm:px-4 py-2 outline-none"
              />
              <button
                type="submit"
                className="bg-main-50 text-white py-2 m-1 px-4 rounded-md"
              >
                Subscribe
              </button>
            </form>

            <div className="flex flex-col gap-4 mt-4 text-white">
              <p>Explore More: Your Ultimate Travel Guide Newsletter</p>
              <p>
                Stay inspired and informed with our exclusive travel newsletter!
                Get the latest destination guides, expert tips, hidden gems, and
                travel deals delivered straight to your inbox. Whether you're
                planning your next big adventure or just dreaming of new places,
                we've got you covered.
              </p>
            </div>
          </div>

          <img className="min:w-[25em] max:w-[40em]" src={tourist} alt="" />
        </div>

        {/*/..................NEWSLETTER END.............../*/}

        <Popup
          open={isModal}
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
            onClick={() => setIsModal(false)}
            className="absolute top-0 right-0 text-2xl cursor-pointer"
          />
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">{popupMessage}</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModal(false)}
                className="py-2 px-4 rounded-lg bg-blue-400 text-white cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
}

export default Home;

const ExperienceCard = ({ number, text }) => {
  return (
    <div className="inline-flex flex-col items-center gap-2">
      <div className="bg-orange-400 w-[3.5em] sm:w-16 aspect-square flexCenter rounded-tl-2xl rounded-br-2xl">
        <p className="text-2xl font-bold text-white">{number}</p>
      </div>
      <p className="text-gray-600 text-center">{text}</p>
    </div>
  );
};

const GalleryCard = () => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 580: 2, 768: 3, 992: 4 }}
    >
      <Masonry gutter="1rem">
        <img
          className="rounded-lg w-full block hover:scale-105 duration-300"
          src={gallery1}
          alt=""
        />
        <img
          className="rounded-lg w-full block hover:scale-105 duration-300"
          src={gallery7}
          alt=""
        />
        <img
          className="rounded-lg w-full block hover:scale-105 duration-300"
          src={gallery3}
          alt=""
        />
        <img
          className="rounded-lg w-full block hover:scale-105 duration-300"
          src={gallery4}
          alt=""
        />
        <img
          className="rounded-lg w-full block hover:scale-105 duration-300"
          src={gallery8}
          alt=""
        />
        <img
          className="rounded-lg w-full block hover:scale-105 duration-300"
          src={gallery6}
          alt=""
        />
        <img
          className="rounded-lg w-full block hover:scale-105 duration-300"
          src={gallery2}
          alt=""
        />
        <img
          className="rounded-lg w-full block hover:scale-105 duration-300"
          src={gallery5}
          alt=""
        />
      </Masonry>
    </ResponsiveMasonry>
  );
};

const ReviewCard = () => {
  const reviews = [
    {
      img: ava1,
      customerName: "John Doe",
      reviewTitle: "Seamless Experience from Start to Finish",
      review:
        "I recently used this travel management platform to plan a family vacation, and I couldn’t be happier with the results! From booking flights to arranging accommodations and activities, everything was organized in one place. The website was user-friendly, and the customer support team was quick to assist when I had questions. It made planning the trip so much less stressful. I highly recommend it for anyone looking to streamline their travel experience.",
    },
    {
      img: ava2,
      customerName: "Jane Smith",
      reviewTitle: "Highly Efficient and Convenient",
      review:
        "I’ve used this travel management site for both business and personal trips, and it always delivers. The site makes it easy to track flights, hotels, and car rentals, and it consolidates all the information into a simple, easy-to-read itinerary. The only downside I encountered was that some of the additional services (like airport transfers) weren’t as customizable as I hoped. Still, overall, it’s a solid choice for travelers.",
    },
    {
      img: ava3,
      customerName: "Mark Johnson",
      reviewTitle: "Great for Business Travel",
      review:
        "As someone who frequently travels for work, this platform has been a game-changer. The itinerary builder helps me keep track of my meetings, flights, and accommodation with ease. The integration with my calendar is particularly useful, and I no longer have to deal with a bunch of separate apps. I also love how I can access everything from my phone while on the go. Definitely worth the investment for any frequent traveler.",
    },
    {
      img: ava1,
      customerName: "Emily Davis",
      reviewTitle: "Easy, But Could Use Some More Options",
      review:
        "I found this travel management site to be quite easy to navigate, and I was able to book my entire trip within a few minutes. However, I wish there were more options for customizing certain aspects, like choosing specific hotel rooms or viewing more detailed flight options. Still, for basic trip planning, it gets the job done and saved me a lot of time!",
    },
    {
      img: ava2,
      customerName: "Chris Wilson",
      reviewTitle: "A Fantastic Resource for Group Travel",
      review:
        "We used this travel management platform to organize a group trip for 15 people, and I was amazed by how smoothly everything went. The site allowed us to coordinate flights, accommodations, and activities for everyone without any confusion. The best part was the ability to share the itinerary with the group, so everyone stayed updated. It was a huge time-saver, and I’ll definitely be using it again for future group trips!",
    },
  ];
  const [ifReviewLess, setIfReviewLess] = useState(true);
  let displayItems;
  if (ifReviewLess) displayItems = reviews.slice(0, 2);
  else displayItems = reviews;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="flexCol flex-[1] items-center gap-4">
      <div className="flexCenter flex-wrap gap-4">
        {displayItems.map((e, index) => (
          <div
            key={index}
            className="bg-white max-w-[30em] md:h-[15em] p-4 rounded-lg shadow-lg"
          >
            <div className="flex items-center gap-4">
              <img
                className="w-12 h-12 object-cover rounded-full"
                src={e.img}
                alt=""
              />
              <div>
                <p className="text-lg font-semibold">{e.customerName}</p>
                <p className="text-sm text-gray-600">Customer</p>
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold">{e.reviewTitle}</p>
              <p className="text-sm text-gray-600">{e.review}</p>
            </div>
          </div>
        ))}
      </div>

      <p
        onClick={() => {
          setIfReviewLess(false);
        }}
        className="text-main-50 hover:underline cursor-pointer mt-4 hover:text-blue-500 font-semibold"
      >
        {ifReviewLess ? "View more" : ""}
      </p>
    </div>
  );
};

const NewSlider = () => {
  const params = {
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    spaceBetween: 30,
  };

  return (
    <Swiper {...params}>
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
      <div>Slide 4</div>
      <div>Slide 5</div>
    </Swiper>
  );
};
