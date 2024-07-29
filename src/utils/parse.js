export function parseString(string) {
  return (
    string
      // split string using regex
      .split(/((\w+:".*?"|\w+:\w+)?(\w+:".*?"|\w+:\w+)|\w+)/)
      // remove all blank words
      .filter((str) => str && str.trim().length !== 0)
      // get rid of all non-unique and format correctly
      .reduce((list, str) => {
        const [name, key] = str.split(":");
        return list[name]
          ? list
          : { ...list, [name]: key.replace(/^"(.+(?="$))"$/, "$1") };
      }, {})
  );
}

console.log(parseString(`draven:run hey:"asd asda s"`));
