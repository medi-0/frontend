import { Button, ModalBody, ModalFooter } from "@chakra-ui/react";
import cloneDeep from "lodash.clonedeep";
import { useCallback, useState } from "react";
import { ReactComponent as TrashSvg } from "../../../../lib/assets/svg/trash.svg";
import { Field } from "../../../../lib/utils";

interface EditableFormInputProps {
	fieldKey: string;
	fieldValue: string;
	onClick: () => void;
	onKeyChange: (value: string) => void;
	onValueChange: (value: string) => void;
}

function EditableFormInput({
	fieldKey: key,
	fieldValue: value,
	onClick,
	onKeyChange,
	onValueChange,
}: EditableFormInputProps) {
	return (
		<div className="flex gap-2.5 items-center">
			<input
				type="text"
				className="border border-zinc-400 p-2 text-sm rounded-md flex-[3]"
				defaultValue={key}
				onChange={(e) => onKeyChange(e.currentTarget.value)}
			/>
			<input
				type="text"
				className="border border-zinc-400 p-2 text-sm rounded-md flex-[6]"
				defaultValue={value}
				onChange={(e) => onValueChange(e.currentTarget.value)}
			/>
			<TrashSvg
				className="cursor-pointer flex-1 hover:text-neutral-400 transition-colors ease-in-out duration-200"
				height="18"
				onClick={onClick}
			/>
		</div>
	);
}

interface EditableFormProps {
	defaultFields: Field[];
	onSubmit: (data: Field[]) => void;
}

export default function EditableForm({
	defaultFields = [],
	onSubmit,
}: EditableFormProps) {
	const [fields, setFields] = useState<Field[]>(defaultFields);

	const onKeyChange = useCallback((idx: number, value: string) => {
		setFields((prev) => {
			const arr = cloneDeep(prev);
			arr[idx].key = value;
			return arr;
		});
	}, []);

	const onValueChange = useCallback((idx: number, value: string) => {
		setFields((prev) => {
			const arr = cloneDeep(prev);
			arr[idx].value = value;
			return arr;
		});
	}, []);

	const onFieldDelete = useCallback(
		(idx: number) =>
			setFields((prev) => {
				const newFields = cloneDeep(prev);
				newFields.splice(idx, 1);
				return newFields;
			}),
		[]
	);

	return (
		<>
			<ModalBody
				className="flex flex-col  h-72"
				paddingX="1.2rem"
				paddingBottom="1.2rem"
			>
				{fields.length != 0 ? (
					<>
						<div className="flex gap-2.5 text-xs font-semibold mb-3  ">
							<div className="px-2 flex-[3]">Key</div>
							<div className="px-2 flex-[6]">Value</div>
							<div className="px-2 flex-1"></div>
						</div>
						<div
							className="flex flex-col flex-1 gap-1.5 overflow-scroll h-full"
							key={fields.length}
						>
							{fields.map((e, idx) => (
								<EditableFormInput
									fieldKey={e.key}
									fieldValue={e.value}
									onClick={() => onFieldDelete(idx)}
									onKeyChange={(v) => onKeyChange(idx, v)}
									onValueChange={(v) => onValueChange(idx, v)}
								/>
							))}
						</div>
					</>
				) : (
					<div className="flex-1 flex items-center justify-center text-sm text-zinc-400 border rounded-md">
						It's empty
					</div>
				)}
			</ModalBody>
			{fields.length !== 0 ? (
				<ModalFooter justifyContent="center" paddingTop="0">
					<Button
						borderRadius="3xl"
						paddingX="14"
						className=""
						colorScheme="blue"
						mr={3}
						// onClick={mainModal.onClose}
						onClick={() => onSubmit(fields)}
					>
						Submit Document
					</Button>
				</ModalFooter>
			) : null}
		</>
	);
}
