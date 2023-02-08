import { Doc } from "../types";
import { useState } from "react";
import { useDocUploadIpfs } from "../hooks/useDocUploadIpfs";

import { useMediCoreContract } from "./useMediCoreContract";
import { BigNumber } from "ethers";
import { TransactionReceipt } from "@ethersproject/abstract-provider";

export function useDocCommitment() {
	const { contract } = useMediCoreContract();

	const ipfs = useDocUploadIpfs();

	const [error, setError] = useState<any>();
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [receipt, setReceipt] = useState<TransactionReceipt | null>(null);

	const commit = async function (doc: Doc) {
		if (!contract) return;

		try {
			const cid = await ipfs.upload(doc);

			setIsLoading(true);

			const tx = await contract.commitPatientFileHashAndPatientData(
				doc.patientAddress as `0x${string}`,
				doc.fileName,
				cid as string,
				BigNumber.from(0)
			);

			const txReceipt = await tx.wait();
			setReceipt(txReceipt);
		} catch (e) {
			setError(e);
			setIsError(true);
		}

		setIsLoading(false);
		// ipfs.upload(doc).then((cid) => {
		// 	setIsLoading(true);
		// 	contract
		// 		.commitPatientFileHashAndPatientData(
		// 			doc.patientAddress as `0x${string}`,
		// 			doc.docName,
		// 			cid as string,
		// 			BigNumber.from(0)
		// 		)
		// 		.then((res) => res.wait().then((receipt) => setReceipt(receipt)))
		// 		.catch((e) => {
		// 			setError(e);
		// 			setIsError(true);
		// 		})
		// 		.finally(() => setIsLoading(false));
		// });
	};

	return {
		upload: ipfs,
		commitment: {
			error,
			commit,
			receipt,
			isError,
			isLoading,
		},
	};
}
