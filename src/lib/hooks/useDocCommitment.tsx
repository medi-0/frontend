import { useCallback, useEffect, useState } from "react";
import { Doc, DocWithCID } from "../types";
import { useDocUploadIpfs } from "../hooks/useDocUploadIpfs";
import { CIDString } from "web3.storage";
import { useWaitForTransaction } from "wagmi";

import { useMediCoreContract } from "./useMediCoreContract";
import { BigNumber } from "ethers";
import { TransactionReceipt } from "@ethersproject/abstract-provider";

export function useDocCommitment() {
	const { contract } = useMediCoreContract();

	const ipfs = useDocUploadIpfs();

	const [doc, setDoc] = useState<DocWithCID | null>(null);

	const [error, setError] = useState<any>();
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [receipt, setReceipt] = useState<TransactionReceipt | null>(null);

	const commit = async function (doc: Doc) {
		console.log("here also");

		if (!contract) return;

		setIsLoading(true);
		ipfs.upload(doc)
			.then((cid) => {
				setDoc({
					...doc,
					cid: cid as CIDString,
				});

				contract
					.commitPatientFileHashAndPatientData(
						doc.patientAddress as `0x${string}`,
						doc.docName,
						cid as string,
						BigNumber.from(0)
					)
					.then((res) => res.wait().then((receipt) => setReceipt(receipt)));
			})
			.catch((e) => {
				setError(e);
				setIsError(true);
			})
			.finally(() => setIsLoading(false));
	};

	return {
		upload: ipfs,
		commitment: {
			error,
			commit,
			isError,
			isLoading,
			// receipt,
		},
	};
}
