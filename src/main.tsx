import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { MobileHandlerProvider } from "./context/mobileHandler.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import LazyLoading from "./pages/LazyLoading.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<Suspense fallback={<LazyLoading />}>
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<Toaster position="top-right" />
					<MobileHandlerProvider>
						<App />
					</MobileHandlerProvider>
				</AuthProvider>
			</QueryClientProvider>
		</Provider>
	</Suspense>
);
