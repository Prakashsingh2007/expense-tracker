import CategoryCard from "./CategoryCard";
import { EmptyState } from "./ui/StateDisplay";

const CategoryList = ({ categories, onDelete, onUpdate }) => {
  if (!categories.length) {
    return <EmptyState title="No categories found" description="Create a category to organize spending and budgets." />;
  }

  return (
    <div className="grid gap-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default CategoryList;