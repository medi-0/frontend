import { Doc } from "../types";
import { useState } from "react";
import { useDocUploadIpfs } from "../hooks/useDocUploadIpfs";

import { useMediCoreContract } from "./useMediCoreContract";
import { BigNumber } from "ethers";
import { TransactionReceipt } from "@ethersproject/abstract-provider";
import {
	GenerateCommitmentAndProofRequest,
	generateDocCommitment,
} from "../utils/fileHasher";
import { prepareFieldsForHashing } from "../utils";

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
			const cid = await ipfs.upload(doc, `medi0-artifact-${doc.fileName}`);

			const [titles, contents] = prepareFieldsForHashing(doc.fields);
			const row_selectors = titles.map(() => 0);

			setIsLoading(true);

			const body: GenerateCommitmentAndProofRequest = {
				row_selectors,
				row_titles: titles,
				row_contents: contents,
			};

			console.log("this is what going to be committed", body);

			const {
				data: { commitment },
			} = await generateDocCommitment(body);

			const tx = await contract.commitPatientFileHashAndPatientData(
				doc.patientAddress as `0x${string}`,
				doc.fileName,
				cid as string,
				BigNumber.from(commitment)
			);

			const txReceipt = await tx.wait();
			setReceipt(txReceipt);
		} catch (e) {
			setError(e);
			setIsError(true);
		}

		setIsLoading(false);
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
