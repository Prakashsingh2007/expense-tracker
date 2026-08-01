import { useState } from "react";
import { updateCategory } from "../api/categories";

const CategoryCard = ({ category, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);

  const handleUpdate = async () => {
    if (!name.trim()) return;

    try {
      const updatedCategory = await updateCategory(category.id, {
        name,
        description,
      });

      onUpdate(updatedCategory);

      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await onDelete(category.id);
    }
  };

  return (
  <div className="app-card p-5 transition duration-200 hover:-translate-y-1 hover:shadow-[0_22px_60px_-35px_rgba(15,23,42,0.45)]">
    {isEditing ? (
      <>
        <input
          className="app-input mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="app-input mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            onClick={handleUpdate}
            className="app-button-primary"
          >
            Save
          </button>

          <button
            onClick={() => setIsEditing(false)}
            className="app-button-secondary"
          >
            Cancel
          </button>
        </div>
      </>
    ) : (
      <>
        <h3 className="text-xl font-semibold text-slate-950">
          {category.name}
        </h3>

        <p className="mt-2 text-slate-500">
          {category.description}
        </p>

        <div className="flex gap-3 mt-5">
          <button
            onClick={() => setIsEditing(true)}
            className="app-button-secondary"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="app-button-danger"
          >
            Delete
          </button>
        </div>
      </>
    )}
  </div>
);
};

export default CategoryCard;
