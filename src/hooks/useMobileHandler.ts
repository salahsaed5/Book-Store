import { useContext } from "react";
import {
	MobileHandlerContext,
	MobileHandlerContextType,
} from "../context/mobileHandler";

export default function useMobileHandler(): MobileHandlerContextType {
	const context = useContext(MobileHandlerContext);

	if (!context) {
		throw new Error(
			"useMobileHandler must be used within a MobileHandlerProvider"
		);
	}

	return context;
}
