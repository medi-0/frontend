import { Input, useMultiStyleConfig, useToast } from "@chakra-ui/react";
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

import { useAccount } from "wagmi";

// import { FileHasherProps } from "../../file-hasher-types";
// import { FileHash__factory } from "../../typechain-types";

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

export function VerifyForm() {
  const { address, isConnected, connector } = useAccount();
  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure();

  const styles = useMultiStyleConfig("Button", { variant: "outline" });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  const [jsonFileContent, setJsonFileContent] =
    React.useState<JsonFileContentType[]>();

  const uploadFile = async function (e: any) {
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      console.log(e);
      const result = e?.target?.result;
      console.log(result);
      const jsonResult = JSON.parse(result);
      console.log(typeof jsonResult);
      setJsonFileContent(jsonResult);
      console.log(jsonResult);
    };
    reader.readAsText(e.target?.files[0]);
  };

  const onVerifyProof = async () => {
    setIsLoading(true);
    if (!address || !connector) {
      return toast({
        title: "Unable to get address or connector",
        description:
          "Unable to get address or connector. Please try to reconnect.",
        isClosable: true,
        status: "error",
      });
    }

    setIsLoading(false);
    return toast({
      title: "Invalid proof.json format",
      description: "The provided proof.json file is in an invalid format.",
      status: "error",
      isClosable: true,
    });
  };



  if (!isConnected)
    return (
      <Center>
        <Text>Please Connect wallet to proceed</Text>
      </Center>
    );
  return (
    <>
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

      {jsonFileContent ? (
        jsonFileContent.map((file) => {
          // print file contents
          file.selectedRows.map((file1) => {
            // console.log(file1.selectedKey);
            // console.log(file1.selectedValue);
            const proofStr = file1.proof.toString().slice(0, 10) + "...";

            console.log(`proof: ${proofStr}`);
          });
          return (
            <>
              <Box mt="2" mb="2">
                <Card>
                  <CardHeader>
                    <Heading size="md">Proof</Heading>
                  </CardHeader>
                  <CardBody>
                    <Stack divider={<StackDivider />} spacing="4">
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Verifier Address
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          {address}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Address
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          {file.address}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Cert Name
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          {file.certName}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
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
    </>
  );
}
