export interface Article {
	source: {
		url: string;
		name: string;
	};
	publishedAt: string;
	title: string;
	image: string;
	url: string;
}


// {
//     "source": {
//         "id": "the-washington-post",
//         "name": "The Washington Post"
//     },
//     "author": "Julie Zauzmer Weil",
//     "title": "Ex-Abercrombie & Fitch CEO pleads not guilty to sex trafficking charges - The Washington Post",
//     "description": "Mike Jeffries and his partner are accused of pressuring young men who sought modeling jobs with the retailer into unwanted sex acts.",
//     "url": "https://www.washingtonpost.com/business/2024/10/25/mike-jeffries-arraignment-abercrombie-fitch/",
//     "urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/BTTKGZOHQI5A66VJH2CPBODTBA_size-normalized.jpg&w=1440",
//     "publishedAt": "2024-10-25T21:51:35Z",
//     "content": "CENTRAL ISLIP, N.Y. The former chief executive of clothing company Abercrombie &amp; Fitch pleaded not guilty in federal court Friday to sex trafficking and interstate prostitution charges, after pro… [+2849 chars]"
// }