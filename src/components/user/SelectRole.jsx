import { Button } from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaArrowRightLong,
  FaBuildingNgo,
  FaHandHoldingHeart,
  FaHandshakeAngle,
} from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SelectRole() {
  const [selectedRole, setSelectedRole] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleRoleUpdate = async () => {
    // console.log(user.role);
    const response = await fetch(
      `${import.meta.env.VITE_HOST}/user/selectRole`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user._id,
          role: selectedRole,
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      toast.success("Your role is updated");
      navigate(`/${data.role}`);
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-dvh space-y-10">
      <div>
        <h1 className="font-semibold text-2xl md:text-3xl text-teal-600">
          Select the role which suits you !
        </h1>
      </div>

      <div className="grid gap-6 md:gap-12 grid-row-3 md:grid-cols-3">
        <button
          onClick={() => setSelectedRole("volunteer")}
          className={`border-4 rounded-xl py-4 px-20 flex flex-col justify-center items-center ${
            selectedRole == "volunteer" ? "border-blue-500" : ""
          }`}
        >
          <FaHandshakeAngle className="text-4xl md:text-6xl" />
          <p className="font-semibold text-xl md:text-3xl">Volunteer</p>
        </button>

        <button
          onClick={() => setSelectedRole("donor")}
          className={`border-4 rounded-xl py-4 px-20 flex flex-col justify-center items-center ${
            selectedRole === "donor" ? "border-blue-500" : ""
          }`}
        >
          <FaHandHoldingHeart className="text-4xl md:text-6xl" />
          <p className="font-semibold text-xl md:text-3xl">Donor</p>
        </button>

        <button
          onClick={() => setSelectedRole("ngo")}
          className={`border-4 rounded-xl py-4 px-20 flex flex-col justify-center items-center ${
            selectedRole === "ngo" ? "border-blue-500" : ""
          }`}
        >
          <FaBuildingNgo className="text-4xl md:text-6xl" />
          <p className="font-semibold text-xl md:text-3xl">NGO</p>
        </button>
      </div>

      <div className="flex items-start justify-center">
        <Button
          onClick={() => {
            handleRoleUpdate();
          }}
          colorScheme="blue"
          size="lg"
          rightIcon={<FaArrowRightLong />}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
