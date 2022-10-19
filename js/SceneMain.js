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
        

        // Set all vars for creating platforms
        this.x = 300;
        this.y = 650;
        this.width = 120;
        this.height = 60;
        this.depth = 1000;

        // Create ball sprite
        this.ball = this.physics.add.sprite(300, 590, 'ball');
        this.ball.scale = 0.05;
        this.ball.depth = 10000;  

        // set speed of ball
        this.xVelocity = 1;
        this.yVelocity = 0.5;

        
        // create starting platform. Which is always the same
        this.startingPlatform = this.add.isobox(this.x, this.y, this.width, this.height, 0x00b9f2, 0x016fce, 0x028fdf);
        this.startingPlatform.depth = this.depth - 1;
        this.startingPlatform.enable = true;

        // Make group to put all platforms in
        this.platforms = this.physics.add.staticGroup();
        this.platforms.add(this.startingPlatform);
        this.platformWithBall = this.startingPlatform;


        // create starting polygon to detect if ball is inside or outside the isobox
        this.graphics = this.add.graphics();
        this.polygons = []
        this.startingPolygon = new Phaser.Geom.Polygon([
            this.startingPlatform.getTopCenter().x - 60, this.startingPlatform.getTopCenter().y - 30,
            this.startingPlatform.getTopCenter().x, this.startingPlatform.getTopCenter().y - 60,
            this.startingPlatform.getTopCenter().x + 60, this.startingPlatform.getTopCenter().y - 30,
            this.startingPlatform.getTopCenter().x, this.startingPlatform.getTopCenter().y
        ]);
        this.polygons.push(this.startingPolygon);
        this.graphics.fillStyle(0x00aa00);
        this.graphics.fillPoints(this.startingPolygon.points, true); 
        this.graphics.depth = 1000;


        // set camera settings
        this.cameraSpeed = 0.6;
        this.cameras.main.setViewport(0, 0, 600, 0);
        

        // create first platforms, then every 2 seconds 15 platforms
        this.createPlatforms(20); 

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
        // this.ball.x += this.xVelocity;
        // this.ball.y -= this.yVelocity;

        // overlap or collide   

        this.polygons.forEach((polygon) => {
            if(Phaser.Geom.Polygon.Contains(polygon, this.ball.x, this.ball.y)) {
                
            } 
        })
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
                    this.createPolygon(platform);
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
                    this.createPolygon(platform);
                }
            }
        }
    }

    createPolygon(platform) {
        var polygon = new Phaser.Geom.Polygon([
            platform.getTopCenter().x - 60, platform.getTopCenter().y - 30,
            platform.getTopCenter().x, platform.getTopCenter().y - 60,
            platform.getTopCenter().x + 60, platform.getTopCenter().y - 30,
            platform.getTopCenter().x, platform.getTopCenter().y
        ]);
        this.graphics.fillStyle(0x00aa00);
        this.graphics.fillPoints(polygon.points, true); 
        this.graphics.depth = 1000;
        this.polygons.push(polygon);
    }

}