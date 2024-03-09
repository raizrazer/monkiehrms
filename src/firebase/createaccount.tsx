import { auth } from "./config/firebaseConfig";

import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

const signin = async (email: string, password: string) => {
  try {
    const [createUserWithEmailAndPassword, user, loading, error] =
      useCreateUserWithEmailAndPassword(auth);
  } catch (e) {}
};

export default signin;
