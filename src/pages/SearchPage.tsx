import { Link } from "react-router-dom";

export default function SearchPage() {
  const cardElements = [1, 2, 3, 4, 5].map((cardNumber) => {
    return (
      <li>
        <Link
          className="hover:underline"
          key={cardNumber}
          to={`/card/${cardNumber}`}
        >{`Card #${cardNumber}`}</Link>
      </li>
    );
  });

  return (
    <div>
      <ul>{cardElements}</ul>
    </div>
  );
}
