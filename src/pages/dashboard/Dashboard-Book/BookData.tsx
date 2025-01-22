import type { BookFormResponse } from "./BookList";
import CardsDashboard from "./CardsDashboard";

export default function BookData({
	books,
	setFormData,
}: {
	books: BookFormResponse[];
	setFormData: React.Dispatch<React.SetStateAction<BookFormResponse>>;
}) {
	return (
		<>
			{books.map((product) => (
				<CardsDashboard
					key={product._id}
					product={product}
					setFormData={setFormData}
				/>
			))}
		</>
	);
}
