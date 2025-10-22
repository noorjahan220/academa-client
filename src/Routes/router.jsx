import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import LoginPage from "../Authentication/LoginPage";
import RegisterPage from "../Authentication/RegisterPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children: [
      {
        path:'/',
        element:<Home/>
      },
       {
        path:'/Login',
        element:<LoginPage/>
      },
       {
        path:'/register',
        element:<RegisterPage/>
      },
    ]
  },
]);


export default router;