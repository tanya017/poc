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
  username: string;
  header: headerType;
  activeTab: TabType; // Added activeTab
  accessToken: string | null;
  showForgotIdSuccess: boolean;
  isLocked: boolean;
  setUsername: (name: string) => void;
  setIsLocked: (state: boolean) => void;
  setHeader: (tab: headerType) => void;
  setActiveTab: (tab: TabType) => void; // Added setter
  setAccessToken: (token: string | null) => void;
  setShowForgotIdSuccess: (val: boolean) => void;
  logout: () => void;
};
type TabType =
  | "login"
  | "otp"
  | "forgotPass"
  | "forgotPassOtp"
  | "set-password"
  | "unblock-user";
type headerType = "login" | "forgotPass" | "forgotPassOtp" | "set-password";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      username: "",
      header: "login" as headerType,
      setHeader: (tab) => set({ header: tab }),
      isLocked: false,
      setIsLocked: (state) => set({ isLocked: state }),
      activeTab: "login", // Default state
      showForgotIdSuccess: false,
      accessToken: null, // Initial state, but middleware will overwrite this from storage
      setUsername: (name) => set({ username: name }),
      setShowForgotIdSuccess: (val) => set({ showForgotIdSuccess: val }), // Add this
      setAccessToken: (token) => set({ accessToken: token }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      logout: () =>
        set({
          accessToken: null,
          activeTab: "login",
          showForgotIdSuccess: false,
          isLocked: false,
        }),
    }),
    {
      name: "auth_token", // The localStorage key
      // If your API returns the token inside a nested object,
      // you can use 'partialize' to choose what to save.
      partialize: (state) => ({
        accessToken: state.accessToken,
        activeTab: state.activeTab,
        username: state.username,
      }),
    },
  ),
);
