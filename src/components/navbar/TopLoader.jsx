import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const TopLoader = () => {
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setProgress(30); // Start loading
    return () => setProgress(100); // End loading
  }, [location]);

  return (
    <LoadingBar
      color="#f11946"
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
    />
  );
};

export default TopLoader;
