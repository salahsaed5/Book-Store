import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const registerSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Required"),
	password: Yup.string().required("Required"),
	otp: Yup.string().required("required"),
});

export default function ForgetPassword() {
	const formik = useFormik({
		initialValues: {
			email: "",
			otp: "",
			password: "",
		},
		validationSchema: registerSchema,
		onSubmit: (values) => {
			console.log(values);
			// Handle form submission here
		},
	});

	{
		/**login form */
	}
	return (
		<div className="md:w-2/4 w-full h-screen flex justify-center ">
			<div className=" md:w-[70%] w-full">
				<div className="p-5">
					<div className="mb-4 w-full py-2 flex justify-center items-center text-center">
						{/**logo image */}
						<img className="w-[100px] h-[60px]" src={logo} alt="" />
					</div>
					{/*welcome text */}
					<div className={`text-left  py-8`}>
						<p className="font-[600] text-lg text-[#09093799]">Welcome back!</p>
						<h2 className="font-[700] text-2xl">Reset Your Password Now !</h2>
					</div>
					{/*start Form */}
					<form className=" h-full" onSubmit={formik.handleSubmit}>
						{/**email */}
						<div className="mb-2">
							<label
								htmlFor="email"
								className="block mb-1 text-sm font-[600] text-[#090937]"
							>
								E-mail
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
						{/**Otp */}
						<div className="mb-2">
							<label
								htmlFor="otp"
								className="block mb-1 text-sm font-[600] text-[#090937]"
							>
								otp
							</label>
							<input
								id="otp"
								type="text"
								{...formik.getFieldProps("otp")}
								className="w-full px-4 py-1.5 border rounded-sm outline-none bg-[#F4F4FF]"
							/>
							{formik.touched.otp && formik.errors.otp ? (
								<div className="text-red-500 text-xs mt-0">
									{formik.errors.otp}
								</div>
							) : null}
						</div>
						{/**password */}
						<div className="mb-2">
							<label
								htmlFor="password"
								className="block mb-1 text-sm font-[600] text-[#090937]"
							>
								password
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
						<div className="flex flex-col gap-4 w-full">
							<button
								type="submit"
								className="w-full bg-[#EF6B4A] hover:opacity-90 duration-200 text-white rounded-sm px-5 py-2.5"
							>
								Send
							</button>
							<Link
								to={"/auth"}
								className="mt-3 text-center w-full bg-white text-[#6251DD] border-[1px] border-[#6251DD] rounded-sm px-5 py-2.5 hover:bg-[#6251DD] hover:text-white duration-200"
							>
								Login
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
