import mapboxgl from "mapbox-gl";
export function handleGetLocation(setLocation, setAddress) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ longitude, latitude });
        console.log(location);

        // Fetch address using Mapbox API
        try {
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${
              import.meta.env.VITE_MAPBOX_API_KEY
            }`
          );
          const data = await response.json();
          if (data.features && data.features.length > 0) {
            setAddress(data.features[0].place_name);
          } else {
            setAddress("Address not found");
          }
        } catch (error) {
          console.error("Error fetching address:", error);
          setAddress("Error fetching address");
        }
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      { enableHighAccuracy: true }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

export function initializeMap(mapContainerRef, location) {
  if (location) {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [location.longitude, location.latitude],
      zoom: 12,
    });

    new mapboxgl.Marker()
      .setLngLat([location.longitude, location.latitude])
      .addTo(map);

    return () => map.remove();
  }
}
