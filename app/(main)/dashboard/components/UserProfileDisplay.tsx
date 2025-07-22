"use client";
import { useUserProfileStore } from "@/hooks/useUserProfile";

export const UserProfileDisplay = () => {
  const userProfile = useUserProfileStore((state) => state.userProfile);
  if (!userProfile) return null;
  return (
    <div className="flex flex-col items-center">
      {userProfile.avatar_url && (
        <img
          src={userProfile.avatar_url}
          alt="Avatar"
          className="w-16 h-16 rounded-full mb-2 object-cover"
        />
      )}
      <div className="font-bold text-lg text-primary">
        {userProfile.display_name || "No name"}
      </div>
      <div className="text-base-content/70 text-sm">
        {userProfile.bio || "No bio"}
      </div>
    </div>
  );
};
