import AxiosInstance from "../BaseAxios";

export const GetAllBooks = async (page: number = 1, limit: number = 0) => {
	try {
		const { data } = await AxiosInstance.get(
			`/api/book?page=${page}&limit=${limit}`
		);
		return data;
	} catch (error) {
		// console.log(error);
		console.error(error);
	}
};
