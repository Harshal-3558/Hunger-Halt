import { Button } from "@chakra-ui/react";
import { FaArrowRight, FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import heroImage from "/images/hero-min.jpg";
import img6 from "/images/img6.jpeg";
import img8 from "/images/img8.jpeg";
import img7 from "/images/img7.jpeg";
import img5 from "/images/img5.jpeg";
import img2 from "/images/img2.jpeg";
import img3 from "/images/img3.jpeg";
import img4 from "/images/img4.jpeg";
import logo1 from "/images/logo1.png";
import logo2 from "/images/logo2.png";
import logo3 from "/images/logo3.png";
import logo4 from "/images/logo4.png";
import logo5 from "/images/logo5.png";
import logo6 from "/images/logo6.png";
import logo7 from "/images/logo7.png";
import logo8 from "/images/logo8.png";
import logo9 from "/images/logo9.png";
import logo10 from "/images/logo10.png";
import BioHome from "./roles/biogas/BioHome";

export default function Home() {
  return (
    <div>
      {/* HERO SECTION */}
      <div className="h-[500px] md:h-[600px] relative">
        <div className="absolute w-full h-full">
          <img
            src={heroImage}
            alt="Background Image"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="absolute inset-0 flex flex-col space-y-12 items-center justify-center px-4">
          <div className="flex flex-col space-y-8 items-center justify-center">
            <div className="flex flex-col items-center md:space-y-2">
              <h1 className="text-white text-4xl md:text-6xl font-bold">
                Bridging Abundance and Need
              </h1>
              <h1 className="text-green-400 text-4xl md:text-6xl font-bold">
                A Sustainable Solution to Food Waste
              </h1>
            </div>
            <h2 className="text-white text-sm md:text-xl text-center font-semibold">
              Connecting surplus food suppliers with organizations that feed the
              hungry, all while promoting sustainability and transparency.
            </h2>
          </div>
          <div>
            <Button
              as={Link}
              to={"/signup"}
              rightIcon={<FaArrowRight />}
              size="lg"
            >
              Join Our Network
            </Button>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="flex flex-col items-center justify-center my-10 md:my-16">
        <h1 className="text-4xl font-bold">Our Impact</h1>
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-5 mx-auto">
          <div className="grid items-center lg:grid-cols-12 gap-6 lg:gap-12">
            <div className="lg:col-span-4">
              <div className="lg:pe-6 xl:pe-12">
                <p className="text-6xl font-bold leading-10 text-teal-600">
                  85%
                </p>
                <p className="mt-2 sm:mt-3 text-gray-500">
                  Reduction in food waste among our partner suppliers
                </p>
              </div>
            </div>
            <div className="lg:col-span-8 relative lg:before:absolute lg:before:top-0 lg:before:-start-12 lg:before:w-px lg:before:h-full lg:before:bg-gray-200 lg:before:">
              <div className="grid gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-3 sm:gap-8">
                <div>
                  <p className="text-3xl font-semibold text-teal-600">
                    10,000+
                  </p>
                  <p className="mt-1 text-gray-500">
                    Meals distributed to those in need each month
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-teal-600">200+</p>
                  <p className="mt-1 text-gray-500">
                    Active partnerships between suppliers and organizations
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-teal-600">50</p>
                  <p className="mt-1 text-gray-500">
                    Communities positively impacted across the country
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MISSION SECTION */}
      <div>
        <h1 className="text-4xl font-bold text-center">Our Mission</h1>
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-10 mx-auto">
          <div className="md:grid md:grid-cols-2 md:items-center md:gap-10">
            <div className="grid grid-cols-2 gap-4">
              <img className="rounded-xl" src={img6} alt="Image Description" />
              <img className="rounded-xl" src={img7} alt="Image Description" />
              <img className="rounded-xl" src={img8} alt="Image Description" />
              <img className="rounded-xl" src={img5} alt="Image Description" />
            </div>
            <div className="mt-5 sm:mt-10 lg:mt-0">
              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-2 md:space-y-4">
                  <h2 className="font-bold text-3xl lg:text-4xl text-gray-800">
                    Ending Hunger, Reducing Waste
                  </h2>
                  <p className="text-gray-500 text-justify">
                    At Hunger Halt, we are dedicated to tackling two critical
                    challenges: hunger in our country and the widespread problem
                    of food waste. Our mission is to create a sustainable
                    ecosystem that connects surplus food with those in need,
                    making a tangible impact on both issues.
                  </p>
                </div>
                <ul className="space-y-2 sm:space-y-4">
                  <li className="flex items-start">
                    <div>
                      <FaCircleCheck className="text-xl text-teal-700 me-2 mt-1" />
                    </div>
                    <div className="text-sm sm:text-base text-gray-500">
                      <span className="font-bold">Innovative Solutions: </span>
                      We have developed an easy-to-use digital platform that
                      streamlines food donation and distribution processes.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div>
                      <FaCircleCheck className="text-xl text-teal-700 me-2 mt-1" />
                    </div>
                    <div className="text-sm sm:text-base text-gray-500">
                      <span className="font-bold">Powerful Network: </span>
                      Our system connects food suppliers with organizations that
                      feed the hungry, maximizing our reach and impact.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div>
                      <FaCircleCheck className="text-xl text-teal-700 me-2 mt-1" />
                    </div>
                    <div className="text-sm sm:text-base text-gray-500">
                      <span className="font-bold">Sustainable Approach: </span>
                      We ensure that even expired food contributes to
                      sustainability through biogas conversion.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PROCESS SECTION */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-10 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-4 lg:mb-6">
          <h2 className="text-4xl font-bold md:text-4xl md:leading-tight">
            Our Process
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="group hover:bg-gray-100 rounded-xl p-5 transition-all">
            <div className="aspect-w-16 aspect-h-10">
              <img
                className="w-full object-cover rounded-xl"
                src={img2}
                alt="Image Description"
              />
            </div>
            <h3 className="mt-5 text-xl text-gray-600 font-medium">
              We collect surplus food from businesses and individuals
            </h3>
          </div>
          <div className="group hover:bg-gray-100 rounded-xl p-5 transition-all">
            <div className="aspect-w-16 aspect-h-10">
              <img
                className="w-full object-cover rounded-xl"
                src={img3}
                alt="Image Description"
              />
            </div>
            <h3 className="mt-5 text-xl text-gray-600 font-medium">
              We distribute edible food to those facing hunger
            </h3>
          </div>
          <div className="group hover:bg-gray-100 rounded-xl p-5 transition-all">
            <div className="aspect-w-16 aspect-h-10">
              <img
                className="w-full object-cover rounded-xl"
                src={img4}
                alt="Image Description"
              />
            </div>
            <h3 className="mt-5 text-xl text-gray-600 font-medium">
              Expired food is sent to biogas plants, creating renewable energy
            </h3>
          </div>
        </div>
      </div>
      
      {/* BioGas SECTION */}
      <BioHome/>
      {/* PARTNERS SECTION */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="sm:w-1/2 xl:w-1/3 mx-auto text-center mb-6 md:mb-12">
          <h1 className="text-4xl font-bold md:text-4xl md:leading-tight text-gray-800">
            Our Patners
          </h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 lg:gap-6">
          <div className="p-4 md:p-7 bg-gray-100 rounded-lg flex items-center justify-center">
            <img src={logo1} />
          </div>
          <div className="p-4 md:p-7 bg-gray-100 rounded-lg flex items-center justify-center">
            <img src={logo2} />
          </div>
          <div className="p-4 md:p-7 bg-gray-100 rounded-lg flex items-center justify-center">
            <img src={logo3} />
          </div>
          <div className="p-4 md:p-7 bg-gray-100 rounded-lg flex items-center justify-center">
            <img src={logo4} />
          </div>
          <div className="p-4 md:p-7 bg-gray-100 rounded-lg flex items-center justify-center">
            <img src={logo5} />
          </div>
          <div className="p-4 md:p-7 bg-gray-100 rounded-lg flex items-center justify-center">
            <img src={logo6} />
          </div>
          <div className="p-4 md:p-7 bg-gray-100 rounded-lg flex items-center justify-center">
            <img src={logo7} />
          </div>
          <div className="p-4 md:p-7 bg-gray-100 rounded-lg flex items-center justify-center">
            <img src={logo8} />
          </div>
          <div className="p-4 md:p-7 bg-gray-100 rounded-lg flex items-center justify-center">
            <img src={logo9} />
          </div>
          <div className="p-4 md:p-7 bg-gray-100 rounded-lg flex items-center justify-center">
            <img src={logo10} />
          </div>
        </div>
      </div>
    </div>
  );
}
