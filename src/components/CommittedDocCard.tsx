import moment from "moment";
import { CommittedMedicalDocumentHeader } from "../lib/types";

interface Props {
	data: CommittedMedicalDocumentHeader;
	onClick: () => void;
}

function CommittedDocCard({ data, onClick }: Props) {
	const date = moment.unix(data.blockTimestamp).toLocaleString();

	return (
		<div
			className="group/doccard flex justify-between items-center cursor-pointer border border-zinc-400 px-4 py-1.5 rounded-md text-sm hover:bg-zinc-100 transition-colors ease-in-out duration-150"
			onClick={onClick}
		>
			<div>
				<div className="font-bold mb-1">{data.fileName}</div>
				<div className="text-xs">
					<span>Patient ID : </span>
					<span className="italic">{data.patient}</span>
				</div>
			</div>
			<div className="text-xs italic">
				<span>{date}</span>
			</div>
		</div>
	);
}

export default CommittedDocCard;
