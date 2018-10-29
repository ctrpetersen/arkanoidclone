import { GameObject } from "./gameObject";
import { Framerate } from "./framerate";
import { Vector } from "./vector";
import { Player } from "./player";
import { Ball } from "./ball";
import { Wall } from "./wall";
import { Block } from "./block";

export class GameEngine {
    // items in the game
    public ball: Ball;
    public player1: Player;

    // canvas info
    public canvasWidth: number = 400;
    public canvasHeight: number = 600;

    public score: number = 0;

    // keep track of key states
    public leftKey: boolean;
    public rightKey: boolean;

    // walls
    public leftWall: Wall;
    public rightWall: Wall;
    public upWall: Wall;
    public downWall: Wall;

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    public scoreView : HTMLSpanElement;

    public objects: GameObject[] = new Array<GameObject>();

    private date: Date = new Date();
    private timeZero: number = this.date.getTime();
    private timeNow: number;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.scoreView = document.getElementById("score");

        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;

        document.addEventListener('keyup', this.keyUp.bind(this));
        document.addEventListener('keydown', this.keyDown.bind(this));

        //this.objects.push(new Framerate(new Vector(10,10)));

        this.player1 = new Player(new Vector(this.canvasWidth / 2, this.canvasHeight - 40), this);
        this.objects.push(this.player1);


        this.upWall = new Wall(new Vector(0, 0), 5, this.canvasWidth);
        this.objects.push(this.upWall);

        this.downWall = new Wall(new Vector(0, this.canvasHeight - 5), 5, this.canvasWidth);
        this.objects.push(this.downWall);

        this.leftWall = new Wall(new Vector(0, 0), this.canvasHeight, 5);
        this.objects.push(this.leftWall);

        this.rightWall = new Wall(new Vector(this.canvasWidth - 5, 0), this.canvasHeight, 5);
        this.objects.push(this.rightWall);


        //fill with blocks
        for (var i = 0; i < 5; i++) {
            for (var x = 0; x < 20; x++) {
                this.objects.push(new Block(new Vector(x * 20, (i*20)+50), 20, 1, this))
            }
        }

        this.objects.push(new Block(new Vector(x * 20, (i*20)+50), 20, 1, this))




        this.ball = new Ball(new Vector(this.canvasWidth / 2, this.canvasHeight / 2), this);
        this.objects.push(this.ball);

        this.gameLoop();
    }

    private keyDown(event: KeyboardEvent): void {
        if (event.repeat) { return };
        switch (event.keyCode) {
            case 37:
                this.leftKey = true;
                break;
            case 39:
                this.rightKey = true;
        }
    }

    private keyUp(event: KeyboardEvent): void {
        switch (event.keyCode) {
            case 37:
                this.leftKey = false;
                break;
            case 39:
                this.rightKey = false;
                break;
        }
    }

    private Collide(a: GameObject, b: GameObject): boolean {
        if (a.position.x < b.position.x + b.width &&
            a.position.x + a.width > b.position.x &&
            a.position.y < b.position.y + b.height &&
            a.height + a.position.y > b.position.y) {
            return true;
        }

    }

    private gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.date = new Date();
        this.timeNow = this.date.getTime()
        var time = this.timeNow - this.timeZero;
        this.timeZero = this.timeNow;

        this.objects.forEach(element => {
            this.objects.forEach(other => {
                if (element !== other) {
                    if (this.Collide(element, other)) {
                        element.onColliosion(other);
                    }
                }
            });

            element.update(time);

            element.draw(this.ctx);
        });

        //check if the ball flew off screen
        if (!(this.ball.position.x < 0 + this.canvasWidth &&
            this.ball.position.x + this.ball.width > 0 &&
            this.ball.position.y < 0 + this.canvasHeight &&
            this.ball.height + this.ball.position.y > 0)) {
            this.ball.position.x = 50;
            this.ball.position.y = 400;
        }

        // call the main gamelop again (~60fps by default)
        window.requestAnimationFrame(this.gameLoop.bind(this));
        this.scoreView.innerHTML = this.score.toString();



    }
}

new GameEngine();

