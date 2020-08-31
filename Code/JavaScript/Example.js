// let rabbit = {};
//
// rabbit.speak = function (line) {
//     console.log(`The rabbit says ${line}`);
// }
//
// rabbit.speak("Bow wow");

function speak (line) {
    console.log(`The ${this.type} rabbit says ${line}`);
}

let whiteRabbit = {type: "white", speak};
let hungryRabbit = {type: "hungry", speak};

whiteRabbit.speak('I am white');
hungryRabbit.speak('I am hungry');

speak.call(hungryRabbit, "I am still hungry!");
speak.call(whiteRabbit, "I am still white!");








