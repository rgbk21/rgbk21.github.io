import {Fireworks} from "fireworks-js"

const container = document.querySelector('.fireworks-container');
const hbdContainer = document.querySelector('.hbd-text-container');
const fireworks = new Fireworks(container, {
    hue: {
        min: 0,
        max: 360
    },
    acceleration: 1.00,
    autoresize: false,
    brightness: {
        min: 50,
        max: 100
    },
    decay: {
        min: 0.005,
        max: 0.015
    },
    delay: {
        min: 100,
        max: 100
    },
    explosion: 5,
    flickering: 50,
    intensity: 15,
    friction: 0.97,
    gravity: 1.5,
    opacity: 0.5,
    particles: 200,
    traceLength: 3,
    traceSpeed: 5,
    rocketsPoint: {
        min: 50,
        max: 50
    },
    lineWidth: {
        explosion: {
            min: 1,
            max: 3
        },
        trace: {
            min: 1,
            max: 2
        }
    },
    lineStyle: 'round',
    mouse: {
        click: true,
        move: false,
        max: 15
    },
    background: {
        color: '#000000',
    }
})

fireworks.start();

let containerWidth = container.offsetWidth;
let containerHeight = container.offsetHeight;

window.addEventListener('resize', function(){
    // use the original height with which the container was initialized with.
    // This fixes the issue where the height would keep increasing infinitely on window resize.
    let newSize = {width: container.offsetWidth, height: containerHeight};
    fireworks.updateSize(newSize);
});

// Remove HBD text. This also ends up hiding the entire grid row. So there is no top
// black border that is left behind.
let date = new Date();
let currentDate = date.getDate() + '/' + date.getMonth();
if (currentDate === '27/11') {
    hbdContainer.textContent = "Happy Birthday Retard!";
}
