import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortDirection } from "@/types/types";

export default function SelectSortDirection({
  sortDirection,
  setSortDirection,
}: {
  sortDirection: SortDirection;
  setSortDirection: React.Dispatch<SortDirection>;
}) {
  return (
    <Select
      value={sortDirection}
      onValueChange={(value: SortDirection) => setSortDirection(value)}
    >
      <SelectTrigger className="w-[180px]">
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
