import { Edit, X } from "lucide-react";
import logo from "../assets/image1.jpeg";
import React, { useState } from "react";
import { Modal } from "@mui/material";
import ChangePassword from "../components/ChangePassword/ChangePassword";

interface Profile {
	_id: string;
	first_name: string;
	last_name: string;
	email: string;
	status: string;
	role: string;
	shipping_addresses: string[];
}

export default function ProfilePage() {
	const [open, setOpen] = useState<boolean>(false);
	const profileStringify = localStorage.getItem("profile");
	if (!profileStringify) {
		return <div>No data found</div>;
	}
	const profile: Profile = JSON.parse(profileStringify);

	return (
		<React.Fragment>
			<div className="min-h-screen bg-gray-100">
				{/* Cover Image */}
				{/* <div className="h-64 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div> */}

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
					<div className="bg-white rounded-lg shadow-xl pb-8">
						<div className="w-full h-[200px]">
							<div className="w-full h-full rounded-tl-lg rounded-tr-lg bg-custom-gradient"></div>
						</div>

						<div className="flex flex-col items-center -mt-20">
							<img
								src={logo}
								alt={`${profile.first_name} ${profile.last_name}`}
								width={200}
								height={200}
								className="w-40 h-40 border-4 border-white rounded-full"
							/>
							<div className="flex items-center space-x-2 mt-2">
								<p className="text-2xl font-bold">
									{profile.first_name} {profile.last_name}
								</p>
								<span
									className={`px-2 py-1 text-sm rounded-full ${
										profile.status === "active"
											? "bg-green-200 text-green-700"
											: "bg-red-200 text-red-700"
									}`}
								>
									{profile.status}
								</span>
							</div>
							<p className="text-gray-700 mt-1">{profile.email}</p>
							<p className="text-sm text-gray-500">{profile.role}</p>
						</div>

						<div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
							<div className="flex items-center space-x-4 mt-2">
								<button
									onClick={() => {
										setOpen(true);
									}}
									className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm space-x-2 transition duration-100"
								>
									<Edit />
									<span>Change Password</span>
								</button>
							</div>
						</div>
					</div>

					<div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
						<div className="w-full flex flex-col 2xl:w-1/3">
							<div className="flex-1 bg-white rounded-lg shadow-xl p-8">
								<h4 className="text-xl text-gray-900 font-bold">
									Personal Info
								</h4>
								<ul className="mt-2 text-gray-700">
									<li className="flex border-y py-2">
										<span className="font-bold w-24">Full name:</span>
										<span className="text-gray-700">
											{profile.first_name} {profile.last_name}
										</span>
									</li>
									<li className="flex border-b py-2">
										<span className="font-bold w-24">Email:</span>
										<span className="text-gray-700">{profile.email}</span>
									</li>
									<li className="flex border-b py-2">
										<span className="font-bold w-24">Role:</span>
										<span className="text-gray-700">{profile.role}</span>
									</li>
									<li className="flex border-b py-2">
										<span className="font-bold w-24">Status:</span>
										<span className="text-gray-700">{profile.status}</span>
									</li>
								</ul>
							</div>
						</div>
						<div className="w-full flex flex-col 2xl:w-2/3">
							<div className="flex-1 bg-white rounded-lg shadow-xl p-8">
								<h4 className="text-xl text-gray-900 font-bold">
									Shipping Addresses
								</h4>
								{profile.shipping_addresses.length > 0 ? (
									<div className="mt-4">
										{profile.shipping_addresses.map((address, index) => (
											<div
												key={index}
												className="bg-gray-100 p-4 rounded-lg mb-4"
											>
												<p>{address}</p>
											</div>
										))}
									</div>
								) : (
									<p className="mt-4 text-gray-700">
										No shipping addresses added
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			<Modal
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby="parent-modal-title"
				className="flex justify-center items-center"
				aria-describedby="parent-modal-description"
			>
				<div className="bg-white h-[550px] md:w-2/4 w-[90%] rounded-md p-5 flex flex-col gap-4">
					{/**close button */}
					<div className="flex justify-between flex-row-reverse">
						<button
							className="hover:text-main transition-colors duration-200"
							onClick={() => setOpen(false)}
						>
							<X />
						</button>

						<h3
							className={
								"mt-4 text-2xl font-[400] text-[#173F5F] sm:text-4xl capitalize"
							}
						>
							change your password
						</h3>
					</div>
					{/**change password component */}
					<div className="  flex justify-center items-center mt-20">
						<ChangePassword setOpen={setOpen} />
					</div>
				</div>
			</Modal>
		</React.Fragment>
	);
}
