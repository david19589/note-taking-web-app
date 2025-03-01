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
  register: "http://localhost:5000/api/register",
  login: "http://localhost:5000/api/login",
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
    return response.data;
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
