import BeatLoader from "react-spinners/BeatLoader";

export default function Loader() {
  return (
    <div className="h-[80vh] flex justify-center items-center">
      <BeatLoader color="teal" loading={true} size={50} />
    </div>
  );
}
