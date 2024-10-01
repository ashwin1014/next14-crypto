'use client'

import useTheme from "@/hooks/useTheme";

import { ServiceProvider } from "./service-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  useTheme();

  return (
      <ServiceProvider>{children}</ServiceProvider>
  );
};

export default Providers;
