import { ModalCloseButton, ModalContent, Spinner } from "@chakra-ui/react";
import SelectableForm from "./SelectableForm";
import { FullCommittedDocumentData } from "../../../../../lib/types";
import { useCallback, useEffect, useState } from "react";
import { useGenerateDocProofModal } from "../../../PatientModalContext";
import { useDocFetchIpfs } from "../../../../../lib/hooks/useDocFetchIpfs";
import cloneDeep from "lodash.clonedeep";

interface FieldSelectionContainerProps {
	onSubmit: (selectedFields: boolean[], doc: FullCommittedDocumentData) => void;
}

export default function FieldSelectionContainer({
	onSubmit,
}: FieldSelectionContainerProps) {
	const { doc } = useGenerateDocProofModal();

	const { docs, isLoading, isError, fetchFiles } = useDocFetchIpfs();
	const [fullDoc, setFullDoc] = useState<FullCommittedDocumentData | null>(null);

	useEffect(() => {
		if (!doc || !docs || !docs[0]) return;

		const { cid, ...docData } = docs[0];
		const { fileName, hospital, patient, ...headerData } = doc;

		const fullDocData: FullCommittedDocumentData = {
			...cloneDeep(docData),
			...headerData,
		};

		setFullDoc(fullDocData);
	}, [docs, doc]);

	useEffect(() => {
		if (!doc) return;
		fetchFiles(doc.cid);
	}, [doc, fetchFiles]);

	const handleSubmit = useCallback(
		(fields: boolean[]) => {
			if (!fullDoc) return;
			onSubmit(fields, fullDoc);
		},
		[onSubmit, fullDoc]
	);

	return (
		<FieldSelection
			doc={fullDoc}
			isError={isError}
			isLoading={isLoading}
			onSubmit={handleSubmit}
		/>
	);
}

interface FieldSelectionProps {
	isError: boolean;
	isLoading: boolean;
	doc: FullCommittedDocumentData | null;
	onSubmit: (selected: boolean[]) => void;
}

function FieldSelection({ doc, isError, isLoading, onSubmit }: FieldSelectionProps) {
	return (
		<ModalContent
			margin="2rem"
			w="900px"
			maxW="1000px"
			minH="400px"
			maxH="600px"
			borderRadius="2xl"
			display="flex"
			paddingTop="2rem"
			paddingX="2rem"
		>
			<ModalCloseButton
				height="min-content"
				backgroundColor="#df57a7"
				borderRadius="2rem"
				className="shadow-lg"
				width="4rem"
				padding="0.2rem 1rem"
			>
				<span className="font-bold text-white">close</span>
			</ModalCloseButton>

			{isLoading ? (
				<div className="flex-1 flex items-center justify-center">
					<Spinner />
				</div>
			) : doc ? (
				<SelectableForm doc={doc} onSubmit={onSubmit} />
			) : (
				<div>Document not found</div>
			)}
		</ModalContent>
	);
}
