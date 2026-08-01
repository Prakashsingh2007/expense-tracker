import { useEffect, useState, useRef } from "react";
import { getProfile, updateProfile, changePassword } from "../api/profile";
import ProfileHeader from "../components/ProfileHeader";
import ProfilePictureUpload from "../components/ProfilePictureUpload";
import ProfileForm from "../components/ProfileForm";
import PasswordForm from "../components/PasswordForm";
import AccountStatsSection from "../components/AccountStatsSection";
import AccountActionsSection from "../components/AccountActionsSection";
import PageHeader from "../components/ui/PageHeader";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const passwordFormRef = useRef(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getProfile();
      setUser(data);
    } catch {
      alert("Unable to load profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async (formData) => {
    const updatedUser = await updateProfile(formData);
    setUser(updatedUser);
    setEditMode(false);
  };

  const handleChangePassword = async (passwordData) => {
    await changePassword(passwordData);
    setShowPasswordForm(false);
  };

  const handleProfilePictureUpload = async (formData) => {
    try {
      setUploadingImage(true);
      const updatedUser = await updateProfile(formData);
      setUser(updatedUser);
      alert("Profile picture updated!");
    } catch {
      alert("Failed to upload profile picture");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveProfilePicture = async () => {
    try {
      setUploadingImage(true);
      const updatedUser = await updateProfile({ profile_picture: null });
      setUser(updatedUser);
      alert("Profile picture removed!");
    } catch {
      alert("Failed to remove profile picture");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handlePasswordChangeClick = () => {
    setShowPasswordForm(true);
    // Scroll to password form
    setTimeout(() => {
      passwordFormRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  if (loading) {
    return (
      <div className="app-card flex min-h-[40vh] items-center justify-center p-6">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />
          <p className="text-xl font-semibold text-slate-700">Loading Profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="app-card p-6 text-center">
        <p className="font-semibold text-rose-700">Failed to load profile</p>
          <button
            onClick={fetchProfile}
            className="app-button-danger mt-4"
          >
            Try Again
          </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile"
        description="Manage your account settings, password, and profile image."
      />

      {/* Profile Header Section */}
      <ProfileHeader user={user} onEditClick={handleEditClick} />

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Column - Picture Upload & Stats */}
        <div className="space-y-6">
          
          {/* Profile Picture Upload */}
          <ProfilePictureUpload
            currentImage={user.profile_picture}
            userName={user.first_name || user.username}
            onUpload={handleProfilePictureUpload}
            onRemove={handleRemoveProfilePicture}
            isLoading={uploadingImage}
          />

          {/* Account Statistics */}
          <AccountStatsSection />

        </div>

        {/* Right Column - Forms & Actions */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Edit Mode Toggle Info */}
          {editMode && (
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm font-medium text-sky-800">
              You are now in edit mode. Save or cancel to continue.
            </div>
          )}

          {/* Profile Form */}
          {editMode ? (
            <div className="space-y-4">
              <ProfileForm user={user} onUpdate={handleUpdate} />
              <button
                onClick={() => setEditMode(false)}
                className="app-button-secondary w-full"
              >
                Cancel Editing
              </button>
            </div>
          ) : (
            <div className="app-card p-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-950">Profile Information</h2>
              <div className="space-y-3">
                <div className="flex flex-col gap-1 border-b border-slate-100 pb-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-medium text-gray-600">First Name</span>
                  <span className="text-gray-900">{user.first_name || "-"}</span>
                </div>
                <div className="flex flex-col gap-1 border-b border-slate-100 pb-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-medium text-gray-600">Last Name</span>
                  <span className="text-gray-900">{user.last_name || "-"}</span>
                </div>
                <div className="flex flex-col gap-1 border-b border-slate-100 pb-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-medium text-gray-600">Username</span>
                  <span className="text-gray-900">{user.username}</span>
                </div>
                <div className="flex flex-col gap-1 border-b border-slate-100 pb-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-medium text-gray-600">Email</span>
                  <span className="text-gray-900">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="font-medium text-gray-600">Phone</span>
                    <span className="text-gray-900">{user.phone}</span>
                  </div>
                )}
                {user.country && (
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="font-medium text-gray-600">Country</span>
                    <span className="text-gray-900">{user.country}</span>
                  </div>
                )}
                {user.bio && (
                  <div className="flex flex-col pt-2">
                    <span className="font-medium text-gray-600 mb-2">Bio</span>
                    <span className="rounded-2xl bg-slate-50 p-4 text-slate-900 line-clamp-3">
                      {user.bio}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Password Form */}
          <div ref={passwordFormRef}>
            {showPasswordForm ? (
              <div className="space-y-4">
                <PasswordForm onChangePassword={handleChangePassword} />
                <button
                  onClick={() => setShowPasswordForm(false)}
                  className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4 rounded-2xl border border-sky-200 bg-sky-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-sky-900">Security</p>
                  <p className="text-sm text-sky-700">Keep your account safe with a strong password.</p>
                </div>
                <button
                  onClick={handlePasswordChangeClick}
                  className="app-button-primary whitespace-nowrap"
                >
                  Change Password
                </button>
              </div>
            )}
          </div>

          {/* Account Actions */}
          <AccountActionsSection onPasswordChangeClick={handlePasswordChangeClick} />

        </div>

      </div>

    </div>
  );
}

export default Profile;
