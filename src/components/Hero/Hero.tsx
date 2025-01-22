import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { MoveLeft, MoveRight } from "lucide-react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "./SwiperPagination.css";
import SlideComponent from "./SlideComponent";
import styles from "./pagination.module.css";
import useMobileHandler from "../../hooks/useMobileHandler";
import { useQuery } from "@tanstack/react-query";
import { GetAllBooks } from "../../Api/Customer/book";
import { useEffect, useState } from "react";
import type { Slides } from "./Slides.types";
import { Oval } from "react-loader-spinner";
import toast from "react-hot-toast";
import NotFound from "../ui/NotFound";
// import Images from "../../assets/books/ImportImages";
// import { getRndInteger } from "../../utils/RandomNumber";

export default function Hero() {
	const [slides, setSlides] = useState<Slides[]>([]);
	// console.log(Images);
	// const res = getRndInteger(1, 5);
	// console.log(Images);

	const { isMobile } = useMobileHandler() || {}; // Add fallback to an empty object
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		queryKey: ["slides"],
		queryFn: async () => {
			const data = await GetAllBooks(1, 5);
			return data.data;
		},
	});

	useEffect(() => {
		if (isSuccess) {
			setSlides(data);
		}
	}, [isSuccess, data]);

	useEffect(() => {
		if (isError) {
			toast.error(error.message || "error in fetching data");
		}
	}, [isError, error?.message]);
	return (
		<>
			{isLoading ? (
				<div className="h-[50vh] w-full flex justify-center items-center">
					<Oval
						visible={true}
						height="80"
						width="80"
						color="#ED553B"
						secondaryColor="#ed563b58"
						ariaLabel="oval-loading"
						wrapperStyle={{}}
						wrapperClass=""
					/>
				</div>
			) : slides.length === 0 ? (
				<NotFound>slides</NotFound>
			) : (
				<div className="relative bg-gradient-to-r from-[#fbe4e4] to-white">
					<Swiper
						modules={[Navigation, Pagination, Scrollbar]}
						spaceBetween={50}
						scrollbar={{
							el: ".swiper-scrollbar", // Attach class for custom scrollbar
							// hide: !isMobile, // Only show scrollbar on mobile
							draggable: true,
						}}
						slidesPerView={1}
						navigation={{
							nextEl: ".swiper-button-next",
							prevEl: ".swiper-button-prev",
						}}
						pagination={{
							el: ".swiper-pagination",
							clickable: true,
							bulletClass: styles["custom-bullet"],
							bulletActiveClass: styles["custom-bullet-active"],
						}}
					>
						{slides.map((slide, index) => (
							<SwiperSlide
								className="h-screen-minus-top-and-nav md:w-[80%] md:px-16 px-2 flex"
								key={index}
							>
								<SlideComponent
									alt={slide.alt}
									description={slide.description}
									image={slide.image}
									title={slide.name}
								/>
							</SwiperSlide>
						))}
						<div className="swiper-scrollbar"></div>
						{/* Navigation Buttons */}
						{!isMobile && (
							<div className="">
								<div className=" absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
									<button className="swiper-button-prev w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-[#ED553B] hover:bg-[#ED553B] hover:text-white transition-colors border-[1px] border-[#ED553B]">
										<MoveLeft className="" />
									</button>
								</div>

								<div className=" absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
									<button className="swiper-button-next w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-[#ED553B] hover:bg-[#ED553B] hover:text-white transition-colors border-[1px] border-[#ED553B]">
										<MoveRight className="" />
									</button>
								</div>
								{/* Pagination dots under the "Read More" button */}
							</div>
						)}
						{!isMobile && (
							<div className="swiper-pagination mt-4 absolute left-36 space-x-4 top-[88%] transform -translate-y-1/2 z-50" />
						)}
					</Swiper>
				</div>
			)}
		</>
	);
}
