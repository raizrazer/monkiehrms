import { firebaseApp, auth } from "./config/firebaseConfig";
import { getAuth, signOut } from "firebase/auth";

const signout = () => {
  try {
    signOut(auth);
  } catch (e) {}
};

export default signout;
