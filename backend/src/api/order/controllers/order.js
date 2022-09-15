"use strict";

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

const stripe = require("stripe")(
  "sk_test_51LhZudClJ8uxBJuSagmLmY4jAWk9IKOt3DIaTy2BdSVRe821lyfldT5naRLpAlIaV4Jz6fcrhWZVdMy4p2RqvYmZ00pTxgxtrO"
);

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const response = await super.create(ctx);
    const data = response.data.attributes;

    console.log("a", data.name, data.dishes);
    // const { name, address, amount, dishes, token } = ctx.body;

    // const charge = await stripe.paymentIntents.create({
    //   amount: total,
    //   currency: 'jpy',
    //   automatic_payment_methods: {
    //     enabled: true
    //   }
    // })

    // const charge = await stripe.charges.create({
    //   amount: data.amount,
    //   currency: "jpy",
    //   source: data.token,
    //   description: `Order ${new Date()} by ${ctx.state.user._id}`,
    // });

    return response;
  },
}));
