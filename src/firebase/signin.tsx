import { auth } from "./config/firebaseConfig";

import { signInWithEmailAndPassword } from "firebase/auth";

const signin = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {}
};

export default signin;
