/**
 * Returns the appropriate background image source based on device type
 * @param basePath - Path without extension, e.g. "/assets/parallax/section-design/parallax-bg-design"
 * @param isMobile - Whether the device is mobile (≤768px)
 * @returns Full path to the background image
 */
export function getBackgroundSrc(basePath: string, isMobile: boolean): string {
  if (isMobile) {
    return basePath + "-mobile.webp";
  }
  return basePath + ".webp";
}
