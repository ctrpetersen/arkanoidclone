import { Vector } from "./vector";
import { GameObject } from "./gameObject";
import { GameEngine } from "./index";
import { Ball } from "./ball";

export class Block implements GameObject {
    position: Vector;
    height: number;
    width: number;
    hp: number;
    gameEngine: GameEngine;
    color:string;

    constructor(position: Vector, size: number, hp: number, gameEngine: GameEngine) {
        this.position = position;
        this.height = size;
        this.width = size;
        this.hp = hp;
        this.gameEngine = gameEngine;
        this.color = this.getRandomColor();
    }

    onColliosion(other: GameObject): void {
        if (other == this.gameEngine.ball) {
            this.hp--;
        }
        if (other == this.gameEngine.ball && this.hp < 1){
            this.position.x = 1200;
            this.position.y = 1200;
            this.gameEngine.ball.onColliosion(this);
            this.gameEngine.score++;
            this.gameEngine.ball.position.y += 10;
            this.gameEngine.ball.speed *= 1.001;
        }
    }
    update(time: number): void {

    }
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "black";
        ctx.fillRect(this.position.x, this.position.y,this.width,this.height)
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x+4, this.position.y+4, this.width-8, this.height-8);
    }


    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

}