import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { MoveLeft, MoveRight } from "lucide-react";
// import "swiper/css";
// import "swiper/css/navigation";
import SubHeader from "./SubHeader";
import image1 from "../../assets/image1.jpeg";
import ButtonMore from "../ButtonMore/ButtonMore";
const categories = [
	{
		title: "Higher Education",
		image: image1,
	},
	{
		title: "Management Books",
		image: image1,
	},
	{
		title: "Engineering Books",
		image: image1,
	},
	{
		title: "Engineering Books",
		image: image1,
	},
	{
		title: "Engineering Books",
		image: image1,
	},
	{
		title: "Engineering Books",
		image: image1,
	},
];

export default function CategoriesList() {
	return (
		<div className="md:px-16 px-4 my-8 relative">
			<div className="flex justify-between">
				<SubHeader
					headline={"categories"}
					title={"Explore our Top Categories"}
				/>
				<div className="flex gap-5 justify-center items-center">
					<button className="swiper-cat-button-prev ransform rounded-full bg-white p-2 shadow-md hover:bg-secondary hover:text-white transition-colors duration-200 text-secondary border-[1px] border-secondary">
						<MoveLeft className="h-6 w-6 " />
					</button>
					<button className="swiper-cat-button-next ransform rounded-full bg-white p-2 shadow-md hover:bg-secondary hover:text-white transition-colors duration-200 text-secondary border-[1px] border-secondary">
						<MoveRight className="h-6 w-6 " />
					</button>
				</div>
			</div>

			<Swiper
				modules={[Navigation]}
				spaceBetween={20}
				slidesPerView={1}
				navigation={{
					nextEl: ".swiper-cat-button-next",
					prevEl: ".swiper-cat-button-prev",
				}}
				breakpoints={{
					640: {
						slidesPerView: 2,
					},
					1024: {
						slidesPerView: 3,
					},
				}}
				className="relative py-5"
			>
				<div className="p-3 bg-slate-600 h-full w-full">
					{categories.map((category, index) => (
						<SwiperSlide key={index}>
							<div className="">
								<img
									src={category.image}
									alt={category.title}
									className="h-48 w-full object-cover rounded-lg "
								/>
								<div className="p-4">
									<h3 className="text-center text-xl font-semibold text-main">
										{category.title}
									</h3>
								</div>
							</div>
						</SwiperSlide>
					))}
				</div>
			</Swiper>

			<div className="mt-6 flex justify-center">
				<ButtonMore text="View More" />
			</div>
		</div>
	);
}
