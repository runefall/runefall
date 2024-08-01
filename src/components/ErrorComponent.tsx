import { Button } from "@/components/ui/button";
import { useErrorBoundary } from "react-error-boundary";
import { TbFaceIdError } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export default function ErrorComponent({
  error,
  ...props
}: {
  error: Error | null;
}) {
  const { resetBoundary } = useErrorBoundary();
  const navigate = useNavigate();

  const handleReset = () => {
    resetBoundary();
    navigate("/");
  };

  return (
    <div
      className="m-4 flex flex-1 flex-col items-center justify-center px-4 py-8"
      role="alert"
      {...props}
    >
      <div className="w-full max-w-lg rounded-lg p-6 text-center shadow-[0_0_15px_5px] shadow-shadow">
        <TbFaceIdError
          size={"7rem"}
          className="mx-auto mb-4 text-muted-foreground"
        />
        <div data-test-id="error-message">
          <h1 className="mb-2 text-xl font-semibold">
            {error ? error.name : "Error"}:
          </h1>
          <p className="mb-4">{error ? error.message : "Unknown error"}</p>
        </div>
        <Button onClick={handleReset} data-test-id="error-reset-button">
          Go Back
        </Button>
      </div>
    </div>
  );
}
