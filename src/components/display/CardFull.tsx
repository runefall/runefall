import FormatLegality from "@/components/FormatLegality";
import { formats } from "@/data/formats";
import { CardAttributes } from "@/types/interfaces";
import { getSetString } from "@/utils/sets";

export default function CardFull({ card }: { card: CardAttributes }) {
  return (
    <div className="flex justify-center w-full px-4">
      <div className="relative flex flex-col md:flex-row w-full max-w-full items-center md:items-start md:pl-8" data-test-id="card-full">
        <div className="flex-shrink-0 md:mr-[-1rem]">
          <img
            src={card.assets[0].game_absolute_path}
            alt={card.name}
            className="h-auto w-full max-w-xs drop-shadow-2xl"
            style={{ maxHeight: "400px", maxWidth: "100%" }}
          />
        </div>
        <div className="flex flex-col w-full md:max-w-full rounded-2xl border border-border bg-card py-2 shadow-md [&>*:not(:first-child)]:border-t [&>*]:p-2 [&>*]:px-6">
          <p className="flex items-center gap-2">
            <span
              className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white"
              data-test-id="card-cost"
            >
              {card.cost}
            </span>
            {card.name}
          </p>
          <p>{`${card.card_type}${card.spell_speed && ` - ${card.spell_speed}`} / ${card.rarity[0] + card.rarity.slice(1).toLowerCase()} / ${getSetString(card.set)}`}</p>
          {card.keywords.length !== 0 && <p>Keywords: {card.keywords.join(", ")}</p>}
          <div className="[&>*:not(:first-child)]:mt-4">
            {card.description_raw && <p>{card.description_raw}</p>}
            {card.levelup_description_raw && <p>Level Up: {card.levelup_description_raw}</p>}
            <p className="italic">{card.flavor_text}</p>
          </div>
          {card.card_type === "Unit" && (
            <p data-test-id="card-stats">{card.attack} | {card.health}</p>
          )}
          <p>Illustration by {card.artist_name}</p>
          <p>Card Code: {card.card_code}</p>
          <div>
            <p className="mb-2">Modes</p>
            <div className="flex flex-col gap-2">
              {formats.map((format) => (
                <FormatLegality
                  key={format}
                  valid={card.formats.includes(format)}
                  format={format}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
