import FormatLegality from "@/components/FormatLegality";
import { formats } from "@/data/formats";
import { CardAttributes } from "@/types/interfaces";
import { getSetString } from "@/utils/sets";
import CardActions from "../CardActions";

export default function CardFull({ card }: { card: CardAttributes }) {
  return (
    <div className="flex w-full flex-col items-center justify-center p-4 px-4 md:flex-row md:items-start md:justify-center md:space-x-40">
      <div
        className="relative flex w-full max-w-full flex-col items-center md:flex-row md:items-start md:pl-8"
        data-test-id="card-full"
      >
        <div className="flex-shrink-0 md:mr-[-1rem]">
          <img
            src={card.assets[0].game_absolute_path}
            alt={card.name}
            className="h-auto max-h-[400px] w-full drop-shadow-2xl"
          />
        </div>
        <div className="flex w-full flex-col rounded-2xl border border-border bg-card py-2 shadow-md md:max-w-full [&>*:not(:first-child)]:border-t [&>*]:p-2 [&>*]:px-6">
          <p className="flex items-center gap-2">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white"
              data-test-id="card-cost"
            >
              {card.cost}
            </span>
            {card.name}
          </p>
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
      <CardActions card={card} />
    </div>
  );
}
