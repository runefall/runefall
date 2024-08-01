import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortDirection } from "@/types/types";

export default function SelectSortDirection({
  className = "w-[180px]",
  sortDirection,
  setFilterState,
  disabled = false,
}: {
  className?: string;
  sortDirection: SortDirection;
  setFilterState: (action: { type: string; value: string }) => void;
  disabled?: boolean;
}) {
  return (
    <Select
      value={sortDirection}
      disabled={disabled}
      onValueChange={(value: SortDirection) =>
        setFilterState({ type: "sortDirection", value })
      }
    >
      <SelectTrigger data-test-id="select-direction" className={className}>
        <SelectValue placeholder="Sort Direction" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem data-test-id="select-direction-auto" value="auto">
          Auto
        </SelectItem>
        <SelectItem data-test-id="select-direction-ascending" value="ascending">
          Ascending
        </SelectItem>
        <SelectItem
          data-test-id="select-direction-descending"
          value="descending"
        >
          Descending
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
