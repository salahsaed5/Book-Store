import ProductsTable from "./ProductsTable";
import CartTotalCost from "./CartTotalCost";
import ShippingForm from "./ShippingForm";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/reduxhooks";
import type { Book } from "../../components/control-bar/ControlBar.types";
import {
	decreaseQuantity,
	increaseQuantity,
	removeItemFromCart,
} from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";

export interface BookItem extends Book {
	quantity: number;
}

export default function CheckoutPage() {
	const cart = useAppSelector((state) => state.cart);
	const dispatch = useAppDispatch();
	const products = cart.items;

	const handleRemove = (id: string) => {
		dispatch(removeItemFromCart(id));
		toast.success("the book removed successfully");
	};

	const handleQuantityIncrease = (id: string) => {
		dispatch(increaseQuantity(id));
		toast.success("the book Increase derease successfully");
	};
	const handleQuantityDecrease = (id: string) => {
		dispatch(decreaseQuantity(id));
		toast.success("the book quantity derease successfully");
	};

	const subtotal = products.reduce(
		(sum, product) => sum + product.price * product.quantity,
		0
	);
	const tax = subtotal * 0.0444; // Approximately 1.6 / 36
	const total = subtotal + tax;

	return (
		<div className="min-h-screen p-5 flex flex-col gap-6">
			<div className="flex justify-between items-center md:flex-row flex-col md:gap-0 gap-6">
				{/**product table */}
				<div className="md:w-2/4 w-full rounded-md shadow-2xl overflow-hidden md:order-1 order-2">
					<ProductsTable
						onQuantityIncrease={handleQuantityIncrease}
						onQuantityDecrease={handleQuantityDecrease}
						onRemove={handleRemove}
						products={products}
					/>
				</div>
				{/**checkout card */}
				<div className="md:w-[350px] w-full md:order-2 order-1">
					<CartTotalCost
						subtotal={subtotal}
						tax={tax}
						total={total}
					/>{" "}
				</div>
			</div>
			<div className="md:w-[70%]">
				<ShippingForm />
			</div>
		</div>
	);
}
