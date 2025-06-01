import { useEffect, useState } from "react";
import { sortService } from "../services/SortService";
import { ArrowUpDown } from "lucide-react";
import { sortTypes } from "../services/tools/Enums";
import TextButton from "../inputs/TextButton";

export default function SortButton() {
  const [sortType, setSortType] = useState(0);

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
    <TextButton
      text={"Arrange By: " + sortTypes[sortType]}
      icon={
        <ArrowUpDown
          size={20}
          strokeWidth={1.5}
          className="sortIcon"
          style={{ marginRight: "5px" }}
        />
      }
      onClick={() => {
        const newState = (sortType + 1) % sortTypes.length;
        sortService.setSortIndex(sortTypes[newState]);
      }}
    ></TextButton>
  );
}
