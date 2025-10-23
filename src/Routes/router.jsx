import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import LoginPage from "../Authentication/LoginPage";
import RegisterPage from "../Authentication/RegisterPage";
import CollegeDetailsPage from "../Pages/CollegeDetailsPage/CollegeDetailsPage";
import CollegesPage from "../Pages/CollegesPage/CollegesPage";
import AdmissionPage from "../Pages/AdmissionPage/AdmissionPage";
import MyCollegePage from "../Pages/MyCollegePage/MyCollegePage";
import PrivateRoute from "./PrivateRoute";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
      errorElement: <ErrorPage />, 
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
        element: <PrivateRoute><CollegeDetailsPage /></PrivateRoute>,
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
        element: <PrivateRoute><MyCollegePage /></PrivateRoute>,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
