import { Vector } from "./vector";
import { GameObject } from "./gameObject";
import { GameEngine } from "./index";

export class Wall implements GameObject {
    position: Vector;    
    height: number;
    width: number;

    constructor(position: Vector, height:number, width:number) {
        this.position = position;
        this.height = height;
        this.width = width;
    }

    onColliosion(other: GameObject): void {
        
    }
    update(time: number): void {
        
    }
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }


}