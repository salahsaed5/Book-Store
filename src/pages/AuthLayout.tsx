import AuthBg from "../assets/AuthBg.png";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
	return (
		<div className="flex min-h-screen  font-Manrope">
			{/**bg image */}
			<div className="w-2/4 h-screen md:block hidden">
				<img className="object-cover max-h-full w-full" src={AuthBg} alt="" />
			</div>{" "}
			<Outlet />
		</div>
	);
}
