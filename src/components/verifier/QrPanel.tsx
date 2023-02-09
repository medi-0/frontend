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
} from "@chakra-ui/react";

import axios from "axios";
import React, { useEffect, useState } from "react";
import QrReader from "react-qr-reader";

export default function QrPanel() {

  const [showButton, setShowButton] = useState(false)

  function handleClick() {
    setShowButton(true);
    fetchData();
    onClose();
  }


  const { isOpen, onOpen, onClose } = useDisclosure();

  const [posts, setPosts] = useState<any[]>([]);

  const fetchData = async () => {
    const { data } = await axios.get(`https://${result}.ipfs.w3s.link/`);

    setPosts(data);
  };

  const [result, setResult] = useState("No result");

  let handleScan = (data: React.SetStateAction<any>) => {
    if (data) {
      setResult(data);
    }
  };

  let handleError = (err: any) => {
    alert(err);
  };

  return (
    <div>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex justify-center items-center">
              <div className="border border-solid w-80">
                <QrReader
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: "100%" }}
                  facingMode="environment"
                />
                <p>IPFS id = {result}</p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleClick}>
              Generate proof
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h5 className="text-center font-bold">{post.title}</h5>
            <p className="text-center">{post.body}</p>
            <br />
          </div>
        ))}
      </div>
      {showButton && (
        <button
          className="border boder-solid rounded-full 
      w-[150px] h-[50px] font-bold bg-lime-200 my-[20px]"
        >
          Verify Proof
        </button>
      )}
    </div>
  );
}
