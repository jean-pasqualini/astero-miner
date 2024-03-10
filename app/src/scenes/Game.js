import { Scene } from './Scene';
import { GameComponent } from '../components/GameComponent'

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    preload() {
        this.load.scenePlugin(
            'PhaserDebugDrawPlugin',
            'https://cdn.jsdelivr.net/npm/phaser-plugin-debug-draw@7.1.0',
            'debugDraw',
            'debugDraw'
          );
    }

    create ()
    {
        this.add.image(0, 0, 'space-background').setOrigin(0, 0);
        new GameComponent(
            this,
        )
    }

}
