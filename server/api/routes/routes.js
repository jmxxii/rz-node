'use strict';
module.exports = (app) => {

    const userCtrl = require('../controllers/usersCtrl');
    const prizeCtrl = require('../controllers/prizesCtrl');
    // User Routes
    app.route('/signup').post(userCtrl.signup);
    app.route('/login').post(userCtrl.login);
    
    // Prize Routes
    app.route('/prizes').get(prizeCtrl.getPrizes);
    app.route('/prize/:id').get(prizeCtrl.viewPrize);
    app.route('/prize/redeem').post(prizeCtrl.redeemPrize);
};