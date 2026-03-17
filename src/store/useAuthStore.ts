// import { create } from "zustand";

// type AuthState = {
//   accessToken: string | null;
//   setAccessToken: (token: string | null) => void;
//   logout: () => void;
// };

// export const useAuthStore = create<AuthState>((set) => ({
//   accessToken: localStorage.getItem("auth_token"),
//   setAccessToken: (token) => {
//     if (token) localStorage.setItem("auth_token", token);
//     else localStorage.removeItem("auth_token");
//     set({ accessToken: token });
//   },
//   logout: () => {
//     localStorage.removeItem("auth_token");
//     set({ accessToken: null });
//   },
// }));


import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null, // Initial state, but middleware will overwrite this from storage
      setAccessToken: (token) => set({ accessToken: token }),
      logout: () => set({ accessToken: null }),
    }),
    {
      name: "auth_token", // The localStorage key
      // If your API returns the token inside a nested object, 
      // you can use 'partialize' to choose what to save.
    }
  )
);