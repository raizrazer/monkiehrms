import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { Dispatch, SetStateAction, createContext } from "react";
type userContext = {
  isHr?: boolean;
  isManager?: boolean;
  nameFilled?: boolean;
  setIsHr?: Dispatch<SetStateAction<boolean>>;
  setIsManager?: Dispatch<SetStateAction<boolean>>;
  setNameFilled?: Dispatch<SetStateAction<boolean>>;
  value: DocumentSnapshot<DocumentData, DocumentData> | undefined;
};
export const UserContext = createContext<userContext>({});
