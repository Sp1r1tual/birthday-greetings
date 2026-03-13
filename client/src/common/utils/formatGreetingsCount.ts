export const formatGreetingsCount = (count: number): string => {
  const lastTwo = count % 100;
  const lastOne = count % 10;

  if (lastTwo >= 11 && lastTwo <= 19) return `${count} побажань`;
  if (lastOne === 1) return `${count} побажання`;
  if (lastOne >= 2 && lastOne <= 4) return `${count} побажання`;
  return `${count} побажань`;
};
