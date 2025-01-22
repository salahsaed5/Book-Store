import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

export default function RoleProtected({
	children,
}: {
	children: React.ReactNode;
}) {
	const { auth } = useAuth();

	return (
		<>
			{auth?.profile.role === "Admin" ? (
				children
			) : (
				<Navigate to="/" replace={true} />
			)}
		</>
	);
}
