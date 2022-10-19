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
        this.offsetLeft = 710;
        this.offsetRight = 410;

        this.xVelocity = 1;
        this.yVelocity = 0.5;

        this.x = 300;
        this.y = 650;
        this.width = 120;
        this.height = 60;
        this.depth = 1000;

        this.ball = this.physics.add.sprite(300, 590, 'ball');
        this.ball.scale = 0.05;
        this.ball.depth = this.depth;  

        
        this.startingPlatform = this.add.isobox(this.x, this.y, this.width, this.height, 0x00b9f2, 0x016fce, 0x028fdf);
        this.startingPlatform.depth = this.depth - 1;
        this.startingPlatform.enable = true;

        this.platforms = this.physics.add.staticGroup();
        this.platforms.add(this.startingPlatform);
        this.platformWithBall = this.startingPlatform;

        this.cameraSpeed = 0.6;
        this.cameras.main.setViewport(0, 0, 600, 0);
        
        this.createPlatforms(2); //aanpassen

        // this.timer = this.time.addEvent({
        //     delay: 2000 / this.cameraSpeed, //aanpassen
        //     callback: this.createPlatforms,
        //     callbackScope: this,
        //     loop: true
        // })

        

        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.input.keyboard.on('keydown-SPACE', () => {
            this.xVelocity == 1 ? this.xVelocity = -1 : this.xVelocity = 1; 
        }, this)
    

    }

    update() {
        // this.cameras.main.y += this.cameraSpeed;
        this.ball.x += this.xVelocity;
        this.ball.y -= this.yVelocity;

        // overlap or collide   

        this.platforms.children.each((platform) => {
            if(this.ball.x > platform.getTopCenter().x -60 && this.ball.x < platform.getTopCenter().x + 60) {
                if(this.ball.y < platform.getTopCenter().y && this.ball.y > platform.getTopCenter().y - 60) {
                    this.platformWithBall = platform;
                }
            }
            
            // var leftLine = -0.5 * this.ball.x + this.offsetLeft;
            // var rightLine = 0.5 * this.ball.x + this.offsetRight;
            // this.offsetLeft -= 60;
            // this.offsetRight -= 60; 

            // if(this.ball.y >= rightLine || this.ball.y >= leftLine) {
            //     this.platformWithBall = platform;
            //     console.log(this.platformWithBall.getData("test"));
            // }

            
        })

    
        if(this.ball.x > this.platformWithBall.getTopCenter().x + 60 && this.ball.y < this.platformWithBall.getTopCenter().y - 30 || this.ball.y < this.platformWithBall.getTopCenter().y -60) {
            this.ball.body.gravity.y = 5000;
            this.ball.depth = 0;
        }

        if(this.ball.x < this.platformWithBall.getTopCenter().x - 60 && this.ball.y < this.platformWithBall.getTopCenter().y - 30 || this.ball.y < this.platformWithBall.getTopCenter().y -60) {
            this.ball.body.gravity.y = 5000;
            this.ball.depth = 0;
        }

        // if(this.ball.y < this.platformWithBall.data.values.rightLine || this.ball.y < this.platformWithBall.data.values.leftLine) {
        //     this.ball.body.gravity.y = 5000;
        //     this.ball.depth = 0;
        // }

        // switch case ? die kijkt welke kan geen aanliggend platform heeft 
    }

    createPlatforms(platformLength = 15) {
        for (var loop = 1; loop <= platformLength; loop++) {
            this.loopIteration = loop;
            var randomInt = Math.floor(Math.random() * 2) + 1;
            if(loop % 2 !== 0) {
                for(var right = 1; right <= randomInt; right++) {
                    if(this.x + (this.width / 2) > 540) {
                        break;
                    }
                    this.x += this.width / 2;
                    this.y -= this.width / 4;

                    var platform = this.add.isobox(this.x, this.y, this.width, this.height, 0x00b9f2, 0x016fce, 0x028fdf);
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

                    var platform = this.add.isobox(this.x, this.y, this.width, this.height, 0x00b9f2, 0x016fce, 0x028fdf);
                    platform.depth = this.depth -= 1;
                    platform.showLeft = true;
                    platform.showRight = false;

                    this.platforms.add(platform);
                }
            }
        }
    }



}