class StartScene extends Phaser.Scene {
    constructor() {
        super("StartScene");
    }

    create() {
        
        this.input.keyboard.on('keydown', () => {
            this.scene.start("MainScene");
        })

        this.cameras.main.setBackgroundColor('#12CFF3');
        
        this.isobox = this.add.isobox(300, 500, 175, 200, 0x00b9f2, 0x016fce, 0x028fdf);
        this.title = this.add.text(300, 600, "ZigZag", {fontSize: '100px', fill: '#000', fontStyle: 'bold'});
        this.instruction = this.add.text(300, 900, "Press any key", {fontSize: '30px', fill: '#000', fontStyle: 'bold'})
        this.title.setOrigin();
        this.instruction.setOrigin();

        this.tweens.add({
            targets: this.isobox,
            height: 225,
            width: 200,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        })
    }
}