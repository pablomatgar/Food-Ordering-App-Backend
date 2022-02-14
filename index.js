const cors = require("cors");
const express = require("express");
const stripe = require("stripe")(
  "YOUR_SECRET_KEY_GOES_HERE"
);
const { v4: uuidv4 } = require("uuid");
const app = express();

let port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Restaurant management backend is working!");
});

app.post("/checkout", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { order, token } = req.body;

    // Create a customer
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotency_key = uuidv4(); // unique so the cusomer is not charged twice
    
    // Create a charge
    const charge = await stripe.charges.create(
      {
        amount: order.price,
        currency: "jpy",
        customer: customer.id,
        receipt_email: token.email,
        description: `Order number: ${order.orderNumber}`,
      },
      {
        idempotency_key,
      }
    );

    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});

app.listen(port, () => {
  console.log(`Restaurant Management backend is listening on port ${port}`);
});
