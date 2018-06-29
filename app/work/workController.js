const connection = require('../lib/database').connection;

module.exports = {
  addWork (req, res) {
    // access the data in the request body
    const requestData = req.body;

    // console.log(requestData);

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
        return res.status(500).json({ code: 1, message: 'error occurred while add work information!!!'});
      }

      return res.status(200).json({ code: 0, message: 'work information has been successfully added!!! '});
    });
  }
}