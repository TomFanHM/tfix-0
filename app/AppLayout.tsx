"use client";

import { theme } from "@/styles/chakra/theme";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { RecoilRoot } from "recoil";
import AuthModal from "@/components/auth/modal";

const queryClient = new QueryClient();

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <CacheProvider>
          <ChakraProvider resetCSS theme={theme}>
            <ColorModeScript
              initialColorMode={theme.config?.initialColorMode}
            />
            <AuthModal />
            <AnimatePresence mode="wait">{children}</AnimatePresence>
          </ChakraProvider>
        </CacheProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};
export default AppLayout;
