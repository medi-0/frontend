
import { useDisclosure } from "@chakra-ui/react";
import { Contract } from "ethers";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import ConnectWallet from "../components/connectWallet/ConnectWallet";
import Navbar from "../components/navbar/Navbar";
import Registration from "../components/RegistrationModal/Registration";
import RegistrationModal from "../components/RegistrationModal/Registration";
import img from "../lib/assets/picture/eth.png";
// import ABI from "../"

// 1. if it is connected
  // 2. read from the contract
  // 3. if the address is not registered open the registration Modal
  // 4. if the address is registered as a Hospital, navigate to the hospital page
  // 5. if the address is registered as a Patient, navigate to the patient page

export default function Landing() {

  
  const { address, connector, isConnected } = useAccount();

  const navigate = useNavigate();

  // useEffect(() => {
  //   if(isConnected) {
  //     onFirstOpen();
  //   }
  // }, [isConnected]);



 

  return (
    <div>
      <div className="h-[800px] flex items-center justify-around px-32">
        <div>
          <h1 className="font-black text-transparent text-7xl bg-clip-text bg-gradient-to-r from-purple-500 to-orange-300">
            Protect your privacy <br />
            at all cost with <br />
            Zk Form
          </h1>
          <br />
          <h1 className="text-[#81AFDD] font-bold text-lg">
            Share the information that you want safely by <br />
            using Zero Knowledge Proof
          </h1>
          <br />

          {/* <button className="pb-[5px] text-center border border-solid rounded-full w-[150px] h-[60px] bg-[#60DA9A] text-[#fff] text-2xl font-semibold"
          onClick={onOpen}>
            Open App
          </button>
          {isOpen && <MyModal isOpen={isOpen} onClose={onClose} />} */}

          {/* {isConnected ? (
          <></>
        ) : (
          <>
            
          </>
        )} */}

        {isConnected ? (
          <>
            <RegistrationModal/>
          </>
        ) : (
          <></>
        )}
          
          
        </div>
        <div>
          <h1>
            <img className="" src={img} alt=""  width={700} height={700} />
          </h1>
        </div>
      </div>
    </div>
  );
}


