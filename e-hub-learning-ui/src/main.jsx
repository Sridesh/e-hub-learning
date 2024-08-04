import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EditCourse from "./pages/EditCourse.jsx";
import AddCourse from "./pages/AddCourse.jsx";
import Common from "./components/Common.jsx";
import Landing from "./components/Landing.jsx";

const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/",
    element: <Common />,
  },
  {
    path: "/edit-course",
    element: <EditCourse />,
  },
  {
    path: "/create-course",
    element: <AddCourse />,
  },
  {
    path: "/course",
    element: <Landing />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
