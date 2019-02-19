const configService = require('../../../configs/service/base');
const got = require('got');

module.exports = {
    newScore: async (data) => {
        return await got(configService.baseUrl + '/score', {
            headers: { "content-type": "application/json; charset=utf-8" },
            json: true, 
            body: data
        }).then(({ body }) => {
            return body;
        }).catch((err) => {
            return err.body;
        });
    }
};