import ForgotPassword from "../pages/forgot_password";
import Login from "../pages/login";
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
];
export default Routes;
