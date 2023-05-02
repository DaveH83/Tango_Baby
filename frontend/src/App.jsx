import { Outlet } from "react-router-dom";
import OffCanvas from "./components/OffCanvas";

export default function App() {
	return (
		<div>
			<OffCanvas />
			<Outlet />
		</div>
	);
}
