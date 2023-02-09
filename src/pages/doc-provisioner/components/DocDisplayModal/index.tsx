import {
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	Modal as ChakraModal,
	ModalBody,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

import StaticDocField from "./StaticDocField";
import { FullCommittedDocumentData } from "../../../../lib/types";
import { useDocFetchIpfs } from "../../../../lib/hooks/useDocFetchIpfs";
import { useDocDisplayModal } from "../../providers/DocDisplayModalProvider";
import { DocHeader } from "../../../../components/DocHeader";

export default function DocDisplayModalContainer() {
	const { doc, isOpen, onClose } = useDocDisplayModal();
	const { docs, isError, isLoading, fetchFiles } = useDocFetchIpfs();

	const [fullDoc, setFullDoc] = useState<FullCommittedDocumentData | null>(null);

	useEffect(() => {
		if (!doc || !docs || !docs[0]) return;

		const { cid, ...docData } = docs[0];
		const { fileName, hospital, patient, ...headerData } = doc;

		const fullDocData: FullCommittedDocumentData = {
			...docData,
			...headerData,
		};

		setFullDoc(fullDocData);
	}, [docs, doc]);

	useEffect(() => {
		if (!doc) return;
		fetchFiles(doc.cid);
	}, [doc, fetchFiles]);

	return (
		<ChakraModal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<DocDisplayModal doc={fullDoc} isLoading={isLoading} isError={isError} />
		</ChakraModal>
	);
}

interface DocDisplayModalProps {
	isError: boolean;
	isLoading: boolean;
	doc: FullCommittedDocumentData | null;
}

function DocDisplayModal({ doc }: DocDisplayModalProps) {
	return (
		<ModalContent
			margin="2rem"
			w="800px"
			maxW="1000px"
			minH="170px"
			maxH="1000px"
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

			{doc ? (
				<ModalBody
					className="flex flex-col  h-72"
					paddingX="0"
					// paddingTop="1rem"
					paddingBottom="3rem"
				>
					<div>
						<DocHeader
							cid={doc.cid}
							fileHash={doc.hash}
							filename={doc.fileName}
							timestamp={doc.blockTimestamp}
							hospitalName={doc.hospitalName}
							patientAddress={doc.patientAddress}
							hospitalAddress={doc.hospitalAddress}
							type="HOSPITAL"
						/>
						<hr className="border-neutral-700 mt-3 mb-5" />
					</div>

					<div className="flex gap-2.5 text-xs mb-3  ">
						<div className="px-2 flex-[3] font-semibold">Key</div>
						<div className="px-2 flex-[6] font-semibold">Value</div>
					</div>

					{doc.fields.length !== 0 ? (
						<div
							className="flex flex-col flex-1 gap-1.5 overflow-scroll h-full"
							key={doc.fields.length}
						>
							{doc.fields.map((e, idx) => {
								if (e.key === "-" && e.value === "-") return <></>;
								else
									return (
										<StaticDocField
											entryKey={e.key}
											entryValue={e.value}
											key={`${e.key}-${e.value}-${idx}`}
										/>
									);
							})}
						</div>
					) : (
						<div>no fields</div>
					)}
				</ModalBody>
			) : (
				<></>
			)}
		</ModalContent>
	);
}
