// Modal.tsx
import img1 from "../../Lib/assets/Hospital.jpg";
import img2 from "../../Lib/assets/Checklist.jpg";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ModalHeader,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MyModal: React.FC<Props> = ({ isOpen, onClose }) => {
  

  const {
    isOpen: isSecondOpen,
    onOpen: onSecondOpen,
    onClose: onSecondClose,
  } = useDisclosure();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  

  const registerHospital =() =>{
    // onClose();
    onSecondOpen();
}

  const handleHospital = () => {
    navigate("/Hospital");
    onSecondClose();

  };

  // const handleOpenInnerModal = () => {
  //   onClose();
  //   onSecondClose();
  // };

  const navigate = useNavigate();

  const handlePatient = () => {
    navigate("/Patient");
    onClose();
  };

  return (
    <div>
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
                    onClick={registerHospital}
                  >
                    Register Hospital
                  </button>


              </div>
              <div className="h-[300px] w-px bg-slate-200 mx-20">
                <h1></h1>
              </div>
              <div className="text-center">
                <img src={img2} width={300} height={300} alt="" />

                <button
                  className="border border-solid rounded-full w-40 h-10 my-10"
                  onClick={handlePatient}
                >
                  Register Patient
                </button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isSecondOpen} onClose={onSecondClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
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
              <Button colorScheme="blue" mr={3} onClick ={handleHospital}>
                Save
              </Button>
              <Button onClick={onSecondClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </div>
  );
};

export default MyModal;
