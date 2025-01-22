import { X } from "lucide-react";
import type { BookItem } from "./CheckOutPage";
import { getRndInteger } from "../../utils/RandomNumber";
import Images from "../../assets/books/ImportImages";
import { useMemo, useState } from "react";
import {
	AddItemToBasket,
	GetMyBasket,
	UpdateItemInCart,
} from "../../Api/Customer/Basket";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../redux/hooks/reduxhooks";
import { clearCart } from "../../redux/slices/cartSlice";

interface ProductsTableProps {
	products: BookItem[];
	onRemove: (id: string) => void;
	onQuantityDecrease: (id: string) => void;
	onQuantityIncrease: (id: string) => void;
}

export default function ProductsTable({
	products,
	onRemove,
	onQuantityDecrease,
	onQuantityIncrease,
}: ProductsTableProps) {
	const [isLoading, setIsloading] = useState(false);
	const dispatch = useAppDispatch();

	const randomInteger = useMemo(
		() => getRndInteger(0, Images.length),
		[Images.length]
	);

	const handleConfirmToCart = async () => {
		setIsloading(true);
		try {
			const { _id: basketId } = await GetMyBasket();
			if (basketId) {
				const updatedBasket = products.map((el) => {
					return { book: el._id, quantity: el.quantity };
				});
				for (let i = 0; i < products.length; i++) {
					const res = await UpdateItemInCart(
						{ items: updatedBasket },
						basketId
					);
					toast.success(res.message);
				}
			} else {
				for (let i = 0; i < products.length; i++) {
					const res = await AddItemToBasket({
						book: products[i]._id,
						quantity: products[i].quantity,
					});
					toast.success(res.message);
				}
			}

			setIsloading(false);
		} catch (error) {
			setIsloading(false);
			console.log(error);
		}
	};

	const HandleClearCart = async () => {
		const { _id: basketId } = await GetMyBasket();
		try {
			const updatedBasket = products.map((el) => {
				return { book: el._id, quantity: 0 };
			});
			for (let i = 0; i < products.length; i++) {
				const res = await UpdateItemInCart({ items: updatedBasket }, basketId);
				toast.success(res.message);
			}

			dispatch(clearCart());
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="rounded-md overflow-x-auto bg-custom-gradient">
			<div className=" w-full sticky left-0 p-4 ">
				<h2 className="text-lg font-semibold text-main">Products Details</h2>
			</div>
			{products.length === 0 ? (
				<div className="w-full text-main p-4">
					<p className="w-full">No Items in The cart Yet</p>
				</div>
			) : (
				<>
					<table className="w-full text-main">
						<thead className="border-y-[1px] border-black">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
									Num
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
									Book
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
									Amount
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
									Cost
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
									Subtotal
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"></th>
							</tr>
						</thead>

						<tbody className="">
							{products.map((product, index) => (
								<tr key={product._id}>
									<td className="px-6 py-4 whitespace-nowrap text-2xl font-semibold ">
										{(index + 1).toString().padStart(2, "0")}.
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center">
											<div className="flex-shrink-0 h-12 w-12 bg-white flex justify-center">
												<img
													className="max-h-full max-w-full object-fill"
													src={Images[randomInteger]}
													alt=""
												/>
											</div>
											<div className="ml-4 text-sm font-medium text-main">
												{product.name}
											</div>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center justify-between space-x-2 text-white bg-white rounded-md p-[4px]">
											<button
												className="w-6 rounded-md bg-main flex items-center justify-center "
												onClick={() => onQuantityDecrease(product._id)}
												aria-label={`Decrease quantity of ${product.name}`}
											>
												-
											</button>
											<span className="text-sm text-gray-900">
												{product.quantity}
											</span>
											<button
												className="w-6 rounded-md bg-main flex items-center justify-center"
												onClick={() => onQuantityIncrease(product._id)}
												aria-label={`Increase quantity of ${product.name}`}
											>
												+
											</button>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm ">
										{product.price.toFixed(2)} AED
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm ">
										{(product.price * product.quantity).toFixed(2)} AED
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
										<button
											onClick={() => onRemove(product._id)}
											className=" border-[2px] border-main rounded-md hover:text-white hover:bg-main transition-colors duration-200"
											aria-label={`Remove ${product.name} from cart`}
										>
											<X />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className=" flex justify-between px-1 py-2">
						<button
							onClick={HandleClearCart}
							className="bg-main text-white p-2 rounded-[4px] hover:bg-main/80 transition-colors duration-200"
						>
							Clear Cart
						</button>
						<button
							disabled={isLoading}
							onClick={handleConfirmToCart}
							className={`${
								isLoading ? "bg-black/20" : "bg-main hover:bg-main/80"
							} text-white p-2 rounded-[4px]  transition-colors duration-200`}
						>
							Confirm This Cart
						</button>
					</div>
				</>
			)}
		</div>
	);
}
