import FilterSidebar from "../components/FilterSidebar/FilterSidebar";
import ControlBar from "../components/control-bar/ControlBar";
import { useEffect, useState } from "react";
import type {
	Book,
	SortOption,
	ViewMode,
} from "../components/control-bar/ControlBar.types";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { GetAllBooks } from "../Api/Customer/book";
import LazyLoading from "./LazyLoading";
import { BookCard } from "../components/BookCard/BookCard";
import { cn } from "../utils/cn";

export default function Books() {
	const queryClient = useQueryClient();
	const [sortBy, setSortBy] = useState<SortOption>("Alphabetically, A-Z");
	const [navigate, setNavigate] = useState<number>(1);
	const [booksData, setBooksData] = useState<Book[]>([]);
	const [itemsPerPage, setItemsPerPage] = useState<number>(5);
	const [viewMode, setViewMode] = useState<ViewMode>("grid");
	const { data: booksfetched, isLoading } = useSuspenseQuery({
		queryKey: ["books"],
		queryFn: async () => {
			const res = await GetAllBooks(navigate, itemsPerPage);
			setBooksData(res.data);
			return res;
		},
	});

	const total = booksfetched.total;

	useEffect(() => {
		queryClient.invalidateQueries({
			queryKey: ["books"],
		});

		if (itemsPerPage > total) {
			setNavigate(1);
		}
	}, [itemsPerPage, navigate]);

	useEffect(() => {
		if (sortBy === "Alphabetically, A-Z") {
			setBooksData((booksData) =>
				[...booksData].sort((a, b) =>
					a.name.toLowerCase().localeCompare(b.name.toLowerCase())
				)
			);
		} else if (sortBy === "Alphabetically, Z-A") {
			setBooksData((booksData) =>
				[...booksData]
					.sort((a, b) =>
						a.name.toLowerCase().localeCompare(b.name.toLowerCase())
					)
					.reverse()
			);
		} else if (sortBy === "Price, high to low") {
			setBooksData((booksData) =>
				[...booksData].sort((a, b) => b.price - a.price)
			);
		} else if (sortBy === "Price, low to high") {
			setBooksData((booksData) =>
				[...booksData].sort((a, b) => a.price - b.price)
			);
		}
	}, [sortBy, itemsPerPage]);
	return (
		<>
			<div className="flex md:p-8 relative">
				<FilterSidebar />
				<div className="flex flex-col w-full p-4 gap-8">
					<ControlBar
						page={navigate}
						total={total}
						itemsPerPage={itemsPerPage}
						setItemsPerPage={setItemsPerPage}
						setViewMode={setViewMode}
						viewMode={viewMode}
						setSortBy={setSortBy}
					/>
					{isLoading ? (
						<LazyLoading />
					) : (
						<div
							className={cn(
								`${
									viewMode === "grid"
										? "grid xl:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-6"
										: "flex flex-col gap-5 w-full"
								}`
							)}
						>
							{booksData.map((book) => (
								<BookCard viewMode={viewMode} key={book._id} book={book} />
							))}
						</div>
					)}
					<div className="flex justify-between">
						<button
							onClick={() => {
								setNavigate((e) => --e);
							}}
							disabled={!booksfetched.hasPrevPage || isLoading}
							className={cn(
								"py-1 px-3 bg-main text-white rounded-sm",
								`${
									!booksfetched.hasPrevPage && "bg-black/35 cursor-not-allowed "
								}`
							)}
						>
							Last
						</button>
						page:{navigate}
						<button
							onClick={() => {
								setNavigate((e) => ++e);
							}}
							disabled={!booksfetched.hasNextPage || isLoading}
							className={cn(
								"py-1 px-3 bg-main text-white rounded-sm",
								`${
									!booksfetched.hasNextPage && "bg-black/35 cursor-not-allowed "
								}`
							)}
						>
							next
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
