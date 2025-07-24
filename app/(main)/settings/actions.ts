export interface HandleSaveParams {
  profilePicture: File | null;
  displayName: string;
  bio: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  showToast?: (
    message: string,
    type?: "success" | "error" | "info" | "warning"
  ) => void;
  setProfilePicture: React.Dispatch<React.SetStateAction<File | null>>;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface HandleFileSelectParams {
  file: File | null;
  setProfilePicture: React.Dispatch<React.SetStateAction<File | null>>;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

import { useUserProfileStore } from "@/hooks/useUserProfile";

export function useSettingsActions() {
  const {
    userProfile,
    isLoading: profileLoading,
    updateUserProfile,
    uploadAvatar,
  } = useUserProfileStore();

  const handleSave = async ({
    profilePicture,
    displayName,
    bio,
    setIsLoading,
    showToast,
    setProfilePicture,
    setPreviewUrl,
  }: HandleSaveParams) => {
    setIsLoading(true);
    if (showToast) showToast("", "info");
    if (displayName.length > 32) {
      if (showToast)
        showToast("Display name must be 32 characters or less.", "error");
      setIsLoading(false);
      return;
    }
    if (/\s/.test(displayName)) {
      if (showToast)
        showToast("Display name cannot contain whitespace.", "error");
      setIsLoading(false);
      return;
    }
    if (bio.length > 500) {
      if (showToast) showToast("Bio must be 500 characters or less.", "error");
      setIsLoading(false);
      return;
    }
    try {
      let avatarUrl = userProfile?.avatar_url || "";
      if (profilePicture) {
        avatarUrl = await uploadAvatar(profilePicture);
        await updateUserProfile({ avatar_url: avatarUrl });
      }
      await updateUserProfile({ display_name: displayName, bio });
      if (showToast) showToast("Profile updated successfully!", "success");
      setProfilePicture(null);
      setPreviewUrl(null);
    } catch {
      if (showToast) showToast("Error updating profile", "error");
    }
    setIsLoading(false);
  };

  const handleFileSelect = ({
    file,
    setProfilePicture,
    setPreviewUrl,
  }: HandleFileSelectParams) => {
    setProfilePicture(file);
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  return {
    userProfile,
    profileLoading,
    handleSave,
    handleFileSelect,
  };
}
