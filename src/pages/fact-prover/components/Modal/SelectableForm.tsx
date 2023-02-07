import { useCallback, useState } from "react";
import { DocWithCID } from "../../../../lib/types";
import { Button, ModalBody, ModalFooter } from "@chakra-ui/react";

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
	doc: DocWithCID;
	onSubmit: (data: Field[]) => void;
}

export default function SelectableForm({ doc, onSubmit }: SelectableFormProps) {
	const [fields] = useState<Field[]>(doc.fields);
	const [selectedFieldIndex, setSelectedFieldIndex] = useState<number[]>([]);

	const onSelectField = useCallback((idx: number) => {
		setSelectedFieldIndex((prev) => {
			const arr = [...prev];
			const exist = arr.findIndex((value) => value === idx);

			if (exist === -1) arr.push(idx);
			else arr.splice(exist, 1);

			return arr;
		});
	}, []);

	return (
		<>
			<ModalBody className="flex flex-col  h-72" padding="1rem 1.2rem">
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

				{fields.length != 0 ? (
					<div
						className="flex flex-col flex-1 gap-1.5 overflow-scroll h-full"
						key={fields.length}
					>
						{fields.map((e, idx) => (
							<SelectableFormInput
								fieldKey={e.key}
								fieldValue={e.value}
								onClick={() => onSelectField(idx)}
							/>
						))}
					</div>
				) : (
					<div>no fields</div>
				)}
			</ModalBody>
			<ModalFooter justifyContent="center">
				<Button
					isDisabled={selectedFieldIndex.length === 0 ? true : false}
					borderRadius="3xl"
					paddingX="14"
					className=""
					colorScheme="blue"
					mr={3}
					// onClick={mainModal.onClose}
					onClick={() => {
						const selectedFields = [];
						for (let i = 0; i < selectedFieldIndex.length; i++) {
							selectedFields.push(doc.fields[selectedFieldIndex[i]]);
						}
						onSubmit(selectedFields);
					}}
				>
					Generate Proof
				</Button>
			</ModalFooter>
		</>
	);
}
