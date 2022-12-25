'use strict';

const container = document.querySelector('.fireworks-container');
let containerWidth = container.offsetWidth;
let containerHeight = container.offsetHeight;

console.log(`containerWidth: ${containerWidth}`)
console.log(`containerHeight: ${containerHeight}`)

window.addEventListener('resize', function(){
    console.log("In window resize event")
    console.log(`windowWidth: ${window.innerWidth}`)
    console.log(`windowHeight: ${window.innerHeight}`)
    console.log(`containerWidth: ${container.offsetWidth}`)
    console.log(`containerHeight: ${container.offsetHeight}`)
});
