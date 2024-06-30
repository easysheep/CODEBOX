import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Editor from "./Components/Editor/Editor.jsx";
import Home from "./Components/Home/Home.jsx";
import Projects from "./Components/Projects/Projects.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const router = createBrowserRouter([
  {
    children: [
      { path: "/", element: <Home /> },
      { path: "/editor", element: <Editor /> },
      { path: "/projects", element: <Projects /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router}></RouterProvider>
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition:Slide
    />
  </>
);
