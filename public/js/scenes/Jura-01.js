import { BasicCrab } from "../components/basic-crab.js";
import { Entity } from "../components/entity.js";
import { GameScene } from "../components/game-scene.js";
import { HudManager } from "../components/HUD/hud-manager.js";

export class Jura01 extends GameScene {
    constructor() {
        super("Jura01");
    }

    preload() {
        this.load.tilemapTiledJSON("jura-01", "./public/assets/tilemaps/jura-01.json");
        BasicCrab.preload(this);
    }

    create() {
        this.player = new BasicCrab(this, 0, 0, {
            hp: 20000,
            atk: 1600,
            def: 920,
            critRate: 0.05,
            critDamage: 2.00,
            speed: 50,
            walkRatio: 0.5,
            runRatio: 1.3
        });

        this.scene.get("HudManager")?.setPlayer(this.player);
        

        window.player = this.player;

        const map = this.add.tilemap("jura-01");
        const tileset_jungle = map.addTilesetImage("jungle", "tileset-jungle");

        this.layers = {
            "Ground": map.createLayer("Ground", [tileset_jungle]).setDepth(this.player.depth - 2),
            "TL1": map.createLayer("TL1", [tileset_jungle]).setDepth(this.player.depth - 1),
            "TL2": map.createLayer("TL2", [tileset_jungle]).setDepth(this.player.depth + 1),
        }

        this.physics.add.collider(this.player, this.createCollisionOnLayer(this.layers.Ground));
        this.physics.add.collider(this.player, this.createCollisionOnLayer(this.layers.TL1));
        this.physics.add.collider(this.player, this.createCollisionOnLayer(this.layers.TL2));

    }

    update(params) {
        Entity.instances.forEach(value => value.update(params));

        if (this.player.stats.cur.hp > 1) this.player.stats.cur.hp -= 100;
    }
}
