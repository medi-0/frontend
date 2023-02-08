import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { useAccount } from "wagmi";
import { Center, Text } from "@chakra-ui/react";
import TabModal from "../components/verifier/TabModal";

export default function Verifier() {
  const { address, isConnected, connector } = useAccount();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isConnected)
    return (
      <div>
        <Navbar />
        <div className="m-10">
          <h1 className="mx-10 text-4xl font-bold text-[#3C84AB] ">
            Verify Proof
          </h1>
          <hr className="mt-2 mb-10" />
          <Center>
            <Text>Please Connect wallet to proceed</Text>
          </Center>
        </div>
      </div>
    );
  return (
    <div>
      <Navbar />
      <div className="m-10">
        <h1 className="mx-10 text-4xl font-bold text-[#3C84AB] ">
          Verify Proof
        </h1>
        <hr className="mt-2 mb-10" />
        <TabModal/>
        
      </div>
    </div>
  );
}
