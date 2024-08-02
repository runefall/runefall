import { TbDeviceIpadQuestion } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export function NoCards() {
  const navigate = useNavigate();

  return (
    <div
      data-test-id="no-cards"
      className="flex min-h-[500px] flex-1 items-center justify-center"
    >
      <div className="m-4 flex max-w-lg flex-col items-center gap-4 rounded-lg p-6 text-center shadow-[0_0_15px_5px] shadow-shadow">
        <TbDeviceIpadQuestion size="150px" className="text-muted-foreground" />
        <h2 className="text-xl font-semibold">No cards found</h2>
        <p>
          Your search didn’t match any cards. Adjust your terms or try one of
          the links below:
        </p>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate("/")}>
            Go back
          </Button>
          <Button variant="outline" onClick={() => navigate("/syntax")}>
            Syntax Guide
          </Button>
        </div>
      </div>
    </div>
  );
}
