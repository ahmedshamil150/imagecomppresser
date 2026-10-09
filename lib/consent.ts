export type ConsentChoice = "accepted" | "rejected";

const KEY = "picshrink-consent";

export function getConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(KEY);
  return value === "accepted" || value === "rejected" ? value : null;
}

export function setConsent(choice: ConsentChoice): void {
  window.localStorage.setItem(KEY, choice);
  window.dispatchEvent(new CustomEvent("consent-changed", { detail: choice }));
}
