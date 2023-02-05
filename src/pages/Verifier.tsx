import { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { VerifyForm } from "../components/verifier/VerifyProof";

export default function Verifier() {
  return (
    <div>
      <div className="m-10 rounded-sm ">
        <h1 className="mx-10 text-4xl font-bold text-[#3C84AB] ">Verify Proof</h1>
        <hr className="mt-2 mb-10"/>

        <VerifyForm/>      
      </div>
    </div>
  );
}
