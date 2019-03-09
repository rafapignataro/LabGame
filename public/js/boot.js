// montagem do cenário + loadings

var bootState = {
    preload: function() {
        game.load.image('progressBar','images/progressBar.png');
    },
    create: function() {
        // identity from game.js
        game.state.start('load');
    }
};

