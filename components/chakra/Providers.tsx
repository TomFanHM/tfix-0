"use client";

//chakra ui's theme provider, including color mode

import { theme } from "@/styles/chakra/theme";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeScript initialColorMode={theme.config?.initialColorMode} />
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}
