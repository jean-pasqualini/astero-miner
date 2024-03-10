import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { Preloader } from './scenes/Preloader';

const ratio = window.innerWidth < 600 ? 2 : 1;
console.log(screen.height)

if (typeof App === "undefined") {
    const App = {
        storeData: (key, value) => {
            localStorage.setItem(key, value);
        },
        fetchData: (key) => {
            return localStorage.getItem(key)
        }
    }
}

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: screen.width,
    height: screen.height,
    parent: 'game-container',
    backgroundColor: '#000000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        orientation: Phaser.Scale.Orientation.PORTRAIT
    },
    plugins: {
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        }
    },
    scene: [
        Boot,
        Preloader,
        Game,
        GameOver
    ]
};

export default new Phaser.Game(config);
