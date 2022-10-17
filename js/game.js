// window.onload = function() {
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
                gravity: { y: 0 }
            }
        },
        scene: [MainScene]
    };  
    var game = new Phaser.Game(config);
// }

//     var x;
//     var y;
//     var width;
//     var height;
//     var depth;
//     var ball;
//     var startingBox;
//     var platforms;
//     var cursors;



// function preload ()
// {
//     this.load.image('ball', 'img/ball.png')
// }

// function create ()
// {
//     // var ReallyLargeWidth = 600;
//     // var ReallyLargeHeight = 1000;

//     // this.game.world.setBounds(width=600, height=10000);

//     // random number between 1 and 3 to decide the length of the row
//     x = 275;
//     y = 1650;
//     width = 120;
//     height = 130;
//     depth = 1000;

//     ball = this.physics.add.sprite(275, 1525, 'ball');
//     ball.scale = 0.2;
//     ball.depth = depth;

//     startingBox = this.add.isobox(x, y, width, height, 0x00b9f2, 0x016fce, 0x028fdf);
//     startingBox.depth = depth - 1;

//     platforms = this.physics.add.staticGroup();

//     for (var loop = 1; loop <= 100; loop++) {
//         var randomInt = Math.floor(Math.random() * 2) + 1;
//         if(loop % 2 !== 0) {
//             for(var right = 1; right <= randomInt; right++) {
//                 if(x + (width / 2) > 540) {
//                     break;
//                 }
//                 x += width / 2;
//                 y -= width / 4;
//                 var box = this.add.isobox(x, y, 120, 130, 0x00b9f2, 0x016fce, 0x028fdf);
//                 box.depth = depth -= 1;
//                 box.showLeft = false;
//                 platforms.add(box);
//             }
//         } else {
//             for(var left = 1; left <= randomInt; left++) {
//                 if(x - (width / 2) < 30) {
//                     break;
//                 }
//                 x -= width / 2;
//                 y -= width / 4;
//                 var box = this.add.isobox(x, y, 120, 130, 0x00b9f2, 0x016fce, 0x028fdf);
//                 box.depth = depth -= 1;
//                 box.showLeft = true;
//                 box.showRight = false;
//                 platforms.add(box);
//             }
//         }
//     }
 

//     // t1.fillTop = '0x63a505';   


//     // TESTING
//     // https://labs.phaser.io/edit.html?src=src/game%20objects/shapes/iso%20box.js&v=3.55.2
//     // var t1 = this.add.isobox(150, 500, 200, 300, 0x00b9f2, 0x016fce, 0x028fdf);

//     // var t2 = this.add.isobox(250, 450, 200, 300, 0xffe31f, 0xf2a022, 0xf8d80b);

//     // var t3 = this.add.isobox(150, 400, 200, 300, 0x8dcb0e, 0x3f8403, 0x63a505);
//     // // t3.showLeft = false;
//     // t1.depth = 101;
//     // t2.depth = 2;
//     // t3.depth = 1;
//     // t3.showRight = false;
//     // t2.projection = 4;
//     // t2.showLeft = false;
//     cursors = this.input.keyboard.createCursorKeys();

// }

// function update() {
//     // this.cameras.main.y += 1;
// }

// function updateCamera() {
//     cameras.main.setScroll(0, this.cameras.main.setScrollY + 1);
// }