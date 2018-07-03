const connection = require('../lib/database').connection;

module.exports = {
  getCompany(req, res) {
    // accessing the data in the request body
    const requestData = req.body;

    const searchInfo = {
      page: requestData.page ? requestData.page : 1,
      size: requestData.size ? requestData.size : 10
    };
    // 查询范围
    let m = (searchInfo.page - 1) * searchInfo.size;
    let n = parseInt(m + searchInfo.size);

    let sql = 'SELECT * FROM company limit ?, ?';

    connection.query(sql, [ m, n], (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ code: 1, message: '获取企业信息失败' });
      }
      const len = results.length;
      return res.status(200).json({ code: 0, message: len, data: results });
    });
  },

  updateCompany(req, res) {
    // accessing the data in the request body
    const requestData = req.body;

    const requestInfo = {
      companyId: requestData.id,
      phone: requestData.phone,
      fax: requestData.fax,
      email: requestData.email,
      address: requestData.address,
      onlineTime: requestData.onlineTime,
      status: requestData.status
    }

    let sql = 'SELECT * from company where id = ?';

    connection.query(sql, requestInfo.companyId, (err, result, fields) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ code: 1, message: '查询企业信息出错' });
      }
      if (result.length === 0) {
        return res.status(404).json({ code: 1, message: 'id信息错误'});
      }

      const updateInfo = {
        phone: Boolean(requestInfo.phone) ? requestInfo.phone : result[0].phone,
        fax: Boolean(requestInfo.fax) ? requestInfo.fax : result[0].fax,
        email: Boolean(requestInfo.email) ? requestInfo.email : result[0].email,
        address: Boolean(requestInfo.address) ? requestInfo.address : result[0].address,
        onlineTime: Boolean(requestInfo.onlineTime) ? new Date(requestInfo.onlineTime) : new Date(result[0].onlineTime),
        status: Boolean(requestInfo.status) ? requestInfo.status : result[0].status
      };

      connection.query("UPDATE company SET phone = ?, fax = ?, email = ?, address = ?, onlineTime = ?, status = ? where id = ?",
        [updateInfo.phone, updateInfo.fax, updateInfo.email, updateInfo.address, updateInfo.onlineTime, updateInfo.status, requestInfo.companyId],
        (err, result, fields) => {
          if (err) {
            console.log(err)
            return res.status(500).json({ code: 1, message: '更新数据库出错' });
          }
          res.status(200).json({ code: 0, message: '企业信息更新成功'});
      });
    })
  }
}