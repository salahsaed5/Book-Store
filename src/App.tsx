import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import AuthLayout from "./pages/AuthLayout";
import AuthForm from "./pages/AuthForm";
import SendOtp from "./pages/SendOtp";
import ForgetPassword from "./pages/ForgetPassword";
import ProtectedRoute from "./pages/ProtectedRoute";
import Books from "./pages/Books";
import DashboardLayout from "./pages/DashboardLayout";
import RoleProtected from "./pages/RoleProtected";
import BookList from "./pages/dashboard/Dashboard-Book/BookList";
import CategotyListDashboard from "./pages/dashboard/Dashboard-Category/CategotyListDashboard";
import ProfilePage from "./pages/Profile";
import CheckoutPage from "./pages/CheckoutPage/CheckOutPage";
import ContactUs from "./pages/ContactsUs";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ConfirmOrder from "./components/ui/ConfirmOrder";

function App() {
	const stripe = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

	const routes = createBrowserRouter([
		{
			path: "/",
			element: (
				<ProtectedRoute>
					<Layout />
				</ProtectedRoute>
			),
			children: [
				{
					path: "/",
					element: <Home />,
				},
				{
					path: "/about",
					element: <About />,
				},
				{
					path: "/books",
					element: <Books />,
				},
				{
					path: "/contactUs",
					element: <ContactUs />,
				},
				{
					path: "/profile",
					element: <ProfilePage />,
				},
				{
					path: "/checkout",
					element: <CheckoutPage />,
				},
				{
					path: "/confirmOrder",
					element: <ConfirmOrder />,
				},
			],
		},
		{
			path: "/dashboard",
			element: (
				<ProtectedRoute>
					<RoleProtected>
						<DashboardLayout />
					</RoleProtected>
				</ProtectedRoute>
			),
			children: [
				{
					index: true,
					element: <BookList />,
				},
				{
					path: "/dashboard/category",
					element: <CategotyListDashboard />,
				},
			],
		},
		{
			path: "/auth",
			element: (
				<ProtectedRoute>
					<AuthLayout />
				</ProtectedRoute>
			),
			children: [
				{
					index: true,
					element: <AuthForm />,
				},
				{
					path: "/auth/send-otp",
					element: <SendOtp />,
				},
				{
					path: "/auth/forget-password",
					element: <ForgetPassword />,
				},
			],
		},
	]);
	return (
		<Elements stripe={stripe}>
			<RouterProvider router={routes} />
		</Elements>
	);
}

export default App;
