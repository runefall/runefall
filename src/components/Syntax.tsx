import { useNavigate } from "react-router-dom";

interface SyntaxProps {
  title: string;
  description: string;
  examples: string[];
  color: string;
}

const Syntax: React.FC<SyntaxProps> = ({
  title,
  description,
  examples,
  color,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col border-t border-border p-8 sm:flex-row">
      <div className="text-center sm:w-1/2 sm:p-4 sm:pr-20 sm:text-left">
        <h2 className="mb-2 text-2xl font-bold">{title}</h2>
        <p className="mb-4">{description}</p>
      </div>
      <div className="flex items-center sm:w-1/2">
        <div className="w-full">
          {examples.map((example, index) => (
            <div
              key={index}
              className={
                "relative mb-2 cursor-pointer border border-l-8 p-3 pl-4 font-mono text-sm shadow-[0_0_10px] shadow-shadow hover:scale-105 hover:cursor-pointer"
              }
              style={{ borderColor: color }}
              data-test-id="syntax-example"
              onClick={() => navigate(`/search?query=${example}`)}
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
