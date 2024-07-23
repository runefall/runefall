import { DisplayMode, SortAttribute, SortDirection } from "@/types/types";
import SelectDisplayMode from "./SelectDisplayMode";
import SelectSortAttribute from "./SelectSortAttribute";
import SelectSortDirection from "./SelectSortDirection";

export default function SearchFilter({
  displayMode,
  setDisplayMode,
  sortAttribute,
  setSortAttribute,
  sortDirection,
  setSortDirection,
}: {
  displayMode: DisplayMode;
  setDisplayMode: React.Dispatch<DisplayMode>;
  sortAttribute: SortAttribute;
  setSortAttribute: React.Dispatch<SortAttribute>;
  sortDirection: SortDirection;
  setSortDirection: React.Dispatch<SortDirection>;
}) {
  return (
    <div className="border-b border-border bg-secondary p-2">
      <div className="flex max-w-7xl items-center justify-center gap-4">
        <SelectDisplayMode
          displayMode={displayMode}
          setDisplayMode={setDisplayMode}
        />
        {"filtered by"}
        <SelectSortAttribute
          sortAttribute={sortAttribute}
          setSortAttribute={setSortAttribute}
        />
        {":"}
        <SelectSortDirection
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
      </div>
    </div>
  );
}
