import { useState, useEffect, useRef } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FaCirclePlus } from "react-icons/fa6";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import SubmitButton from "./SubmitButton";
import { handleGetLocation, initializeMap } from "../../../../map/getLocation";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function CreateHungerSpot() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [qty, setQty] = useState("");
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const removeMap = initializeMap(mapContainerRef, location);

    return () => {
      if (removeMap) removeMap();
    };
  }, [location]);

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "nwusbo91"); // Replace 'your_preset_here' with your Cloudinary upload preset

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dgz3kwpsj/image/upload",
        {
          // Replace 'your_cloudinary_name' with your Cloudinary cloud name
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);
      setImage(data.secure_url); // Store the URL of the uploaded image in state
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  return (
    <div>
      <div>
        <button
          className="h-32 md:h-44 w-full md:w-[600px] bg-slate-200 border rounded-xl flex flex-col justify-center items-center space-y-3"
          onClick={onOpen}
        >
          <div>
            <FaCirclePlus className="text-[30px]" />
          </div>
          <div>
            <p className="text-xl">Create new Hunger Spot</p>
          </div>
        </button>

        <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Enter Hunger Spot details</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <FormLabel>Required Food Qauntity (Approx)</FormLabel>
                <Input
                  type="number"
                  placeholder="in kg"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Upload Image of location</FormLabel>
                <input
                  onChange={handleImageUpload}
                  accept="image/*"
                  type="file"
                  className="block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:disabled:opacity-50 file:disabled:pointer-events-none"
                />
                {image && (
                  <img
                    src={image}
                    alt="Uploaded"
                    style={{
                      width: "30%",
                      marginTop: "20px",
                      borderRadius: "10px",
                    }}
                  />
                )}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Current Location</FormLabel>
                <Input
                  isReadOnly={true}
                  value={address && `${address}`}
                  placeholder="Your current address"
                />
                <Button
                  marginTop={3}
                  onClick={() => {
                    handleGetLocation(setLocation, setAddress);
                  }}
                  colorScheme="teal"
                  mb={2}
                >
                  Get Current Location
                </Button>
              </FormControl>
              <div>
                {location && (
                  <div
                    ref={mapContainerRef}
                    style={{
                      height: "300px",
                      width: "100%",
                      borderRadius: "10px",
                    }}
                  ></div>
                )}
              </div>
            </ModalBody>

            <ModalFooter>
              <SubmitButton
                location={location}
                address={address}
                requiredQTY={qty}
                onClose={onClose}
                image={image}
              />
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
