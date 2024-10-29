import { FaCirclePlus } from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function RequestCorpus() {
  const [requested,setRequested] = useState(false)
  const toast = useToast()

  const handleRequest = () => {
    setRequested((prev)=>!prev)
    toast({
      position: "top",
      title: requested ? 'Request Removed' : 'Request Added',
      description: requested ? "Your corpus request has been removed" : "Your corpus request has been added",
      status: requested ? 'info' : 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <div>
      <button
        className={`h-32 md:h-full w-full md:w-full border rounded-xl flex flex-col justify-center items-center space-y-3 transition duration-300 ease-in-out ${requested ? 'bg-green-500' : 'bg-slate-200'}`}
        onClick={handleRequest}
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