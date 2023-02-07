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
		cid: "bafybeiaohg4e3f3u3tf5kizc4aknrulplkfuzzbo4mqrudtegljebpryay",
		fileName: "Document 1",
		hash: "0x123125123",
		hospital: "0x19381984917823",
		id: "xasdaeji1j3io1",
		patient: "0x1",
		transactionHash: "0x2",
	},
	{
		blockNumber: 12124,
		blockTimestamp: 1675386983,
		cid: "bafybeieew4nwcjjvavojjkf4howujroqzglaublbbj4cmhfc4yfjn2ioh4",
		fileName: "Document 2",
		hash: "0x123125123",
		hospital: "0x19381984917823",
		id: "xasdaeji1j3io1",
		patient: "0x1",
		transactionHash: "0x2",
	},
	{
		blockNumber: 12124,
		blockTimestamp: 1675386887,
		cid: "bafybeia6neu5nk3mytgjfou4ngebtxnoi2bgj4al6hjswyzffhx25geawi",
		fileName: "Document 3",
		hash: "0x123125123",
		hospital: "0x19381984917823",
		id: "xasdaeji1j3io1",
		patient: "0x1",
		transactionHash: "0x2",
	},
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
