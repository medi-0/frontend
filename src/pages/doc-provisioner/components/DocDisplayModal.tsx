import { ModalBody } from "@chakra-ui/react";
import { DocWithCID } from "../../../lib/types";
import {
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	Modal as ChakraModal,
} from "@chakra-ui/react";
import { useDocDisplayModal } from "../providers/DocModalProvider";
import { useDocFetchIpfs } from "../../../lib/hooks/useDocFetchIpfs";
import { useEffect, useState } from "react";

function StaticDocField({
	entryKey,
	entryValue,
}: {
	entryKey: string;
	entryValue: string;
}) {
	return (
		<div className="flex gap-2.5 items-stretch cursor-pointer rounded-md group/radio">
			<input
				disabled
				type="text"
				className="border border-zinc-400 p-2 text-sm rounded-md flex-[3] pointer-events-none"
				defaultValue={entryKey}
			/>
			<input
				disabled
				type="text"
				className="border border-zinc-400 p-2 text-sm rounded-md flex-[6] pointer-events-none"
				defaultValue={entryValue}
			/>
		</div>
	);
}

interface Props {
	doc: DocWithCID;
}

function DocDisplayModal({ doc }: Props) {
	return (
		<>
			<div className="border border-zinc-400 rounded-md p-3 mb-6 ">
				<div>
					<span>Doc name : </span>
					<span>{doc.docName}</span>
				</div>
				<div>
					<span>Hospital address : </span>
					<span>{doc.hospitalAddress}</span>
				</div>
				<div>
					<span>Hospital name : </span>
					<span>{doc.hospitalName}</span>
				</div>
			</div>

			<div className="flex gap-2.5 text-xs font-semibold mb-3  ">
				<div className="px-2 flex-[3]">Key</div>
				<div className="px-2 flex-[6]">Value</div>
				<div className="px-2 flex-1"></div>
			</div>

			{doc.fields.length != 0 ? (
				<div
					className="flex flex-col flex-1 gap-1.5 overflow-scroll h-full"
					key={doc.fields.length}
				>
					{doc.fields.map((e, idx) => (
						<StaticDocField entryKey={e.key} entryValue={e.value} />
					))}
				</div>
			) : (
				<div>no fields</div>
			)}
		</>
	);
}

export default function DocDisplayModalContainer() {
	const { cid, isOpen, onClose } = useDocDisplayModal();
	const { docs, fetchFiles, isError, isLoading } = useDocFetchIpfs();

	const [doc, setDoc] = useState<DocWithCID | null>(null);

	useEffect(() => {
		if (!cid) return;

		fetchFiles(cid).then((docs) => {
			if (!docs) return;
			setDoc(docs[0]);
		});
	}, [cid]);

	return (
		<ChakraModal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent
				margin="2rem"
				minW="600px"
				w="1000px"
				maxW="1000px"
				minH="170px"
				maxH="1000px"
				borderRadius="2xl"
				display="flex"
				paddingTop="2rem"
				paddingX="1rem"
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

				<ModalBody className="flex flex-col  h-72" padding="1rem 1.2rem">
					{doc ? <DocDisplayModal doc={doc} /> : <div>Document not found.</div>}
				</ModalBody>
			</ModalContent>
		</ChakraModal>
	);
}
