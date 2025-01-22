import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../assets/Logo.png";
import Checkbox from "../components/ui/CheckBox";
import { Link, useNavigate } from "react-router-dom";
import { Login, Register } from "../Api/Customer/Auth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { HandleSaveToken } from "../utils/handleSaveToken";
import { useAuth } from "../context/AuthProvider";
{
	/**      {
    "message": "Record created successfully",
    "data": {
        "first_name": "Fares",
        "last_name": "ahmed",
        "email": "fareess.mohameedd@gmail.com",
        "status": "active",
        "role": "Admin",
        "_id": "671c54338e36b52876d00a32",
        "shipping_addresses": [],
        "updatedAt": "2024-10-26T02:30:11.559Z",
        "createdAt": "2024-10-26T02:30:11.559Z",
        "__v": 0
    },
    "code": 200,
    "status": "SUCCESS",
    "timestamp": "2024-10-26T02:30:11.644Z"
}
	 */
}

{
	/**{
    "message": "Login Success",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzFjNTQzMzhlMzZiNTI4NzZkMDBhMzIiLCJlbWFpbCI6ImZhcmVlc3MubW9oYW1lZWRkQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTcyOTkxMDQ0MiwiZXhwIjoxNzY1OTEwNDQyfQ.dG94y42lCQDZInycMR3GVepU8quP0c3npHT9qJtcE5s",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzFjNTQzMzhlMzZiNTI4NzZkMDBhMzIiLCJlbWFpbCI6ImZhcmVlc3MubW9oYW1lZWRkQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTcyOTkxMDQ0MiwiZXhwIjo3Nzc3OTEwNDQyfQ.BAW0-_W9Tbcwyixyw_7qZP_7d2yfmMs61BWrRwqO5oI",
        "profile": {
            "_id": "671c54338e36b52876d00a32",
            "first_name": "Fares",
            "last_name": "ahmed",
            "email": "fareess.mohameedd@gmail.com",
            "status": "active",
            "role": "Admin",
            "shipping_addresses": []
        }
    },
    "code": 200,
    "status": "SUCCESS",
    "timestamp": "2024-10-26T02:40:42.210Z"
} */
}
interface RegisterRespose {
	message: string;
	data: {
		first_name: string;
		last_name: string;
		email: string;
		status: string;
		role: string;
		_id: string;
		shipping_addresses: [];
		updatedAt: string;
		createdAt: string;
		__v: number;
	};
	code: number;
	status: string;
	timestamp: string;
}
interface LoginResponse {
	message: string;
	data: {
		accessToken: string;
		refreshToken: string;
		profile: {
			_id: string;
			first_name: string;
			last_name: string;
			email: string;
			status: string;
			role: string;
			shipping_addresses: [];
		};
	};
	code: number;
	status: string;
	timestamp: string;
}

interface LoginVariables {
	email: string;
	password: string;
}
interface RegisterVariables {
	email: string;
	firstName?: string;
	lastName?: string;
	password: string;
	role?: string;
}
const loginSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Required"),
	password: Yup.string()
		.min(3, "Sorry, the password must contain at least 3 characters.")
		.matches(
			/[A-Z]/,
			"Sorry, the password must contain at least one uppercase letter."
		)
		.matches(
			/[a-z]/,
			"Sorry, the password must contain at least one lowercase letter."
		)
		.matches(/[0-9]/, "Sorry, the password must contain at least one number.")
		.matches(
			/[@$!%*?&#]/,
			"Sorry, the password must contain at least one special character."
		)
		.required("Password is required."),
});

