import QRCodeStyling from "qr-code-styling";
import bird from "../assets/bird.png";
import { useEffect, useRef } from "react";

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  image: bird,
  dotsOptions: {
    color: "#4caf50",
    type: "rounded",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 20,
  },
  data: `https://0204-165-124-85-12.ngrok-free.app/flappy/phone/`,
});

const QRCode = ({ pid }) => {
  const ref = useRef(null);
  useEffect(() => {
    qrCode.append(ref.current);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: `https://0204-165-124-85-12.ngrok-free.app/flappy/phone/${pid}`,
    });
  }, [pid]);

  return <div ref={ref}></div>;
};

export default QRCode;
