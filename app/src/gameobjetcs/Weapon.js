import { BulletGroup } from "../group/BulletGroup";

export class Weapon {
    constructor(scene, layer, ship) {
        Weapon.preload(scene)
        this.ship = ship
        this.bullets = new BulletGroup(scene, layer)
    }

    static preload(scene) {
        Weapon.sound = {
            laser: scene.sound.add('laser-gun')
        }
    }

    fire(asteroid) {
        Weapon.sound.laser.play();

        var bullet = this.bullets.get(this.ship.x, this.ship.y - 60);
        if (bullet === null) {
            // too much bullet
            return;
        }

        bullet.target(asteroid, () => {
            asteroid.onFired()
        })
    }
}