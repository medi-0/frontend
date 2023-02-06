import { createContext, PropsWithChildren, useContext } from "react";
import { UserRole } from "../lib/types";
import { useAccount } from "wagmi";
import { useUserRole } from "../lib/hooks/useUserRole";

interface TUserContext {
	role: ReturnType<typeof useUserRole>;
	account: Omit<ReturnType<typeof useAccount>, "connector">;
}

export const UserContext = createContext<TUserContext>({
	account: {
		address: undefined,
		isConnected: false,
		isConnecting: false,
		isDisconnected: false,
		isReconnecting: false,
		status: "disconnected",
	},
	role: {
		isError: false,
		isLoading: false,
		type: UserRole.UNREGISTERED,
	},
});

export const useUser = function () {
	return useContext(UserContext);
};

export const UserProvider: React.FC<PropsWithChildren> = function ({ children }) {
	const role = useUserRole();
	const { connector, ...account } = useAccount();

	// useEffect(() => {
	// 	if (!isDisconnected) return;
	// }, [isDisconnected]);

	return (
		<UserContext.Provider value={{ role, account }}>{children}</UserContext.Provider>
	);
};
