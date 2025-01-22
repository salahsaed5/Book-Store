import Cookies from "js-cookie";
export const HandleSaveToken = async (data: {
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
}) => {
	localStorage.setItem("token", JSON.stringify(data.data.accessToken));
	localStorage.setItem("refreshToken", JSON.stringify(data.data.refreshToken));
	localStorage.setItem("profile", JSON.stringify(data.data.profile));
	Cookies.set("token", data.data.accessToken);
};
