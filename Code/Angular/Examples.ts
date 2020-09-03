/*  BUILT-IN TYPES  */

// When declaring functions we can use types for arguments and return values
function greetText(name: string): string {
    return "Hello, " + name;
}

// string
let fullName: string = 'Alice Doe';

// number
let age: number = 21;

// boolean
let isHungry: boolean = true;

// array
let foods: Array<string> = ['IceCream', 'Candy'];
let drinks: string[] = ['Juice', 'Milk'];

// enums
enum EmployeeRole {Developer, Manager, Admin};
let role: EmployeeRole = EmployeeRole.Admin;

// The default initial value for enums start from 0.
console.log(EmployeeRole.Developer); // prints '0' to the console
console.log(EmployeeRole.Manager); // prints '1' to the console
console.log(EmployeeRole.Admin); // prints '2' to the console

enum EmployeeRole {HR = 3, CEO = 5, CTO = 4};
console.log(EmployeeRole.HR); // prints '3' to the console
console.log(EmployeeRole.CEO); // prints '5' to the console
console.log(EmployeeRole.CTO); // prints '4' to the console

// You can also look up the names corresponding to the values
console.log(EmployeeRole[0]); // prints 'Developer'
console.log(EmployeeRole[4]); // prints 'CTO'

// any
// This is the default type if we omit typing for a given variable
// the following code compiles just fine for example
let value: any = 'a string';
value = ['an', 'array', 'of', 'strings'];

// void
// Using void means there’s no type expected. This is usually in functions with no return value
function setName(newName: string): void {
    this.fullName = newName;
}

/*  CLASSES  */

class Person {

    firstName: string;
    lastName: string;
    age: number;
    data: Array<string> = new Array<string>();

    constructor(firstName: string, lastName: string, age: number) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;

    }

    // Notice that we’re able to access the first_name for this Person by using the "this" keyword and calling this.first_name.
    // The greet method takes no arguments. The return type is not specified, hence it can return anything
    greet() {
        console.log("Hello, " + this.firstName);
    }

    // Return the age of the person after 'numOfYears' years
    // The method takes one arg of type number and returns a value, again of type number.
    // If we tried to return a different type, like string, it would not compile.
    ageOfPersonAfter(numOfYears: number): number {
        return (this.age + numOfYears);
    }

    // Sidenote
    // But this is completely valid TS code. You do not specify a return type, and then return any thing you want
    okGreet() {
        console.log("Hello, " + this.firstName);
        return "Done";
    }

    // // But this won't compile, because TS now expects the return type to be void
    // badGreet(): void {
    //     console.log("Hello, " + this.firstName);
    //     return "Done"; // TS2322: Type '"Done"' is not assignable to type 'void'.
    // }

}

let p: Person = new Person('Alice', 'Doe', 21);
p.greet(); // prints: Hello, Alice
console.log(p.ageOfPersonAfter(10)); // Prints: 31


class Report {

    data: Array<string>

    constructor(data: Array<string>) {
        this.data = data;
    }

    // When we call run we loop over each element of data and print them out using console.log
    // .forEach is a method on Array that accepts a function as an argument and
    // calls that function for each element in the Array.
    run() {
        this.data.forEach(function (line: string) {
            console.log(line);
        })
    }

    fatRun() {
        this.data.forEach(line => console.log(line));
    }
}

// We can run this by doing:
let report: Report = new Report(['Line1', 'Line2', 'Line3']);
report.run();

/* Prints:
    Line1
    Line2
    Line3
*/

// A new class would inherit from the Report class as follows:

class TabbedReport extends Report {

    headers: Array<string>;

    constructor(data: Array<string>, headers: Array<string>) {
        super(data);
        this.headers = headers;
    }

    run() {
        console.log(this.headers);
        super.run();
    }
}

let tbdReport: TabbedReport = new TabbedReport(['Line1', 'Line2', 'Line3'], ['Header1', 'Header2']);
tbdReport.run();

/* Prints:
    [ 'Header1', 'Header2' ]
    Line1
    Line2
    Line3
*/

let nate = {
    name: 'Nate',
    guitars: ['Gibson', 'Fender'],
    printGuitars: function() {
        this.guitars.forEach(function(guitar: string){
            console.log(this.name + ' plays ' + guitar)
        })
    }
}

nate.printGuitars();

/* Prints incorrect output because this.name is undefined
    undefined plays Gibson
    undefined plays Fender
*/


let twinNate = {
    name: 'twinNate',
    guitars: ['Gibson', 'Fender'],
    printGuitars: function() {
        // this.name is undefined so we have to use self.name
        let self = this;
        this.guitars.forEach(function(guitar: string){
            console.log(self.name + ' plays ' + guitar)
        })
    }
}

twinNate.printGuitars();
/* Prints correct output:
    twinNate plays Gibson
    twinNate plays Fender
*/

// We can do the above by using fat arrow functions in a less verbose way
// This makes it easier to write higher-order functions
let fatNate = {
    name: 'fatNate',
    guitars: ['Gibson', 'Fender'],
    printGuitars: function () {
        this.guitars.forEach((guitar: string) => console.log(this.name + ' plays ' + guitar))
    }
}

fatNate.printGuitars();
/* Prints:
    fatNate plays Gibson
    fatNate plays Fender
*/

let anotherName = 'Alice';
let hobbies: Array<string> = ['Hiking', 'Running'];

let greeting: string = `The name is ${anotherName} whose hobbies are: ${hobbies}`

console.log(greeting)
/* Prints:
    The name is Alice whose hobbies are: Hiking,Running
*/
