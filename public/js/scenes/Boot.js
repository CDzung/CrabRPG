export class Boot extends Phaser.Scene {
    constructor() {
        super("Boot");
    }

    preload() {
        this.load.image("tileset-jungle", "./public/assets/tilesets/jungle.png");

        this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Jura01"));
    }
}