import { Card as CardType } from "@/types/interfaces";
import { getSetString } from "@/utils/sets";

export default function CardList({ cards }: { cards: CardType[] }) {
  const cardElements = cards.map((card, index) => {
    const {
      name,
      set,
      cost,
      attack,
      health,
      card_type,
      rarity,
      regions,
      artist_name,
      card_code,
    } = card.attributes;
    return (
      <tr data-test-id="card-list-item" key={index}>
        <td>{card_code}</td>
        <td>{name}</td>
        <td>{cost}</td>
        <td>{health}</td>
        <td>{attack}</td>
        <td>{card_type}</td>
        <td>{rarity.at(0)?.toUpperCase() + rarity.slice(1).toLowerCase()}</td>
        <td>{regions.join(", ")}</td>
        <td>{artist_name}</td>
        <td>{getSetString(set)}</td>
      </tr>
    );
  });

  return (
    <table className="w-full max-w-7xl [&_td]:px-2 [&_th]:p-2 [&_tr:not(:first-child):nth-child(even)]:bg-primary-foreground">
      <thead>
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
      </thead>
      <tbody>{cardElements}</tbody>
    </table>
  );
}
