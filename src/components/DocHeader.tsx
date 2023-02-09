import moment from "moment";
import { truncateHexWithEllipsis } from "../lib/utils";
import { ReactComponent as OpenLinkIcon } from "../lib/assets/svg/open-link.svg";

interface Props {
	filename: string;
	hospitalName: string;
	hospitalAddress: string;
	patientAddress: string;
	timestamp: number;
	fileHash: string;
	cid: string;
	type: "HOSPITAL" | "PATIENT";
}

export function DocHeader({
	cid,
	filename,
	fileHash,
	hospitalName,
	hospitalAddress,
	patientAddress,
	timestamp,
	type,
}: Props) {
	return (
		<>
			<div className="flex justify-between mb-3.5">
				<div className="flex flex-col">
					<span className="text-xs font-semibold">Document name</span>
					<span className="font-bold text-lg">{filename}</span>
				</div>
			</div>

			<div className="flex flex-col">
				<div>
					<span className="text-xs font-semibold mr-1 text-neutral-500 italic">
						IPFS CID
					</span>
					<span className="text-sm font-semibold inline-flex items-center hover:underline">
						<a
							target="_blank"
							rel="noreferrer"
							href={`https://${cid}.ipfs.w3s.link/`}
							className="whitespace-nowrap overflow-hidden text-ellipsis"
						>
							{truncateHexWithEllipsis(cid)}
						</a>
						<OpenLinkIcon height="10px" className="ml-[-5px]" />
					</span>
				</div>

				<div>
					<span className="text-xs font-semibold mr-1 text-neutral-500 italic">
						Document hash
					</span>
					<span className="text-sm font-semibold">
						{truncateHexWithEllipsis(fileHash)}
					</span>
				</div>

				<div className="flex justify-between ">
					<div className="flex gap-5">
						{type === "PATIENT" && (
							<div>
								<span className="text-xs font-semibold mr-1 text-neutral-500 italic">
									Provisioned by
								</span>
								<span className="text-sm  font-semibold">
									{hospitalName}
								</span>
							</div>
						)}

						<div>
							<span className="text-xs font-semibold mr-1 text-neutral-500 italic">
								{type === "PATIENT"
									? "Provisioner ID"
									: "Provisioned for"}
							</span>
							<span className="inline-flex items-center text-sm hover:underline  font-semibold">
								<a
									target="_blank"
									rel="noreferrer"
									href={`https://mumbai.polygonscan.com/address/${
										type === "PATIENT"
											? hospitalAddress
											: patientAddress
									}`}
								>
									{truncateHexWithEllipsis(
										type === "PATIENT"
											? hospitalAddress
											: patientAddress
									)}
								</a>
								<OpenLinkIcon height="10px" className="ml-[-5px]" />
							</span>
						</div>
					</div>

					<div>
						<span className="text-xs font-semibold mr-1 text-neutral-500 italic">
							Timestamp
						</span>
						<span className="text-sm font-semibold">
							{moment.unix(timestamp).toLocaleString()}
						</span>
					</div>
				</div>
			</div>
		</>
	);
}
