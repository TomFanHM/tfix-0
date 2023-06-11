"use client";

//provider includes recoil, react-query

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { RecoilRoot } from "recoil";
import AuthModal from "@/components/auth/modal";
import { Providers } from "@/components/chakra/Providers";

const queryClient = new QueryClient();

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Providers>
          <AuthModal />
          {children}
        </Providers>
      </QueryClientProvider>
    </RecoilRoot>
  );
};
export default AppLayout;
