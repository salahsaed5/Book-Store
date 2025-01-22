import { Outlet } from "react-router-dom";
import TopHeader from "../components/TopHeader/TopHeader";
import NavBarDashboard from "../components/NavBarDashboard/NavBarDashboard";

export default function DashboardLayout() {
	return (
		<>
			<TopHeader />
			<NavBarDashboard />
			<Outlet />
		</>
	);
}
