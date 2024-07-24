import { CardAttributes } from "@/types/interfaces";
import { getSetString } from "@/utils/sets";

export default function CardText({ card }: { card: CardAttributes }) {
  return (
    <div
      className="relative flex w-full max-w-sm flex-col items-center rounded-2xl border border-border bg-card py-2 shadow-md [&>*:not(:first-child)]:border-t [&>*]:w-full [&>*]:p-2 [&>*]:px-6"
      data-test-id="card-text"
    >
      <p className="flex items-center gap-2">
        <span
          className="flex size-8 items-center justify-center rounded-full bg-blue-500 text-white"
          data-test-id="card-cost"
        >
          {card.cost}
        </span>{" "}
        {card.name}
      </p>
      {/* clean up this code later */}
      <p>{`${card.card_type}${card.spell_speed && ` - ${card.spell_speed}`} / ${card.rarity[0] + card.rarity.slice(1).toLowerCase()} / ${getSetString(card.set)}`}</p>
      {card.keywords.length !== 0 && (
        <p>Keywords: {card.keywords.join(", ")}</p>
      )}
      {(card.description_raw || card.levelup_description_raw) && (
        <div className="[&>*:not(:first-child)]:mt-4">
          {card.description_raw && <p>{card.description_raw}</p>}
          {card.levelup_description_raw && (
            <p>Level Up: {card.levelup_description_raw}</p>
          )}
        </div>
      )}
      {card.card_type === "Unit" && (
        <p data-test-id="card-stats">
          {card.attack} | {card.health}
        </p>
      )}
    </div>
  );
}
