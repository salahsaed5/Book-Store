import booksSales from "../../assets/booksSales.png";

export default function BookSaleCard({
	timeLeft,
}: {
	timeLeft: {
		days: number;
		hours: number;
		minutes: number;
		seconds: number;
	};
}) {
	return (
		<div className="flex flex-col md:flex-row items-center md:space-x-8 px-4 md:px-0">
			<div className="md:w-1/2 mb-6 md:mb-0 font-Inter text-center md:text-left">
				<h2 className="text-[28px] md:text-[45px] leading-[40px] md:leading-[66px] font-bold text-main mb-4">
					All books are 50% off now!
					<br /> Don&apos;t miss such a deal!
				</h2>
				<p className="text-[#393280] tracking-[5%] font-[400] leading-[24px] md:leading-[32px] text-[16px] md:text-[18px] mb-6">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
					feugiat amet, libero ipsum enim pharetra hac.
				</p>
				<div className="flex justify-center md:justify-start space-x-4 mb-6">
					{Object.entries(timeLeft).map(([key, value]) => (
						<div key={key} className="text-center">
							<div className="text-lg md:text-3xl font-bold text-red-500">
								{value.toString().padStart(2, "0")}
							</div>
							<div className="text-sm md:text-xl uppercase text-gray-500">
								{key}
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="md:w-1/2 md:flex justify-center hidden">
				<img
					src={booksSales}
					alt="Stack of books on sale"
					className="w-[200px] md:w-full"
				/>
			</div>
		</div>
	);
}
