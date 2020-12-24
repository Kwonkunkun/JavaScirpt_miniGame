let isStart = false;
let remain = 0;

const playGround = document.querySelector(".playGround");
const timer = document.querySelector(".timer");
const remainCarrot = document.querySelector(".remain");
const retryContainer = document.querySelector(".retryContainer");
const retryBtn = document.querySelector(".retryBtn");
const retryText = retryContainer.querySelector(".text");
const startBtn = document.querySelector(".start");

function deleteCarrot(event) {
    const parents = event.target.parentNode;
    parents.removeChild(event.target);
    remain -= 1;
    remainCarrot.innerHTML = remain;
}

function GameOver(text) {
    isStart = false;
    retryText.innerHTML = text;
    retryContainer.style.display = "flex";
}

function makeImg(x, y, what) {
    const Img = new Image();
    Img.src = `./img/${what}.png`;
    Img.style.position = "absolute";
    Img.style.top = `${y}px`;
    Img.style.left = `${x}px`;

    if (what === "carrot") {
        Img.addEventListener("click", (event) => {
            deleteCarrot(event);
            if (remain === 0) {
                //게임 win
                GameOver("win");
            }
        });
    } else if (what === "bug") {
        Img.addEventListener("click", (event) => {
            deleteCarrot(event);
            //게임 lost
            GameOver("lost");
        });
    }

    playGround.append(Img);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

function getRandomPosOfPlayGround() {
    const minX = playGround.getClientRects().item(0).x;
    const maxX = playGround.getClientRects().item(0).right - 60;
    const minY = playGround.getClientRects().item(0).y;
    const maxY = playGround.getClientRects().item(0).bottom - 40;
    const x = getRandomIntInclusive(minX, maxX);
    const y = getRandomIntInclusive(minY, maxY);
    return { x: x, y: y };
}

function playGame(numOfBug, numOfCarrot) {
    isStart = true;
    MyTimer((val) => {
        let minute = parseInt(val / 60);
        let second = parseInt(val % 60);

        timer.innerHTML = `${minute >= 10 ? minute : "0" + minute}: ${
            second >= 10 ? second : "0" + second
        }`;

        if (minute === 0 && second === 0) {
            GameOver("lost");
        }
    }, 10);

    // 재생을 pause로 바꾸고 안에 있는 html 비우자
    playGround.innerHTML = "";
    remain = numOfCarrot;
    remainCarrot.innerHTML = remain;
    retryContainer.style.display = "none";

    for (let i = 0; i < numOfBug; i++) {
        const pos = getRandomPosOfPlayGround();
        makeImg(pos.x, pos.y, "bug");
    }

    for (let i = 0; i < numOfCarrot; i++) {
        const pos = getRandomPosOfPlayGround();
        makeImg(pos.x, pos.y, "carrot");
    }
}

function MyTimer(callback, val) {
    val = val || 60;
    var timer = setInterval(() => {
        if (isStart === false) {
            clearInterval(timer);
        }

        callback(val);
        if (val-- <= 0) {
            clearInterval(timer);
        }
    }, 1000);
}

function init() {
    retryContainer.style.display = "none";
    retryBtn.addEventListener("click", (event) => {
        console.log("haha");
        playGame(10, 10);
    });
    startBtn.addEventListener("click", (event) => {
        if (isStart === false) {
            playGame(10, 10);
        }
    });
}

init();
