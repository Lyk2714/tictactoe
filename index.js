/* 玩家 */
var player;
(function (player) {
    player["X"] = "x";
    player["O"] = "o";
})(player || (player = {}));
/* 胜利条件 */
var winArr = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6] //斜
];
//棋盘格子
var oRbs = document.querySelectorAll('.rb');
//棋盘
var oBox = document.querySelector('#box');
//获胜信息
var message = document.querySelector('.message');
var winner = document.querySelector('#winner');
var res = document.querySelector('#restart');
//当前玩家
var curPlayer;
//记录下棋次数
var step;
startGame();
//重新开始按钮
res.addEventListener('click', startGame);
//开始游戏
function startGame() {
    //重置信息
    message.style.display = 'none';
    step = 0;
    curPlayer = player.X;
    oBox.classList.remove(player.X, player.O);
    oBox.classList.add(player.X);
    //格子添加点击事件
    oRbs.forEach(function (item) {
        var rb = item;
        //清空棋盘,移除点击事件
        // console.log(item.classList);
        rb.classList.remove(player.X, player.O);
        rb.removeEventListener('click', clickRb);
        //重新添加点击事件
        rb.addEventListener('click', clickRb);
    });
}
//点击事件
function clickRb(e) {
    var target = e.target;
    // console.log(target.classList);
    target.classList.add(curPlayer);
    step++;
    //判断是否胜利
    var isWin = Win(curPlayer);
    if (isWin) {
        message.style.display = 'block';
        winner.innerHTML = '玩家' + curPlayer + '获胜！';
        return;
    }
    //判断是否平局
    if (step === 9) {
        message.style.display = 'block';
        winner.innerHTML = '平局';
        return;
    }
    //切换下一个玩家
    curPlayer = curPlayer === player.X ? player.O : player.X;
    //切换提示
    oBox.classList.remove(player.X, player.O);
    oBox.classList.add(curPlayer);
}
//判断是否胜利的函数
function Win(player) {
    return winArr.some(function (item) {
        //获取胜利的每种情况对应的格子
        var rbIndex1 = item[0];
        var rbIndex2 = item[1];
        var rbIndex3 = item[2];
        //判断3个格子是否同时包含当前玩家的类名
        if (inClass(oRbs[rbIndex1], player) &&
            inClass(oRbs[rbIndex2], player) &&
            inClass(oRbs[rbIndex3], player)) {
            return true;
        }
        return false;
    });
}
//判断DOM元素是否包含某个类名
function inClass(el, name) {
    return el.classList.contains(name);
}
