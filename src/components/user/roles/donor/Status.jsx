import { Badge } from "@chakra-ui/layout";
import PropTypes from "prop-types";

export default function Status({ updates }) {
  return (
    <div>
      {updates === "not verified" && (
        <Badge colorScheme="purple">Not Verified</Badge>
      )}
      {updates === "verified" && (
        <Badge colorScheme="green">Verified</Badge>
      )}
      {updates === "pending" && (
        <Badge colorScheme="red">Pending</Badge>
      )}
    </div>
  );
}

Status.propTypes = {
  updates: PropTypes.string,
};
