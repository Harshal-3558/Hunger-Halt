import { useRef, useEffect, useState } from "react";
import { SearchBox } from "@mapbox/search-js-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox } from "@chakra-ui/react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fetchAuthStatus } from "../../../../reduxStore/auth/authSlice";

const accessToken =
  "pk.eyJ1IjoiaGFyc2hhbDc5IiwiYSI6ImNsdjB3cWxuaDAwcWUybHQwM3lxZHBqbGUifQ.TDLyUaofeU9td8Ib7QIXHQ";

export default function VolunteerStatus() {
  const { user } = useSelector((state) => state.auth);
  const mapContainerRef = useRef();
  const mapInstanceRef = useRef();
  // eslint-disable-next-line no-unused-vars
  const [mapLoaded, setMapLoaded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    mapboxgl.accessToken = accessToken;
    mapInstanceRef.current = new mapboxgl.Map({
      container: mapContainerRef.current, // container ID
      center: [73.100279, 19.0013848], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    mapInstanceRef.current.on("load", () => {
      setMapLoaded(true);
    });
  }, [user]);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setCheckedItems((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleLocationSelect = async (location) => {
    setInputValue(location);
    // Geocode the location using the Mapbox Geocoding API
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          location
        )}.json?access_token=${accessToken}`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        setSelectedLocation({ lat, lng });
      }
    } catch (error) {
      console.error("Error fetching geocode data:", error);
    }
  };

  async function onSubmit() {
    console.log("Selected days:", checkedItems);
    console.log("Selected location:", selectedLocation);
    const response = await fetch(
      `${import.meta.env.VITE_HOST}/user/volunteerStatus`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: user.role,
          location: selectedLocation,
          days: checkedItems,
        }),
      }
    );
    if (response.ok) {
      toast.success("Your details updated");
      dispatch(fetchAuthStatus());
      navigate("/volunteer");
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
            <SearchBox
              accessToken={accessToken}
              map={mapInstanceRef.current}
              mapboxgl={mapboxgl}
              value={inputValue}
              options={{
                language: "en",
                country: "IN",
              }}
              onChange={handleLocationSelect}
              marker
            />
            <div
              className="border rounded-lg"
              id="map-container"
              ref={mapContainerRef}
              style={{ height: 300 }}
            />
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
