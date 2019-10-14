const jwt=require("jsonwebtoken");
const envConfig=require('../config/envConfig');
const secret=envConfig[process.env.NODE_ENV || 'development'].secret;
const jwtValidator={
    /**
     * to check validity of token
     */
    validateToken:(token,secret)=>{
        return new Promise((resolve,reject)=>{

            jwt.verify(token, secret, function(err, decoded) {
                if(err){
                    reject("error")
                }
                const {role}=decoded;
                resolve(role);
              });
        });
    },
    /**
     * to check validity of Refreshtoke
     */
    validateRefeshToken:(token,secret)=>{
        return new Promise((resolve,reject)=>{

            jwt.verify(token, secret, function(err, decoded) {
                if(err){
                    reject("error");
                }
                const {role}=decoded;
                resolve(role);
              });
        });
    },
    getToken:async (payload)=>{
    
            const token=jwt.sign(payload, secret, { expiresIn: '1h' });
            return token;

    },
    getRefToken:async (payload)=>{
        const token=jwt.sign(payload, secret, { expiresIn: '1h' });
        return token;
    }
    
}
module.exports=jwtValidator;