import { UserRole } from "../lib/types";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../lib/assets/picture/eth.png";
import Navbar from "../components/navbar/Navbar";
import { useUser } from "../providers/UserProvider";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import RegistrationModal from "../components/RegistrationModal/Registration";
import Lottie from "react-lottie";
import animationData from "../lib/assets/crypto.json"

// 1. if it is connected
// 2. read from the contract
// 3. if the address is not registered open the registration Modal
// 4. if the address is registered as a Hospital, navigate to the hospital page
// 5. if the address is registered as a Patient, navigate to the patient page

export default function Landing() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    // rendererSettings: {
    // preserveAspectRatio: "xMidYMid slice"
    // }
  };

  const navigate = useNavigate();

  const {
    role: { type },
    account: { isConnected },
  } = useUser();
  const { openConnectModal } = useConnectModal();
  const [isRegister, setIsRegister] = useState(false);

  const onClick = function () {
    if (isConnected) navigate("/app");
    else if (openConnectModal) openConnectModal();
    else console.log("landing button click nothing");
  };

  useEffect(() => {
    if (isConnected && type === UserRole.UNREGISTERED) setIsRegister(true);
  }, [isConnected, type]);

  return (
    <div
      className="h-screen flex flex-col 
			bg-[url('../public/Foil.jpg')] bg-no-repeat bg-cover bg-center bg-fixed"
      style={{
        minHeight: "670px",
      }}
    >
      <Navbar />

      {isRegister && <RegistrationModal />}

      <div className="flex items-center justify-around px-32 flex-1">
        <div className="">
          <h1 className="font-black text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-500 to-orange-300">
            Protect your
            <br />
            medical privacy
            <br />
            at all cost
          </h1>
          <br />
          <h1 className="text-[#81AFDD] font-bold text-lg">
            Share the information that you want safely by <br />
            using Zero Knowledge Proof
          </h1>

          <Button
            paddingX="1.5rem"
            marginTop="1.5rem"
            colorScheme="purple"
            onClick={onClick}
          >
            {isConnected ? "Open app" : "Log in"}
          </Button>
        </div>

        <div className="h-[700px]">
          <Lottie options={defaultOptions} />
        </div>
      </div>
    </div>
  );
}
