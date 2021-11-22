import { Entity } from './entity.js';

export class Player extends Entity {

    constructor(scene, x, y, { hp, atk, def, critRate, critDamage, speed, runRatio, walkRatio }) {
        super(scene, x, y, null, { hp, atk, def, critRate, critDamage, speed, runRatio, walkRatio });

        // animations
        this.animations = { idle: null, move: null, die: null, attack: null };
        this.create_anims();

        // camera
        this.cameras = {
            "get": this.scene.cameras.getCamera(""),

            "zoom": 4,
            "zoomSpeed": 2,
            "currentZoom": 3,
            "smoothSpeed": 0.07,
            "zoomRange": { min: 1.5, max: 4 },

            "dummy": this.scene.physics.add.sprite(x, y, null).setVisible(false).setBodySize(1, 1),
            "followSpeed": 2
        };

        this.cameras.get.startFollow(this.cameras.dummy);

        this.scene.input.addListener(Phaser.Input.Events.POINTER_WHEEL, ({ deltaY }) => {
            this.cameras.zoom -= this.cameras.zoomSpeed * deltaY * 0.001;
            if (this.cameras.zoom < this.cameras.zoomRange.min) this.cameras.zoom = this.cameras.zoomRange.min;
            if (this.cameras.zoom > this.cameras.zoomRange.max) this.cameras.zoom = this.cameras.zoomRange.max;
        });

        // skills cooldown manager
        this.cooldown = {
            "normal": {
                "max": 1000,
                "cur": 0
            },
            "skill": {
                "max": 0,
                "cur": 0
            },
            "burst": {
                "max": 0,
                "cur": 0
            }
        };

        this.scene.time.addEvent({
            delay: 100,
            callbackScope: this,
            callback: () => {
                if (!this.isNormalAttackAble) this.cooldown.normal.cur += 100;
                if (!this.isSkillAble) this.cooldown.skill.cur += 100;
                if (!this.isBurstAble) this.cooldown.burst.cur += 100;
            },
            loop: -1
        });

        // inputs
        this.controller = {
            "up": this.scene.input.keyboard.addKey("W"),
            "left": this.scene.input.keyboard.addKey("A"),
            "down": this.scene.input.keyboard.addKey("S"),
            "right": this.scene.input.keyboard.addKey("D"),
            "walk": this.scene.input.keyboard.addKey("U"),
            "run": this.scene.input.keyboard.addKey("I"),
            "normal": this.scene.input.keyboard.addKey("J"),
            "skill": this.scene.input.keyboard.addKey("K"),
            "burst": this.scene.input.keyboard.addKey("L"),
        };
    }

    create_anims() {
        return this;
    }

    get isNormalAttackAble() {
        return this.cooldown.normal.cur >= this.cooldown.normal.max;
    }

    get isSkillAble() {
        return this.cooldown.skill.cur >= this.cooldown.skill.max;
    }

    get isBurstAble() {
        return this.cooldown.burst.cur >= this.cooldown.burst.max;
    }

    update(params) {
        super.update(params);

        if (this.stats.isalive) {
            // movement
            let vec = { x: 0, y: 0, mul(value) { this.x *= value; this.y *= value; } };
            if (this.controller.up.isDown) vec.y -= 1;
            if (this.controller.down.isDown) vec.y += 1;
            if (this.controller.left.isDown) vec.x -= 1;
            if (this.controller.right.isDown) vec.x += 1;

            if (this.controller.walk.isDown) {
                vec.mul(this.stats.cur.walkRatio);
            }

            if (this.controller.run.isDown) {
                vec.mul(this.stats.cur.runRatio);
            }

            vec.mul(this.stats.cur.speed);

            this.body.setVelocity(vec.x, vec.y);

            // play animations

            if (vec.x * vec.x + vec.y * vec.y > 0.1) {
                this.play(this.animations.move, true);
                if (vec.x < 0) this.setFlipX(true);
                else if (vec.x > 0) this.setFlipX(false);
            } else {
                this.play(this.animations.idle, true);
            }


            if (this.isNormalAttackAble && this.controller.normal.isDown) {
                this.play(this.animations.attack, true);
                this.cooldown.normal.cur = 0;
            }

        } else {
            this.body.setVelocity(0, 0);
            this.play(this.animations.die, true);
        }


        // smooth camera
        if (Math.abs(this.cameras.dummy.x - this.x) + Math.abs(this.cameras.dummy.y - this.y) > 0.1) {
            this.cameras.dummy.setVelocity(
                -(this.cameras.dummy.x - this.x) * this.cameras.followSpeed,
                -(this.cameras.dummy.y - this.y) * this.cameras.followSpeed
            );
        }

        if (Math.abs(this.cameras.currentZoom - this.cameras.zoom) > 0.1)
            this.cameras.currentZoom += (this.cameras.zoom - this.cameras.currentZoom) * this.cameras.smoothSpeed;

        this.cameras.get.setZoom(this.cameras.currentZoom);
    }
}