import { useEffect, useState } from "react";
import { sortService } from "../services/SortService";
import "./SortButton.scss";
import { ArrowUpDown } from "lucide-react";
import { sortTypes } from "../services/tools/Enums";

export default function SortButton() {
  const [sortType, setSortType] = useState(0);

  function handleClick() {
    const newState = (sortType + 1) % sortTypes.length;
    // setSortType(newState);
    sortService.setSortIndex(sortTypes[newState]);
  }

  useEffect(() => {
    const unsubscribe = sortService.subscribe("SortButton", () => {
      const index = sortTypes.indexOf(sortService.getSortIndex());
      if (index !== -1) setSortType(index);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="sortButton">
      <div className="customButtonWrapper">
        <button type="button" onClick={handleClick} className={`customButton`}>
          <ArrowUpDown
            size={20}
            strokeWidth={1.5}
            className="sortIcon"
            style={{ marginRight: "5px" }}
          />
          <div className="inner"> Sort By: {sortTypes[sortType]}</div>
        </button>
      </div>
    </div>
  );
}
