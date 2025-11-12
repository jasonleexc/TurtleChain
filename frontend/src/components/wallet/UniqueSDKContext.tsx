"use client";

// to initialise Unique SDK and provide it via React context

import React, { createContext, useContext } from "react";
import { AssetHub, AssetHubInstance } from "@unique-nft/sdk";

type SdkContextType = {
  sdk: AssetHubInstance;
};

const UniqueSDKContext = createContext<SdkContextType | undefined>(undefined);

export function UniqueSDKProvider({ children }: { children: React.ReactNode }) {
  const sdk = AssetHub({
    baseUrl: process.env.NEXT_PUBLIC_REST_URL || "http://localhost:3000",
  });

  return React.createElement(
    UniqueSDKContext.Provider,
    { value: { sdk } },
    children
  );
}

export function useSdk() {
  const context = useContext(UniqueSDKContext);
  if (!context) throw new Error("useSdk must be used within UniqueSDKProvider");
  return context.sdk;
}
