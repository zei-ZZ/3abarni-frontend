import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import LoadingScreen from "../pages/LoadingScreen";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};
const isAuthenticated = () => {
  // Check if a token exists in localStorage or any other authentication logic
  const token = localStorage.getItem("token");
  return token !== null;
};
// Components from the "components" directory
const LoginForm = Loadable(lazy(() => import("../components/LoginForm")));
const SignUpForm = Loadable(lazy(() => import("../components/SignUpForm")));
const ParentComponent = Loadable(lazy(() => import("../components/ParentComponent")));
const ForgetPassword = Loadable(lazy(() => import("../components/ForgetPassword")));
const Profile = Loadable(lazy(() => import("../components/Profile")));
const Settings = Loadable(lazy(() => import("../components/Settings")));
const Page404 = Loadable(lazy(() => import("../pages/Page404")));
const PacmanGame = Loadable(lazy(() => import("../components/PacmanGame")));

       

// Define DEFAULT_PATH
const DEFAULT_PATH = "http://localhost:5173/"; // Default path for logged-in users

export default function Router() {
  return useRoutes([
    { path: "/login", element: <LoginForm /> },
    { path: "/register", element: <SignUpForm /> },
    { path: "/forgetpassword", element: <ForgetPassword /> },
    { path: "/profile", element: <Profile /> },
    { path: "/settings", element: <Settings /> },
    { path: "/game", element: <PacmanGame /> },
    // Default route for logged-in users
    {
      path: "/chat",
      element: <ParentComponent />
    },
    // Add other dashboard routes as needed
    {
      path: "/",
      element: isAuthenticated() ? <ParentComponent /> : <Navigate to="/login" replace />,
    },
    { path: "/404", element: <Page404 /> },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

