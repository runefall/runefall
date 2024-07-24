import Syntax from '@/components/Syntax';
import syntaxData from '@/data/syntaxData.json';

export default function SyntaxPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Runefall Search Syntax </h1>
      <p className="mb-8">
        Runefall includes a large set of keywords and expressions you can use to filter Legends of Runeterra cards.
      </p>
      {syntaxData.map((syntaxEntry, index) => (
        <Syntax
          key={index}
          title={syntaxEntry.title}
          description={syntaxEntry.description}
          examples={syntaxEntry.examples}
        />
      ))}
    </div>
  );
}