const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// the plugin will automatically create username and password elements
UserSchema.plugin(passportLocalMongoose);

// compile the model we just created
module.exports = mongoose.model('User', UserSchema);