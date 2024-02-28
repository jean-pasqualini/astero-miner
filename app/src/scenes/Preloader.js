import {Logger, LogLevel} from "../libs/logger"
import config from "../../config.json"
import WebFontFile from '../libs/WebFontFile';
import { Scene } from 'phaser';
const logger = new Logger(config.level, "Preload")

const getSafeAreaInsets = () => {
    const safeAreaInsetTop = parseInt(window.getComputedStyle(window.document.body).getPropertyValue('--safe-area-inset-top'), 10) || 0;
    const safeAreaInsetRight = parseInt(window.getComputedStyle(window.document.body).getPropertyValue('--safe-area-inset-right'), 10) || 0;
    const safeAreaInsetBottom = parseInt(window.getComputedStyle(window.document.body).getPropertyValue('--safe-area-inset-bottom'), 10) || 0;
    const safeAreaInsetLeft = parseInt(window.getComputedStyle(window.document.body).getPropertyValue('--safe-area-inset-left'), 10) || 0;

    return {top: safeAreaInsetTop, right: safeAreaInsetRight, bottom: safeAreaInsetBottom, left: safeAreaInsetLeft};
};


export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
        logger.log(LogLevel.DEBUG, "Init")
        window.safe = getSafeAreaInsets()
        window.safeHeight = screen.height - window.safe.bottom
    }

    init ()
    {
        //  A simple progress bar. This is the outline of the bar.
        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(0, 0, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);
        });

        logger.log(LogLevel.DEBUG, "Loaded assets.")
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.addFile(new WebFontFile(this.load, 'Josefin Slab'));

        this.load.image('space-background', 'space-background.png');
        this.load.image('terran', 'terran.png');
        this.load.image('ship', 'ship.png');
        this.load.audio('titleMusic', 'bg.mp3');
        this.load.svg('muted', 'muted.svg', { width: 43, height: 43 } );
    }

    create ()
    {

        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('Game');
    }
}
