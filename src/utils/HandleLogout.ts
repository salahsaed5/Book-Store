import toast from "react-hot-toast";
import { LogOut } from "../Api/Customer/Auth";

export const HandleLogout = async () => {
	try {
		const res = await LogOut();
		localStorage.removeItem("token");
		localStorage.removeItem("profile");
		localStorage.removeItem("refreshToken");
		toast.success(res.message);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (err: any) {
		console.log(err);
	}
};
