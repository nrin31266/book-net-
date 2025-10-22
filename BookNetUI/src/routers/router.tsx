import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../feature/auth/pages/Login";
import Register from "../feature/auth/pages/Register";
import Home from "../feature/home/pages/Home";
import AppLayout from "../layouts/AppLayout";
import { AuthProvider } from "../providers/AuthProvider";

const router = createBrowserRouter([
  {
    element: <AuthProvider />,
    children: [
    //   {
    //     path: "/auth",
    //     element: <AuthLayout />,
    //     children: [
    //       {
    //         path: "login",
    //         element: <Login />,
    //       },
    //       {
    //         path: "register",
    //         element: <Register />,
    //       },
    //     ],
    //   },
      {
        element: <AppLayout />, // layout bọc các route con
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/profile",
            element: <div>Profile</div>,
          },
        ],
      },
    ],
  },
]);

export default router;
