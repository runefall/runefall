import data from "@/data/globals-en_us.json";
import { useNavigate } from "react-router-dom";

export default function SetPage() {
  const navigate = useNavigate();

  const cardElements = data.sets
    .sort((set1, set2) => set1.nameRef.localeCompare(set2.nameRef))
    .map((set, index) => {
      const { name, nameRef } = set;
      return (
        <tr
          data-test-id="card-list-item"
          key={index}
          className="cursor-pointer even:bg-primary-foreground hover:bg-primary hover:text-primary-foreground"
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
          <td className="hover:underline">{name}</td>
          <td className="text-center hover:underline">{nameRef}</td>
        </tr>
      );
    });

  return (
    <div className="flex justify-center">
      <table className="w-full max-w-7xl [&_td]:py-2 [&_th]:p-2">
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
