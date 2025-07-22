"use client";

import React, { useState } from "react";
import { useToast } from "@/components/toast-provider";
import { useUserProfileStore } from "@/hooks/useUserProfile";
import Image from "next/image";
import { ProfileSettingsForm } from "./components/ProfileSettingsForm";
import { useSettingsActions } from "./actions";

const SettingsPage = () => {
  console.log("SettingsPage: render");
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const profileLoading = useUserProfileStore((state) => state.isLoading);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [displayName, setDisplayName] = useState<string>(
    userProfile?.display_name || ""
  );
  const [bio, setBio] = useState<string>(userProfile?.bio || "");
  const [validationError, setValidationError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { handleSave, handleFileSelect } = useSettingsActions();

  // Update local state when profile loads
  React.useEffect(() => {
    console.log("SettingsPage: useEffect userProfile", userProfile);
    if (userProfile) {
      if (userProfile.display_name !== displayName) {
        setDisplayName(userProfile.display_name || "");
      }
      if (userProfile.bio !== bio) {
        setBio(userProfile.bio || "");
      }
    }
  }, [userProfile]);

  React.useEffect(() => {
    // Validation logic, but do not show until Save is clicked
    let error = "";
    if (displayName.length > 32) {
      error = "Display name must be 32 characters or less.";
    } else if (/\s/.test(displayName)) {
      error = "Display name cannot contain whitespace.";
    } else if (bio.length > 500) {
      error = "Bio must be 500 characters or less.";
    }
    setValidationError(error);
  }, [displayName, bio]);

  const onSave = () => {
    console.log("SettingsPage: onSave called", {
      displayName,
      bio,
      profilePicture,
    });
    if (validationError) {
      showToast(validationError, "error");
      return;
    }
    handleSave({
      profilePicture,
      displayName,
      bio,
      setIsLoading,
      setProfilePicture,
      setPreviewUrl,
      showToast,
    });
  };

  const onFileSelect = (file: File | null) =>
    handleFileSelect({ file, setProfilePicture, setPreviewUrl });

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
                        {userProfile?.display_name?.charAt(0)?.toUpperCase() ||
                          "U"}
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
              profilePicture={profilePicture}
              displayName={displayName}
              bio={bio}
              isLoading={isLoading}
              showPreview={showPreview}
              previewUrl={previewUrl}
              onFileSelect={onFileSelect}
              setShowPreview={setShowPreview}
              setDisplayName={setDisplayName}
              setBio={setBio}
              onSave={onSave}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
