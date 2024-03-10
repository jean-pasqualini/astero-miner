export class Money extends Phaser.GameObjects.Text {

    constructor(scene, x, y, text, textOptions) {
        super(scene, x, y, text, textOptions)
        this.money = 0;
    }

    increase() {
        this.money += 10;
        this.text = this.money + " $"
        this.showGain()
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
}