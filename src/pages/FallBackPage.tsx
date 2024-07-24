import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

export default function FallBackPage({ error }: { error: Error }) {
  const { resetBoundary } = useErrorBoundary();
  const navigate = useNavigate();

  const handleReset = () => {
    resetBoundary();
    navigate('/');
  };

  return (
    <div role="alert">
      <p>Something Went Wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={handleReset}>Try Again</button>
    </div>
  );
}