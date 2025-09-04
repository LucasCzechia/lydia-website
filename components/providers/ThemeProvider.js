"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { getConfig } from "../../utils/configUtils";

export function ThemeProvider({
  children,
  ...props
}) {
  const defaultTheme = getConfig('theme.default', 'dark');

  return (
    <NextThemesProvider defaultTheme={defaultTheme} {...props}>
      {children}
    </NextThemesProvider>
  );
}