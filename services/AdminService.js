const user = require('../models/user');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);


const createNewAccount = async (admin) => {
    try {
        admin.role = true;
        admin.password = bcrypt.hashSync(admin.password, salt);
        const newAdmin = new user({ ...admin });
        await newAdmin.save();
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createNewAccount,
}