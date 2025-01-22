import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Book } from "../../components/control-bar/ControlBar.types";
import type { RootState } from "../store";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface BookItem extends Book {
	quantity: number;
}

interface CartState {
	items: BookItem[];
	totalQuantity: number;
	totalPrice: number;
}
const initialState: CartState = {
	items: [],
	totalQuantity: 0,
	totalPrice: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItemToCart: (state, action: PayloadAction<BookItem>) => {
			const newItem = action.payload;
			const existingItem = state.items.find((item) => item._id === newItem._id);
			if (existingItem) {
				existingItem.quantity++;
			} else {
				state.items.push({ ...newItem, quantity: 1 });
			}
			state.totalQuantity++;
			state.totalPrice += newItem.price; // Update total price
		},
		removeItemFromCart: (state, action: PayloadAction<string>) => {
			const id = action.payload;
			const existingItem = state.items.find((item) => item._id === id);
			if (existingItem) {
				state.totalQuantity -= existingItem.quantity;
				state.totalPrice -= existingItem.price * existingItem.quantity; // Update total price
				state.items = state.items.filter((item) => item._id !== id);
			}
		},
		increaseQuantity: (state, action: PayloadAction<string>) => {
			const id = action.payload;
			const existingItem = state.items.find((item) => item._id === id);
			if (existingItem) {
				existingItem.quantity++;
				state.totalQuantity++;
				state.totalPrice += existingItem.price; // Update total price
			}
		},
		decreaseQuantity: (state, action: PayloadAction<string>) => {
			const id = action.payload;
			const existingItem = state.items.find((item) => item._id === id);
			if (existingItem) {
				if (existingItem.quantity > 1) {
					existingItem.quantity--;
					state.totalQuantity--;
					state.totalPrice -= existingItem.price; // Update total price
				} else {
					state.totalQuantity--;
					state.totalPrice -= existingItem.price; // Update total price
					state.items = state.items.filter((item) => item._id !== id);
				}
			}
		},
		clearCart: (state) => {
			state.items = [];
			state.totalQuantity = 0;
			state.totalPrice = 0;
		},
		setCartTotal: (state) => {
			state.totalPrice = state.items.reduce(
				(total, item) => total + item.price * item.quantity,
				0
			);
		},
	},
});

export const {
	addItemToCart,
	removeItemFromCart,
	increaseQuantity,
	decreaseQuantity,
	clearCart,
	setCartTotal,
} = cartSlice.actions;

export const selectCount = (state: RootState) => state.cart.totalQuantity;

export default cartSlice.reducer;
