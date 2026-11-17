import { z } from "zod";
import Stripe from "stripe";
import { base } from "../__core/app";
import { UNLOCK_PRICE_CENTS, makeUnlockToken } from "../food/access";

function stripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Paiement non configuré (STRIPE_SECRET_KEY manquante)");
  return new Stripe(key);
}

function siteUrl(headers: Headers) {
  return process.env.WEBSITE_URL || headers.get("origin") || "http://localhost:4200";
}

export const checkout = {
  /** Creates a one-time Stripe Checkout session for the unlock. */
  create: base.handler(async ({ context }) => {
    const origin = siteUrl(context.headers);
    const session = await stripe().checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: UNLOCK_PRICE_CENTS,
            product_data: { name: "Rituvo — plan complet (jours 3 à 7)" },
          },
        },
      ],
      success_url: `${origin}/?paid={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
    });
    if (!session.url) throw new Error("Stripe n'a pas renvoyé de lien de paiement");
    return { url: session.url };
  }),

  /** Checks a finished session with Stripe and returns the unlock token if it was paid. */
  verify: base.input(z.object({ sessionId: z.string().min(5).max(200) })).handler(async ({ input }) => {
    const session = await stripe().checkout.sessions.retrieve(input.sessionId);
    if (session.payment_status !== "paid") return { unlocked: false as const, token: null };
    return { unlocked: true as const, token: makeUnlockToken(input.sessionId) };
  }),
};
