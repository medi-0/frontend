import { CIDString } from "web3.storage";
import { ModalBody, Spinner } from "@chakra-ui/react";
import { TransactionReceipt } from "@ethersproject/providers";
import { Doc } from "../../../../lib/types";

interface Props {
	upload: {
		cid: CIDString | null;
		error: any;
		upload: (doc: Doc) => Promise<CIDString | undefined>;
		isError: boolean;
		isLoading: boolean;
	};
	commitment: {
		error: any;
		commit: (doc: Doc) => Promise<void>;
		isError: boolean;
		isLoading: boolean;
		receipt: TransactionReceipt | undefined;
	};
}

export function DocCommitment({ upload, commitment }: Props) {
	return (
		<ModalBody className="flex" padding="1rem 1.2rem" minH="170px">
			{/* <div className="flex gap-3 flex-1">
				<div className="flex-1 rounded-lg bg-green-400"></div>
				<div>{`>`}</div>
				<div className="flex-1 rounded-lg  animated-gradient "></div>
			</div> */}
			{/* <div className="rounded-md flex-1 flex flex-col items-center justify-center">
				{isLoading ? (
					<>
						<Spinner marginBottom="1.5rem" />
						<div className="text-neutral-700">
							Submitting your document...
						</div>
					</>
				) : !isLoading && !isError ? (
					<div className="">
						<div className="font-semibold text-center mb-3">
							🎉 Your document has been successfully submitted.
						</div>
						<div className="text-center">
							IPFS CID :{" "}
							<a
								target="_blank"
								href={`https://${cid}.ipfs.w3s.link/`}
								className="italic hover:underline cursor-pointer"
							>
								{cid}
							</a>
						</div>
						<div className="text-center">
							Transaction :{" "}
							<a
								target="_blank"
								href={`https://${cid}.ipfs.w3s.link/`}
								className="italic hover:underline cursor-pointer"
							>
								{receipt?.transactionHash}
							</a>
						</div>
					</div>
				) : (
					<div>Unable to submit your document.</div>
				)}
			</div> */}
		</ModalBody>
	);
}

// export function DocCommitment({ upload, commitment }: Props) {
// 	return (
// 		<ModalBody className="flex flex-col" padding="1rem 1.2rem" minH="200px">
// 			<div className="rounded-md flex-1 flex flex-col items-center justify-center">
// 				{isLoading ? (
// 					<>
// 						<Spinner marginBottom="1.5rem" />
// 						<div className="text-neutral-700">
// 							Submitting your document...
// 						</div>
// 					</>
// 				) : !isLoading && !isError ? (
// 					<div className="">
// 						<div className="font-semibold text-center mb-3">
// 							🎉 Your document has been successfully submitted.
// 						</div>
// 						<div className="text-center">
// 							IPFS CID :{" "}
// 							<a
// 								target="_blank"
// 								href={`https://${cid}.ipfs.w3s.link/`}
// 								className="italic hover:underline cursor-pointer"
// 							>
// 								{cid}
// 							</a>
// 						</div>
// 						<div className="text-center">
// 							Transaction :{" "}
// 							<a
// 								target="_blank"
// 								href={`https://${cid}.ipfs.w3s.link/`}
// 								className="italic hover:underline cursor-pointer"
// 							>
// 								{receipt?.transactionHash}
// 							</a>
// 						</div>
// 					</div>
// 				) : (
// 					<div>Unable to submit your document.</div>
// 				)}
// 			</div>
// 		</ModalBody>
// 	);
// }
