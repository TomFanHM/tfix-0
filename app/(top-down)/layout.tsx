import MainContainer from "@/components/container/MainContainer";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <MainContainer>{children}</MainContainer>;
};
export default Layout;
