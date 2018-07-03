const connection = require('../lib/database').connection;

module.exports = {
  addProduct(req, res) {
    // 获取请求 body
    const requestData = req.body;

    // 将插入表的信息放入 productInfo
    const productInfo = {
      productName: requestData.productName,
      productDescription: requestData.productDescription,
      productLink: requestData.productLink,
      status: 1,
      userId: Boolean(requestData.userId) ? requestData.userId : 'admin',
      onlineTime: new Date(),
      offlineTime: Boolean(requestData.offlineTime) ? new Date(requestData.offlineTime) : new Date(new Date().getTime() + 90 * 24 * 60 * 60 * 1000)
    };

    let sql = 'INSERT INTO product SET ?';

    connection.query(sql, productInfo, (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ code: 1, message: '新增产品信息失败' });
      }

      return res.status(200).json({ code: 0, message: '产品添加成功' });
    });
  },

  getProduct(req, res) {
    // accessing the data in the request body
    const requestData = req.body;

    const searchInfo = {
      page: requestData.page ? requestData.page : 1,
      size: requestData.size ? requestData.size : 10,
      productName: Boolean(requestData.productName) ? requestData.productName : ""
    };

    console.log(req.body);

    // 查询范围
    let m = (searchInfo.page - 1) * searchInfo.size;
    let n = parseInt(m + searchInfo.size);

    let sql = 'SELECT * FROM product WHERE INSTR(productName, ?) limit ?, ?';

    connection.query(sql, [searchInfo.productName, m, n], (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ code: 1, message: '获取产品信息失败' });
      }
      const len = results.length;
      return res.status(200).json({ code: 0, message: len, data: results });
    });
  },

  updateProduct(req, res) {
    // accessing the data in the request body
    const requestData = req.body;

    const requestInfo = {
      productId: requestData.id,
      productName: requestData.productName,
      productDescription: requestData.productDescription,
      productLink: requestData.productLink,
      offlineTime: requestData.offlineTime,
      status: requestData.status
    }

    let sql = 'SELECT * from product where id = ?';

    connection.query(sql, requestInfo.productId, (err, result, fields) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ code: 1, message: '查询产品信息出错' });
      }
      if (result.length === 0) {
        return res.status(404).json({ code: 1, message: 'id信息错误'});
      }

      const updateInfo = {
        productName: Boolean(requestInfo.productName) ? requestInfo.productName : result[0].productName,
        productDescription: Boolean(requestInfo.productDescription) ? requestInfo.productDescription : result[0].productDescription,
        productLink: Boolean(requestInfo.productLink) ? requestInfo.productLink : result[0].productLink,
        offlineTime: Boolean(requestInfo.offlineTime) ? new Date(requestInfo.offlineTime) : new Date(result[0].offlineTime),
        status: Boolean(requestInfo.status) ? requestInfo.status : result[0].status
      };

      connection.query("UPDATE product SET productName = ?, productDescription = ?, productLink = ?, offlineTime = ?, status = ? where id = ?",
        [updateInfo.productName, updateInfo.productDescription, updateInfo.productLink, updateInfo.offlineTime, updateInfo.status, requestInfo.productId],
        (err, result, fields) => {
          if (err) {
            console.log(err)
            return res.status(500).json({ code: 1, message: '更新数据库出错' });
          }
          res.status(200).json({ code: 0, message: '产品信息更新成功'});
      });
    })
  }
}