import { useEffect, useState } from "react";
import { categoryFilterService } from "../services/CategoryFilterService";
import { AnimatePresence, motion } from "framer-motion";
import { dataService } from "../services/DataService";
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
  const [ratio, setRatio] = useState<string>(getStringRatio());

  function getStringRatio(): string {
    return (
      dataService.getStoreCatalogFilteredCount() +
      " / " +
      dataService.getStoreCatalogTotalCount()
    );
  }

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

  useEffect(() => {
    const unsubscribe = dataService.subscribe("PriceRangeSlider", () => {
      setRatio(getStringRatio());
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="filterContainer">
        <div className="FilterRow" style={{ justifyContent: "space-between" }}>
          <InStockCheckBox
            string={"Show Only in-stock"}
            defaultCheckedState={false}
            id={"FilterContainer Show Only in-stock"}
          />
          <FilterButton
            ButtonText={"Clear All Filters"}
            defaultCheckedState={false}
            onChange={() => {
              categoryService.clear();
              searchService.clear();
              inStockService.clear();
              rangeService.clear();
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

        <div
          className="FilterRow"
          style={{ marginTop: "10px", justifyContent: "space-between" }}
        >
          <SortButton />
          <div>{ratio}</div>
        </div>
      </div>
    </>
  );
}
