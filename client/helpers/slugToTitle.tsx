export const getTitle = (slug: string) => {
  const words = slug.split("-");
  return words
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
    })
    .join(" ");
};
