import { cn } from "@/lib/utils";

// add unit testing for this function
export function parseString(string: string) {
  return (
    string
      // split string using regex
      .split(/((\w+:".*?"|\w+:\w+)?(\w+:".*?"|\w+:\w+)|\w+)/)
      // remove all blank words
      .filter((str) => str && str.trim().length !== 0)
      // get rid of all non-unique and format correctly
      .reduce((list: { [key: string]: string }, str) => {
        if (!str.includes(":")) return { ...list, name: cn(list.name, str) };

        const [name, key] = str.split(":");
        return list[name]
          ? list
          : { ...list, [name]: key.replace(/^"(.+(?="$))"$/, "$1") };
      }, {})
  );
}
