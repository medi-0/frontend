import { CIDString } from "web3.storage";
import { useCallback, useEffect, useRef, useState } from "react";
import { Badge, ModalBody, Progress } from "@chakra-ui/react";
import { TransactionReceipt } from "@ethersproject/abstract-provider";
import { ReactComponent as OpenLinkIcon } from "../../../../lib/assets/svg/open-link.svg";
import DotsLoader from "../../../../components/DotsLoader";

interface Props {
	ipfsData: CIDString | null;
	ipfsIsError: boolean;
	ipfsIsLoading: boolean;
	commitmentIsError: boolean;
	commitmentIsLoading: boolean;
	commitmentData: TransactionReceipt | null;
}

export function CommitmentProgress({
	ipfsData,
	ipfsIsError,
	ipfsIsLoading,
	commitmentData,
	commitmentIsError,
	commitmentIsLoading,
}: Props) {
	const textRef = useRef<HTMLDivElement | null>(null);
	const [isAnimated, setIsAnimated] = useState(true);

	const getCommitmentProgressText = useCallback(() => {
		if (!textRef.current) return;

		if (commitmentIsLoading) return <DotsLoader text="Committing document" />;
		if (ipfsIsLoading) return <DotsLoader text="Uploading to IPFS" />;
		if (ipfsData && commitmentData) return <>Document submitted successfully.</>;
		if (ipfsIsError || commitmentIsError) return <>Something went wrong.</>;
	}, [
		commitmentIsLoading,
		ipfsIsLoading,
		ipfsData,
		commitmentData,
		ipfsIsError,
		commitmentIsError,
	]);

	useEffect(() => {
		console.log("should be animated?", isAnimated);
	}, [isAnimated]);

	// useEffect(() => {
	// 	if (!textRef.current) return;
	// 	if (commitmentIsLoading) textRef.current.textContent = "Committing document...";
	// }, [commitmentIsLoading]);

	// useEffect(() => {
	// 	if (!textRef.current) return;
	// 	if (ipfsIsLoading) textRef.current.textContent = "Uploading to IPFS...";
	// }, [ipfsIsLoading]);

	useEffect(() => {
		if (!textRef.current) return;
		if (ipfsData && commitmentData) {
			setIsAnimated(false);
			// textRef.current.textContent = "Document submitted successfully.";
		}
	}, [ipfsData, commitmentData]);

	// useEffect(() => {
	// 	if (!textRef.current) return;
	// 	if (ipfsIsError || commitmentIsError)
	// 		textRef.current.textContent = "Something went wrong.";
	// }, [ipfsIsError, commitmentIsError]);

	return (
		<>
			<ModalBody
				className="flex flex-col h-72"
				minH="250px"
				paddingX="0"
				paddingY="1.2rem"
			>
				<div className=" flex-1 flex flex-col mb-3">
					<div
						className="text-sm flex-1 font-semibold flex items-center justify-center"
						ref={textRef}
					>
						{/* In progress... */}
						{/* <DotsLoader text="In progress" /> */}
						{/* {getCommitmentProgressText()} */}
						<DotsLoader text="Uploading to IPFS" />
					</div>

					<Progress
						size="md"
						borderRadius="50px"
						colorScheme="pink"
						isIndeterminate={isAnimated}
						value={isAnimated ? undefined : 100}
					/>
				</div>

				<div className="flex gap-6">
					<div className="flex gap-3.5 items-center flex-1">
						<Badge
							variant="solid"
							colorScheme="cyan"
							borderRadius="0.3rem"
							paddingX="0.5rem"
							paddingY="0.08rem"
						>
							IPFS
						</Badge>

						<div className="text-neutral-600 text-xs italic font-mono flex">
							{ipfsData ? (
								<div className="flex hover:underline items-center">
									<a
										target="_blank"
										href={`https://${ipfsData}.ipfs.w3s.link/`}
										className="w-[200px] whitespace-nowrap overflow-hidden text-ellipsis"
									>
										{ipfsData}
									</a>
									<OpenLinkIcon height="12px" />
								</div>
							) : (
								"--"
							)}
						</div>
					</div>

					<div className="flex gap-3.5 items-center flex-1">
						<Badge
							variant="solid"
							colorScheme="yellow"
							borderRadius="0.3rem"
							paddingX="0.5rem"
							paddingY="0.08rem"
						>
							Commitment
						</Badge>

						<div className="text-neutral-600 text-xs italic font-mono">
							{commitmentData ? (
								<div className="flex hover:underline items-center">
									<a
										target="_blank"
										href={`https://mumbai.polygonscan.com/tx/${commitmentData.transactionHash}`}
										className="w-[200px] whitespace-nowrap overflow-hidden text-ellipsis"
									>
										{commitmentData.transactionHash}
									</a>
									<OpenLinkIcon height="12px" />
								</div>
							) : (
								"--"
							)}
						</div>
					</div>
				</div>
			</ModalBody>
		</>
	);
}
