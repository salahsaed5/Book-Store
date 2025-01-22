
import { Link, useLocation } from "react-router-dom";

const Breadcrumb: React.FC = () => {
	const location = useLocation();
	const pathnames = location.pathname.split("/").filter((x) => x);

	return (
		<nav className="flex items-center justify-center text-sm font-medium text-indigo-800 bg-custom-gradient h-16">
			<Link to="/" className="hover:underline">
				HOME
			</Link>
			{pathnames.map((value, index) => {
				const to = `/${pathnames.slice(0, index + 1).join("/")}`;
				const label = value.replace(/-/g, " ").toUpperCase();
				return (
					<span key={to} className="flex items-center">
						<span className="px-2">/</span>
						{index === pathnames.length - 1 ? (
							<span>{label}</span>
						) : (
							<Link to={to} className="hover:underline">
								{label}
							</Link>
						)}
					</span>
				);
			})}
		</nav>
	);
};

export default Breadcrumb;
