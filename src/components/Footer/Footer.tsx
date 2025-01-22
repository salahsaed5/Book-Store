import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import FooterSquares from "../../assets/footerSquars.png";
export default function Footer() {
	return (
		<footer className="bg-[#f05a43] text-white py-12 px-6 md:px-12">
			<div className="container mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 overflow-hidden relative">
					{/* Logo and description */}
					<img className="absolute w-[150px] -left-44 -top-60" src={FooterSquares} alt="FooterSquares" />
					<div className="space-y-4">
						<div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
							<svg
								className="w-10 h-10 text-[#f05a43]"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M12 14l9-5-9-5-9 5 9 5z" />
								<path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
							</svg>
						</div>
						<p className="text-sm">
							Nostrud exercitation ulamco laboris nisi ut aliquip ex ea commodo
							consequat.
						</p>
						<div className="flex space-x-4">
							<Link to="#" className="hover:text-gray-200">
								<Facebook size={24} />
							</Link>
							<Link to="#" className="hover:text-gray-200">
								<Linkedin size={24} />
							</Link>
							<Link to="#" className="hover:text-gray-200">
								<Twitter size={24} />
							</Link>
							<Link to="#" className="hover:text-gray-200">
								<Youtube size={24} />
							</Link>
						</div>
					</div>

					{/* Company links */}
					<div>
						<h3 className="font-bold text-lg mb-4">COMPANY</h3>
						<ul className="space-y-2">
							{[
								"HOME",
								"ABOUT US",
								"BOOKS",
								"NEW RELEASE",
								"CONTACT US",
								"BLOG",
							].map((item) => (
								<li key={item}>
									<Link to="#" className="hover:underline">
										{item}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Important links */}
					<div>
						<h3 className="font-bold text-lg mb-4">IMPORTANT LINKS</h3>
						<ul className="space-y-2">
							{["Privacy Policy", "FAQs", "Terms of Service"].map((item) => (
								<li key={item}>
									<Link to="#" className="hover:underline">
										{item}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Copyright and additional links */}
				<div className="mt-12 pt-4 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-sm">
					<p>© 2022 Arihant. All Rights Reserved.</p>
					<div className="mt-2 md:mt-0">
						<Link to="#" className="hover:underline">
							Privacy
						</Link>
						<span className="mx-2">|</span>
						<Link to="#" className="hover:underline">
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
