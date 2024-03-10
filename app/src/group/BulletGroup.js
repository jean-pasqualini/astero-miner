import { Bullet } from "../gameobjetcs/Bullet";

export class BulletGroup {
    constructor(scene, layer) {
        this.group = scene.physics.add.group({
            classType: Bullet,
            defaultKey: 'fireball',
            maxSize: 1
        });
        this.layer = layer
    }

    get(x, y) {
        const bullet = this.group.get(x, y)
        if (this.layer) {
            this.layer.add(bullet)
        }
        
        return bullet;
    }
}