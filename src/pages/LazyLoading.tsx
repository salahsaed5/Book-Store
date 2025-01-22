import { Oval } from "react-loader-spinner";

export default function LazyLoading() {
	return (
		<div className="w-full h-screen flex justify-center items-center">
			<Oval
				visible={true}
				height="80"
				width="80"
				color="#393280"
				secondaryColor="#39328067"
				ariaLabel="oval-loading"
				wrapperStyle={{}}
				wrapperClass=""
			/>
		</div>
	);
}
