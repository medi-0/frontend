import img1 from "../../lib/assets/picture/Hospital.jpg";
import img2 from "../../lib/assets/picture/Patient.jpg";
import Connect from "../connectWallet/ConnectWallet";
import {
  useAccount,
  useBalance,
  useContract,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import ConnectHospital from "../connectWallet/ConnectWallet";
// import ConnectPatient from "../connectWallet/ConnectPatient";
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
  FormControl,
  FormLabel,
  CardBody,
  Card,
  Stack,
  Heading,
  Text,
  Divider,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import path from "path";
import fs from "fs";
import { useNavigate } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import { Description } from "@ethersproject/properties";
import { url } from "inspector";
import { useMediCoreContract } from "../../lib/hooks/useMediCoreContract";
import { ContractTransaction } from "ethers";

// interface Result {
//   jsonrpc: string;
//   id: number;
//   result: string;
// }

function RegistrationModal() {
  // const {config} = usePrepareContractWrite({
  //   address: "0xf86EaD782f5e14EA54e4E34cB8b21DFD924573dd",
  //   functionName: "Write contract",
  //   abi: ABI,
  //   args: []
  // })
  // const { data, isError, isLoading } = useContractRead(
  //   {
  //     address: '0xf86EaD782f5e14EA54e4E34cB8b21DFD924573dd',
  //     abi: ABI,
  //     functionName: "HOSPITAL_ROLE",
  //     args: []
  //   }
  // )

  //---working---
  // const { data, isError, isLoading } = useContractRead(
  //   {
  //     address: '0xf86EaD782f5e14EA54e4E34cB8b21DFD924573dd',
  //     abi: ABI,
  //     functionName: "hospitals",
  //     args: [
  //       // this is a fake value
  //       '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4'
  //     ]
  //   }
  // )

  // const { data, isError, isLoading, write } = useContractWrite(
  //   {
  //     addressOrName: '0xf86EaD782f5e14EA54e4E34cB8b21DFD924573dd',
  //     abi: ABI,
  //     functionName :
  //   },
  //   'registerAsHospital'
  // )

  // const data2 = data as Result;
  // console.log(`isLoading: ${isLoading}`)
  // console.log(`isError: ${isError}`)
  // if (data2) {
  //   console.log(`data: ${data2.result}`)
  //   console.log(`data: ${data2.id}`)
  //   console.log(`data: ${data2.jsonrpc}`)
  // }

  // const callContract = () => {
  //   const {config} = usePrepareContractWrite({
  //     address: "0xf86EaD782f5e14EA54e4E34cB8b21DFD924573dd",
  //     abi: JSON.parse(fs.readFileSync(path.join(__dirname, "../Lib/assets/message.json"),"utf-8")),
  //     functionName: "registerAsHospital",
  //     args: [name , description],
  //   })
  // }

  // const navigate = useNavigate();

  const {
    isOpen: isFirstOpen,
    onOpen: onFirstOpen,
    onClose: onFirstClose,
  } = useDisclosure({ defaultIsOpen: true });

  const {
    isOpen: isSecondOpen,
    onOpen: onSecondOpen,
    onClose: onSecondClose,
  } = useDisclosure();

  

  const registerHospital = () => {
    onFirstClose();
    onSecondOpen();
  };

  const navigate = useNavigate();

  const handlePatient = () => {
    navigate("/Patient");
    onFirstClose();
  };



 
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { contract } = useMediCoreContract();

  // const [tx, setTx] = useState<ContractTransaction  | null>(null);
  // const { data} = useWaitForTransaction({
  //   hash: tx?.hash as (`0x${string}` | undefined)
  // })

  const handleHospital = () => {
    // contract?.registerAsHospital(name,description).then(tx => {
    //   setTx(tx)
    // });


    // navigate("/Hospital");
    // onSecondClose();
  };


  const { address } = useAccount();

  //
  // useEffect(() => {
  //   // console.log("tx completed", data)
  //   // contract?.hasRole()

  //   if (!contract || !address) return;

  //   Promise.all([
	// 		contract.hasRole(
	// 			// keccak(HOSPITAL_ROLE)
	// 			"0xc8f5b4140cca307cd927e59cbeea8291bffeee228fc677f0fa059aef7b4dd8d5",
	// 			address
	// 		),
	// 		contract.hasRole(
	// 			// keccak(PATIENT_ROLE)
	// 			"0x72606200fac42b7dc86b75901d61ecfab2a4a1a6eded478b97a428094891abed",
	// 			address
	// 		),
	// 	]).then(([isHospital, isPatient]) => {
	// 		console.log("double", isHospital, isPatient);

	// 		if (isHospital){
  //       navigate("/Hospital")
  //       console.log("tx completed", data)

  //     }
	// 		else if (isPatient) {
  //       navigate("/Patient")
  //       console.log("tx completed", data)
  //     }
	// 		else {};
	// 	})
  // }, [data])



  return (
    <>
      {/* <button
          className="border border-solid rounded-full w-[150px] h-[50px] bg-[#F98E7C] text-[#3DF9E2]"
          onClick={onFirstOpen}
        >
          Connect Wallet
        </button> */}

      <Modal isOpen={isFirstOpen} onClose={onFirstClose} isCentered>
        <ModalOverlay />
        <ModalContent maxH="1000px" maxW="1000px">
          <h1 className="text-[#396AEB] text-2xl font-bold m-10">
            Choose Side
          </h1>
          <ModalCloseButton />

          <ModalBody maxH="1000px" maxW="1000px">
            <div className="flex justify-around">
              <Card maxW="sm" className="tag">
                <CardBody>
                  <img src={img1} width={400} height={400} alt="" />
                  <Stack mt="6" spacing="3">
                    <div className="flex justify-center items-center flex-col">
                      <Heading size="md" className="mb-[10px]">
                        Register as Hospital
                      </Heading>
                      <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eligendi est dignissimos odit sit dolorum numquam
                        aliquid odio quo? Molestias, deserunt. Atque placeat
                        asperiores pariatur voluptatibus soluta? Sapiente
                        perferendis optio deleniti!
                      </Text>
                    </div>
                  </Stack>
                </CardBody>
                <div className="flex justify-center items-center py-[20px]">
                  <Button
                    onClick={registerHospital}
                    variant="solid"
                    colorScheme="blue"
                    className="w-[300px] flex button-start"
                  >
                    <div className="mr-[10px]">Register</div>
                    <ArrowForwardIcon className="arrow" />
                  </Button>
                </div>
              </Card>

              <Card maxW="sm" className="tag">
                <CardBody>
                  <img src={img2} width={400} height={400} alt="" />
                  <Stack mt="6" spacing="3">
                    <div className="flex justify-center items-center flex-col">
                      <Heading size="md" className="mb-[10px]">
                        Register as Patient
                      </Heading>
                      <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eligendi est dignissimos odit sit dolorum numquam
                        aliquid odio quo? Molestias, deserunt. Atque placeat
                        asperiores pariatur voluptatibus soluta? Sapiente
                        perferendis optio deleniti!
                      </Text>
                    </div>
                  </Stack>
                </CardBody>
                <div className="flex justify-center items-center py-[20px]">
                  <Button
                    onClick={handlePatient}
                    variant="solid"
                    colorScheme="blue"
                    className="w-[300px] flex button-start"
                  >
                    <div className="mr-[10px]">Register</div>
                    <ArrowForwardIcon className="arrow" />
                  </Button>
                </div>
              </Card>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>



      <Modal isOpen={isSecondOpen} onClose={onSecondClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register Hospital Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleHospital}>
              Save
            </Button>
            <Button onClick={onSecondClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default RegistrationModal;
