export class Bullet extends Phaser.Physics.Arcade.Sprite {
    static preloaded = false;

    static preload(scene) {
        if (Bullet.preloaded) {
            return;
        }
        Bullet.sound = {
        }
    }

    target(asteroid, onCollide) {
        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.body.world.on('worldbounds', function () {
            this.destroy();
        });
        this.body.setSize(10, 10);

        const yAsteroidCenter = asteroid.y + (asteroid.height / 2)
        
        this.scene.physics.add.collider(this, asteroid, () => {
            onCollide();
            this.destroy()
        }, null, this);

        this.scene.physics.accelerateTo(this, this.x, yAsteroidCenter, 60 * 20)
    }


}