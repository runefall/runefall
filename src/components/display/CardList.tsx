import { Card as CardType } from "@/types/interfaces";
import { getSetString } from "@/utils/sets";

export default function CardList({ cards }: { cards: CardType[] }) {
  const cardElements = cards.map((card) => {
    const {
      name,
      set,
      cost,
      attack,
      health,
      card_type,
      rarity,
      region_refs,
      artist_name,
      card_code,
    } = card.attributes;
    return (
      <tr>
        <td>{card_code}</td>
        <td>{name}</td>
        <td>{cost}</td>
        <td>{health}</td>
        <td>{attack}</td>
        <td>{card_type}</td>
        <td>{rarity.at(0)?.toUpperCase() + rarity.slice(1).toLowerCase()}</td>
        <td>{region_refs.join(", ")}</td>
        <td>{artist_name}</td>
        <td>{getSetString(set)}</td>
      </tr>
    );
  });

  return (
    <table className="[&_td]:px-4 [&_th]:px-4 [&_tr:not(:first-child):nth-child(even)]:bg-secondary">
      <tr>
        <th>Card Code</th>
        <th>Name</th>
        <th>Cost</th>
        <th>Health</th>
        <th>Attack</th>
        <th>Type</th>
        <th>Rarity</th>
        <th>Region</th>
        <th>Artist</th>
        <th>Set</th>
      </tr>
      {cardElements}
    </table>
  );
}
