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
}: {
  className?: string;
  sortDirection: SortDirection;
  setFilterState: (action: { type: string; value: string }) => void;
}) {
  return (
    <Select
      value={sortDirection}
      onValueChange={(value: SortDirection) =>
        setFilterState({ type: "sortDirection", value })
      }
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder="Display Mode" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="auto">Auto</SelectItem>
        <SelectItem value="ascending">Ascending</SelectItem>
        <SelectItem value="descending">Descending</SelectItem>
      </SelectContent>
    </Select>
  );
}
