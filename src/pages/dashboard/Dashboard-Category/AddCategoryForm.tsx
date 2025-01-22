import { useFormik } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
	CreateCategory,
	GetAllCategories,
	UpdateCategory,
} from "../../../Api/Admin/category";
import Header from "../../../components/ui/Header";
import * as Yup from "yup";

interface BookFormResponse {
	_id: string;
	name: string;
	description: string;
	author: string;
	price: string;
	image: File | null;
	category: string;
}

interface CategoryFormData {
	_id?: string;
	title: string;
}
interface CategoryFormAddResponse {
	_id: string;
	title: string;
	books: BookFormResponse[];
	status: string;
}
interface CategoryFormUpdateResponse {
	data: CategoryFormAddResponse;
	message: string;
	code: number;
	status: string;
	timestamp: string;
}

interface AddCategoryFormProps {
	formData: CategoryFormData;
	setFormData: React.Dispatch<React.SetStateAction<CategoryFormData>>;
}

const CategoryValidate = Yup.object().shape({
	title: Yup.string().required("title of category is required"),
});
const AddCategoryForm: React.FC<AddCategoryFormProps> = ({
	formData,
	setFormData,
}) => {
	const queryClient = useQueryClient();
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const { mutateAsync: addCategory } = useMutation<
		CategoryFormAddResponse,
		Error,
		CategoryFormData
	>({
		mutationKey: ["Categorys", "newCategory"],
		mutationFn: async (data: CategoryFormData) => {
			try {
				const res = await CreateCategory(data);
				return res;
			} catch (error) {
				toast.error("Error in adding Category");
				throw error;
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["Categories"] }); // Make sure to specify the correct query key
			resetForm();
			setIsLoading(false);
		},
		onMutate: () => {
			setIsLoading(true);
		},
	});
	const { mutateAsync: UpdataCategorymutate } = useMutation<
		CategoryFormUpdateResponse,
		Error,
		CategoryFormData
	>({
		mutationKey: ["Categorys", "editCategory"],
		mutationFn: async (data: CategoryFormData) => {
			try {
				const res = await UpdateCategory({ title: data.title }, formData._id);
				return res;
			} catch (error) {
				toast.error("Error in editing Category");
				throw error;
			}
		},
		onSuccess: (res) => {
			queryClient.invalidateQueries({ queryKey: ["Categories"] }); // Make sure to specify the correct query key
			resetForm();
			setIsLoading(false);
			toast.success(res.message);
		},
		onMutate: () => {
			setIsLoading(true);
		},
	});

	const resetForm = () => {
		formik.resetForm();
		setFormData({
			_id: "",
			title: "",
		});
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	useEffect(() => {}, [formData]);

	const formik = useFormik({
		enableReinitialize: true,
		validationSchema: CategoryValidate,
		initialValues: formData,
		onSubmit: async (values: CategoryFormData) => {
			try {
				if (formData._id) {
					await UpdataCategorymutate(values);
				} else {
					await addCategory(values);
				}
			} catch (error) {
				console.error("Error submitting Category:", error);
			}
		},
	});

	const {
		data: fetchedCategories,
		isError,
		error,
		isSuccess,
	} = useQuery({
		queryKey: ["categories"],
		queryFn: GetAllCategories, // Define this function to fetch categories from your API
	});

	useEffect(() => {
		if (isError) {
			console.error("Error fetching categories:", error);
		}
	}, [fetchedCategories, isError, error, isSuccess]);

	// Update formData state whenever formik values change
	useEffect(() => {
		setFormData(formik.values);
	}, [formik.values, setFormData]);

	return (
		<>
			<Header subTitle="Good to see you" className={"text-main font-Inter "}>
				Add New category
			</Header>
			<div className="flex justify-center items-center flex-col ">
				<form
					onSubmit={formik.handleSubmit}
					className="flex flex-col gap-4 p-7 bg-black/10 shadow-xl rounded-lg w-[80%]"
				>
					<input
						type="text"
						placeholder="category title"
						{...formik.getFieldProps("title")}
						className="p-4 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-main transition-all w-full"
					/>
					{formik.touched.title && formik.errors.title ? (
						<div className="text-red-500 text-xs mt-0">
							{formik.errors.title}
						</div>
					) : null}

					<button
						type="submit"
						disabled={isLoading}
						className="p-4 bg-main text-white rounded-lg hover:opacity-85 transition-all"
					>
						{isLoading
							? "Submitting..."
							: formData._id
							? "Edit category"
							: "Add category"}
					</button>
				</form>
			</div>
		</>
	);
};

export default AddCategoryForm;
