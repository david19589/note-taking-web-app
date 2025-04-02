import ForgotPassword from "../pages/forgot_password";
import GoogleAuthFail from "../pages/google_auth_fail";
import Login from "../pages/login";
import Main from "../pages/main";
import ResetPassword from "../pages/reset_password";
import Signup from "../pages/signup";

const Routes = (props: {
  darkMode: boolean;
  setDarkMode: (status: boolean) => void;
}) => [
  {
    path: "/auth/signup",
    element: <Signup {...props} />,
  },
  {
    path: "/auth/login",
    element: <Login {...props} />,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgotPassword {...props} />,
  },
  {
    path: "/auth/reset-password",
    element: <ResetPassword {...props} />,
  },
  {
    path: "/auth/google-auth-fail",
    element: <GoogleAuthFail {...props} />,
  },
  {
    path: "/",
    element: <Main {...props} />,
  },
];
export default Routes;
