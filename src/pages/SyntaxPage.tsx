import { useEffect } from 'react';
import Syntax from '@/components/Syntax';
import syntaxData from '@/data/syntaxData.json';

export default function SyntaxPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container max-w-full mx-auto p-8 bg-white text-gray-900" >
      <h1 className="text-3xl font-bold mb-8 text-center">Runefall Search Syntax </h1>
      <p className="mb-8 text-center">
        Runefall includes a large set of keywords and expressions you can use to filter Legends of Runeterra cards.
      </p>
      <div data-test-id="syntax-entry">
        {syntaxData.map((syntaxEntry, index) => {
          return (
            <Syntax
              key={index}
              title={syntaxEntry.title}
              description={syntaxEntry.description}
              examples={syntaxEntry.examples}
              color={syntaxEntry.color}
            />
          );
        })}
      </div>
    </div>
  );
}