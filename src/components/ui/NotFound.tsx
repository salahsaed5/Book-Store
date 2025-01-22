import React from "react";

export default function NotFound({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-[50vh] flex justify-center items-center">
			<h1 className="text-3xl font-bold text-center">No {children} Found</h1>
		</div>
	);
}
