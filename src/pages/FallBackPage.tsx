import ErrorComponent from "@/components/ErrorComponent";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FallBackPage({ error }: { error: Error | null }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!error) navigate("/");
  }, [error, navigate]);

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <ErrorComponent error={error} />
      <Footer />
    </div>
  );
}
