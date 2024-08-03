import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/rootlayout/RootLayout";
import HomePage from "./routes/homepage/HomePage";
import Dashboardlayout from "./layouts/dashboardlayout/Dashboardlayout";
import DashboardPage from "./routes/dashboard/DashboardPage";
import ChatPage from "./routes/chatpage/ChatPage";


const router = createBrowserRouter([
  {
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        element: <Dashboardlayout></Dashboardlayout>,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage></DashboardPage>,
          },
          {
            path: "/dashboard/chats/:id",
            element: <ChatPage></ChatPage>,
          },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
