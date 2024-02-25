class CommonUI {
    constructor(scene) {
        this.scene = scene;
    }

    build() {
        const scene = this.scene;
      //  let muted = this.add.image(mid_screen, 50, 'muted').setOrigin(0, 0).setScale(0.05);
        const muteUnmuteButton = this.scene.add
            .text(0, 0, 'Mute')
            .setOrigin(1, 1)
        // muteUnmuteButton.setY((screen.height - window.safe.bottom) - muteUnmuteButton.height)
        muteUnmuteButton.setX(screen.width - 10)
        muteUnmuteButton.setY(screen.height - 10)
        // muteUnmuteButton.setX(muteUnmuteButton.x - muteUnmuteButton.width)
        // muteUnmuteButton.setY(muteUnmuteButton.y - muteUnmuteButton.height)
        muteUnmuteButton.setInteractive();
        muteUnmuteButton.on('pointerdown', () => {
            if(!this.scene.game.sound.mute) {
                // if true is muted
                muteUnmuteButton.setText("Unmute")
                this.scene.game.sound.setMute(true)
              // muteUnmuteButton.setX(screen.width - muteUnmuteButton.width)
            } else {
                //scene.sound.resume('titleMusic')
                muteUnmuteButton.setText("Mute")
                this.scene.game.sound.setMute(false)
               // muteUnmuteButton.setX((screen.width + 10) - muteUnmuteButton.width )
            }
        });
    }
}

export { CommonUI }