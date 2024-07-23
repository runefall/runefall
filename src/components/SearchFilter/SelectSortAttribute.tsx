import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortAttribute } from "@/types/types";

export default function SelectSortAttribute({
  className = "w-[180px]",
  sortAttribute,
  setFilterState,
}: {
  className?: string;
  sortAttribute: SortAttribute;
  setFilterState: (action: { type: string; value: string }) => void;
}) {
  return (
    <Select
      value={sortAttribute}
      onValueChange={(value: SortAttribute) =>
        setFilterState({ type: "sortAttribute", value })
      }
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder="Search Attribute" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="card_code">Card Code</SelectItem>
        <SelectItem value="name">Name</SelectItem>
        <SelectItem value="cost">Cost</SelectItem>
        <SelectItem value="health">Health</SelectItem>
        <SelectItem value="attack">Attack</SelectItem>
        <SelectItem value="card_type">Type</SelectItem>
        <SelectItem value="rarity">Rarity</SelectItem>
        <SelectItem value="region">Region</SelectItem>
        <SelectItem value="artist_name">Artist Name</SelectItem>
        <SelectItem value="set">Set</SelectItem>
      </SelectContent>
    </Select>
  );
}
