import { useEffect, useState } from "react";
import { sortTypes, sortService } from "../services/SortService";
import "./SortButton.scss";
import { ArrowUpDown } from "lucide-react";

export default function SortButton() {
  const [sortType, setSortType] = useState(0);

  function handleClick() {
    const newState = (sortType + 1) % sortTypes.length;
    // setSortType(newState);
    sortService.setSortIndex(sortTypes[newState]);
  }

  useEffect(() => {
    const unsubscribe = sortService.subscribe((sortType) => {
      const index = sortTypes.indexOf(sortType);
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
