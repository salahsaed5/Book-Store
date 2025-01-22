import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
import styles from "../Hero/pagination.module.css";
import "../Hero/SwiperPagination.css";
import BookSaleCard from "./BookSaleCard";
export default function BookSale() {
	const [timeLeft, setTimeLeft] = useState({
		days: 768,
		hours: 1,
		minutes: 27,
		seconds: 55,
	});

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prevTime) => {
				if (
					prevTime.days === 0 &&
					prevTime.hours === 0 &&
					prevTime.minutes === 0 &&
					prevTime.seconds === 0
				) {
					clearInterval(timer);
					return prevTime;
				}

				const newTime = { ...prevTime };
				if (newTime.seconds > 0) {
					newTime.seconds--;
				} else {
					newTime.seconds = 59;
					if (newTime.minutes > 0) {
						newTime.minutes--;
					} else {
						newTime.minutes = 59;
						if (newTime.hours > 0) {
							newTime.hours--;
						} else {
							newTime.hours = 23;
							if (newTime.days > 0) {
								newTime.days--;
							}
						}
					}
				}
				return newTime;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className="bg-[#fcebea] p-6 rounded-lg md:m-20 m-8">
			<div className="flex  items-center justify-between">
				<Swiper
					modules={[Pagination]}
					slidesPerView={1}
					spaceBetween={20}
					pagination={{
						el: "div.swiper-pagination",
						clickable: true,
						bulletClass: styles["custom-bullet"],
						bulletActiveClass: styles["custom-bullet-active"],
					}}
					className="mb-8"
				>
					{
						<>
							<SwiperSlide>
								<BookSaleCard timeLeft={timeLeft} />
							</SwiperSlide>
							<SwiperSlide>
								<BookSaleCard timeLeft={timeLeft} />
							</SwiperSlide>
							<SwiperSlide>
								<BookSaleCard timeLeft={timeLeft} />
							</SwiperSlide>
							<SwiperSlide>
								<BookSaleCard timeLeft={timeLeft} />
							</SwiperSlide>
						</>
					}
					<div className="flex justify-between md:flex-row flex-col items-center relative  gap-6 h-10">
						<div className="w-full text-center">
							<div className="swiper-pagination relative"></div>
						</div>
					</div>
				</Swiper>
			</div>
		</div>
	);
}
