import AxiosInstance from "../BaseAxios";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const CreateOrder = async (cartId: string, formData: any) => {
	try {
		const { data } = await AxiosInstance.post(`/api/order/${cartId}`, formData);
		return data;
	} catch (error) {
		console.error(error);
	}
};
