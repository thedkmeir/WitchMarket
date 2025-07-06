import ProductCategory from "./products/ProductCategory";
import { dataService } from "./services/DataService";
import { categoryService } from "./services/CategoryService";
import "./FilterableProductTable.scss";
import { useEffect, useState } from "react";
import Search from "./search&filter/Search";
import { motion, AnimatePresence } from "framer-motion";
import FilterContainer from "./search&filter/FilterContainer";

export default function FilterableProductTable() {
  const [categories, setCategories] = useState<string[]>(
    dataService.getFilledCategories()
  );

  function updateCategories() {
    let newCategories: string[] = [];
    dataService.getFilledCategories().forEach((categoryName) => {
      if (categoryService.isCategoryVisible(categoryName))
        newCategories.push(categoryName);
    });
    setCategories(newCategories);
  }

  useEffect(() => {
    const categoryServiceunsubscribe = categoryService.subscribe(
      "FilterableProductTable",
      updateCategories
    );
    const dataServiceunsubscribe = dataService.subscribe(
      "FilterableProductTable",
      updateCategories
    );
    return () => {
      categoryServiceunsubscribe();
      dataServiceunsubscribe();
    };
  }, []);

  return (
    <>
      <div className="filterableProductTable">
        <div className="container">
          <Search />
          <FilterContainer />
        </div>
        {categories && categories.length > 0 && (
          <div className="contMain">
            <AnimatePresence>
              {categories.map((categoryName) => (
                <motion.div
                  key={categoryName}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProductCategory
                    categoryName={categoryName}
                    productList={dataService.getMyProducts(categoryName)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </>
  );
}
