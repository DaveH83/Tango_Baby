import { createRoot } from "react-dom/client";
import { App, AppLoader } from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Results from "./pages/Results";
import Matches from "./pages/Matches";
import Search from "./pages/Search";
import SwipeNames from "./pages/SwipeNames";
import RankChoices from "./pages/RankChoices";
import Profile from "./pages/Profile";
import "flowbite/dist/flowbite.js";
import AddChild from "./pages/AddChild";
import Child, { ChildLoader } from "./pages/Child";
import { nameListLoader } from "./Utilities/Utilities";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		loader: AppLoader,
		children: [
			{
				index: true,
				element: <Profile />,
			},
			{
				path: "addchild",
				element: <AddChild />,
			},
			{
				path: "child/:uuid",
				element: <Child />,
				loader: ChildLoader,
			},
			// {
			// 	path: "profile",
			// 	element: <Profile />,
			// },
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
				path: "swipe/:uuid",
				element: <SwipeNames />,
				loader: ({ params }) => nameListLoader(params.uuid),
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
