import axios from "axios";
import { useCallback, useRef, useState } from "react";
import { ReactComponent as FileIcon } from "../assets/svg/file.svg";
import { humanFileSize } from "../utils";

export default function usePdfUploader() {
	const textRef = useRef<HTMLDivElement | null>(null);
	const [file, setFile] = useState<File | null>(null);

	const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(function (
		e
	) {
		console.log(file?.size);

		if (e.currentTarget.files) setFile(e.currentTarget.files.item(0));
	},
	[]);

	const onUpload = useCallback(async () => {
		const formData = new FormData();
		formData.append("file", file as Blob);

		try {
			const res = await axios.post<{ data: string }>(
				"http://13.229.230.171/processpdf",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			return res.data.data;
		} catch (e) {
			throw e;
		}
	}, [file]);

	const Input = useCallback(
		(props: React.LabelHTMLAttributes<HTMLLabelElement>) => (
			<label
				className="group/fileinput hover:bg-zinc-100 relative border border-zinc-300 rounded-md cursor-pointer transition-colors ease-in-out duration-200 flex-1"
				onMouseOver={() =>
					textRef.current ? (textRef.current.innerText = "Select a file") : null
				}
				onMouseOut={() =>
					textRef.current && file
						? (textRef.current.innerHTML = `<div><span>${
								file.name
						  }</span><span> - </span><span>${humanFileSize(
								file.size
						  )}</span></div>`)
						: null
				}
			>
				<input
					type="file"
					accept="application/pdf"
					onChange={onChange}
					className="hidden"
				/>
				<div className="group-hover/fileinput:text-zinc-500 transition-colors ease-in-out duration-200 h-full flex flex-col items-center justify-center">
					<FileIcon className="" />
					<div ref={textRef} className=" flex justify-center p-2">
						{file ? (
							<div>
								<span>{file.name}</span>
								<span>-</span>
								<span>{humanFileSize(file.size)}</span>
							</div>
						) : (
							"Select a file"
						)}
					</div>
				</div>
			</label>
		),
		[file]
	);

	return {
		file,
		Input,
		onUpload,
	};
}
