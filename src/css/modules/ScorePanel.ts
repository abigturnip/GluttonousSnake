//定义记分牌类
class ScorePanel {
    score: number = 0;
    level: number = 1;
    scoreEle: HTMLElement;
    levelEle: HTMLElement;
    constructor(public maxLevel: number = 10, public upgrade: number = 5) {//最大等级,多少分数升一级
        this.scoreEle = document.querySelector('.score')!;
        this.levelEle = document.querySelector('.level')!;
    }
    //设置一个加分的方法
    addScore() {
        this.score++;
        this.scoreEle.innerHTML = `${this.score}`;
        if (this.score % this.upgrade === 0) {
            this.levelUp();
        }
    }
    //等级提升
    levelUp() {
        if (this.level < this.maxLevel) {
            this.level++;
            this.levelEle.innerHTML = `${this.level}`;
        }
    }
}
export default ScorePanel;