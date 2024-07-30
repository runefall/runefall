import { useNavigate } from 'react-router-dom';

interface SyntaxProps {
  title: string;
  description: string;
  examples: string[];
  color: string;
}

const Syntax: React.FC<SyntaxProps> = ({ title, description, examples, color }) => {
  const navigate = useNavigate();

  const handleExampleClick = (example: string) => {
    navigate(`/search?query=${example}`);
  };

  console.log(color)
  return (
    <div className="p-8 flex flex-col sm:flex-row border-t border-black">
      <div className="sm:w-1/2 sm:p-4 sm:pr-20 text-center sm:text-left">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="mb-4">{description}</p>
      </div>
      <div className="sm:w-1/2 flex items-center">
        <div className="w-full">
          {examples.map((example, index) => (
            <div
              key={index}
              className={ 'p-3 pl-6 mb-2 shadow-xl relative cursor-pointer border-l-8 hover:scale-105 hover:cursor-pointer' }
              style={{ borderColor: color }}
              onClick={() => handleExampleClick(example)}
            >
              {example}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Syntax;