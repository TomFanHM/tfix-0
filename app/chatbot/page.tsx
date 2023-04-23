import React from "react";
import Chatroom from "./Chatroom";
import { messages } from "./Dummy";

const Chatbot: React.FC = () => {
  return <Chatroom getMessages={messages} />;
};

export default Chatbot;
