import { EventDispatcher } from '../eventDispatcher';
import { Money } from '../gameobjetcs/Money'
import { Scene as PhaserScene } from 'phaser';

export class Scene extends PhaserScene {
    constructor(config) {
        super(config)
        this.eventDispatcher = new EventDispatcher()
    }

    trigger(eventName, event) {
        this.eventDispatcher.trigger(eventName, event)
    }

    listen(eventName, callable) {
        return this.eventDispatcher.listen(eventName, callable)
    }

    getEventDispatcher() {
        return this.eventDispatcher
    }

    money(parent, x, y) {
        const money = new Money(this, x, y, '0 $', {
            fontFamily: 'Josefin Slab',
            fontSize: 44,
            color: '#ffffff',
            align: 'center' 
        });
        this.add.existing(money)

        return money
    }
}