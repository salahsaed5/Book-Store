// PriceFilter component for setting min and max price
export default function PriceFilter({
	minPrice,
	maxPrice,
	setMinPrice,
	setMaxPrice,
}: {
	minPrice: string;
	maxPrice: string;
	setMinPrice: (value: string) => void;
	setMaxPrice: (value: string) => void;
}) {
	return (
		<div className="flex items-center space-x-2">
			<span className="text-gray-600">$</span>
			<input
				type="number"
				value={minPrice}
				min={0}
				onChange={(e) => setMinPrice(e.target.value)}
				className="w-20 p-1 border border-gray-300 rounded"
				placeholder="Min"
			/>
			<span className="text-gray-600">to</span>
			<span className="text-gray-600">$</span>
			<input
				type="number"
				value={maxPrice}
				onChange={(e) => setMaxPrice(e.target.value)}
				className="w-20 p-1 border border-gray-300 rounded"
				placeholder="Max"
			/>
		</div>
	);
}
