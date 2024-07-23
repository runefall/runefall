import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortAttribute } from "@/types/types";

export default function SelectSortAttribute({
  sortAttribute,
  setSortAttribute,
}: {
  sortAttribute: SortAttribute;
  setSortAttribute: React.Dispatch<SortAttribute>;
}) {
  return (
    <Select
      value={sortAttribute}
      onValueChange={(value: SortAttribute) => setSortAttribute(value)}
    >
      <SelectTrigger className="w-[180px]">
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
