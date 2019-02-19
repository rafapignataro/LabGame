const got = require('got');

module.exports = {
    baseUrl: 'https://gamelabespm.herokuapp.com',
    teste: 'elmeri',
    client: got.extend({
        baseUrl: this.baseUrl,
        headers: {
            "content-type": "application/json; charset=utf-8"
        }
    }),

}