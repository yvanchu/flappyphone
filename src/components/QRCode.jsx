import QRCodeStyling from "qr-code-styling";
import bird from "../assets/bird.png";
import { useEffect, useRef } from "react";
import Constants from "../config.json";

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
  data: `${Constants["rootURL"]}/flappy/phone/`,
});

const QRCode = ({ pid }) => {
  const ref = useRef(null);
  useEffect(() => {
    qrCode.append(ref.current);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: `${Constants["rootURL"]}/flappy/phone/${pid}`,
    });
  }, [pid]);

  return <div ref={ref}></div>;
};

export default QRCode;
