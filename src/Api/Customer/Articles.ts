import axios from "axios";
{
	/**https://newsapi.org/docs */
}
const API_KEY = "c240c61c99746139729b77cccb3f9a66";
export const AllArticles = async () => {
	try {
		const { data } = await axios.get(
			`https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=${API_KEY}`
		);
		return data.articles;
	} catch (error) {
		console.error(error);
	}
};
