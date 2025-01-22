import { MoveRight } from "lucide-react";

export default function ButtonMore({ text }: { text: string }) {
	return (
		<button className="border-[#393280] border-[1px] rounded-[5px] h-[51px] w-[197px] text-[16px] leading-[35.2px] text-[#393280] flex justify-center items-center gap-3 hover:bg-[#393280] hover:text-white transition-colors duration-200">
			{text}
			<span className="w-[13px] inline-block">
				<MoveRight />
			</span>
		</button>
	);
}
