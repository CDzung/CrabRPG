import { BasicCrab } from "../components/basic-crab.js";
import { Entity } from "../components/entity.js";

export class Jura01 extends Phaser.Scene {
    constructor() {
        super("Jura01");
    }

    preload() {
        this.load.tilemapTiledJSON("jura-01", "./public/assets/tilemaps/jura-01.json");
        BasicCrab.preload(this);
    }

    create() {
        const map = this.add.tilemap("jura-01");
        const tileset_jungle = map.addTilesetImage("jungle", "tileset-jungle");

        const layers = {
            "Ground": map.createLayer("Ground", [tileset_jungle]),
            "TL1": map.createLayer("TL1", [tileset_jungle]),
            "TL2": map.createLayer("TL2", [tileset_jungle]),
        }

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
    }

    update(params) {
        Entity.instances.forEach(value => value.update(params));
    }
}