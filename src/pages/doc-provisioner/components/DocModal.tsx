import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
} from "@chakra-ui/react";
import { useState } from "react";
import cloneDeep from "lodash.clonedeep";
import { useMainModelContext } from "../../../providers/MainModalContext";
function DocFieldBox({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	const classes = `border border-zinc-400 p-2 text-sm rounded-md flex-1 ${className}`;
	return <div className={classes} {...props} />;
}

function DocFieldUnconfirmed({
	onClick,
	fieldKey,
	fieldValue,
}: {
	fieldKey: string;
	fieldValue: string;
	onClick: () => void;
}) {
	return (
		<div className="flex gap-2.5">
			<DocFieldBox className="flex-[3]">{fieldKey}</DocFieldBox>
			<DocFieldBox className="flex-[6]">{fieldValue}</DocFieldBox>
			<div className="border flex-1" onClick={onClick}>
				x
			</div>
		</div>
	);
}

function DocModalContainer() {
	const [fields, setFields] = useState<any[]>(["1", "2", "3"]);

	const onFieldDelete = (idx: number) => {
		setFields((prev) => {
			const newFields = cloneDeep(prev);
			newFields.splice(idx, 1);
			return newFields;
		});
	};

	return <DocModal fields={fields} onFieldDelete={onFieldDelete} />;
}

interface Props {
	fields: any[];
	// the index of the field in the array of fields
	onFieldDelete: (idx: number) => void;
}

function DocModal({ fields, onFieldDelete }: Props) {
	const mainModal = useMainModelContext();

	return (
		<Modal isOpen={mainModal.isOpen} onClose={mainModal.onClose}>
			<ModalOverlay />
			<ModalContent w="1000px" maxW="1000px">
				<ModalHeader>Title</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<div></div>

					{fields.length != 0 ? (
						<div>
							<div className="flex gap-2.5 text-xs font-semibold mb-3  ">
								<div className="px-2 flex-[3]">Key</div>
								<div className="px-2 flex-[6]">Value</div>
								<div className="px-2 flex-1"></div>
							</div>
							<div className="flex flex-col gap-1.5">
								{fields.map((f, idx) => (
									<DocFieldUnconfirmed
										fieldKey="key"
										fieldValue={f}
										onClick={() => onFieldDelete(idx)}
									/>
								))}
							</div>
						</div>
					) : (
						<div>no fields</div>
					)}
				</ModalBody>

				<ModalFooter justifyContent="center">
					<Button
						borderRadius="3xl"
						paddingX="14"
						className=""
						colorScheme="blue"
						mr={3}
						onClick={mainModal.onClose}
					>
						Provision Document
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default DocModalContainer;
