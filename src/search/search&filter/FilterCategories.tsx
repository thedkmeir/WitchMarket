import { useEffect, useState } from "react";
import "./FilterCategories.scss";
import { AnimatePresence, motion } from "framer-motion";
import FilterCheckBox from "./FilterCheckBox";
import { categoryFilterService } from "../services/CategoryFilterService";
import { categoryService } from "../services/CategoryService";

export default function FilterCategories() {
  const [categories, setCategories] = useState<string[]>(
    categoryFilterService.getFilterCategories()
  );

  useEffect(() => {
    const unsubscribe = categoryFilterService.subscribe(
      "FilterContainer",
      () => {
        setCategories(categoryFilterService.getFilterCategories());
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="FilterCategories">
      <AnimatePresence>
        {categories.map((categoryName) => (
          <motion.div
            key={categoryName}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            <FilterCheckBox
              key={categoryName}
              categoryName={categoryName}
              defaultCheckedState={categoryService.isCategoryVisible(
                categoryName
              )}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
