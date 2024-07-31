import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CgCardSpades } from "react-icons/cg";
import { FaCode } from "react-icons/fa6";
import { LiaRandomSolid } from "react-icons/lia";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import ModeToggle from "./ModeToggle";
import { useTheme } from "./ThemeProvider";

export default function NavButtons() {
  const navigate = useNavigate();
  const { isLight, setTheme } = useTheme();

  return (
    <>
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="border-white bg-transparent text-white"
            >
              <RxHamburgerMenu className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </SheetTrigger>
          <SheetContent side="top">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <div className="m-4 grid grid-cols-2 gap-2">
              <Button variant="ghost" onClick={() => navigate("/syntax")}>
                <FaCode className="h-[1.2rem] w-[1.2rem]" />
                Syntax
              </Button>
              <Button variant="ghost" onClick={() => navigate("/sets")}>
                <CgCardSpades className="h-[1.2rem] w-[1.2rem]" />
                Sets
              </Button>
              <Button variant="ghost" onClick={() => navigate("/random")}>
                <LiaRandomSolid className="h-[1.2rem] w-[1.2rem]" />
                Random
              </Button>
              <Button
                variant="ghost"
                onClick={() => setTheme(isLight ? "dark" : "light")}
              >
                Toggle Theme
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden lg:flex">
        <Separator orientation="vertical" className="bg-white" />
        <div className="flex gap-2 px-2">
          <Button
            variant="ghost"
            className="bg-transparent text-white"
            onClick={() => navigate("/syntax")}
          >
            <FaCode className="h-[1.2rem] w-[1.2rem]" />
            Syntax
          </Button>
          <Button
            variant="ghost"
            className="bg-transparent text-white"
            onClick={() => navigate("/sets")}
          >
            <CgCardSpades className="h-[1.2rem] w-[1.2rem]" />
            Sets
          </Button>
          <Button
            variant="ghost"
            className="bg-transparent text-white"
            onClick={() => navigate("/random")}
          >
            <LiaRandomSolid className="h-[1.2rem] w-[1.2rem]" />
            Random
          </Button>
          <ModeToggle />
        </div>
      </div>
    </>
  );
}
