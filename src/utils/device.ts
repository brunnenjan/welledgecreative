export const isIosChrome = () => {
  if (typeof navigator === "undefined") {
    return false;
  }
  const userAgent = navigator.userAgent || "";
  const isIOS = /iP(ad|hone|od)/i.test(userAgent);
  const isChrome = /CriOS/i.test(userAgent);
  return isIOS && isChrome;
};
