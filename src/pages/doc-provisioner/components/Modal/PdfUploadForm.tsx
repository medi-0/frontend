import { Button, ModalBody, ModalFooter, Spinner } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { humanFileSize, parsePdf, processText } from "../../../../lib/utils";
import Dropzone, { DropEvent, FileRejection } from "react-dropzone";
import { ReactComponent as FileIcon } from "../../../../lib/assets/svg/file.svg";
interface PdfUploadProps {
	onSubmit: (text: string) => void;
}

interface FileUploadInputProps {
	onDrop: (
		acceptedFiles: File[],
		fileRejections: FileRejection[],
		event: DropEvent
	) => void;
}

function FileUploadInput({ onDrop }: FileUploadInputProps) {
	return (
		<Dropzone
			multiple={false}
			maxFiles={1}
			onDrop={onDrop}
			disabled={false}
			accept={{
				"application/pdf": [".pdf"],
			}}
		>
			{({ getRootProps, getInputProps, acceptedFiles, isDragActive }) => (
				<div
					{...getRootProps()}
					style={{
						backgroundColor: isDragActive ? "#f5f5f5" : undefined,
						boxShadow: isDragActive
							? "inset 0 2px 8px 0 #aaaaaac8"
							: undefined,
					}}
					className={`group/fileinput relative flex-1 border border-neutral-400 rounded-md flex items-center justify-center cursor-pointer hover:bg-neutral-100 transition-colors ease-in-out duration-200`}
				>
					<input {...getInputProps()} className="hidden" />
					<div className="absolute inset-0  group-hover/fileinput:text-zinc-500 text-zinc-400 transition-colors ease-in-out duration-200 h-full flex flex-col items-center justify-center">
						<FileIcon className="" height="27px" />
						{acceptedFiles[0] ? (
							<div className="text-sm flex justify-center p-2">
								<div>
									<span>{acceptedFiles[0].name}</span>
									<span>{" - "}</span>
									<span>{humanFileSize(acceptedFiles[0].size)}</span>
								</div>
							</div>
						) : (
							<div className="text-sm mt-2">Select a file</div>
						)}
					</div>
				</div>
			)}
		</Dropzone>
	);
}

export default function PdfUploadForm({ onSubmit }: PdfUploadProps) {
	const [file, setFile] = useState<File | null>(null);
	const [_isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = function () {
		if (!file) return;

		setIsLoading(true);

		parsePdf(file)
			// file
			// .text()
			.then((value) => {
				// const respText =
				// 	'[{"key": "name", "value": "The value"}, {"key": "date of birth", "value": "Another value"}, {"key": "treatments", "value": ""}, {"key": "medicines", "value": ""}, {"key": "allergies", "value": ""}, {"key": "x-ray results", "value": ""}, {"key": "hostpital admission", "value": ""}, {"key": "hostpital discharge", "value": ""}, {"key": "lifestyle", "value": ""}]';
				// console.log("parse pdf", value);
				// file.text()

				console.log("something bruh", value);

				processText(value).then(({ respText }) => {
					onSubmit(respText);
					setIsError(false);
				});

				// onSubmit(respText);
				// setIsError(false);
			})
			.catch((_e) => setIsError(true))
			.finally(() => setIsLoading(true));

		// 	.then((value) => {
		// 		// const respText =
		// 		// 	'[{"key": "name", "value": "The value"}, {"key": "date of birth", "value": "Another value"}, {"key": "treatments", "value": ""}, {"key": "medicines", "value": ""}, {"key": "allergies", "value": ""}, {"key": "x-ray results", "value": ""}, {"key": "hostpital admission", "value": ""}, {"key": "hostpital discharge", "value": ""}, {"key": "lifestyle", "value": ""}]';

		// 		processText(value).then(({ respText }) => {
		// 			onSubmit(respText);
		// 			setIsError(false);
		// 		});

		// 		// onSubmit(respText);
		// 		// setIsError(false);
		// 	})
		// 	.catch((_e) => setIsError(true))
		// 	.finally(() => setIsLoading(true));

		// const text = await file?.text();
		// const { respText } = await processText(text);
		// this is for testing only
		// to avoid making too many requests
	};

	const handleFileDrop = (
		acceptedFiles: File[],
		_fileRejections: FileRejection[],
		_event: DropEvent
	) => {
		setFile(acceptedFiles[0] || null);
	};

	return (
		<>
			<ModalBody className="flex h-72" minH="300px" paddingX="0" paddingY="0">
				{isLoading ? (
					<div className="flex-1 flex items-center justify-center">
						<Spinner />
					</div>
				) : (
					<FileUploadInput onDrop={handleFileDrop} />
				)}
			</ModalBody>
			{isLoading ? null : (
				<ModalFooter justifyContent="center">
					<Button
						isDisabled={file ? false : true}
						borderRadius="3xl"
						paddingX="14"
						className=""
						colorScheme="blue"
						mr={3}
						onClick={handleSubmit}
					>
						Upload
					</Button>
				</ModalFooter>
			)}
		</>
	);
}
