import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import LoginPage from "../Authentication/LoginPage";
import RegisterPage from "../Authentication/RegisterPage";
import CollegeDetailsPage from "../Pages/CollegeDetailsPage/CollegeDetailsPage";
import CollegesPage from "../Pages/CollegesPage/CollegesPage";
import AdmissionPage from "../Pages/AdmissionPage/AdmissionPage";
import MyCollegePage from "../Pages/MyCollegePage/MyCollegePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/college/:id",
        element: <CollegeDetailsPage />,
      },
       {
        path: "/colleges", 
        element: <CollegesPage />,
      },
 {
        path: "/admission",
        element: <AdmissionPage />,
      },
      {
        path: "/my-college",
        element: <MyCollegePage />,
      },
    ],
  },
]);

export default router;
