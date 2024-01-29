"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "../lib/redux/store";
import { getUsernameFromCookies } from "../lib/cookies/auth";
import { authSlice } from "../lib/redux/slices/auth";

interface StoreProviderProps {
  children: React.ReactNode;
}

/**
 * @returns All children share `store` which allow to access every component inside the StoreProvider the data kept in redux state
 */
export default function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<AppStore>();

  useEffect(() => {
    "use client";
    /**
     * Set user session and set authentication in redux
     */
    const setSession = async () => {
      const username = await getUsernameFromCookies();

      if (username?.value && storeRef.current) {
        storeRef.current.dispatch(
          authSlice.actions.createSession({ username: username.value })
        );
      }
    };

    setSession();
  }, [storeRef]);

  if (!storeRef.current) {
    const store = makeStore();

    storeRef.current = store;
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
