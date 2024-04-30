const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const { sendToken } = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "this is a sample id",
            url: "PicUrl"
        }
    });

    if (!user) {
        return next(new ErrorHandler("Internal Server Error", 404));
    }

    sendToken(user, 201, res);
})

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Credentials", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user)
        return next(new ErrorHandler("Invalid Credentials", 401));

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched)
        return next(new ErrorHandler("Invalid Credentials", 401));

    sendToken(user, 200, res);
})

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged Out Successfully"
    })
})

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});

    if(!user)
        return next(new ErrorHandler("User Not Found", 404));

    //Get Reset Password Token
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave: false});

    //Sending mail
    const resetPasswordURL = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message = `Your Password Reset Link is:- \n\n${resetPasswordURL} \n\n If you have not requested this, then please contact the admin.`;

    try {

        await sendEmail({
            email: user.email,
            subject: "Lavishta Password Recovery",
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave: false});

        return next(new ErrorHandler(error.message, 500));
    }
})

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({resetPasswordToken, resetPasswordExpire: {$gt: Date.now()}});

    if(!user)
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired", 400));

    if(req.body.password !== req.body.confirmPassword)
        return next(new ErrorHandler("Password does not match", 400));

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({validateBeforeSave: false});

    sendToken(user, 200, res);
})

//Get User Details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne(req.user._id);
    res.status(200).json({
        success: true,
        user
    })
})

//Update User Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne(req.user._id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched)
        return next(new ErrorHandler("Old Password is Incorrect", 401));

    if(req.body.newPassword !== req.body.confirmPassword)
        return next(new ErrorHandler("Password does not match", 401));

    user.password = req.body.newPassword;
    await user.save();

    sendToken(user, 200, res);
})

//Update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    //We will add cloudinary later

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true
    });
})

//Get All Users (admin)
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

//Get Single User (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user)
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400));

    res.status(200).json({
        success: true,
        user
    })
})

//Update User Role (admin)
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    if(!user)
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400));

    res.status(200).json({
        success: true
    });
})

//Delete Use (admin)
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);
    //We will remove cloudinary later

    if(!user)
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400));

    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully"
    });
})