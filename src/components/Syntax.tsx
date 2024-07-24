interface SyntaxProps {
  title: string;
  description: string;
  examples: string[];
}

const Syntax: React.FC<SyntaxProps> = ({ title, description, examples }) => {
  return (
    <div className="p-8 flex flex-col sm:flex-row border-t border-black">
      <div className="sm:w-1/2 sm:p-4 sm:pr-20 text-center sm:text-left">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="mb-4">{description}</p>
      </div>
      <div className="sm:w-1/2 flex items-center">
        <div className="w-full">
          {examples.map((example, index) => (
            <pre 
              key={index} 
              className="p-3 pl-6 mb-2 shadow-xl relative before:absolute before:left-0 before:top-0 before:h-full before:w-2 before:bg-blue-500"
            >
              {example}
            </pre>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Syntax;