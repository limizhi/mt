//引入数据库模块
const mysql=require("mysql");
//创建数据库连接池
let pool=mysql.createPool({
    host:"127.0.0.1",  //主机号
    port:"3306",       //端口号
    user:"root",       //用户名
    password:"",       //密码
    database:"mta",    //数据库名
    connectionLimit:15 //连接池中的连接数
});

//导出数据库连接池
module.exports=pool;