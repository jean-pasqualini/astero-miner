import { Scene } from 'phaser';
import config from "../../config.json"
import {Logger, LogLevel} from "../libs/logger"
import { CommonUI } from '../ui/common';

const logger = new Logger(config.level, "MainMenu")

let mute_state = false;

const mid_screen = screen.width/2;

function setSelfCenter(obj) {
    obj.setX(obj.x - obj.width/2)
}

console.log(window.test)

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
        logger.log(LogLevel.DEBUG, "init")
    }

    create ()
    {
        this.sound.play('titleMusic', { loop: true, volume: 0.1 })
        this.add.image(0, 0, 'space-background').setOrigin(0, 0);

        let logo_planet = this.add.image(mid_screen, 50, 'terran').setOrigin(0, 0);
        setSelfCenter(logo_planet)

        let logo_text = this.add.text(mid_screen, 375, 'AsteroMiner', {
            fontFamily: 'Josefin Slab',
            fontSize: 58,
            color: '#ffffff',
            align: 'center',
        }).setOrigin(0.5, 0.5);

        this.commonUI = new CommonUI(this);
        this.commonUI.build();
        this.createStartButton();
        this.createFullscreenButton();
    }

    createStartButton() {
       const startButton = this.add.text(mid_screen, 500, 'Click to start', {
            fontFamily: 'Josefin Slab',
            fontSize: 44,
            color: '#ffffff',
            align: 'center'
       }).setOrigin(0.5);
        startButton.setInteractive();
        startButton.once("pointerdown", ()=>{
            this.scene.start("Game")
        })
    }

    createFullscreenButton() {
        const enterFullscreen = 'Press to full screen'
        const exitFullscreen = 'Press to exit full screen'

        const fullScreenBTN = this.add.text(mid_screen, 550, enterFullscreen, {
            fontFamily: 'Josefin Slab',
            fontSize: 20,
            color: '#d1d1d1',
            align: 'center'
        }).setOrigin(0.5);
        let animation = this.tweens.add({
            targets: fullScreenBTN,
            alpha: 0,
            duration: 1000,
            ease: 'Linear',
            yoyo: true,
            repeat: -1,
        })

        fullScreenBTN.setInteractive();
        fullScreenBTN.on('pointerdown', () => {
            if (navigator.userActivation.isActive) {
                if (document.fullscreenElement) {
                    document.exitFullscreen()
                    fullScreenBTN.setText(enterFullscreen)
                } else {
                    // proceed to request playing media, for example
                    document.body.requestFullscreen();
                    animation.stop()
                    fullScreenBTN.setAlpha(1)
                    fullScreenBTN.setText(exitFullscreen)
                }
            }
        });
    }
}
