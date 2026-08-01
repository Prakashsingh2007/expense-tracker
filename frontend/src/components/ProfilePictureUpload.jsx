import { useState } from 'react';

function ProfilePictureUpload({ currentImage, userName, onUpload, onRemove, isLoading }) {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

  const validateFile = (file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Only JPEG, PNG, and WebP images are allowed');
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError('Image size must be less than 5MB');
      return false;
    }
    return true;
  };

  const handleFileSelect = (file) => {
    setError(null);
    
    if (!validateFile(file)) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleUpload = async () => {
    if (!preview) return;

    try {
      const formData = new FormData();
      // Convert base64 to blob
      const response = await fetch(preview);
      const blob = await response.blob();
      formData.append('profile_picture', blob, 'profile_picture.jpg');
      
      await onUpload(formData);
      setPreview(null);
    } catch {
      setError('Failed to upload image');
    }
  };

  const handleRemove = async () => {
    if (window.confirm('Remove profile picture?')) {
      try {
        await onRemove();
        setPreview(null);
      } catch {
        setError('Failed to remove image');
      }
    }
  };

  const getInitials = () => {
    return userName[0].toUpperCase();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Profile Picture</h2>

      <div className="flex flex-col sm:flex-row gap-6">
        
        {/* Preview Section */}
        <div className="flex flex-col items-center">
          <div className="mb-4">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
              />
            ) : currentImage ? (
              <img
                src={currentImage}
                alt={userName}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-4xl font-bold text-blue-600 border-4 border-gray-300">
                {getInitials()}
              </div>
            )}
          </div>
          {currentImage && !preview && (
            <button
              onClick={handleRemove}
              disabled={isLoading}
              className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50"
            >
              Remove Current
            </button>
          )}
        </div>

        {/* Upload Section */}
        <div className="flex-1">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
          >
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleChange}
              disabled={isLoading}
              className="hidden"
              id="profile-picture-input"
            />
            <label htmlFor="profile-picture-input" className="cursor-pointer">
              <div className="text-gray-500">
                <p className="text-lg font-medium mb-2">Drag and drop your image</p>
                <p className="text-sm text-gray-400 mb-4">or click to browse</p>
                <p className="text-xs text-gray-400">JPEG, PNG, WebP up to 5MB</p>
              </div>
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-600 text-sm mt-3">{error}</p>
          )}

          {/* Upload Button */}
          {preview && (
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleUpload}
                disabled={isLoading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium transition-colors"
              >
                {isLoading ? 'Uploading...' : 'Upload Image'}
              </button>
              <button
                onClick={() => setPreview(null)}
                disabled={isLoading}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 disabled:opacity-50 font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePictureUpload;
