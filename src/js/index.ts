import { GameObject } from "./gameObject";
import { Framerate } from "./framerate";
import { Vector } from "./vector";
import { Player } from "./player";
import { Ball } from "./ball";


export class GameEngine
{
    // items in the game
    public ball:Ball;
    public player1:Player;
 
    // canvas info
    public canvasWidth:number = 400;
    public canvasHeight:number = 600;

    // keep track of key states
    public leftKey:boolean;
    public rightKey:boolean;

    private canvas:HTMLCanvasElement;
    private ctx:CanvasRenderingContext2D;
    
    public objects:GameObject[] = new Array<GameObject>();

    private date: Date = new Date();
    private timeZero: number = this.date.getTime();
    private timeNow: number;

    constructor()
    {
        this.canvas = <HTMLCanvasElement> document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;

        document.addEventListener('keyup', this.keyUp.bind(this));
        document.addEventListener('keydown', this.keyDown.bind(this));

        //this.objects.push(new Framerate(new Vector(10,10)));
        
        this.player1 = new Player(new Vector(20,10), this);
        this.objects.push(this.player1);

        this.ball = new Ball(new Vector(this.canvasWidth/2, this.canvasHeight/2), this);
        this.objects.push(this.ball);

        this.gameLoop();
    }

    private keyDown(event:KeyboardEvent): void
    {
        if (event.repeat) {return};
        switch (event.keyCode) {
            case 37:
                this.leftKey = true;
                break;
            case 39:
                this.rightKey = true;
        }
    }

    private keyUp(event: KeyboardEvent): void
    {
        switch (event.keyCode) {
            case 37:
                this.leftKey=false;
                break;
            case 39:
                this.rightKey=false;
                break;
        }   
    } 
    
    // a very good explanation of how rectangular collision works: https://silentmatt.com/rectangle-intersection/
    private Collide(a:GameObject, b:GameObject): boolean {
        if (a.position.x < (b.position.x+b.width) &&
            (a.position.x+a.width) > b.position.x &&
            a.position.y < (b.position.y+a.height) &&
            a.position.y+b.height > b.position.y)
            {
                return true;
            }
        
    }

    // the main game loop
    private gameLoop()
    {
        // clear the screen in every update
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

        this.date = new Date();
        this.timeNow = this.date.getTime()
        var time = this.timeNow-this.timeZero;
        this.timeZero=this.timeNow;

        // run throght all objects
        this.objects.forEach(element => {
            //all objects are testeted for collisions on all objects
            this.objects.forEach(other => {  
                if (element !== other)
                {
                    if (this.Collide(element, other))
                    {
                        element.onColliosion(other);
                    }
                }
            });
            
            //every element is updated
            element.update(time);

            // every element is drawn on canvas
            element.draw(this.ctx);
        });
        
        // call the main gamelop again (~60fps by default)
        window.requestAnimationFrame(this.gameLoop.bind(this));



    }
}

new GameEngine();

