import { useUserProfileStore } from "@/hooks/useUserProfile";
import { useState } from "react";

export function useDashboardHeader() {
  const { userProfile } = useUserProfileStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  return {
    user: {
      name: userProfile?.display_name || "User",
      avatar: userProfile?.avatar_url || "/assets/nopfp.png",
    },
    drawerOpen,
    setDrawerOpen,
  };
}
