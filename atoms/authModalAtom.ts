import { atom } from "recoil";

export type AuthModalState = {
  open: boolean;
  view: ModalView;
};

export type ModalView = "login" | "signup" | "resetPassword" | "tos";

const defaultModalState: AuthModalState = {
  open: false,
  view: "login",
};

export const authModalState = atom<AuthModalState>({
  key: "authModalState",
  default: defaultModalState,
});
