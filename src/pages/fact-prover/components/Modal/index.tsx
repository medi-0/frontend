import {
	Modal as ChakraModal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { Field } from "../../../../lib/utils";
import { useMainModelContext } from "../../../../providers/MainModalContext";
import SelectableForm from "./SelectableForm";

function Modal() {
	const mainModal = useMainModelContext();

	const handleFormSubmit = useCallback((data: Field[]) => {}, []);

	return (
		<ChakraModal isOpen={mainModal.isOpen} onClose={mainModal.onClose} isCentered>
			<ModalOverlay />
			<ModalContent
				margin="2rem"
				w="1000px"
				minW="600px"
				maxW="1000px"
				minH="400px"
				maxH="600px"
				borderRadius="2xl"
				display="flex"
			>
				<ModalHeader paddingBottom="0.5rem">Title</ModalHeader>
				<ModalCloseButton />
				<ModalBody className="flex flex-col  h-72" padding="1rem 1.2rem">
					<div className="border border-zinc-400 rounded-md p-3 mb-6 ">
						some text here
					</div>

					<SelectableForm
						defaultFields={[
							{
								key: "key1",
								value: "value1",
							},
							{
								key: "key2",
								value: "value2",
							},
							{
								key: "key3",
								value: "value3",
							},
							{
								key: "key4",
								value: "value4",
							},
							{
								key: "key5",
								value: "value5",
							},
						]}
						onSubmit={handleFormSubmit}
					/>
				</ModalBody>

				<ModalFooter justifyContent="center">
					<Button
						borderRadius="3xl"
						paddingX="14"
						className=""
						colorScheme="blue"
						mr={3}
						// onClick={mainModal.onClose}
						// onClick={() => console.log("fields", fields)}
					>
						Generate Proof
					</Button>
				</ModalFooter>
			</ModalContent>
		</ChakraModal>
	);
}

export default Modal;
