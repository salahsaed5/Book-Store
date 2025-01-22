import AxiosInstance from "../BaseAxios";
export interface ItemToCart {
	book: string;
	quantity: number;
}
export interface ItemUpdate {
	items: ItemToCart[];
}
export const AddItemToBasket = async (Item: ItemToCart) => {
	try {
		const { data } = await AxiosInstance.post("/api/basket/item", Item);
		return data;
	} catch (error) {
		console.error(error);
	}
};
export const UpdateItemInCart = async (Items: ItemUpdate, id: string) => {
	try {
		const { data } = await AxiosInstance.put(`/api/basket/${id}`, Items);
		return data;
	} catch (error) {
		console.error(error);
	}
};
export const DeleteItemFromCart = async (book: string) => {
	try {
		const { data } = await AxiosInstance.delete("/api/basket/item", {
			data: {
				book,
			},
		});
		return data;
	} catch (error) {
		console.error(error);
	}
};
export const GetMyBasket = async () => {
	try {
		const { data } = await AxiosInstance.get("/api/basket");
		return data;
	} catch (error) {
		console.error(error);
	}
};

export const subtotal = async (): Promise<number> => {
	try {
		const res = await GetMyBasket();
		return res.total; // Ensure that res.total is a number
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (err) {
		return 0; // Return 0 in case of an error
	}
};
