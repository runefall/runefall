import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortMode } from "@/types/types";

export default function SelectSortMode({
  className = "w-[180px]",
  sortMode,
  setFilterState,
  disabled = false,
}: {
  className?: string;
  sortMode: SortMode;
  setFilterState: (action: { type: string; value: string }) => void;
  disabled?: boolean;
}) {
  return (
    <Select
      value={sortMode}
      disabled={disabled}
      onValueChange={(value: SortMode) =>
        setFilterState({ type: "sortMode", value })
      }
    >
      <SelectTrigger className={className} data-test-id="select-mode">
        <SelectValue placeholder="Search Attribute" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem data-test-id="select-mode-image" value="image">
          Image Only
        </SelectItem>
        <SelectItem data-test-id="select-mode-text" value="text">
          Text Only
        </SelectItem>
        <SelectItem data-test-id="select-mode-list" value="list">
          List Mode
        </SelectItem>
        <SelectItem data-test-id="select-mode-full" value="full">
          Full Display
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
