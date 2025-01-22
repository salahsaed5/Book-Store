/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { DeleteCategory } from "../../../Api/Admin/category";

interface CategoryFormData {
	_id?: string;
	title: string;
}
interface categoryResponse {
	_id: string;
	title: string;
	status: string;
	updatedAt: string;
	createdAt: string;
	_v: number;
}
interface categoryDeleteResponse {
	code: number;
	data: categoryResponse;
	message: string;
	status: string;
	timestamp: string;
}

function CategoryCard({
	product,
	setFormData,
}: {
	product: any;
	setFormData: React.Dispatch<React.SetStateAction<CategoryFormData>>;
}) {
	const queryClient = useQueryClient();
	type id = string;
	const { mutate: handleDelete } = useMutation<
		categoryDeleteResponse,
		Error,
		id
	>({
		mutationKey: ["Categories", "deleteCategories"],
		mutationFn: async (categoryId: string) => {
			try {
				const res = await DeleteCategory(categoryId);
				console.log(res);
				return res;
			} catch (error: any) {
				toast.error("Error deleting category");
			}
		},
		onSuccess: (res: categoryDeleteResponse) => {
			if (res.status == "SUCCESS") {
				queryClient.invalidateQueries({ queryKey: ["Categories"] });
				resetForm();
				toast.success(res.message);
			}
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const handleEdit = (category: CategoryFormData) => {
		setFormData({
			_id: category._id,
			title: category.title,
		});
	};

	const resetForm = () => {
		setFormData({
			title: "",
		});
	};

	return (
		<main className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-lg">
			<h2 className="text-main text-3xl font-semibold">
				title: {product.title}
			</h2>
			<div className="mt-6 flex gap-4">
				<button
					onClick={() => handleEdit(product)}
					className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition-all"
				>
					Edit
				</button>
				<button
					onClick={() => handleDelete(product._id)}
					className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-all"
				>
					Delete
				</button>
			</div>
		</main>
	);
}

export default CategoryCard;
