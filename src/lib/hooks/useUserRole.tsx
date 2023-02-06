import { useEffect, useState } from "react";
import { useAccount, useContract, useSigner } from "wagmi";
import { UserRole } from "../types";
import { useMediCoreContract } from "./useMediCoreContract";

export function useUserRole() {
	const [role, setRole] = useState<UserRole | null>(null);

	const { address } = useAccount();
	const { contract, isLoading, isError } = useMediCoreContract();

	useEffect(() => {
		if (!address) {
			setRole(null);
			return;
		}

		if (!contract) return;

		Promise.all([
			contract.hasRole(
				// keccak(HOSPITAL_ROLE)
				"0xc8f5b4140cca307cd927e59cbeea8291bffeee228fc677f0fa059aef7b4dd8d5",
				address
			),
			contract.hasRole(
				// keccak(PATIENT_ROLE)
				"0x72606200fac42b7dc86b75901d61ecfab2a4a1a6eded478b97a428094891abed",
				address
			),
		]).then(([isHospital, isPatient]) => {
			if (isHospital) setRole(UserRole.HOSPITAL_ROLE);
			else if (isPatient) setRole(UserRole.PATIENT_ROLE);
			else setRole(UserRole.UNREGISTERED);
		});
	}, [contract, address]);

	return { type: role, isLoading, isError };
}
