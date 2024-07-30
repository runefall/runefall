import FormatLegality from "@/components/FormatLegality";
import { formats } from "@/data/formats";
import { CardAttributes } from "@/types/interfaces";
import { getSetString } from "@/utils/sets";

export default function CardFull({ card }: { card: CardAttributes }) {
  return (
    <div
      className="relative flex w-full max-w-sm flex-col items-center md:left-[calc(10rem-10px)]"
      data-test-id="card-full"
    >
      <img
        src={card.assets[0].game_absolute_path}
        alt={card.name}
        className="h-auto w-full max-w-xs drop-shadow-2xl md:absolute md:left-[calc(-20rem+20px)] md:top-4"
      />
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card py-2 shadow-md [&>*:not(:first-child)]:border-t [&>*]:w-full [&>*]:p-2 [&>*]:px-6">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2">
            <span
              className="flex size-8 items-center justify-center rounded-full bg-blue-500 text-white"
              data-test-id="card-cost"
            >
              {card.cost}
            </span>{" "}
            {card.name}
          </p>
          <div
            className="flex items-center justify-center gap-1"
            data-test-id="region-icons"
          >
            {card.region_refs.map((region) => (
              <img
                key={region}
                src={`/regions/icon-${region.toLowerCase()}.png`}
                alt={`${region} region`}
                className="w-8"
              />
            ))}
          </div>
        </div>
        <p>{`${card.card_type}${card.spell_speed && ` - ${card.spell_speed}`} / ${card.rarity[0] + card.rarity.slice(1).toLowerCase()} / ${getSetString(card.set)}`}</p>
        {card.keywords.length !== 0 && (
          <p>Keywords: {card.keywords.join(", ")}</p>
        )}
        <div className="[&>*:not(:first-child)]:mt-4">
          {card.description_raw && <p>{card.description_raw}</p>}
          {card.levelup_description_raw && (
            <p>Level Up: {card.levelup_description_raw}</p>
          )}
          <p className="italic">{card.flavor_text}</p>
        </div>
        {card.card_type === "Unit" && (
          <p data-test-id="card-stats">
            {card.attack} | {card.health}
          </p>
        )}
        <p>Illustration by {card.artist_name}</p>
        <p>Card Code: {card.card_code}</p>
        <div>
          <p className="mb-2">Modes</p>
          <div className="flex flex-col gap-2">
            {formats.map((format) => (
              <FormatLegality
                key={format}
                valid={card.formats?.includes(format) || false}
                format={format}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
