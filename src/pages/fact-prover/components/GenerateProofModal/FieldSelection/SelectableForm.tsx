import { useCallback, useState } from "react";
import { FullCommittedDocumentData } from "../../../../../lib/types";
import { Button, ModalBody, ModalFooter } from "@chakra-ui/react";
import { DocHeader } from "../../../../../components/DocHeader";

interface Field {
	key: string;
	value: string;
}

interface SelectableFormInputProps {
	fieldKey: string;
	fieldValue: string;
	onClick: () => void;
}

function SelectableFormInput({
	fieldKey,
	fieldValue,
	onClick,
}: SelectableFormInputProps) {
	const [isSelected, setIsSelected] = useState(false);

	return (
		<div
			className="flex gap-2.5 items-stretch cursor-pointer rounded-md group/radio"
			onClick={() => {
				onClick();
				setIsSelected((prev) => !prev);
			}}
		>
			<input
				disabled
				type="text"
				className="border border-zinc-400 p-2 text-sm rounded-md flex-[3] pointer-events-none"
				defaultValue={fieldKey}
			/>
			<input
				disabled
				type="text"
				className="border border-zinc-400 p-2 text-sm rounded-md flex-[6] pointer-events-none"
				defaultValue={fieldValue}
			/>
			<div className="flex-1 flex items-center transition-colors ease-in-out duration-150 group-hover/radio:bg-zinc-100 rounded-md">
				<div className="flex border border-zinc-400 p-[0.11rem] w-4 h-4 mx-auto rounded-full">
					<div
						className={`flex-1 ${
							isSelected ? "bg-zinc-300" : ""
						} rounded-full transition-colors ease-in-out duration-150 `}
					></div>
				</div>
			</div>
		</div>
	);
}

interface SelectableFormProps {
	doc: FullCommittedDocumentData;
	onSubmit: (selected: boolean[]) => void;
}

export default function SelectableForm({ doc, onSubmit }: SelectableFormProps) {
	const [fields] = useState<Field[]>(doc.fields);
	const [selected, setSelected] = useState<boolean[]>(() => {
		const selected = [];
		for (let i = 0; i < 10; i++) selected.push(false);
		return selected;
	});

	const onSelectField = useCallback((idx: number) => {
		setSelected((prev) => {
			// const exist = arr.findIndex((value) => value === idx);
			// if (exist === -1) arr.push(idx);
			// else arr.splice(exist, 1);

			const arr = [...prev];
			arr[idx] = !arr[idx];

			return arr;
		});
	}, []);

	return (
		<>
			<ModalBody className="flex flex-col h-72" paddingX="0" paddingBottom="1rem">
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
					<div className="px-2 flex-1"></div>
				</div>

				{fields.length !== 0 ? (
					<div
						className="flex flex-col flex-1 gap-1.5 overflow-scroll h-full"
						key={fields.length}
					>
						{fields.map((e, idx) => {
							if (e.key !== "-" && e.value !== "-")
								return (
									<SelectableFormInput
										fieldKey={e.key}
										fieldValue={e.value}
										onClick={() => onSelectField(idx)}
									/>
								);
							else return <></>;
						})}
					</div>
				) : (
					<div>no fields</div>
				)}
			</ModalBody>
			<ModalFooter justifyContent="center">
				<Button
					isDisabled={selected.length === 0 ? true : false}
					borderRadius="3xl"
					paddingX="14"
					className=""
					colorScheme="blue"
					mr={3}
					// onClick={mainModal.onClose}
					onClick={() => {
						// const selectedFields = [];
						// for (let i = 0; i < selectedFieldIndex.length; i++) {
						// 	selectedFields.push(doc.fields[selectedFieldIndex[i]]);
						// }
						// onSubmit(selectedFields);
						onSubmit(selected);
					}}
				>
					Generate Proof
				</Button>
			</ModalFooter>
		</>
	);
}
