import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

function AccountActionsSection({ onPasswordChangeClick }) {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/login');
    }
  };

  const handleDeleteAccount = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    try {
      setIsDeleting(true);
      // TODO: Implement delete account API if backend supports it
      // For now, just logout as a placeholder
      alert('Delete account feature will be implemented with backend support');
      setShowDeleteConfirm(false);
    } catch {
      alert('Failed to delete account');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Account Actions</h2>

      <div className="space-y-3">
        
        {/* Change Password Button */}
        <button
          onClick={onPasswordChangeClick}
          className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
           Change Password
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-3 px-4 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2"
        >
           Logout
        </button>

        {/* Delete Account Button */}
        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full py-3 px-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
          >
             Delete Account
          </button>
        ) : (
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
            <p className="text-red-800 font-semibold mb-3">
               This action cannot be undone. Are you absolutely sure?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 font-medium transition-colors"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50 font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Need help? Contact support for account assistance.
      </p>
    </div>
  );
}

export default AccountActionsSection;
