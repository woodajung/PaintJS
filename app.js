const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 700;
const COLOR = '#2c2c2c';
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('base');
const range = document.getElementById("colorRange");
const mode = document.getElementById("colorMode");
const reset = document.getElementById('colorReset');
const save = document.getElementById('colorSave');

let isPainting = false;
let filling = false;

// 캔버스 크기 지정
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// 캔버스 배경 설정
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

ctx.fillStyle = COLOR;
ctx.strokeStyle = COLOR;
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
    ctx.fillStyle = color;

    const selectedColor = document.querySelector('.selected');
    selectedColor.classList.remove('selected');

    e.target.classList.add('selected');
}

function handleResetClick() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function handleRangeChange(e) {
    ctx.lineWidth = e.target.value;
}

function handleModeClick() {
    if (filling) {
        filling = false;
        mode.innerText = 'Fill';
    } else {
        filling = true;
        mode.innerText = 'Paint';
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function handleCM(e) {
    // 우클릭 방지
    e.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]";
    link.click();
}

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleCM);
}

Array.from(colors).forEach(color =>
  color.addEventListener('click', handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (reset) {
    reset.addEventListener('click', handleResetClick);
}

if (save) {
    save.addEventListener('click', handleSaveClick);
}