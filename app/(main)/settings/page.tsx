"use client";

import React from "react";
import { useUserProfileStore } from "@/hooks/useUserProfile";
import Image from "next/image";
import { ProfileSettingsForm } from "./components/ProfileSettingsForm";
import { useToast } from "@/components/toast-provider";
import { useSettingsActions } from "./actions";
import nopfp from "@/public/assets/nopfp.png";

const SettingsPage = () => {
  console.log("SettingsPage: render");
  const userProfileRaw = useUserProfileStore((state) => state.userProfile);
  const profileLoading = useUserProfileStore((state) => state.isLoading);
  const isLoading = Boolean(profileLoading);

  // Map userProfileRaw to expected shape for UI and ProfileSettingsForm
  const userProfile = userProfileRaw
    ? {
        display_name: userProfileRaw.display_name,
        avatar_url: userProfileRaw.avatar_url,
        bio: userProfileRaw.bio,
      }
    : undefined;

  const { showToast } = useToast();
  const { handleSave } = useSettingsActions();

  const onSave = async (data: {
    displayName: string;
    bio: string;
    profilePicture: File | null;
  }) => {
    console.log("SettingsPage: onSave called", data);
    try {
      await handleSave({
        profilePicture: data.profilePicture,
        displayName: data.displayName,
        bio: data.bio,
        setIsLoading: () => {}, // Optionally wire up loading state
        showToast,
        setProfilePicture: () => {}, // Optionally wire up avatar preview
        setPreviewUrl: () => {},
      });
    } catch {
      showToast("Error updating profile", "error");
    }
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-base-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body text-center">
              <span className="loading loading-dots loading-lg text-primary"></span>
              <div className="text-base-content mt-4">
                Loading your settings...
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-2">
            Profile Settings
          </h1>
          <p className="text-base-content/70">
            Customize your profile and preferences
          </p>
        </div>

        {/* No real-time validation error display. Toast will show on Save. */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Avatar Card */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <div className="avatar mx-auto">
                  <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    {userProfile?.avatar_url ? (
                      <Image
                        src={
                          userProfile.avatar_url
                            ? `${userProfile.avatar_url}?t=${Date.now()}`
                            : ""
                        }
                        alt="Current avatar"
                        width={128}
                        height={128}
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary text-primary-content font-bold text-3xl rounded-full">
                        <Image
                          src={nopfp}
                          alt="Default avatar"
                          width={128}
                          height={128}
                          className="object-cover rounded-full"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-base-content mt-4">
                  {userProfile?.display_name || "No name set"}
                </h3>
                <p className="text-base-content/70 text-sm mt-1">
                  {userProfile?.bio || "No bio yet"}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Settings Card */}
          <div className="lg:col-span-2">
            <ProfileSettingsForm
              userProfile={
                userProfile
                  ? {
                      displayName: userProfile.display_name || undefined,
                      bio: userProfile.bio || undefined,
                      avatarUrl: userProfile.avatar_url || undefined,
                    }
                  : undefined
              }
              isLoading={isLoading}
              onSave={onSave}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
