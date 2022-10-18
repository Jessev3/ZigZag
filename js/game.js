
var config = {
    type: Phaser.AUTO,
    width: 600,
    height: 1000,
    backgroundColor: '#ffffff',
    scale: {
        // mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.autoCenter
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0}
        },
        matter: {
            debug: true,
            gravity: {y: 0}
        }
    },
    scene: [MainScene]
};  
var game = new Phaser.Game(config);