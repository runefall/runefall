interface SyntaxProps {
  title: string;
  description: string;
  examples: string[];
}

const Syntax: React.FC<SyntaxProps> = ({ title, description, examples }) => {
  return (
    <div className="p-4 mb-8 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="mb-4">{description}</p>
      <div>
        {examples.map((example, index) => (
          <pre key={index} className="p-2 mb-2 bg-gray-100 rounded">
            {example}
          </pre>
        ))}
      </div>
    </div>
  );
};

export default Syntax;