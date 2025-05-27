import { useEffect, useState } from "react";
import { categoryFilterService } from "../services/CategoryFilterService";
import { AnimatePresence, motion } from "framer-motion";
import { inStockService } from "../services/InStockService";
import FilterCheckBox from "./checkboxes/FilterCheckBox";
import FilterButton from "./FilterButton";
import PriceRangeSlider from "./PriceRangeSlider";
import { searchService } from "../services/SearchService";
import { rangeService } from "../services/RangeService";
import { categoryService } from "../services/CategoryService";
import InStockCheckBox from "./checkboxes/InStockCheckBox";
import SortButton from "./SortButton";
import "./FilterContainer.scss";
import { sortService } from "../services/SortService";

export default function FilterContainer() {
  const [categories, setCategories] = useState<string[]>(
    categoryFilterService.getFilterCategories()
  );

  function updateCategories(newCategories: string[]) {
    setCategories(newCategories);
  }

  useEffect(() => {
    const unsubscribe = categoryFilterService.subscribe(
      "FilterContainer",
      updateCategories
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="filterContainer">
        <div className="FilterRow" style={{ justifyContent: "space-between" }}>
          <InStockCheckBox
            string={"Show Only in-stock"}
            defaultCheckedState={false}
          />
          <FilterButton
            ButtonText={"Clear All Filters"}
            defaultCheckedState={false}
            onChange={() => {
              searchService.clear();
              inStockService.clear();
              rangeService.clear();
              categoryService.clear();
              categoryFilterService.clear();
              sortService.clear();
            }}
          />
        </div>
        <div className="FilterRow">
          <div className="PriceRangeSliderWrapper">
            <PriceRangeSlider />
          </div>
        </div>
        <div className="FilterRow">
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

        <div className="FilterRow" style={{ marginTop: "10px" }}>
          <SortButton />
        </div>
      </div>
    </>
  );
}
