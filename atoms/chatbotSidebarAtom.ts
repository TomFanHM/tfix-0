import { atom } from "recoil";

export type ChatbotSidebarState = {
  open: boolean;
};

const defaultSidebarState: ChatbotSidebarState = {
  open: false,
};

export const authModalState = atom<ChatbotSidebarState>({
  key: "chatbotSidebarState",
  default: defaultSidebarState,
});
