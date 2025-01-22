import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { ChangeOldPassword } from "../../Api/Customer/Auth";
import toast from "react-hot-toast";

interface ChangePasswordFormData {
	password: string;
	newPassword: string;
}

interface profileResponse {
	_id: string;
	title: string;
	status: string;
	email: string;
	last_name: string;
	first_name: string;
	role: string;
	shipping_addresses: string[];
	_v: number;
}
interface categoryDeleteResponse {
	code: number;
	data: profileResponse;
	message: string;
	status: string;
	timestamp: string;
}

export default function ChangePassword({
	setOpen,
}: {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);

	const {
		mutateAsync: ChangePasswordMutate,
		isPending: isLoadingChangePassword,
	} = useMutation<categoryDeleteResponse, Error, ChangePasswordFormData>({
		mutationKey: ["changePassword"],
		mutationFn: async (data: ChangePasswordFormData) => {
			const res = await ChangeOldPassword(data);
			console.log(res);
			return res;
		},
		onSuccess: (data) => {
			toast.success(data.message);
			setOpen(false);
		},
	});

	const formik = useFormik({
		initialValues: {
			password: "",
			newPassword: "",
		},
		validationSchema: Yup.object({
			password: Yup.string().required("Old password is required"),
			newPassword: Yup.string()
				.min(3, "Sorry, the password must contain at least 3 characters.")
				.matches(
					/[A-Z]/,
					"Sorry, the password must contain at least one uppercase letter."
				)
				.matches(
					/[a-z]/,
					"Sorry, the password must contain at least one lowercase letter."
				)
				.matches(
					/[0-9]/,
					"Sorry, the password must contain at least one number."
				)
				.matches(
					/[@$!%*?&#]/,
					"Sorry, the password must contain at least one special character."
				)
				.required("new Password is required."),
		}),
		onSubmit: async (values) => {
			await ChangePasswordMutate(values);
		},
	});

	return (
		<div className="w-full">
			<form onSubmit={formik.handleSubmit} className="space-y-4">
				<div>
					<label
						htmlFor="passsword"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Old Password
					</label>
					<div className="relative">
						<input
							id="password"
							name="password"
							type={showOldPassword ? "text" : "password"}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.password}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						/>
						<button
							type="button"
							onClick={() => setShowOldPassword(!showOldPassword)}
							className="absolute inset-y-0 right-0 pr-3 flex items-center"
						>
							{showOldPassword ? (
								<EyeOffIcon className="h-5 w-5 text-gray-400" />
							) : (
								<EyeIcon className="h-5 w-5 text-gray-400" />
							)}
						</button>
					</div>
					{formik.touched.password && formik.errors.password ? (
						<div className="text-red-500 text-sm mt-1">
							{formik.errors.password}
						</div>
					) : null}
				</div>
				<div>
					<label
						htmlFor="newPassword"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						New Password
					</label>
					<div className="relative">
						<input
							id="newPassword"
							name="newPassword"
							type={showNewPassword ? "text" : "password"}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.newPassword}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						/>
						<button
							type="button"
							onClick={() => setShowNewPassword(!showNewPassword)}
							className="absolute inset-y-0 right-0 pr-3 flex items-center"
						>
							{showNewPassword ? (
								<EyeOffIcon className="h-5 w-5 text-gray-400" />
							) : (
								<EyeIcon className="h-5 w-5 text-gray-400" />
							)}
						</button>
					</div>
					{formik.touched.newPassword && formik.errors.newPassword ? (
						<div className="text-red-500 text-sm mt-1">
							{formik.errors.newPassword}
						</div>
					) : null}
				</div>
				<button
					type="submit"
					disabled={isLoadingChangePassword}
					className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-main hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main`}
				>
					Change Password
				</button>
			</form>
		</div>
	);
}
