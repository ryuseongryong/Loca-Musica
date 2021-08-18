const axios = require('axios');
const convert = require('xml-js');

module.exports = {
  get: async (req, res) => {
    try {
      const result = await axios({
        method: 'get',
        url: 'http://kopis.or.kr/openApi/restful/pblprfr',
        params: {
          ...req.query,
        },
      });
      const result2 = convert.xml2js(result.data, { compact: true });
      res.status(200).json({ data: result2 });
    } catch (err) {
      connection.release();
      res.status(500).send({ message: 'internal server error' });
    }
  },
};
