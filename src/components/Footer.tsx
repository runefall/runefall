import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="flex justify-center bg-gray-700 text-white">
      <div className="max-w-screen-xl flex-1 p-8">
        <section className="mb-8 flex items-end justify-between">
          <section className="flex flex-col">
            <h3 className="text-xl font-bold">Links</h3>
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
          <section>
            <h2 className="text-end text-3xl font-bold">RUNEFALL</h2>
            <div>a powerful Legends of Runeterra card search</div>
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
