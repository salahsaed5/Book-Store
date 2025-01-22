/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { GetAllCategories } from "../../../Api/Admin/category";
import Header from "../../../components/ui/Header";
import { CreateBook, UpdateBook } from "../../../Api/Admin/book";
import * as Yup from "yup";
import type { BookFormResponse } from "./BookList";

interface NewBookResponse {
	code: number;
	message: string;
	status: string;
	timestamp: string;
	data: {
		author: string;
		category: string;
		createdAt: string;
		description: string;
		id: string;
		_v: string;
		name: string;
		price: number;
		image: string;
		status: string;
	};
}

interface AddBookFormProps {
	formData: BookFormResponse;
	setFormData: React.Dispatch<React.SetStateAction<BookFormResponse>>;
}

const BookValidate = Yup.object().shape({
	name: Yup.string().required("Name is required"),
	description: Yup.string().required("Description is required"),
	author: Yup.string().required("Author is required"),
	price: Yup.number()
		.min(0, "The min price is 0")
		.required("Price is required"),
	image: Yup.mixed()
		.required("Image is required")
		.test(
			"fileSize",
			"File size is too large",
			(value: any) => (value ? value.size <= 10000000 : true) // 10MB limit
		)
		.test("fileType", "Unsupported File Format", (value: any) =>
			value
				? ["image/jpeg", "image/png", "image/gif"].includes(value.type)
				: true
		),
});

const AddBookForm: React.FC<AddBookFormProps> = ({ formData, setFormData }) => {
	const queryClient = useQueryClient();
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [categories, setCategories] = useState<
		{ _id: string; title: string }[]
	>([]);
	const [isLoading, setIsLoading] = useState(false);

	const { mutate: addBook, isError: isErrorAddBook } = useMutation<
		NewBookResponse,
		Error,
		FormData
	>({
		mutationKey: ["books", "newBook"],
		mutationFn: async (data: FormData) => {
			try {
				data.forEach((value, key) => console.log(key, value));
				const res = await CreateBook(data);
				return res;
			} catch (error) {
				toast.error("Error in adding book");
				throw error;
			}
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["books"] });
			resetForm();
			toast.success(data.message);
			setIsLoading(false);
		},
		onMutate: () => {
			setIsLoading(true);
		},
	});

	const { mutate: updateBookMutate, isError: IsupdateError } = useMutation<
		NewBookResponse,
		Error,
		{ _id: string; data: FormData }
	>({
		mutationKey: ["books", "updateBook"],
		mutationFn: async (payload) => {
			try {
				const res = await UpdateBook(payload._id, payload.data);
				return res;
			} catch (error) {
				toast.error("Error in updating book");
				throw error;
			}
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["books"] });
			resetForm();
			toast.success(data.message);
			setIsLoading(false);
		},
		onMutate: () => {
			setIsLoading(true);
		},
	});

	const resetForm = () => {
		formik.resetForm();
		setFormData({
			_id: "",
			name: "",
			description: "",
			author: "",
			price: 0,
			image: null,
			category: "",
		});
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const formik = useFormik({
		enableReinitialize: true,
		validationSchema: BookValidate,
		initialValues: formData,
		onSubmit: async (values) => {
			const data = new FormData();
			data.append("name", values.name);
			data.append("description", values.description);
			data.append("author", values.author);
			data.append("price", values.price.toString());
			data.append("category", values.category);
			if (values.image) {
				data.append("image", values.image);
			}

			try {
				if (values._id) {
					const payload = { _id: values._id, data };
					updateBookMutate(payload);
				} else {
					// for (const [key, value] of data.entries()) {
					// 	console.log(`${key}: ${value}`);
					// }
					addBook(data);
				}
			} catch (error) {
				console.error("Error submitting book:", error);
			}
		},
	});

	const {
		data: fetchedCategories,
		isError,
		error,
	} = useQuery({
		queryKey: ["categories"],
		queryFn: async () => await GetAllCategories(),
	});

	useEffect(() => {
		if (fetchedCategories) setCategories(fetchedCategories);
		if (isError) console.error("Error fetching categories:", error);
	}, [fetchedCategories, isError, error]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			formik.setFieldValue("image", e.target.files[0]);
		}
	};

	useEffect(() => {
		setFormData(formik.values);
	}, [formik.values, setFormData]);

	return (
		<>
			<Header subTitle="Good to see you" className="text-main font-Inter">
				Add New Book
			</Header>
			<div className="flex justify-center items-center flex-col">
				<form
					onSubmit={formik.handleSubmit}
					className="flex flex-col gap-4 p-7 bg-black/10 shadow-xl rounded-lg w-[80%]"
				>
					<input
						type="text"
						placeholder="Book Name"
						{...formik.getFieldProps("name")}
						className="p-4 border-2 rounded-lg"
					/>
					<input
						type="text"
						placeholder="Description"
						{...formik.getFieldProps("description")}
						className="p-4 border-2 rounded-lg"
					/>
					<input
						type="text"
						placeholder="Author"
						{...formik.getFieldProps("author")}
						className="p-4 border-2 rounded-lg"
					/>
					<input
						type="number"
						placeholder="Price"
						{...formik.getFieldProps("price")}
						className="p-4 border-2 rounded-lg"
					/>
					<select
						{...formik.getFieldProps("category")}
						className="p-4 border-2 rounded-lg"
					>
						<option value="" disabled>
							Select Category
						</option>
						{categories.map((category) => (
							<option key={category._id} value={category._id}>
								{category.title}
							</option>
						))}
					</select>
					<input
						type="file"
						onChange={handleFileChange}
						ref={fileInputRef}
						className="p-4 border-2 rounded-lg"
					/>
					<button
						type="submit"
						disabled={isLoading && !IsupdateError && !isErrorAddBook}
						className="p-4 bg-main text-white rounded-lg"
					>
						{isLoading && !IsupdateError && !isErrorAddBook
							? "Submitting..."
							: formData._id
							? "Update Book"
							: "Add Book"}
					</button>
				</form>
			</div>
		</>
	);
};

export default AddBookForm;
