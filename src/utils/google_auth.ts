import { Account, Client, OAuthProvider } from "appwrite";
import { googleAuth } from "./api";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67caf863002be06352c0");

const account = new Account(client);

export const authWithGoogle = async () => {
  try {
    await account.get();
    await account.deleteSession("current");
  } catch (err) {
    console.error("No active session, proceeding with login...", err);
  }

  try {
    account.createOAuth2Session(
      OAuthProvider.Google,
      "http://localhost:5173/",
      "http://localhost:5173/auth/google-auth-fail"
    );
  } catch (err) {
    console.error("Error handling Google login:", err);
  }
};

export const saveUserGmail = async () => {
  try {
    const user = await account.get();

    if (user?.email) {
      const response = await googleAuth(user.email);

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to save user email");
      }
    }
  } catch (err) {
    console.error("Error handling Google login:", err);
  }
};
