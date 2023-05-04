import { createRoot } from "react-dom/client";
import { App, AppLoader } from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HowTo from "./pages/HowTo";
import Setup from "./pages/Setup";
import Results from "./pages/Results";
import Matches from "./pages/Matches";
import Search from "./pages/Search";
import SwipeNames from "./pages/SwipeNames";
import RankChoices from "./pages/RankChoices";
import Profile from "./pages/Profile";
import "flowbite/dist/flowbite.js";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		loader: AppLoader,
		children: [
			{
				index: true,
				element: <HowTo />,
			},
			{
				path: "setup",
				element: <Setup />,
			},
			{
				path: "profile",
				element: <Profile />,
			},
			{
				path: ":id/results",
				element: <Results />,
			},
			{
				path: "matches",
				element: <Matches />,
			},
			{
				path: ":id/search",
				element: <Search />,
			},
			{
				path: ":id/swipe",
				element: <SwipeNames />,
			},
			{
				path: ":id/rank",
				element: <RankChoices />,
			},
		],
	},
]);

const rootElement = document.getElementById("root");

createRoot(rootElement).render(<RouterProvider router={router} />);
