interface Syntax {
  title: string;
  description: string;
  examples: string[];
}

export const syntaxes: Syntax[] = [
  {
    title: "Searching by name",
    description: "You can search for cards by name with \“name:\” or by simply entering the words you want to find. By default, each word will be treated as a separate search token. Enclosing the string in quotes will cause it to be treated as a single token.",
    examples: ["Draven", "name:Shot", "\"Pale Cascade\""],
  },
  {
    title: "Searching by description",
    description: "Use \“description:\”, \“desc:\”, or \“d:\” to search for cards whose description (rules text) includes the given term.",
    examples: ["description:draw", "desc:\"I\'m Summoned\"", "\"d:challenger\""],
  },
];
