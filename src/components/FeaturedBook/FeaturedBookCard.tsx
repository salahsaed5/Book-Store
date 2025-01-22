import { Link } from "react-router-dom";
import Images from "../../assets/books/ImportImages";
import { getRndInteger } from "../../utils/RandomNumber";
import { useMemo } from "react";

// import image1 from "../../assets/book2.png";
export default function FeaturedBookCard({
	name,
	author,
	price,
}: {
	name: string;
	author: string;
	price: number;
}) {
	const RandomImage = useMemo(
		() => getRndInteger(0, Images.length),
		[Images.length]
	);
	return (
		<div className="flex md:flex-row flex-col items-center justify-between gap-10 font-Inter md:h-[90vh]  w-[90%] P-8">
			{/**image side */}
			<div className="h-full w-[450px] py-3 bg-white md:block hidden">
				<img
					src={Images[RandomImage]}
					alt="book"
					className="w-[100%] max-h-full object-cover"
				/>
			</div>
			{/**content side */}
			<div className="flex flex-col gap-7  py-16 md:px-10 px-5 h-full md:w-2/4">
				<h2 className="font-semibold md:text-[50px] text-3xl text-main">
					Featured Book
				</h2>
				{/**author */}
				<div className="px-4 uppercase">
					<div className="w-20 h-[2px] bg-[#ED553B]"></div>
					<p className="text-xs font-[400] tracking-[16%] text-[#888888] mt-2">
						{" "}
						by {author}
					</p>
				</div>
				{/** data of book */}
				<div className="flex flex-col">
					<h2 className="text-main font-semibold text-[28px]">{name}</h2>
					<p className="text-sm font-[400] leading-[33.28px] tracking-[2%] text-[#7A7A7A]">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
						feugiat amet, libero ipsum enim pharetra hac.
					</p>
				</div>
				{/** price */}
				<div>
					<span className="text-[#ED553B] text-[23px] leading-[27.84px] font-[700] tracking-[2%]">
						${price.toFixed(2)}
					</span>
				</div>

				{/**button view more */}
				<Link
					to={"/books"}
					className="inline-flex items-center border border-[#C0C0C0]  px-12 py-3 text-base font-medium text-main  hover:bg-main hover:text-white duration-300 max-w-fit rounded-[4px] mt-12"
				>
					View more
					<svg
						className="ml-2 -mr-1 h-5 w-5"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fillRule="evenodd"
							d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</Link>
			</div>
		</div>
	);
}
