import { Divider } from "@mui/material";
import { Check } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks/reduxhooks";
import { clearCart } from "../../redux/slices/cartSlice";

export default function ConfirmOrder() {
	const location = useLocation();
	const { orderId, totalAmount } = location.state || {};
	const dispatch = useAppDispatch();

	return (
		<div className="w-full h-[80vh] flex justify-center items-center">
			<div className="md:w-[450px] h-4/5 flex flex-col justify-center items-center text-center gap-3 p-2 shadow-2xl rounded-md">
				<Check className="w-16 h-16 bg-green-600 rounded-full text-white" />
				<h1 className="">Order Confirmed!</h1>
				<p className="text-black/80">
					Your order has been placed successfully. Thank you for shopping with
					us!
				</p>
				<Divider />
				<p>Order ID: {orderId}</p>
				<p>Total Amount: {totalAmount}</p>
				<Divider />

				<Link
					onClick={() => {
						dispatch(clearCart());
					}}
					to={"/"}
					className={`w-full ${"bg-[#ED553B]  hover:opacity-85 transition duration-200"} py-4 px-4   flex justify-center gap-3 text-white`}
				>
					Go To Home
				</Link>
			</div>
		</div>
	);
}
