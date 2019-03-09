var loadState = {
    preload: function () {
        var textloading = game.add.text(game.world.centerX, 150, 'LOADING...', {font: '15px emulogic', fill: '#fff'} );
            textloading.anchor.set(0.5); // 100% atualizado

        // image progressBar
        var progressBar = game.add.sprite(game.world.centerX, 250, 'progressBar');
        // recebe dois parametros, porém passado um, os dois parametros são iguais
        progressBar.anchor.set(.5); // ponto de ancoragem img

        game.load.setPreloadSprite(progressBar);
        game.load.image('bg', 'images/bg.png'); // imagem estatica
        game.load.image('block', 'images/block.png'); // imagem estatica
        game.load.image('end', 'images/end.png'); // imagem estatica
        game.load.image('part', 'images/part.png'); // imagem estatica
        game.load.image('navigator', 'images/nav.png');
        game.load.spritesheet('fundo', 'images/ReferenciaTela.png');

        // passar tamanho de cada celula (w,h)
        game.load.spritesheet('coin', 'images/coin.png', 32, 32);  // imagens em pedaços
        game.load.spritesheet('enemy', 'images/enemy.png', 24, 40);  // imagens em pedaços
        game.load.spritesheet('player', 'images/enemy.png', 24, 40);  // imagens em pedaços



        game.load.audio('getitem', 'sfx/getitem.ogg');
        game.load.audio('loseitem', 'sfx/loseitem.ogg');
        game.load.audio('music', 'sfx/music.ogg');
    },
    create: function () {
        game.state.start('menu');
    }
};
