import { motion, AnimatePresence } from "framer-motion";

import { LogOut, Menu, ShoppingBag, User, X } from "lucide-react";
import { NavBarLinksType } from "./Navbar.types";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import logo from "../../assets/image1.jpeg";
import { useAuth } from "../../context/AuthProvider";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { HandleLogout } from "../../utils/HandleLogout";
import useMobileHandler from "../../hooks/useMobileHandler";
import { useAppSelector } from "../../redux/hooks/reduxhooks";
import { cn } from "../../utils/cn";
export default function NavBar() {
	const cart = useAppSelector((state) => state.cart);
	const [open, setOpen] = useState(false);
	const { isMobile } = useMobileHandler();
	const { auth, setAuth } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const token = localStorage.getItem("token");
	const decodedToken = token ? jwtDecode<JwtPayload>(token) : null;

	const NavBarLinks: NavBarLinksType[] = [
		{
			path: "/",
			name: "Home",
		},
		{
			path: "/books",
			name: "books",
		},
		{
			path: "/contactUs",
			name: "Contact Us",
		},
		{
			path: "/profile",
			name: "Profile",
		},
	];

	return (
		<nav className="bg-white md:py-4 md:px-6 px-3 py-2 flex justify-between items-center shadow-md">
			<div className="flex items-center gap-3">
				<div className="w-12 h-12 bg-gray-300 rounded-full flex justify-center items-center">
					<img
						className="max-w-full h-full object-cover rounded-full"
						src={logo}
						alt="logo"
					/>
				</div>
				<Link to={"/profile"} className="font-[600] text-main hover:underline">
					{auth?.profile.first_name} {auth?.profile.last_name}
				</Link>
			</div>
			<ul className="hidden md:flex space-x-6">
				{NavBarLinks.map((link, index) => (
					<React.Fragment key={index}>
						<li
							className={`${
								location.pathname === link.path ? "text-[#ED553B]" : ""
							} lg:text-[15px] md:text-[10px] font-[500] uppercase hover:text-[#ED553B] transition-colors duration-200 `}
						>
							<Link to={link.path}>{link.name}</Link>
						</li>
						{index + 1 !== NavBarLinks.length && (
							<div className="w-[2px] h-[20px] border-r-[2px] border-[#D1D1D1]"></div>
						)}
					</React.Fragment>
				))}
				{auth?.profile.role === "Admin" && (
					<>
						<div className="w-[2px] h-[20px] border-r-[2px] border-[#D1D1D1]"></div>
						<li
							className={`${
								location.pathname.includes("/dashboard") ? "text-[#ED553B]" : ""
							} lg:text-[15px] md:text-[10px] font-[500] uppercase hover:text-[#ED553B] transition-colors duration-200 `}
						>
							<Link to={"/dashboard"}>{"dashboard"}</Link>
						</li>
					</>
				)}
			</ul>
			<div className="flex space-x-4">
				<Link
					to={"/profile"}
					className="hover:text-[#ED553B] transition-colors duration-200"
				>
					<User className="lg:w-[22px] w-[15px]" />
				</Link>
				{auth?.profile.role !== "Admin" && (
					<Link
						to={"/checkout"}
						className={cn(
							`relative hover:text-[#ED553B] transition-colors duration-200 `
						)}
					>
						<div
							className={cn(
								`md:w-5 md:h-5 w-3 h-3 rounded-full absolute -top-1 md:-top-4 -right-[9px] bg-orange-400 flex justify-center items-center text-sm text-white z-10 p-1 font-semibold `
							)}
						>
							{cart.items.length}
						</div>
						<ShoppingBag className="lg:w-[22px] w-[15px]" />
					</Link>
				)}

				{decodedToken && (
					<button
						onClick={() => {
							HandleLogout();
							setAuth(null);
							navigate("/auth");
						}}
					>
						<LogOut className="lg:w-[22px] w-[15px]" />
					</button>
				)}

				{isMobile && (
					<button
						onClick={() => {
							setOpen(true);
						}}
					>
						<Menu />
					</button>
				)}
			</div>
			{
				<AnimatePresence>
					{open && isMobile && (
						<>
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.5 }}
								onClick={() => {
									setOpen(false);
								}}
								className="left-0 top-0 h-full z-20 fixed inset-0 overflow-hidden bg-black bg-opacity-50"
							></motion.div>
							<motion.div
								initial={{ x: 100, opacity: 0 }}
								animate={open ? { opacity: 1, x: 0 } : {}}
								exit={{ x: 100, opacity: 0 }}
								transition={{ duration: 0.5 }}
								className={`fixed ${
									open ? "" : "hidden"
								} right-0 top-0 z-[999] w-[55%] lg:top-5`}
							>
								<ul
									className={`flex  h-screen w-full flex-col items-start justify-start gap-10 bg-white p-3 backdrop-blur-lg lg:hidden`}
								>
									<button
										aria-label="clos sidebar"
										className="text-4xl text-black"
										onClick={() => setOpen(false)}
									>
										<X />
									</button>
									{NavBarLinks.map((item, index) => {
										return (
											<motion.li
												initial={{ opacity: 0, x: 100 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{
													delay: 0.2 * index,
													ease: [0.17, 0.55, 0.55, 1],
												}}
												className={`relative  text-lg before:absolute before:bottom-[-5px] before:left-0 before:h-[3px] before:w-0 before:bg-slate-950 before:transition-all before:duration-300 hover:before:w-full $`}
												key={index}
											>
												<NavLink
													to={`${item.path}`}
													onClick={() => {
														setOpen(false);
													}}
													className="cursor-pointer capitalize"
												>
													{item.name}
												</NavLink>
											</motion.li>
										);
									})}
									{auth?.profile.role === "Admin" && (
										<>
											<motion.li
												initial={{ opacity: 0, x: 100 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{
													delay: 0.2 * NavBarLinks.length,
													ease: [0.17, 0.55, 0.55, 1],
												}}
												className={`relative  text-lg before:absolute before:bottom-[-5px] before:left-0 before:h-[3px] before:w-0 before:bg-slate-950 before:transition-all before:duration-300 hover:before:w-full $`}
											>
												<NavLink
													to={"/dashboard"}
													onClick={() => {
														setOpen(false);
													}}
												>
													{"dashboard"}
												</NavLink>
											</motion.li>
										</>
									)}
								</ul>
							</motion.div>
						</>
					)}
				</AnimatePresence>
			}
		</nav>
	);
}
