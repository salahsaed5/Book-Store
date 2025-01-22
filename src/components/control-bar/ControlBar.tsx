import { Grid, List } from "lucide-react";
import type { SortOption, ViewMode } from "./ControlBar.types";

export default function ControlBar({
	setSortBy,
	itemsPerPage,
	setItemsPerPage,
	viewMode,
	setViewMode,
	total,
	page,
}: {
	setSortBy: React.Dispatch<React.SetStateAction<SortOption>>;
	itemsPerPage: number;
	setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
	viewMode: ViewMode;
	setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
	total: number;
	page: number;
}) {
	const showOptions = [{ value: 5 }, { value: 10 }];

	const to = page * itemsPerPage > total ? total : page * itemsPerPage;
	const from =
		page * itemsPerPage - itemsPerPage === 0
			? 1
			: page * itemsPerPage - itemsPerPage;
	return (
		<div className="w-full md:mt-0 mt-10">
			{" "}
			<div className="flex flex-row flex-wrap justify-between items-center mb-6 gap-4 w-full text-[#393280] font-[600]">
				<div className="flex items-center gap-4">
					<div className="flex items-center">
						<span className="mr-2">Sort by:</span>
						<select
							defaultValue={30}
							name="sortby"
							className="focus:outline-none text-main"
							onChange={(e) => setSortBy(e.target.value as SortOption)}
						>
							<option value={"Alphabetically, A-Z"}>Alphabetically, A-Z</option>
							<option value={"Alphabetically, Z-A"}>Alphabetically, Z-A</option>
							<option value={"Price, low to high"}>Price, low to high</option>
							<option value={"Price, high to low"}>Price, high to low</option>
						</select>
					</div>
				</div>
				<span className="text-gray-600">
					Showing {from} - {to} of {total} result
				</span>
				<div className="flex items-center">
					<span className="mr-2">Show:</span>
					<select
						value={itemsPerPage}
						onChange={(e) => setItemsPerPage(Number(e.target.value))}
						className="focus:outline-none text-main"
					>
						{showOptions.map((el) => (
							<option key={el.value} value={el.value}>
								{el.value}
							</option>
						))}
					</select>
				</div>
				<div className="flex items-center gap-4 order-3">
					<div className="flex gap-2">
						<button
							onClick={() => setViewMode("grid")}
							className={`p-1 rounded ${
								viewMode === "grid" ? "bg-gray-200" : ""
							}`}
						>
							<Grid className="text-4xl" />
						</button>
						<button
							onClick={() => setViewMode("list")}
							className={`p-1 rounded ${
								viewMode === "list" ? "bg-gray-200" : ""
							}`}
						>
							<List className="text-4xl" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
