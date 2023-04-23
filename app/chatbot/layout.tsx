import DashboardContainer from "@/components/container/DashboardContainer";
import React from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardContainer>
      <>
        <Sidebar />
        {children}
      </>
    </DashboardContainer>
  );
}
