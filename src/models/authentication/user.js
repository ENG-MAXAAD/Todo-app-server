const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: 'string', required: true },
    phone: { type: Number },
    password: { type: 'string', required: true },
    email: { type: 'string', required: true },
    photo: { type: 'string', default: 'https://craftsnippets.com/articles_images/placeholder/placeholder.jpg' }
}, {
    timestamps: true,
});

// Optionally, you could hash the password here before saving
// UserSchema.pre('save', async function(next) {
//     if (this.isModified('password') || this.isNew) {
//         const hashedPassword = await bcrypt.hash(this.password, 10);
//         this.password = hashedPassword;
//     }
//     next();
// });

module.exports = mongoose.model('User', UserSchema);
