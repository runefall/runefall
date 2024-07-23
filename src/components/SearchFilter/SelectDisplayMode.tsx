import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DisplayMode } from "@/types/types";

export default function SelectDisplayMode({
  displayMode,
  setDisplayMode,
}: {
  displayMode: DisplayMode;
  setDisplayMode: React.Dispatch<DisplayMode>;
}) {
  return (
    <Select
      value={displayMode}
      onValueChange={(value: DisplayMode) => setDisplayMode(value)}
    >
      <SelectTrigger className="w-[180px]">
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
