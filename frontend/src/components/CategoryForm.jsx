import { useState } from "react";
import { createCategory } from "../api/categories";

const CategoryForm = ({ onCreate }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      const category = await createCategory({
        name,
        description,
      });

      onCreate(category);

      setName("");
      setDescription("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="app-card p-6">
      <h2 className="text-xl font-semibold text-slate-950 mb-4">Add Category</h2>

      <div className="mb-4">
        <label className="block font-medium mb-2">Name</label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="app-input"
          placeholder="Category name"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-2">Description</label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="app-input"
          rows="3"
          placeholder="Description"
        />
      </div>

      <button
        type="submit"
        className="app-button-primary"
      >
        Create Category
      </button>
    </form>
  );
};

export default CategoryForm;
