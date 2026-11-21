"use client";

import { useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import {
  PersistQueryClientProvider,
  type PersistedClient,
  type Persister,
} from "@tanstack/react-query-persist-client";
const CACHE_KEY = "slice-react-query-cache";
const CACHE_MAX_AGE = 1000 * 60 * 60 * 24; // 24 ساعت

const localStoragePersister: Persister = {
  persistClient(client: PersistedClient) {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(CACHE_KEY, JSON.stringify(client));
    } catch {
      // اگر localStorage پر یا در دسترس نبود، سایت همچنان کار می‌کند.
    }
  },

  restoreClient() {
    if (typeof window === "undefined") return undefined;

    try {
      const cached = window.localStorage.getItem(CACHE_KEY);
      return cached ? (JSON.parse(cached) as PersistedClient) : undefined;
    } catch {
      window.localStorage.removeItem(CACHE_KEY);
      return undefined;
    }
  },

  removeClient() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(CACHE_KEY);
    }
  },
};

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 1000 * 60 * 5,
            gcTime: CACHE_MAX_AGE,
          },
        },
      })
  );

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: localStoragePersister,
        maxAge: CACHE_MAX_AGE,
        buster: "slice-products-v1",
        dehydrateOptions: {
          shouldDehydrateQuery: (query) =>
            query.state.status === "success" &&
            query.queryKey[0] === "products",
        },
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}