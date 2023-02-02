import img1 from "../../Lib/assets/Hospital.jpg";
import img2 from "../../Lib/assets/Checklist.jpg";
import ABI from "../../Lib/assets/message.json";
import Connect from "../connectWallet/ConnectHospital";
import { useAccount, useBalance,useContract ,useContractRead } from "wagmi";
import ConnectHospital from "../connectWallet/ConnectHospital";
import ConnectPatient from "../connectWallet/ConnectPatient";
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
} from "@chakra-ui/react";




function Login() {

  // const {config} = usePrepareContractWrite({
  //   address: "0xf86EaD782f5e14EA54e4E34cB8b21DFD924573dd",
  //   functionName: "Write contract",
  //   abi: ABI,
  //   args: []


  // })
  // const mediContract: string = '0xf86EaD782f5e14EA54e4E34cB8b21DFD924573dd' 
  // const { data, isError, isLoading } = useContractRead(
  //   {
  //     addressOrName: mediContract,
  //     abi: ABI,
  //     args: [
  //       'hospital'
  //     ]
  //   },
    
  // )

  









  const { isOpen, onOpen, onClose } = useDisclosure();

  const { address, connector, isConnected } = useAccount();

  // const { data, isError, isLoading } = useBalance({
  //   address: address,
  // });

  return (

    <div>
      <>
        <button
          className="border border-solid rounded-full w-[150px] h-[50px] bg-[#F98E7C] text-[#3DF9E2]"
          onClick={onOpen}
        >
          Connect Wallet
        </button>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent maxH="1000px" maxW="1000px">
            <h1 className="text-[#396AEB] text-2xl font-bold m-10">
              Choose Side
            </h1>
            <ModalCloseButton />
            <ModalBody maxH="1000px" maxW="1000px">
              <div className="flex justify-center items-center">
                <div className="text-center">
                  <img src={img1} width={300} height={300} alt="" />

    
                  <button
                    className="border border-solid rounded-full w-40 h-10 my-10"
                    onClick={onClose}
                  >
                    <ConnectHospital/>
                  </button>


                </div>
                <div className="h-[300px] w-px bg-slate-200 mx-20">
                  <h1></h1>
                </div>
                <div className="text-center">
                  <img src={img2} width={300} height={300} alt="" />


                  <button
                    className="border border-solid rounded-full w-40 h-10 my-10 "
                    onClick={onClose}
                  >
                    <ConnectPatient/>
                  </button>

                  
                  {/* <button className="border border-solid border-red-700 rounded-full w-[100px] h-[40px] bg-[#60DA9A] text-[#fff] text-sm">Register as FP</button> */}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </div>
  );
}

export default Login;
