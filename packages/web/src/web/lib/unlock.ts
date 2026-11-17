// Unlock token issued by the server after a verified payment. Stored per browser.
const KEY = "rituvo:unlock";

export function getUnlockToken(): string | undefined {
  return localStorage.getItem(KEY) ?? undefined;
}

export function saveUnlockToken(token: string) {
  localStorage.setItem(KEY, token);
}
