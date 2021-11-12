import { Player } from "./player.js";

export class BasicCrab extends Player {
    static preload(scene) {
        if (scene instanceof Phaser.Scene) {
            scene.load.spritesheet("spritesheet-basic-crab", "./public/assets/player/basic-crab/basic-crab.png", {
                frameWidth: 32,
                frameHeight: 32
            });
        }
    }

    create_anims() {
        this.animations.idle = this.scene.anims.create({
            key: "basic-crab-idle",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers("spritesheet-basic-crab", { start: 0, end: 3 })
        });

        this.animations.move = this.scene.anims.create({
            key: "basic-crab-move",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers("spritesheet-basic-crab", { start: 4, end: 7 })
        });

        this.animations.die = this.scene.anims.create({
            key: "basic-crab-die",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers("spritesheet-basic-crab", { start: 0, end: 3 })
        });

        this.animations.attack = this.scene.anims.create({
            key: "basic-crab-attack",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers("spritesheet-basic-crab", { start: 0, end: 3 })
        });

        return this;
    }
}