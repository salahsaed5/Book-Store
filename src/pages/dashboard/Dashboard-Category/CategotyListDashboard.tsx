import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import AddCategoryForm from "./AddCategoryForm";
import { Helmet } from "react-helmet";
import { Oval } from "react-loader-spinner";
import { GetAllCategories } from "../../../Api/Admin/category";
import CategoryCard from "./CategoryCard";
interface CategoryFormData {
	_id?: string;
	title: string;
}
interface CategoryFormResponse {
	_id: string;
	title: string;
}

const CategotyListDashboard = () => {
	const [products, setProducts] = useState<CategoryFormResponse[]>([]);
	const [formData, setFormData] = useState<CategoryFormData>({
		_id: "",
		title: "",
	});

	const {
		data: productsData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["Categories"],
		queryFn: async () => {
			const res = await GetAllCategories();
			return res;
		},
	});

	useEffect(() => {
		if (productsData) setProducts(productsData);
		if (error) console.log("Error fetching products", error);
	}, [productsData, error]);

	return (
		<>
			<Helmet>
				<title>Products</title>
				<meta name="description" content="Products" />
			</Helmet>
			<AddCategoryForm formData={formData} setFormData={setFormData} />
			<div className="grid grid-cols-1 gap-6 p-6 bg-black/10 md:grid-cols-2 lg:grid-cols-3 rounded-lg shadow-md mt-10 min-h-[50vh] relative">
				{isLoading ? (
					<div className="absolute left-2/4 top-2/4 transform -translate-x-2/4 -translate-y-2/4">
						<Oval
							visible={true}
							height="80"
							width="80"
							color="#4fa94d"
							ariaLabel="oval-loading"
							wrapperStyle={{}}
							wrapperClass=""
						/>
					</div>
				) : products.length === 0 ? (
					<p>No products to display</p>
				) : (
					products.map((product) => (
						<CategoryCard
							key={product._id}
							product={product}
							setFormData={setFormData}
						/>
					))
				)}
			</div>
		</>
	);
};

export default CategotyListDashboard;
