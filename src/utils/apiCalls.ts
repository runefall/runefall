const HOST = import.meta.env.PROD
  ? "https://runefall-69209e0b8bce.herokuapp.com"
  : "http://localhost:3000";

export function queryCard(query: string) {
  return fetch(`${HOST}/api/v1/cards/search?query=${query}`).then((res) => {
    if (!res.ok) {
      throw Error(`"${query}" failed from the server`);
    } else {
      return res.json();
    }
  });
}
