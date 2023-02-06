import { Progress, Spinner } from "@chakra-ui/react";
import { TransactionReceipt } from "@ethersproject/abstract-provider";
import { CIDString } from "web3.storage";

interface Props {
	uploadData: CIDString | null;
	uploadIsError: boolean;
	uploadIsLoading: boolean;
	commitmentIsError: boolean;
	commitmentIsLoading: boolean;
	commitmentReceipt: TransactionReceipt | null;
}

export function CommitmentProgress({
	uploadData,
	uploadIsLoading,
	uploadIsError,
	commitmentIsError,
	commitmentIsLoading,
	commitmentReceipt,
}: Props) {
	return (
		<div className="flex gap-3">
			<div className="border border-neutral-200 p-3">
				{uploadIsLoading ? (
					(
						<div>
							Uploading to IPFS...
							<Progress size="xs" isIndeterminate />
						</div> ? (
							uploadData
						) : (
							<div>
								Document uploaded with CID : <span>{uploadData}</span>
							</div>
						)
					) ? (
						uploadIsError
					) : (
						<div>Got error</div>
					)
				) : null}
				{/* <Comp /> */}
			</div>
		</div>
	);
}
