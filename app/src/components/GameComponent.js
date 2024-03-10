export class GameComponent {
    constructor(scene) {
        this.scene = scene;

        this.shipLayer = this.scene.add.layer();
        this.shipLayer.setDepth(1);
        this.asteroidLayer = this.scene.add.layer();
        this.asteroidLayer.setDepth(0);

        this.ship = this.scene.physics.add.sprite(screen.width / 2, screen.height - 10, 'ship');
        this.ship.setOrigin(0.5, 1)
        this.shipLaserSound = this.scene.sound.add('laser-gun');
        this.scene.sound.add('game-1').play();
        this.explosion = this.scene.sound.add('explosion');
        this.rumbleSound = this.scene.sound.add('rumble');
        this.shipLayer.add(this.ship)

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.bullets = this.scene.physics.add.group({
            defaultKey: 'fireball',
            maxSize: 1
        });
        
        this.scene.anims.create({
            key: 'explode',
            frames: this.scene.anims.generateFrameNumbers('asteroid', { start: 0, end: 7 }),
            frameRate: 10,
        })
        
        this.money = Number(localStorage.getItem('app.money') ?? 0);

        addEventListener('beforeunload', () => {
            localStorage.setItem('app.money', this.money);
        })

        this.moneyText = this.scene.add.text(0, 0, this.money + ' $', {
            fontFamily: 'Josefin Slab',
            fontSize: 44,
            color: '#ffffff',
            align: 'center' 
        })
        this.shipLayer.add(this.moneyText);
        this.money = Number(localStorage.getItem('app.money') ?? "0");

        this.scene.physics.world.on('collide', function () {
            object.setVelocity(0, 0); // Arrêter la vélocité de l'objet
        });

        this.placeAsteroids();
    }

    add(asset) {
        this.scene.add.existing(asset)
    }

    update() {
        if (this.cursors.space.isDown) {
            this.shootFireball()
        }
    }

    showGain() {
        const gain = this.scene.add.text(screen.width/2, 300, '+10 $', {
            fontFamily: 'Josefin Slab',
            fontSize: 44,
            color: '#ffffff',
            align: 'center' 
        }).setOrigin(0.5, 0.5)

        this.scene.tweens.addCounter({
            from: 44,
            to: 100,
            duration: 500,
            onUpdate: (tween) => {
                gain.setFontSize(tween.getValue())
            }
        });
        this.scene.tweens.add({
            targets: gain,
            y: gain.y - 50,
            alpha: 0,
            duration: 500,
            ease: 'Linear',
            onComplete: () => {
                gain.destroy()
            }
        });
    }

    shootFireball(asteroid) {
        var bullet = this.bullets.get(this.ship.x, this.ship.y - 60);
        if (bullet === null) {
            // too much bullet
            return;
        }

        bullet.setCollideWorldBounds(true);
        bullet.body.onWorldBounds = true;
        bullet.body.world.on('worldbounds', function () {
            bullet.destroy();
        });
        bullet.body.setSize(10, 10);
        this.asteroidLayer.add(bullet);
        this.shipLaserSound.play();

        if (bullet)
        {
            bullet.setActive(true);
            bullet.setVisible(true);
        }
        const yAsteroidCenter = asteroid.y + (asteroid.height / 2)
        
        this.scene.physics.add.collider(bullet, asteroid, () => {
            this.rumbleSound.play({
                volume: 5
            });
            bullet.destroy()
            this.scene.tweens.add({
                targets: asteroid,
                x: asteroid.x + 10,
                y: asteroid.y + 10,
                duration: 50,
                ease: 'Linear',
                repeat: 4, // Répéter le tween 5 fois pour un effet de secousse
                yoyo: true, // Revenir à la position d'origine
                onComplete: () => {
                    this.rumbleSound.stop();
                    this.explosion.play();
                    this.money = this.money + 10;
                    this.moneyText.text = this.money + " $";
                    asteroid.anims.play('explode');
                    this.showGain();
                }
            });
        }, null, this);

        this.scene.physics.accelerateTo(bullet, bullet.x, yAsteroidCenter, 60 * 20)

        return bullet
    }

    async onTouchAsteroid(e, asteroid) {
        const xAsteroidCenter = asteroid.x + (asteroid.width/2)

        const target_x = xAsteroidCenter;

        const onComplete = () => {
            this.shootFireball(asteroid) 
        }

        await this.scene.tweens.add({
            targets: this.ship,
            x: target_x + (this.ship.width / 2),
            duration: 100,
            ease: 'Linear',
            repeat: 0,
            onComplete
        })
    }

    placeAsteroids() {
        this.asteroidGroup = this.scene.physics.add.group({
            defaultKey: 'asteroid',
            maxSize: 3,
            defaultFrame: 1,
        });
        for (var i = 0; i < 3; i++) {
            this.placeAsteroid(this.asteroidGroup)
        }
    }

    placeAsteroid(asteroidGroup) {
        var x = Phaser.Math.Between(0, screen.width - 200) + ((Math.random() * 100));
        var y = Phaser.Math.Between(0, screen.height - 400) + ((Math.random() * 100));

        var asteroid = asteroidGroup.get(x, -100)
        if (asteroid === null) {
            // too much asteroid
            return;
        }
        asteroid.body.setSize(32, 32, 32, 32);
        asteroid.setOrigin(0, 0)
        asteroid.setScale(2)
        asteroid.setInteractive()
        asteroid.on('pointerdown', (e) => {
            this.onTouchAsteroid(e, asteroid)
        })

        asteroid.on('animationcomplete', function (animation, frame) {
            asteroid.destroy();
            this.placeAsteroid(this.asteroidGroup)
        }, this);

         //this.scene.physics.moveTo(this.ship, target_x, target_y, 60*5, 500)
        this.scene.tweens.add({
            targets: asteroid,
            x,
            y,
            duration: 400,
            ease: 'Linear',
            repeat: 0
        })

        asteroidGroup.add(asteroid)
       // asteroid.setGravityY(100)
    }
}