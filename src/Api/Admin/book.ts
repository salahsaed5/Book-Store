/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import AxiosInstance from "../BaseAxios";
// import type { BookFormResponse } from "../../pages/dashboard/Dashboard-Book/BookList";

export const CreateBook = async (formData: FormData) => {
	console.log("Logging FormData entries:");
	for (const [key, value] of formData.entries()) {
		console.log(`${key}: ${value}`);
	}

	try {
		const { data } = await AxiosInstance.post("/api/book", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return data;
	} catch (error: any) {
		console.error(error);
		const messages = error.response?.data?.message;
		if (Array.isArray(messages)) {
			messages.forEach((el: string) => {
				toast.error(el);
			});
		} else {
			toast.error("An error occurred.");
		}
	}
};

export const AllBooks = async () => {
	try {
		const { data } = await AxiosInstance.get("/api/book");
		return data;
	} catch (error) {
		console.error(error);
	}
};
export const DeleteBook = async (id: string) => {
	try {
		const { data } = await AxiosInstance.delete(`/api/book/${id}`);
		return data;
	} catch (error) {
		console.error(error);
	}
};

export const UpdateBook = async (id: string, formData: FormData) => {
	try {
		const { data } = await AxiosInstance.put(`/api/book/${id}`, {
			...formData,
			_id: undefined,
		});
		return data;
	} catch (error) {
		console.error(error);
	}
};
