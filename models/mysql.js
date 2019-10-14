const connection = require('../connection/connection');

const mySql = {
    /**
     * 
     * @param {string} tableName 
     * @param {string} sql  
     */
    executeQuery: async function(tableName, sql){
        try {
            console.log(connection)
            if (tableName && sql) {
                const db = await connection.connection();
                const result = await db.execute(sql);
                db.end();
                return result[0];
            }
            else {
                console.log("err")
                return {
                    "err": "Table Name or sql should not be empty"
                }
            }
        } catch (err) {
            return {
                "err": err.message
            }
        }
    }
}
mySql.searchRecord=async (tableName,que)=>{
    const sql=`select * from ${tableName} where ${que}`;
    return await mySql.executeQuery(tableName,sql);
}
mySql.insertUser= async (tableName, values) => {
    const sql = (`insert into ${tableName} values(${values})`);
    return await mySql.executeQuery(tableName, sql);
}
mySql.searchAll = async (tableName) => {
    const sql = (`SELECT * FROM ${tableName}`);
    return await mySql.executeQuery(tableName, sql);
}
mySql.deleteUser=async (tableName,prams)=>{
    const sql=`DELETE FROM ${tableName} WHERE ${prams.userName?`userName="${prams.userName}"`:`email="${prams.email}"`}`;
    console.log(sql)
    return await mySql.executeQuery(tableName,sql);
}
mySql.updateUser=async(tableName,sql)=>{
    return await mySql.executeQuery(tableName,sql);
}
module.exports = mySql;