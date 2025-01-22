import { ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import styles from "../Hero/pagination.module.css";
import "../Hero/SwiperPagination.css";
import { BookCard } from "../BookCard/BookCard";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetAllBooks } from "../../Api/Customer/book";
import { Oval } from "react-loader-spinner";
import type { Book } from "../control-bar/ControlBar.types";
import { useEffect, useState } from "react";

export default function NewReleaseBooks() {
	const [booksData, setBooksData] = useState<Book[]>([]);

	const {
		data: booksfetched,
		isLoading,
		isSuccess,
	} = useQuery({
		queryKey: ["books"],
		queryFn: async () => {
			const res = await GetAllBooks();
			console.log(res.data);
			return res.data;
		},
	});
	// console.log(booksfetched.data);

	useEffect(() => {
		if (isSuccess && booksfetched) {
			setBooksData(booksfetched.data);
		}
	}, [booksfetched, isSuccess]);

	return (
		<section className="bg-pink-50 py-12 px-4 md:px-8 relative">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-8">
					<p className="text-sm text-muted-foreground uppercase mb-2">
						Some Quality Items
					</p>
					<h2 className="text-3xl md:text-4xl font-bold text-[#393280]">
						New Release Books
					</h2>
				</div>

				<Swiper
					modules={[Pagination]}
					slidesPerView={1}
					spaceBetween={20}
					pagination={{
						clickable: true,
						bulletClass: styles["custom-bullet"],
						bulletActiveClass: styles["custom-bullet-active"],
					}}
					breakpoints={{
						640: { slidesPerView: 2 },
						768: { slidesPerView: 3 },
						1024: { slidesPerView: 4 },
					}}
					className="mb-8"
				>
					{isLoading ? (
						<Oval
							visible={true}
							height="80"
							width="80"
							color="#393280"
							secondaryColor="#39328067"
							ariaLabel="oval-loading"
						/>
					) : (
						booksData?.slice(0, 8).map((book: Book, index: number) => (
							<SwiperSlide
								className="flex justify-center items-center mb-4"
								key={index}
							>
								<BookCard book={book} />
							</SwiperSlide>
						))
					)}
					<div className="bg-[#E0E0E0] h-[1px] w-full flex justify-center items-center my-4 "></div>
					<div className="flex justify-between md:flex-row flex-col items-center relative gap-6 h-[50px]">
						<div className="w-full">
							<div className="swiper-pagination relative "></div>
						</div>
						<Link
							to={"/books"}
							className="inline-flex items-center text-[#393280] hover:underline md:absolute md:right-0"
						>
							View All Products
							<ChevronRight className="ml-1 h-4 w-4" />
						</Link>
					</div>
				</Swiper>
			</div>
		</section>
	);
}
