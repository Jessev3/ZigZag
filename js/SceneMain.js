class MainScene extends Phaser.Scene {

    constructor() {
        super("MainScene");
    }


    preload ()
    {
        this.load.image('ball', 'img/ball.png')
    }

    create ()
    {
        // var ReallyLargeWidth = 600;
        // var ReallyLargeHeight = 1000;

        // this.game.world.setBounds(width=600, height=10000);
        this.xVelocity = 1;
        this.yVelocity = 0.6;

        this.x = 275;
        this.y = 650;
        this.width = 120;
        this.height = 130;
        this.depth = 1000;

        this.ball = this.physics.add.sprite(275, 525, 'ball');
        this.ball.scale = 0.2;
        this.ball.depth = this.depth;

        this.startingPlatform = this.add.isobox(this.x, this.y, this.width, this.height, 0x00b9f2, 0x016fce, 0x028fdf);
        this.startingPlatform.depth = this.depth - 1;

        this.platforms = this.physics.add.staticGroup();

        // this.cameras.main.setBounds(0, 0, 600, 1000);
        this.cameraSpeed = 1;
        this.cameras.main.setViewport(0, 0, 600, 0);
        
        this.createPlatforms(20);

        this.timer = this.time.addEvent({
            delay: 2000 / this.cameraSpeed,
            callback: this.createPlatforms,
            callbackScope: this,
            loop: true
        })


        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // this.input.keyboard.on('keydown-SPACE', () => {
            // this.xVelocity = 1 ? this.xVelocity = -1 : this.xVelocity = 1; 
        // }, this)


        // this.input.keyboard.on('keydown-SPACE', this.check, this);
    }

    update() {
        // Move the camera 1 pixel at a time so that the screen moves vertically
        // this.cameras.main.y += this.cameraSpeed;
        
        if(this.spaceBar.isDown) {
            this.xVelocity === 1 ? this.xVelocity = -1 : this.xVelocity = 1; 
        }

        this.ball.x += this.xVelocity;
        this.ball.y -= this.yVelocity;
       
    }

    createPlatforms(platformLength = 15) {
        for (var loop = 1; loop <= platformLength; loop++) {
            var randomInt = Math.floor(Math.random() * 2) + 1;
            if(loop % 2 !== 0) {
                for(var right = 1; right <= randomInt; right++) {
                    if(this.x + (this.width / 2) > 540) {
                        break;
                    }
                    this.x += this.width / 2;
                    this.y -= this.width / 4;
                    var platform = this.add.isobox(this.x, this.y, 120, 130, 0x00b9f2, 0x016fce, 0x028fdf);
                    platform.depth = this.depth -= 1;
                    platform.showLeft = false;
                    this.platforms.add(platform);
                }
            } else {
                for(var left = 1; left <= randomInt; left++) {
                    if(this.x - (this.width / 2) < 30) {
                        break;
                    }
                    this.x -= this.width / 2;
                    this.y -= this.width / 4;
                    var platform = this.add.isobox(this.x, this.y, 120, 130, 0x00b9f2, 0x016fce, 0x028fdf);
                    platform.depth = this.depth -= 1;
                    platform.showLeft = true;
                    platform.showRight = false;
                    this.platforms.add(platform);
                }
            }
        }
    }

    check() {
        this.xVelocity = 1 ? this.xVelocity = -1 : this.xVelocity = 1; 
    }
}