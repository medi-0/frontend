import { useState } from "react";
import { Doc } from "../types";
import { Web3Storage, CIDString } from "web3.storage";

export function useDocUploadIpfs() {
	const [error, setError] = useState<any>();
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [cid, setCid] = useState<CIDString | null>(null);

	const client = new Web3Storage({
		token: process.env.REACT_APP_WEB3_STORAGE_API as string,
	});

	const upload = async function (doc: Doc) {
		setIsLoading(true);

		try {
			const file = new File([JSON.stringify(doc)], doc.fileName, {
				type: "text/plain",
			});

			const cid = await client.put([file]);

			setCid(cid);
			setIsError(false);
			setIsLoading(false);

			return cid;
		} catch (e) {
			setError(e);
			setIsError(true);
			setIsLoading(false);
		}
	};

	return {
		cid,
		error,
		upload,
		isError,
		isLoading,
	};
}
