import { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { VerifyFormPanel } from "../components/verifier/ProofVerifier";
import VerifierModal from "../components/verifier/VerifierModal";

export default function Verifier() {
  return (
    <div>
      <div className="m-10 border border-solid border-red-700 rounded-sm ">
        <h1>Verify Proof</h1>
        <VerifyFormPanel/>      
      </div>
    </div>
  );
}
