import { messageItem } from "@/types/types";

export const messages: messageItem[] = [
  {
    role: "system",
    content: "You are ChatGPT",
  },
  { role: "user", content: "What is Lorem Ipsum?" },
  {
    role: "assistant",
    content:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
  },
];
