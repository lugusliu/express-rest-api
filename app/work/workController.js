const connection = require('../lib/database').connection;

module.exports = {
  addWork(req, res) {
    // accessing the data in the request body
    const requestData = req.body;

    const workInfo = {
      userId: requestData.userId,
      name: requestData.name,
      description: requestData.description,
      image: requestData.image,
      url: requestData.url,
      onlineTime: new Date(),
      offlineTime: new Date(),
    };

    connection.query("INSERT INTO work SET ?", workInfo, (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ code: 1, message: 'error occurred while add work information' });
      }

      return res.status(200).json({ code: 0, message: 'work information has been successfully added' });
    });
  },

  getWork(req, res) {
    connection.query("SELECT * FROM work", (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ code: 1, message: 'error occurred while get work information from database' });
      }
      return res.status(200).json({ code: 0, data: result });
    });
  },

  getWorkById(req, res) {
    // accessing the work id
    const workId = req.params.workId;

    connection.query("SELECT * FROM work where id = ?", workId, (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ code: 1, message: 'error occurred while get work information by id from database' });
      }
      if (result.length === 0) {
        return res.status(404).json({ code: 1, message: 'work information by this id not present in database'});
      }
      return res.status(200).json({ code: 0, data: result })
    });
  },

  updateWorkById(req, res) {
    // accessing the work id
    const workId = req.params.workId;

    // accessing the data in the request body
    const requestData = req.body;

    connection.query("SELECT * from work where id = ?", workId, (err, result, fields) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ code: 1, message: 'error occurred while finding work information by id from database' });
      }
      if (result.length === 0) {
        return res.status(404).json({ code: 1, message: 'work information by this id not present in database'});
      }
      connection.query("UPDATE work SET name=?, description=? where id = ?", [requestData.name, requestData.description, workId], (err, result, fields) => {
        if (err) {
          console.log(err)
          return res.status(500).json({ code: 1, message: 'error occurred while updating work information by id from database' });      
        }
        res.status(200).json({ code: 0, message: 'work information has been successfully added'});
      });
    })
  },

  deleteWorkById(req, res) {
    // accessing the work id
    const workId = req.params.workId;

    // accessing the data in the request body
    const requestData = req.body;

    connection.query("SELECT * from work where id = ?", workId, (err, result, fields) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ code: 1, message: 'error occurred while finding work information by id from database' });
      }
      if (result.length === 0) {
        return res.status(404).json({ code: 1, message: 'work information by this id not present in database'});
      }
      connection.query("DELETE FROM work where id = ?", [workId], (err, result, fields) => {
        if (err) {
          console.log(err)
          return res.status(500).json({ code: 1, message: 'error occurred while deleting work information by id from database' });      
        }
        res.status(200).json({ code: 0, message: 'work information has been successfully deleted'});
      });
    })
  }
}