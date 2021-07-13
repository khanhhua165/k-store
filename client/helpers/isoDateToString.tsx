export const isoDateToString = (isoString: string) => {
  return new Date(Date.parse(isoString)).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
