import Image from "next/image";
import loading from "@/../public/images/loading.gif";

const Loading = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <Image src={loading} alt="loading" />
    </div>
  );
};

export default Loading;
