import { useState, useEffect } from "react";
import {
  getCategories,
  deleteCategory,
} from "../api/categories";
import CategoryList from "../components/CategoryList";
import CategoryForm from "../components/CategoryForm";
import PageHeader from "../components/ui/PageHeader";
import { EmptyState, LoadingState } from "../components/ui/StateDisplay";
import { normalizeListResponse } from "../utils/formatters";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(normalizeListResponse(data));
    } catch {
      setError("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) return <LoadingState title="Loading categories" message="Fetching your category breakdown." />;
  if (error) return <div className="app-card p-6 text-center text-rose-700">{error}</div>;

  const handleCreateCategory = (newCategory) => {
    setCategories((prevCategories) => [newCategory, ...prevCategories]);
  };

  const handleDeleteCategory = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?",
    );
    if (!confirmDelete) return;

    try {
      await deleteCategory(id);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id),
      );
    } catch {
      setError("Failed to delete category.");
    }
  };

  const handleUpdateCategory = (updatedCategory) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Categories"
        description="Organize spending into meaningful groups and keep budgets aligned."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
        <CategoryForm onCreate={handleCreateCategory} />

        {categories.length ? (
          <CategoryList
            categories={categories}
            onUpdate={handleUpdateCategory}
            onDelete={handleDeleteCategory}
          />
        ) : (
          <EmptyState title="No categories yet" description="Create categories to start grouping your spending." />
        )}
      </div>
    </div>
  );
};

export default Categories;
