const Order = require("../models/orderModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");
const Product = require("../models/productModel");

//Create New Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body;

    const order = await Order.create({
        shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paidAt: Date.now(), user: req.user._id
    });

    res.status(201).json({
        success: true,
        order
    })
});

//Get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if(!order)
        next(new ErrorHandler(`Order is not find by Id: ${req.params.id}`, 404));

    res.status(200).json({
        success: true,
        order
    })
});

//Get Logged In User Order
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({user: req.user._id});

    res.status(200).json({
        success: true,
        orders
    })
});

//Get all Orders (admin)
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
});

//Update Order Status (admin)
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order)
        return next(new ErrorHandler(`Order does not exist by Id: ${req.params.id}`, 404));

    if(order.orderStatus === "Delivered")
        return next(new ErrorHandler("You have already delivered this order", 400));

    order.orderStatus = req.body.status;

    if(req.body.status === "Shipped"){
        order.orderItems.forEach(async orderItem => {
            await updateStock(orderItem.product, orderItem.quantity);
        });
    }

    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave : false})

    res.status(200).json({
        success: true
    })
});

async function updateStock(id, quantity){
    const product = await Product.findById(id);

    product.stock -= quantity;

    await product.save({validateBeforeSave: false});
}

//Delete Order (admin)
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order)
        return next(new ErrorHandler(`Order does not exist by Id: ${req.params.id}`, 404));

    await order.deleteOne();

    res.status(200).json({
        success: true
    })
});