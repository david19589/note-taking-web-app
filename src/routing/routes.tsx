import Login from "../pages/login";
import Signup from "../pages/signup";

const Routes = (props: {
  darkMode: boolean;
  setDarkMode: (status: boolean) => void;
}) => [
  {
    path: "/signup",
    element: <Signup {...props} />,
  },
  {
    path: "/login",
    element: <Login {...props} />,
  },
];
export default Routes;
