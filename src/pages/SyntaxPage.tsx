import Syntax from "@/components/Syntax";
import syntaxData from "@/data/syntaxData.json";
import { useEffect } from "react";

export default function SyntaxPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Runefall Search Syntax
      </h1>
      <p className="mb-8 text-center">
        Runefall includes a large set of keywords and expressions you can use to
        filter Legends of Runeterra cards.
      </p>
      <div data-test-id="syntax-entry">
        {syntaxData.map((syntaxEntry, index) => {
          let color = "orange";
          switch (index % 4) {
            case 0:
              color = "red";
              break;
            case 1:
              color = "cyan";
              break;
            case 2:
              color = "purple";
              break;
            case 3:
              color = "orange";
              break;
          }

          return (
            <Syntax
              key={index}
              title={syntaxEntry.title}
              description={syntaxEntry.description}
              examples={syntaxEntry.examples}
              color={color}
            />
          );
        })}
      </div>
    </div>
  );
}
