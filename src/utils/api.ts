import axios from "axios";

export type noteDataTypes = {
  title: string;
  tags: [string];
  content: string;
  lastEdited: Date;
  isArchived: boolean;
  userEmail: string;
  userPassword: string;
};

export type userDataTypes = {
  userEmail: string;
  userPassword: string;
};

type HttpMethod = "get" | "post" | "put" | "delete";

const apiUrl = {
  notes: "http://localhost:5000/api/notes",
  register: "http://localhost:5000/api/auth/register",
  login: "http://localhost:5000/api/auth/login",
  googleAuth: "http://localhost:5000/api/auth/google-auth",
  forgotPassword: "http://localhost:5000/api/auth/forgot-password",
  resetPassword: "http://localhost:5000/api/auth/reset-password",
};

const handleRequest = async <T>(
  resource: keyof typeof apiUrl,
  method: HttpMethod,
  endpoint = "",
  data?: T
) => {
  try {
    const response = await axios({
      method,
      url: `${apiUrl[resource]}${endpoint}`,
      data,
    });
    return { status: response.status, data: response.data };
  } catch (err) {
    console.error(`Error with ${method.toUpperCase()} request:`, err);
    throw err;
  }
};

export const getNotes = () => handleRequest("notes", "get");
export const postNote = (data: noteDataTypes) =>
  handleRequest("notes", "post", "", data);
export const updateNote = (id: string, data: noteDataTypes) =>
  handleRequest("notes", "put", `/${id}`, data);
export const deleteNote = (id: string) =>
  handleRequest("notes", "delete", `/${id}`);

export const createUser = (data: userDataTypes) =>
  handleRequest("register", "post", "", data);
export const login = (data: userDataTypes) =>
  handleRequest("login", "post", "", data);
export const googleAuth = (userEmail: string) =>
  handleRequest("googleAuth", "post", "", { userEmail });
export const forgotPassword = (userEmail: string) =>
  handleRequest("forgotPassword", "post", "", { userEmail });
export const resetPassword = (
  resetPasswordToken: string,
  userPassword: string
) =>
  handleRequest("resetPassword", "post", "", {
    resetPasswordToken,
    userPassword,
  });
