export const getImg = (fileName: string) => {
  return new URL(fileName, import.meta.url);
};
