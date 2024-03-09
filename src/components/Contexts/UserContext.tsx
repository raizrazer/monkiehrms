import { Dispatch, SetStateAction, createContext } from "react";
type userContext = {
  isHr?: boolean;
  isManager?: boolean;
  setIsHr?: Dispatch<SetStateAction<boolean>>;
  setIsManager?: Dispatch<SetStateAction<boolean>>;
};
export const UserContext = createContext<userContext>({});
