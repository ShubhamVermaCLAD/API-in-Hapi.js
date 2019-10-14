const jwtValidator = require("../controller/jwtValidator");
const config=require('../config/errorConfig.json');
const envConfig=require('../config/envConfig');
const secret=envConfig[process.env.NODE_ENV || 'development'].secret;
const masterUser=envConfig[process.env.NODE_ENV || 'development'].masterUser;
const errorConfig=config["authorization"];

const middleware={
    
/**
 * function(midlleware) use to authenticate user
 * @param {*} req request object
 * @param {*} res response object
 * @param {*} next to use next middleware
 */
 validateJwt:(req, res, next)=>{
    // console.log(config);
    if (req.headers.authorization && req.headers.refershtoken) {

        jwtValidator.validateToken(req.headers.authorization, secret).then(async value => {

            if (value==masterUser) {
                next();
            }
            else {
                console.log("sperdamin")
                return res.json(errorConfig.not_super_Admin);
            }
        }).catch(err => {
            jwtValidator.validateRefeshToken(req.headers.authorization.refershtoken, secret).then(async (value) => {
                if (value == masterUser) {
                    next();
                }
                else {
                    return res.status(errorConfig.not_super_Admin.status).json({"err":errorConfig.not_super_Admin.err});
                }
            }).catch(err => {
                return res.json(errorConfig.not_super_Admin);
            });
        });

    }
    else {
        return res.status(errorConfig.login_first.status).json({"err":errorConfig.login_first.err});
    }
}
}
module.exports=middleware;