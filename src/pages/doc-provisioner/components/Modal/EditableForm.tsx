import { Button, ModalBody, ModalFooter } from "@chakra-ui/react";
import { useReducer } from "react";
import { useCallback, useRef } from "react";
import { ReactComponent as TrashSvg } from "../../../../lib/assets/svg/trash.svg";
import { Field } from "../../../../lib/utils";
import { DocFormActionKind, docFormReducer } from "../../useFormReducer";

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
		<div className="flex gap-2.5 items-stretch">
			<input
				type="text"
				className="border border-zinc-400 p-2 text-sm rounded-md flex-[3]"
				defaultValue={key}
				onChange={(e) => onKeyChange(e.currentTarget.value)}
				required
			/>
			<input
				type="text"
				className="border border-zinc-400 p-2 text-sm rounded-md flex-[6]"
				defaultValue={value}
				onChange={(e) => onValueChange(e.currentTarget.value)}
				required
			/>
			<div
				className="cursor-pointer group/trash hover:bg-neutral-100 flex-1 flex items-center justify-center rounded-md  transition-colors ease-in-out duration-150"
				onClick={onClick}
			>
				<TrashSvg
					className="group-hover/trash:text-neutral-400 transition-colors ease-in-out duration-150"
					height="18"
				/>
			</div>
		</div>
	);
}

interface EditableFormContainerProps {
	initialFields: Field[];
	onSubmit: (docName: string, patientAddress: string, fields: Field[]) => void;
}

export default function EditableFormContainer({
	initialFields,
	onSubmit,
}: EditableFormContainerProps) {
	const [state, dispatch] = useReducer(docFormReducer, {
		fields: initialFields,
	});

	const onKeyChange = useCallback((idx: number, value: string) => {
		dispatch({
			type: DocFormActionKind.EDIT_KEY_FIELD,
			payload: {
				index: idx,
				value,
			},
		});
	}, []);

	const onValueChange = useCallback((idx: number, value: string) => {
		dispatch({
			type: DocFormActionKind.EDIT_VALUE_FIELD,
			payload: {
				index: idx,
				value,
			},
		});
	}, []);

	const onFieldDelete = useCallback(
		(idx: number) =>
			dispatch({
				type: DocFormActionKind.REMOVE_FIELD,
				payload: {
					index: idx,
				},
			}),

		[]
	);

	const onFieldAdd = useCallback(
		() =>
			dispatch({
				type: DocFormActionKind.ADD_FIELD,
				payload: { key: "", value: "" },
			}),

		[]
	);

	return (
		<EditableForm
			fields={state.fields}
			onAddField={onFieldAdd}
			onRemoveField={onFieldDelete}
			onKeyChange={onKeyChange}
			onValueChange={onValueChange}
			onSubmit={onSubmit}
		/>
	);
}

interface EditableFormProps {
	fields: Field[];
	onRemoveField: (idx: number) => void;
	onAddField: (key: string, value: string) => void;
	onKeyChange: (idx: number, value: string) => void;
	onValueChange: (idx: number, value: string) => void;
	onSubmit: (filename: string, patientAddress: string, data: Field[]) => void;
}

function EditableForm({
	fields,
	onSubmit,
	onKeyChange,
	onAddField,
	onRemoveField,
	onValueChange,
}: EditableFormProps) {
	const formRef = useRef<HTMLFormElement | null>(null);

	const handleSubmit = useCallback(() => {
		if (!formRef.current) return;
		if (!formRef.current.reportValidity()) return;

		const docName = formRef.current.docName.value;
		const patientAddress = formRef.current.patientAddress.value;
		onSubmit(docName, patientAddress, fields);
	}, [fields, onSubmit, formRef]);

	return (
		<>
			<ModalBody className="" paddingX="0" paddingY="0">
				<form className="flex flex-col h-[500px]" ref={formRef}>
					<div className="p-3 pt-4 flex gap-4 rounded-lg mb-4 bg-zinc-100">
						<label className=" flex-1 ">
							<div className="mb-2 text-xs font-semibold ">
								Document name
							</div>
							<input
								name="docName"
								required
								type="text"
								className="border border-zinc-200 rounded-md p-2 w-full"
							/>
						</label>
						<label className=" flex-1">
							<div className="mb-2 text-xs font-semibold">
								Patient address
							</div>
							<input
								name="patientAddress"
								required
								type="text"
								placeholder="0x123"
								className="border border-zinc-200 rounded-md p-2 w-full "
							/>
						</label>
					</div>

					{fields.length !== 0 ? (
						<div className="flex gap-2.5 text-xs font-semibold mb-2">
							<div className="px-2 flex-[3]">Key</div>
							<div className="px-2 flex-[6]">Value</div>
							<div className="px-2 flex-1"></div>
						</div>
					) : null}
					<div
						className="flex flex-col flex-1 gap-1.5 overflow-scroll h-full p-1"
						key={fields.length}
					>
						{fields.map((e, idx) => (
							<EditableFormInput
								fieldKey={e.key}
								fieldValue={e.value}
								onClick={() => onRemoveField(idx)}
								onKeyChange={(v) => onKeyChange(idx, v)}
								onValueChange={(v) => onValueChange(idx, v)}
							/>
						))}

						{fields.length < 10 ? (
							<div
								className="mb-5 mt-3 border border-zinc-300 bg-zinc-100 rounded-md text-sm  p-2 cursor-pointer text-center font-semibold text-zinc-600 hover:bg-zinc-200 transition-colors ease-in-out duration-200"
								onClick={() => onAddField("", "")}
							>
								Add a field
							</div>
						) : null}
					</div>
				</form>
			</ModalBody>

			<ModalFooter justifyContent="center" paddingTop="0" marginTop="1rem">
				<Button
					isDisabled={fields.length > 0 ? false : true}
					borderRadius="3xl"
					paddingX="14"
					className=""
					colorScheme="blue"
					mr={3}
					onClick={handleSubmit}
				>
					Submit Document
				</Button>
			</ModalFooter>
		</>
	);
}
