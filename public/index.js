import { Boot } from "./js/scenes/Boot.js";
import { Jura01 } from "./js/scenes/Jura-01.js";

window.addEventListener("load", () => {
    const game = new Phaser.Game({
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
            parent: 'game-canvas',
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 1366,
            height: 768
        },
        audio: {
            disableWebAudio: true
        },
        physics: {
            default: "arcade",
            arcade: {
                fps: 60,
                gravity: {},
                debug: true
            }
        },

        scene: [Boot, Jura01]
    });
});