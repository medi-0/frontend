import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Box,
  Text,
  Center,
  Accordion,
  AccordionPanel,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast, 
} from "@chakra-ui/react";

import axios from "axios";
import React, { useEffect, useState } from "react";
import QrReader from "react-qr-reader";
import { useAccount } from "wagmi";

export interface selectedRows {
  selectedKey: string;
  selectedValue: string;
  proof: Number[];
}

export interface JsonFileContentType {
  hash: string;
  patientAddress: string;
  fileName: string;
  hospitalAddress: string;
  selectedRows: selectedRows[];
}

export default function QrPanel() {

  
  const { address, isConnected, connector } = useAccount();

  const handleVerifyButton = async () => {
    setIsLoading(true);

    try {
      if (posts !== undefined) {
        const bulkRequest = posts.selectedRows.map((row) =>
          axios.post<{ valid: boolean }>(
            "https://medi0backendrusty.spicybuilds.xyz/verify-proof",
            {
              row_title: row.selectedKey,
              row_content: row.selectedValue,
              commitment: posts.hash,
              proof: row.proof,
            }
          )
        );
        const result = (await Promise.all(bulkRequest)).every(
          (res) => res.data.valid === true
        );

        if (result === true) {
          setIsLoading(false);
          handleVerified();
        } else {
          setIsLoading(false);
          handleNotVerified();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const toast = useToast();
  const handleVerified = () => {
    toast({
      title: "Verified",
      description: "Your proof is verified!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const handleNotVerified = () => {
    toast({
      title: "Not Verified",
      description: "Sorry, your proof is un-verified",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showButton, setShowButton] = useState(false);

  function handleClick() {
    setShowButton(true);
    fetchData();
    onClose();
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [posts, setPosts] = useState<JsonFileContentType>();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(result);
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
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
          <ModalHeader>Scan QR Code</ModalHeader>
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
                <p>{result}</p>
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
          {posts ? (
            <>
              <Box mt="2" mb="2">
                <Card>
                  <CardHeader>
                    <Heading className="font-black text-xl">
                      Proof Details
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Stack divider={<StackDivider />} spacing="4">
                      <Box>
                        <Heading
                          size="xs"
                          textTransform="uppercase"
                          className="text-[#0F6292]"
                        >
                          Verifier Address
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          {address}
                        </Text>
                      </Box>
                      <Box>
                        <Heading
                          size="xs"
                          textTransform="uppercase"
                          className="text-[#0F6292]"
                        >
                          Hash
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          {posts?.hash}
                        </Text>
                      </Box>
                      <Box>
                        <Heading
                          size="xs"
                          textTransform="uppercase"
                          className="text-[#0F6292]"
                        >
                          Patient Address
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          {posts?.patientAddress}
                        </Text>
                      </Box>
                      <Box>
                        <Heading
                          size="xs"
                          textTransform="uppercase"
                          className="text-[#0F6292]"
                        >
                          File Name
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          {posts?.fileName}
                        </Text>
                      </Box>
                      <Box>
                        <Heading
                          size="xs"
                          textTransform="uppercase"
                          className="text-[#0F6292]"
                        >
                          Hospital Address
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          {posts?.hospitalAddress}
                        </Text>
                      </Box>
                      <Box>
                        {posts?.selectedRows.map((file) => {
                          return (
                            <>
                              <Stack divider={<StackDivider />} spacing="4">
                                <Box>
                                  <Heading
                                    size="xs"
                                    textTransform="uppercase"
                                    className="text-[#0F6292]"
                                  >
                                    Selected Key
                                  </Heading>
                                  <Text pt="2" fontSize="sm">
                                    {file.selectedKey}
                                  </Text>
                                </Box>
                                <Box>
                                  <Heading
                                    size="xs"
                                    textTransform="uppercase"
                                    className="text-[#0F6292]"
                                  >
                                    Selected Value
                                  </Heading>
                                  <Text pt="2" fontSize="sm">
                                    {file.selectedValue}
                                  </Text>
                                </Box>
                                <Box>
                                  <Heading
                                    size="xs"
                                    textTransform="uppercase"
                                    className="text-[#0F6292]"
                                  >
                                    Generated Proof
                                  </Heading>
                                  <Accordion allowToggle>
                                    <AccordionItem borderColor={"white"}>
                                      <AccordionButton>
                                        <Box
                                        // as="span"
                                        // flex="1"
                                        // textAlign="left"
                                        >
                                          <Heading
                                            size="xs"
                                            textTransform="uppercase"
                                            className="border border-solid p-[10px] rounded-full bg-[#BDCDD6]"
                                          >
                                            Click to see Proof
                                          </Heading>
                                        </Box>
                                        <AccordionIcon />
                                      </AccordionButton>
                                      <AccordionPanel pb={4}>
                                        {file.proof.toString()}
                                      </AccordionPanel>
                                    </AccordionItem>
                                  </Accordion>
                                </Box>
                              </Stack>
                            </>
                          );
                        })}
                      </Box>
                    </Stack>
                  </CardBody>
                </Card>
              </Box>
            </>
          ) : (
            <></>
          )}
        </div>
   

      {showButton && (
        <Button
          isLoading={isLoading}
          onClick={handleVerifyButton}
          className="border boder-solid rounded-full 
      w-[150px] h-[50px] font-bold bg-lime-200 my-[20px]"
        >
          Verify Proof
        </Button>
      )}
    </div>
  );
}



