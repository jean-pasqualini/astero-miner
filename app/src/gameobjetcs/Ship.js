import { GameObjects } from 'phaser';
import { Weapon } from './Weapon';

export class Ship extends GameObjects.Sprite {
    static preload(scene) {
        Ship.sound = {
        }
    }

    constructor(scene, layer, x, y) {
        super(scene, x, y, 'ship')
        this.scene = scene
        this.weapon = new Weapon(scene, layer, this)
        if (layer) {
            layer.add(this)
        }
        this.setOrigin(0.5, 1)
        scene.add.existing(this)
    }


    static create(scene, layer) {
        Ship.preload(scene)
        return new Ship(scene, layer, screen.width / 2, screen.height - 10)
    }

    move(asteroid) {
        return new Promise((resolve) => {
            this.scene.tweens.add({
                targets: this,
                x: asteroid.x + (asteroid.width/2) + (this.width/2),
                duration: 100,
                ease: 'Linear',
                repeat: 0,
                onComplete: () => resolve(asteroid),
            })
        })
    }

    fire(asteroid) {
        this.weapon.fire(asteroid)  
    }
}