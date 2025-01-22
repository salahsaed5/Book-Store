import { useState, useEffect } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import AddBookForm from "./AddBookForm";
import { Helmet } from "react-helmet";
import { GetAllBooks } from "../../../Api/Customer/book";
import LazyLoading from "../../LazyLoading";
import BookData from "./BookData";

export interface BookFormData {
	name: string;
	description: string;
	author: string;
	price: string;
	image: string;
	category: string;
}

export interface BookFormResponse {
	_id: string;
	name: string;
	description: string;
	author: string;
	image: File | null;
	price: number;
	category: string;
}

const BookList = () => {
	const [Books, setBooks] = useState<BookFormResponse[]>([]);
	const [formData, setFormData] = useState<BookFormResponse>({
		_id: "",
		name: "",
		description: "",
		author: "",
		price: 0,
		image: null,
		category: "",
	});

	const {
		data: BooksData = [],
		isSuccess,
		isLoading,
	} = useSuspenseQuery({
		queryKey: ["books"],
		queryFn: async () => {
			const res = await GetAllBooks();
			return res.data;
		},
	});

	useEffect(() => {
		if (Array.isArray(BooksData) && isSuccess) {
			setBooks(BooksData);
		}
	}, [BooksData, isSuccess]);

	return (
		<>
			<Helmet>
				<title>Books</title>
				<meta name="description" content="Books" />
			</Helmet>
			<AddBookForm formData={formData} setFormData={setFormData} />
			<div className="grid grid-cols-1 gap-6 p-6 bg-black/10 md:grid-cols-2 lg:grid-cols-3 rounded-lg shadow-md mt-10 min-h-[50vh] relative">
				{isLoading ? (
					<LazyLoading />
				) : Books.length === 0 ? (
					<p>No Books to display</p>
				) : (
					<BookData books={Books} setFormData={setFormData} />
				)}
			</div>
		</>
	);
};

export default BookList;
