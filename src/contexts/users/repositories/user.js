const configService = require('../../../configs/service/base');
const got = require('got');

module.exports = {
    newUser: async (data) => {
        return await got(configService.baseUrl + '/user', {
            headers: { "content-type": "application/json; charset=utf-8" },
            json: true, 
            body: data
        }).then(({ body }) => {
            return body;
        }).catch((err) => {
            return err.body;
        });
    },
    getUser: async (data) => {
        return await got(configService.baseUrl + '/user/' + data.username, {
            headers: { "content-type": "application/json; charset=utf-8" },
            json: true
        }).then(({ body }) => {
            return body;
        }).catch((err) => {
            return err.body;
        });
    },
    getHighScoreByUserId: async (data) => {
        return await got(configService.baseUrl + '/user/highscore/' + data.user_id, {
            headers: { "content-type": "application/json; charset=utf-8" },
            json: true,
        }).then(({ body }) => {
            return body;
        }).catch((err) => {
            return err.body;
        });
    },
    getHighScoreByUsername: async (data) => {
        return await got(configService.baseUrl + '/user/highscore/' + data.username, {
            headers: { "content-type": "application/json; charset=utf-8" },
            json: true,
        }).then(({ body }) => {
            return body;
        }).catch((err) => {
            return err.body;
        });
    }
};