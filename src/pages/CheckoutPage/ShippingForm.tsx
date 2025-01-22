import {
	AddressElement,
	CardElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { GetMyBasket } from "../../Api/Customer/Basket";
import { CreateOrder } from "../../Api/Customer/order";
import { useNavigate } from "react-router-dom";
import type { StripeAddressElementOptions } from "@stripe/stripe-js";
import { ShoppingCart } from "lucide-react";
import { useAppDispatch } from "../../redux/hooks/reduxhooks";
import { clearCart } from "../../redux/slices/cartSlice";

export default function ShippingForm() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const stripe = useStripe();
	const elements = useElements();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const HandleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}
		setIsLoading(true);

		const cardElement = elements.getElement("card");
		const AddressElement = elements.getElement("address");

		if (!cardElement || !AddressElement) {
			setIsLoading(false);
			return;
		}

		const { error } = await stripe.createToken(cardElement);
		const address = await AddressElement.getValue();
		if (error) {
			setIsLoading(false);
			toast.error(error.message || "Error in payment");
		} else {
			if (address.complete) {
				const { _id: CartId } = await GetMyBasket();
				const data = {
					token: "tok_visa",
					delivery_address: {
						country: address.value.address.country,
						city: address.value.address.city,
						state: address.value.address.state,
						building: 1,
						street: "street",
						floor: 1,
						appartment: 1,
						mobile: address.value.phone,
						additional_info: "ayhaga",
						location: {
							type: "Point",
							coordinates: [30.0444, 31.2357],
						},
					},
				};

				try {
					const res = await CreateOrder(CartId, data);
					const orderId = res.data._id;
					const totalAmount = res.data.total;

					toast.success(res.message);
					dispatch(clearCart());

					navigate("/confirmOrder", {
						state: { orderId, totalAmount },
					});
				} catch (error) {
					setIsLoading(false);
					console.error(error);
				}
			} else {
				setIsLoading(false);

				toast.error("please fill all fields");
			}
		}
	};
	const addressElementOptions: StripeAddressElementOptions = {
		display: {
			name: "split",
		},
		fields: {
			phone: "always", // Can also be "always" or "auto"
		},
		mode: "shipping",
	};
	return (
		<div className="bg-custom-gradient p-8 rounded-lg shadow-md w-full">
			<h2 className="text-2xl font-bold mb-6 text-gray-800">Shipping Data</h2>
			<form onSubmit={HandleSubmit} className="space-y-4">
				<CardElement className="w-3/4 bg-black/10 p-3 rounded-md" />

				<AddressElement
					// className="flex "
					options={addressElementOptions}
				/>
				<button
					type="submit"
					disabled={isLoading}
					className={`w-full ${
						isLoading
							? "bg-black/20 text-white"
							: "bg-[#ED553B]  hover:opacity-85 transition duration-200"
					} py-4 px-4   flex justify-center gap-3 text-white`}
				>
					Proceed
					<ShoppingCart />
				</button>
			</form>
		</div>
	);
}
