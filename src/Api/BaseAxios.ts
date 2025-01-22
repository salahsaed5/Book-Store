/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";

const AxiosInstance = axios.create({
	baseURL: "https://upskilling-egypt.com:3007",
});

const decodeToken = (token: string) => {
	try {
		jwtDecode<JwtPayload>(token);
		return true;
	} catch (error: any) {
		return false;
	}
};

// Interceptor to add token before each request
AxiosInstance.interceptors.request.use(
	(config) => {
		let token;
		if (decodeToken(Cookies.get("token") || "")) {
			token = Cookies.get("token");
		} else if (decodeToken(localStorage.getItem("token") || "")) {
			token = localStorage.getItem("token");
		} else {
			token = localStorage.getItem("refreshToken");
		}

		// Ensure token is included in the Authorization header
		// console.log(JSON.parse(token));
		if (token) {
			config.headers.Authorization = `Bearer ${
				token.includes('"') ? JSON.parse(token) : token
			}`;
		}
		return config;
	},
	(error) => {
		console.log(error);
		return Promise.reject(error);
	}
);

export default AxiosInstance;
