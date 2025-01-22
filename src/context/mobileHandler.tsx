import React, { createContext, useEffect, useState, useCallback } from "react";

interface MobileHandlerContextType {
	isMobile: boolean | null;
}

const MobileHandlerContext = createContext<
	MobileHandlerContextType | undefined
>(undefined);

function MobileHandlerProvider({ children }: { children: React.ReactNode }) {
	const [isMobile, setIsMobile] = useState<boolean | null>(null);

	const isMobileHandler = useCallback((e: MediaQueryListEvent) => {
		setIsMobile(e.matches);
	}, []);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width:1024px)");

		// Set initial state
		setIsMobile(mediaQuery.matches);

		// Add event listener
		mediaQuery.addEventListener("change", isMobileHandler);

		// Cleanup event listener on unmount
		return () => {
			mediaQuery.removeEventListener("change", isMobileHandler);
		};
	}, [isMobileHandler]);

	return (
		<MobileHandlerContext.Provider value={{ isMobile }}>
			{children}
		</MobileHandlerContext.Provider>
	);
}

export { MobileHandlerProvider, MobileHandlerContext };
export type { MobileHandlerContextType };
