import { Link } from "react-router-dom";
import type { Article } from "./Article.types";
import { Link2 } from "lucide-react";

export default function ArticleCard({ article }: { article: Article }) {
	return (
		<div className="flex flex-col overflow-hidden">
			<div className="flex-shrink-0">
				<img
					className="h-48 w-full max-h-full object-fill"
					src={article.image}
					alt={article.title}
					width={400}
					
				/>
			</div>
			<div className="flex flex-1 flex-col justify-between bg-white p-6">
				<div className="flex-1">
					<p className="text-sm tracking-[6%] font-[400] text-[#74642F]">
						{article.publishedAt}
					</p>
					<Link to={article.url} className="mt-2 block">
						<p className="text-xl font-[400] text-[#173F5F]">{article.title}</p>
					</Link>
				</div>
				<hr className="my-4" />
				<div className=" flex items-center">
					<div className="flex-shrink-0">
						<Link
							to={article.url}
							className="text-main hover:opacity-70 duration-300"
						>
							<Link2 className="" />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
