// import { useState, useEffect, useRef } from "react";
// import {
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure,
//   FormControl,
//   FormLabel,
//   Input,
// } from "@chakra-ui/react";
import { FaCirclePlus } from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
// import SubmitButton from "./SubmitButton";
// import { handleGetLocation, initializeMap } from "../../../map/getLocation";
// import WorkingLocation from "../../auth/WorkingLocation";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function RequestCorpus() {
  const [requested,setRequested] = useState(false)

  return (
    <div>
      <button
        className={`h-32 md:h-full w-full md:w-full border rounded-xl flex flex-col justify-center items-center space-y-3 transition duration-300 ease-in-out ${requested ? 'bg-green-500' : 'bg-slate-200'}`}
        onClick={() => setRequested((prev)=>!prev)}
      >
        <div>
          {requested ? (
            <FiCheckCircle className="text-[30px] font-extrabold" />
          ) : (
            <FaCirclePlus className="text-[30px] font-extrabold" />
          )}
        </div>
        <div>
          <p className="text-base md:text-xl">{requested ? 'Request Added' : 'Request for Corpus'}</p>
        </div>
      </button>
    </div>
  );
}
