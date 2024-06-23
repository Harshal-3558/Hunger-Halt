import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function VolunteerUpdates({ user }) {
  const [updates, setUpdates] = useState(null);

  async function handleData() {
    const response = await fetch(
      `${import.meta.env.VITE_HOST}/user/volunteerUpdates`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
        }),
      }
    );
    const data = await response.json();
    setUpdates(data);
  }
  useEffect(() => {
    handleData();
  }, []);

  async function handleSubmit(id, donationID) {
    console.log(id);
    const response = await fetch(
      `${import.meta.env.VITE_HOST}/user/assignVolunteer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          id,
          donationID,
        }),
      }
    );
    if (response.ok) {
      handleData();
      console.log("done");
    }
  }

  return (
    <div className="h-32 md:h-[450px] w-full md:w-[600px] bg-slate-200 border rounded-xl p-4 space-y-2">
      <h1 className="text-2xl font-semibold">Your Work Updates</h1>
      {updates &&
        updates.map((items) => (
          <div key={items._id} className="p-2 bg-white rounded-lg space-y-2">
            <div>
              <div className="font-semibold text-lg">
                Donor Name : {items.donorName}
              </div>
              <div className="font-semibold text-lg">
                Donor Address : {items.donorAddress}
              </div>
            </div>
            <div className="flex space-x-2 justify-end">
              <Button>View Details</Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleSubmit(items._id, items.donationID);
                }}
              >
                Take Job
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
}

VolunteerUpdates.propTypes = {
  user: PropTypes.object,
};
