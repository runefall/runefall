import { useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { TbFaceIdError } from "react-icons/tb";

export default function FallBackPage({ error }: { error: Error | null }) {
  const { resetBoundary } = useErrorBoundary();
  const navigate = useNavigate();

  useEffect(() => {
    if (!error) {
      navigate("/");
    }
  }, [error, navigate]);

  const handleReset = () => {
    resetBoundary();
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div
        className="flex flex-1 flex-col items-center justify-center px-4 py-8"
        role="alert"
      >
        <div className="shadow-center-md rounded-lg p-6 text-center max-w-lg dark:shadow-dark-center-md">
          <TbFaceIdError size={"7rem"} className="text-muted-foreground mx-auto mb-4 dark:text-dark-muted-foreground" />
          <h1 className="text-xl font-semibold mb-2">Something Went Wrong:</h1>
          <p className="mb-4">{error ? error.message : "Unknown error"}</p>
          <button
            onClick={handleReset}
            className="bg-primary text-primary-foreground py-2 px-4 rounded hover:bg-primary-600 focus:outline-none dark:bg-dark-primary dark:text-dark-primary-foreground dark:hover:bg-dark-primary-600"
          >
            Go Back
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
