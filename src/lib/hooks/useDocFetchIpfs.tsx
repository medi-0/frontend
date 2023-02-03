import { useCallback, useMemo, useState } from "react";
import { CIDString, Web3File, Web3Storage } from "web3.storage";
import { DocWithCID } from "../types";

export function useDocFetchIpfs() {
	const [error, setError] = useState<any>();
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const client = useMemo(() => {
		return new Web3Storage({
			token: process.env.REACT_APP_WEB3_STORAGE_API as string,
		});
	}, []);

	const [docs, setDocs] = useState<DocWithCID[]>();
	const [web3Files, setWeb3Files] = useState<Web3File[]>();

	const fetchFiles = useCallback(
		async function (cid: CIDString) {
			setIsLoading(true);

			try {
				const res = await client.get(cid);
				if (!res) throw new Error("IPFS client get");
				const files = await res.files();

				const arrDocs: DocWithCID[] = [];

				for (let i = 0; i < files.length; i++) {
					const doc = { ...JSON.parse(await files[i].text()), cid };
					arrDocs.push(doc);
				}

				setDocs(arrDocs);
				setWeb3Files(files);

				setIsError(false);
				setIsLoading(false);

				return arrDocs;
			} catch (e) {
				setError(e);
				setIsError(true);
				setIsLoading(false);
			}
		},
		[client]
	);

	return {
		docs,
		web3Files,
		error,
		isError,
		isLoading,
		fetchFiles,
	};
}
