import React from "react";

export default function ChildrenContainer({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="container max-w-4xl p-6 relative">
			{children}
		</div>
	);
}
