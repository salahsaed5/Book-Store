import React from "react";
import { cn } from "../../utils/cn";
import type { ClassValue } from "clsx";

export default function Header({
	children,
	subTitle,
	className,
}: {
	children: React.ReactNode;
	subTitle: string;
	className?: ClassValue;
}) {
	return (
		<div className="flex justify-center items-center text-center relative my-10">
			<div className="absolute left-2/4 transform -translate-x-2/4 top-2/4 -translate-y-2/4 w-full h-[0.9px] bg-[#E0E0E0]"></div>
			<div className="bg-white w-[350px] z-10">
				<h2 className="text-xs text-[#7A7A7A] uppercase tracking-wide text-primary">
					{subTitle}
				</h2>
				<h3
					className={cn(
						"mt-4 text-3xl font-[400] text-[#173F5F] sm:text-4xl",
						className
					)}
				>
					{children}
				</h3>
			</div>
		</div>
	);
}
