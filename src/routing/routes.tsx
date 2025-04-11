import ForgotPassword from "../pages/forgot_password";
import GoogleAuthFail from "../pages/google_auth_fail";
import Login from "../pages/login";
import Main from "../pages/main/index.tsx";
import NoteDetails from "../pages/note_details";
import ResetPassword from "../pages/reset_password";
import Signup from "../pages/signup";

const Routes = () => [
  {
    path: "/auth/signup",
    element: <Signup />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/auth/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/auth/google-auth-fail",
    element: <GoogleAuthFail />,
  },
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/note/:id",
    element: <NoteDetails />,
  },
];
export default Routes;
