const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { response } = require("express");
const stripe = require("stripe")('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')
//API
// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get('/', (request, response) => response.status(200).send('Hello World'));

app.post("/payment/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,  //subunits of the currency
    currency: "usd",
  });
  // OK - Ctreated
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  })
});


//Listen command 
  exports.api = functions.https.onRequest(app)