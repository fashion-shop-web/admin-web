const user = require('../models/user');
const bcrypt = require('bcryptjs');

const findByEmail = async (email) => {
    try {
        const admin = await user.findOne({ email: email, role: true }).lean();
        return admin;
    } catch (err) {
        console.log(err);
    }
}

const validatePassword = (password, user) => {
    return bcrypt.compareSync(password, user.password);
}

module.exports = {
    findByEmail,
    validatePassword
}