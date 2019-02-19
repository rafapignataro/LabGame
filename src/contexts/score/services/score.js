var scoreRepository = require('../repositories/score');

module.exports = {
    newScore: async (data) => {
        return await scoreRepository.newScore(data);
    }
}