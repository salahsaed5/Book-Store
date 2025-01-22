import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../assets/Logo.png";
import { useMutation } from "@tanstack/react-query";
import { ForgetPassword } from "../Api/Customer/Auth";
import { useNavigate } from "react-router-dom";

const registerSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Required"),
});
interface ForgetPasswordResponse {
	message: string;
	code: number;
	timestamp: string;
	status: string;
}
interface ForgetPasswordVariables {
	email: string;
}
export default function SendOtp() {
	const navigate = useNavigate();
	const { mutateAsync: SendOtpFunction, isPending: ForgetPasswordPending } =
		useMutation<
			ForgetPasswordResponse, // Return type
			Error, // Error type
			ForgetPasswordVariables
		>({
			mutationKey: ["sendOtp"],
			mutationFn: async (data: ForgetPasswordVariables) => {
				const res = await ForgetPassword(data);
				return res;
			},
			onSuccess: () => {
				navigate("/auth/forget-password");
			},
		});

	const formik = useFormik({
		initialValues: {
			email: "",
		},
		validationSchema: registerSchema,
		onSubmit: async (values) => {
			console.log(values);
			await SendOtpFunction(values);
		},
	});

	{
		/**login form */
	}
	return (
		<div className="md:w-2/4 w-full h-screen flex justify-center ">
			<div className=" md:w-[70%] w-full">
				<div className="p-5 flex flex-col gap-10">
					<div className="mb-4 w-full py-2 flex justify-center items-center text-center">
						{/**logo image */}
						<img className="w-[100px] h-[60px]" src={logo} alt="" />
					</div>
					{/*welcome text */}
					<div className={`text-left  py-8`}>
						<p className="font-[600] text-lg text-[#09093799]">Welcome back!</p>
						<h2 className="font-[700] text-2xl">Forget Password !!</h2>
					</div>
					{/*start Form */}
					<form className=" h-full" onSubmit={formik.handleSubmit}>
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

						<button
							disabled={ForgetPasswordPending}
							type="submit"
							className={`w-full ${
								ForgetPasswordPending ? "bg-black/25" : "bg-[#EF6B4A]"
							} hover:opacity-90 duration-200 text-white rounded-sm px-5 py-2.5`}
						>
							{"Send"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
