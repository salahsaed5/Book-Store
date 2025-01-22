import {
	createContext,
	useState,
	useContext,
	ReactNode,
	useEffect,
} from "react";

// Define the type for the auth state and the setAuth function
interface AuthContextType {
	auth: AuthState | null;
	setAuth: (auth: AuthState | null) => void;
	loading: boolean;
}

// Define the type for the authentication data
interface AuthState {
	accessToken: string;
	refreshToken: string;
	profile: {
		_id: string;
		first_name: string;
		last_name: string;
		email: string;
		status: string;
		role: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		shipping_addresses: any[]; // Adjust this as needed
	};
}

// Create the AuthContext with a default value of undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for consuming the auth context
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

// AuthProvider component to wrap your app and provide the auth state
export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [auth, setAuth] = useState<AuthState | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const accessToken = localStorage.getItem("token");
		const refreshToken = localStorage.getItem("refreshToken");
		const profile = localStorage.getItem("profile");

		if (accessToken && refreshToken && profile) {
			const storedAuth = JSON.parse(profile);
			setAuth({ profile: storedAuth, accessToken, refreshToken });
		}
		setLoading(false); // Finished loading
	}, []);

	return (
		<AuthContext.Provider value={{ auth, setAuth, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
