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
      <SelectTrigger className={className} data-test-id="select-attribute">
        <SelectValue placeholder="Sort Attribute" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem data-test-id="select-attribute-card-code" value="card_code">
          Card Code
        </SelectItem>
        <SelectItem data-test-id="select-attribute-name" value="name">
          Name
        </SelectItem>
        <SelectItem data-test-id="select-attribute-cost" value="cost">
          Cost
        </SelectItem>
        <SelectItem data-test-id="select-attribute-health" value="health">
          Health
        </SelectItem>
        <SelectItem data-test-id="select-attribute-attack" value="attack">
          Attack
        </SelectItem>
        <SelectItem data-test-id="select-attribute-card-type" value="card_type">
          Type
        </SelectItem>
        <SelectItem data-test-id="select-attribute-rarity" value="rarity">
          Rarity
        </SelectItem>
        <SelectItem
          data-test-id="select-attribute-region-refs"
          value="region_refs"
        >
          Region
        </SelectItem>
        <SelectItem
          data-test-id="select-attribute-artist-name"
          value="artist_name"
        >
          Artist Name
        </SelectItem>
        <SelectItem data-test-id="select-attribute-set" value="set">
          Set
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
