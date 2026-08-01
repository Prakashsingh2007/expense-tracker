function ProfileCard({ user }) {
  if (!user) return null;

  const initials =
    user.first_name && user.last_name
      ? `${user.first_name[0]}${user.last_name[0]}`
      : user.username[0].toUpperCase();

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
          {initials}
        </div>

        <h2 className="text-2xl font-bold mt-4">
          {user.first_name || user.last_name
            ? `${user.first_name} ${user.last_name}`
            : user.username}
        </h2>

        <p className="text-gray-500">@{user.username}</p>

        <div className="w-full mt-6 space-y-3">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Email</span>

            <span>{user.email}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">First Name</span>

            <span>{user.first_name || "-"}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Last Name</span>

            <span>{user.last_name || "-"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Joined</span>

            <span>{new Date(user.date_joined).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
