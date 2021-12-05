const user = require('../models/user');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const getAdmin = async (id) => {
    try {
        const admin = await user.findOne({ _id: id });

        return admin;
    } catch (err) {
        console.log(err);
    }
}

const getListAdmin = async (reqPage) => {
    try {
        let admin = await user.find({ role: true }).lean();
        admin.reverse();
        const page = reqPage;
        const perPage = 10;

        const start = (page - 1) * perPage;
        const end = page * perPage;
        const pages = [];

        for (let count = 0; count < admin.length / perPage; count++) {
            pages.push(count + 1);
        }

        admin = admin.slice(start, end);

        return [admin, pages];
    }
    catch (err) {
        console.error(err);
    }
}

const createNewAccount = async (admin) => {
    try {
        const check = await user.findOne({ email: admin.email });
        if (admin.password.length < 8) return 1; //short password
        else if (check) return 2; //alreay have email
        else {
            admin.role = true;
            admin.password = bcrypt.hashSync(admin.password, salt);
            const newAdmin = new user({ ...admin });
            await newAdmin.save();
            return 0;
        }
    } catch (err) {
        console.log(err);
    }
}

const updateInfo = async (id, admin) => {
    try {
        let adminEmails = await user.find({ email: admin.email });

        for (let i = 0; i < adminEmails.length; i++) {
            if (adminEmails[i]._id.toString() !== id) return 0;//duplicate email
        }

        await user.updateOne({ _id: id }, admin);
        return 1; //succcess
    } catch (err) {
        console.log(err);
    }
}

const validateChangePass = async (id, pass) => {
    try {
        let admin = await user.findOne({ _id: id });

        if (!bcrypt.compareSync(pass.oldPassword, admin.password)) {
            return 1;  //wrong current password
        } else if (pass.oldPassword === pass.newPassword) {
            return 2; //change to old pass
        } else if (pass.newPassword.length < 8) {
            return 3; //pass too short   
        } else if (pass.newPassword !== pass.rePassword) {
            return 4; //retype invalid

        } else {
            admin.password = bcrypt.hashSync(pass.newPassword, salt);
            await admin.save();
            return 0; //success
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createNewAccount,
    getListAdmin,
    updateInfo,
    validateChangePass,
    getAdmin
}