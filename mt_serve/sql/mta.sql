SET NAMES UTF8;
DROP DATABASE IF EXISTS mta;
CREATE DATABASE mta CHARSET=UTF8;
USE mta;

/**用户表**/
CREATE TABLE user(
    uid INT PRIMARY KEY AUTO_INCREMENT, /*用户编号*/    
    uname VARCHAR(32),                  /*用户名-邮箱格式*/
    phone VARCHAR(11),                 	/*电话*/
    upwd VARCHAR(32),	               	/*密码*/
    nickname VARCHAR(32) NOT NULL DEFAULT '',	  /*昵称*/
    sex	VARCHAR(1) NOT NULL DEFAULT '',		  /*性别，M-男，F-女, DEFAULT 'M'*/
    age	VARCHAR(3) NOT NULL DEFAULT '',		  /*年龄*/
    edu	VARCHAR(16) NOT NULL DEFAULT '',	      /*学历*/
    job	VARCHAR(16) NOT NULL DEFAULT ''	      /*职业*/
);
INSERT INTO user VALUES
(1, 'admin', '13501234567', '123456','','','','',''),
(2, 'test', '13501234567', '123456','','','','','');


/*课程表*/
CREATE TABLE product(
    pid INT PRIMARY KEY AUTO_INCREMENT, /*课程编号*/
    title VARCHAR(32),                   /*课程名称*/
    pic VARCHAR(32),                     /*主图片*/
    price FLOAT(8,2),                    /*价格*/
    details VARCHAR(2048)                  /*详情*/
);
INSERT INTO product VALUES
(NULL,'黄焖鸡米饭','img-product/01.png','22.00','黄焖鸡米饭又叫香辣鸡煲或浓汁香辣鸡煲饭，是鲁菜名吃，源自山东济南天桥区的传统名吃。色香味美，口感鲜嫩，透味不粘腻，香味浓郁。'),
(NULL,'油焖大虾','img-product/02.png','32.00','油焖大虾，是一道鲁菜。主要食材为清明前渤海湾的大对虾，使用鲁菜特有的油焖技法。这是一道历史悠久的名菜，鲜香甜咸四种味道相辅相成，回味无穷。'),
(NULL,'麻婆豆腐','img-product/03.png','12.00','四川省传统名菜之一，属于川菜，主要原料为豆瓣、豆腐、牛肉末（也可以用猪肉）、辣椒和花椒等'),
(NULL,'水煮鱼','img-product/04.png','22.00','水煮鱼通常由新鲜草鱼、豆芽、辣椒等食材制作而成。“油而不腻、辣而不燥、麻而不苦、肉质滑嫩”是其特色。'),
(NULL,'鱼香肉丝','img-product/05.png','16.00','是一道传统名菜，以鱼香味调味而得名，属于川菜。相传灵感来自泡椒肉丝，在民国时期由四川籍厨师创制而成'),
(NULL,'回锅肉','img-product/06.png','22.00','是一种四川传统菜式中家常（味型）菜肴的代表菜肴之一，属于川菜系列。制作原料主要有猪后臀肉、青椒、蒜苗等，口味独特，色泽红亮，肥而不腻。'),
(NULL,'酸菜鱼','img-product/07.png','26.00','酸菜鱼也称为酸汤鱼，是一道源自重庆的经典菜品，以其特有的调味和独特的烹调技法而著称。流行于上世纪90年代，是重庆江湖菜的开路先锋之一。'),
(NULL,'毛血旺','img-product/08.png','30.00','毛血旺以鸭血为制作主料，烹饪技巧以煮菜为主，口味属于麻辣味。起源于重庆，流行于重庆和西南地区，是一道著名的传统菜式。'),
(NULL,'四川棒棒鸡','img-product/09.png','36.00','棒棒鸡是四川特色菜肴。属于川菜中的凉菜，主要食材是鸡肉，其味型属于“怪味”，麻、辣、酸、甜、鲜、咸、香全部味道都具备。'),
(NULL,'水煮牛肉','img-product/10.png','32.00','水煮牛肉麻辣味厚，滑嫩适口，香味浓烈，具有川味火锅麻、辣、烫的风味。'),
(NULL,'梅菜扣肉','img-product/11.png','28.00','汉族传统名菜，属客家菜 [1]  。制作材料有五花肉、梅菜、葱白、姜片等。'),
(NULL,'红烧排骨','img-product/12.png','22.00','以猪排骨、杏鲍菇作为主要食材，以干辣椒、花椒、八角、丁香、姜片、盐、老抽、生抽、料酒、冰糖等作为辅料制作而成。'),
(NULL,'醋溜土豆丝','img-product/13.png','12.00','醋溜土豆丝属于鲁菜，是一道山东省的家常菜品。主要食材是土豆、尖椒和醋等，主要烹饪工艺是炒，是中国百姓饭桌上常见的家常菜。'),
(NULL,'炒时蔬','img-product/14.png','12.00','炒时蔬是一道口味菜品所属菜系的洋葱，主要食材是山药、马蹄、洋葱等。需要注意的是，蔬菜要根据质地先后放入开水中，质地比较硬的可以多煮一会儿，质地稍微软一些的稍稍烫一下即可。'),
(NULL,'蒜薹鸡蛋','img-product/15.png','12.00','蒜薹鸡蛋是一道以蒜薹、鸡蛋等为主要食材制作的美食。'),
(NULL,'焗绿豆芽','img-product/16.png','12.00','将绿豆芽拣好洗净，放入开水中氽一下，捞出控干，撒上盐、醋、青菜叶拌匀盛盘。最末放上葱、姜、芫荽，炝上椒油即可。');

/**购物车表**/
CREATE TABLE cart(
    ctid INT PRIMARY KEY AUTO_INCREMENT,/*购物车编号*/
    userId INT,         /*用户编号*/
    productId INT,       /*产品编号*/
    count INT     /*数量*/
);
/*订单表*/
CREATE TABLE orders(
    oid INT PRIMARY KEY AUTO_INCREMENT,/*订单id*/
    userId INT,/*用户id*/
    amount INT,
    created INT
);
/**订单详情表**/
CREATE TABLE orders_detail(
   odid INT PRIMARY KEY AUTO_INCREMENT,
   orderId INT,                          /*订单编号*/
   productId INT,                       /*课程编号*/
   count INT                            /*购买数量*/
);

/*个人收藏*/
CREATE TABLE favorite(
    fid INT PRIMARY KEY AUTO_INCREMENT,/*收藏记录id*/
    userId INT,         /*用户id*/
    productId INT,       /*课程id*/
    fTime VARCHAR(16)   /*收藏时间*/
);

