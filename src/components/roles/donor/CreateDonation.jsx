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
import { handleGetLocation, initializeMap } from "../../../map/getLocation";
import WorkingLocation from "../../auth/WorkingLocation";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function CreateDonation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [foodName, setFoodName] = useState("");
  const [qty, setQty] = useState("");
  const [person, setPerson] = useState("");
  const [shelfLife, setShelfLife] = useState("");
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const removeMap = initializeMap(mapContainerRef, location);

    return () => {
      if (removeMap) removeMap();
    };
  }, [location]);

  return (
    <div>
      <button
        className="h-32 md:h-36 w-full md:w-full bg-slate-200 border rounded-xl flex flex-col justify-center items-center space-y-3"
        onClick={onOpen}
      >
        <div>
          <FaCirclePlus className="text-[30px]" />
        </div>
        <div>
          <p className="text-base md:text-xl">Create new donation</p>
        </div>
      </button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "full", md: "3xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter food details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Food name</FormLabel>
              <Input
                type="text"
                placeholder="e.g Pav Bhaji"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                onKeyPress={(e) => {
                  if (!/[a-zA-Z ]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Food Quantity</FormLabel>
              <Input
                type="number"
                placeholder="in kg"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>No. of Beneficiary can be fullfilled</FormLabel>
              <Input
                type="number"
                placeholder="persons"
                value={person}
                onChange={(e) => setPerson(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Food shelf life (Approx)</FormLabel>
              <Input
                type="number"
                placeholder="in hours"
                value={shelfLife}
                onChange={(e) => setShelfLife(e.target.value)}
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
            <div>
              {location && (
                <div
                  ref={mapContainerRef}
                  className="h-64 md:h-[300px] w-full rounded-xl"
                ></div>
              )}
            </div>
          </ModalBody>

          <ModalFooter>
            <SubmitButton
              location={location}
              address={address}
              foodName={foodName}
              qty={qty}
              shelfLife={shelfLife}
              person={person}
              onClose={onClose}
            />
            <Button
              onClick={() => {
                console.log(location);
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
