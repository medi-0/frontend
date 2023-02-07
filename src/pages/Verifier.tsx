import { VerifyForm } from "../components/verifier/VerifyProof";
import React, { useState } from "react";
import VerifyQr from "../components/verifier/VerifyQr";

export default function Verifier() {
  
  return (
    <div>
      <div className="m-10 rounded-sm ">
        <h1 className="mx-10 text-4xl font-bold text-[#3C84AB] ">
          Verify Proof
        </h1>
        <hr className="mt-2 mb-10" />

        <VerifyForm />
        <VerifyQr/>

      </div>
    </div>
  );
}
