import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { TbFaceIdError } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export default function FallBackPage({ error }: { error: Error }) {
  const { resetBoundary } = useErrorBoundary();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/error");
  }, [navigate]);

  const handleReset = () => {
    resetBoundary();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <div
        className="flex flex-1 flex-col items-center justify-center px-4 py-8"
        role="alert"
      >
        <div className="shadow-shadow max-w-lg rounded-lg p-6 text-center shadow-[0_0_15px_5px]">
          <TbFaceIdError
            size={"7rem"}
            className="mx-auto mb-4 text-muted-foreground"
          />
          <div data-test-id="error-message">
            <h1 className="mb-2 text-xl font-semibold">
              Something Went Wrong:
            </h1>
            <p className="mb-4">{error.message}</p>
          </div>
          <Button onClick={handleReset} data-test-id="error-reset-button">
            Go Back
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
