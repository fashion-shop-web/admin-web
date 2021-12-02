const user = require('../models/user');

const showListCustomer = async(reqPage) =>{
    try{
        let customers = await user.find({}).lean();
        const page = reqPage;
        const perPage = 10;

        const start = (page - 1) * perPage;
        const end = page * perPage;
        const pages = [];

        for (let count = 0; count < customers.length / perPage; count++) {
            pages.push(count + 1);
        }

        customers = customers.slice(start, end);

        customers = customers.map(item => {
            return {firstName: item.firstName,
                lastName: item.lastName,
                email: item.email, 
                address: item.address,
                number: item.number,
                status: item.status ? true : false};
        });

        return [customers.reverse(), pages];
    }
    catch(err)
    {
        console.error(err);
    }
}

module.exports = {
    showListCustomer,
}