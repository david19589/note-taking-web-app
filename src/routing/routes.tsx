import Layout from "../components/layout/index.tsx";
import AddNote from "../pages/add_note/index.tsx";
import ArchivedNotes from "../pages/archived_notes/index.tsx";
import ForgotPassword from "../pages/forgot_password";
import GoogleAuthFail from "../pages/google_auth_fail";
import Login from "../pages/login";
import NoteDetails from "../pages/note_details";
import ResetPassword from "../pages/reset_password";
import Search from "../pages/search/index.tsx";
import Settings from "../pages/settings/index.tsx";
import ChangeTheme from "../pages/settings_change_theme/index.tsx";
import ChangeFont from "../pages/settings_change_font/index.tsx";
import Signup from "../pages/signup";
import TagList from "../pages/tag_list/index.tsx";
import TagSelected from "../pages/tag_selected/index.tsx";
import ChangePassword from "../pages/settings_change_password/index.tsx";
import ResponsiveMain from "../pages/Responsive_main/index.tsx";

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
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ResponsiveMain />,
      },
      {
        path: "/note/:id",
        element: <NoteDetails />,
      },
      {
        path: "/archived-notes",
        element: <ArchivedNotes />,
      },
      {
        path: "/add-note",
        element: <AddNote />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/tags",
        element: <TagList />,
      },
      {
        path: "/tags/:tag",
        element: <TagSelected />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/settings/change-theme",
        element: <ChangeTheme />,
      },
      {
        path: "/settings/change-font",
        element: <ChangeFont />,
      },
      {
        path: "/settings/change-password",
        element: <ChangePassword />,
      },
    ],
  },
];
export default Routes;
