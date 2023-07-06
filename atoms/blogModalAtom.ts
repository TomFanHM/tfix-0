import { atom } from "recoil";

type View = "post" | "comment";

export type BlogModalState = {
  open: boolean;
  view: View;
  id: string | null;
};

const defaultModalState: BlogModalState = {
  open: false,
  view: "post",
  id: null,
};

export const blogModalState = atom<BlogModalState>({
  key: "blogModalState",
  default: defaultModalState,
});
