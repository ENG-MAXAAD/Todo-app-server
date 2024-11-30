const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: 'string', required: true },
    phone: { type: Number },
    password: { type: 'string' , required: true},
    email: { type: 'string', required: true },
    photo: { type: 'string', default: 'https://craftsnippets.com/articles_images/placeholder/placeholder.jpg' }
}, {
    timestamps: true,
}

)

module.exports = mongoose.model('User', UserSchema);