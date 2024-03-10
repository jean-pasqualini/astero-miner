import { Ship } from "../gameobjetcs/Ship";
import { AsteroidGroup } from "../group/AsteroidGroup";
import { BulletGroup } from "../group/BulletGroup";

export class GameComponent {
    constructor(scene) {
        this.scene = scene;

        this.layers = {
            back: this.scene.add.layer().setDepth(1),
            front: this.scene.add.layer().setDepth(0)
        }
        this.groups = {
            asteroid: new AsteroidGroup(scene),
            bullets: new BulletGroup(scene, this.layers.back)
        }
        this.objets = {
            money: this.scene.money(this.layers.front, 0, 0),
            ship: Ship.create(scene, this.layers.front),
        }
        this.sounds = {
            background: this.scene.sound.add('game-1'),
        }

        this.sounds.background.play();

        this.scene.physics.world.on('collide', function () {
            object.setVelocity(0, 0); // Arrêter la vélocité de l'objet
        });

        this.run()
    }

    run() {
        this.scene.listen('game:asteroid:touch', (asteroid) => {
            this.objets.ship.move(asteroid)
            .then((asteroid) => this.objets.ship.fire(asteroid))
        })

        this.scene.listen('game:asteroid:destroy', () => this.objets.money.increase())
    }
}