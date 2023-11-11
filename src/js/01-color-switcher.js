

const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]')
}


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

refs.stopBtn.disabled = true;

let intervalId;

refs.startBtn.addEventListener("click", startRandom)
refs.stopBtn.addEventListener("click", stopRandom)

function startRandom() {
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;

    document.body.style.backgroundColor = getRandomHexColor();

    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function stopRandom() {
    refs.stopBtn.disabled = true;
    refs.startBtn.disabled = false;

    clearInterval(intervalId)
}

/*----- button style ------*/

const container = document.createElement('div')
document.body.appendChild(container)

    container.style.position = 'absolute';
    container.style.left = '50%';
    container.style.top = '50%';
    container.style.transform = 'translate(-50%, -50%)';

Object.values(refs).forEach(button => {
    button.style.display = 'inline-block'
    button.style.marginRight = '30px'
    button.style.transform = 'scale(1.5)'
    container.appendChild(button);

})


