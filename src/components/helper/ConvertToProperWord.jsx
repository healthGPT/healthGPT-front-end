export const convertToProperWord = (value) => {
  const words = value.split(/(?=[A-Z])/).join(" ");
  const capitalizedWords = words.replace(/\b\w/g, (match) =>
    match.toUpperCase()
  );

  return capitalizedWords;
};
