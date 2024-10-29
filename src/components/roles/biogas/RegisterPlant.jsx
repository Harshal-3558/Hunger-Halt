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
// import { FaCirclePlus } from "react-icons/fa6";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import SubmitButton from "../donor/SubmitButton";
import { handleGetLocation, initializeMap } from "../../../map/getLocation";
import WorkingLocation from "../../auth/WorkingLocation";
import RegisterPlantButton from "./RegisterPlantButton";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function RegisterPlant() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [orgName, setOrgName] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [regno, setRegno] = useState("");
  // const [qty, setQty] = useState("");
  // const [person, setPerson] = useState("");
  // const [shelfLife, setShelfLife] = useState("");
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
        className="bg-teal-500 text-white py-2 px-7 hover:bg-teal-600 transition  rounded-3xl"
        onClick={onOpen}
      >
        {/* <div>
          <FaCirclePlus className="text-[30px]" />
        </div> */}
        <div>
          <p className="text-base md:text-xl">Get Involved Now</p>
        </div>
      </button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "full", md: "3xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Organization Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Enter Organization Name</FormLabel>
              <Input
                // placeholder="e.g Pav Bhaji"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Enter SPOC Phone No.</FormLabel>
              <Input
                type="number"
                // placeholder="in kg"
                value={phoneno}
                onChange={(e) => setPhoneno(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Enter Organization’s  Registration No.</FormLabel>
              <Input
                // type="number"
                // placeholder="Registration No"
                value={regno}
                onChange={(e) => setRegno(e.target.value)}
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
            {/* <FormControl mt={4}>
              <FormLabel>Current Location</FormLabel>
              <Input
                isReadOnly={true}
                value={address && `${address}`}
                placeholder="Your current address"
              />
            </FormControl> */}
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
            <RegisterPlantButton
              location={location}
              orgName={orgName}
              phoneno={phoneno}
              regno={regno}
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
