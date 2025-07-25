"use client";

import { useEffect } from "react";
import { Header } from "./dashboard/components/HeaderDashboard";
import { useUserProfileStore } from "@/hooks/useUserProfile";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { fetchUserProfile } = useUserProfileStore();
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return (
    <>
      <Header />
      {children}
    </>
  );
}
