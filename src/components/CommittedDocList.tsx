import { useEffect } from "react";
import { Grid, Spinner } from "@chakra-ui/react";
import { DocumentNode, useQuery } from "@apollo/client";

import DocCard from "./CommittedDocCard";
import { CommittedMedicalDocumentHeader } from "../lib/types";

interface ContainerProps {
	address: `0x${string}`;
	query: DocumentNode;
	onChange: (count: number) => void;
	onClick: (doc: CommittedMedicalDocumentHeader) => void;
}

const placeholderData: CommittedMedicalDocumentHeader[] = [
	{
		blockNumber: 12124,
		blockTimestamp: 1675387235,
		cid: "bafybeihjmeismtc2iovd2zl2s3qy2o3weymnrf2ziukg5kxgow7t7yfyf4",
		fileName: "My Health Documentation",
		hash: "0x196a99ae5af1e99af236f12a6a8fc1da7f132a6f608ef0a5bebb752763c4ba32",
		hospital: "0x8Bceee9C7dB5C0911ACA92321812dE6c74026d6c",
		id: "xasdaeji1j3io1",
		patient: "0x73F8A075b9a1e3ddD169CfdBdFA513c40B8bd796",
		transactionHash:
			"0x28e147d2623caa3153063defdf6adcefe2e05c3c070640d2ac556f06de4a8ea9",
	},
	{
		blockNumber: 12124,
		blockTimestamp: 1675386983,
		cid: "bafybeibyixxjavisj5todtsyn4mk4zy64ldccyczdt6azj6jl7hmbaor6q",
		fileName: "Health Documentation 2",
		hash: "0x3ec97f4ca9d60ffa5cb2810e152ea289b65cfce4230a94422b64320f8ace47ee",
		hospital: "0x8Bceee9C7dB5C0911ACA92321812dE6c74026d6c",
		id: "xasdaeji1j3io1",
		patient: "0x73F8A075b9a1e3ddD169CfdBdFA513c40B8bd796",
		transactionHash:
			"0xef950726879bae1fbc38af7860f9c30cf75e68b1d5cf614c93a25f58fca5b0b3",
	},
	// {
	// 	blockNumber: 12124,
	// 	blockTimestamp: 1675386887,
	// 	cid: "bafybeiexxlxm5pheysf5nlmxchhyolfto3cvntlhcu2dhfgwwsthxoj3ty",
	// 	fileName: "Health Documentation 3",
	// 	hash: "0x123125123",
	// 	hospital: "0x8Bceee9C7dB5C0911ACA92321812dE6c74026d6c",
	// 	id: "xasdaeji1j3io1",
	// 	patient: "0x73F8A075b9a1e3ddD169CfdBdFA513c40B8bd796",
	// 	transactionHash: "0x2",
	// },
];

type QueryResponse = {
	commitedMedicalDocuments: CommittedMedicalDocumentHeader[];
};

function CommittedDocListContainer({
	address,
	query,
	onClick,
	onChange,
}: ContainerProps) {
	const { loading, error, data } = useQuery<QueryResponse>(query, {
		variables: {
			address,
		},
	});

	useEffect(() => {
		if (!data) return;
		onChange(data.commitedMedicalDocuments.length);
		// console.log("gql data", data);
	}, [data]);

	return loading ? (
		<div className="h-full flex-1 flex items-center justify-center text-neutral-400 text-sm italic">
			<Spinner marginRight="1.2rem" />
			<div>Fetching your documents...</div>
		</div>
	) : (
		<CommittedDocList
			docs={placeholderData || data?.commitedMedicalDocuments || []}
			onClick={onClick}
		/>
	);
}

interface Props {
	docs: CommittedMedicalDocumentHeader[];
	onClick: (doc: CommittedMedicalDocumentHeader) => void;
}

function CommittedDocList({ docs, onClick }: Props) {
	return (
		<Grid
			borderTop="1px solid #A3A3A3"
			autoRows={"min-content"}
			paddingTop="0.6rem"
			gap={"0.4rem"}
			className="h-full flex-1 overflow-y-scroll"
		>
			{docs.map((item) => (
				<DocCard
					data={item}
					onClick={() => {
						onClick(item);
					}}
					key={item.cid}
				/>
			))}
		</Grid>
	);
}

export default CommittedDocListContainer;
