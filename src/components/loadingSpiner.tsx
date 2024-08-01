import type { FC } from "react";

const LoadingSpinner: FC = () => {
  return (
    <div className="animate-spin rounded-full h-5 w-5 border-t-2 mx-2 border-b-2 border-l-white  "></div>
  );
};

export default LoadingSpinner;
