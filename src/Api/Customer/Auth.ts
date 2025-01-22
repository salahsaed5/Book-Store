/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import AxiosInstance from "../BaseAxios";
interface RegisterVariables {
	email: string;
	firstName?: string;
	lastName?: string;
	password: string;
	role?: string;
}
export const RefreshToken = async (refreshToken: string) => {
	try {
		const { data } = await AxiosInstance.get(
			`/api/auth/refresh-tokens?refreshToken=${refreshToken}`
		);
		return data;
	} catch (error: any) {
		throw error;
	}
};
export const Login = async (formData: { email: string; password: string }) => {
	try {
		const { data } = await AxiosInstance.post("/api/auth/login", {
			email: formData.email,
			password: formData.password,
		});
		return data;
	} catch (error: any) {
		console.log(error);
		toast.error(error.response.data.message);
		throw error;
	}
};
export const Register = async (formData: RegisterVariables) => {
	try {
		const { data } = await AxiosInstance.post("/api/auth/register", {
			first_name: formData.firstName,
			last_name: formData.lastName,
			password: formData.password,
			email: formData.email,
			role: formData.role,
		});
		return data;
	} catch (error) {
		throw error;
	}
};
export const ResetPassword = async (formData: {
	otp: string;
	email: string;
	password: string;
}) => {
	try {
		const { data } = await AxiosInstance.post("/api/auth/reset-password", {
			otp: formData.otp,
			email: formData.email,
			password: formData.password,
		});
		return data;
	} catch (error) {
		throw error;
	}
};
export const ForgetPassword = async (formData: { email: string }) => {
	try {
		const { data } = await AxiosInstance.post("/api/auth/forgot-password", {
			email: formData.email,
		});
		return data;
	} catch (error) {
		throw error;
	}
};
export const ChangeOldPassword = async (formData: {
	password: string;
	newPassword: string;
}) => {
	try {
		const { data } = await AxiosInstance.post("/api/auth/change-password", {
			password: formData.password,
			password_new: formData.newPassword,
		});
		return data;
	} catch (error) {
		throw error;
	}
};
export const LogOut = async () => {
	try {
		const { data } = await AxiosInstance.get("/api/auth/logout");
		return data;
	} catch (error) {
		throw error;
	}
};
