import { categoryFilterService } from "../services/CategoryFilterService";
import { inStockService } from "../services/InStockService";
import PriceRangeSlider from "./PriceRangeSlider";
import { searchService } from "../services/SearchService";
import { rangeService } from "../services/RangeService";
import { categoryService } from "../services/CategoryService";
import InStockCheckBox from "./InStockCheckBox";
import SortButton from "./SortButton";
import "./FilterContainer.scss";
import { sortService } from "../services/SortService";
import TextButton from "../inputs/TextButton";
import Ratio from "./Ratio";
import FilterCategories from "./FilterCategories";

export default function FilterContainer() {
  return (
    <>
      <div className="filterContainer">
        <div className="FilterRow" style={{ justifyContent: "space-between" }}>
          <InStockCheckBox
            string={"Reveal Only in-stock"}
            defaultCheckedState={false}
            id={"FilterContainer Show Only in-stock"}
          />
          <TextButton
            text={"Lift All Filters"}
            onClick={() => {
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
        <FilterCategories />
        <div
          className="FilterRow"
          style={{ marginTop: "10px", justifyContent: "space-between" }}
        >
          <SortButton />
          <Ratio></Ratio>
        </div>
      </div>
    </>
  );
}
