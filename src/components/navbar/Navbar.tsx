import { useState } from "react";
import { useAccount, useBalance } from "wagmi";
import Login from "../loginModal/LoginModal";
import { useNavigate } from "react-router-dom";



function Navbar() {
  const { address, connector, isConnected } = useAccount();

  const { data, isError, isLoading } = useBalance({
    address: address,
  });

  const navigate = useNavigate();

  const handleVerify  = () => {
    navigate("/Verifier");
  }

  const handleLogo = () => {
    navigate("/");
  }

 


  return (
    <div className="h-24 flex justify-between items-center px-20">
      <div>
        <button onClick = {handleLogo} className="text-[#396AEB] text-2xl font-extrabold">Medi Zero</button>
      </div>
      <div className="flex items-center">
        
        <button onClick = {handleVerify} className="m-[15px] text-lg font-bold text-[#396AEB] ">Verify</button>

        {data ? (
          <></>
        ) : (
          <>
            <Login />
          </>
        )}

        {data ? (
          <>
            {data?.symbol} {address}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Navbar;
