export class Stats {
    hp;
    atk;
    def;

    critRate;
    critDamage;

    speed;
    runRatio;
    walkRatio;

    get HealthPoint() {
        return this.hp > 0 ? this.hp : 0;
    }

    constructor({ hp, atk, def, critRate, critDamage, speed, runRatio, walkRatio }) {
        Object.assign(this, { hp, atk, def, critRate, critDamage, speed, runRatio, walkRatio });
    }
}