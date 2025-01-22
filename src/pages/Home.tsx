import Hero from "../components/Hero/Hero";
import CategoriesList from "../components/CategoriesList/CategoriesList";
import NewReleaseBooks from "../components/NewReleaseBooks/NewReleaseBooks";
import BookSale from "../components/BookSale/BookSale";
import Newsletter from "../components/newsLetter/NewsLetter";
import LatestArticles from "../components/LatestArticles/LatestArticle";
import FeaturedBook from "../components/FeaturedBook/FeaturedBook";
import { Helmet } from "react-helmet";

export default function Home() {
	return (
		<>
			<Helmet>
				<title>Book Store.</title>
				<meta name="description" content="This Home page in book store page" />
			</Helmet>
			<Hero />
			<CategoriesList />
			<FeaturedBook />
			<NewReleaseBooks />
			<BookSale />
			<Newsletter />
			<LatestArticles />
		</>
	);
}
