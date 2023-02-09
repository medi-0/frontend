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

export interface selectedRows {
  selectedKey: string;
  selectedValue: string;
  proof: Number[];
}

export interface JsonFileContentType {
  entityAddress: string;
  address: string;
  certName: string;
  certHash: string;
  selectedRows: selectedRows[];
}

export default function QrPanel() {

  const handleVerifyButton = async () => {
    setIsLoading(true);
    try {
      if (posts !== undefined) {
        const flattenedResult = posts.flatMap((content1) => {
          return content1.selectedRows.map((row) => {
            return {
              row_title: row.selectedKey,
              row_content: row.selectedValue,
              commitment: content1.certHash,
              proof: row.proof,
            };
          });
        });
        const bulkRequest = flattenedResult.map((file) =>
          axios.post<{ valid: boolean }>(
            "https://medi0backendrusty.spicybuilds.xyz/verify-proof",
            file
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

  const [posts, setPosts] = useState<JsonFileContentType[]>([]);

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
          posts.map((file) => {
            // // print file contents
            // file.selectedRows.map((file1) => {
            //   // console.log(file1.selectedKey);
            //   // console.log(file1.selectedValue);
            //   const proofStr = file1.proof.toString().slice(0, 10) + "...";

            //   console.log(`proof: ${proofStr}`);
            // });
            return (
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
                        {/* <Box>
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
                          </Box> */}
                        <Box>
                          <Heading
                            size="xs"
                            textTransform="uppercase"
                            className="text-[#0F6292]"
                          >
                            Address
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            {file.address}
                          </Text>
                        </Box>
                        <Box>
                          <Heading
                            size="xs"
                            textTransform="uppercase"
                            className="text-[#0F6292]"
                          >
                            Cert Name
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            {file.certName}
                          </Text>
                        </Box>
                        <Box>
                          <Heading
                            size="xs"
                            textTransform="uppercase"
                            className="text-[#0F6292]"
                          >
                            Cert Hash
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            {file.certHash}
                          </Text>
                        </Box>
                        <Box>
                          {file.selectedRows.map((file1) => {
                            return (
                              <>
                                <Stack divider={<StackDivider />} spacing="4">
                                  <Box>
                                    <Heading
                                      size="xs"
                                      textTransform="uppercase"
                                      className="text-[#0F6292]"
                                    >
                                      Name
                                    </Heading>
                                    <Text pt="2" fontSize="sm">
                                      {file1.selectedKey}
                                    </Text>
                                  </Box>
                                  <Box>
                                    <Heading
                                      size="xs"
                                      textTransform="uppercase"
                                      className="text-[#0F6292]"
                                    >
                                      Value
                                    </Heading>
                                    <Text pt="2" fontSize="sm">
                                      {file1.selectedValue}
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
                                          {file1.proof.toString()}
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
            );
          })
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



