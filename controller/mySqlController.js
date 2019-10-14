const jsonWebToken = require('./jwtValidator');
const validator = require("./validator")
const mySql = require('../models/mysql');
const errConfig = require('../config/errorConfig.json');

module.exports = {
    /**
     * function to search all user 
     * return json 
     */
    searchUsers: async (request,h) => {
        const tableName='login';
        result = await mySql.searchAll(tableName);
        const { err } = result;
        //for database server related error
        if (err) return h.response({"err":errConfig.database.connection.err});
        return h.response(result);
    },
    /**
     * function to add user 
     * return json  
     */
    addUser: async (request,h) => {
        let err;
        const tableName='login';
        //check prams (userName , password,email)
        

            if (request.payload && !(err = validator.validateUserName(request.payload.userName)) && !(err = validator.validatePassword(request.payload.password)) && !(err = validator.validateEmail(request.payload.email))) {
                const value = `"${request.payload.userName}","${request.payload.password}","${request.payload.email}","${request.payload.role}"`
                const result = await mySql.insertUser(tableName, value);
                const { err } = result;
                console.log(err)
                //for database server related error
                if (err) return h.response({"err":err}).code( errConfig.database.connection.status);
                return h.response({ "msg": "user is added", "data": result });
            }
            return h.response( {"err": `Error data ${err }`}).code(errConfig.filed_validation.status);
        
       
    },
    /**
     * function for login
     * @param {string} tableName tableName
     * @param {object} prams user object
     * return json 
     */
    login: async (request,h) => {
        let err;
        const tableName='login';
        //check prams (userName , password)
        if (request.payload &&!(err = validator.validateUserName(request.payload.userName)) && !(err = validator.validatePassword(request.payload.password))) {
            const sql = `userName="${request.payload.userName}" AND password="${request.payload.password}"`;
            const record = await mySql.searchRecord(tableName, sql)
            const { err } = record;
            //for database server related error
            if (err) return h.response({"err":err}).code(errConfig.database.connection.status);
            const userData = record[0];
            if (record.length > 0) {
                const payload = { "userName": record[0].userName, "password": record[0].password, "role": record[0].role };
                const token =await jsonWebToken.getToken(payload);
                const refToken=await jsonWebToken.getRefToken(payload);
                return h.response({ "Authorization": token, "refToken": refToken, "userData": userData });
            }
            return h.response({"err":errConfig.authorization.user_not_exist.err}).code(errConfig.authorization.user_not_exist.status);
        }
        return h.response( {"err": `Error data ${err }`}).code(errConfig.filed_validation.status);
    },
    /**
     * function to delete user
     * @param {string} tableName tableName
     * @param {object} prams user object
     * return json 
     */
    deleteUser: async (request,h) => {
        let err;
        const tableName='login';
        if (request.payload && !(err = validator.validateUserName( request.payload.userName))) {

            const result = await mySql.deleteUser(tableName,  request.payload);
            const { err } = result;
            //for database server related error
            if (err) return h.response({"err":err}).code(errConfig.database.connection.status);
            if (result.affectedRows > 0) {
                return h.response({ "msg": "user is deleted", "data": result });
            }
            return h.response({'err':errConfig.authorization.user_not_exist.err}).code(errConfig.authorization.user_not_exist.status);
        }
        else {
            return h.response( {"err": `Error data ${err }`}).code(errConfig.filed_validation.status);
        }
    },
}