import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function App() {
	return (
		<div>
			<Header />
			<div className="mt-16">
				<Outlet />
			</div>
		</div>
	);
}
