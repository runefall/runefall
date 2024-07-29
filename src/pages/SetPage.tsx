import data from "@/data/globals-en_us.json";
import { useNavigate } from "react-router-dom";

export default function SetPage() {
  const navigate = useNavigate();

  const cardElements = data.sets.map((set, index) => {
    const { name, nameRef } = set;
    return (
      <tr
        data-test-id="card-list-item"
        className="cursor-pointer hover:underline"
        key={index}
        onClick={() => {
          const encodedText = encodeURI(`set:${nameRef}`);
          navigate(`/search?query=${encodedText}`);
        }}
      >
        <td className="flex justify-center">
          <img
            src={`/sets/${nameRef.toLowerCase()}.png`}
            alt={`${name} icon`}
            className="w-12"
          />
        </td>
        <td>{name}</td>
        <td className="text-center">{nameRef}</td>
      </tr>
    );
  });

  return (
    <div className="flex justify-center">
      <table className="w-full max-w-7xl [&_td]:px-2 [&_th]:p-2 [&_tr:not(:first-child):nth-child(even)]:bg-primary-foreground">
        <thead>
          <tr>
            <th>Icon</th>
            <th>Name</th>
            <th>Ref</th>
          </tr>
        </thead>
        <tbody>{cardElements}</tbody>
      </table>
    </div>
  );
}
