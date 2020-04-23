//引入express模块
const express=require("express");
//引入连接池模块
const pool=require("../pool");
//创建路由器对象
const router=express.Router();

//显示商品分页列表
router.get("/list",(req,res)=>{
  //参数 页码
  //一页几行 
  let pno=req.query.pno;
  let ps=req.query.pageSize
  //1.1 为参数设置默认值
  if(!pno){pno=1}
  if(!ps){ps=4}
  let sql="SELECT pid,title,pic,price FROM product LIMIT ?,?"
  //2.1 起始记录数
  let offset=(pno-1)*ps;
  //2.2 一行几条记录
  ps=parseInt(ps);
  //3 返回值
  pool.query(sql,[offset,ps],(err,result)=>{
    if(err) throw err;
    res.send({code:1,msg:"查询成功",data:result})
  })
})

//导出模块
module.exports=router;