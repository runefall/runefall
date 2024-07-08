import { useParams } from "react-router-dom";

export default function CardPage() {
  const { code } = useParams();
  return <div>This is the card details page for card number {code}</div>;
}
