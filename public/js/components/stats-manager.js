import { Stats } from "./stats.js";

export class StatsManager {
    constructor({ hp, atk, def, critRate, critDamage, speed, runRatio, walkRatio }) {
        this.max = new Stats({ hp, atk, def, critRate, critDamage, speed, runRatio, walkRatio });
        this.cur = new Stats({ hp, atk, def, critRate, critDamage, speed, runRatio, walkRatio });
    }

    get isdead() {
        return this.cur.hp <= 0;
    }

    get isalive() {
        return !this.isdead;
    }
}