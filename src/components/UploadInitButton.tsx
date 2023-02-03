import { ReactComponent as UploadSvg } from "../lib/assets/svg/upload.svg";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function UploadInitButton({ ...props }: Props) {
	return (
		<button
			className="group/button absolute right-5 bottom-5 bg-neutral-800 flex items-center p-3 rounded-full shadow-xl text-white "
			{...props}
			type="button"
		>
			<UploadSvg className="" height="29px" width="29px" />
			<div className="w-0 group-hover/button:ml-1 group-hover/button:w-28 overflow-clip whitespace-nowrap transition-[width] duration-200 ease-in-out font-bold">
				Upload
			</div>
		</button>
	);
}
