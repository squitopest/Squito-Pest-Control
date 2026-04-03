import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "sk_test_mock_123456789";

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2024-12-18.acacia", // Adjust depending on your exact stripe version needs
  appInfo: {
    name: "Squito AI Dashboard",
    version: "1.0.0",
  },
});
