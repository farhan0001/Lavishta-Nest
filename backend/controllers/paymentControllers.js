const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Stripe = require('stripe');

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "INR",
        shipping: {
            name: req.body.name,
            address: {
                line1: req.body.shippingInfo.address,
                city: req.body.shippingInfo.city,
                state: req.body.shippingInfo.state,
                postal_code: req.body.shippingInfo.pincode,
                country : req.body.shippingInfo.country
            }
        },
        metadata: {
            company: "Lavishta"
        },
        description: 'Software development services'
    });

    res.status(200).json({ success: true, client_secret: myPayment.client_secret});
})

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY});
})