var userRepository = require('../repositories/user');

module.exports = {
    newUser: async (data) => {
        return await userRepository.newUser(data);
    },
    getUser: async (data) => {
        return await userRepository.getUser(data);
    },
    newScore: async (data) => {
        return await userRepository.newScore(data);
    },
    getHighScoreByUserId: async (data) => {
        return await userRepository.getHighScoreByUserId(data);
    },
    getHighScoreByUsername: async (data) => {
        return await userRepository.getHighScoreByUsername(data);
    }
}