// 引入其他类
import Snake from "./Snake";
import Food from "./food";
import ScorePanel from "./ScorePanel";

//游戏控制器,控制其他类
class GameControl{
// 定义三个属性
//     蛇
   snake:Snake;
    food:Food;
    scorePanel:ScorePanel

    // 创建一个属性来存储蛇的移动方向（也就是按键的方向）
     direction:string = ''

 //创建一个属性来记录游戏是否结束
    isLive= true

    constructor() {
    this.food =new Food();
    this.snake = new Snake();
    this.scorePanel = new ScorePanel(10,1)
     this.init()
    }
    //游戏的初始化方法，调用后游戏即开始
    init(){
    document.addEventListener('keydown',this.keydownHandle.bind(this))
    // 调用run方法
     this.run()
    }

//     创建一个键盘按下的响应函数
 keydownHandle(event:KeyboardEvent){
     // console.log(event.key)

 //  需要检查event.key的值是否合法（用户是否按了正确的按键）

 //  修改direction属性
  this.direction = event.key;

 }
 // 创建一个控制蛇移动的方法
 run(){
//根据方向（this。direction）来使蛇的位置改变
//   向上 top减少
//   向下top增加
//   向左left减少
//   向右left增加
  let X =this.snake.X;
  let Y =this.snake.Y;
  switch (this.direction){
   case "ArrowUp":
   case "Up":
    //向上移动
       Y -=10;
    break;
   case "ArrowDown":
   case "Down":
    Y +=10;
    break;
   case "ArrowLeft":
   case "Left":
    X -=10;
    break;
   case "ArrowRight":
   case "Right":
    X +=10;
    break;
  }
  // 检查蛇是否吃到了食物
  this.checkEat(X,Y);

  // 修改蛇的X和Y
  try{
   this.snake.X = X;
   this.snake.Y= Y;
  }catch (e:any){
   alert(e.message+'Game Over')
   this.isLive=false
  }
  //修改蛇的X值

 //  开启定时器调用
  this.isLive &&setTimeout(this.run.bind(this),300-(this.scorePanel.level-1)*30)

 }

 //定义一个方法，用来检查蛇是否吃到了食物
 checkEat(X:number,Y:number){
     if (X===this.food.X  && Y===this.food.Y){


       // console.log('吃到了食物')
       // 食物的位置需要进行重置
       this.food.change()
       //  分数加一
       this.scorePanel.addScore()
       //  蛇要增加一节
       this.snake.addBody()


     }
 }
}

export default GameControl;