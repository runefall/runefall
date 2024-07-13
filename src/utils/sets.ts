export function getSetString(setCode: string) {
  switch (setCode) {
    case "Set1":
      return "Foundations";
    case "Set2":
      return "Rising Tides";
    case "Set3":
      return "Call of the Mountain";
    case "Set4":
      return "Empires of the Ascended";
    case "Set5":
      return "Beyond the Bandlewood";
    case "Set6":
      return "Worldwalker";
    case "Set6cde":
      return "The Darkin Saga";
    case "Set7":
      return "Glory in Navori";
    case "Set7b":
      return "Heart of the Huntress";
    case "Set8":
      return "Fate's Voyage";
    default:
      return setCode;
  }
}
