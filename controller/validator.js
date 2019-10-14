const Joi = require('joi');

module.exports = {
    /**
     * for validate userName
     */
    validateUserName: (userName) => {
        
        const schema = Joi.object().keys({
            userName: Joi.string().min(3).max(30).required(),
        });
        const { error } = Joi.validate({ "userName": userName }, schema);
        if (error) {
            return "UserName " + error.details[0].message;
        }
    },
    /**
     * for validate password
     * 
     */
    validatePassword: (password) => {
        const schema = Joi.object().keys({
            password: Joi.string().min(3).max(30).regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        });
        const { error } = Joi.validate({ "password": password }, schema);
        if (error) {
            return error.details[0].message;
        }
    },
    /**
     * for validate email
     */
    validateEmail: (email) => {
        console.log("email",email);
        const schema = Joi.object().keys({
            email: Joi.string().min(3).max(30).email({ minDomainAtoms: 1 }).required(),
        });
        const { error } = Joi.validate({ "email": email }, schema);
        console.log(error)
        if (error) {
            return error.details[0].message;
        }
    },
}