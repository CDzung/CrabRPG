import { StatsManager } from "./stats-manager.js";

export class Entity extends Phaser.GameObjects.Sprite {
    static instances = [];

    constructor(scene, x, y, texture, { hp, atk, def, critRate, critDamage, speed, runRatio, walkRatio }) {
        if (scene instanceof Phaser.Scene) {
            super(scene, x, y, texture);
            scene.add.existing(this);
            scene.physics.add.existing(this);
            this.stats = new StatsManager({ hp, atk, def, critRate, critDamage, speed, runRatio, walkRatio });

            Entity.instances.push(this);
        }
    }

    destroy(fromScene) {
        super.destroy(fromScene);
        Entity.instances = Entity.instances.filter((value, index, array) => value != this);
    }
}