import Landing from "./pages/Landing";
import Patient from "./pages/Patient";
import MainProvider from "./providers";
import Hospital from "./pages/Hospital";
import Verifier from "./pages/Verifier";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useUser } from "./providers/UserProvider";
import { UserRole } from "./lib/types";
import Error404Page from "./pages/404";

function App() {
	const { role } = useUser();
	const navigate = useNavigate();

	const handleClick = function () {
		navigate("/app/patient");
	};

	return (
		<>
			<Routes>
				<Route path="/" element={<Landing />} />

				<Route path="/verifier" element={<Verifier />} />

				{role.type === UserRole.PATIENT_ROLE && (
					<Route path="/app/patient" element={<Patient />} />
				)}

				{role.type === UserRole.HOSPITAL_ROLE && (
					<Route path="/app/hospital" element={<Hospital />} />
				)}

				<Route path="/404" element={<Error404Page />} />
			</Routes>

			<button onClick={handleClick}>open app</button>
		</>
	);
}

function AppWithContext() {
	return (
		<BrowserRouter>
			<MainProvider>
				<App />
			</MainProvider>
		</BrowserRouter>
	);
}

export default AppWithContext;
