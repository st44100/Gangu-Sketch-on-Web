var strokeColor = '#333';

var clear = function()
{
    var canvas = document.getElementById('canvas');
    if (! canvas || !canvas.getContext ){return false;}

    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
};

var setColor = function(val)
{
    strokeColor = val;    
};

var setColorBlack = function(){
    storkeColor = 'rgba(30,30,30,0.6)';
};

var setColorRed = function(){
    storkeColor = 'rgba(200,0,0,0.6)';
}


var draw1 = function(){
    var canvas = document.getElementById('canvas');
    if (! canvas || !canvas.getContext ){return false;}

    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.strokeRect(20,20,80,40);
    
    
    console.debug(ctx);
};


//この処理でスクロールをロックする
window.addEventListener("load", loaded, false);
window.onorientationchange = hideURLbar;

function loaded() {
    setTimeout(hideURLbar, 100);
    document.addEventListener("touchstart", touchHandler, false);
　　document.addEventListener("touchmove", touchHandler, false);
　　document.addEventListener("touchend", touchHandler, false);
}

function hideURLbar() {
　　window.scrollTo(0, 1);
}

function touchHandler(event) {
　　event.preventDefault();
　　hideURLbar();
}
//end　おまじない終わり。



//描画中に実行する関数ポジションを計算して返す。
function transform_event_coord(e) {
    
    //タッチパネル
    if (e.touches && e.touches.length) {
        return {x: e.touches[0].pageX - 20, y: e.touches[0].pageY - 40};
    }

    //マウス
    return {x: e.clientX - 10, y: e.clientY - 10};
}

//描画中かどうか
var drawing = false;
var lastpos = {x:-1,y:-1};


//マウスダウン時
function on_mousedown(e) {
    drawing = true;
    lastpos = transform_event_coord(e);
}


//マウス移動時
function on_mousemove(e) {
    if (!drawing)
        return;

    var pos = transform_event_coord(e);

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    //ctx.strokeStyle = "rgba(200,0,0,0.6)";
    ctx.storkeStyle = strokeColor; 
    ctx.lineWidth = 4.0;
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(lastpos.x, lastpos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.closePath();
    ctx.stroke();

    lastpos = pos;
}

//マウスアップ時
function on_mouseup(e) {
    drawing = false;
}



function init() {
    var ie = document.getElementById("ie");
    strokeColor = '#333';
    
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    


    //画面サイズへ拡大。
    canvas.setAttribute("height", window.innerHeight + "px");
    canvas.setAttribute("width", window.innerWidth + "px");
        
    //Toolbar
    var clearBtn = document.getElementById('clearBtn');
    var blackBtn = document.getElementById('blackBtn');
    var redBtn = document.getElementById('redBtn');

    clearBtn.addEventListener('touchstart',clear,false);
    blackBtn.addEventListener('touchstart',setColorBlack,false);
    redBtn.addEventListener('touchstart',setColorRed,false);

    clearBtn.addEventListener('click',clear,false);
    blackBtn.addEventListener('click',setColorBlack,false);
    redBtn.addEventListener('click',setColorRed,false);

    //イベントリスナの登録各種JSライブラリでラップしてても良いかもしれない。
    addEventListener("mousedown", on_mousedown, false);
    addEventListener("mousemove", on_mousemove, false);
    addEventListener("mouseup", on_mouseup, false);
    
    canvas.addEventListener("touchstart", on_mousedown, false);
    canvas.addEventListener("touchmove", on_mousemove, false);
    canvas.addEventListener("touchend", on_mouseup, false);
}
