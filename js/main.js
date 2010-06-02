//Gangu Sketching App

//まったくOOPじゃないやばい。
var strokeColor = 'red';
//Clear関数
var clear = function(){	
    var canvas = document.getElementById("canvas");
    if (! canvas || !canvas.getContext ){return false;}
    var ctx = canvas.getContext('2d');
		ctx.clearRect(0,0,canvas.width,canvas.height);
};

var setSakuraStrokeColor = function(){
	setStrokeColor('sakura');
};

var setRedStrokeColor = function(){
	setStrokeColor('red');
};

//ペンの色関数
var setStrokeColor = function(type){
		if (type == 'red') {
    	strokeColor = "rgba(200,0,0,0.6)";
		}else{
    	strokeColor = "#555";
		}
};

var draw1 = function(){
    var canvas = document.getElementById('c1');
    if (! canvas || !canvas.getContext ){return false;}

    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.strokeStyle = '#555';
}

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
    return {x: e.clientX - 10, y: e.clientY - 50};
}

//描画中かどうか
var drawing = false;
var lastpos = {x:-1,y:-1};


//マウスダウン時
var on_mousedown = function(e) {
    drawing = true;
    lastpos = transform_event_coord(e);
};


//マウス移動時
var on_mousemove = function(e){
    if (!drawing)
        return;

    var pos = transform_event_coord(e);

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    //ctx.strokeStyle = "rgba(200,0,0,0.6)";
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 4.0;
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(lastpos.x, lastpos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.closePath();
    ctx.stroke();

    lastpos = pos;
};

//マウスアップ時
var on_mouseup = function(e) {
    drawing = false;
};



var init = function() {
    var ie = document.getElementById("ie");
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
   	
		//ペン初期化
		setStrokeColor('black'); 
    
		//画面サイズへ拡大。
    canvas.setAttribute("height", window.innerHeight + "px");
    canvas.setAttribute("width", window.innerWidth + "px");


		//Toobar
		var clearBtn = document.getElementById("clearBtn");
		var sakuraBtn = document.getElementById("sakuraBtn");
		var redBtn = document.getElementById("redBtn");
		
		var nav = document.getElementById("nav");
		
		clearBtn.addEventListener('touchstart',clear,false);
		sakuraBtn.addEventListener('touchstart',setSakuraStrokeColor,false);
		redBtn.addEventListener('touchstart',setRedStrokeColor,false);
		

    //イベントリスナの登録各種JSライブラリでラップしてても良いかもしれない。
    canvas.addEventListener("mousedown", on_mousedown, false);
    canvas.addEventListener("mousemove", on_mousemove, false);
    canvas.addEventListener("mouseup", on_mouseup, false);
    
    canvas.addEventListener("touchstart", on_mousedown, false);
    canvas.addEventListener("touchmove", on_mousemove, false);
    canvas.addEventListener("touchend", on_mouseup, false);

    //canvas.addEventListener('touchstart', on_mousedown, false);
		

};
