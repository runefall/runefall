import { Button } from "@/components/ui/button";
import { DisplayMode, SortAttribute, SortDirection } from "@/types/types";
import { useState } from "react";
import SelectDisplayMode from "./SelectDisplayMode";
import SelectSortAttribute from "./SelectSortAttribute";
import SelectSortDirection from "./SelectSortDirection";

export default function SearchFilter({
  filterState,
  setFilterState,
}: {
  filterState: {
    displayMode: DisplayMode;
    sortAttribute: SortAttribute;
    sortDirection: SortDirection;
  };
  setFilterState: (action: { type: string; value: string }) => void;
}) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="border-b border-border bg-secondary [&>*]:p-2">
      {/* desktop view */}
      <div className="hidden max-w-7xl items-center justify-center gap-4 md:flex">
        <SelectDisplayMode
          displayMode={filterState.displayMode}
          setFilterState={setFilterState}
        />
        {"filtered by"}
        <SelectSortAttribute
          sortAttribute={filterState.sortAttribute}
          setFilterState={setFilterState}
        />
        {":"}
        <SelectSortDirection
          sortDirection={filterState.sortDirection}
          setFilterState={setFilterState}
        />
      </div>
      {/* mobile view */}
      <div className="flex flex-col items-center gap-4 md:hidden">
        <Button
          className="w-[180px]"
          variant="outline"
          onClick={() => setShowFilters((prevFilter) => !prevFilter)}
        >
          {!showFilters ? "Show" : "Hide"} Filters
        </Button>
        {showFilters && (
          <div className="flex w-full flex-col items-center justify-center gap-4 [&>*]:grid [&>*]:w-full [&>*]:grid-cols-[1fr_4fr] [&>*]:items-center [&>*]:gap-4 [&>*]:text-end">
            <div>
              <div>Display As</div>
              <SelectDisplayMode
                className="flex-1"
                displayMode={filterState.displayMode}
                setFilterState={setFilterState}
              />
            </div>
            <div>
              <div>Filtered By</div>
              <SelectSortAttribute
                className="flex-1"
                sortAttribute={filterState.sortAttribute}
                setFilterState={setFilterState}
              />
            </div>
            <div>
              <div>Sort Direction</div>
              <SelectSortDirection
                className="flex-1"
                sortDirection={filterState.sortDirection}
                setFilterState={setFilterState}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
