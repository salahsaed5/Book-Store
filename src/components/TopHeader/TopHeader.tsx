import {
	Phone,
	Facebook,
	Instagram,
	Linkedin,
	Twitter,
	// BookOpen,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import type { TopNavBarSocialMediaLinks } from "./TopNavBar.types";
import React from "react";

export default function TopHeader() {
	const TopNavBarLinks: TopNavBarSocialMediaLinks[] = [
		{
			path: "https://www.facebook.com",
			icon: Facebook,
		},
		{
			path: "",
			icon: Instagram,
		},
		{
			path: "https://www.linkedin.com",
			icon: Linkedin,
		},
		{
			path: "",
			icon: Twitter,
		},
		// {
		// 	path: "https://www.amazon.com",
		// 	icon: BookOpen,
		// },
	];
	return (
		<div className="bg-main text-white py-2 px-4 flex justify-between items-center h-[40px]">
			<div className="flex items-center">
				<Phone size={18} className="mr-2" />
				<span>+91 8374902234</span>
			</div>
			<div className="flex space-x-4 h-full items-center">
				{TopNavBarLinks.map((el, idx) => (
					<React.Fragment key={idx}>
						<NavLink
							to={el.path}
							className={`text-white hover:text-gray-300 ${
								idx + 1 !== TopNavBarLinks.length
									? "border-r-[1px] border-[#D1D1D1] pr-2"
									: ""
							}`}
						>
							<el.icon size={18} />
						</NavLink>
						{/* {idx + 1 !== TopNavBarLinks.length && (
							// <div className="w-[2px] h-[20px] border-r-[2px] border-[#D1D1D1]/40"></div>
							<Divider orientation="vertical" variant="middle" flexItem />
						)} */}
					</React.Fragment>
				))}
			</div>
		</div>
	);
}
