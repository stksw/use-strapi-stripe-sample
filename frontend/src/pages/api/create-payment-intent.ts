import { CartItem } from 'types';

// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (cartItems: CartItem[]) => {
  let result = 0;
  cartItems.forEach((item) => {
    result += item.price * item.quantity;
  });
  return result;
};

export default async function handler(req: any, res: any) {
  const { items } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'jpy',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
