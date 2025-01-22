import useMobileHandler from "../../hooks/useMobileHandler";
import ButtonMore from "../ButtonMore/ButtonMore";
// import book1 from "../../assets/book1.png";
import Images from "../../assets/books/ImportImages";
import { getRndInteger } from "../../utils/RandomNumber";
import { useMemo } from "react";

interface propsType {
	title: string;
	description: string;
	image?: string;
	alt: string;
}

export default function SlideComponent({
	alt,
	description,
	// image = book1,
	title,
}: propsType) {
	const randomNumber = useMemo(
		() => getRndInteger(0, Images.length),
		[Images.length]
	);

	const { isMobile } = useMobileHandler();

	return (
		<>
			{
				<div className="flex flex-col md:flex-row items-center justify-between p-8 w-full h-full">
					<div className="md:max-w-[607px] h-full flex flex-col justify-center gap-7 mb-6 md:mb-0">
						<h2 className="font-[600] md:text-5xl text-4xl leading-[87px] text-[#393280]">
							{title}
						</h2>
						<p className="text-lg text-[#393280CC] leading-[39.6px] mb-6">
							{description}
						</p>
						<ButtonMore text="Read More" />
					</div>
					{!isMobile && (
						<div className="relative w-2/4 h-full ">
							<img
								className="object-cover absolute right-0 top-0 h-full max-w-full"
								src={Images[randomNumber]}
								alt={alt}
							/>
						</div>
					)}
				</div>
			}
		</>
	);
}
