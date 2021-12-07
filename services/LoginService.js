const user = require('../models/user');
const bcrypt = require('bcryptjs');
const transporter = require('../utils/nodemailer');
const salt = 10;

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

const sendNewPassword = async (email) => {
    const account = await user.findOne({ email: email });

    if (account) {
        const newPass = (Math.random() + 1).toString(36).substring(2);
        account.password = await bcrypt.hash(newPass, salt);

        const mailOption = {
            from: process.env.SHOP_GMAIL_USERNAME,
            to: email,
            subject: 'Forget password',
            html: `<div style="background-color: #ea562dda; padding: 2em 2em;">
                        <h1 style="text-align: center;">This is your new password</h1>
                        <h4 style="text-align: center;">${newPass}</h4>
                    </div>`
        }

        transporter.sendMail(mailOption, function (err, info) {
            if (err) console.log(err);
        })

        await account.save();
    }
}

module.exports = {
    findByEmail,
    validatePassword,
    sendNewPassword,
}