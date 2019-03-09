var stageState = {
    player: null,
    grupoBlocos: null,
    horaProximoBloco: 0,
    aceleracaoAndar: 0,
    aceleracaoAndarFreio: 0,
    velocidadeAndarMax: 0,
    gravidadeBlocosOriginal: 0,
    gravidadeBlocos: 0,
    velocidadeMaximaBlocos: 0,
    score: 0,
    highScore: 0,
    aceleracaoContador: 0,
    txtLab: "",
    txtScore: "",
    txtGameOver: "",
    txtScoreTela: "",
    txtHighScore: "",
    txtRestart: "",
    txtMenu: "",
    txtNovoHighScore: "",
    w0: 0,
    x0i: 0,
    x0f: 0,
    y0: 0,
    w1: 0,
    x1i: 0,
    x1f: 0,
    y1: 0,
    yHitMin: 0,
    yHitMax: 0,
    yKillSprite: 0,
    mEscala: 0,
    nEscala: 0,
    username: sessionStorage.getItem('username'),

    create: function () {
        console.log(sessionStorage.getItem('username'))

        if (!this.username)
            location.href = "/login";

        functions.getHighScore(sessionStorage.getItem('username'));
        this.aceleracaoAndar = 1250;
        this.aceleracaoAndarFreio = 1750;
        this.velocidadeAndarMax = 500;
        this.gravidadeBlocos = 20;
        this.velocidadeMaximaBlocos = 200;
        this.w0 = 227;
        this.x0i = 158;
        this.x0f = 340;
        this.y0 = 61;
        this.w1 = 479;
        this.x1i = 0;
        this.x1f = 0;
        this.y1 = 625;
        this.yHitMin = 615;
        this.yHitMax = 625;
        this.yKillSprite = 650;

        this.x1i = (larguraPadrao - this.w1) * 0.5;
        this.x1f = larguraPadrao - this.x1i;
        var deltaCima = this.x0i - ((larguraPadrao - this.w0) * 0.5);
        var deltaBaixo = deltaCima * this.w1 / this.w0;
        this.x1i += deltaBaixo;
        this.x1f -= deltaBaixo;

        if (largura !== larguraPadrao) {
            var escala = largura / larguraPadrao;
            this.x0i *= escala;
            this.x0f *= escala;
            this.x1i *= escala;
            this.x1f *= escala;
            this.aceleracaoAndar *= escala;
            this.aceleracaoAndarFreio *= escala;
            this.velocidadeAndarMax *= escala;
        }

        if (altura !== alturaPadrao) {
            var escala = altura / alturaPadrao;
            this.y0 *= escala;
            this.y1 *= escala;
            this.yHitMin *= escala;
            this.yHitMax *= escala;
            this.yKillSprite *= escala;
            this.gravidadeBlocos *= escala;
            this.velocidadeMaximaBlocos *= escala;
        }

        this.gravidadeBlocosOriginal = this.gravidadeBlocos;

        this.nEscala = this.w0 / this.w1;
        var k = this.nEscala;
        this.mEscala = (1 - k) / (this.y1 - this.y0);

        console.log(this.x1i + " / " + this.x1f);

        game.physics.startSystem(Phaser.Physics.ARCADE);

        var fundo = game.add.sprite(0, 0, "fundo");
        fundo.width = largura;
        fundo.height = altura;

        this.player = game.add.sprite(metadeLargura, this.y1, "player");

        game.physics.arcade.enable(this.player);

        this.player.body.collideWorldBounds = true;
        this.player.anchor.x = 0.5;
        this.player.anchor.y = 1;
        this.player.animations.add("esquerda", [0, 1, 2, 3], 12, true);
        this.player.animations.add("parado", [4], 1, true);
        this.player.animations.add("direita", [5, 6, 7], 12, true);
        this.player.animations.play("parado");

        // Estamos criando um atributo novo (o JavaScript permite isso)
        this.player.body.velocidadeAntiga = 0;
        this.player.body.animacaoAtual = 0;
        this.player.body.maxVelocity.x = this.velocidadeAndarMax;
        this.player.body.maxVelocity.y = this.velocidadePuloMax;

        this.grupoBlocos = game.add.group();
        this.grupoBlocos.enableBody = true;
        //this.grupoBlocos.createMultiple(15, 'block');
        game.physics.arcade.enable(this.grupoBlocos);

        this.txtScore = game.add.text(160, 40, 'Score: 0', {
            font: '30px emulogic',
            fill: '#fff'
        });
        this.txtScore.anchor.set(0.5);

        this.txtGameOver = game.add.text(game.world.centerX, -50, 'Game Over', {
            font: '60px emulogic',
            fill: '#fff'
        });
        this.txtGameOver.anchor.set(0.5);

        this.txtNovoHighScore = game.add.text(-500, 320, 'Novo High Score!!', {
            font: '35px emulogic',
            fill: '#fff'
        });
        this.txtNovoHighScore.anchor.set(0.5);

        this.txtScoreTela = game.add.text(-300, 400, 'Score: 0', {
            font: '50px emulogic',
            fill: '#fff'
        });
        this.txtScoreTela.anchor.set(0.5);

        this.txtHighScore = game.add.text(-300, 470, 'High Score: 0', {
            font: '20px emulogic',
            fill: '#fff'
        });
        this.txtHighScore.anchor.set(0.5);

        this.txtRestart = game.add.text(window.innerWidth + 300, 550, 'Restart', {
            font: '30px emulogic',
            fill: '#fff'
        });
        this.txtRestart.anchor.set(.5);
        this.txtRestart.inputEnabled = true;
        this.txtRestart.events.onInputDown.add(this.retornaGame, this);

        this.txtMenu = game.add.text(window.innerWidth + 300, 600, 'Menu', {
            font: '25px emulogic',
            fill: '#fff'
        });
        this.txtMenu.anchor.set(.5);
        this.txtMenu.inputEnabled = true;
        this.txtMenu.events.onInputDown.add(this.backMenu, this);

        this.restart();

    },

    atualizarPosicaoPlayer: function (pressionado, x) {
        var a = 0;
        var v = this.player.body.velocity.x;
        if (!pressionado) {
            if (v > 0) {
                if (this.player.body.velocidadeAntiga <= 0) {
                    v = 0;
                    a = 0;
                } else {
                    a = -this.aceleracaoAndarFreio;
                }
            } else if (v < 0) {
                if (this.player.body.velocidadeAntiga >= 0) {
                    v = 0;
                    a = 0;
                } else {
                    a = this.aceleracaoAndarFreio;
                }
            }
        } else {
            // @@@
            //if (x < (this.player.body.position.x - 10)) {
            if (x <= metadeLargura) {
                if (v > 0) {
                    // Derrapando! (Poderíamos utilizar uma animação especial aqui, para mostrar a derrapagem)
                    a = -this.aceleracaoAndarFreio;
                } else {
                    a = -this.aceleracaoAndar;
                }
                // @@@
                //} else if (x > (this.player.body.position.x + 10)) {
            } else if (x > metadeLargura) {
                if (v < 0) {
                    // Derrapando! (Poderíamos utilizar uma animação especial aqui, para mostrar a derrapagem)
                    a = this.aceleracaoAndarFreio;
                } else {
                    a = this.aceleracaoAndar;
                }
            } else {
                if (v > 0) {
                    if (this.player.body.velocidadeAntiga < 0) {
                        // Força a parada!
                        a = 0;
                        v = 0;
                    } else {
                        // Ainda estamos parando
                        a = -this.aceleracaoAndarFreio;
                    }
                } else if (v < 0) {
                    if (this.player.body.velocidadeAntiga > 0) {
                        // Força a parada!
                        a = 0;
                        v = 0;
                    } else {
                        // Ainda estamos parando
                        a = this.aceleracaoAndarFreio;
                    }
                }
            }
        }

        // Utilizando player.body.onFloor() e player.body.touching.down,
        // também poderíamos criar uma animação especial para quando o
        // personagem está pulando no ar...

        if (v > 0) {
            if (this.player.body.animacaoAtual !== 1) {
                this.player.body.animacaoAtual = 1;
                this.player.animations.play("direita");
            }
        } else if (v < 0) {
            if (this.player.body.animacaoAtual !== -1) {
                this.player.body.animacaoAtual = -1;
                this.player.animations.play("esquerda");
            }
        } else {
            if (this.player.body.animacaoAtual !== 0) {
                this.player.body.animacaoAtual = 0;
                this.player.animations.play("parado");
            }
        }

        this.player.body.velocidadeAntiga = v;
        this.player.body.velocity.x = v;
        this.player.body.acceleration.x = a;
    },

    update: function () {
        var pressionado = false;
        var xPonteiro;
        if (game.input.mousePointer.isDown) {
            pressionado = true;
            xPonteiro = game.input.mousePointer.x;
        } else if (game.input.pointer1.isDown) {
            pressionado = true;
            xPonteiro = game.input.pointer1.x;
        } else if (game.input.pointer2.isDown) {
            pressionado = true;
            xPonteiro = game.input.pointer2.x;
        }

        this.atualizarPosicaoPlayer(pressionado, xPonteiro);

        var agora = game.time.now;

        if (agora >= this.horaProximoBloco) {
            this.horaProximoBloco = agora + Math.floor(Math.random() * (window.innerWidth - 0 + 1000)) + 0;
            this.aparecerBloco();
        }

        if (agora >= this.aceleracaoContador) {
            this.aceleracaoContador = agora + 50 + (100 * Math.random());
            this.score++;
        }

        this.txtScore.setText("Score: " + this.score);

        this.gravidadeBlocos += 0.4;

        for (var i = this.grupoBlocos.children.length - 1; i >= 0; i--) {
            var bloco = this.grupoBlocos.children[i];
            if (!bloco || !bloco.alive) {
                continue;
            }
            var deltaY = (bloco.y - this.y0);
            var escala = (this.mEscala * deltaY) + this.nEscala;
            bloco.x = (bloco.mDeltaX * deltaY) + bloco.nDeltaX;
            bloco.scale.setTo(escala, escala);
            if (bloco.y > this.y1) {
                if (bloco.y >= this.yKillSprite) {
                    bloco.kill();
                } else {
                    bloco.alpha = 1 - ((bloco.y - this.y1) / (this.yKillSprite - this.y1));
                }
            }
        }

        //this.atualizarPosicaoPlayer();

        game.physics.arcade.overlap(this.player, this.grupoBlocos, this.colisaoBloco, null, this);

    },

    restart: function () {

        this.score = 0;
        this.gravidadeBlocos = this.gravidadeBlocosOriginal;
        this.player.revive();
    },


    aparecerBloco: function () {
        var x = (Math.random() * (this.x0f - this.x0i)) + this.x0i;
        var y = this.y0;

        var bloco = this.grupoBlocos.getFirstDead(true, x, y, 'block');
        game.physics.arcade.enable(bloco);
        bloco.scale.setTo(this.nEscala, this.nEscala);
        bloco.body.enable = true;
        bloco.checkWorldBounds = false;
        bloco.anchor.x = 0.5;
        bloco.anchor.y = 1;
        bloco.alpha = 1;
        bloco.body.velocity.y = 0;
        bloco.body.gravity.y = this.gravidadeBlocos;
        bloco.body.maxVelocity.y = this.velocidadeMaximaBlocos;

        var xFinal = metadeLargura + ((x - metadeLargura) * this.w1 / this.w0);
        bloco.mDeltaX = (xFinal - x) / (this.y1 - this.y0);
        bloco.nDeltaX = x;
    },

    retornaGame: function () {

        game.state.start('stage');
    },

    backMenu: function () {

        game.state.start('menu');
    },

    colisaoBloco: function (player, bloco) {
        if (bloco.y < this.yHitMin || bloco.y > this.yHitMax) {
            return;
        }

        functions.newScore(this.score, sessionStorage.getItem('user_id'));
        this.player.kill();
        game.add.tween(this.txtGameOver).to({
            y: 150
        }, 500).start();
        game.add.tween(this.txtScoreTela).to({
            x: game.world.centerX
        }, 500).start();
        game.add.tween(this.txtHighScore).to({
            x: game.world.centerX
        }, 500).start();
        game.add.tween(this.txtRestart).to({
            x: game.world.centerX
        }, 500).start();
        game.add.tween(this.txtMenu).to({
            x: game.world.centerX
        }, 500).start();



        if (this.score > this.highScore) {
            this.highScore = this.score;
            game.add.tween(this.txtNovoHighScore).to({
                x: game.world.centerX
            }, 500).start();
        }

        this.txtScoreTela.text = "Score: " + this.score;
        this.txtHighScore.text = "High Score: " + this.highScore;
        this.txtScore.visible = false;

    },
};

var functions = {
    getHighScore: (data) => {
        $.ajax({
            type: 'GET',
            url: '/user/highscore/' + data,
            contentType: 'application/json; charset=utf-8',
            success: (resp) => {
                if (resp.status)
                    stageState.highScore = resp.highscore.value;
                else
                    stageState.highScore = 0;
            }
        });
    },
    newScore: (value, user_id) => {

        var datas = {
            "value": value,
            "user_id": user_id
        };

        $.ajax({
            type: 'POST',
            url: '/score/new',
            data: JSON.stringify(datas),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (resp) {
                console.log(resp);
                if (resp.status)
                    functions.getHighScore(resp.score.user_id);
            },
            error: function (err) {
                console.log(err, ' erro');
            }
        });
    },
};