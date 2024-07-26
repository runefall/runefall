# Runefall

Runefall is an advanced card search tool designed for the Legends of Runeterra card game, inspired by Scryfall. It facilitates easy card searches and detailed card views, enhancing the deck-building experience for Legends of Runeterra players.

## Tech Stack

**Client:** Typescript, React, React Router, TailwindCSS, ShadCN

**Server:** Ruby, Ruby on Rails

## Screenshots

![image](https://github.com/user-attachments/assets/c797003c-501b-4ed7-b16b-c0cbe0a1f0ee)

## Features

- Light/dark mode toggle
- Card search functionality
- Different display modes and sorting of cards
- Detailed card views
- Responsive design
- Continuous Integration & Continuous Deployment
- End-to-end testing

## Demo

[Runefall Demo](https://runefall.netlify.app/)

## Run Locally

Clone the repository and navigate to the project directory

```bash
  git clone git@github.com:runefall/runefall.git
  cd runefall
  npm install
```

To run in development mode

```bash
  npm run dev
```

To run in preview mode

```bash
  npm run build
  npm run preview
```

**Note:** You must have this repository running in the background for this project to work locally in development mode: [Runefall Backend](https://github.com/runefall/runefall-backend).

## Running Tests

```bash
  npm run e2e
```

## Lessons Learned

During the development of Runefall, the primary challenge encountered was handling CORS issues. As this project integrated both frontend and backend components, it was the backend team's first exposure to CORS. This experience provided valuable insights into the security advantages of CORS and its necessity.

Using TailwindCSS proved to be highly beneficial. Its utility-first approach allowed for inline styling akin to Bootstrap while offering more granular control. This facilitated faster development without compromising control over the design.

Additionally, backend developers were given the opportunity to work on the frontend and learn React. This experience broadened their understanding of data flow from the server to the client side.

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/)

## Authors

- Billy Wallace - [@wallacebilly1](https://www.github.com/wallacebilly1)
- Charles Kwang - [@KojinKuro](https://www.github.com/KojinKuro)
- Jared Hobson - [@JaredMHobson](https://www.github.com/JaredMHobson)
- Neil Hendren - [@NeilTheSeal](https://www.github.com/NeilTheSeal)
- Theotis McCray - [@Virulencies](https://www.github.com/Virulencies)
