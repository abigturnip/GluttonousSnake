import Food from "./Food";
import Snake from "./Snake";
import ScorePanel from "./ScorePanel";
//游戏控制器，控制其他类
class GameControl {
    //定义三个属性
    sanke: Snake;
    //食物
    food: Food;
    //记分牌
    scorepanel: ScorePanel;
    //存储按键的方向
    direction: string = '';
    //用来记录🐍是否还能继续
    isLive = true;
    constructor() {
        this.sanke = new Snake();
        this.food = new Food();
        this.scorepanel = new ScorePanel();
        this.init();
    }
    //游戏初始化
    init() {
        //按键按下事件
        document.addEventListener('keydown', this.keydownHandler.bind(this))//将当前事件的this.指向方法
        //使🐍移动
        this.run();
    }
    //键盘按下调用方法
    keydownHandler(event: KeyboardEvent) {
        if (event.key === "ArrowUp" && this.direction != "ArrowDown" || this.direction != "ArrowUp" && event.key === "ArrowDown") {
            this.direction = event.key;
        } else if (event.key === "ArrowLeft" && this.direction != "ArrowRight" || this.direction != "ArrowLeft" && event.key === "ArrowRight") {
            this.direction = event.key;
        }
    }
    //创建🐍移动的方法
    run() {
        //根据方向(direction)来决定位置改变
        //获取🐍现在的坐标
        let X = this.sanke.X;
        let Y = this.sanke.Y;
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                X += 10;
                break;
        }
        this.checkEat(X, Y)
        try {
            this.sanke.X = X;
            this.sanke.Y = Y;
            // this.sanke.checkHeadBody();
        } catch (e: any) {
            alert(e.message);
            this.isLive = false
        }

        //开启定时器
        this.isLive && setTimeout(this.run.bind(this), 200 - (this.scorepanel.level - 1) * 30);//利用递归实现一直调用
    }
    //检验🐍是否迟到了食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            this.sanke.addBody();
            this.food.change();
            this.scorepanel.addScore();
        }
    }
}

export default GameControl;