import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DisplayMode } from "@/types/types";

export default function SelectDisplayMode({
  className = "w-[180px]",
  displayMode,
  setFilterState,
}: {
  className?: string;
  displayMode: DisplayMode;
  setFilterState: (action: { type: string; value: string }) => void;
}) {
  return (
    <Select
      value={displayMode}
      onValueChange={(value: DisplayMode) =>
        setFilterState({ type: "sortMode", value })
      }
    >
      <SelectTrigger className={className} data-test-id="select-display">
        <SelectValue placeholder="Search Attribute" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem data-test-id="select-display-image" value="image">
          Image Only
        </SelectItem>
        <SelectItem data-test-id="select-display-text" value="text">
          Text Only
        </SelectItem>
        <SelectItem data-test-id="select-display-list" value="list">
          List Mode
        </SelectItem>
        <SelectItem data-test-id="select-display-full" value="full">
          Full Display
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
