export class Stats {
    hp;
    atk;
    def;

    critRate;
    critDamage;

    speed;
    runRatio;
    walkRatio;

    constructor({ hp, atk, def, critRate, critDamage, speed, runRatio, walkRatio }) {
        Object.assign(this, { hp, atk, def, critRate, critDamage, speed, runRatio, walkRatio });
    }
}