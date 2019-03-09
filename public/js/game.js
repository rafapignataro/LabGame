var larguraPadrao = 500;
var alturaPadrao = 626;
var largura = 0;
var altura = 0;

(function () {
  var larguraNova = larguraPadrao * window.innerHeight / alturaPadrao;
  var alturaNova = alturaPadrao * window.innerWidth / larguraPadrao;
  if (larguraNova <= larguraPadrao) {
    largura = larguraNova;
    altura = window.innerHeight;
  } else {
    largura = window.innerWidth;
    altura = alturaNova;
  }
})();

var metadeLargura = largura * 0.5;

var game = new Phaser.Game(largura, altura, Phaser.CANVAS);


(function () {
  if (altura < window.innerHeight) {
    document.body.style.paddingTop = ((window.innerHeight - altura) * 0.5) + "px";
  }
})();

/* ESTADOS DO GAME */

// game.state.add(identity, state); tudo global nesse caraio
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('stage', stageState);
game.state.add('end', endState);

game.state.start('boot'); // inicio do game
