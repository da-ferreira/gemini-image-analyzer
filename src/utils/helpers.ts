export const isBase64 = (strBase64: string): boolean => {
  try {
    return btoa(atob(strBase64)) === strBase64;
  } catch (err) {
    return false;
  }
};
