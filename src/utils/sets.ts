import data from "@/data/globals-en_us.json";

export function getSetString(setCode: string) {
  return data.sets.find((set) => set.nameRef === setCode)?.name || setCode;
}
