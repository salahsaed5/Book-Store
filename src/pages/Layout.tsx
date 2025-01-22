import TopHeader from "../components/TopHeader/TopHeader";
import NavBar from "../components/NavBar/NavBar";

import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Breadcrumb from "../components/ui/Breadcrumb";

export default function Layout() {
	const location = useLocation();
	return (
		<>
			<header className="font-Inter">
				<TopHeader />
				<NavBar />
				{location.pathname !== "/" && <Breadcrumb />}
			</header>
			<main className="font-Inter">
				<Outlet />
			</main>
			<Footer />
		</>
	);
}
