import MenuBar from "../components/MenuBar";
import { UserRole } from "../lib/types";
import PatientView from "./fact-prover";
import HospitalView from "./doc-provisioner";
import { useUser } from "../providers/UserProvider";

export default function UserSpecificView() {
	const {
		role: { type },
	} = useUser();

	return (
		<div
			style={{ gridTemplateRows: "min-content 1fr" }}
			className="px-10 pt-5 pb-10 font-san h-screen grid gap-6"
		>
			<MenuBar />
			<div className="h-full">
				<div className="w-full h-full min-h-[300px] p-4 pt-3 rounded-lg border-2 border-[#432366] overflow-clip relative">
					{type === UserRole.HOSPITAL_ROLE ? (
						<HospitalView />
					) : type === UserRole.PATIENT_ROLE ? (
						<PatientView />
					) : (
						<div>you are not registered bruh?</div>
					)}
				</div>
			</div>
		</div>
	);
}
