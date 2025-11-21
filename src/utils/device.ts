export const isIOS = () => {
  if (typeof navigator === "undefined") {
    return false;
  }
  const userAgent = navigator.userAgent || "";
  return /iP(ad|hone|od)/i.test(userAgent);
};

export const isIosChrome = () => {
  if (typeof navigator === "undefined") {
    return false;
  }
  const userAgent = navigator.userAgent || "";
  const isIOSDevice = /iP(ad|hone|od)/i.test(userAgent);
  const isChrome = /CriOS/i.test(userAgent);
  return isIOSDevice && isChrome;
};

export const isIosSafari = () => {
  if (typeof navigator === "undefined") {
    return false;
  }
  const userAgent = navigator.userAgent || "";
  const isIOSDevice = /iP(ad|hone|od)/i.test(userAgent);
  const isSafari = /Safari/i.test(userAgent) && !/CriOS|FxiOS|OPiOS|mercury/i.test(userAgent);
  return isIOSDevice && isSafari;
};

export const isIosBrowser = () => {
  return isIosChrome() || isIosSafari() || isIOS();
};
