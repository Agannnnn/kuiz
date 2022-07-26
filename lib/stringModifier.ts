export const toSlug = (title: string) => {
  return title.toLowerCase().split(" ").join("-");
};
export const toTitleCase = (title: string) => {
  return title
    .split(" ")
    .map((kata) => {
      if (typeof kata[0] !== "undefined") {
        const karakter = kata.split("");
        karakter[0] = karakter[0].toUpperCase();
        kata = karakter.join("");
      }
      return kata;
    })
    .join(" ");
};
