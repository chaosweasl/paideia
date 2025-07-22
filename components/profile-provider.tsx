"use client";
import React, { useEffect } from "react";
import { useUserProfileStore } from "@/hooks/useUserProfile";

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const fetchUserProfile = useUserProfileStore(
    (state) => state.fetchUserProfile
  );
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);
  return <>{children}</>;
};
