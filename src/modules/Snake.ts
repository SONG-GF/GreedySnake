class Snake{
//     表示蛇的元素
    head:HTMLElement
    //蛇的身体
    // HTMLCollection 是 HTML 元素的集合。
    // HTMLCollection 对象类似一个包含 HTML 元素的数组列表。
    bodies:HTMLCollection
    // 获取蛇的容器
    element:HTMLElement


    constructor() {
        this.head = document.querySelector('#snake>div')as HTMLElement;
        this.bodies = document.getElementById('snake')!.getElementsByTagName('div');
        this.element = document.getElementById('snake')!
    }

//     获取蛇头的坐标
    get X(){
        return this.head.offsetLeft
    }
    get Y(){
        return this.head.offsetTop
    }
//     设置蛇头坐标
    set X(value:number){
        if(this.X === value){
            return
        }
        // X的值合法范围0-290之间
        if (value<0||value>290){
            throw new Error('蛇撞墙了！')
        }

        //修改X时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
        if(this.bodies[1] &&(this.bodies[1] as HTMLElement).offsetLeft ===value){
            // console.log('水平方向发生了掉头')
        //     如果发生了掉头，让蛇继续反方向移动
            if(value>this.X){
            //     如果新值value大于旧值，则说明蛇在向右走，此时发生掉头，应该是蛇继续向左走
                value = this.X-10
            }else {
                value = this.X+10
            }
        }


        this.moveBody();

        this.head.style.left = value+'px'


        // 检查有没有撞到自己
        this.checkBody();



    }

    set Y(value:number){
        if(this.Y === value){
            return
        }

        if (value<0||value>290){
            throw new Error('蛇撞墙了！')
        }

        //修改X时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
        if(this.bodies[1] &&(this.bodies[1] as HTMLElement).offsetTop ===value){
            // console.log('水平方向发生了掉头')
            //     如果发生了掉头，让蛇继续反方向移动
            if(value>this.Y){
                //     如果新值value大于旧值，则说明蛇在向右走，此时发生掉头，应该是蛇继续向左走
                value = this.Y-10
            }else {
                value = this.Y+10
            }
        }

        this.moveBody();

        this.head.style.top = value+'px';

        // 检查有没有撞到自己
        this.checkBody();

    }
    // 蛇增加身体的方法
    addBody(){
        // 向element中添加一个div
        this.element.insertAdjacentHTML('beforeend',"<div></div>");
    }
    // 添加蛇身体移动
    moveBody(){
    // 将后边身体的位置为前边身体的位置
    //     遍历获取所有的身体
        for (let i =this.bodies.length-1;i>0;i--){
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;

            (this.bodies[i] as HTMLElement) .style.left = X+'px';
            (this.bodies[i] as HTMLElement) .style.top = Y+'px';

        }
    }
    checkBody(){
        for(let i = 1;i<this.bodies.length;i++){
            let bd = this.bodies[i] as HTMLElement
            if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
                throw  new Error('我撞到我自己了！')
            }

        }    }
}
export  default  Snake;