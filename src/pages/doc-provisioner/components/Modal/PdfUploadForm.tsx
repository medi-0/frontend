import { Button, ModalBody, ModalFooter } from "@chakra-ui/react";
import usePdfUploader from "../../../../lib/hooks/useFileUploader";

interface PdfUploadProps {
	onSubmit: (text: string) => void;
}

export default function PdfUploadForm({ onSubmit }: PdfUploadProps) {
	const { Input, onUpload } = usePdfUploader();

	const handleSubmit = async function () {
		try {
			const res = await onUpload();
			onSubmit(res);
		} catch (e) {
			throw e;
		}
	};

	return (
		<>
			<ModalBody className="flex justify-center h-72" padding="1rem 1.2rem">
				<Input />
			</ModalBody>
			<ModalFooter justifyContent="center">
				<Button
					borderRadius="3xl"
					paddingX="14"
					className=""
					colorScheme="blue"
					mr={3}
					// onClick={mainModal.onClose}
					onClick={handleSubmit}
				>
					Upload
				</Button>
			</ModalFooter>
		</>
	);
}
