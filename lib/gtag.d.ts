// Type definitions for Google Analytics gtag.js API
interface Window {
  dataLayer: unknown[];
  gtag: (...args: unknown[]) => void;
}
