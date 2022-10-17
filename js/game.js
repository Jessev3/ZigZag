var config = {
    type: Phaser.AUTO,
    width: 600,
    height: 1000,
    backgroundColor: '#ffffff',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.autoCenter
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('ball', 'img/ball.png')
}

function create ()
{
    // this.game.physics.startSystem(Phaser.Physics.ARCADE);
    // random number between 1 and 3 to decide the length of the row
    var x = 275;
    var y = 650;
    var width = 120;
    var height = 130;
    var depth = 1000;
    var ball = this.add.image(275, 525, 'ball');
    ball.scale = 0.2;
    ball.depth = depth;
    var startingBox = this.add.isobox(x, y, width, height, 0x00b9f2, 0x016fce, 0x028fdf);
    startingBox.depth = depth - 1;

    for (var loop = 1; loop <= 20; loop++) {
        var randomInt = Math.floor(Math.random() * 2) + 1;
        if(loop % 2 !== 0) {
            for(var right = 1; right <= randomInt; right++) {
                if(x + (width / 2) > 540) {
                    break;
                }
                x += width / 2;
                y -= width / 4;
                var box = this.add.isobox(x, y, 120, 130, 0x00b9f2, 0x016fce, 0x028fdf);
                box.depth = depth -= 1;
                box.showLeft = false;
            }
        } else {
            for(var left = 1; left <= randomInt; left++) {
                if(x - (width / 2) < 30) {
                    break;
                }
                x -= width / 2;
                y -= width / 4;
                var box = this.add.isobox(x, y, 120, 130, 0x00b9f2, 0x016fce, 0x028fdf);
                box.depth = depth -= 1;
                box.showLeft = true;
                box.showRight = false;
            }
        }
        
        
    }
 

    // t1.fillTop = '0x63a505';   


    // TESTING
    // https://labs.phaser.io/edit.html?src=src/game%20objects/shapes/iso%20box.js&v=3.55.2
    // var t1 = this.add.isobox(150, 500, 200, 300, 0x00b9f2, 0x016fce, 0x028fdf);

    // var t2 = this.add.isobox(250, 450, 200, 300, 0xffe31f, 0xf2a022, 0xf8d80b);

    // var t3 = this.add.isobox(150, 400, 200, 300, 0x8dcb0e, 0x3f8403, 0x63a505);
    // // t3.showLeft = false;
    // t1.depth = 101;
    // t2.depth = 2;
    // t3.depth = 1;
    // t3.showRight = false;
    // t2.projection = 4;
    // t2.showLeft = false;
    var cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    if (cursors.up.isDown)
    {
        game.camera.y -= 4;
    }
}