import { Vector } from "./vector";
import { GameObject } from "./gameObject";
import { GameEngine } from "./index";

export class Player implements GameObject
{   
    public position:Vector 
    private gameEngine:GameEngine;

    private speed:number = 100;
    public height:number = 15;
    public width:number = 70;

    constructor(position:Vector, gameEngine:GameEngine)
    {
        this.position = position;
        this.gameEngine = gameEngine;
    }

    update(time: number): void {
        if (this.gameEngine.leftKey)
        {
            this.position.x -= time/1000 * this.speed 
        }
        if (this.gameEngine.rightKey)
        {
            this.position.x += time/1000 * this.speed
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "#1b1b42";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    onColliosion(other: GameObject): void {

    }
}