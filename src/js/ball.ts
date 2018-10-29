import { Vector } from "./vector";
import { GameObject } from "./gameObject";
import { GameEngine } from "./index";
import { Wall } from "./wall";

export class Ball implements GameObject {
    public height: number;
    public width: number;
    private gameEngine: GameEngine;
    public position: Vector;
    private direction: Vector;
    public speed: number = 200;
    private size: number = 15;
    public lastCollision: GameObject;

    constructor(position: Vector, gameEngine: GameEngine) {
        this.position = position;
        this.direction = new Vector(0.2, -1);
        this.gameEngine = gameEngine;
        this.height = this.size;
        this.width = this.size;
    }


    update(time: number): void {
        this.gameEngine.objects.forEach(elegameobj => {


        });

        this.position.x += this.direction.x * this.speed * time / 1000;
        this.position.y += this.direction.y * this.speed * time / 1000;
    }


    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "white";
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
    }

    onColliosion(other: GameObject): void {
        if (this.lastCollision == other) { return; }

        if (other == this.gameEngine.upWall || other == this.gameEngine.downWall) {
            this.direction.y *= -1;
        }
        else if (other == this.gameEngine.leftWall || other == this.gameEngine.rightWall){
            this.direction.x *= -1;
        }
        else{
            this.direction.y *= -1;
        }

        this.lastCollision = other;
    }

}