// 用于记录时间的定时器编号
var timeId = null;
// 创建定时器编号
var createId = null;
// 运动定时器编号
var upId = null;

// 得分
var score = 0;


// 创建时间间隔
var createSpeed = 1000;
// 运动时间间隔
var upSpeed = 20;

// 存储时间
var time = 0;
// time DOM
var timeEle = document.getElementById('time');
// score DOM
var scroeEle = document.getElementById('score');

timeId = setInterval(function () {
  time++;
  timeEle.innerText = time + '秒';
}, 1000);

// pre 随机函数
function isNumber(n) {
  if (typeof n === 'number' && n == n) {
    return true;
  }
  return false;
}
// 1. 封装一个 getRandom(x, y) 返回[x, y) 随机数。x < y
function getRandom(x, y) {
  if (x < y && isNumber(x) && isNumber(y)) {
    return Math.random() * (y - x) + x;
  }
}

// 2. createLetter 创建img元素，随机的引入图片地址。
function createLetter() {
  var img = document.createElement('img');
  document.body.appendChild(img);
  // img 样式
  img.style.position = 'absolute';
  // top 为可视区域的高度
  img.style.top = (window.innerHeight) + 'px';
  // left 可视区域宽度内随机(window.innerWidth - width)
  img.style.left = getRandom(0, window.innerWidth - 50) + 'px';
  // 图片的样式设计，定宽不定高
  img.style.width = '50px';

  // String.prototype.toUpperCase() 字母小写变大写。
  var title = parseInt(getRandom(10, 36)).toString(36).toUpperCase();
  img.src = './img/' + title + '.png';
  img.title = title;
}
// 2. 开启创建定时器。
createId = setInterval(function () {
  createLetter();
}, createSpeed);

// 3. 让所有元素向上跑
upId = setInterval(function () {
  var imgs = document.getElementsByTagName('img');
  for (var i = 0; i < imgs.length; i++) {
    var letter = imgs[i];
    var top = parseInt(getComputedStyle(letter).top);
    top--;
    letter.style.top = top + 'px';
    if (top <= 0) {
      // 触顶游戏结束，gameover
      clearInterval(upId);
      clearInterval(createId);
      clearInterval(timeId);
      alert('游戏结束，最终得分' + score);
      document.body.onkeydown = null;
    }
  }
}, upSpeed);

// 4. 绑定键盘按下事件，消除对应元素
document.body.onkeydown = function (e) {
  // e.key 'a', 'b' 'c'
  // e.key.toUpperCase() 'A',
  var key = e.key.toUpperCase();
  var imgs = document.getElementsByTagName('img');
  // 键盘每次按下和页面中所有元素比较，元素title
  for (var i = 0; i < imgs.length; i++) {
    var letter = imgs[i];
    // 找到了字母对应元素，kill
    if (letter.title == key) {
      score++;
      scroeEle.innerText = score;
      // 变速 根据分数进行变速。
      changeSpeed(score);
      document.body.removeChild(letter);
      break;
    }
  }
}
// document.body.onclick = function (e) {
//   document.body.removeChild(e.target);
//   score++;
//   score++;
//   scroeEle.innerText = score;
//   // 变速 根据分数进行变速。
//   changeSpeed(score);
// }

function changeSpeed(score) {
  if (score > 15 && score < 25) {
    upSpeed = 15;
    createSpeed = 700;
  } else if (score >= 25 && score < 35) {
    upSpeed = 10;
    createSpeed = 500;
  } else if (score >= 35) {
    upSpeed = 5;
    createSpeed = 100;
  }
  // 先关闭原来定时器
  clearInterval(upId);
  clearInterval(createId);
  // 在重新开启定时器。
  createId = setInterval(function () {
    createLetter();
  }, createSpeed);

  // 3. 让所有元素向上跑
  upId = setInterval(function () {
    var imgs = document.getElementsByTagName('img');
    for (var i = 0; i < imgs.length; i++) {
      var letter = imgs[i];
      var top = parseInt(getComputedStyle(letter).top);
      top--;
      letter.style.top = top + 'px';
      if (top <= 0) {
        // 触顶游戏结束，gameover
        clearInterval(upId);
        clearInterval(createId);
        clearInterval(timeId);
        alert('游戏结束，最终得分' + score);
        document.body.onkeydown = null;
      }
    }
  }, upSpeed);
}