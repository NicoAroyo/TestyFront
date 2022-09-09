export const shuffle = (array) => {
  let randomIndex,
    currentIndex = array.length;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    // prettier-ignore
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const formatDateTime = (date) => {
  if (!date) return "";
  const m = new Date(date);
  const dateString =
    days[m.getUTCDay()] +
    ", " +
    m.getUTCDate() +
    "/" +
    m.getUTCMonth() +
    "/" +
    m.getUTCFullYear();
  return dateString;
};
