class MainScene extends Phaser.Scene {

    constructor() {
        super("MainScene");
    }


    preload ()
    {
        this.load.image('ball', 'img/ball.png');
        this.load.image('platformPowerup', 'img/platformPowerup.png');
    }

    create ()
    {
        // make powerup sprite
        this.platformPowerup = this.physics.add.sprite(390, 560, 'platformPowerup');
        this.platformPowerups = this.physics.add.group();
        this.platformPowerup.scale = 0.1;
        this.platformPowerup.depth = 100000;
        this.platformPowerups.add(this.platformPowerup);


        this.gameStarted = false;
        this.isOnPlatform = true;

        // Set all vars for creating platforms
        this.x = 300;
        this.y = 650;
        this.width = 120;
        this.height = 60;
        this.depth = 1000;

        // Create ball sprite
        this.ball = this.physics.add.sprite(300, 590, 'ball');
        this.ball.scale = 0.2;
        this.ball.depth = 10000;  

        // set speed of ball
        this.xVelocity = 1.1;
        this.yVelocity = 0.6;

        
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
        this.polygons = [];
        this.startingPolygon = new Phaser.Geom.Polygon([
            this.startingPlatform.getTopCenter().x - 60, this.startingPlatform.getTopCenter().y - 30,
            this.startingPlatform.getTopCenter().x, this.startingPlatform.getTopCenter().y - 60,
            this.startingPlatform.getTopCenter().x + 60, this.startingPlatform.getTopCenter().y - 30,
            this.startingPlatform.getTopCenter().x, this.startingPlatform.getTopCenter().y
        ]);
        this.polygons.push(this.startingPolygon);

        // set camera settings
        this.cameraSpeed = this.yVelocity;
        this.cameras.main.setViewport(0, 0, 600, 0);
        

        // create first platforms, then every 2 seconds 15 platforms
        this.createPlatforms(20); 
        this.timer = this.time.addEvent({
            delay: 2000 / this.cameraSpeed, //aanpassen
            callback: this.createPlatforms,
            callbackScope: this,
            loop: true
        })
        


        // Create score text
        this.score = 0;
        this.scoreText = this.add.text(30, 30, this.score, {fontSize: '32px', fill: '#000'})
        this.scoreText.fixedToCamera = true;
        this.scoreText.depth = this.depth + 1;
        this.passedPlatforms = [];

        // Create highscore text and get highscore from localstorage
        if(localStorage.getItem("ZigZagHighscore") !== null) {
            this.highscore = parseInt(localStorage.getItem("ZigZagHighscore"));
        } else {
            this.highscore = 0;
        }
        this.highscoreText = this.add.text(300, 700, "Your highscore is: " + this.highscore.toString(), {fontSize: '32px', fill: '#000', fontStyle: 'bold'});
        this.highscoreText.setOrigin();
        this.highscoreText.depth = this.depth * 2;

        // Create start text
        this.startText = this.add.text(300, 500, "Press SPACE to start!", {fontSize: '40px', fill: '#000', fontStyle: 'bold'})
        this.startText.setOrigin();
        this.startText.depth = this.depth * 2;


        // If space is pressed, change horizontal direction of ball
        this.spaceBar = this.input.keyboard.addKey("SPACE");
        this.spaceBar.on('down', () => {
            if(this.gameStarted) {
                // If velocity is positive, make it negative and vice versa
                Math.sign(this.xVelocity) == 1 ? this.xVelocity = -Math.abs(this.xVelocity) : this.xVelocity = Math.abs(this.xVelocity); 
                this.addPoints();
            } else {
                this.startGame();
            }
        })


        // Execute the powerup if there is a collision between ball and powerup
        this.physics.add.collider(this.ball, this.platformPowerups, () => {
            this.platformPowerups.getFirst(true).destroy();
            this.makePlatformBreed();
        })
    }

    update() {
        // move the camera, ball and scoretext
        if(this.gameStarted) {
            this.cameras.main.y += this.cameraSpeed;
            this.ball.x += this.xVelocity;
            this.ball.y -= this.yVelocity;
            this.scoreText.y -= this.yVelocity;
        



            // Check each polygon if the ball is on platform, if it is -> add to passedPlatform array     
            this.polygons.forEach((polygon) => {
                if(Phaser.Geom.Polygon.Contains(polygon, this.ball.x, this.ball.y)) {
                    this.passedPlatforms.push(polygon);
                } 
            }) 

            if(this.passedPlatforms.length > 3) {
                console.log(this.platforms.getLength());
            }
                
            if(!Phaser.Geom.Polygon.Contains(this.passedPlatforms[this.passedPlatforms.length - 1], this.ball.x, this.ball.y)) {
                this.ball.body.gravity.y = 1000;
                this.ball.depth = 0;
                // this.xVelocity = 0;
                this.restart();
            }

        }

    }

    createPlatforms(amountOfPlatforms = 15) {
        for (var loop = 1; loop <= amountOfPlatforms; loop++) {
            var randomInt = Math.floor(Math.random() * 2) + 1;
            if(loop % 2 !== 0) {
                for(var right = 1; right <= randomInt; right++) {
                    // check if platform doesnt spawn outside bounds
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



                    /////////////////////////////////////////
                    this.newPowerup = this.physics.add.sprite(platform.getTopCenter().x, platform.getTopCenter().y -= 30, 'platformPowerup');
                    this.newPowerup.depth = 100000;
                    this.newPowerup.scale = 0.1;
                    this.platformPowerups.add(this.newPowerup);

                    
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
        this.polygons.push(polygon);
    }

    addPoints() {
        this.score += 1;
        this.scoreText.text = this.score;
    }

    speedUp() {
        this.xVelocity += 1;
        this.yVelocity += 1;
    }

    startGame() {
        this.highscoreText.destroy();
        this.startText.destroy();
        this.gameStarted = true;
    }

    restart() {
        this.gameStarted = false;
        if(this.score > this.highscore) {
            localStorage.setItem("ZigZagHighscore", this.score);
        }

        setTimeout(() => {
            this.scene.restart();
        }, 2000)
    }

    makePlatformBreed() {
        this.platforms.children.each((platform) => {
            platform.width = 200;
        }, this);


        this.polygons.forEach((polygon) => {
            var currentPoints = Phaser.Geom.Polygon.GetPoints(polygon, 4);
            currentPoints[0].x -= 40;
            currentPoints[1].y -= 10;
            currentPoints[3].y += 10;
            currentPoints[2].x += 40;
            polygon.setTo(currentPoints);
            // console.log(Phaser.Geom.Polygon.GetPoints(polygon, 4));
        })
    }

    spawnPowerup(platform) {
        setInterval(() => {
            this.newPowerup = this.physics.add.sprite(platform.getTopCenter().x, platform.getTopCenter().y, 'platformPowerup');
            this.newPowerup.depth = 100000;
            this.newPowerup.scale = 0.1;
            this.platformPowerups.add(this.newPowerup);
        }, 1000)
    }
}