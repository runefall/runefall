import Contributor from "../components/Contributor";
import data from "../data/contributors";

export default function AboutPage() {
  const contributors = data.map(
    (
      info: { img: string; github: string; name: string; linkedin: string },
      index,
    ) => <Contributor {...info} key={index} />,
  );

  return (
    <div className="m-8 mx-auto max-w-screen-md px-4">
      <section data-test-id="about-title" className="mb-8 gap-4">
        <h1 className="text-4xl font-bold">About Runefall</h1>
        <h2 className="text-xl font-bold">
          a powerful Legends of Runeterra card search engine
        </h2>
      </section>

      <section data-test-id="about-runefall" className="mb-8 gap-4">
        <p>
          Runefall is an advanced card search tool designed for the
          <a href="https://playruneterra.com/"> Legends of Runeterra </a>
          card game, inspired by
          <a href="https://scryfall.com/"> Scryfall.</a> We offer advanced
          search functionality, allowing users to find specific cards by name,
          type, cost, set, and various other attributes. The platform includes a
          complete and up-to-date database of Legends of Runeterra cards, with
          high-resolution images, card text, and detailed metadata, enhancing
          the deck-building experience for Legends of Runeterra players.
          Runefall was developed using a React and TypeScript frontend coupled
          with a Rails backend.
        </p>
      </section>

      <section data-test-id="about-why" className="mb-8 gap-4">
        <h2 className="text-xl font-bold">Why did we make Runefall?</h2>
        <p>
          Runefall was designed primarily designed as a project for graduation
          by students attending Turing School of Software and Design. It was
          created to demonstrate our knowledge and skills while also allowing us
          to explore new technologies. Functionally, it was designed to fill in
          the gap of missing features or out-of-date information from other,
          similar card search applications for Legends of Runeterra.
        </p>
      </section>

      <section data-test-id="about-tech" className="mb-8 gap-4">
        <h2 className="text-xl font-bold">The tech behind the magic</h2>
        <p>
          Runefall was built using TypeScript and React components. Our backend
          was built with Ruby, Ruby on Rails and PostgreSQL. We used Netlify and
          Heroku for hosting. Card images are hosted and provided by Riot Games.
        </p>
      </section>

      <section data-test-id="about-us" className="mb-8 gap-4">
        <h2 className="text-xl font-bold">The people who made Runefall</h2>
        <p>
          Runefall was developed collaboratively by a team 6, 3 back-end and 3
          front-end, while studying at Turing School of Software and Design as
          part of our capstone, graduation, project.
        </p>
      </section>

      <section data-test-id="contributors">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8">
          {contributors}
        </div>
      </section>
    </div>
  );
}
