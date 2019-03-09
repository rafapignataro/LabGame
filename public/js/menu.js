var menuState = {
    create: function () {
        
        game.stage.backgroundColor = "Black";
        
        this.music = game.add.audio('music'); // atributo global
        this.music.loop = true; // infinita essa porra
        this.music.volume = 0.1; // valor vai de 0 a 1;
        //this.music.play(); // TOCA A MUSICA DA FOXXXX GOL NA LIBERTA 
        
        // TIREI A MUSICA PORQUE NÃO PRA PROGRAMAR COM ISSO IRRITA DEMAIS

        var txtlab = game.add.text(game.world.centerX, 150, 'Labs', {
                font: '60px emulogic',
                fill: '#fff'
            });
            txtlab.anchor.set(0.5);
            
        var txtpressstart = game.add.text(game.world.centerX, 550, 'Press Enter', {
                font: '30px emulogic',
                fill: '#fff'
            });
            txtpressstart.anchor.set(.5);

        
        // movimento Press Start
        game.add.tween(txtpressstart).to({y:250},1100).start();

        game.time.events.add(1150, function () {
            //alert(this); //this é o menuState
            // var enterkey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            var key = game.input;
                key.onDown.add(this.startGame, this);
        }, this);
    },

    startGame: function() {
        this.music.stop(); // para musica
        game.state.start('stage');
    }
};