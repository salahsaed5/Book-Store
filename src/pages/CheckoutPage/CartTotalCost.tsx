import { Divider } from "@mui/material";

interface CartTotalCostProps {
	subtotal: number;
	tax: number;
	total: number;
}

export default function CartTotalCost({
	subtotal,
	tax,
	total,
}: CartTotalCostProps) {
	return (
		<div className="flex flex-col gap-5">
			<div className="bg-custom-gradient rounded-md shadow-2xl h-full">
				<div className="p-4">
					<h2 className="text-lg font-semibold text-gray-800">
						Cart Total Cost
					</h2>
				</div>
				<div className=" p-6 space-y-4">
					<div className=" flex flex-col gap-5">
						<div className="flex justify-between">
							<span className="text-gray-600">Total</span>
							<span className="font-semibold">{subtotal.toFixed(2)} AED</span>
						</div>
						<Divider />
						<div className="flex justify-between">
							<span className="text-gray-600">Tax</span>
							<span className="font-semibold">{tax.toFixed(2)} AED</span>
						</div>
						<Divider />

						<div className="flex justify-between text-lg font-semibold">
							<span>Total Cost</span>
							<span>{total.toFixed(2)} AED</span>
						</div>
					</div>
				</div>
			</div>

		</div>
	);
}
