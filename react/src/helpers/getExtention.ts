export const getExtension = (file: string) => {
  const parts = file?.split(".");
  const fileExtension = parts?.pop();

  return fileExtension;
};
