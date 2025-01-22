import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { Navigate, useLocation } from "react-router-dom";
import { RefreshToken } from "../Api/Customer/Auth";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
	const { auth, loading, setAuth } = useAuth();
	const location = useLocation();
	const [isValid, setIsValid] = useState(false);
	// console.log(jwtDecode<JwtPayload>(auth?.accessToken));
	useEffect(() => {
		const validateToken = async () => {
			if (loading) return;

			const accessToken = auth?.accessToken;
			const refreshToken = auth?.refreshToken;

			if (!accessToken || !refreshToken) {
				setIsValid(false);
				return;
			}

			try {
				const decodedAccessToken = jwtDecode<JwtPayload>(accessToken);
				if (!decodedAccessToken) {
					const res = await RefreshToken(refreshToken);
					if (res?.accessToken) {
						setAuth({
							...auth,
							accessToken: res.accessToken,
						});
					} else {
						setIsValid(false);
						return;
					}
				}
				setIsValid(true);
			} catch (error) {
				console.error("Invalid token", error);
				setIsValid(false);
			}
		};

		validateToken();
	}, [auth, loading]);

	// Loading while validating token
	if (loading) {
		return <div>Loading...</div>;
	}

	// Redirect to /auth if token is invalid
	if (!isValid && location.pathname === "/") {
		return <Navigate to="/auth" state={{ from: location }} replace />;
	}

	// Redirect if authenticated and trying to access /auth
	if (
		location.pathname === "/auth" &&
		auth?.accessToken &&
		auth?.refreshToken
	) {
		return <Navigate to="/" replace />;
	}

	return <>{children}</>;
}
