function ProfileHeader({ user, onEditClick }) {
  if (!user) return null;

  const getInitials = () => {
    if (user.first_name && user.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`;
    }
    return user.username[0].toUpperCase();
  };

  const getDisplayName = () => {
    if (user.first_name || user.last_name) {
      return `${user.first_name || ''} ${user.last_name || ''}`.trim();
    }
    return user.username;
  };

  const formatJoinDate = (dateString) => {
    const joinDate = new Date(dateString);
    const today = new Date();
    const diffTime = today - joinDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    }
    const years = Math.floor(diffDays / 365);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  };

  const joinedTime = formatJoinDate(user.date_joined);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 text-white">
      <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
        
        {/* Profile Picture or Avatar */}
        <div className="flex-shrink-0">
          {user.profile_picture ? (
            <img
              src={user.profile_picture}
              alt={getDisplayName()}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-5xl font-bold border-4 border-white shadow-lg">
              {getInitials()}
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-4xl font-bold mb-2">{getDisplayName()}</h1>
          <p className="text-blue-100 text-lg mb-1">@{user.username}</p>
          <p className="text-blue-100 mb-4">{user.email}</p>
          <p className="text-blue-100 text-sm">Joined {joinedTime}</p>
        </div>

        {/* Edit Button */}
        <button
          onClick={onEditClick}
          className="flex-shrink-0 bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors shadow-md"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default ProfileHeader;
