const mongoose = require('mongoose');
const PrizeModel = require('../models/Prize');
const errorHandlers = require('../handlers/errors/errorHandler');
const successHandlers = require('../handlers/success/succesHandlers');
const jwtAuth = require('../middleware/authorization');
const Hashids = require('hashids/cjs');

// View all prizes
exports.getPrizes = (req, res) => {
    PrizeModel.find({})
    .exec((prizeErr, prizes) => {
        if (prizeErr) return errorHandlers.dbErrorHandler(res ,prizeErr);

        return successHandlers.successfullResponse(res, prizes, "Prizes retrieved successfully.");
    });
};

// View Prize
exports.viewPrize = (req, res) => {  
    if (!mongoose.isValidObjectId(req.params.id)) return errorHandlers.invalidInput(res, "Invalid prize id.");
    PrizeModel.findOne({ _id: mongoose.Types.ObjectId(req.params.id)})
    .exec((prizeErr, prize) => {
        if (prizeErr) return errorHandlers.dbErrorHandler(res, prizeErr);

        return successHandlers.successfullResponse(res, prize, "Prize retrieved successfully.");
    });
}

// Redeem Prize 
exports.redeemPrize = (jwtAuth, (req, res) => {
    if (!req.body._id) return errorHandlers.invalidInput(res, "Prize id is missing.");

    PrizeModel.findOne({ _id: mongoose.Types.ObjectId(req.body._id)})
    .exec((prizeErr, prize) => {
        if (prizeErr) return errorHandlers.dbErrorHandler(res, prizeErr);

        if (prize.quantity === 0) return errorHandlers.invalidInput(res, "There are no remainding prizes left in stock.");

        let newQuantity = { quantity: prize.quantity - 1};

        PrizeModel.updateOne({ _id: mongoose.Types.ObjectId(req.body._id)}, { $set: newQuantity })
        .exec((updatePrizeErr, updatedPrize) => {
            if (updatePrizeErr) return errorHandlers.dbErrorHandler(res, updatePrizeErr);

            return successHandlers.successfullResponse(res, updatedPrize, "Prize redeemed successfully");
        })

    });
});

