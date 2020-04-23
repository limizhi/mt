//引入express模块
const express=require("express");
//引入连接池模块
const pool=require("../pool.js");
//创建路由器对像
var router=express.Router();

//创建购物车路由接口 /add
// 添加购物车post  /cart/add
router.get("/add", function(req,res){
    //获取数据
    // var obj = req.body;
    var obj=req.query
    // 用户id参数
    if (!obj.uid) {
      res.json({code:301, msg:"uid is required"});
      return;
    }
    // 商品id参数
    if (!obj.pid) {
      res.json({code:302, msg:"pid is required"});
      return;
    }
    // 购买数量参数
    if (!obj.count) {
      obj.count = 1;
    }
    //     uid                      cid
    // 查询用户的购物车中是否已经添加过该商品?
    let sql = "SELECT count(*) as num FROM cart WHERE userId=? AND productId=?";
    pool.query(sql, [obj.uid,obj.pid],(err, result)=>{
      if (err) throw err;
      if (result[0].num > 0) {
        // 商品已在购物车中(更新购买数量)
        var sql = `UPDATE cart SET count=count+${obj.count} WHERE userId=${obj.uid} AND productId=${obj.pid}`;
      } else {
        // 商品尚未添加到购物车中(执行添加)
        var sql = `INSERT INTO cart VALUES (NULL, ${obj.uid}, ${obj.pid}, ${obj.count})`;
      }
      pool.query(sql, (err,result)=>{
        if (err) throw err;
        if (result.affectedRows > 0) {
          res.json({code:200,msg:"success"});
        } else {
          res.json({code:400,msg:"failed"});
        }
      });
    });
  });
  
  // 查询购物车(列表) /cart/list
  router.post("/list", (req,res)=>{
    var obj = req.body;
    if (!obj.uid) {
      res.json({code: 301, msg: "uid is required"});
      return;
    }
    // 根据用户id,查询该用户的购物车信息
    let sql = "SELECT product.title, product.price, product.pic, cart.productId,cart.count, cart.ctid FROM cart,product WHERE cart.productId=product.pid AND cart.userId=?";
    pool.query(sql, [obj.uid], (err, result)=>{
      if (err) throw err;
      if (result.length > 0) {
        res.json({code: 200,msg:"success",data: result});
      } else { // 购物车为空
        res.json({code: 201,msg:"cart is empty"});
      }
    });
  });
  
  // 更新购物车(购买数量) /cart/update
  router.post("/update", (req,res)=>{
    var obj = req.body;
    if (!obj.ctid) {
      res.json({code: 301, msg:"ctid is required"});
      return;
    }
    if (!obj.count) {
      res.json({code: 302, msg:"count is required"});
      return;
    }
    let sql = "UPDATE cart SET count=? WHERE ctid=?";
    pool.query(sql, [obj.count, obj.ctid], (err, result)=>{
      if (err) throw err;
      if (result.affectedRows > 0) {
        res.json({code:200,msg:"success"});
      } else {
        res.json({code:301,msg:"failed"});
      }
    });
  });
  
  // 清空购物车 /cart/empty
  router.post("/empty", (req,res)=>{
    var obj = req.body;
    if (!obj.uid) {
      res.json({code: 301, msg:"uid is required"});
      return;
    }
    let sql = "DELETE FROM cart WHERE userId=?";
    pool.query(sql, [obj.uid], (err, result)=>{
      if (err) throw err;
      if (result.affectedRows > 0) {
        res.json({code:200,msg:"success"});
      } else {
        res.json({code:301,msg:"failed"});
      }
    });
  });
  
  // 删除购物车中的商品记录 /cart/delete
  router.post("/delete", (req,res)=>{
    var obj = req.body;
    if (!obj.ctid) {
      res.json({code: 301, msg:"ctid is required"});
      return;
    }
    let sql = "DELETE FROM cart WHERE ctid=?";
    pool.query(sql, [obj.ctid], (err, result)=>{
      if (err) throw err;
      if (result.affectedRows > 0) {
        res.json({code:200,msg:"success"});
      } else {
        res.json({code:301,msg:"failed"});
      }
    });
  })


module.exports=router;
