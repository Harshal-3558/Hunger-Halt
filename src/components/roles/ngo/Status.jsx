import { useEffect, useState } from "react";
import { FaHandHoldingHeart, FaLocationDot, FaUser } from "react-icons/fa6";

export default function Status() {
  const [volunteers, setVolunteers] = useState({});

  async function fetchVolunteerData() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST}/ngo/activeVolunteers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setVolunteers(data);
    } catch (error) {
      console.error("Error fetching volunteer data:", error);
    }
  }

  useEffect(() => {
    fetchVolunteerData();
  }, []);

  return (
    <div className="bg-slate-100 rounded-xl border shadow-md">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-8 mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl">
            <div className="p-4 md:p-5 flex gap-x-4">
              <div className="flex-shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg">
                <FaUser className="text-blue-600" />
              </div>
              <div className="grow">
                <div className="flex items-center gap-x-2">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Active Volunteers
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2">
                  <h3 className="text-xl sm:text-2xl font-medium text-gray-800">
                    {volunteers.activeVolunteers} / {volunteers.totalVolunteers}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-white border shadow-sm rounded-xl">
            <div className="p-4 md:p-5 flex gap-x-4">
              <div className="flex-shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg">
                <FaHandHoldingHeart className="text-blue-600" />
              </div>
              <div className="grow">
                <div className="flex items-center gap-x-2">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Todays Donation
                  </p>
                </div>
                <div className="mt-1 flex items-baseline gap-x-1">
                  <h3 className="text-xl sm:text-2xl font-medium text-gray-800">
                    725
                  </h3>
                  <h3 className="text-xl sm:text-sm font-medium text-gray-400">
                    KG
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-white border shadow-sm rounded-xl">
            <div className="p-4 md:p-5 flex gap-x-4">
              <div className="flex-shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg">
                <FaLocationDot />
              </div>
              <div className="grow">
                <div className="flex items-center gap-x-2">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Active Hunger Spots
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2">
                  <h3 className="text-xl sm:text-2xl font-medium text-gray-800">
                    72,540
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-white border shadow-sm rounded-xl">
            <div className="p-4 md:p-5 flex gap-x-4">
              <div className="flex-shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg">
                <FaUser />
              </div>
              <div className="grow">
                <div className="flex items-center gap-x-2">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Active Donors
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2">
                  <h3 className="text-xl sm:text-2xl font-medium text-gray-800">
                    72,540
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
