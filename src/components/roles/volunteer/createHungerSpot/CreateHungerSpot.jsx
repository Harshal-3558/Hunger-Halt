import { useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { FaCirclePlus } from "react-icons/fa6";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import SubmitButton from "./SubmitButton";
import { handleGetLocation } from "../../../../map/getLocation";
import WorkingLocation from "../../../auth/WorkingLocation";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function CreateHungerSpot() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [beneficiaries, setBeneficiaries] = useState(0);
  const [disableButton, setDisableButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hash, setHash] = useState("");
  const toast = useToast();

  async function checkImage(image) {
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_HOST}/volunteer/checkHungerSpot`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image,
        }),
      }
    );
    const data = await response.json();
    return data;
  }

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    const file = files[0];
    const reader = new FileReader();
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "nwusbo91");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dgz3kwpsj/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setImage(data.secure_url);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }

    reader.onload = async () => {
      const base64Image = reader.result;
      const value = await checkImage(base64Image);
      if (value.success) {
        toast({
          title: value.message,
          status: "success",
          position: "top",
        });
        setLoading(false);
        setDisableButton(false);
        setHash(value.hash);
      } else {
        toast({
          title: value.message,
          status: "error",
          position: "top",
        });
        setDisableButton(true);
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div>
        <button
          className="h-32 md:h-36 w-full md:w-full bg-slate-200 border rounded-xl flex flex-col justify-center items-center space-y-2 md:space-y-3"
          onClick={onOpen}
        >
          <div>
            <FaCirclePlus className="text-[30px] md:text-[40px]" />
          </div>
          <div>
            <p className="text-base md:text-xl">Register Hunger Spot</p>
          </div>
        </button>

        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={{ base: "full", md: "3xl" }}
          isCentered={true}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Enter Hunger Spot details</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <FormLabel>Number of Beneficiaries</FormLabel>
                <Input
                  type="number"
                  placeholder="in kg"
                  value={beneficiaries}
                  onChange={(e) => setBeneficiaries(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Enter Location</FormLabel>
                <WorkingLocation
                  setLocation={setLocation}
                  value={address && `${address}`}
                  setAddress={setAddress}
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
              <FormControl mt={4}>
                <FormLabel>Upload Image of location</FormLabel>
                <input
                  onChange={handleImageUpload}
                  accept="image/*"
                  type="file"
                  className="block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:disabled:opacity-50 file:disabled:pointer-events-none"
                />
              </FormControl>
              {/* Image Preview */}
              {image && (
                <div className="mt-4">
                  <img
                    src={image}
                    alt="Uploaded location"
                    className="w-44 h-auto rounded-lg"
                  />
                </div>
              )}
            </ModalBody>

            <ModalFooter>
              <SubmitButton
                location={location}
                address={address}
                beneficiaries={beneficiaries}
                onClose={onClose}
                image={image}
                disableButton={disableButton}
                loading={loading}
                hash={hash}
              />
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
