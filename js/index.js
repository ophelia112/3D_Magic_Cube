var boxBg = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#564545', '#607d8b', '#405d6b', '#9e9e9e', '#70737d', '#389fa0', '#38a05e', '#b3c981', '#76a803', '#fecf43', '#e2785f'];	//box背景色
var bodyBg = ['#F7E8ED', '#F2D9E6', '#ECC6DE', '#E0ECF5', '#DDF4DE', '#F0F1D5', '#EEDECD', '#B8E6B3', '#ABE3D8', '#E0E1F5', '#F7E8ED', '#F2D9E6', '#E0ECF5', '#DDF4DE', '#F0F1D5', '#EEDECD', '#B8E6B3', '#ABE3D8', '#DFD1F0', '#6161616'];	//body背景色

//旋转角度保存
var rot = ['rotateX(-180deg)', 'rotateY(-180deg)', 'rotateX(180deg)', 'rotateY(180deg)'];

var style = document.createElement('style');
var str = "";
for (var i = 0; i < boxBg.length; i++) {
    str += `.box:nth-child(${i + 1}) div{
        background: ${boxBg[i]} url(images/${i + 1}.png) no-repeat center;
        background-size: 65px;
    }`;
    style.innerHTML = str;
    document.head.appendChild(style);
}

var box = document.querySelectorAll('.box');

box.forEach(function (item) {//通过遍历，查找box中的哪个盒子被鼠标滑过，触发鼠标进入事件，设置鼠标滑过转动魔方，配合随机变化背景颜色
    item.onmouseenter = function (e) {
        var dir = getDir(e, this);
        // console.log(dir);
        this.style.transform = 'translateZ(100px)' + rot[dir];
        document.body.style.background = bodyBg[Math.round(Math.random() * (bodyBg.length - 1))];

    }
    // 当鼠标离开时将变换属性设为空
    item.onmouseleave = function (e) {
        this.style.transform = "";
    }
});

function getDir(e, box) {
    // 记录该魔方盒子的位置信息
    var l = box.getBoundingClientRect().left;
    var t = box.getBoundingClientRect().top;
    var w = box.getBoundingClientRect().width;
    var h = box.getBoundingClientRect().height;
    // 计算鼠标与魔方中心相距的x,y信息
    var x = e.clientX - l - w / 2;
    var y = e.clientY - t - h / 2;
    // atan2() 返回从原点(0,0) 到 (x,y) 点的线段与 x 轴正方向之间的平面角度(弧度值)，转换成角度
    var deg = Math.atan2(y, x) / (Math.PI / 180);
    // 利用公式算法巧妙化解魔方各个角度进入的不同数值
    var d = (Math.round((deg + 180) / 90) + 3) % 4;
    return d;
}
// 用于设置魔方墙的鼠标跟随效果
// 绕x轴旋转往上是正值往下是负值，绕y轴旋转往左是负值往上是正值，进行坐标换算
var content = document.getElementById('content');
document.onmousemove = function (e) {
    //y轴旋转0   1   2   3   4   5   6
    //      -3  -2  -1   0   1   2   3
    var y = (e.clientX / window.innerWidth - 0.5) * 15;
    // x轴旋转 0   1   2    3    4   5   6
    //        3   2    1   0   -1   -2  -3
    var x = (0.5 - e.clientY / window.innerHeight) * 15;// -0.5-0.5 
    
    content.style.transform = 'perspective(1000px) rotateX(' + x + 'deg) rotateY(' + y + 'deg) ';
}

// 重新看一下x = (0.5 - e.clientY / window.innerHeight) * 15;为啥是跟y相除，
// 难点，调整图片大小和旋转角度，还有给我们的算法
// var rot = ['rotateX(-180deg)', 'rotateY(-180deg)', 'rotateX(180deg)', 'rotateY(180deg)'];存储的是旋转x或者y
// 需要调整一下背景图片大小，还有总的魔方大小，因为本机分辨率的问题
// document.body.style.background = bodyBg[Math.round(Math.random() * (bodyBg.length - 1))];
// getBoundingClientRect()获取盒子的基本内容
// Math.atan2(y, x)计算角度