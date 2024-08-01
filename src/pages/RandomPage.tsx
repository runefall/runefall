import { Card } from "@/types/interfaces";
import { getRandomCard } from "@/utils/apiCalls";
import { useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

export default function RandomPage() {
  const { showBoundary } = useErrorBoundary();
  const navigate = useNavigate();

  useEffect(() => {
    getRandomCard()
      .then((data: { data: Card }) => {
        const { card_code } = data.data.attributes;
        navigate(`/card/${card_code}`);
      })
      .catch(showBoundary);
  });
}
