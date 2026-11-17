import { client } from "../lib/api";
import { saveUnlockToken } from "../lib/unlock";

/** Sends the visitor to Stripe Checkout for the unlock. */
export async function startUnlockCheckout() {
  const { url } = await client.checkout.create();
  window.location.href = url;
}

/** Called on return from Stripe (`?paid=<session id>`): verifies the payment and stores the unlock. */
export async function completeUnlockFromUrl(): Promise<boolean> {
  const sessionId = new URLSearchParams(window.location.search).get("paid");
  if (!sessionId) return false;
  const res = await client.checkout.verify({ sessionId });
  window.history.replaceState({}, "", "/");
  if (!res.token) return false;
  saveUnlockToken(res.token);
  return true;
}
