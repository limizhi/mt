//引入express模块
const express=require("express");
//引入连接池模块
const pool=require("../pool");

//创建路由器对象
const router=express.Router();

//添加路由 用户注册 /register
router.post("/reg",(req,res)=>{
    //获取表单提交数据
    var obj=req.body;
    console.log(obj)

    //优化
    //1.检测用户名是否为空
    if(!obj.uname){
        res.json({code:401,msg:"uname required!"});
        return;
    }
    //2.检测密码是否为空
    if(!obj.upwd){
        res.json({code:402,msg:"upwd required!"});
        return;
    }
    // //3.检测重复密码是否为空
    // if(!obj.upwd2){
    //     res.json({code:403,msg:"upwd2 required!"});
    //     return;
    // }
    //4.检测手机号是否为空
    if(!obj.phone){
        res.json({code:404,msg:"phone required!"});
        return;
    }
    //5.检测手机号的合法性
    var pt=/^1[3-9]\d{9}$/;
    if(!pt.test(obj.phone)){
        res.json({code:405,msg:"手机号格式非法"});
        return;
    }
    // //6.检测两次密码是否一直
    // if(obj.upwd!=obj.upwd2){
    //     res.json({code:406,msg:"两次密码不一致"});
    //     return;
    // }
     //5.检测用户名的合法性
     var un=/^[a-zA-Z]{3,12}$/;
     if(!un.test(obj.uname)){
         res.json({code:407,msg:"注册失败 用户名为3~12位字母"});
         return;
     }
    //比较完成后需要删除upwd2
    // delete obj.upwd2;

    //执行sql语句 讲数据插入到user表中
    // var sql="INSERT INTO user SET ?";
    var sql="INSERT INTO user SET uname=?,phone=?, upwd=? "
    pool.query(sql,[obj.uname,obj.phone,obj.upwd],(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.json({
            code:200,
            msg:"success",
            //将取到的数据返回给调用端
            data:{
                uid:result.insertId,uname:obj.uname
            }
        });
    });
});

//用户登录
router.post("/login",(req,res)=>{
    //获取数据
    var obj=req.body;
    //优化
    //1.检测用户名是否为空
    if(!obj.uname){
        res.json({code:401,msg:"uname required!"});
        return;
    }
    //2.检测密码是否为空
    if(!obj.upwd){
        res.json({code:402,msg:"upwd required!"});
        return;
    }

    //执行sql语句 
    // let sql="SELECT * FROM user WHERE uname=? AND upwd=? LIMIT 1";
    let sql="SELECT uid FROM user WHERE uname=? AND upwd=? LIMIT 1";
    pool.query(sql, [obj.uname,obj.upwd], (err,result)=>{
        if(err) throw err;
        console.log(result);
        if(result.length>0){
            res.json({code:200,msg:"success",data:result[0]});//将取到的数据返回给调用端
        }else{
            res.json({code:301,msg:"no user"})
        }  
    });
});

//检测用户名是否存在
router.post("/check_uname",(req,res)=>{
    //获取信息
    var obj=req.body;
    if(!obj.uname){
        res.json({code:300,msg:"uname is required"});
        return;
    }
    //执行sql语句
    let sql="SELECT count(*) as num FROM user WHERE uname=?"
    pool.query(sql, [obj.uname], (err,result)=>{
        if (err) throw err;
        console.log(result);
        // console.log(result.num); // undefined
        if (result[0].num > 0) {
          res.json({code:301,msg:"user exists"});
        } else {
          res.json({code:200,msg:"user does not exist"});
        }
    });
});

// 检测手机号是否存在
router.post("/check_phone", (req,res)=>{
    var obj=req.body;
    if (!obj.phone) {
      res.json({code: 300, msg:"phone is required"});
      return;
    }
    // 查询语句
    let sql = "SELECT count(*) as num FROM user WHERE phone=?";
    pool.query(sql, [obj.phone], (err,result)=>{
      if (err) throw err;
      if (result[0].num > 0) {
        res.json({code:301,msg:"phone exists"});
      } else {
        res.json({code:200,msg:"phone does not exist"});
      }
    });
  });
//导出模块
module.exports=router;