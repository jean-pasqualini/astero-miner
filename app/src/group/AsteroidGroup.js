import { Asteroid } from "../gameobjetcs/Asteroid";

export class AsteroidGroup {
    constructor(scene) {
        Asteroid.preload(scene)
        this.scene = scene
        this.group = this.scene.physics.add.group({
            classType: Asteroid,
            defaultKey: 'asteroid',
            maxSize: 3,
            defaultFrame: 1,
        });
        this.create()
    }

    create() {
        for (var i = 0; i < 3; i++) {
            this.placeAsteroid()
        }
    }

    placeAsteroid() {
        var x = Phaser.Math.Between(0, screen.width - 200) + ((Math.random() * 100));
        var y = Phaser.Math.Between(0, screen.height - 400) + ((Math.random() * 100));

        var asteroid = this.group.get(x, y)
        if (asteroid === null) {    
            // too much asteroid
            return;
        }

        this.group.add(asteroid)
        asteroid.onPhysicsReady()
        asteroid.on('animationcomplete', function (animation, frame) {
            asteroid.destroy();
            this.placeAsteroid()
        }, this);
    }
}