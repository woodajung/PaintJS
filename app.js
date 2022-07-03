const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('base');
let isPainting = false;

// 캔버스 크기 지정
canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = 2.5;

function onMouseMove(e) {
    const x = e.offsetX;
    const y = e.offsetY;

    if (isPainting) {
        ctx.lineTo(x, y);
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
}

function startPainting() {
    isPainting = true;
}

function stopPainting() {
    isPainting = false;
}

function handleColorClick(e) {
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;

    const selectedColor = document.querySelector('.selected');
    selectedColor.classList.remove('selected');

    e.target.classList.add('selected');
}

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);