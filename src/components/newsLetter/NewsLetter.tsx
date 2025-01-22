const Newsletter = () => {
	return (
		<section className="bg-[#FCEBEA] font-Inter  h-[500px]">
			<div className="description-side w-full flex md:flex-row flex-col justify-center relative">
				<div className="md:w-[90%] md:h-2/4 text-center py-6 bg-[#ED553B]">
					<h2 className="md:text-[50px] text-3xl leading-[67.2px] tracking-[1%] text-white font-bold mb-4 py-3">
						Subscibe to Our Newsletter
					</h2>
					<p className="md:leading-[41.6px] tracking-[2%] text-white">
						Sed eu feugiat amet, libero ipsum enim pharetra hac dolor sit amet,
						<br />
						consectetur. Elit adipiscing enim pharetra hac.
					</p>
				</div>

				<div className="py-2 px-4 md:absolute md:-bottom-16 md:left-2/4 md:transform md:-translate-x-2/4 bg-white h-[90px] flex items-center md:w-[50%] w-full md:mt-0 mt-4">
					<form className="flex items-center justify-between w-full" action="">
						<div className=" p-2.5 border-[1px] border-[#DFDFDF] flex justify-center items-center">
							✉️
						</div>
						<input
							type="email"
							placeholder="youremail123@gmail.com"
							className="w-[80%] h-10 pl-4 md:text-base text-xs text-gray-600 focus:outline-none"
						/>
						<button
							onClick={(e) => {
								e.preventDefault();
							}}
							type="submit"
							className="bg-[#ED553B] hover:opacity-90 duration-200 text-white w-[
            20%] h-16 w-[206px] "
						>
							Subscribe
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Newsletter;
