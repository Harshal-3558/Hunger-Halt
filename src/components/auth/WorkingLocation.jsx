import { Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import PropTypes from "prop-types";

const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function WorkingLocation({ setLocation, value, setAddress }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Ensure value is not undefined or null
    setQuery(value || "");
  }, [value]);

  useEffect(() => {
    if (query.length > 2) {
      const fetchSuggestions = async () => {
        try {
          const response = await fetch(
            `https://api.mapbox.com/search/searchbox/v1/suggest?q=${query}&session_token=0d003885-fedd-4db1-8903-3db30550c305&access_token=${mapboxToken}&language=en&limit=4&country=IN`
          );
          const data = await response.json();
          setSuggestions(data.suggestions);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      };
      fetchSuggestions();
    }
  }, [query]);

  const handleSuggestionClick = async (suggestion) => {
    const id = suggestion.mapbox_id;
    const response = await fetch(
      `https://api.mapbox.com/search/searchbox/v1/retrieve/${id}?session_token=0d003885-fedd-4db1-8903-3db30550c305&access_token=${mapboxToken}`
    );
    const data = await response.json();
    console.log(data.features[0].properties.full_address);
    setAddress(`${data.features[0].properties.name},${data.features[0].properties.full_address}`);
    setLocation(data.features[0].geometry.coordinates);
    setQuery(suggestion.name);
    setSuggestions([]);
  };

  return (
    <div>
      <Input
        value={query}
        variant={"filled"}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your location"
      />
      {suggestions && suggestions.length > 0 && (
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
                <FaLocationArrow size={20} />
                <div>
                  <p className="font-semibold text-sm">{suggestion.name}</p>
                  <p className="text-xs">
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
  );
}

WorkingLocation.propTypes = {
  setLocation: PropTypes.array,
  value: PropTypes.string,
  setAddress: PropTypes.string,
};

WorkingLocation.defaultProps = {
  value: "",
};
