export class Asteroid extends Phaser.Physics.Arcade.Sprite {
    static preloaded = false;

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        this.setOrigin(0, 0)
        this.setScale(2)
        this.setInteractive()

         //this.scene.physics.moveTo(this.ship, target_x, target_y, 60*5, 500)
        this.scene.tweens.add({
            targets: this,
            x,
            y,
            duration: 400,
            ease: 'Linear',
            repeat: 0
        })

        this.on('animationcomplete', this.destroy, this);

        this.once('pointerdown', () => {
            this.scene.trigger('game:asteroid:touch', this)
        })

        return this
    }

    onPhysicsReady() {
        this.body.setSize(32, 32, 32, 32);
    }

    static preload(scene) {
        if (Asteroid.preloaded) {
            return;
        }
        Asteroid.preloaded = true

        Asteroid.sound = {
            explosion: scene.sound.add('explosion'),
            rumble: scene.sound.add('rumble'),
        }
 
       scene.anims.create({
            key: 'explode',
            frames: scene.anims.generateFrameNumbers('asteroid', { start: 0, end: 7 }),
            frameRate: 10,
        })
    }

    onFired() {
        Asteroid.sound.rumble.play({
            volume: 5
        });
        this.scene.tweens.add({
            targets: this,
            x: this.x + 10,
            y: this.y + 10,
            duration: 50,
            ease: 'Linear',
            repeat: 4, // Répéter le tween 5 fois pour un effet de secousse
            yoyo: true, // Revenir à la position d'origine
            onComplete: () => {
                Asteroid.sound.rumble.stop();
                Asteroid.sound.explosion.play();
                this.anims.play('explode');
                
                this.scene.trigger('game:asteroid:destroy', this)
            }
        });
    }
}