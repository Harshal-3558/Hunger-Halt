import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function WorkDetailsModal({ isOpen, onClose, donationID }) {
  const [detail, setDetail] = useState(null);
  useEffect(() => {
    async function handleData() {
      const response = await fetch(
        `${import.meta.env.VITE_HOST}/user/volunteerUpdatesDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            donationID,
          }),
        }
      );
      const value = await response.json();
      console.log(value)
      setDetail(value);
    }
    handleData();
  }, [donationID]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={"true"}>
      <ModalOverlay />
      <ModalContent maxWidth="500px" width="95%">
        <ModalHeader>Doantion Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {detail && (
            <div className="space-y-1">
              <div>Food Name : {detail.foodName}</div>
              <div>Donor Name : {detail.donorName}</div>
              <div>Donor Email : {detail.donorEmail}</div>
              <div>Food Shelf Life : {detail.shelfLife}</div>
              <div>Donor Address : {detail.address}</div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

WorkDetailsModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  donationID: PropTypes.string,
};
