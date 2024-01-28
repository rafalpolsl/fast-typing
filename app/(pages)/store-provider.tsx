"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "../lib/redux/store";
import { getUsernameFromCookies } from "../lib/cookies/auth";
import { authSlice } from "../lib/redux/slices/auth";

interface StoreProviderProps {
  children: React.ReactNode;
}

export default function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<AppStore>();

  useEffect(() => {
    "use client";
    const username = getUsernameFromCookies();

    if (username?.value && storeRef.current) {
      storeRef.current.dispatch(
        authSlice.actions.createSession({ login: username.value })
      );
    }
  }, [storeRef]);

  if (!storeRef.current) {
    const store = makeStore();

    storeRef.current = store;
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
