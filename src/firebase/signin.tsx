import { auth } from "./config/firebaseConfig";

import { signInWithEmailAndPassword } from "firebase/auth";

const SignInFunction = async (email: string, password: string) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {}
};

export default SignInFunction;
