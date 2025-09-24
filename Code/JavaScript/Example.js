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



// Create a new request.
const request = new XMLHttpRequest();

// 'GET' is the HTTP method that we are using
// And then we have the endpoint to which we are making the request
request.open('GET', 'https://countries-api-836d.onrender.com/countries/name/portugal');

// Send the request.
request.send();

request.addEventListener('load', function(){
    const [data] = JSON.parse(this.responseText);
    // if the returned country has borders array, read them into the neighbours array
    const neighbours = data.borders ?? [];
    if (neighbours.length > 0) {
        for (const neighbour of neighbours) {
            const neighbourRequest = new XMLHttpRequest();
            neighbourRequest.open('GET', `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`);
            neighbourRequest.send();
            neighbourRequest.addEventListener('load', function () {
                const [neighbourData] = JSON.parse(this.responseText);
                console.log(neighbourData);
            })
        }
    }
});
