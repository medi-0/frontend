import { Button, Input, useMultiStyleConfig, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
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
} from "@chakra-ui/react";

import axios, { AxiosResponse } from "axios";

import { useAccount } from "wagmi";

// import { FileHasherProps } from "../../file-hasher-types";
// import { FileHash__factory } from "../../typechain-types";

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

export function UploadPanel() {
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

  const handleVerifyButton = async () => {
    setIsLoading(true);

    try {
      if (jsonFileContent !== undefined) {
        const bulkRequest = jsonFileContent.selectedRows.map((row) =>
          axios.post<{ valid: boolean }>(
            "https://medi0backendrusty.spicybuilds.xyz/verify-proof",
            {
              row_title: row.selectedKey,
              row_content: row.selectedValue,
              commitment: jsonFileContent.hash,
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

  const [showButton, setShowButton] = useState(false);

  const { address, isConnected, connector } = useAccount();
  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure();

  const styles = useMultiStyleConfig("Button", { variant: "outline" });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  // const [jsonFileContent, setJsonFileContent] =
  //   React.useState<JsonFileContentType[]>();
  const [jsonFileContent, setJsonFileContent] =
    React.useState<JsonFileContentType>();
  const uploadFile = async function (e: any) {
    setShowButton(true);
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      console.log(e);
      const result = e?.target?.result;
      console.log(result);
      // const jsonResult: JsonFileContentType[] = JSON.parse(result);
      const jsonResult: JsonFileContentType = JSON.parse(result);

      console.log(typeof jsonResult);
      setJsonFileContent(jsonResult);
      console.log(jsonResult);
    };
    reader.readAsText(e.target?.files[0]);
  };


  if (!isConnected)
    return (
      <Center>
        <Text>Please Connect wallet to proceed</Text>
      </Center>
    );
  return (
    <div>
      <div>
        <Input
          type="file"
          sx={{
            padding: "10px",
            height: "auto",
            "::file-selector-button": {
              border: "none",
              outline: "none",
              height: "auto",
              mr: 2,
              ...styles,
            },
          }}
          disabled={!isConnected}
          onChange={uploadFile}
        />

        <div>
          {jsonFileContent ? (
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
                          {jsonFileContent?.hash}
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
                          {jsonFileContent?.patientAddress}
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
                          {jsonFileContent?.fileName}
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
                          {jsonFileContent?.hospitalAddress}
                        </Text>
                      </Box>
                      <Box>
                        {jsonFileContent?.selectedRows.map((file) => {
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
