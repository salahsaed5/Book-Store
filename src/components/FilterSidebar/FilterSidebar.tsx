import { Grid3x3, X } from "lucide-react";
import FilterSection from "./FilterSection";
import PriceFilter from "./PriceFilter";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import useMobileHandler from "../../hooks/useMobileHandler";

export default function FilterSidebar() {
	const [open, setOpen] = useState(false);
	const { isMobile } = useMobileHandler();
	const [minPrice, setMinPrice] = useState<string>("");
	const [maxPrice, setMaxPrice] = useState<string>("");
	const [expandedSections, setExpandedSections] = useState<{
		[key: string]: boolean;
	}>({
		price: false,
		productType: false,
		availability: false,
		brand: false,
		color: false,
		material: false,
	});

	const toggleSection = (section: string) => {
		setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
	};

	return (
		<div className="relative h-fit">
			<button
				onClick={() => setOpen(true)}
				className="mt-5 ml-5 bg-main md:hidden block absolute"
			>
				<Grid3x3 className="w-6 h-6 text-white ring-main ring-offset-2 ring-1 rounded-sm" />
			</button>

			<div className="min-w-[280px] px-4 bg-white p-3 md:block hidden shadow-xl">
				{/* Price Filter Section */}
				<FilterSection
					title="Price"
					isExpanded={expandedSections.price}
					onToggle={() => toggleSection("price")}
				>
					<PriceFilter
						minPrice={minPrice}
						maxPrice={maxPrice}
						setMinPrice={setMinPrice}
						setMaxPrice={setMaxPrice}
					/>
				</FilterSection>

				{/* Other Filter Sections */}
				<FilterSection
					title="Product Type"
					isExpanded={expandedSections.productType}
					onToggle={() => toggleSection("productType")}
				>
					<p className="text-gray-600">Product type options go here</p>
				</FilterSection>
				<FilterSection
					title="Availability"
					isExpanded={expandedSections.availability}
					onToggle={() => toggleSection("availability")}
				>
					<p className="text-gray-600">Availability options go here</p>
				</FilterSection>
				<FilterSection
					title="Brand"
					isExpanded={expandedSections.brand}
					onToggle={() => toggleSection("brand")}
				>
					<p className="text-gray-600">Brand options go here</p>
				</FilterSection>
				<FilterSection
					title="Color"
					isExpanded={expandedSections.color}
					onToggle={() => toggleSection("color")}
				>
					<p className="text-gray-600">Color options go here</p>
				</FilterSection>
				<FilterSection
					title="Material"
					isExpanded={expandedSections.material}
					onToggle={() => toggleSection("material")}
				>
					<p className="text-gray-600">Material options go here</p>
				</FilterSection>

				{/* Filter Button */}
				<button className="w-full bg-indigo-700 text-white py-2 rounded hover:bg-indigo-800 transition-colors mt-4">
					Filter
				</button>
			</div>

			{isMobile && open && (
				<AnimatePresence>
					<motion.div
						animate={{
							left: 0,
							transition: { duration: 0.3 },
						}}
						className="min-w-[280px] px-4 bg-white max-h-fit md:relative fixed top-28 md:left-0 left-[-1000px] md:top-0 shadow-2xl overflow-y-auto p-3 md:hidden block z-50"
					>
						<button
							onClick={() => setOpen(false)}
							className="bg-main rounded-md p-1"
						>
							<X className="text-white" />
						</button>
						{/* Price Filter Section for Mobile */}
						<FilterSection
							title="Price"
							isExpanded={expandedSections.price}
							onToggle={() => toggleSection("price")}
						>
							<PriceFilter
								minPrice={minPrice}
								maxPrice={maxPrice}
								setMinPrice={setMinPrice}
								setMaxPrice={setMaxPrice}
							/>
						</FilterSection>
						<FilterSection
							title="Product Type"
							isExpanded={expandedSections.productType}
							onToggle={() => toggleSection("productType")}
						>
							<p className="text-gray-600">Product type options go here</p>
						</FilterSection>
						<FilterSection
							title="Availability"
							isExpanded={expandedSections.availability}
							onToggle={() => toggleSection("availability")}
						>
							<p className="text-gray-600">Availability options go here</p>
						</FilterSection>
						<FilterSection
							title="Brand"
							isExpanded={expandedSections.brand}
							onToggle={() => toggleSection("brand")}
						>
							<p className="text-gray-600">Brand options go here</p>
						</FilterSection>
						<FilterSection
							title="Color"
							isExpanded={expandedSections.color}
							onToggle={() => toggleSection("color")}
						>
							<p className="text-gray-600">Color options go here</p>
						</FilterSection>
						<FilterSection
							title="Material"
							isExpanded={expandedSections.material}
							onToggle={() => toggleSection("material")}
						>
							<p className="text-gray-600">Material options go here</p>
						</FilterSection>
					</motion.div>
				</AnimatePresence>
			)}
		</div>
	);
}
