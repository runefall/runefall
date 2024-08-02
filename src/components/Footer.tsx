import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="flex justify-center bg-gray-700 text-white">
      <div className="max-w-screen-xl flex-1 p-8">
        <section className="mb-8 flex flex-col-reverse md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-8 md:flex-row md:gap-12">
            <section className="flex flex-col items-center md:items-start">
              <h3 className="text-xl font-bold uppercase">Cards</h3>
              <Link to="/syntax" className="hover:underline">
                Syntax Guide
              </Link>
              <Link to="/sets" className="hover:underline">
                All Sets
              </Link>
              <Link to="/random" className="hover:underline">
                Random
              </Link>
            </section>
            <section className="flex flex-col items-center md:items-start">
              <h3 className="text-xl font-bold uppercase">More</h3>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
              <Link
                to="https://github.com/runefall/runefall"
                className="hover:underline"
              >
                Frontend Repo
              </Link>
              <Link
                to="https://github.com/runefall/runefall-backend"
                className="hover:underline"
              >
                Backend Repo
              </Link>
            </section>
          </div>
          <section className="mb-4 md:mb-0">
            <h2 className="text-center text-3xl font-bold md:text-end">
              RUNEFALL
            </h2>
            <div className="text-center md:text-end">
              a powerful Legends of Runeterra search engine
            </div>
          </section>
        </section>
        <section className="flex flex-col gap-4 text-center text-gray-500">
          <div>
            Runefall isn't endorsed by Riot Games and doesn't reflect the views
            or opinions of Riot Games or anyone officially involved in producing
            or managing Riot Games properties. Riot Games, and all associated
            properties are trademarks or registered trademarks of Riot Games,
            Inc.
          </div>
          <div>All other content © 2024 Runefall</div>
        </section>
      </div>
    </footer>
  );
}
