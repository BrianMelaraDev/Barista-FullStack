// load the things we need
const mongoose = require('mongoose');

// define the schema for our user model
const orderSchema = mongoose.Schema({

    name: String,
    order: String,
    completed: Boolean

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Order', orderSchema);
