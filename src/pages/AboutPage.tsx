import data from "../data/contributors";
import Contributor from "../components/Contributor";

export default function AboutPage() {
  const contributors = data.map((info) => {
    return <Contributor {...info} />;
  });

  return (
    <div className="m-8 mx-auto max-w-screen-xl px-4">
      <section className="mb-8 gap-4 text-center">
        <h2 className="text-3xl font-bold">About Runefall</h2>
        <p className="text-left">
          Runefall is an advanced card search tool designed for the
          <a href="https://playruneterra.com/"> Legends of Runeterra </a>
          card game, inspired by
          <a href="https://scryfall.com/"> Scryfall. </a>
          It facilitates easy card searches and detailed card views, enhancing
          the deck-building experience for Legends of Runeterra players.
          Runefall was developed using a React and TypeScript frontend coupled
          with a Rails backend.
        </p>
      </section>

      <section className="mb-8 gap-4 text-center">
        <h2 className="text-3xl font-bold">About Us</h2>
        <p className="text-left">
          Runefall was developed collaboratively by a team 6, 3 back-end and 3
          front-end, while studying at Turing School of Software and Design as
          part of our capstone, graduation, project.
        </p>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold">Contributors</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8">
          {contributors}
        </div>
      </section>
    </div>
  );
}
