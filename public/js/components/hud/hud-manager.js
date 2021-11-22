import { Player } from "../player.js";

export class HudManager extends Phaser.Scene {
    constructor() {
        super({ key: "HudManager", active: true, visible: true });
    }

    setPlayer(player) {
        if (player instanceof Player) this.player = player;
    }

    preload() {
        this.load.image("hud-status-bar", "./public/assets/hud/status-bar.png");
        this.load.image("hud-enemy-hp", "./public/assets/hud/enemy-hp.png");
    }

    create() {
        this.add.image(30, 30, "hud-status-bar").setScale(2.7).setOrigin(0);
        this.hp_bar = this.add.rectangle(128, 38, 0, 16).setOrigin(0).setFillStyle(0xff0000, 0.5);
        this.mana_bar = this.add.rectangle(128, 65, 0, 16).setOrigin(0).setFillStyle(0x0000ff, 0.5);
        this.stamina_bar = this.add.rectangle(128, 92, 0, 16).setOrigin(0).setFillStyle(0x00ff00, 0.5);
        this.level_txt = this.add.text(73, 73, "", { color: "#d27d2c", stroke: "gold", strokeThickness: 1, fontSize: 30, align: "center" }).setOrigin(0.5, 0.5);
    }

    update(params) {
        if (this.player) {
            this.hp_bar.setSize(140 * (this.player.stats.cur.hp / this.player.stats.max.hp), 16);
            this.mana_bar.setSize(140 * (this.player.stats.cur.hp / this.player.stats.max.hp), 16);
            this.stamina_bar.setSize(140 * (this.player.stats.cur.hp / this.player.stats.max.hp), 16);
            this.level_txt.setText("99");
        }
    }
}