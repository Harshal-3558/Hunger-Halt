import { Button, Checkbox, Input, useToast } from "@chakra-ui/react";
import RadioCard from "./RadioCard";
import WorkingLocation from "./WorkingLocation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SelectRole() {
  const [role, setRole] = useState("donor");
  const [location, setLocation] = useState([]);
  const [org, setOrg] = useState("");
  const [days, setDays] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const toast = useToast();
  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setDays((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  async function onSubmit() {
    console.log(role, location, org, days);
    const response = await fetch(
      `${import.meta.env.VITE_HOST}/user/updateDetails`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user._id,
          role,
          location,
          org,
          days,
        }),
      }
    );
    if (response.ok) {
      toast({
        title: "Details updated successfully",
        status: "success",
        position: "top",
        duration: 1000,
      });
      navigate(`/${role}`);
    } else {
      toast({
        title: "Something went wrong",
        status: "error",
        position: "top",
        duration: 1000,
      });
    }
  }

  return (
    <div>
      <div className="flex justify-center items-center py-7">
        <div className="p-6 rounded-xl border shadow-xl md:space-y-7 space-y-6 w-[400px] md:w-[500px]">
          <div className="flex-row space-y-7">
            <h1 className="md:text-3xl text-2xl font-bold text-center">
              Update Details
            </h1>
            <div className="space-y-2">
              <p className="text-lg font-semibold text-gray-500">
                Select your role
              </p>
              <RadioCard setRole={setRole} />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold text-gray-500">
                Enter your Organization name
              </p>
              <Input
                variant={"filled"}
                onChange={(e) => {
                  setOrg(e.target.value);
                }}
                placeholder="e.g. your org"
              />
            </div>
            {role === "volunteer" && (
              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-500">
                  Select your working days
                </p>
                <div className="flex flex-col justify-center items-center">
                  <div className="space-x-7 md:space-x-12">
                    <Checkbox
                      size={"lg"}
                      value={"mon"}
                      onChange={handleCheckboxChange}
                    >
                      Mon
                    </Checkbox>
                    <Checkbox
                      size={"lg"}
                      value={"tue"}
                      onChange={handleCheckboxChange}
                    >
                      Tue
                    </Checkbox>
                    <Checkbox
                      size={"lg"}
                      value={"wed"}
                      onChange={handleCheckboxChange}
                    >
                      Wed
                    </Checkbox>
                    <Checkbox
                      size={"lg"}
                      value={"thr"}
                      onChange={handleCheckboxChange}
                    >
                      Thr
                    </Checkbox>
                  </div>
                  <div className="space-x-7 md:space-x-12">
                    <Checkbox
                      size={"lg"}
                      value={"fri"}
                      onChange={handleCheckboxChange}
                    >
                      Fri
                    </Checkbox>
                    <Checkbox
                      size={"lg"}
                      value={"sat"}
                      onChange={handleCheckboxChange}
                    >
                      Sat
                    </Checkbox>
                    <Checkbox
                      size={"lg"}
                      value={"sun"}
                      onChange={handleCheckboxChange}
                    >
                      Sun
                    </Checkbox>
                  </div>
                </div>
              </div>
            )}
            {role === "volunteer" && (
              <WorkingLocation setLocation={setLocation} />
            )}
          </div>
          <div>
            <Button colorScheme="blue" width={"full"} onClick={onSubmit}>
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
