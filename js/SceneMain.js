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
        this.test = true;
        this.xVelocity = 1;
        this.yVelocity = 0.6;

        this.x = 275;
        this.y = 650;
        this.width = 120;
        this.height = 130;
        this.depth = 1000;

        this.ball = this.physics.add.sprite(275, 525, 'ball');
        this.ball.scale = 0.2;
        this.ball.depth = this.depth; // change to this.depth

        
        this.startingPlatform = this.add.isobox(this.x, this.y, this.width, this.height, 0x00b9f2, 0x016fce, 0x028fdf);
        this.startingPlatform.depth = this.depth - 1;
        this.startingPlatform.enable = true;
        this.platforms = this.physics.add.staticGroup();
        
        // this.startingRectangle = this.add.rectangle(this.x, this.y - 120, 100, 100, 0x016fce);
        // this.startingRectangle.depth = 1001;
        // this.startingRectangle.angle = 45;
        // this.startingRectangle.scaleX = 0.8;
        // this.startingRectangle.scaleY = 0.8;
        // this.rectangles = this.physics.add.staticGroup();


        this.cameraSpeed = 0.6;
        this.cameras.main.setViewport(0, 0, 600, 0);
        
        this.createPlatforms(20); //aanpassen

        this.timer = this.time.addEvent({
            delay: 2000 / this.cameraSpeed, //aanpassen
            callback: this.createPlatforms,
            callbackScope: this,
            loop: true
        })

        

        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.input.keyboard.on('keydown-SPACE', () => {
            this.xVelocity == 1 ? this.xVelocity = -1 : this.xVelocity = 1; 
        }, this)

       
        console.log(this.ball.body.touching);

    }

    update() {
        this.cameras.main.y += this.cameraSpeed;
        this.ball.x += this.xVelocity;
        this.ball.y -= this.yVelocity;

        // overlap or collide   
        this.physics.add.collider(
            this.ball,
            this.platforms,
            this.check,
            null,
            this
          );

        
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
                    // platform.showLeft = false;
                    // platform.showRight = false;

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
                    // platform.showLeft = false;
                    // platform.showRight = false;
                    this.platforms.add(platform);
                }
            }
        }
    }

    check() {
        
        // console.log(this.ball.body.touching);
        
    }


}