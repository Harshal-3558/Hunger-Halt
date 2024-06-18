import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

export default function LocationAlertDialog({ isOpen, onClose }) {
  const cancelRef = useRef();
  const navigate = useNavigate();

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Volunteer Status
            </AlertDialogHeader>

            <AlertDialogBody>
              Please update your working status and location
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClose();
                  navigate("/status");
                }}
                ml={3}
              >
                Update Now
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

LocationAlertDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.func.isRequired,
};
