import { Link } from "react-router-dom";
import type { Article } from "./Article.types";
import ArticleCard from "./ArticleCard";
import { useQuery } from "@tanstack/react-query";
import { AllArticles } from "../../Api/Customer/Articles";
import { Oval } from "react-loader-spinner";
import { useEffect, useState } from "react";

// const articles: Article[] = [
// 	{
// 		id: 1,
// 		date: "2 Aug, 2021",
// 		title: "Reading Books Always Makes The Moments Happy",
// 		image: "/placeholder.svg?height=300&width=400",
// 	},
// 	{
// 		id: 2,
// 		date: "2 Aug, 2021",
// 		title: "Reading Books Always Makes The Moments Happy",
// 		image: "/placeholder.svg?height=300&width=400",
// 	},
// 	{
// 		id: 3,
// 		date: "2 Aug, 2021",
// 		title: "Reading Books Always Makes The Moments Happy",
// 		image: "/placeholder.svg?height=300&width=400",
// 	},
// ];

export default function LatestArticles() {
	const [articles, setArticles] = useState<Article[]>([]);
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ["articles"],
		queryFn: async () => await AllArticles(),
	});
	useEffect(() => {
		if (isSuccess) {
			setArticles(data.slice(0, 3));
		}
	}, [isSuccess, data]);
	return (
		<>
			{isLoading ? (
				<div className="h-[20vh] w-full flex justify-center items-center">
					<Oval
						visible={true}
						height="80"
						width="80"
						color="#173F5F"
						ariaLabel="oval-loading"
					/>
				</div>
			) : (
				<section className=" py-12 sm:py-16 lg:py-20">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex justify-center items-center text-center relative">
							<div className="absolute left-2/4 transform -translate-x-2/4 top-2/4 -translate-y-2/4 w-full h-[0.9px] bg-[#E0E0E0]"></div>
							<div className="bg-white w-[350px] z-10">
								<h2 className="text-xs text-[#7A7A7A] uppercase tracking-wide text-primary">
									READ OUR ARTICLES
								</h2>
								<h3 className="mt-4 text-3xl font-[400] text-[#173F5F] sm:text-4xl">
									Latest Articles
								</h3>
							</div>
						</div>
						<div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
							{articles.map((article, idx) => (
								<ArticleCard key={idx} article={article} />
							))}
						</div>
						<div className="mt-4 text-center">
							<Link
								to="#"
								className="inline-flex items-center border border-[#C0C0C0]  px-6 py-3 text-base font-medium text-[#173F5F]  hover:bg-[#173F5F] hover:text-white duration-300"
							>
								READ ALL ARTICLES
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
				</section>
			)}
		</>
	);
}
