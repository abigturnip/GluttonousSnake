//定义食物类
class Food {
    element: HTMLElement;
    constructor() {
        //获取食物，!表示不处理非空判断
        this.element = document.querySelector('.food')!;
    }
    //定义一个获取食物x轴坐标的方法
    get X() {
        return this.element.offsetLeft;
    }
    //定义一个获取食物Y轴坐标的方法
    get Y() {
        return this.element.offsetTop;
    }
    //修改食物位置
    change() {
        const stage = document.querySelector('.stage');
        const stageWidth: number = Math.floor((stage?.getBoundingClientRect().right! - stage?.getBoundingClientRect().left!) / 10)
        //每次🐍的移动距离是10px所以随机数的坐标必须是10的倍数
        const left: number = Math.floor(Math.random() * stageWidth) * 10;
        const top: number = Math.floor(Math.random() * stageWidth) * 10;
        this.element.style.left = `${left}px`
        this.element.style.top = `${top}px`
    }
}
export default Food;