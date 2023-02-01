import { useCallback, useEffect, useState } from "react";

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
			className="flex gap-2.5 items-center cursor-pointer"
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
			<div className="flex-1">
				<div className="flex border border-zinc-200 p-[0.11rem] w-4 h-4 mx-auto rounded-full">
					<div
						className={`flex-1 ${
							isSelected ? "bg-zinc-300" : ""
						} rounded-full transition-colors ease-in-out duration-150`}
					></div>
				</div>
			</div>
		</div>
	);
}

interface SelectableFormProps {
	defaultFields: Field[];
	onSubmit: (data: Field[]) => void;
}

export default function SelectableForm({ defaultFields, onSubmit }: SelectableFormProps) {
	const [fields] = useState<Field[]>(defaultFields);
	const [selected, setSelected] = useState<number[]>([]);

	useEffect(() => {
		console.log("selected", selected);
	}, [selected]);

	const onSelectField = useCallback((idx: number) => {
		setSelected((prev) => {
			const arr = [...prev];
			const exist = arr.findIndex((value) => value === idx);

			if (exist === -1) arr.push(idx);
			else arr.splice(exist, 1);

			return arr;
		});
	}, []);

	return (
		<>
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
		</>
	);
}