const registerSchema = Yup.object().shape({
	firstName: Yup.string().required("Required"),
	lastName: Yup.string().required("Required"),
	email: Yup.string().email("Invalid email").required("Required"),
	password: Yup.string()
		.min(3, "Sorry, the password must contain at least 3 characters.")
		.matches(
			/[A-Z]/,
			"Sorry, the password must contain at least one uppercase letter."
		)
		.matches(
			/[a-z]/,
			"Sorry, the password must contain at least one lowercase letter."
		)
		.matches(/[0-9]/, "Sorry, the password must contain at least one number.")
		.matches(
			/[@$!%*?&#]/,
			"Sorry, the password must contain at least one special character."
		)
		.required("Password is required."),
	role: Yup.string().required("Required"),
});

export default function AuthForm() {
	const [isLogin, setIsLogin] = useState(true);
	const { setAuth } = useAuth();
	const navigate = useNavigate();
	const { isPending: loginPending, mutateAsync: LoginMutation } = useMutation<
		LoginResponse, // Return type
		Error, // Error type
		LoginVariables // Variables type
	>({
		mutationKey: ["login"],
		mutationFn: async (data: LoginVariables) => {
			const res = await Login(data);
			setAuth({
				accessToken: res.data.accessToken,
				refreshToken: res.data.refreshToken,
				profile: res.data.profile,
			});
			console.log(res);
			return res;
		},
		onSuccess: (data) => {
			toast.success(data.message || "logged in Succeessfully");
			HandleSaveToken(data);
			navigate("/");
		},
	});
	const { isPending: RegisterPending, mutateAsync: RegisterMutation } =
		useMutation<
			RegisterRespose, // Return type
			Error, // Error type
			RegisterVariables // Variables type
		>({
			mutationKey: ["register"],
			mutationFn: async (data: RegisterVariables) => {
				const res = await Register(data);
				return res;
			},
			onSuccess: (data) => {
				toast.success(data.message || "Registered Succeessfully");
				setIsLogin(true);
			},
		});

	const formik = useFormik({
		initialValues: isLogin
			? {
					email: "",
					password: "",
			  }
			: {
					firstName: "",
					lastName: "",
					email: "",
					password: "",
					role: "",
			  },
		validationSchema: isLogin ? loginSchema : registerSchema,
		onSubmit: async (values) => {
			console.log(values);
			if (isLogin) {
				const res = await LoginMutation(values);
				console.log(res);
			} else {
				const res = await RegisterMutation({
					email: values.email,
					firstName: values.firstName,
					lastName: values.lastName,
					password: values.password,
					role: values.role,
				});
				console.log(res);
			}
		},
	});
	useEffect(() => {
		formik.resetForm();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLogin]);

	{
		/**login form */
	}
	return (
		<div className="md:w-2/4 w-full h-screen flex justify-center">
			<div className=" h-full md:w-[70%] w-full">
				<div className="p-5 f">
					<div className="mb-4 w-full py-2 flex justify-center items-center text-center">
						{/**logo image */}
						<img className="w-[100px] h-[60px]" src={logo} alt="" />
					</div>
					{/*welcome text */}
					<div className={`text-left ${isLogin ? "py-8" : ""}`}>
						<p className="font-[600] text-lg text-[#09093799]">Welcome back!</p>
						<h2 className="font-[700] text-2xl">
							{isLogin ? "Login to your account" : "Create new account"}
						</h2>
					</div>
					{/*start Form */}
					<form className=" h-full" onSubmit={formik.handleSubmit}>
						{!isLogin && (
							<>
								<div className="flex md:flex-row flex-col md:gap-3 w-full">
									{/**first Name */}
									<div className="mb-2 md:w-2/4">
										<label
											htmlFor="firstName"
											className="block mb-1 text-sm font-[600] text-[#090937]"
										>
											First Name
										</label>
										<input
											id="firstName"
											type="text"
											{...formik.getFieldProps("firstName")}
											className="w-full px-4 py-1.5 border rounded-sm outline-none bg-[#F4F4FF]"
										/>
										{formik.touched.firstName && formik.errors.firstName ? (
											<div className="text-red-500 text-xs mt-0">
												{formik.errors.firstName}
											</div>
										) : null}
									</div>
									{/**Last Name */}
									<div className="mb-2 md:w-2/4">
										<label
											htmlFor="lastName"
											className="block mb-1 text-sm font-[600] text-[#090937]"
										>
											Last Name
										</label>
										<input
											id="lastName"
											type="text"
											{...formik.getFieldProps("lastName")}
											className="w-full px-4 py-1.5 border rounded-sm outline-none bg-[#F4F4FF]"
										/>
										{formik.touched.lastName && formik.errors.lastName ? (
											<div className="text-red-500 text-xs mt-0">
												{formik.errors.lastName}
											</div>
										) : null}
									</div>
								</div>
							</>
						)}
						<div className="mb-2">
							<label
								htmlFor="email"
								className="block mb-1 text-sm font-[600] text-[#090937]"
							>
								Email
							</label>
							<input
								id="email"
								type="email"
								{...formik.getFieldProps("email")}
								className="w-full px-4 py-1.5 border rounded-sm outline-none bg-[#F4F4FF]"
							/>
							{formik.touched.email && formik.errors.email ? (
								<div className="text-red-500 text-xs mt-0">
									{formik.errors.email}
								</div>
							) : null}
						</div>
						<div className="mb-2">
							<label
								htmlFor="password"
								className="block mb-1 text-sm font-[600] text-[#090937]"
							>
								Password
							</label>
							<input
								id="password"
								type="password"
								{...formik.getFieldProps("password")}
								className="w-full px-4 py-1.5 border rounded-sm outline-none bg-[#F4F4FF]"
							/>
							{formik.touched.password && formik.errors.password ? (
								<div className="text-red-500 text-xs mt-0">
									{formik.errors.password}
								</div>
							) : null}
						</div>
						{!isLogin && (
							<div className="mb-4">
								<label
									htmlFor="role"
									className="block mb-1 text-sm font-[600] text-[#090937]"
								>
									Role
								</label>
								<select
									id="role"
									{...formik.getFieldProps("role")}
									className="w-full px-4 py-1.5 border rounded-sm outline-none bg-[#F4F4FF]"
								>
									<option value="">Select a role</option>
									<option value="Admin">Admin</option>
									<option value="Customer">Customer</option>
								</select>
								{formik.touched.role && formik.errors.role ? (
									<div className="text-red-500 text-xs mt-0">
										{formik.errors.role}
									</div>
								) : null}
							</div>
						)}
						{isLogin && (
							<div className="mb-4 flex items-center text-[#6251DD] justify-between">
								<Checkbox
									id="rememper"
									label="Rememper Me"
									{...formik.getFieldProps("remember")}
								/>
								<Link
									to={"/auth/send-otp"}
									className="hover:underline text-[#6251DD] text-sm"
								>
									Forget Your Password ?
								</Link>
							</div>
						)}
						<button
							disabled={loginPending || RegisterPending}
							type="submit"
							className={`w-full ${
								loginPending || RegisterPending ? "bg-black/25" : "bg-[#EF6B4A]"
							} hover:opacity-90 duration-200 text-white rounded-sm px-5 py-2.5`}
						>
							{isLogin ? "Login" : "Register"}
						</button>
					</form>
					<button
						disabled={loginPending || RegisterPending}
						type="button"
						onClick={() => setIsLogin(!isLogin)}
						className="mt-3 w-full bg-white text-[#6251DD] border-[1px] border-[#6251DD] rounded-sm px-5 py-2.5 hover:bg-[#6251DD] hover:text-white duration-200"
					>
						{isLogin ? "Register" : "Login"}
					</button>
				</div>
			</div>
		</div>
	);
}
