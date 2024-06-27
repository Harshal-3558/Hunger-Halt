import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, Input } from "@chakra-ui/react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fetchAuthStatus } from "../../../../../reduxStore/auth/authSlice";
import { FaLocationArrow } from "react-icons/fa6";

const mapboxToken =
  "pk.eyJ1IjoiaGFyc2hhbDc5IiwiYSI6ImNsdjB3cWxuaDAwcWUybHQwM3lxZHBqbGUifQ.TDLyUaofeU9td8Ib7QIXHQ";

export default function VolunteerStatus() {
  const { user } = useSelector((state) => state.auth);
  const [checkedItems, setCheckedItems] = useState([]);
  const [coordinates, setCoordinates] = useState(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (query.length > 2) {
      const fetchSuggestions = async () => {
        try {
          const response = await fetch(
            `https://api.mapbox.com/search/searchbox/v1/suggest?q=${query}&session_token=0d003885-fedd-4db1-8903-3db30550c305&access_token=${mapboxToken}&language=en&limit=5&country=IN`
          );
          const data = await response.json();
          setSuggestions(data.suggestions);
          console.log(suggestions);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      };
      fetchSuggestions();
    }
  }, [query, suggestions]);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setCheckedItems((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleSuggestionClick = async (suggestion) => {
    const id = suggestion.mapbox_id;
    const response = await fetch(
      `https://api.mapbox.com/search/searchbox/v1/retrieve/${id}?session_token=0d003885-fedd-4db1-8903-3db30550c305&access_token=${mapboxToken}`
    );
    const data = await response.json();
    console.log(data.features[0].geometry.coordinates);
    setCoordinates(data.features[0].geometry.coordinates);
    setQuery(suggestion.name);
    setSuggestions([]);
  };

  async function onSubmit() {
    console.log("Selected days:", checkedItems);
    console.log("Selected location:", coordinates);
    const response = await fetch(
      `${import.meta.env.VITE_HOST}/user/volunteerStatus`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          location: coordinates,
          days: checkedItems,
        }),
      }
    );

    if (response.ok) {
      toast.success("Your details updated");
      dispatch(fetchAuthStatus());
      setTimeout(() => {
        navigate("/volunteer");
      }, 1000);
    } else {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="p-6 flex justify-center items-center">
      <div className=" w-[700px] p-4 border shadow-lg rounded-xl">
        <div className="flex justify-center">
          <h1 className="font-semibold text-2xl">Your Working Status</h1>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-lg font-medium mb-1">Select your working days</p>
            <div className="space-x-8">
              <Checkbox value={"mon"} size="lg" onChange={handleCheckboxChange}>
                Mon
              </Checkbox>
              <Checkbox value={"tue"} size="lg" onChange={handleCheckboxChange}>
                Tue
              </Checkbox>
              <Checkbox value={"wed"} size="lg" onChange={handleCheckboxChange}>
                Wed
              </Checkbox>
              <Checkbox value={"thr"} size="lg" onChange={handleCheckboxChange}>
                Thr
              </Checkbox>
              <Checkbox value={"fri"} size="lg" onChange={handleCheckboxChange}>
                Fri
              </Checkbox>
              <Checkbox value={"sat"} size="lg" onChange={handleCheckboxChange}>
                Sat
              </Checkbox>
              <Checkbox value={"sun"} size="lg" onChange={handleCheckboxChange}>
                Sun
              </Checkbox>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-lg font-medium mb-2">
              Select your working location
            </p>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your location"
              size="lg"
            />
            {suggestions.length > 0 && (
              <div className="mt-2 space-y-2 bg-slate-100 p-3 rounded-lg">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.mapbox_id}
                    onClick={() => {
                      handleSuggestionClick(suggestion);
                    }}
                    className="bg-white p-2 rounded-lg cursor-pointer"
                  >
                    <div className="flex space-x-2 items-center">
                      <FaLocationArrow size={25} />
                      <div>
                        <p className="font-semibold">{suggestion.name}</p>
                        <p>
                          {suggestion.full_address
                            ? suggestion.full_address
                            : suggestion.place_formatted}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 float-end">
          <Button onClick={onSubmit} colorScheme="teal">
            Update Details
          </Button>
        </div>
      </div>
    </div>
  );
}
