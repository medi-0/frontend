import { useEffect } from "react";
import Landing from "./pages/Landing";
import MainProvider from "./providers";
import Error404Page from "./pages/404";
import Verifier from "./pages/Verifier";
import { useUser } from "./providers/UserProvider";
import UserSpecificView from "./pages/UserSpecificView";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";

function App() {
	const {
		account: { isDisconnected },
	} = useUser();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === "/app" && isDisconnected) navigate("/");
	}, [isDisconnected, location, navigate]);

	return (
		<>
			<Routes>
				<Route path="/" element={<Landing />} />

				<Route path="/verifier" element={<Verifier />} />

				<Route path="/app" element={<UserSpecificView />} />

				<Route path="/404" element={<Error404Page />} />
			</Routes>
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
