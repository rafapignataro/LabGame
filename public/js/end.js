var endState = {
    
    create: function () {
        
        
        game.stage.backgroundColor = "black";
        
        var txtGameOver = game.add.text(game.world.centerX, 150, 'Game Over', {
                font: '60px emulogic',
                fill: '#fff'
            });
            txtGameOver.anchor.set(0.5);
            
        
        var txtScore = game.add.text(-100, 400, 'Score: 50', {
                font: '50px emulogic',
                fill: '#fff'
            });
            txtScore.anchor.set(0.5);
            game.add.tween(txtScore).to({x:game.world.centerX},500).start();
        
        var txtHighScore = game.add.text(-100, 470, 'High Score: 100', {
                font: '20px emulogic',
                fill: '#fff'
            });
            txtHighScore.anchor.set(0.5);
            game.add.tween(txtHighScore).to({x:game.world.centerX},500).start();
        
        var txtRestart = game.add.text(window.innerWidth + 100, 550, 'Restart', {
                font: '30px emulogic',
                fill: '#fff'
            });
            txtRestart.anchor.set(.5);
            txtRestart.inputEnabled = true;
            txtRestart.events.onInputDown.add(this.retornaGame, this);
            game.add.tween(txtRestart).to({x:game.world.centerX},500).start();
        
        var txtMenu = game.add.text(window.innerWidth + 100, 600, 'Menu', {
                font: '25px emulogic',
                fill: '#fff'
            });
            txtMenu.anchor.set(.5);
            txtMenu.inputEnabled = true;
            txtMenu.events.onInputDown.add(this.backMenu, this);
            game.add.tween(txtMenu).to({x:game.world.centerX},500).start();
        
            

    },
    
    retornaGame: function(){
        
        game.state.start('stage');
    },
    
    backMenu: function(){
        
        game.state.start('menu');
    },

    update: function () {
        
    }
    

};