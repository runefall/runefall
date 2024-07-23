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
        setFilterState({ type: "displayMode", value })
      }
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder="Search Attribute" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="image">Image Only</SelectItem>
        <SelectItem value="text">Text Only</SelectItem>
        <SelectItem value="list">List Mode</SelectItem>
        <SelectItem value="full">Full Display</SelectItem>
      </SelectContent>
    </Select>
  );
}
