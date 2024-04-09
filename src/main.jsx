import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import ProfilePic from "./Pages/ProfilePic";
import UserPreference from "./Pages/UserPreference";
import VerifyEmail from "./Pages/VerifyEmail";

const router = createBrowserRouter([
  {
    path: "/",
    exact: true,
    element: <SignUp />,
  },
  {
    path: "/profile",
    exact: true,
    element: <ProfilePic />,
  },
  {
    path: "/userPreference",
    exact: true,
    element: <UserPreference />,
  },
  {
    path: "/verifyEmail",
    exact: true,
    element: <VerifyEmail />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);