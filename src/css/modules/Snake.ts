class Snake {
    //获取🐍元素
    head: HTMLElement;//🐍头
    bodies: HTMLCollection;//包括🐍头，元素集合
    element: HTMLElement
    constructor() {
        this.element = document.querySelector('#snake')!;
        this.head = document.querySelector('#snake>div')!;
        this.bodies = this.element.getElementsByTagName('div')!;
    }
    //#region 获取🐍头的坐标
    get X() {
        return this.head.offsetLeft;
    }
    get Y() {
        return this.head.offsetTop;
    }
    //#endregion
    //#region 设置🐍头的坐标
    set X(value: number) {
        //如果新值和旧值相同则不必要修改
        if (this.X == value) {
            return;
        }

        if (value < 0 || value > 290) {
            //说明🐍撞墙了
            throw new Error('🐍撞墙了！')
        }
        //🐍在像左移动时不能往右移动,反之
        //该方式存在问题，当向右走时，一直按左键会导致位置不对，用按键判断替代
        // if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
        //     if (value > this.X) {
        //         value = this.X - 10;
        //     } else {
        //         value = this.X + 10;
        //     }
        // }
        this.moveBody()
        this.head.style.left = `${value}px`
        this.checkHeadBody()

    }
    set Y(value: number) {
        if (this.Y == value) {
            return;
        }
        if (value < 0 || value > 290) {
            //说明🐍撞墙了
            throw new Error('🐍撞墙了！')
        }
        //🐍在像上移动时不能往下移动,反之
        // if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
        //     if (value > this.Y) {
        //         value = this.Y - 10;
        //     } else {
        //         value = this.Y + 10;
        //     }
        // }
        this.moveBody()
        this.head.style.top = `${value}px`
        this.checkHeadBody();
    }
    //#endregion

    //🐍增加身体的方法
    addBody() {
        this.element.insertAdjacentHTML('beforeend', '<div></div>')
    }
    //身体移动的方法
    moveBody() {
        // 将后面的身体设置为前面身体的位置，列第四节的位置=第三节位置 以此类推
        for (let i = this.bodies.length - 1; i > 0; i--) {
            //获取前面身体的位置
            let x = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let y = (this.bodies[i - 1] as HTMLElement).offsetTop;

            //将值设置到当前身体
            (this.bodies[i] as HTMLElement).style.left = `${x}px`;
            (this.bodies[i] as HTMLElement).style.top = `${y}px`
        }
    }
    //检查🐍头是否有吃到身体
    checkHeadBody() {
        for (let i = 1; i < this.bodies.length; i++) {
            if (this.X === (this.bodies[i] as HTMLElement).offsetLeft && this.Y === (this.bodies[i] as HTMLElement).offsetTop) {
                //说明撞到了身体
                throw new Error('游戏结束!')
            }
        }
    }
}

export default Snake;