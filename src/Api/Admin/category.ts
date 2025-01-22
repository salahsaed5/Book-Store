/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
interface categoryFormData {
	title: string;
}
import AxiosInstance from "../BaseAxios";

export const GetAllCategories = async () => {
	try {
		const { data } = await AxiosInstance.get("/api/category");
		return data;
	} catch (error: any) {
		console.error(error);
	}
};
export const CreateCategory = async (FormData: categoryFormData) => {
	try {
		console.log(FormData);
		const { data } = await AxiosInstance.post("/api/category", {
			...FormData,
			_id: undefined,
		});
		return data;
	} catch (error: any) {
		error.response.data.message.map((el: string) => {
			toast.error(el);
		});
	}
};
export const UpdateCategory = async (
	FormData: categoryFormData,
	id: string | undefined
) => {
	try {
		const res = await AxiosInstance.put(`/api/category/${id}`, FormData);
		return res.data;
	} catch (error: any) {
		error.response.data.message.map((el: string) => {
			toast.error(el);
		});
	}
};
export const DeleteCategory = async (id: string) => {
	try {
		const { data } = await AxiosInstance.delete(`/api/category/${id}`);
		return data;
	} catch (error: any) {
		toast.error(error.response.data.message);
	}
};
