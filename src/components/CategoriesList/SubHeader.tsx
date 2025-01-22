
export default function SubHeader({
	title,
	headline,
}: {
	title: string;
	headline: string;
}) {
	return (
		<div>
			<div className="flex items-center gap-4">
				<span className="inline-block bg-red-500 h-[2px] w-[30px]"></span>
				<p className="text-[14px] leading-[16.94px] font-[700] tracking-[10%] text-[#ED553B]">
					{headline}
				</p>
			</div>
			<h2 className="mt-2 md:text-3xl text-lg font-bold text-main">{title}</h2>
		</div>
	);
}
