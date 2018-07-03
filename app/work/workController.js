const connection = require('../lib/database').connection;

module.exports = {
  addWork(req, res) {
    // 获取请求 body
    const requestData = req.body;

    // 将插入表的信息放入 workInfo
    const workInfo = {
      jobName: requestData.jobName,
      jobDescription: requestData.jobDescription,
      link: requestData.link,
      status: 1,
      userId: Boolean(requestData.userId) ? requestData.userId : 'admin',
      onlineTime: new Date(),
      offlineTime: Boolean(requestData.offlineTime) ? new Date(requestData.offlineTime) : new Date(new Date().getTime() + 90 * 24 * 60 * 60 * 1000)
    };

    let sql = 'INSERT INTO work SET ?';

    connection.query(sql, workInfo, (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ code: 1, message: '新增职位信息失败' });
      }

      return res.status(200).json({ code: 0, message: '职位添加成功' });
    });
  },

  getWork(req, res) {
    // accessing the data in the request body
    const requestData = req.body;

    const searchInfo = {
      page: requestData.page ? requestData.page : 1,
      size: requestData.size ? requestData.size : 10,
      jobName: Boolean(requestData.jobName) ? requestData.jobName : ""
    };

    console.log(req.body);

    // 查询范围
    let m = (searchInfo.page - 1) * searchInfo.size;
    let n = parseInt(m + searchInfo.size);

    let sql = 'SELECT * FROM work WHERE INSTR(jobName, ?) limit ?, ?';

    connection.query(sql, [searchInfo.jobName, m, n], (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ code: 1, message: '获取职位信息失败' });
      }
      const len = results.length;
      return res.status(200).json({ code: 0, message: len, data: results });
    });
  },

  updateWork(req, res) {
    // accessing the data in the request body
    const requestData = req.body;

    const requestInfo = {
      workId: requestData.id,
      jobName: requestData.jobName,
      jobDescription: requestData.jobDescription,
      link: requestData.link,
      offlineTime: requestData.offlineTime,
      status: requestData.status
    }

    let sql = 'SELECT * from work where id = ?';

    connection.query(sql, requestInfo.workId, (err, result, fields) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ code: 1, message: '查询职位信息出错' });
      }
      if (result.length === 0) {
        return res.status(404).json({ code: 1, message: 'id信息错误'});
      }

      const updateInfo = {
        jobName: Boolean(requestInfo.jobName) ? requestInfo.jobName : result[0].jobName,
        jobDescription: Boolean(requestInfo.jobDescription) ? requestInfo.jobDescription : result[0].jobDescription,
        link: Boolean(requestInfo.link) ? requestInfo.link : result[0].link,
        offlineTime: Boolean(requestInfo.offlineTime) ? new Date(requestInfo.offlineTime) : new Date(result[0].offlineTime),
        status: Boolean(requestInfo.status) ? requestInfo.status : result[0].status
      };

      connection.query("UPDATE work SET jobName = ?, jobDescription = ?, link = ?, offlineTime = ?, status = ? where id = ?",
        [updateInfo.jobName, updateInfo.jobDescription, updateInfo.link, updateInfo.offlineTime, updateInfo.status, requestInfo.workId],
        (err, result, fields) => {
          if (err) {
            console.log(err)
            return res.status(500).json({ code: 1, message: '更新数据库出错' });
          }
          res.status(200).json({ code: 0, message: '职位信息更新成功'});
      });
    })
  }
}